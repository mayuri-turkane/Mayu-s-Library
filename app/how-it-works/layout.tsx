import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How Mayu's Library Works",
  description:
    "Learn how to discover books, save favourites to your shelf, and read public-domain classics with Mayu's Library.",
  alternates: { canonical: "/how-it-works" },
};

export default function HowItWorksLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
