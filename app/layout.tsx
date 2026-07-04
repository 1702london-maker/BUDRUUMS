import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingChat from "@/components/FloatingChat";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Business Consultancy UK | Build Your Business Properly — Budruum",
  description:
    "Budruum is a UK business consultancy helping founders build with strategy and structure. Branding, business plans, financial forecasting, web development and more.",
  metadataBase: new URL("https://budruum.co.uk"),
  openGraph: {
    title: "Budruum — UK Business Consultancy for Founders",
    description:
      "From brand identity to business plans — Budruum helps founders build properly from day one.",
    url: "https://budruum.co.uk",
    images: [{ url: "/BR.png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body className="antialiased">
        <Header />
        {children}
        <Footer />
        <FloatingChat />
      </body>
    </html>
  );
}
