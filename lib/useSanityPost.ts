import { useEffect, useState } from "react";
import { client } from "./sanity";

const POST_QUERY = `
  *[_type == "post" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    author,
    featured,
    answer,
    body,
    faqs
  }
`;

export function useSanityPost(slug: string) {
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!slug) return;

    let isMounted = true;
    setLoading(true);
    setError(null);

    client
      .fetch(POST_QUERY, { slug })
      .then((data) => {
        if (isMounted) setPost(data);
      })
      .catch((err) => {
        console.error("Sanity post fetch error:", err);
        if (isMounted) setError(err as Error);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [slug]);

  return { post, loading, error };
}