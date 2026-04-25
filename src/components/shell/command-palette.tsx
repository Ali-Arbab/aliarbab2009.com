"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { siteConfig } from "@/config/site";
import { PROJECTS } from "@/config/projects";

/**
 * Command palette — ⌘K / Ctrl+K to open.
 *
 * Built on the native <dialog> element rather than Radix or
 * floating-ui to keep the dependency graph small. The browser
 * gives us focus trap, ::backdrop pseudo, and ESC handling for free.
 *
 * Item kinds:
 *   - "nav"   → router.push(href)
 *   - "external" → window.open(href, "_blank")
 *   - "action" → invoke a handler (e.g. theme toggle)
 *
 * Keyboard:
 *   - ⌘K / Ctrl+K (global) → open
 *   - ESC → close
 *   - ↑/↓ → move highlight
 *   - Enter → invoke
 *   - Type → filter (case-insensitive, "starts-with" + "contains")
 *
 * Accessibility:
 *   - role="dialog" + aria-modal=true (native <dialog> handles)
 *   - aria-activedescendant points at the highlighted row
 *   - Each row has role="option"
 *   - aria-label on the search input
 *   - Focus returns to the previously-focused element on close
 */

type CommandKind = "nav" | "external" | "action";

type CommandItem = {
  id: string;
  label: string;
  hint: string;
  kind: CommandKind;
  href?: string;
  /** For action items — invoked on Enter/click. */
  onSelect?: () => void;
  /** Optional kbd hint shown on the right (e.g. "⌘K", "g h"). */
  shortcut?: string;
};

function flipTheme() {
  if (typeof window === "undefined") return;
  const next =
    document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  try {
    window.localStorage.setItem("theme", next);
  } catch {
    /* localStorage unavailable in some embedded contexts — ignore */
  }
}

