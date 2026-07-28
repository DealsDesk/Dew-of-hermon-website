"use client";

import { useId, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const W = 1440;
const H = 600;

type Pt = [number, number];

/** Deterministic PRNG so server and client render identical paths. */
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
 * Midpoint displacement — the classic fractal terrain algorithm. Each pass
 * halves the segment span, so the random offset naturally shrinks with it and
 * produces sharp summits with believable sub-ridges rather than flat facets.
 */
function displace(
  points: Pt[],
  roughness: number,
  rand: () => number,
  iterations: number
): Pt[] {
  let pts = points;
  for (let i = 0; i < iterations; i++) {
    const next: Pt[] = [pts[0]];
    for (let j = 0; j < pts.length - 1; j++) {
      const [x1, y1] = pts[j];
      const [x2, y2] = pts[j + 1];
      const span = x2 - x1;
      const my = (y1 + y2) / 2 + (rand() - 0.5) * span * roughness;
      next.push([(x1 + x2) / 2, Math.max(70, Math.min(H, my))]);
      next.push(pts[j + 1]);
    }
    pts = next;
  }
  return pts;
}

function toPolyline(pts: Pt[]) {
  return pts
    .map((p, i) => `${i === 0 ? "M" : "L"}${p[0].toFixed(1)},${p[1].toFixed(1)}`)
    .join(" ");
}

function ridgePath(anchors: Pt[], seed: number, roughness: number, iterations: number) {
  const pts = displace(anchors, roughness, mulberry32(seed), iterations);
  return `${toPolyline(pts)} L${W},${H} L0,${H} Z`;
}

/**
 * A jagged horizontal boundary closed off to the top of the viewBox. Clipped
 * to a ridge, everything above the snow line becomes a snowcap that follows
 * the peak's real silhouette.
 */
function snowPath(seed: number, y: number, jitter: number) {
  const rand = mulberry32(seed);
  const anchors: Pt[] = [0, 0.25, 0.5, 0.75, 1].map((t) => [
    W * t,
    y + (rand() - 0.5) * jitter,
  ]);
  const pts = displace(anchors, 0.5, rand, 4);
  return `${toPolyline(pts)} L${W},0 L0,0 Z`;
}

interface Layer {
  path: string;
  fill: string;
  opacity: number;
  snow?: { path: string; opacity: number };
  /** Haze pooling in front of this ridge — simulates valley mist. */
  haze: { top: number; opacity: number };
  depth: number;
}

/** Built once at module scope: same paths on server and client, zero re-render cost. */
const LAYERS: Layer[] = [
  {
    path: ridgePath(
      [
        [0, 360], [150, 235], [300, 300], [430, 175], [560, 265],
        [700, 150], [840, 255], [980, 195], [1120, 290], [1290, 215], [1440, 330],
      ],
      11,
      0.58,
      5
    ),
    fill: "#CDB9E4",
    opacity: 0.85,
    snow: { path: snowPath(101, 252, 44), opacity: 0.95 },
    haze: { top: 300, opacity: 0.5 },
    depth: 6,
  },
  {
    path: ridgePath(
      [
        [0, 425], [170, 300], [320, 372], [480, 255], [640, 342],
        [790, 272], [950, 356], [1110, 286], [1280, 362], [1440, 302],
      ],
      27,
      0.52,
      5
    ),
    fill: "#C0A8DC",
    opacity: 0.9,
    snow: { path: snowPath(202, 322, 38), opacity: 0.78 },
    haze: { top: 372, opacity: 0.42 },
    depth: 12,
  },
  {
    path: ridgePath(
      [
        [0, 472], [190, 372], [350, 442], [520, 352], [690, 432],
        [860, 366], [1030, 446], [1200, 376], [1440, 442],
      ],
      43,
      0.44,
      5
    ),
    fill: "#B295D2",
    opacity: 0.92,
    snow: { path: snowPath(303, 398, 28), opacity: 0.38 },
    haze: { top: 432, opacity: 0.34 },
    depth: 20,
  },
  {
    path: ridgePath(
      [
        [0, 522], [210, 442], [400, 506], [600, 436], [800, 502],
        [1000, 446], [1200, 512], [1440, 462],
      ],
      61,
      0.34,
      4
    ),
    fill: "#A585C9",
    opacity: 0.94,
    haze: { top: 486, opacity: 0.26 },
    depth: 30,
  },
  {
    path: ridgePath(
      [
        [0, 572], [240, 516], [480, 562], [720, 512], [960, 556],
        [1200, 522], [1440, 566],
      ],
      79,
      0.26,
      4
    ),
    fill: "#9877BF",
    opacity: 0.95,
    haze: { top: 534, opacity: 0.2 },
    depth: 42,
  },
];

export default function MistMountains({
  className = "",
  parallax = false,
  /**
   * Height of the mountain band within its container. Full height keeps the
   * whole range in frame on short header sections; the tall hero overrides it
   * so the ridges sit low as a horizon instead of climbing behind the logo.
   */
  band = "100%",
}: {
  className?: string;
  parallax?: boolean;
  band?: string;
}) {
  const scope = useRef<HTMLDivElement>(null);
  // Namespaced so multiple instances on one page don't collide on gradient /
  // clipPath ids. Colons from useId() would break url(#…) references.
  const uid = useId().replace(/:/g, "");

  useGSAP(
    () => {
      if (!parallax || !scope.current) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.utils.toArray<SVGGElement>(".dhw-ridge").forEach((layer) => {
        const depth = Number(layer.dataset.depth ?? 10);
        gsap.to(layer, {
          y: depth,
          ease: "none",
          scrollTrigger: {
            trigger: scope.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.6,
          },
        });
      });
    },
    { scope, dependencies: [parallax] }
  );

  return (
    <div
      ref={scope}
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMax slice"
        className="absolute bottom-0 left-0 w-full"
        style={{ height: band }}
        aria-hidden="true"
      >
        <defs>
          {LAYERS.map((layer, i) => (
            <clipPath key={i} id={`${uid}-clip-${i}`}>
              <path d={layer.path} />
            </clipPath>
          ))}

          {LAYERS.map((layer, i) => (
            <linearGradient
              key={i}
              id={`${uid}-haze-${i}`}
              x1="0"
              y1={layer.haze.top}
              x2="0"
              y2={H}
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#FCFAFE" stopOpacity="0" />
              <stop offset="55%" stopColor="#FCFAFE" stopOpacity={layer.haze.opacity * 0.7} />
              <stop offset="100%" stopColor="#FCFAFE" stopOpacity={layer.haze.opacity} />
            </linearGradient>
          ))}

          {/* Sun-facing slopes catch a little warmth; shaded faces stay cool. */}
          <linearGradient id={`${uid}-light`} x1="0" y1="0" x2="1" y2="0.4">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.28" />
            <stop offset="45%" stopColor="#FFFFFF" stopOpacity="0" />
            <stop offset="100%" stopColor="#3E2A54" stopOpacity="0.12" />
          </linearGradient>

          {/* Softens the seam where the range meets the next section. */}
          <linearGradient
            id={`${uid}-basefade`}
            x1="0"
            y1={H * 0.82}
            x2="0"
            y2={H}
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#FCFAFE" stopOpacity="0" />
            <stop offset="100%" stopColor="#FCFAFE" stopOpacity="0.55" />
          </linearGradient>

          {/* Summits dissolve into morning haze instead of ending on a hard edge. */}
          <linearGradient
            id={`${uid}-skyfade`}
            x1="0"
            y1="0"
            x2="0"
            y2={H * 0.55}
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#FCFAFE" stopOpacity="0.78" />
            <stop offset="45%" stopColor="#FCFAFE" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#FCFAFE" stopOpacity="0" />
          </linearGradient>
        </defs>

        {LAYERS.map((layer, i) => (
          <g key={i} className="dhw-ridge" data-depth={layer.depth}>
            <path d={layer.path} fill={layer.fill} opacity={layer.opacity} />

            {layer.snow && (
              <g clipPath={`url(#${uid}-clip-${i})`}>
                <path
                  d={layer.snow.path}
                  fill="#FFFFFF"
                  opacity={layer.snow.opacity}
                />
              </g>
            )}

            <g clipPath={`url(#${uid}-clip-${i})`}>
              <rect
                x="0"
                y="0"
                width={W}
                height={H}
                fill={`url(#${uid}-light)`}
              />
            </g>

            {/* Mist settling in front of this ridge builds depth between layers. */}
            <rect
              x="0"
              y={layer.haze.top}
              width={W}
              height={H - layer.haze.top}
              fill={`url(#${uid}-haze-${i})`}
            />
          </g>
        ))}

        <rect
          x="0"
          y="0"
          width={W}
          height={H * 0.55}
          fill={`url(#${uid}-skyfade)`}
        />

        <rect
          x="0"
          y={H * 0.82}
          width={W}
          height={H * 0.18}
          fill={`url(#${uid}-basefade)`}
        />
      </svg>
    </div>
  );
}
