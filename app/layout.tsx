import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingChat from "@/components/FloatingChat";
import { DEFAULT_IMAGE, SITE_NAME, SITE_URL } from "@/app/seo";

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
  title: {
    default: "Business Consultancy UK | Branding, Business Plans & Strategy",
    template: "%s | Budruum",
  },
  description:
    "Budruum is a UK business consultancy helping founders build with strategy and structure. Branding, business plans, financial forecasting, web development and more.",
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "Business consultancy",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Budruum | UK Business Consultancy for Founders",
    description:
      "From brand identity to business plans, Budruum helps founders build properly from day one.",
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [{ url: DEFAULT_IMAGE, width: 1200, height: 630, alt: "Budruum business consultancy" }],
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Budruum | UK Business Consultancy for Founders",
    description:
      "Business plans, branding, financial forecasting, web development and startup consultancy for founders.",
    images: [DEFAULT_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/#business`,
    name: SITE_NAME,
    url: SITE_URL,
    image: `${SITE_URL}${DEFAULT_IMAGE}`,
    logo: `${SITE_URL}/logo.png`,
    description:
      "UK business consultancy helping founders with business plans, branding, financial forecasting, web development, startup consultancy and strategy.",
    areaServed: ["United Kingdom", "London", "Global"],
    priceRange: "££",
    email: "booking@budruum.co.uk",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Budruum Business Consultancy Services",
      itemListElement: [
        "Brand Identity",
        "Business Plan",
        "Financial Forecasting",
        "Web Development",
        "Startup Consultancy",
        "Founder Blueprint",
        "Mentorship",
        "Innovator Founder Visa",
        "Social Media Marketing",
      ].map((name) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name,
          provider: { "@id": `${SITE_URL}/#business` },
        },
      })),
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    publisher: { "@id": `${SITE_URL}/#business` },
    inLanguage: "en-GB",
  },
];

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <Header />
        {children}
        <Footer />
        <FloatingChat />
      </body>
    </html>
  );
}
