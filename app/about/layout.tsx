import { metadataFor } from "@/app/seo";

export const metadata = metadataFor("about");

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
