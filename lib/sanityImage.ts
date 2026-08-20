import { client } from "./sanity";

const { projectId, dataset } = client.config();

type SanityImageSource =
  | {
      asset?: {
        _ref?: string;
      };
    }
  | null
  | undefined;

/**
 * Builds a Sanity CDN image URL from a raw image field (e.g. post.featured).
 * Returns null if there's no image, so callers can render a fallback.
 */
export function urlForImage(
  source: SanityImageSource,
  width?: number
): string | null {
  const ref = source?.asset?._ref;
  if (!ref) return null;

  // ref looks like: image-<id>-<width>x<height>-<format>
  const parts = ref.split("-");
  if (parts.length < 4) return null;

  const id = parts[1];
  const dimensions = parts[2];
  const format = parts[3];

  const base = `https://cdn.sanity.io/images/${projectId}/${dataset}/${id}-${dimensions}.${format}`;
  return width ? `${base}?w=${width}&auto=format` : `${base}?auto=format`;
}