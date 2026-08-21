import type { Metadata } from "next";
import { client } from "../../../lib/sanity";

type Props = {
  params: Promise<{ slug: string }>;
  children: React.ReactNode;
};

const METADATA_QUERY = `
  *[_type == "post" && slug.current == $slug][0]{
    title,
    excerpt
  }
`;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  try {
    const post = await client.fetch(METADATA_QUERY, { slug });

    if (!post) {
      return {
        title: "Article Not Found",
        robots: { index: false, follow: false },
      };
    }

    return {
      title: post.title,
      description: post.excerpt || "Read this article on Mayu's Library.",
      alternates: { canonical: `/blogs/${slug}` },
    };
  } catch (err) {
    console.error("generateMetadata blog fetch error:", err);
    return {
      title: "Blog Post",
      alternates: { canonical: `/blogs/${slug}` },
    };
  }
}

export default function BlogPostLayout({ children }: Props) {
  return children;
}