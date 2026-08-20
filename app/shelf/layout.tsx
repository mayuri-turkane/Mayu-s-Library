import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Saved Shelf",
  robots: { index: false, follow: false },
};

export default function ShelfLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
