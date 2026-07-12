"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * The International Space Station — centerpiece of the universe map.
 * Drawn as a detailed SVG: truss, four paired solar wings, radiators and
 * the pressurized module stack. Purely decorative; planets orbit around it.
 */

// One solar wing pair (two long cell strips above + below the truss).
function SolarWing({ x }: { x: number }) {
  return (
    <g>
      {/* mast */}
      <rect x={x - 2} y={26} width={4} height={208} fill="#3a4152" />
      <rect x={x - 4.5} y={122} width={9} height={16} rx={2} fill="#59627a" stroke="rgba(255,255,255,0.2)" strokeWidth={0.6} />
      {/* upper strips */}
      {[-20.5, 3.5].map((dx) => (
        <g key={`u${dx}`}>
          <rect x={x + dx} y={28} width={17} height={92} rx={1.5} fill="url(#solarGrad)" stroke="rgba(255,255,255,0.22)" strokeWidth={0.7} />
          <rect x={x + dx} y={28} width={17} height={92} fill="url(#solarCells)" opacity={0.85} />
        </g>
      ))}
      {/* lower strips */}
      {[-20.5, 3.5].map((dx) => (
        <g key={`l${dx}`}>
          <rect x={x + dx} y={140} width={17} height={92} rx={1.5} fill="url(#solarGrad)" stroke="rgba(255,255,255,0.22)" strokeWidth={0.7} />
          <rect x={x + dx} y={140} width={17} height={92} fill="url(#solarCells)" opacity={0.85} />
        </g>
      ))}
    </g>
  );
}

