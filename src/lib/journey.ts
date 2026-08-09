export type Destination = {
  id: string;
  index: string;
  name: string;
  eyebrow: string;
  location: string;
  coordinates: string;
  title: [string, string];
  description: string;
  image: string;
  href?: string;
  cta: string;
  status: string;
  accent: string;
  textTone: "light" | "dark";
  station: {
    name: string;
    code: string;
    image: string;
    intro: string;
    note: string;
    features: [string, string, string];
    facts: [
      { label: string; value: string },
      { label: string; value: string },
      { label: string; value: string },
    ];
    color: string;
    ink: string;
    align: "left" | "right";
  };
};

export const DESTINATIONS: Destination[] = [
  {
    id: "keyboard",
    index: "01",
    name: "Keyboard",
    eyebrow: "Japanese input without the guesswork",
    location: "Yamanashi, Japan",
    coordinates: "35.3606° N · 138.7274° E",
    title: ["Know the reading", "before you choose."],
    description:
      "A Japanese keyboard that shows how every candidate is read before it enters the sentence—whether you write by hand or type in romaji.",
    image: "/journey/keyboard-japan.webp",
    href: "https://keyboard.hanlu.app",
    cta: "Open Keyboard",
    status: "Live",
    accent: "#f0aa8b",
    textTone: "dark",
    station: {
      name: "Yomikata",
      code: "KBD · 01",
      image: "/journey/station-keyboard-v2.webp",
      intro:
        "Keyboard keeps the reading visible at the exact moment it matters: before a candidate becomes part of your sentence.",
      note: "Choose the right word with confidence, not guesswork.",
      features: ["Handwriting + romaji", "Readings before confirmation", "Built for daily writing"],
      facts: [
        { label: "Input", value: "Handwriting + Romaji" },
        { label: "Designed for", value: "Japanese writers" },
        { label: "Availability", value: "Live now" },
      ],
      color: "#e7d8bd",
      ink: "#17362a",
      align: "right",
    },
  },
  {
    id: "hanlu",
    index: "02",
    name: "Hanlu",
    eyebrow: "Mandarin learning for Japanese speakers",
    location: "Guilin, China",
    coordinates: "25.2736° N · 110.2900° E",
    title: ["Use the kanji", "you already know."],
    description:
      "Hanlu turns existing kanji intuition into a head start in Mandarin, connecting familiar characters to pronunciation, meaning, and real usage.",
    image: "/journey/hanlu-china.webp",
    href: "https://hanlu.app",
    cta: "Explore Hanlu",
    status: "Live",
    accent: "#bad5be",
    textTone: "dark",
    station: {
      name: "Hanzi Bridge",
      code: "HNL · 02",
      image: "/journey/station-hanlu-v2.webp",
      intro:
        "Hanlu turns the kanji knowledge Japanese learners already have into a bridge toward Mandarin sound, meaning, and use.",
      note: "Start from the characters you know, then learn how Chinese thinks and sounds.",
      features: ["Built for Japanese speakers", "Sound, meaning + usage", "Kanji as a learning bridge"],
      facts: [
        { label: "Language", value: "Japanese → Mandarin" },
        { label: "Approach", value: "Kanji-connected" },
        { label: "Availability", value: "Available" },
      ],
      color: "#b9cfbd",
      ink: "#18322b",
      align: "left",
    },
  },
  {
    id: "shiru",
    index: "03",
    name: "Shiru",
    eyebrow: "Vocabulary that stays with you",
    location: "Kyoto, Japan",
    coordinates: "35.0116° N · 135.7681° E",
    title: ["From “I’ve seen it”", "to “I know it.”"],
    description:
      "A Japanese vocabulary experience that moves words from recognition to recall with context, gentle repetition, and well-timed review.",
    image: "/journey/shiru-japan.webp",
    cta: "In development",
    status: "In development",
    accent: "#e98b5d",
    textTone: "light",
    station: {
      name: "Kotoba no Mori",
      code: "SHR · 03",
      image: "/journey/station-shiru-v2.webp",
      intro:
        "Shiru gives vocabulary enough context and repetition to move from something you recognize into something you truly know.",
      note: "A word is learned when it begins to feel familiar in the wild.",
      features: ["Context before memorization", "Recognition → recall", "Review at the right moment"],
      facts: [
        { label: "Focus", value: "Japanese vocabulary" },
        { label: "Learning loop", value: "Recognize → Recall" },
        { label: "Availability", value: "In development" },
      ],
      color: "#d88c62",
      ink: "#251b16",
      align: "right",
    },
  },
  {
    id: "ai-studio",
    index: "04",
    name: "AI Studio",
    eyebrow: "An AI-native product workspace",
    location: "Tokyo Bay, Japan",
    coordinates: "35.6196° N · 139.7798° E",
    title: ["Keep the context.", "Move from brief to build."],
    description:
      "A workspace where specialist AI teammates share the same product context and move one clear brief toward working software.",
    image: "/journey/ai-studio-tokyo.webp",
    href: "https://ai-studio-izgvxyyo.edgeone.dev",
    cta: "Preview AI Studio",
    status: "Preview",
    accent: "#94b9cb",
    textTone: "light",
    station: {
      name: "Bay Terminal",
      code: "AIS · 04",
      image: "/journey/station-ai-studio-v2.webp",
      intro:
        "AI Studio brings specialized agents, shared context, and the product-building workflow into one coordinated operating system.",
      note: "Move from a clear brief to a working product without losing the shared context.",
      features: ["Specialist AI teammates", "One shared product context", "Brief → working software"],
      facts: [
        { label: "System", value: "Coordinated agents" },
        { label: "Workflow", value: "Brief → Build" },
        { label: "Availability", value: "Preview" },
      ],
      color: "#b9d5df",
      ink: "#102633",
      align: "left",
    },
  },
];

export const PROFILE_LINKS = {
  github: "https://github.com/TakeruF",
  linkedin: "https://www.linkedin.com/in/takeru-fujii-34656040a/",
} as const;
