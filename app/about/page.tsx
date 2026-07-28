import MistMountains from "@/components/MistMountains";
import GlassCard from "@/components/GlassCard";
import ScrollReveal from "@/components/ScrollReveal";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Dew of Hermon",
  description:
    "The story, mission, and practitioner behind Dew of Hermon Health & Wellness.",
};

const VALUES = [
  {
    title: "Purity",
    text: "No guesswork, no filler. Every recommendation traces back to what your scan actually shows.",
  },
  {
    title: "Precision",
    text: "Diagnostics first, always. We prescribe to data, not to a catalogue.",
  },
  {
    title: "Personalisation",
    text: "Your package is built around your results — never a shelf product handed to everyone.",
  },
  {
    title: "Renewal",
    text: "Wellness as a quiet, steady practice — like dew settling overnight, not a quick fix.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden px-6 pb-20 pt-16 text-center sm:px-10">
        <MistMountains className="opacity-50" />
        <div className="container-narrow relative">
          <span className="eyebrow justify-center">Our Story</span>
          <h1 className="mx-auto mt-4 max-w-2xl text-balance font-display text-4xl font-medium leading-tight text-primary-dark sm:text-5xl">
            Named for a mountain known,
            <br />
            <span className="italic text-primary">for centuries, as a source of life.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl font-body text-base leading-relaxed text-ink/70">
            Mount Hermon has long been spoken of as a place where heavy dew
            settles each night — enough to sustain the valleys below through
            dry seasons. We borrowed its name because it says plainly what we
            believe about health: that the right, precise thing given
            consistently does more good than any dramatic gesture.
          </p>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-narrow grid items-center gap-14 lg:grid-cols-2">
          <ScrollReveal>
            <span className="eyebrow">Why we start with a scan</span>
            <h2 className="mt-4 font-display text-3xl font-medium text-primary-dark sm:text-4xl">
              You can&rsquo;t prescribe what you haven&rsquo;t measured.
            </h2>
            <p className="mt-5 font-body text-base leading-relaxed text-ink/70">
              Most wellness advice is generic because it has to be — it&rsquo;s
              written for everyone, which means it&rsquo;s written for no one
              in particular. Dew of Hermon starts differently. Before we
              recommend anything, we measure. The body scan gives us a real
              baseline: composition, hydration, and the markers that actually
              explain why you feel the way you do.
            </p>
            <p className="mt-4 font-body text-base leading-relaxed text-ink/70">
              From there, your Green World supplement package is built to
              answer what the scan found — not what&rsquo;s popular, not
              what&rsquo;s in stock.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <GlassCard>
              <span className="eyebrow">Meet Your Practitioner</span>
              <h3 className="mt-4 font-display text-2xl font-medium text-primary-dark">
                A dedicated wellness consultant
              </h3>
              <p className="mt-3 font-body text-sm leading-relaxed text-ink/70">
                Trained in body composition analysis and Green World&rsquo;s
                supplement science, your practitioner sits with you through
                every scan result — explaining what it means in plain
                language, and what to do about it.
              </p>
              <p className="mt-4 font-body text-sm italic leading-relaxed text-ink/60">
                &ldquo;My goal isn&rsquo;t to sell you a package. It&rsquo;s to
                make sure the one you leave with actually matches what your
                body told us.&rdquo;
              </p>
            </GlassCard>
          </ScrollReveal>
        </div>
      </section>

      <section className="section relative overflow-hidden bg-mist-gradient">
        <MistMountains className="opacity-30" />
        <div className="container-narrow relative">
          <ScrollReveal className="mx-auto max-w-xl text-center">
            <span className="eyebrow justify-center">What Guides Us</span>
            <h2 className="mt-4 font-display text-3xl font-medium text-primary-dark sm:text-4xl">
              Four things we don&rsquo;t compromise on.
            </h2>
          </ScrollReveal>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v, i) => (
              <ScrollReveal key={v.title} delay={i * 0.1}>
                <div className="group h-full rounded-[28px] border border-lavender-pale bg-white/70 p-7 transition-all duration-500 hover:-translate-y-2 hover:border-transparent hover:bg-black hover:shadow-glass-lg">
                  <h3 className="font-display text-xl font-medium text-primary-dark transition-colors duration-500 group-hover:text-white">
                    {v.title}
                  </h3>
                  <p className="mt-3 font-body text-sm leading-relaxed text-ink/65 transition-colors duration-500 group-hover:text-white/70">
                    {v.text}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-white text-center">
        <ScrollReveal className="container-narrow">
          <h2 className="font-display text-3xl font-medium text-primary-dark sm:text-4xl">
            Ready to see what your body has to say?
          </h2>
          <Link href="/contact" className="btn-primary mt-8 inline-flex">
            Book Your Body Scan
          </Link>
        </ScrollReveal>
      </section>
    </>
  );
}
