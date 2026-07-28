"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

/**
 * Drip anchor points, expressed as a percentage of the logo image's
 * width/height. They line up with the three small dew drops already
 * painted onto the leaves in the source artwork, so the looping drip
 * reads as those same drops continuously re-forming and falling.
 */
const DRIPS = [
  { left: "47.6%", top: "10.5%", delay: 0, scale: 0.85, fall: 58 },
  { left: "54.2%", top: "17.5%", delay: 1.4, scale: 1, fall: 72 },
  { left: "60.8%", top: "20.5%", delay: 2.6, scale: 0.75, fall: 50 },
];

export default function AnimatedLogo({ className = "" }: { className?: string }) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const drops = gsap.utils.toArray<HTMLElement>(".dhw-drip");

      drops.forEach((drop, i) => {
        const fall = Number(drop.dataset.fall ?? 60);
        const tl = gsap.timeline({
          repeat: -1,
          delay: DRIPS[i]?.delay ?? i * 1.2,
          repeatDelay: gsap.utils.random(0.6, 1.6),
        });

        gsap.set(drop, { opacity: 0, scale: 0.2, y: 0, transformOrigin: "50% 0%" });

        tl.to(drop, {
          opacity: 1,
          scale: 1,
          scaleY: 1.35,
          duration: 0.5,
          ease: "sine.out",
        })
          .to(drop, {
            scaleY: 1,
            duration: 0.15,
            ease: "power1.out",
          })
          .to(
            drop,
            {
              y: fall,
              scaleY: 1.6,
              scaleX: 0.7,
              opacity: 0,
              duration: 0.85,
              ease: "power2.in",
            },
            "+=0.35"
          );
      });
    },
    { scope }
  );

  return (
    <div
      ref={scope}
      className={`relative mx-auto aspect-[2752/1536] w-full max-w-2xl select-none ${className}`}
    >
      <Image
        src="/images/logo.png"
        alt="Dew of Hermon — Health & Wellness"
        fill
        priority
        sizes="(max-width: 768px) 90vw, 640px"
        style={{
          maskImage:
            "radial-gradient(closest-side, black 66%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(closest-side, black 66%, transparent 100%)",
        }}
        className="object-contain"
      />

      {DRIPS.map((drip, i) => (
        <span
          key={i}
          data-fall={drip.fall}
          className="dhw-drip pointer-events-none absolute h-[2.1%] w-[1.1%] rounded-drop bg-gradient-to-b from-white/95 via-lavender/80 to-primary-light/70 shadow-drop"
          style={{ left: drip.left, top: drip.top }}
        />
      ))}
    </div>
  );
}
