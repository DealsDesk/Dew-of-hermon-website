import MistMountains from "@/components/MistMountains";
import GlassCard from "@/components/GlassCard";
import ScrollReveal from "@/components/ScrollReveal";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services | Dew of Hermon",
  description:
    "Full body scans and personalised Green World supplement packages at Dew of Hermon Health & Wellness.",
};

const SCAN_INCLUDES = [
  "Body composition (fat, muscle, water percentage)",
  "Hydration & cellular water balance",
  "Basal metabolic rate & metabolic age",
  "Key mineral and nutrient indicators",
  "Printed diagnostic report to keep",
  "One-on-one consultation to explain your results",
];

const PACKAGES = [
  {
    title: "Detox & Cleanse",
    text: "For sluggishness, bloating, and a body that feels like it's carrying too much.",
    good: ["Low energy after meals", "Bloating or water retention", "Wanting a gentle reset"],
  },
  {
    title: "Immune Defence",
    text: "Daily resilience support to help you stay steady through seasonal changes.",
    good: ["Frequent seasonal colds", "High-stress periods", "Post-illness recovery"],
  },
  {
    title: "Weight Balance",
    text: "Metabolic support paired with scan-led guidance — not a crash diet in a bottle.",
    good: ["Stalled weight goals", "Slow metabolism markers", "Wanting sustainable change"],
  },
  {
    title: "Vitality & Energy",
    text: "Steady, all-day energy support without the caffeine crash.",
    good: ["Afternoon energy dips", "Low motivation", "Poor sleep recovery"],
  },
  {
    title: "Heart & Circulation",
    text: "Support for healthy circulation and long-term cardiovascular wellness.",
    good: ["Family history of concern", "Sedentary lifestyle", "Wanting preventative care"],
  },
  {
    title: "Beauty & Renewal",
    text: "Nourishment from within for skin, hair, and a visible sense of renewal.",
    good: ["Dull skin or hair", "Signs of fatigue showing", "Wanting a glow-up, inside out"],
  },
];

