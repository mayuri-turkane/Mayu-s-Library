import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reading History",
  robots: { index: false, follow: false },
};

export default function HistoryLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
