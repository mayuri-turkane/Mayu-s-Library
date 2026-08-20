import { useEffect, useState } from "react";
import { client } from "./sanity";

const BLOGS_QUERY = `
  *[_type == "post" && defined(slug.current) && slug.current != ""] | order(_createdAt desc) {
    _id,
    title,
    slug,
    excerpt,
    featured,
    publishedAt,
    author,
    answer,
    body,
    faqs
  }
`;

export function useSanityBlogs() {
  const [blogs, setBlogs] = useState<Array<any>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const data = await client.fetch(BLOGS_QUERY);
        setBlogs(data);
      } catch (err) {
        console.error("Sanity blog fetch error:", err);
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchBlogs();
  }, []);

  return { blogs, loading, error };
}