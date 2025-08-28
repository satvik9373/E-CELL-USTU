import './globals.css';
import type { Metadata } from 'next';
import { Toaster } from "@/components/ui/toaster";
import { ClerkProvider } from '@clerk/nextjs';

export const metadata: Metadata = {
  title: 'Universal Skill Tech University | Shaping Tomorrow\'s Innovators',
  description: 'Join USTU - Where technology meets innovation. Campus programs, summits, competitions, and opportunities for students to build the future.',
  keywords: 'technology university, innovation summit, campus programs, tech competitions, student development',
  authors: [{ name: 'Universal Skill Tech University' }],
  openGraph: {
    title: 'Universal Skill Tech University | Shaping Tomorrow\'s Innovators',
    description: 'Join USTU - Where technology meets innovation. Campus programs, summits, competitions, and opportunities for students to build the future.',
    url: 'https://ustu.edu',
    siteName: 'Universal Skill Tech University',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Universal Skill Tech University | Shaping Tomorrow\'s Innovators',
    description: 'Join USTU - Where technology meets innovation. Campus programs, summits, competitions, and opportunities for students to build the future.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <html lang="en">
        <head>
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </head>
        <body className="font-inter font-semibold antialiased">
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}