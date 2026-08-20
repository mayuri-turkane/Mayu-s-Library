import type { Metadata } from "next";
import "./globals.css";
import ChatBot from "./components/ChatBot";

export const metadata: Metadata = {
  metadataBase: new URL("https://page-port-inky.vercel.app"),
  title: {
    default: "Mayu's Library | Free Books for Curious Readers",
    template: "%s | Mayu's Library",
  },
  description:
    "Discover classic books, save your favourites, and download public-domain reads at Mayu's Library.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Mayu's Library",
    title: "Mayu's Library | Free Books for Curious Readers",
    description:
      "Discover classic books, save your favourites, and download public-domain reads.",
  },
  twitter: {
    card: "summary",
    title: "Mayu's Library | Free Books for Curious Readers",
    description:
      "Discover classic books, save your favourites, and download public-domain reads.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {children}
        <ChatBot />
      </body>
    </html>
  );
}
