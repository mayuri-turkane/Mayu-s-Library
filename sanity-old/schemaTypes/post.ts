import { defineField, defineType } from "sanity";

export default defineType({
  name: "post",
  title: "Blog post",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required().max(65) }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title", maxLength: 96 }, validation: (Rule) => Rule.required() }),
    defineField({ name: "excerpt", title: "Excerpt", type: "text", rows: 3, validation: (Rule) => Rule.required().max(165) }),
    defineField({ name: "seoDescription", title: "SEO description", type: "text", rows: 3, validation: (Rule) => Rule.required().max(160) }),
    defineField({ name: "publishedAt", title: "Published at", type: "datetime", validation: (Rule) => Rule.required() }),
    defineField({ name: "author", title: "Author", type: "string", initialValue: "Mayu's Library" }),
    defineField({ name: "featured", title: "Featured image", type: "image", options: { hotspot: true } }),
    defineField({ name: "answer", title: "Quick answer", type: "text", rows: 3 }),
    defineField({ name: "body", title: "Article", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "faqs", title: "FAQs", type: "array", of: [{ type: "object", fields: [defineField({ name: "question", type: "string" }), defineField({ name: "answer", type: "text" })] }] }),
  ],
});
