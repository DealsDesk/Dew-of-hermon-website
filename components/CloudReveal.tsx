"use client";

import { useEffect, useRef } from "react";
import { createTimeline, utils } from "animejs";

const VB_W = 1000;
const VB_H = 700;

/** Share of the viewport height the visitor scrolls to fully clear the mist. */
const CLEAR_DISTANCE = 0.6;

type Ellipse = { cx: number; cy: number; rx: number; ry: number };

/** Deterministic PRNG so server and client render identical cloud shapes. */
function mulberry32(seed: number) {
  let a = seed;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * A closed organic blob: the radius is modulated by a few summed harmonics, so
 * the outline bulges and pinches like a cloud rather than reading as an
 * ellipse. Baked to a static path at module load — the previous approach
 * displaced ellipses with a live feTurbulence filter, which had to re-run on
 * every frame of the scroll scrub and dragged it down to a few fps.
 */
function blobPath(e: Ellipse, seed: number, wobble = 0.18) {
  const rand = mulberry32(seed);
  const harmonics = [3, 5, 7, 11].map((k) => ({
    k,
    amp: wobble * (rand() * 0.6 + 0.4) * (3 / k),
    phase: rand() * Math.PI * 2,
  }));

  const STEPS = 64;
  const pts: string[] = [];
  for (let i = 0; i < STEPS; i++) {
    const t = (i / STEPS) * Math.PI * 2;
    let m = 1;
    for (const h of harmonics) m += h.amp * Math.sin(h.k * t + h.phase);
    const x = e.cx + Math.cos(t) * e.rx * m;
    const y = e.cy + Math.sin(t) * e.ry * m;
    pts.push(`${x.toFixed(1)},${y.toFixed(1)}`);
  }
  return `M${pts.join(" L")} Z`;
}

/**
 * Cloud banks, each scrubbed as a unit. Ellipses are pushed through a
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

  useEffect(() => {
    const root = scope.current;
    if (!root) return;

    const q = (sel: string) => root.querySelector<HTMLElement>(sel);
    const bank = (key: string) =>
      root.querySelector<SVGGElement>(`[data-bank="${key}"]`);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      root.style.display = "none";
      return;
    }

    // One paused timeline holding the whole parting, scrubbed by scroll
    // position rather than played on a clock.
    const tl = createTimeline({
      autoplay: false,
      defaults: { ease: "linear", duration: 1000 },
    });

    tl.add(bank("core")!, { scale: 2.1, opacity: 0 }, 0)
      .add(bank("left")!, { x: -680, y: -120, rotate: -7, opacity: 0 }, 0)
      .add(bank("right")!, { x: 680, y: -120, rotate: 7, opacity: 0 }, 0)
      .add(bank("top")!, { y: -460, opacity: 0 }, 0)
      .add(bank("base")!, { y: 360, opacity: 0 }, 0)
      .add(q(".dhw-glow")!, { scale: [0.4, 2.4], opacity: [0, 0.6, 0] }, 0)
      // Ends at 1000 like every other tween, so the whole timeline completes
      // together instead of the veil trailing past the parted banks.
      .add(q(".dhw-veil")!, { opacity: 0, duration: 800 }, 200)
      .add(q(".dhw-hint")!, { opacity: [1, 0], duration: 260 }, 0);

    let target = 0;
    let current = 0;
    let raf = 0;
    let running = true;

    const readScroll = () => {
      const span = window.innerHeight * CLEAR_DISTANCE;
      const p = utils.clamp(window.scrollY / span, 0, 1);
      // One-way: once the mist is cleared it stays cleared, so scrolling back
      // up never hides the logo or the booking CTA again.
      target = Math.max(target, p);
    };

    const tick = () => {
      if (!running) return;
      // Ease toward the scroll target so the parting glides instead of
      // snapping frame-to-frame with the wheel.
      current = utils.lerp(current, target, 0.18);

      // The eased value only approaches 1 asymptotically, so close the last
      // sliver outright — at this point the mist is already imperceptible, and
      // this guarantees the overlay actually retires.
      if (current >= 0.99) {
        tl.seek(tl.duration);
        root.style.display = "none";
        running = false;
        window.removeEventListener("scroll", readScroll);
        window.removeEventListener("resize", readScroll);
        return;
      }

      tl.seek(tl.duration * current);
      raf = requestAnimationFrame(tick);
    };

    readScroll();
    raf = requestAnimationFrame(tick);
    window.addEventListener("scroll", readScroll, { passive: true });
    window.addEventListener("resize", readScroll);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", readScroll);
      window.removeEventListener("resize", readScroll);
    };
  }, []);

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
        {BANKS.map((b) => (
          <g
            key={b.key}
            data-bank={b.key}
            opacity={b.opacity}
            style={{
              transformBox: "fill-box",
              transformOrigin: "center",
              willChange: "transform, opacity",
              // A plain blur composites cheaply, unlike a per-frame turbulence pass.
              filter: "blur(16px)",
            }}
          >
            {b.ellipses.map((e, i) => (
              <path key={i} d={blobPath(e, b.seed * 31 + i * 7)} fill="#FFFFFF" />
            ))}
          </g>
        ))}
      </svg>

      {/* The page loads behind mist, so say plainly how to clear it. */}
      <div className="dhw-hint absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3">
        <span className="font-body text-[11px] uppercase tracking-[0.3em] text-primary-dark/70">
          Scroll to clear the mist
        </span>
        <span className="h-10 w-px animate-pulse bg-primary-dark/30" />
      </div>
    </div>
  );
}
