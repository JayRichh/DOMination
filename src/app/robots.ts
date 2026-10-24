import type { MetadataRoute } from 'next';

const base = process.env.NEXT_PUBLIC_BASE_URL || 'https://domination.vercel.app';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${base}/sitemap.xml`,
  };
}
