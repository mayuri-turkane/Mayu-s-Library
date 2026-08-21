import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog & Reading Guides",
  description:
    "Reading guides, book recommendations, and stories from the Mayu's Library blog — for curious readers of every age.",
  alternates: { canonical: "/blogs" },
};

export default function BlogsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}