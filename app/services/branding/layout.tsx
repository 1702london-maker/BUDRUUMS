import { metadataFor } from "@/app/seo";

export const metadata = metadataFor("branding");

export default function BrandingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
