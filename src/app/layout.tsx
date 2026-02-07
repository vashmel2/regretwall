import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RegretWall — Things left unsaid",
  description:
    "An anonymous wall of regrets. Read what others wish they had done differently, or share your own.",
  openGraph: {
    title: "RegretWall — Things left unsaid",
    description:
      "An anonymous wall of regrets. Read what others wish they had done differently.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} antialiased`}>{children}</body>
    </html>
  );
}
