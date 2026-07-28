"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { animate, utils } from "animejs";

/**
 * Drip anchor points, expressed as a percentage of the logo image's
 * width/height. They line up with the three small dew drops already
 * painted onto the leaves in the source artwork, so the looping drip
 * reads as those same drops continuously re-forming and falling.
 */
const DRIPS = [
  { left: "47.6%", top: "10.5%", delay: 0, fall: 58, loopDelay: 1500 },
  { left: "54.2%", top: "17.5%", delay: 1400, fall: 72, loopDelay: 1100 },
  { left: "60.8%", top: "20.5%", delay: 2600, fall: 50, loopDelay: 1800 },
];

export default function AnimatedLogo({ className = "" }: { className?: string }) {
  const scope = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = scope.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const drops = Array.from(root.querySelectorAll<HTMLElement>(".dhw-drip"));

    const animations = drops.map((drop, i) => {
      const cfg = DRIPS[i];

      utils.set(drop, { opacity: 0, scaleX: 0.2, scaleY: 0.2, y: 0 });

      return animate(drop, {
        keyframes: [
          // Bead swells on the leaf tip and stretches under its own weight.
          { opacity: 1, scaleX: 1, scaleY: 1.35, duration: 500, ease: "outSine" },
          // Surface tension pulls it back to round.
          { scaleY: 1, duration: 150, ease: "outQuad" },
          { duration: 350 },
          // Releases, thinning as it accelerates away.
          {
            y: cfg.fall,
            scaleX: 0.7,
            scaleY: 1.6,
            opacity: 0,
            duration: 850,
            ease: "inQuad",
          },
        ],
        delay: cfg.delay,
        loop: true,
        loopDelay: cfg.loopDelay,
      });
    });

    return () => animations.forEach((a) => a.revert());
  }, []);

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
          className="dhw-drip pointer-events-none absolute h-[2.1%] w-[1.1%] rounded-drop bg-gradient-to-b from-white/95 via-lavender/80 to-primary-light/70 shadow-drop"
          style={{ left: drip.left, top: drip.top, transformOrigin: "50% 0%" }}
        />
      ))}
    </div>
  );
}
