import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AnimatedBackground from "@/components/AnimatedBackground";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Electrical Club | VSBEC",
  description: "Official Event Registration Portal for Electrical Club, Department of Electrical and Electronics Engineering, V.S.B. Engineering College, Karur.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AnimatedBackground />
        {children}
      </body>
    </html>
  );
}
