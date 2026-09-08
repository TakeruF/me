import { GalleryInteractive } from "./gallery-interactive";
import { t, localizedHref } from "@/lib/i18n";
import type { StoryImage } from "@/lib/product-stories";
import Image from "next/image";

export function ScreenshotGallery({
  name,
  images,
  comparison = false,
}: {
  name: string;
  images: StoryImage[];
  comparison?: boolean;
}) {
  const copy = {
    screenshots: "スクリーンショット",
    carousel: "カルーセル",
    slide: "スライド",
    keys: "スクリーンショット。左右キーで切り替え",
    previous: "前の画面",
    next: "次の画面",
    select: "表示する画面を選択",
    eyebrow: "IN THE APP",
    heading: "使う場面を、見てみる。",
    hint: "横にスワイプ、または矢印で切り替え",
  };
  const localizedImages = images.map((image) => ({
    ...image,
    src: localizedHref(image.src),
    alt: t(image.alt),
    caption: t(image.caption),
  }));
  if (comparison)
    return (
      <section
        className="screen-gallery screen-comparison wrap"
        aria-labelledby="comparison-title"
      >
        <div className="gallery-heading-row">
          <div>
            <span className="section-index">
              {t("A REAL QUERY, THREE VIEWS")}
            </span>
            <h2 id="comparison-title">{t("同じ質問を、3つの画面で。")}</h2>
          </div>
          <p>{t("2026年9月3日に行った広州南 → 長沙南の同一検索例")}</p>
        </div>
        <div className="comparison-grid">
          {localizedImages.map((image, index) => (
            <figure className="comparison-card" key={image.src}>
              <div className="comparison-image">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  sizes="(max-width: 700px) 92vw, (max-width: 1100px) 45vw, 31vw"
                />
              </div>
              <figcaption>
                <span>0{index + 1}</span>
                {image.caption}
              </figcaption>
            </figure>
          ))}
        </div>
        <p className="comparison-note">
          {t(
            "表示内容はこの時点の公開情報による例です。時刻、運賃、空席は検索時点と販売状況により変わります。",
          )}
        </p>
      </section>
    );
  return (
    <GalleryInteractive
      name={name}
      images={localizedImages}
      labels={Object.fromEntries(
        Object.entries(copy).map(([key, value]) => [key, t(value)]),
      )}
    />
  );
}
