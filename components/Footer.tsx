import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-black px-6 pb-10 pt-20 text-white/80 sm:px-10 lg:px-20">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(139,111,168,0.35), transparent 45%), radial-gradient(circle at 80% 0%, rgba(195,174,220,0.25), transparent 40%)",
        }}
      />
      <div className="container-narrow relative grid gap-12 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <Image
              src="/images/logo.png"
              alt="Dew of Hermon"
              width={44}
              height={44}
              className="h-11 w-11 object-contain"
            />
            <span className="font-display text-xl font-semibold text-white">
              Dew of Hermon
            </span>
          </div>
          <p className="mt-4 max-w-xs font-body text-sm leading-relaxed text-white/60">
            Health &amp; Wellness rooted in precision diagnostics and the
            restorative purity of the mountain&rsquo;s dew.
          </p>
        </div>

        <div>
          <h4 className="font-body text-xs font-semibold uppercase tracking-[0.24em] text-white/50">
            Explore
          </h4>
          <ul className="mt-4 space-y-3 font-body text-sm">
            {[
              { href: "/", label: "Home" },
              { href: "/about", label: "About" },
              { href: "/services", label: "Services" },
              { href: "/contact", label: "Contact" },
            ].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition-colors hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-body text-xs font-semibold uppercase tracking-[0.24em] text-white/50">
            Offerings
          </h4>
          <ul className="mt-4 space-y-3 font-body text-sm">
            <li>Full Body Scan — R500</li>
            <li>Green World Supplement Packages</li>
            <li>Personalised Wellness Plans</li>
          </ul>
        </div>

        <div>
          <h4 className="font-body text-xs font-semibold uppercase tracking-[0.24em] text-white/50">
            Contact
          </h4>
          <ul className="mt-4 space-y-3 font-body text-sm text-white/70">
            <li>dewofhermon225@gmail.com</li>
            <li>+27 00 000 0000</li>
            <li>Mon – Sat, 8am – 5pm</li>
          </ul>
        </div>
      </div>

      <div className="container-narrow relative mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 font-body text-xs text-white/40 sm:flex-row">
        <p>© {new Date().getFullYear()} Dew of Hermon Health &amp; Wellness. All rights reserved.</p>
        <p>Crafted with care, like dew before sunrise.</p>
      </div>
    </footer>
  );
}
