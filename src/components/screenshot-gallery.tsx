import { GalleryInteractive } from "./gallery-interactive";
import { t, localizedHref } from "@/lib/i18n";
import type { StoryImage } from "@/lib/product-stories";
export function ScreenshotGallery({ name, images }: { name: string; images: StoryImage[] }) {
  const copy = { screenshots: "スクリーンショット", carousel: "カルーセル", slide: "スライド", keys: "スクリーンショット。左右キーで切り替え", previous: "前の画面", next: "次の画面", select: "表示する画面を選択", eyebrow: "IN THE APP", heading: "使う場面を、見てみる。", hint: "横にスワイプ、または矢印で切り替え" };
  return <GalleryInteractive name={name} images={images.map(image => ({ ...image, src: localizedHref(image.src), alt: t(image.alt), caption: t(image.caption) }))} labels={Object.fromEntries(Object.entries(copy).map(([key, value]) => [key, t(value)]))} />;
}
