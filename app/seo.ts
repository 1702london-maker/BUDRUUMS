import type { Metadata } from "next";

export const SITE_URL = "https://budruum.co.uk";
export const SITE_NAME = "Budruum";
export const DEFAULT_IMAGE = "/BR.png";

type SeoEntry = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  noIndex?: boolean;
};

export const SEO: Record<string, SeoEntry> = {
  home: {
    title: "Business Consultancy UK | Branding, Business Plans & Strategy",
    description:
      "Budruum helps UK founders build properly with business plans, branding, financial forecasting, web development, startup consultancy and growth strategy.",
    path: "/",
    keywords: ["business consultancy UK", "startup consultancy", "business plan consultant", "founder strategy"],
  },
  about: {
    title: "About Budruum | UK Business Consultancy for Founders",
    description:
      "Learn how Budruum helps founders and growing businesses build with strategy, structure and long-term commercial clarity.",
    path: "/about",
    keywords: ["about Budruum", "UK founder consultancy", "business strategy consultancy"],
  },
  services: {
    title: "Business Consultancy Services UK | Budruum",
    description:
      "Explore Budruum services including brand identity, investor-ready business plans, financial forecasts, web development and startup consultancy.",
    path: "/services",
    keywords: ["business consultancy services", "startup services UK", "business planning services"],
  },
  branding: {
    title: "Brand Identity Services UK | Branding for Startups",
    description:
      "Build a credible brand identity with logo design, colour palette, typography, positioning and brand guidelines for your business.",
    path: "/services/branding",
    keywords: ["brand identity services UK", "startup branding", "brand guidelines"],
  },
  businessPlan: {
    title: "Business Plan Consultant UK | Investor-Ready Business Plans",
    description:
      "Investor-ready business plans for UK startups and growing businesses, including market analysis, strategy, operations and financial direction.",
    path: "/services/business-plan",
    keywords: ["business plan consultant UK", "business plan writer UK", "investor ready business plan"],
  },
  financialForecasting: {
    title: "Financial Forecasting Services UK | Startup Financial Models",
    description:
      "Clear financial forecasts and startup financial models covering revenue, costs, cash flow, scenarios and investor-ready projections.",
    path: "/services/financial-forecasting",
    keywords: ["financial forecasting services", "startup financial model", "financial projections UK"],
  },
  webDevelopment: {
    title: "Web Development Services UK | Websites for Founders",
    description:
      "High-performance websites and digital products for founders who need strategy-led design, development and conversion-focused execution.",
    path: "/services/web-development",
    keywords: ["web development services UK", "startup website development", "business website design"],
  },
  startupConsultancy: {
    title: "Startup Consultancy UK | Strategy for Founders",
    description:
      "Startup consultancy for founders who need business model clarity, positioning, operations support and practical growth direction.",
    path: "/services/startup-consultancy",
    keywords: ["startup consultancy UK", "startup consultant", "founder advisory"],
  },
  founderBlueprint: {
    title: "Founder Blueprint | Business Operating System for Startups",
    description:
      "A complete founder blueprint covering strategy, systems, operations, positioning and execution support for ambitious businesses.",
    path: "/services/founder-blueprint",
    keywords: ["founder blueprint", "business operating system", "startup strategy framework"],
  },
  mentorship: {
    title: "Business Mentorship UK | Founder Mentoring",
    description:
      "One-to-one business mentorship for founders who need experienced guidance, accountability and strategic decision support.",
    path: "/services/mentorship",
    keywords: ["business mentorship UK", "founder mentoring", "startup mentor"],
  },
  innovatorVisa: {
    title: "Innovator Founder Visa Business Support UK | Budruum",
    description:
      "Support for UK Innovator Founder Visa applicants, including business planning, strategy, financial forecasting and endorsement preparation.",
    path: "/services/innovator-visa",
    keywords: ["innovator founder visa business plan", "UK innovator visa support", "visa business plan UK"],
  },
  socialMediaMarketing: {
    title: "Social Media Marketing Services UK | Strategy-Led Growth",
    description:
      "Strategy-led social media marketing for founders and brands, covering content planning, creator direction, timing, reporting and growth.",
    path: "/services/social-media-marketing",
    keywords: ["social media marketing services UK", "social media strategy", "content marketing for startups"],
  },
  booking: {
    title: "Book a Business Consultation | Budruum",
    description:
      "Book a free discovery call or strategy consultation with Budruum to discuss your business plan, brand, website or startup growth needs.",
    path: "/booking",
    keywords: ["book business consultation", "startup consultation UK", "business strategy call"],
  },
  contact: {
    title: "Contact Budruum | Business Consultancy UK",
    description:
      "Contact Budruum for business plans, branding, financial forecasting, web development, startup consultancy and founder support.",
    path: "/contact",
    keywords: ["contact business consultancy", "Budruum contact", "business consultancy UK"],
  },
  faq: {
    title: "FAQ | Budruum Business Consultancy",
    description:
      "Answers to common questions about Budruum services, pricing, booking, timelines, process and working with our consultancy team.",
    path: "/faq",
    keywords: ["Budruum FAQ", "business consultancy questions", "startup consultancy pricing"],
  },
  portfolio: {
    title: "Portfolio | Budruum Client Work and Venture Support",
    description:
      "Explore Budruum portfolio themes across branding, business planning, financial modelling, web development and founder support.",
    path: "/portfolio",
    keywords: ["Budruum portfolio", "business consultancy case studies", "startup portfolio"],
  },
  insights: {
    title: "Business Insights for Founders | Budruum",
    description:
      "Read practical insights on business planning, startup strategy, branding, financial forecasting and founder decision-making.",
    path: "/insights",
    keywords: ["business insights", "startup strategy articles", "founder advice"],
  },
  start: {
    title: "Start Your Business Properly | Budruum",
    description:
      "Start building your business with the right strategy, structure, brand, plan and digital foundation from day one.",
    path: "/start",
    keywords: ["start a business UK", "startup support UK", "launch a business"],
  },
  careers: {
    title: "Careers at Budruum | Join Our Consultancy Team",
    description:
      "Explore careers with Budruum across web development, app development, design, brand strategy and business consultancy.",
    path: "/careers",
    keywords: ["Budruum careers", "business consultancy jobs", "startup agency careers"],
  },
  referral: {
    title: "Budruum Referral Programme | Earn 10% Commission",
    description:
      "Join Budruum's referral programme and earn 10% commission on every founder you refer. No caps, no tiers — paid monthly.",
    path: "/referral",
    keywords: ["business consultancy referral", "Budruum referral programme", "earn commission referring founders"],
  },
  referralPortal: {
    title: "Referral Portal | Budruum",
    description: "Apply to join the Budruum referral programme or log in to your partner dashboard.",
    path: "/referral-portal",
    noIndex: true,
  },
  privacy: {
    title: "Privacy Policy | Budruum",
    description: "Read Budruum's privacy policy and how we handle personal data, enquiries, bookings and website information.",
    path: "/privacy",
    noIndex: true,
  },
  terms: {
    title: "Terms and Conditions | Budruum",
    description: "Read Budruum's terms and conditions for using the website and engaging with our services.",
    path: "/terms",
    noIndex: true,
  },
};

export function metadataFor(key: keyof typeof SEO): Metadata {
  const entry = SEO[key];
  const url = `${SITE_URL}${entry.path}`;
  return {
    title: { absolute: entry.title },
    description: entry.description,
    keywords: entry.keywords,
    alternates: { canonical: entry.path },
    robots: entry.noIndex ? { index: false, follow: true } : { index: true, follow: true },
    openGraph: {
      title: entry.title,
      description: entry.description,
      url,
      siteName: SITE_NAME,
      images: [{ url: DEFAULT_IMAGE, width: 1200, height: 630, alt: "Budruum business consultancy" }],
      locale: "en_GB",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: entry.title,
      description: entry.description,
      images: [DEFAULT_IMAGE],
    },
  };
}

export const PUBLIC_SEO = Object.values(SEO).filter((entry) => !entry.noIndex);

export const INSIGHT_SLUGS = [
  "insight-business-plan-cost",
  "insight-business-plan-vs-forecast",
  "insight-cash-flow-forecast-startups",
  "insight-what-investors-look-for",
  "insight-business-plan-visa-funding-strategy",
  "insight-idea-to-company-structure",
];
