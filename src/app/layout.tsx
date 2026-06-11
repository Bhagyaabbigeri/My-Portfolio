import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Bhagyashree Reddy",
  description: "Personal scrollytelling portfolio of Bhagyashree Reddy.",
  keywords: ["Bhagyashree Reddy", "Full-Stack Developer", "Android Developer", "Space Technology", "AI Solutions"],
  authors: [{ name: "Bhagyashree Reddy" }],
  openGraph: {
    title: "Bhagyashree Reddy",
    description: "Personal portfolio of Bhagyashree Reddy",
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

