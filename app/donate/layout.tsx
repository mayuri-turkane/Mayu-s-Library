import type { Metadata } from "next";
import "./donate.css";

export const metadata: Metadata = {
  title: "Support Mayu's Library",
  description:
    "Support Mayu's Library by donating funds or books to help make reading accessible to more people.",
  alternates: { canonical: "/donate" },
};

export default function DonateLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
