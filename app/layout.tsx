import type { Metadata } from "next";
import "./globals.css";
import ChatBot from "./components/ChatBot";

export const metadata: Metadata = {
  title: "Mayu's Library | For Readers, By a Reader",
  description: "A welcoming, safe digital library for curious readers.",
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