const FAQS = [
  {
    q: "How long does the body scan take?",
    a: "The scan itself takes just a few minutes. With your consultation and results walkthrough, plan for about 30 minutes total.",
  },
  {
    q: "Do I need to prepare beforehand?",
    a: "We'll recommend avoiding heavy meals, alcohol, and intense exercise for a few hours before your scan, for the most accurate reading.",
  },
  {
    q: "Am I obligated to buy a supplement package?",
    a: "No. The R500 covers your scan and consultation in full. Your Green World recommendation is exactly that — a recommendation.",
  },
  {
    q: "How often should I re-scan?",
    a: "Most clients return every 4–8 weeks to track progress and adjust their package as their results change.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <section className="relative overflow-hidden px-6 pb-16 pt-16 text-center sm:px-10">
        <MistMountains className="opacity-30" />
        <div className="container-narrow relative">
          <span className="eyebrow justify-center">Services</span>
          <h1 className="mx-auto mt-4 max-w-2xl text-balance font-display text-4xl font-medium leading-tight text-primary-dark sm:text-5xl">
            One scan. A plan built only for you.
          </h1>
        </div>
      </section>

      {/* BODY SCAN DETAIL */}
      <section className="section bg-white">
        <div className="container-narrow grid items-start gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          <ScrollReveal>
            <span className="eyebrow">The Full Body Scan</span>
            <h2 className="mt-4 font-display text-3xl font-medium text-primary-dark sm:text-4xl">
              What R500 gets you.
            </h2>
            <p className="mt-5 font-body text-base leading-relaxed text-ink/70">
              A precision body composition scan reads more than a bathroom
              scale ever could. In minutes, we get a clear diagnostic picture
              of what your body has, what it lacks, and where a Green World
              package can actually help.
            </p>

            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {SCAN_INCLUDES.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-2xl bg-surface/70 p-4 font-body text-sm text-ink/75"
                >
                  <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-drop bg-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <GlassCard className="mx-auto max-w-sm text-center">
              <span className="eyebrow justify-center">Introductory Price</span>
              <p className="mt-4 font-display text-6xl font-medium text-primary-dark">
                R500
              </p>
              <p className="mt-2 font-body text-sm text-ink/60">
                Scan + consultation + report
              </p>
              <Link href="/contact" className="btn-primary mt-8 w-full">
                Book This Scan
              </Link>
              <p className="mt-4 font-body text-xs text-ink/45">
                No obligation to purchase a supplement package.
              </p>
            </GlassCard>
          </ScrollReveal>
        </div>
      </section>

      {/* SUPPLEMENT PACKAGES */}
      <section className="section relative overflow-hidden bg-mist-gradient">
        <MistMountains className="opacity-30" />
        <div className="container-narrow relative">
          <ScrollReveal className="mx-auto max-w-2xl text-center">
            <span className="eyebrow justify-center">Green World Supplement Packages</span>
            <h2 className="mt-4 font-display text-3xl font-medium text-primary-dark sm:text-4xl">
              Matched to your diagnosis, not a display shelf.
            </h2>
            <p className="mt-4 font-body text-base text-ink/70">
              Every package below is a starting point — your practitioner
              will confirm or adjust it once your scan results are in.
            </p>
          </ScrollReveal>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PACKAGES.map((pkg, i) => (
              <ScrollReveal key={pkg.title} delay={(i % 3) * 0.1}>
                <div className="group relative flex h-full flex-col overflow-hidden rounded-[28px] bg-white p-7 shadow-drop transition-all duration-500 hover:-translate-y-2 hover:shadow-glass-lg">
                  <div className="absolute -right-8 -top-8 h-24 w-24 rounded-drop bg-lavender/20 transition-transform duration-700 group-hover:scale-150" />
                  <h3 className="relative font-display text-xl font-medium text-primary-dark">
                    {pkg.title}
                  </h3>
                  <p className="relative mt-3 font-body text-sm leading-relaxed text-ink/65">
                    {pkg.text}
                  </p>
                  <div className="relative mt-5 border-t border-lavender-pale pt-4">
                    <p className="font-body text-xs font-semibold uppercase tracking-wide text-primary/70">
                      Good fit if
                    </p>
                    <ul className="mt-2 space-y-1.5">
                      {pkg.good.map((g) => (
                        <li key={g} className="font-body text-xs text-ink/55">
                          · {g}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section bg-white">
        <div className="container-narrow max-w-3xl">
          <ScrollReveal className="text-center">
            <span className="eyebrow justify-center">Questions</span>
            <h2 className="mt-4 font-display text-3xl font-medium text-primary-dark sm:text-4xl">
              Good to know before you book.
            </h2>
          </ScrollReveal>

          <div className="mt-12 space-y-4">
            {FAQS.map((faq, i) => (
              <ScrollReveal key={faq.q} delay={i * 0.06}>
                <details className="group rounded-2xl border border-lavender-pale bg-surface/50 p-6 transition-colors duration-300 open:border-primary-light open:bg-white">
                  <summary className="flex cursor-pointer list-none items-center justify-between font-display text-lg font-medium text-primary-dark">
                    {faq.q}
                    <span className="ml-4 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-lavender-pale font-body text-sm text-primary-dark transition-transform duration-300 group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 font-body text-sm leading-relaxed text-ink/65">
                    {faq.a}
                  </p>
                </details>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section relative overflow-hidden bg-black text-center text-white">
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            background:
              "radial-gradient(50% 60% at 50% 0%, rgba(139,111,168,0.5), transparent 70%)",
          }}
        />
        <ScrollReveal className="container-narrow relative">
          <h2 className="font-display text-3xl font-medium sm:text-4xl">
            Let&rsquo;s find out what your body needs.
          </h2>
          <Link
            href="/contact"
            className="mt-8 inline-flex rounded-full bg-white px-8 py-3.5 font-body text-sm font-semibold text-black transition-all duration-300 hover:-translate-y-0.5 hover:shadow-glass-lg"
          >
            Book Your Body Scan — R500
          </Link>
        </ScrollReveal>
      </section>
    </>
  );
}
