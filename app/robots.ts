import type { MetadataRoute } from "next";

const BASE_URL = "https://page-port-inky.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/studio/",
          "/profile",
          "/shelf",
          "/history",
          "/downloads",
          "/api/",
        ],
      },
      {
        userAgent: "GPTBot",
        disallow: ["/"],
      },
      {
        userAgent: "ChatGPT-User",
        disallow: ["/"],
      },
      {
        userAgent: "Google-Extended",
        disallow: ["/"],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}