function buildCommands(): CommandItem[] {
  const navItems: CommandItem[] = [
    { id: "nav-home", label: "Home", hint: "/", kind: "nav", href: "/" },
    { id: "nav-projects", label: "All projects", hint: "/projects", kind: "nav", href: "/projects" },
    ...PROJECTS.map<CommandItem>((p) => ({
      id: `nav-project-${p.slug}`,
      label: p.name,
      hint: `/projects/${p.slug}`,
      kind: "nav",
      href: `/projects/${p.slug}`,
    })),
    { id: "nav-about", label: "About — long version", hint: "/about", kind: "nav", href: "/about" },
    { id: "nav-resume", label: "Resume", hint: "/resume", kind: "nav", href: "/resume" },
    { id: "nav-contact", label: "Contact", hint: "/contact", kind: "nav", href: "/contact" },
  ];

  const actionItems: CommandItem[] = [
    {
      id: "action-toggle-theme",
      label: "Toggle theme",
      hint: "dark ↔ light",
      kind: "action",
      onSelect: flipTheme,
      shortcut: "⌥T",
    },
  ];

  const externalItems: CommandItem[] = [
    {
      id: "ext-github",
      label: `GitHub — @${siteConfig.githubHandle}`,
      hint: siteConfig.github.replace(/^https?:\/\//, ""),
      kind: "external",
      href: siteConfig.github,
    },
  ];

  return [...navItems, ...actionItems, ...externalItems];
}

function score(label: string, hint: string, query: string): number {
  if (!query) return 1; // everything passes when no query
  const q = query.toLowerCase();
  const l = label.toLowerCase();
  const h = hint.toLowerCase();
  if (l.startsWith(q)) return 3;
  if (l.includes(q)) return 2;
  if (h.includes(q)) return 1;
  return 0;
}

export function CommandPalette() {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [query, setQuery] = useState("");
  const [highlight, setHighlight] = useState(0);
  const [open, setOpen] = useState(false);

  const items = useMemo(() => buildCommands(), []);

  const filtered = useMemo(() => {
    return items
      .map((it) => ({ it, s: score(it.label, it.hint, query) }))
      .filter((x) => x.s > 0)
      .sort((a, b) => b.s - a.s)
      .map((x) => x.it);
  }, [items, query]);

  // Reset highlight when filter changes
  useEffect(() => setHighlight(0), [query]);

  // ⌘K / Ctrl+K global shortcut + "open-command-palette" custom event.
  // The custom event is what the visible trigger button in the nav uses
  // (button → dispatchEvent → palette opens). Coupling-free.
  useEffect(() => {
    function openPalette() {
      const dlg = dialogRef.current;
      if (!dlg) return;
      if (dlg.open) {
        dlg.close();
        setOpen(false);
      } else {
        dlg.showModal();
        setOpen(true);
        // Focus input after dialog promotes itself
        setTimeout(() => inputRef.current?.focus(), 0);
      }
    }

    function onKey(e: KeyboardEvent) {
      const isCmd = e.metaKey || e.ctrlKey;
      if (isCmd && e.key.toLowerCase() === "k") {
        e.preventDefault();
        openPalette();
      }
    }

    function onCustom() {
      openPalette();
    }

    document.addEventListener("keydown", onKey);
    window.addEventListener("open-command-palette", onCustom);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("open-command-palette", onCustom);
    };
  }, []);

  // Native dialog cleanup on close (ESC, backdrop click, etc.)
  useEffect(() => {
    const dlg = dialogRef.current;
    if (!dlg) return;
    function onClose() {
      setOpen(false);
      setQuery("");
      setHighlight(0);
    }
    dlg.addEventListener("close", onClose);
    return () => dlg.removeEventListener("close", onClose);
  }, []);

  const close = useCallback(() => {
    dialogRef.current?.close();
  }, []);

  const invoke = useCallback(
    (item: CommandItem) => {
      switch (item.kind) {
        case "nav":
          if (item.href) router.push(item.href);
          break;
        case "external":
          if (item.href && typeof window !== "undefined") {
            window.open(item.href, "_blank", "noopener,noreferrer");
          }
          break;
        case "action":
          item.onSelect?.();
          break;
      }
      close();
    },
    [close, router],
  );

  function onKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlight((h) => Math.min(h + 1, Math.max(filtered.length - 1, 0)));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlight((h) => Math.max(h - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const item = filtered[highlight];
      if (item) invoke(item);
    } else if (e.key === "Escape") {
      // <dialog> closes itself on Escape — listener above handles cleanup
    }
  }

  // Backdrop click closes
  function onBackdropMouseDown(e: React.MouseEvent<HTMLDialogElement>) {
    if (e.target === dialogRef.current) close();
  }

  return (
    <dialog
      ref={dialogRef}
      onMouseDown={onBackdropMouseDown}
      aria-label="Command palette"
      className="m-0 ml-auto mr-auto mt-[10vh] w-[min(640px,90vw)] border-2 border-[var(--color-border)] bg-[var(--color-surface)] p-0 text-[var(--color-fg)] backdrop:bg-black/60 open:flex open:flex-col"
    >
      <div onKeyDown={onKeyDown} className="flex flex-col">
        <header className="border-b-2 border-[var(--color-border)] px-4 py-3">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a route, project, or action…"
            aria-label="Command palette search"
            aria-controls="command-palette-list"
            aria-activedescendant={
              filtered[highlight] ? `cmd-item-${filtered[highlight].id}` : undefined
            }
            autoComplete="off"
            spellCheck={false}
            className="w-full bg-transparent font-mono text-base outline-none placeholder:text-[var(--color-muted)]"
          />
        </header>

        <ul
          id="command-palette-list"
          role="listbox"
          className="max-h-[50vh] overflow-y-auto"
        >
          {filtered.length === 0 ? (
            <li className="p-6 text-center font-mono text-[10px] tracking-[0.25em] text-[var(--color-muted)] uppercase">
              No matches — try a different query
            </li>
          ) : (
            filtered.map((item, i) => {
              const isHighlighted = i === highlight;
              return (
                <li
                  key={item.id}
                  id={`cmd-item-${item.id}`}
                  role="option"
                  aria-selected={isHighlighted}
                  onMouseEnter={() => setHighlight(i)}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    invoke(item);
                  }}
                  className={
                    "flex cursor-pointer items-baseline justify-between gap-4 border-b border-[var(--color-border)] px-4 py-3 last:border-b-0 " +
                    (isHighlighted
                      ? "bg-[var(--color-primary)] text-[var(--color-primary-fg)]"
                      : "hover:bg-[var(--color-surface-2)]")
                  }
                >
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm font-medium">{item.label}</span>
                    <span
                      className={
                        "font-mono text-[10px] tracking-wide " +
                        (isHighlighted
                          ? "text-[var(--color-primary-fg)]/80"
                          : "text-[var(--color-muted)]")
                      }
                    >
                      {item.hint}
                    </span>
                  </div>
                  <span
                    className={
                      "font-mono text-[10px] tracking-[0.2em] uppercase " +
                      (isHighlighted
                        ? "text-[var(--color-primary-fg)]/80"
                        : "text-[var(--color-muted)]")
                    }
                  >
                    {item.kind === "external" ? "↗" : item.kind === "action" ? "act" : "→"}
                  </span>
                </li>
              );
            })
          )}
        </ul>

        <footer className="flex items-center justify-between gap-3 border-t-2 border-[var(--color-border)] px-4 py-2.5 font-mono text-[10px] tracking-[0.2em] text-[var(--color-muted)] uppercase">
          <div className="flex items-center gap-3">
            <span>↑↓ navigate</span>
            <span>↵ select</span>
            <span>ESC close</span>
          </div>
          <span>{filtered.length} result{filtered.length === 1 ? "" : "s"}</span>
        </footer>
      </div>

      {/*
        Ensures `open` state is reflected for E2E + screen-reader hooks.
        Native <dialog> open attribute is the source of truth; this is
        a defensive sync so React state and DOM never drift.
      */}
      <span data-cmdpal-open={open ? "true" : "false"} aria-hidden hidden />
    </dialog>
  );
}
