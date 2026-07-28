import AnimatedLogo from "@/components/AnimatedLogo";
import CloudReveal from "@/components/CloudReveal";
import MistMountains from "@/components/MistMountains";
import GlassCard from "@/components/GlassCard";
import ScrollReveal from "@/components/ScrollReveal";
import Link from "next/link";

const STEPS = [
  {
    n: "01",
    title: "Scan",
    text: "A precise full-body composition scan reads hydration, mineral balance, and vitality markers in minutes.",
  },
  {
    n: "02",
    title: "Diagnose",
    text: "Your practitioner reads the results with you, translating the data into a clear picture of where your body needs support.",
  },
  {
    n: "03",
    title: "Prescribe",
    text: "A Green World supplement package is matched to your exact diagnosis — nothing generic, nothing guessed.",
  },
];

const PACKAGES = [
  {
    title: "Detox & Cleanse",
    text: "Gentle internal reset for sluggishness, bloating, and low energy.",
  },
  {
    title: "Immune Defence",
    text: "Daily resilience-building support through seasonal changes.",
  },
  {
    title: "Weight Balance",
    text: "Metabolic support paired with sustainable, scan-led guidance.",
  },
  {
    title: "Vitality & Energy",
    text: "Restore steady, all-day energy without the crash.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Home only — the mist needs the sticky hero's scroll room to clear, and
          fogging a form or a services list would just be in the way. */}
      <CloudReveal />

      {/* HERO — the tall wrapper gives the mist room to clear while the sticky
          section holds the hero in place, so the reveal happens on a page that
          isn't sliding away underneath it. */}
      <div className="relative h-[190vh]">
      <section className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden px-6 pb-28 pt-12 text-center sm:px-10">
        <MistMountains className="opacity-90" parallax band="68%" />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 50% at 50% 20%, rgba(255,255,255,0.55), transparent 70%)",
          }}
        />

        <div className="relative z-10 flex flex-col items-center">
          <span className="eyebrow mb-6">Health &amp; Wellness · Mount Hermon</span>

          <AnimatedLogo className="mb-8" />

          <h1 className="text-balance max-w-2xl font-display text-4xl font-medium leading-[1.1] text-primary-dark sm:text-5xl lg:text-6xl">
            Clarity for your body,
            <br />
            <span className="italic text-primary">drawn from the mountain&rsquo;s dew.</span>
          </h1>

          <p className="text-balance mt-6 max-w-xl font-body text-base leading-relaxed text-ink/70 sm:text-lg">
            A full body scan reveals what your body needs. A Green World
            supplement package, prescribed just for you, gives it exactly
            that — nothing more, nothing generic.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link href="/contact" className="btn-primary">
              Book Your Body Scan — R500
            </Link>
            <Link href="/services" className="btn-ghost">
              Explore Supplement Packages
            </Link>
          </div>
        </div>

      </section>
      </div>

      {/* HOW IT WORKS */}
      <section className="section relative bg-white">
        <div className="container-narrow">
          <ScrollReveal>
            <span className="eyebrow">How it works</span>
            <h2 className="mt-4 max-w-xl font-display text-3xl font-medium text-primary-dark sm:text-4xl">
              Three steps from uncertainty to a plan.
            </h2>
          </ScrollReveal>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {STEPS.map((step, i) => (
              <ScrollReveal key={step.n} delay={i * 0.12}>
                <div className="group relative h-full rounded-[28px] border border-lavender-pale bg-surface/60 p-8 transition-all duration-500 hover:-translate-y-2 hover:border-lavender hover:bg-white hover:shadow-glass-lg">
                  <span className="font-display text-5xl font-medium text-lavender transition-colors duration-500 group-hover:text-primary-light">
                    {step.n}
                  </span>
                  <h3 className="mt-4 font-display text-2xl font-medium text-primary-dark">
                    {step.title}
                  </h3>
                  <p className="mt-3 font-body text-sm leading-relaxed text-ink/65">
                    {step.text}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* BODY SCAN HIGHLIGHT */}
      <section className="section relative overflow-hidden bg-mist-gradient">
        <MistMountains className="opacity-40" />
        <div className="container-narrow relative grid items-center gap-14 lg:grid-cols-2">
          <ScrollReveal>
            <span className="eyebrow">The Body Scan</span>
            <h2 className="mt-4 font-display text-3xl font-medium text-primary-dark sm:text-4xl">
              One scan. A complete picture of your health.
            </h2>
            <p className="mt-5 max-w-lg font-body text-base leading-relaxed text-ink/70">
              In just a few minutes, our scan reads body composition, hydration
              levels, and key wellness markers — the same clarity clinics
              charge far more for, priced to make prevention accessible.
            </p>
            <ul className="mt-6 space-y-3 font-body text-sm text-ink/70">
              {[
                "Full body composition &amp; hydration analysis",
                "One-on-one results consultation",
                "Personalised Green World recommendation",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-drop bg-primary" />
                  <span dangerouslySetInnerHTML={{ __html: item }} />
                </li>
              ))}
            </ul>
            <Link href="/services" className="btn-primary mt-8 inline-flex">
              See Scan Details
            </Link>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <GlassCard className="mx-auto max-w-sm text-center">
              <span className="eyebrow justify-center">Introductory Price</span>
              <p className="mt-4 font-display text-6xl font-medium text-primary-dark">
                R500
              </p>
              <p className="mt-2 font-body text-sm text-ink/60">
                Full body scan &amp; consultation
              </p>
              <div className="my-6 h-px w-full bg-lavender-pale" />
              <p className="font-body text-sm leading-relaxed text-ink/70">
                Includes your printed diagnostic report and a personalised
                Green World supplement recommendation.
              </p>
            </GlassCard>
          </ScrollReveal>
        </div>
      </section>

      {/* SUPPLEMENT PACKAGES TEASER */}
      <section className="section relative bg-white">
        <div className="container-narrow">
          <ScrollReveal className="mx-auto max-w-2xl text-center">
            <span className="eyebrow justify-center">Green World Supplement Packages</span>
            <h2 className="mt-4 font-display text-3xl font-medium text-primary-dark sm:text-4xl">
              Prescribed for you. Never off the shelf.
            </h2>
          </ScrollReveal>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PACKAGES.map((pkg, i) => (
              <ScrollReveal key={pkg.title} delay={i * 0.1}>
                <div className="group relative h-full overflow-hidden rounded-[28px] bg-surface p-7 transition-all duration-500 hover:-translate-y-2 hover:bg-dusk-gradient hover:shadow-glass-lg">
                  <div className="mb-5 h-12 w-12 rounded-drop bg-primary/15 transition-colors duration-500 group-hover:bg-white/20" />
                  <h3 className="font-display text-xl font-medium text-primary-dark transition-colors duration-500 group-hover:text-white">
                    {pkg.title}
                  </h3>
                  <p className="mt-3 font-body text-sm leading-relaxed text-ink/60 transition-colors duration-500 group-hover:text-white/75">
                    {pkg.text}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* QUOTE */}
      <section className="section relative overflow-hidden bg-black text-center text-white">
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            background:
              "radial-gradient(50% 60% at 50% 0%, rgba(139,111,168,0.5), transparent 70%)",
          }}
        />
        <ScrollReveal className="container-narrow relative mx-auto max-w-2xl">
          <p className="font-display text-2xl italic leading-relaxed text-white/90 sm:text-3xl">
            &ldquo;Since my scan and Green World package, my energy hasn&rsquo;t
            dipped by 3pm once. It&rsquo;s the first plan that actually fit
            <em> my</em> body.&rdquo;
          </p>
          <p className="mt-6 font-body text-sm uppercase tracking-[0.24em] text-white/50">
            — A Dew of Hermon Client
          </p>
        </ScrollReveal>
      </section>

      {/* CTA BANNER */}
      <section className="section relative bg-mist-gradient text-center">
        <ScrollReveal className="container-narrow">
          <h2 className="font-display text-3xl font-medium text-primary-dark sm:text-4xl">
            Your body is asking. Let&rsquo;s listen.
          </h2>
          <p className="mx-auto mt-4 max-w-md font-body text-base text-ink/70">
            Book your scan today and walk out with a plan built for exactly
            what your body needs.
          </p>
          <Link href="/contact" className="btn-primary mt-8 inline-flex">
            Book Your Body Scan
          </Link>
        </ScrollReveal>
      </section>
    </>
  );
}
