"use client";

import { useCallback } from "react";

import { RESUME } from "@/config/resume";

/**
 * <ResumeActions /> — print + (optional) PDF-download row above the
 * resume body. Client component because window.print() is browser-only.
 *
 * The PDF button is gated on RESUME.hasPDF; when false, only the
 * "Print to PDF" CTA renders. Until the scrubbed PDF lands, browser
 * print is the canonical way to get a file artifact — same content,
 * paper-friendly black-on-white via the print stylesheet inside
 * <ResumeEmbed>.
 */
export function ResumeActions() {
  const onPrint = useCallback(() => {
    if (typeof window !== "undefined") window.print();
  }, []);

  return (
    <div className="resume-print-hide flex flex-wrap items-center gap-3">
      <button
        type="button"
        onClick={onPrint}
        className="border-2 border-[var(--color-fg)] bg-transparent px-5 py-2.5 font-mono text-[11px] tracking-[0.25em] uppercase transition-colors hover:bg-[var(--color-fg)] hover:text-[var(--color-bg)] focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2 focus:ring-offset-[var(--color-bg)] focus:outline-none"
      >
        Print · Save as PDF
      </button>

      {RESUME.hasPDF ? (
        <a
          href={`/resume/${RESUME.pdfFilename}`}
          download
          className="border-2 border-[var(--color-primary)] bg-[var(--color-primary)] px-5 py-2.5 font-mono text-[11px] tracking-[0.25em] text-[var(--color-primary-fg)] uppercase transition-colors hover:border-[var(--color-fg)] hover:bg-[var(--color-fg)] hover:text-[var(--color-bg)] focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2 focus:ring-offset-[var(--color-bg)] focus:outline-none"
        >
          Download PDF ↓
        </a>
      ) : (
        <span className="font-mono text-[10px] tracking-[0.2em] text-[var(--color-muted)] uppercase">
          PDF download — coming soon · use print for now
        </span>
      )}
    </div>
  );
}
