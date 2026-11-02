import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "TreeBazaar.in — Premium Indoor Plants, Artisanal Pots & Gardening Essentials",
  description:
    "Bring nature closer to your home with TreeBazaar.in. India's premium online nursery for healthy indoor plants, handcrafted ceramic planters, NASA air-purifiers, and verified Amazon storefront fulfillment.",
  keywords: [
    "treebazaar",
    "treebazaar.in",
    "buy plants online",
    "indoor plants india",
    "air purifying plants",
    "ceramic pots",
    "gardening tools",
    "organic seeds",
    "amazon plant nursery",
  ],
  icons: {
    icon: "/images/favicon-leaf.png",
    shortcut: "/images/favicon-leaf.png",
    apple: "/images/favicon-leaf.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-[#FAF9F5] text-[#244C38]">
        {children}
      </body>
    </html>
  );
}
