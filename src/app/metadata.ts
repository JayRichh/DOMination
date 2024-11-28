import type { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: {}
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  _props: Props,
  _parent: ResolvingMetadata
): Promise<Metadata> {
  if (!process.env.NEXT_PUBLIC_BASE_URL) {
    throw new Error('NEXT_PUBLIC_BASE_URL environment variable is required');
  }

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL),
    title: {
      template: '%s | DOMination',
      default: 'DOMination - Test Your CSS Skills',
    },
    description: 'Master CSS by recreating targets with code. Engage in fun and interactive challenges to elevate your CSS skills.',
    applicationName: 'DOMination',
    authors: [{ name: 'DOMination Team' }],
    keywords: ['CSS', 'Web Development', 'Coding Challenge', 'Learning', 'Frontend Development'],
    creator: 'DOMination Team',
    publisher: 'DOMination',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      siteName: 'DOMination',
      title: 'DOMination - Test Your CSS Skills',
      description: 'Master CSS by recreating targets with code. Engage in fun and interactive challenges to elevate your CSS skills.',
      images: [
        {
          url: new URL('/screenshots/home.png', process.env.NEXT_PUBLIC_BASE_URL).toString(),
          width: 1200,
          height: 630,
          alt: 'DOMination',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'DOMination - Test Your CSS Skills',
      description: 'Master CSS by recreating targets with code. Engage in fun and interactive challenges.',
      images: [new URL('/screenshots/home.png', process.env.NEXT_PUBLIC_BASE_URL).toString()],
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
}
