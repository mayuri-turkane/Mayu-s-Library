import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Donate to Support Reading",
  description:
    "Make a secure donation to support Mayu's Library and help keep great stories accessible to readers.",
  alternates: { canonical: "/donate/money" },
};

export default function DonateMoneyLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
