import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

const SITE_URL = "https://healthylifeessentialandwellnessherbals.lovable.app";

type SeoProps = {
  title: string;
  description: string;
  path: string; // e.g. "/shop"
  image?: string;
  type?: "website" | "article" | "product";
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
};

export const Seo = ({ title, description, path, image, type = "website", jsonLd }: SeoProps) => {
  const url = `${SITE_URL}${path}`;
  const ld = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  useEffect(() => {
    const currentMeta: Record<string, string> = {
      'meta[name="description"]': description,
      'meta[property="og:title"]': title,
      'meta[property="og:description"]': description,
      'meta[property="og:url"]': url,
      'meta[property="og:type"]': type,
      'meta[property="og:site_name"]': "Healthy Life Essentials & Wellness Herbals",
      'meta[name="twitter:card"]': "summary_large_image",
      'meta[name="twitter:title"]': title,
      'meta[name="twitter:description"]': description,
    };
    if (image) {
      currentMeta['meta[property="og:image"]'] = image;
      currentMeta['meta[name="twitter:image"]'] = image;
    }

    Object.entries(currentMeta).forEach(([selector, expected]) => {
      const tags = Array.from(document.head.querySelectorAll<HTMLMetaElement>(selector));
      let keptCurrent = false;
      tags.forEach((tag) => {
        if (tag.content === expected && !keptCurrent) {
          keptCurrent = true;
        } else if (tag.content !== expected || keptCurrent) {
          tag.remove();
        }
      });
    });
  }, [description, image, title, type, url]);

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Healthy Life Essentials & Wellness Herbals" />
      {image && <meta property="og:image" content={image} />}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}
      {ld.map((obj, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(obj)}
        </script>
      ))}
    </Helmet>
  );
};
