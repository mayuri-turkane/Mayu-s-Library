import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PagePort | A library for curious minds",
  description: "A welcoming, safe digital library for young readers.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
