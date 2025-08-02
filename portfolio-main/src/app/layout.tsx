import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Inter, Fira_Code } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: 'swap',
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Mandinu Maneth | Software Engineer & Information Systems Specialist",
  description: "Professional portfolio showcasing software engineering projects and Information Systems expertise. Building innovative solutions that bridge technology and business needs.",
  keywords: ["Software Engineer", "Information Systems", "Web Developer", "Portfolio", "React", "Next.js", "Mandinu Maneth"],
  authors: [{ name: "Mandinu Maneth" }],
  creator: "Mandinu Maneth",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yourportfolio.com",
    title: "Mandinu Maneth | Software Engineer & Information Systems Specialist",
    description: "Professional portfolio showcasing software engineering projects and Information Systems expertise.",
    siteName: "Mandinu Maneth Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Your Portfolio | Software Engineer & Information Systems Specialist",
    description: "Professional portfolio showcasing software engineering projects and Information Systems expertise.",
    creator: "@yourusername",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${firaCode.variable} font-sans antialiased md:snap-y md:snap-mandatory md:h-screen overflow-y-scroll`}
      >
        <SpeedInsights />
        {children}
      </body>
    </html>
  );
}
