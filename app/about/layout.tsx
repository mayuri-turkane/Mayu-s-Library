import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Our Digital Library",
  description:
    "Learn about Mayu's Library, a welcoming digital library built to help curious readers discover stories.",
  alternates: { canonical: "/about" },
};

export default function AboutLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
