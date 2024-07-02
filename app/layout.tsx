import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppProvider } from '@/components/context/States'
import React from 'react'
import TopBar from '@/components/main/TopBar'
import LeftBar from '@/components/main/LeftBar'
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Uhura Playground",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} overflow-hidden`}>
        <AppProvider>
          <div className='flex flex-col w-screen h-screen'>
            <TopBar />
            <div className='flex w-full h-full'>
              <LeftBar />
              {children}
              <Toaster />
            </div>
          </div>
        </AppProvider>
      </body>
    </html>
  );
}