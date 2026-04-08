"use client";

import { useEffect, useRef, useState } from "react";

type StyledSelectProps = {
  id: string;
  name: string;
  value: string;
  options: readonly string[];
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  invalid?: boolean;
  theme?: "light" | "dark";
};

export function StyledSelect({
  id,
  name,
  value,
  options,
  onChange,
  placeholder = "Select an option",
  required = false,
  invalid = false,
  theme = "light",
}: StyledSelectProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    }
    function onEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onEscape);
    };
  }, []);

  const buttonTone =
    theme === "dark"
      ? "border-slate-300 bg-gradient-to-b from-slate-100 to-slate-200 text-slate-900 hover:border-slate-400"
      : "border-slate-200 bg-gradient-to-b from-white to-slate-50 text-slate-900 hover:border-slate-300";

  const listTone =
    theme === "dark"
      ? "border-slate-700 bg-slate-900/95 text-slate-100 shadow-2xl shadow-black/40"
      : "border-slate-200 bg-white text-slate-900 shadow-xl shadow-slate-200/60";

  const optionTone =
    theme === "dark"
      ? "hover:bg-slate-800 focus:bg-slate-800"
      : "hover:bg-slate-50 focus:bg-slate-50";

  return (
    <div ref={rootRef} className="relative">
      <input type="hidden" id={id} name={name} value={value} required={required} aria-invalid={invalid || undefined} />
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`w-full rounded-xl border px-4 py-3.5 pr-12 text-left text-sm font-medium shadow-sm transition focus:outline-none focus:ring-2 focus:ring-turquoise/20 ${buttonTone} ${invalid ? "border-red-400" : ""}`}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className={value ? "" : "text-slate-500"}>{value || placeholder}</span>
        <svg
          className={`pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 transition ${open ? "rotate-180" : ""} ${theme === "dark" ? "text-slate-600" : "text-slate-500"}`}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.72a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.5-4.5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {open && (
        <ul
          role="listbox"
          className={`absolute z-30 mt-2 max-h-56 w-full overflow-auto rounded-xl border p-1.5 ${listTone}`}
        >
          {options.map((opt) => {
            const isActive = value === opt;
            return (
              <li key={opt}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(opt);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition ${optionTone} ${isActive ? "font-semibold text-turquoise" : ""}`}
                >
                  <span>{opt}</span>
                  {isActive && (
                    <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                      <path
                        fillRule="evenodd"
                        d="M16.704 5.29a.75.75 0 010 1.06l-8 8a.75.75 0 01-1.06 0l-4-4a.75.75 0 011.06-1.06l3.47 3.47 7.47-7.47a.75.75 0 011.06 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
