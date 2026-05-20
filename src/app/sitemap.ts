import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/siteConfig";

const serviceRoutes = [
  "dental-implants",
  "clear-aligners",
  "veneers",
  "root-canal",
  "teeth-whitening",
  "kids-dentistry",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const serviceEntries: MetadataRoute.Sitemap = serviceRoutes.map((slug) => ({
    url: `${SITE_URL}/services/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    ...serviceEntries,
  ];
}
