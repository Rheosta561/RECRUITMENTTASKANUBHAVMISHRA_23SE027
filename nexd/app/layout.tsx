import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

import { ThemeProvider } from "@/components/ThemeProvider";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'NexD | Your Placement Assist',
  description: 'Developed by Anubhav Mishra. Smart tools for TnP and student data analysis.',
  keywords: ['NexD', 'placement', 'DTU', 'TnP', 'student management'],
  authors: [{ name: 'Anubhav Mishra', url: 'https://github.com/Rheosta561' }],
  creator: 'Anubhav Mishra',
  openGraph: {
    title: 'NexD | Placement Assist',
    description: 'A smart placement assist platform built for DTU TnP',
    url: 'https://yourdomain.com',
    siteName: 'NexD',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NexD',
    description: 'Smart Placement Platform for DTU by Anubhav Mishra',
    creator: '@anubhavm',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      ><ThemeProvider attribute='class' defaultTheme="system" enableSystem>
        {/* <Navbar/> */}
        {children}
        <Footer/>

        </ThemeProvider>
      </body>
    </html>
  );
}
