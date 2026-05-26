import type { Metadata } from "next";
import { Inter, Geist_Mono, Instrument_Serif } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Background from "@/components/Background";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";

const inter = Inter({
  variable: "--font-inter",
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
  style: "italic",
});

export const metadata: Metadata = {
  title: {
    default: "Piyush Rathore",
    template: "%s | Piyush Rathore",
  },
  icons: {
    icon: "/favicon.png",
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
      <body
        className={`${inter.variable} ${geistMono.variable} ${instrumentSerif.variable} font-sans  `}
      >
        <SmoothScrollProvider>
          <Background />
          <Navbar />
          {children}
          <Footer />
        </SmoothScrollProvider>
        <Analytics />
        <SpeedInsights />
      </body>
      <Script
  src="https://t.raah.dev/script.js"
  data-pid="proj_xb5gjwvb5tvcgm9j"
  data-domain="google.com"
  strategy="afterInteractive"
/>
  </html>
  );
}
