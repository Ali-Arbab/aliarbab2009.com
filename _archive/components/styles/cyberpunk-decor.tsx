"use client";

import { useEffect, useState } from "react";

/**
 * Boot sequence — types out system lines at mount, then stays.
 * Reads entirely client-side. No external input.
 */
export function BootSequence() {
  const lines = [
    "[ BOOT ]  initializing ali-arbab.runtime v1.0.0",
    "[ OK   ]  loading project.manifest ... 3 entries",
    "[ OK   ]  mounting theme.variant = cyberpunk",
    "[ OK   ]  handshake with groq.llm: established",
    "[ OK   ]  handshake with esp32.grid: established",
    "[ OK   ]  compiling portfolio to static bundle",
    "[ READY ] operator is live. welcome.",
  ];

  const [visible, setVisible] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setVisible(lines.length);
      return;
    }
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setVisible(i);
      if (i >= lines.length) window.clearInterval(id);
    }, 260);
    return () => window.clearInterval(id);
  }, [lines.length]);

  return (
    <pre
      aria-hidden
      className="pointer-events-none font-mono text-[11px] leading-[1.6] text-[var(--color-primary)]/80"
      style={{ fontFamily: "var(--font-mono)" }}
    >
      {lines.slice(0, visible).map((l) => (
        <div key={l}>{l}</div>
      ))}
    </pre>
  );
}

/**
 * Fake live-feed ticker of system stats. Updates every 1.5s via
 * setInterval, all derived from Math/Date — no fetches.
 */
export function StatTicker() {
  const [, setTick] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setTick((n) => n + 1), 1500);
    return () => window.clearInterval(id);
  }, []);

  const now = new Date();
  const uptime = Math.floor((now.getTime() % (86_400_000)) / 1000);
  const mem = 42 + ((now.getSeconds() * 7) % 20);
  const cpu = 18 + ((now.getMilliseconds() % 40));
  const packets = (now.getTime() / 1000).toFixed(0);

  const fmt = (n: number) => n.toString().padStart(2, "0");
  const h = fmt(Math.floor(uptime / 3600));
  const m = fmt(Math.floor((uptime % 3600) / 60));
  const s = fmt(uptime % 60);

  return (
    <ul className="grid grid-cols-2 gap-x-6 gap-y-1 font-mono text-[10px] tracking-[0.15em] uppercase sm:grid-cols-4">
      <li>
        <span className="text-[var(--color-muted)]">uptime</span>{" "}
        <span className="text-[var(--color-primary)]">
          {h}:{m}:{s}
        </span>
      </li>
      <li>
        <span className="text-[var(--color-muted)]">mem</span>{" "}
        <span className="text-[var(--color-accent-cyan)]">{mem}%</span>
      </li>
      <li>
        <span className="text-[var(--color-muted)]">cpu</span>{" "}
        <span className="text-[var(--color-accent-amber)]">{cpu}%</span>
      </li>
      <li>
        <span className="text-[var(--color-muted)]">pkts</span>{" "}
        <span className="text-[var(--color-accent-magenta)]">{packets}</span>
      </li>
    </ul>
  );
}
