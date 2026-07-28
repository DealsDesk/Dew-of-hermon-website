import { ReactNode } from "react";

export default function GlassCard({
  children,
  className = "",
  dark = false,
}: {
  children: ReactNode;
  className?: string;
  dark?: boolean;
}) {
  return (
    <div
      className={`group relative overflow-hidden rounded-[28px] ${
        dark ? "glass-dark text-white" : "glass text-ink"
      } p-8 shadow-glass transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-glass-lg ${className}`}
    >
      <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-drop bg-lavender/20 blur-2xl transition-transform duration-700 ease-out group-hover:scale-125" />
      <div className="relative">{children}</div>
    </div>
  );
}
