import MistMountains from "@/components/MistMountains";
import GlassCard from "@/components/GlassCard";
import ScrollReveal from "@/components/ScrollReveal";
import ContactForm from "@/components/ContactForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Dew of Hermon",
  description:
    "Book your body scan or ask about Green World supplement packages at Dew of Hermon Health & Wellness.",
};

const DETAILS = [
  { label: "Phone", value: "+27 00 000 0000" },
  { label: "Email", value: "hello@dewofhermon.co.za" },
  { label: "Hours", value: "Mon – Sat, 8am – 5pm" },
  { label: "Location", value: "Available by appointment" },
];

export default function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden px-6 pb-16 pt-16 text-center sm:px-10">
        <MistMountains className="opacity-45" />
        <div className="container-narrow relative">
          <span className="eyebrow justify-center">Contact</span>
          <h1 className="mx-auto mt-4 max-w-2xl text-balance font-display text-4xl font-medium leading-tight text-primary-dark sm:text-5xl">
            Let&rsquo;s book your scan.
          </h1>
          <p className="mx-auto mt-5 max-w-lg font-body text-base leading-relaxed text-ink/70">
            Send a message and we&rsquo;ll confirm a time that works for you —
            or call directly if you&rsquo;d rather book today.
          </p>
        </div>
      </section>

      <section className="section bg-white pt-0">
        <div className="container-narrow grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <ScrollReveal>
            <GlassCard className="h-full">
              <ContactForm />
            </GlassCard>
          </ScrollReveal>

          <ScrollReveal delay={0.12} className="flex flex-col gap-6">
            <div className="rounded-[28px] bg-black p-8 text-white">
              <span className="font-body text-xs font-semibold uppercase tracking-[0.24em] text-white/50">
                Get in touch
              </span>
              <dl className="mt-6 space-y-5">
                {DETAILS.map((d) => (
                  <div key={d.label} className="flex items-start justify-between gap-4 border-b border-white/10 pb-4 last:border-none">
                    <dt className="font-body text-sm text-white/50">{d.label}</dt>
                    <dd className="font-body text-sm font-medium text-white">
                      {d.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="relative flex-1 overflow-hidden rounded-[28px] bg-mist-gradient">
              <MistMountains className="opacity-60" />
              <div className="relative flex h-full min-h-[220px] flex-col items-center justify-center gap-3 p-8 text-center">
                <div className="h-10 w-10 rounded-drop bg-primary/20" />
                <p className="font-body text-sm text-ink/60">
                  Serving clients across the region — appointment location
                  confirmed on booking.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
