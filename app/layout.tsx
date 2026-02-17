
import { Analytics } from '@vercel/analytics/react';

import type { Metadata } from "next";
import { Pixelify_Sans, VT323 } from "next/font/google";
import "./globals.css";
import Footer from '@/components/Footer';
import { about,gallery,events,sponsors,faq } from './page';
import Navbar from '@/components/navbar';

const font = Pixelify_Sans({
  subsets: ["latin"],
  variable: "--font-pixelify",
  weight: ["400", "500", "600", "700"],
});

const vt323 = VT323({
  subsets: ["latin"],
  variable: "--font-vt323",
  weight: "400",
});

export const metadata: Metadata = {
  title: "KeyGEnCoders",
  description: "",
  metadataBase:new URL("https://keygen-coders.vercel.app/"),
  icons:{
    icon:"/favicon.ico"
  },
  openGraph: {
    images : {
        url: "https://res.cloudinary.com/dlxpcyiin/image/upload/v1742362273/WhatsApp_Image_2025-03-19_at_11.01.03_645f9bc7_nwe9bv.jpg", 
        width: 1200,
        height: 630,
        alt: "KeyGEnCoders Logo", 
      },
    
  }
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body 
      suppressHydrationWarning={true}
      className={`${font.variable} ${vt323.variable} font-sans`}>
        <Navbar
        scrollToAbout={about}
        scrollToEvents={events}
        scrollToGallery={gallery}
        scrollToBrands={sponsors}
        scrollToInfo={faq}
        />
        {children}
        <Footer />
        </body>
    </html>
  );
}
