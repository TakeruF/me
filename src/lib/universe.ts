// Content + types for the "Takeru Universe".
// All copy and visual config for the celestial objects lives here so the
// scene components stay purely presentational and data-driven.

// TODO: replace with the real Hanlu app / landing-page URL.
export const HANLU_URL = "https://hanlu.app";
// TODO: replace with Takeru's real GitHub profile URL.
export const GITHUB_URL = "https://github.com/TakeruF";
export const LINKEDIN_URL = "https://www.linkedin.com/in/takeru-fujii-34656040a/";

export const PROFILE = {
  name: "Takeru Fujii",
  tagline: "Building tools for language learners.",
  intro:
    "First-year Economics student at Waseda University, building Hanlu — exploring the space where language, AI, and product design meet.",
  github: GITHUB_URL,
  linkedin: LINKEDIN_URL,
} as const;

export type CelestialKind = "planet" | "moon" | "station" | "orbit" | "nebula";
export type Align = "left" | "center" | "right";

export interface CelestialBody {
  id: string;
  /** Proper name, e.g. "Hanlu". */
  name: string;
  /** Kind label shown under the name, e.g. "Planet". */
  designation: string;
  kind: CelestialKind;
  /** Short label revealed on hover. */
  tagline: string;
  /** One-line role shown in the detail panel header. */
  role: string;
  /** Panel body copy. */
  description: string;
  tags: string[];
  // --- visual ---
  /** Three radial-gradient stops for the sphere surface (light → mid → dark). */
  gradient: [string, string, string];
  /** Glow / accent color. */
  glow: string;
  /** Procedural surface style used to render the sphere. */
  texture: import("@/lib/planetTexture").TextureKind;
  /** Diameter in px at depth 1 (desktop). Scaled by depth + viewport. */
  size: number;
  /** Render a planetary ring. */
  ring?: boolean;
  /** Number of small orbiting satellites. */
  moons?: number;
  // --- layout ---
  align: Align;
  /** 0.5–1: closeness to camera → controls scale, parallax + mouse reactivity. */
  depth: number;
  // --- optional outbound link ---
  href?: string;
  cta?: string;
}

export const UNIVERSE: CelestialBody[] = [
  {
    id: "hanlu",
    name: "Hanlu",
    designation: "Home Planet",
    kind: "planet",
    tagline: "Learn Chinese, the Japanese way",
    role: "Flagship project · Language-learning app",
    description:
      "Hanlu is a Chinese-learning app built for Japanese speakers — bridging kanji intuition and Mandarin through thoughtful, modern product design. It's the gravitational center of my work, where language, education, and technology converge.",
    tags: ["Chinese ↔ Japanese", "Product", "EdTech", "Mobile"],
    gradient: ["#c4b5fd", "#7c3aed", "#1e1b4b"],
    glow: "#a855f7",
    texture: "banded",
    size: 200,
    ring: true,
    moons: 1,
    align: "center",
    depth: 1,
    href: HANLU_URL,
    cta: "Visit Hanlu",
  },
  {
    id: "language",
    name: "Language",
    designation: "Moon",
    kind: "moon",
    tagline: "Mandarin, HSK & the joy of words",
    role: "Interest · Language learning",
    description:
      "Orbiting everything I build is a fascination with languages. I study Mandarin toward HSK fluency and love the mechanics of how learners actually acquire a language — the patterns, the plateaus, the breakthroughs.",
    tags: ["Mandarin", "HSK", "Linguistics", "Self-study"],
    gradient: ["#a7f3d0", "#14b8a6", "#0f3b3a"],
    glow: "#22d3ee",
    texture: "rocky",
    size: 112,
    moons: 0,
    align: "left",
    depth: 0.78,
  },
  {
    id: "ai",
    name: "AI Station",
    designation: "Orbital Station",
    kind: "station",
    tagline: "ChatGPT Lab @ Waseda",
    role: "Community · AI projects & workshops",
    description:
      "I'm part of the ChatGPT Lab at Waseda, where I prototype AI projects, run workshops, and explore how large language models can reshape the way we learn and build. It's my docking port to the frontier.",
    tags: ["ChatGPT Lab", "LLMs", "Workshops", "Prototyping"],
    gradient: ["#bfdbfe", "#4f46e5", "#10142e"],
    glow: "#6366f1",
    texture: "ice",
    size: 132,
    moons: 2,
    align: "right",
    depth: 0.9,
  },
  {
    id: "economics",
    name: "Economics",
    designation: "Orbit",
    kind: "orbit",
    tagline: "Waseda University · Economics",
    role: "Study · First-year economics",
    description:
      "A first-year Economics student at Waseda University. Economics is my lens for thinking about incentives, systems, and the markets the products I build will one day live in.",
    tags: ["Waseda", "Economics", "First-year"],
    gradient: ["#bae6fd", "#2563eb", "#0a1733"],
    glow: "#3b82f6",
    texture: "terran",
    size: 124,
    align: "left",
    depth: 0.68,
  },
  {
    id: "future",
    name: "Future",
    designation: "Nebula",
    kind: "nebula",
    tagline: "What I haven't built yet",
    role: "Frontier · Ideas & experiments",
    description:
      "The uncharted region of the map: experiments, half-formed ideas, and the things I want to build next. The universe is still expanding — and this is where it grows.",
    tags: ["Experiments", "Ideas", "What's next"],
    gradient: ["#f5d0fe", "#a21caf", "#2a0d3a"],
    glow: "#d946ef",
    texture: "gas",
    size: 152,
    align: "right",
    depth: 0.85,
  },
];
