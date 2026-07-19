import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Referral Dashboard | Budruum",
  description: "Private Budruum referral dashboard.",
  robots: { index: false, follow: false },
};

export default function ReferralPortalDashboardLayout({ children }: { children: React.ReactNode }) {
  return children;
}
