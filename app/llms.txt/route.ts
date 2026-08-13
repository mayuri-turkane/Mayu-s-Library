export async function GET() {
  const content = `# Mayu's Library

> A personal, reader-friendly open library for discovering books, building reading habits, and finding your next read.

## Website

- Homepage: https://page-port-inky.vercel.app/
- Blog: https://page-port-inky.vercel.app/blog

## About

Mayu's Library is designed to feel like a personal reading space where readers can discover useful book recommendations, reading guidance, and practical resources.

## Blog

The Mayu's Library blog contains articles about:

- Finding books you will actually enjoy and finish
- Digital library safety for young readers
- Classic books for teens and new readers
- Building a reading habit
- Using book filters to discover your next read

## Content

Blog content is managed through Sanity CMS and published through the Mayu's Library website.

## Contact

Website: https://page-port-inky.vercel.app/
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}