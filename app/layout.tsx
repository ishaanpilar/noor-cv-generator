import type { Metadata } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Noorafshan Aftab — Customer Success & Implementation",
  description:
    "Law graduate turned SaaS operator. Three roles at Lumber in twelve months — from legal intern to customer success and implementation specialist for US construction payroll clients.",
  openGraph: {
    title: "Noorafshan Aftab — Customer Success & Implementation",
    description:
      "Law graduate turned SaaS operator. Three roles at Lumber in twelve months — from legal intern to customer success and implementation specialist for US construction payroll clients.",
    images: [
      {
        url: "/noor.jpg",
        width: 1200,
        height: 630,
        alt: "Photo of Noorafshan Aftab",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Noorafshan Aftab — Customer Success & Implementation",
    description:
      "Law graduate turned SaaS operator. Three roles at Lumber in twelve months — from legal intern to customer success and implementation specialist for US construction payroll clients.",
    images: ["/noor.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${sourceSerif.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
