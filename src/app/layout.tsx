import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Bhagyashree Reddy — Full-Stack & Android Developer // Space Tech",
  description: "Personal scrollytelling portfolio of Bhagyashree Reddy, Full-Stack & Android Developer building impactful solutions across web, mobile, AI, and Space Technology.",
  keywords: ["Bhagyashree Reddy", "Full-Stack Developer", "Android Developer", "Space Technology", "AI Solutions"],
  authors: [{ name: "Bhagyashree Reddy" }],
  openGraph: {
    title: "Bhagyashree Reddy — Full-Stack & Android Developer",
    description: "Building impactful real-world applications across web, mobile, and AI",
    type: "website",
  },
};

export const viewport = {
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
    <html lang="en" className="scroll-smooth">
      <body
        className={`${plusJakartaSans.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

