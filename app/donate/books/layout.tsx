import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Donate Books",
  description:
    "Donate new or pre-loved books to help Mayu's Library share more stories with curious readers.",
  alternates: { canonical: "/donate/books" },
};

export default function DonateBooksLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
