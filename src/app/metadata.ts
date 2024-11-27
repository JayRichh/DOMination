import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: '%s | CSS Battle',
    default: 'CSS Battle - Test Your CSS Skills',
  },
  description: 'Master CSS by recreating targets with code. Engage in fun and interactive challenges to elevate your CSS skills.',
  applicationName: 'CSS Battle',
  authors: [{ name: 'CSS Battle Team' }],
  keywords: ['CSS', 'Web Development', 'Coding Challenge', 'Learning', 'Frontend Development'],
  creator: 'CSS Battle Team',
  publisher: 'CSS Battle',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://cssbattle.dev',
    siteName: 'CSS Battle',
    title: 'CSS Battle - Test Your CSS Skills',
    description: 'Master CSS by recreating targets with code. Engage in fun and interactive challenges to elevate your CSS skills.',
    images: [
      {
        url: '/screenshots/home.png',
        width: 1200,
        height: 630,
        alt: 'CSS Battle',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CSS Battle - Test Your CSS Skills',
    description: 'Master CSS by recreating targets with code. Engage in fun and interactive challenges.',
    images: ['/screenshots/home.png'],
    creator: '@cssbattle',
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' }
    ],
    apple: [
      { url: '/apple-touch-icon.png' }
    ]
  },
  manifest: '/manifest.json',
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
  verification: {
    google: 'google-site-verification-code', // Replace with actual code when available
  },
  category: 'education',
};
