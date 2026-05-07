import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Semiconductor Education",
    template: "%s | Semiconductor Education"
  },
  description:
    "기초부터 실무 관점까지 읽는 반도체 오픈소스 문서 MVP입니다.",
  metadataBase: new URL("https://github.com/pigpgw/semiconductor-education")
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-bg0 text-ink antialiased">
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
