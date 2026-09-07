import { localize } from "@/lib/i18n";
import Image from "next/image";
import { ResourceLink } from "@/components/resource-link";
import type { ProductStory as Story } from "@/lib/product-stories";

export function ProductStory({ story }: { story: Story }) {
  return localize(
    <div className="product-story wrap">
      {story.sections.map((section, index) => (
        <section
          className={`story-section ${section.image ? "story-with-media" : ""}`}
          key={section.title}
        >
          <div className="story-copy">
            <span className="section-index">
              {String(index + 1).padStart(2, "0")} / THE DETAILS
            </span>
            <h2>{section.title}</h2>
            {section.paragraphs.map((text) => (
              <p key={text}>{text}</p>
            ))}
            {section.links && (
              <div className="story-links">
                {section.links.map((link) => (
                  <ResourceLink key={link.href} {...link} />
                ))}
              </div>
            )}
          </div>
          {section.image && (
            <figure
              className={`story-media ${section.image.portrait ? "story-portrait" : ""}`}
            >
              <Image
                src={section.image.src}
                alt={section.image.alt}
                width={section.image.width}
                height={section.image.height}
                sizes="(max-width: 800px) 90vw, 600px"
              />
              <figcaption>{section.image.caption}</figcaption>
            </figure>
          )}
        </section>
      ))}
    </div>
  );
}
