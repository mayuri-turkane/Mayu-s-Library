import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Downloads",
  robots: { index: false, follow: false },
};

export default function DownloadsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
