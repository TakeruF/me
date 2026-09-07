import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { ProductStory as Story } from "@/lib/product-stories";

export function ProductStory({ story }: { story: Story }) {
  return (
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
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.label}
                    <ArrowUpRight size={15} aria-hidden="true" />
                    <span className="sr-only">（新しいタブで開く）</span>
                  </a>
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
