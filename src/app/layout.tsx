import type { Metadata } from "next";
import Script from "next/script";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title:
    "Anonymous Regrets — What People Wish They Did Differently | RegretWall",
  description:
    "Read anonymous regrets shared by real people. Discover what others wish they had done differently about life, love, career, and choices.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://regretwall.com"
  ),
  openGraph: {
    title: "Anonymous Regrets — What People Wish They Did Differently",
    description:
      "A public wall of anonymous regrets. Read real thoughts about life, love, career, and the choices people wish they had made.",
    type: "website",
    siteName: "RegretWall",
    images: [
      {
        url: "/images/anonymous-regrets-shared-by-real-people.jpg",
        width: 1200,
        height: 630,
        alt: "Anonymous regrets shared by real people on RegretWall",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Anonymous Regrets — What People Wish They Did Differently",
    description:
      "Read anonymous regrets shared by real people. A quiet place to reflect on life's missed chances.",
    images: ["/images/anonymous-regrets-shared-by-real-people.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-F1MHWBV9SQ"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-F1MHWBV9SQ');
          `}
        </Script>
      </head>
      <body className={`${geistSans.variable} antialiased`}>{children}</body>
    </html>
  );
}
