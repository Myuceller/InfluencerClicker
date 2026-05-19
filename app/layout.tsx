import type { Metadata, Viewport } from "next";
import { Providers } from "@/components/common/Providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Clout Clicker",
  description: "풍자적인 인플루언서 방치형 클리커 게임.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
