import { localize } from "@/lib/i18n";
import Image from "next/image";
import { ResourceLink } from "@/components/resource-link";
import type { ProductStory as Story } from "@/lib/product-stories";

export function ProductStory({
  story,
  startIndex = 0,
  label,
}: {
  story: Story;
  startIndex?: number;
  label?: string;
}) {
  return localize(
    <div className="product-story wrap">
      {story.sections.map((section, index) => (
        <section
          className={`story-section ${section.image ? "story-with-media" : ""}`}
          key={section.title}
        >
          <div className="story-copy">
            <span className="section-index">
              {String(startIndex + index + 1).padStart(2, "0")}
              {index === 0 && label && ` / ${label}`}
            </span>
            <h2>{section.title}</h2>
            {section.paragraphs.map((text) => (
              <p key={text}>{text}</p>
            ))}
            {section.steps && (
              <ol className="story-steps">
                {section.steps.map((step) => (
                  <li key={step.title}>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                    {step.fields && (
                      <dl className="story-fields">
                        {step.fields.map((field) => (
                          <div key={field.label}>
                            <dt>{field.label}</dt>
                            <dd><pre><code>{field.value}</code></pre></dd>
                          </div>
                        ))}
                      </dl>
                    )}
                  </li>
                ))}
              </ol>
            )}
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
