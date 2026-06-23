"use client";

import { useReducedMotion } from "framer-motion";
import { useState } from "react";
import CursorGlow from "@/components/CursorGlow";
import DetailPanel from "@/components/DetailPanel";
import Hero from "@/components/Hero";
import Nebula from "@/components/Nebula";
import OrbitNav from "@/components/OrbitNav";
import Outro from "@/components/Outro";
import Starfield from "@/components/Starfield";
import UniverseMap from "@/components/UniverseMap";
import { useIsTouch } from "@/lib/hooks/useIsTouch";
import type { CelestialBody } from "@/lib/universe";

export default function Page() {
  const reduce = useReducedMotion();
  const isTouch = useIsTouch();
  const interactive = !isTouch && !reduce;

  const [selected, setSelected] = useState<CelestialBody | null>(null);

  return (
    <>
      {/* Persistent space backdrop (fixed layers) */}
      <Nebula />
      <Starfield reducedMotion={!!reduce} interactive={interactive} />
      <CursorGlow enabled={interactive} />

      <main className="relative z-0">
        <Hero />
        <UniverseMap onSelect={setSelected} interactive={interactive} />
        <Outro />
      </main>

      <OrbitNav />
      <DetailPanel body={selected} onClose={() => setSelected(null)} />
    </>
  );
}
