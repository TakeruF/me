/* eslint-disable @next/next/no-img-element -- Static export uses build-time variants, without an image server. */
import type { ImgHTMLAttributes } from "react";
import images from "@/lib/responsive-images.json";

const manifest: Record<string, { variants: { width: number; src: string }[] }> = images;

export function responsiveImageSources(src: string) {
  const prefix = src.match(/^\/(en|ja|zh|ko)(?=\/)/)?.[0] ?? "";
  const variants = manifest[src.slice(prefix.length)]?.variants;
  if (!variants) return { src };
  return {
    src: prefix + variants[variants.length - 1].src,
    srcSet: variants.map(image => `${prefix}${image.src} ${image.width}w`).join(", "),
  };
}

export default function ResponsiveImage({
  src,
  alt,
  loading = "lazy",
  decoding = "async",
  ...props
}: Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "alt"> & { src: string; alt: string }) {
  return <img {...props} {...responsiveImageSources(src)} alt={alt} loading={loading} decoding={decoding} />;
}
