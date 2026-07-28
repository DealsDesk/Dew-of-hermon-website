"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <div className="glass container-narrow flex items-center justify-between rounded-full px-5 py-3 shadow-glass">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <Image
            src="/images/logo.png"
            alt="Dew of Hermon"
            width={40}
            height={40}
            className="h-10 w-10 object-contain"
          />
          <span className="font-display text-lg font-semibold tracking-wide text-primary-dark">
            Dew of Hermon
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group relative font-body text-sm font-medium text-ink/80 transition-colors hover:text-primary-dark"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-primary-dark transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
          <Link href="/contact" className="btn-primary text-xs">
            Book a Scan
          </Link>
        </nav>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 rounded-full md:hidden"
        >
          <span
            className={`h-px w-5 bg-ink transition-transform duration-300 ${
              open ? "translate-y-[3px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-px w-5 bg-ink transition-opacity duration-300 ${
              open ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`h-px w-5 bg-ink transition-transform duration-300 ${
              open ? "-translate-y-[7px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {open && (
        <div className="glass container-narrow mt-2 flex flex-col gap-1 rounded-3xl p-4 shadow-glass md:hidden">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-2xl px-4 py-3 font-body text-sm font-medium text-ink/80 transition-colors hover:bg-white/60 hover:text-primary-dark"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="btn-primary mt-2 text-xs"
          >
            Book a Scan
          </Link>
        </div>
      )}
    </header>
  );
}
