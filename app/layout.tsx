import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: {
    default: "Piyush Rathore",
    template: "%s | Piyush Rathore",
  },
  icons: {
    icon: "/favicon.ico",
  },
  description: "Software Engineer | Full Stack Developer",
  openGraph: {
    title: "Piyush Rathore",
    description: "Software Engineer | Full Stack Developer",
    url: "https://Piyushh.me",
    siteName: "Piyush Rathore",
    images: [
      {
        url: "/assets/erwin.jpg",
        width: 1200,
        height: 630,
        alt: "Piyush Rathore",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Piyush Rathore",
    description: "Software Engineer | Full Stack Developer",
    creator: "@Piyush",
    images: ["/assets/erwin.jpg"],
  },
  authors: [{ name: "Piyush Rathore" }],
  keywords: [
    "Piyush Rathore",
    "Software Engineer",
    "Portfolio",
    "Web Development",
    "Full Stack Developer",
    "Piyush Rathore Portfolio",
    "Piyushh.me",
    "developer portfolio",
    "Piyushh.me Portfolio",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} font-sans  `}
      >
        <Navbar />
        {children}
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
