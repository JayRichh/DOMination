import type { MetadataRoute } from 'next';

const base = process.env.NEXT_PUBLIC_BASE_URL || 'https://domination.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  return ['/', '/challenges', '/about', '/leaderboard', '/stats'].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
  }));
}
