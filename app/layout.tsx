import type { Metadata } from "next";
import { headers } from "next/headers";
import "katex/dist/katex.min.css";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;
  const description = "Learn mathematics with structure, meaningful practice, and Soma—a guided tutor that helps you reason through every step.";
  return {
    metadataBase: new URL(origin),
    title: {
      default: "School of Math",
      template: "%s · School of Math",
    },
    description,
    openGraph: {
      title: "School of Math",
      description,
      type: "website",
      url: origin,
      images: [{ url: `${origin}/og.png`, width: 1536, height: 1024, alt: "School of Math — Structure. Practice. Understanding." }],
    },
    twitter: {
      card: "summary_large_image",
      title: "School of Math",
      description,
      images: [`${origin}/og.png`],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
