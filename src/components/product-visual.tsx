import { localize } from "@/lib/i18n";
import Image from "next/image";
import type { Product } from "@/lib/products";

export function ProductVisual({
  product,
  compact = false,
}: {
  product: Product;
  compact?: boolean;
}) {
  return localize(
    <div
      className={`product-art tone-${product.tone} ${compact ? "art-compact" : ""} ${product.image?.portrait ? "art-portrait" : ""}`}
    >
      <div className="art-topline">
        <span>{product.name}</span>
        <span aria-hidden="true">✳</span>
      </div>
      {product.image ? (
        <Image
          src={product.image.src}
          alt={compact ? "" : product.image.alt}
          width={product.image.width}
          height={product.image.height}
          sizes={
            compact
              ? "(max-width: 700px) 92vw, 44vw"
              : "(max-width: 700px) 92vw, 1200px"
          }
        />
      ) : (
        <div className="art-motif" aria-hidden="true">
          {product.motif}
        </div>
      )}
      <span className="art-caption">{product.visualLabel}</span>
    </div>
  );
}
