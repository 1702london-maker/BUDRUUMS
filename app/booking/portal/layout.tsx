import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Client Portal | Budruum",
  description: "Private Budruum client portal.",
  robots: { index: false, follow: false },
};

export default function BookingPortalLayout({ children }: { children: React.ReactNode }) {
  return children;
}
