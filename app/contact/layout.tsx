import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Mayu's Library",
  description:
    "Contact Mayu's Library with questions, feedback, book suggestions, or support enquiries.",
  alternates: { canonical: "/contact" },
};

export default function ContactLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
