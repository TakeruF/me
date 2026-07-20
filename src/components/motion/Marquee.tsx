"use client";

/**
 * Infinite product-name ribbon. The track holds two identical halves and
 * slides by -50%, so the loop is seamless. Pure CSS animation; the global
 * reduced-motion rule halts it.
 */
export default function Marquee({ items }: { items: { name: string; accent: string }[] }) {
  const doubled = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-white/10 py-5" aria-hidden="true">
      <div className="marquee-track flex w-max items-center gap-10">
        {doubled.map((item, index) => (
          <span key={index} className="flex items-center gap-10">
            <span className="motion-title keep-italic whitespace-nowrap text-2xl italic text-[#f4f2ec] sm:text-3xl">
              {item.name}
            </span>
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: item.accent }}
            />
          </span>
        ))}
      </div>
    </div>
  );
}
