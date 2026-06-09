"use client";

/**
 * FooterWrapper
 * Renders the global Footer on all routes except those listed below.
 * The chat interface is a full-height app — it should not have a footer.
 */

import { usePathname } from "next/navigation";
import Footer from "@/components/Footer";

const SUPPRESS_ON: string[] = ["/chat"];

export default function FooterWrapper() {
  const pathname = usePathname();
  const suppress = SUPPRESS_ON.some((r) => pathname.startsWith(r));
  if (suppress) return null;
  return <Footer />;
}
