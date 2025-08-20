import type { Metadata } from "next";
import { Libre_Baskerville, Inter } from "next/font/google";
import "./globals.css";

const libreBaskerville = Libre_Baskerville({
  variable: "--font-highlight",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const inter = Inter({
  variable: "--font-simple",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cuthours - AI Automation Agency",
  description: "Automating businesses with AI and building modern websites",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${libreBaskerville.variable} ${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
