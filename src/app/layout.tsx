import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GlassHeader } from "@/components/GlassHeader";
import { MotionProvider } from "@/components/providers/MotionProvider";
import { CartProvider } from "@/components/providers/CartProvider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "PawCare — Healthy Pets, Happy Lives",
  description:
    "Telehealth, pharmacy, and emergency care — all in one intelligent platform built for modern pet parents.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full">
        <MotionProvider>
          <CartProvider>
            <GlassHeader />
            {children}
          </CartProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
