"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const VB_W = 1000;
const VB_H = 700;

type Ellipse = { cx: number; cy: number; rx: number; ry: number };

/**
 * Cloud banks, each animated as a unit. Ellipses are pushed through a
 * fractal-noise displacement filter, so their edges tear into wisps instead of
 * reading as blurred circles.
 */
const BANKS: {
  key: string;
  seed: number;
  opacity: number;
  ellipses: Ellipse[];
}[] = [
  {
    key: "top",
    seed: 3,
    opacity: 0.95,
    ellipses: [
      { cx: 150, cy: 80, rx: 280, ry: 120 },
      { cx: 430, cy: 45, rx: 310, ry: 130 },
      { cx: 720, cy: 85, rx: 290, ry: 120 },
      { cx: 960, cy: 55, rx: 260, ry: 115 },
    ],
  },
  {
    key: "left",
    seed: 11,
    opacity: 0.92,
    ellipses: [
      { cx: 110, cy: 290, rx: 290, ry: 165 },
      { cx: 40, cy: 470, rx: 310, ry: 175 },
      { cx: 250, cy: 395, rx: 245, ry: 150 },
    ],
  },
  {
    key: "right",
    seed: 19,
    opacity: 0.92,
    ellipses: [
      { cx: 890, cy: 285, rx: 295, ry: 168 },
      { cx: 965, cy: 470, rx: 305, ry: 175 },
      { cx: 755, cy: 390, rx: 245, ry: 150 },
    ],
  },
  {
    key: "core",
    seed: 27,
    opacity: 0.88,
    ellipses: [
      { cx: 500, cy: 330, rx: 350, ry: 205 },
      { cx: 385, cy: 425, rx: 285, ry: 172 },
      { cx: 625, cy: 415, rx: 295, ry: 178 },
    ],
  },
  {
    key: "base",
    seed: 35,
    opacity: 0.9,
    ellipses: [
      { cx: 190, cy: 650, rx: 350, ry: 145 },
      { cx: 520, cy: 690, rx: 390, ry: 155 },
      { cx: 860, cy: 655, rx: 350, ry: 145 },
    ],
  },
];

export default function CloudReveal() {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;

      const bank = (key: string) => root.querySelector(`[data-bank="${key}"]`);

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(root, { autoAlpha: 0, display: "none" });
        return;
      }

      document.body.style.overflow = "hidden";

      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        onComplete: () => {
          gsap.set(root, { display: "none" });
          document.body.style.overflow = "";
        },
      });

      // Dawn breaking through the mist before it clears.
      tl.fromTo(
        root.querySelector(".dhw-glow"),
        { scale: 0.35, opacity: 0 },
        { scale: 2.4, opacity: 0.6, duration: 1.4, ease: "power2.out" },
        0.1
      ).to(
        root.querySelector(".dhw-glow"),
        { opacity: 0, duration: 1.1, ease: "power1.in" },
        1.3
      );

      // Drift and dissolve are deliberately separate: the banks travel first
      // and only thin out in the back half, so the parting reads as movement
      // rather than a plain crossfade.
      const drift = { duration: 2.3, ease: "power2.inOut" as const };
      const dissolve = { opacity: 0, duration: 1.5, ease: "power1.in" as const };

      // The near mass drifts toward the viewer.
      tl.to(
        bank("core"),
        { scale: 2.1, transformOrigin: "50% 48%", ...drift },
        0.15
      ).to(bank("core"), { ...dissolve, duration: 1.7 }, 0.8);

      // Side banks draw back like curtains.
      tl.to(
        bank("left"),
        { x: -680, y: -120, rotation: -7, transformOrigin: "50% 50%", ...drift },
        0.2
      )
        .to(
          bank("right"),
          { x: 680, y: -120, rotation: 7, transformOrigin: "50% 50%", ...drift },
          0.2
        )
        .to(bank("left"), dissolve, 0.95)
        .to(bank("right"), dissolve, 0.95);

      // High cloud lifts, low mist settles into the valleys.
      tl.to(bank("top"), { y: -460, ...drift }, 0.3)
        .to(bank("base"), { y: 360, ...drift }, 0.3)
        .to(bank("top"), dissolve, 1.0)
        .to(bank("base"), dissolve, 1.0);

      tl.to(
        root.querySelector(".dhw-veil"),
        { opacity: 0, duration: 1.5, ease: "power1.inOut" },
        0.7
      );

      // The page settles the last fraction as the mist releases it.
      const main = document.querySelector("main");
      if (main) {
        tl.fromTo(
          main,
          { scale: 1.04 },
          { scale: 1, duration: 2.6, ease: "power2.out", clearProps: "transform" },
          0.25
        );
      }

      tl.to(root, { autoAlpha: 0, duration: 0.35 }, 2.5);
    },
    { scope }
  );

  return (
    <div
      ref={scope}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[100] overflow-hidden"
    >
      {/* Deeper than the page background so the white cloud banks read as form
          rather than dissolving into a blank screen. */}
      <div
        className="dhw-veil absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #EFE8F8 0%, #DDCFEE 42%, #C6B1DF 100%)",
        }}
      />

      <div
        className="dhw-glow absolute left-1/2 top-[44%] h-[48vmax] w-[48vmax] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255,252,246,0.85) 0%, rgba(252,244,255,0.5) 38%, rgba(228,216,242,0) 72%)",
        }}
      />

      <svg
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          {BANKS.map((b) => (
            <filter
              key={b.key}
              id={`dhw-wisp-${b.key}`}
              x="-35%"
              y="-35%"
              width="170%"
              height="170%"
            >
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.009 0.016"
                numOctaves={4}
                seed={b.seed}
                result="noise"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="noise"
                scale={130}
                xChannelSelector="R"
                yChannelSelector="G"
              />
              <feGaussianBlur stdDeviation={11} />
            </filter>
          ))}
        </defs>

        {BANKS.map((b) => (
          <g
            key={b.key}
            data-bank={b.key}
            filter={`url(#dhw-wisp-${b.key})`}
            opacity={b.opacity}
            style={{ willChange: "transform, opacity" }}
          >
            {b.ellipses.map((e, i) => (
              <ellipse key={i} cx={e.cx} cy={e.cy} rx={e.rx} ry={e.ry} fill="#FFFFFF" />
            ))}
          </g>
        ))}
      </svg>
    </div>
  );
}