export default function ISS() {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className="pointer-events-none relative"
      style={{ width: "calc(380px * var(--planet-scale, 1))" }}
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-15% 0px" }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Ambient glow behind the station */}
      <div
        className="absolute -inset-16 -z-10 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(148,163,255,0.2), rgba(34,211,238,0.08) 55%, transparent 75%)" }}
        aria-hidden="true"
      />

      <motion.svg
        viewBox="0 0 480 260"
        className="block h-auto w-full drop-shadow-[0_10px_30px_rgba(0,0,0,0.6)]"
        role="img"
        aria-label="International Space Station at the center of the universe"
        animate={reduce ? undefined : { y: [-7, 7, -7], rotate: [-1.2, 1.2, -1.2] }}
        transition={
          reduce
            ? undefined
            : {
                y: { duration: 13, repeat: Infinity, ease: "easeInOut" },
                rotate: { duration: 19, repeat: Infinity, ease: "easeInOut" },
              }
        }
      >
        <defs>
          <linearGradient id="solarGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#5d3f18" />
            <stop offset="45%" stopColor="#b8863e" />
            <stop offset="60%" stopColor="#d9a659" />
            <stop offset="100%" stopColor="#4e3312" />
          </linearGradient>
          <pattern id="solarCells" width="17" height="6.5" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0.5" x2="17" y2="0.5" stroke="rgba(10,8,4,0.5)" strokeWidth="0.8" />
            <line x1="8.5" y1="0" x2="8.5" y2="6.5" stroke="rgba(10,8,4,0.35)" strokeWidth="0.6" />
          </pattern>
          <linearGradient id="trussGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8b93a7" />
            <stop offset="50%" stopColor="#636c81" />
            <stop offset="100%" stopColor="#363c4c" />
          </linearGradient>
          <linearGradient id="moduleGradV" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#f2f5fa" />
            <stop offset="45%" stopColor="#b9c2d2" />
            <stop offset="100%" stopColor="#5d6678" />
          </linearGradient>
          <linearGradient id="moduleGradH" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#eef2f8" />
            <stop offset="45%" stopColor="#aeb8ca" />
            <stop offset="100%" stopColor="#525b6e" />
          </linearGradient>
          <linearGradient id="radiatorGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#dde5f0" />
            <stop offset="100%" stopColor="#8494ad" />
          </linearGradient>
        </defs>

        {/* --- main truss --- */}
        <rect x={64} y={124} width={352} height={11} rx={2} fill="url(#trussGrad)" />
        {/* truss lattice ticks */}
        {Array.from({ length: 34 }).map((_, i) => (
          <line
            key={i}
            x1={68 + i * 10.2}
            y1={124}
            x2={74 + i * 10.2}
            y2={135}
            stroke="rgba(8,10,18,0.45)"
            strokeWidth={1}
          />
        ))}

        {/* --- solar array wings (P6/P4 · S4/S6) --- */}
        <SolarWing x={96} />
        <SolarWing x={150} />
        <SolarWing x={330} />
        <SolarWing x={384} />

        {/* --- radiators --- */}
        <g transform="rotate(14 208 146)">
          <rect x={202} y={146} width={12} height={52} rx={1.5} fill="url(#radiatorGrad)" stroke="rgba(255,255,255,0.25)" strokeWidth={0.6} />
          {[0, 1, 2].map((i) => (
            <line key={i} x1={205 + i * 3} y1={146} x2={205 + i * 3} y2={198} stroke="rgba(40,48,66,0.5)" strokeWidth={0.7} />
          ))}
        </g>
        <g transform="rotate(194 272 114)">
          <rect x={266} y={114} width={12} height={52} rx={1.5} fill="url(#radiatorGrad)" stroke="rgba(255,255,255,0.25)" strokeWidth={0.6} />
          {[0, 1, 2].map((i) => (
            <line key={i} x1={269 + i * 3} y1={114} x2={269 + i * 3} y2={166} stroke="rgba(40,48,66,0.5)" strokeWidth={0.7} />
          ))}
        </g>

        {/* --- pressurized module stack (fore–aft axis) --- */}
        {/* axial modules */}
        <rect x={228} y={58} width={24} height={144} rx={11} fill="url(#moduleGradV)" stroke="rgba(255,255,255,0.18)" strokeWidth={0.7} />
        {/* hull rings */}
        {[76, 96, 128, 152, 176].map((y) => (
          <line key={y} x1={229} y1={y} x2={251} y2={y} stroke="rgba(30,36,50,0.4)" strokeWidth={1} />
        ))}
        {/* fore capsule */}
        <rect x={231.5} y={40} width={17} height={24} rx={8} fill="url(#moduleGradV)" stroke="rgba(255,255,255,0.18)" strokeWidth={0.7} />
        {/* central node (crosses the truss) */}
        <rect x={214} y={116} width={52} height={27} rx={12} fill="url(#moduleGradH)" stroke="rgba(255,255,255,0.2)" strokeWidth={0.8} />
        {/* lab modules, port & starboard */}
        <rect x={184} y={140} width={32} height={19} rx={9} fill="url(#moduleGradH)" stroke="rgba(255,255,255,0.16)" strokeWidth={0.7} />
        <rect x={264} y={140} width={32} height={19} rx={9} fill="url(#moduleGradH)" stroke="rgba(255,255,255,0.16)" strokeWidth={0.7} />
        {/* cupola nub */}
        <circle cx={240} cy={150} r={5} fill="#2c3242" stroke="rgba(255,255,255,0.3)" strokeWidth={0.7} />
        <circle cx={240} cy={150} r={2.2} fill="#67e8f9" opacity={0.8} />

        {/* docked crew vehicle (aft) + its small panels */}
        <rect x={233} y={202} width={14} height={19} rx={6} fill="url(#moduleGradV)" stroke="rgba(255,255,255,0.16)" strokeWidth={0.6} />
        <g transform="rotate(-22 233 210)">
          <rect x={215} y={208} width={18} height={4.5} rx={1} fill="url(#solarGrad)" />
        </g>
        <g transform="rotate(22 247 210)">
          <rect x={247} y={208} width={18} height={4.5} rx={1} fill="url(#solarGrad)" />
        </g>

        {/* comms dish */}
        <line x1={256} y1={62} x2={264} y2={50} stroke="#7a8398" strokeWidth={1.4} />
        <circle cx={266} cy={47.5} r={5.5} fill="#1d2230" stroke="#9aa4b8" strokeWidth={1} />

        {/* nav beacons */}
        <circle className="animate-pulse-soft" cx={66} cy={129.5} r={2.4} fill="#f87171" />
        <circle className="animate-pulse-soft" cx={414} cy={129.5} r={2.4} fill="#4ade80" style={{ animationDelay: "-3s" }} />
      </motion.svg>

      {/* Label */}
      <div className="absolute left-1/2 top-full mt-3 w-max -translate-x-1/2 text-center">
        <div className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">ISS</div>
        <div className="mt-1 text-[11px] tracking-wide text-white/40">Mission Control · Takeru Station</div>
      </div>
    </motion.div>
  );
}
