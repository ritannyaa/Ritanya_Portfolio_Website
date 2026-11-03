import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/data/site";
import { certificates } from "@/lib/data/certificates";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: siteConfig.url,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteConfig.url}/projects`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/experience`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.6,
    },
    // Listed only while there's something on it — an empty set 404s.
    ...(certificates.length > 0
      ? [
          {
            url: `${siteConfig.url}/certificates`,
            lastModified,
            changeFrequency: "yearly" as const,
            priority: 0.6,
          },
        ]
      : []),
  ];
}
