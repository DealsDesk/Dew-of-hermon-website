export default function MistMountains({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <svg
        viewBox="0 0 1440 500"
        preserveAspectRatio="xMidYMax slice"
        className="absolute bottom-0 left-0 h-full w-full"
        aria-hidden="true"
      >
        <path
          d="M0 420 L220 240 L340 320 L520 140 L700 300 L860 190 L1040 340 L1200 220 L1440 380 L1440 500 L0 500 Z"
          fill="#E4D8F2"
          opacity="0.6"
        />
        <path
          d="M0 460 L180 320 L360 400 L540 260 L760 400 L980 280 L1180 400 L1440 320 L1440 500 L0 500 Z"
          fill="#C3AEDC"
          opacity="0.55"
        />
        <path
          d="M0 500 L140 400 L300 460 L480 360 L660 460 L860 380 L1080 460 L1280 400 L1440 460 L1440 500 Z"
          fill="#8E76AE"
          opacity="0.4"
        />
      </svg>
    </div>
  );
}
