"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

/**
 * Full-viewport mist/cloud layer shown once on load. The clouds drift
 * apart and dissolve to reveal the site underneath, echoing mist
 * clearing from Mount Hermon's slopes.
 */
export default function CloudReveal() {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;

      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const clouds = gsap.utils.toArray<HTMLElement>(".dhw-cloud");
      const veil = root.querySelector(".dhw-veil");

      if (prefersReduced) {
        gsap.set(root, { autoAlpha: 0, display: "none" });
        return;
      }

      document.body.style.overflow = "hidden";

      const tl = gsap.timeline({
        delay: 0.2,
        defaults: { ease: "power3.inOut" },
        onComplete: () => {
          gsap.set(root, { display: "none" });
          document.body.style.overflow = "";
        },
      });

      tl.to(veil, { opacity: 0, duration: 0.6 }, 0.4)
        .to(
          clouds,
          {
            y: (i) => (i % 2 === 0 ? "-115%" : "115%"),
            x: (i) => (i % 3 === 0 ? "-40%" : i % 3 === 1 ? "40%" : "0%"),
            opacity: 0,
            scale: 1.25,
            duration: 1.7,
            stagger: {
              each: 0.09,
              from: "center",
            },
          },
          0.15
        )
        .set(root, { autoAlpha: 0 });
    },
    { scope }
  );

  return (
    <div
      ref={scope}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[100] overflow-hidden bg-bg"
    >
      <div className="dhw-veil absolute inset-0 bg-mist-gradient" />
      <div className="absolute inset-0 grid grid-cols-3 grid-rows-3">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="relative flex items-center justify-center">
            <div
              className="dhw-cloud h-[70%] w-[85%] rounded-[45%_55%_60%_40%/55%_45%_55%_45%] bg-white/90 blur-2xl"
              style={{
                boxShadow: "0 0 120px 60px rgba(255,255,255,0.9)",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
