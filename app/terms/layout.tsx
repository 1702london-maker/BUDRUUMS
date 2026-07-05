import { metadataFor } from "@/app/seo";

export const metadata = metadataFor("terms");

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
