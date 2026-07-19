import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Referral Admin | Budruum",
  description: "Private Budruum referral administration.",
  robots: { index: false, follow: false },
};

export default function AdminReferralsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
