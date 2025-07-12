import "./globals.css";

import type { Metadata } from 'next'
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: 'Social Website',
  description: 'Next.js social media website',
  icons: {
    icon: "/favicon.svg"
  }
}

export default function AppLayout({
  children
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
