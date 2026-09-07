import storyData from "./product-stories.json";

export type StoryImage = {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  portrait?: boolean;
};
export type StorySection = {
  title: string;
  paragraphs: string[];
  image?: StoryImage;
  links?: { label: string; href: string; internal?: boolean }[];
};
export type ProductStory = {
  facts?: string[];
  intro?: { title: string; text: string };
  gallery?: StoryImage[];
  sections: StorySection[];
};
export const productStories: Partial<Record<string, ProductStory>> = storyData;
