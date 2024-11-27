"use client";

import { Inter } from 'next/font/google';
import { usePathname } from 'next/navigation';
import { ChallengesLayout } from "~/components/PageLayout";

const inter = Inter({ subsets: ['latin'] });

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isChallengePage = /^\/challenges\/\d+/.test(pathname);

  return (
    <div className={`${inter.className} ${isChallengePage ? 'h-screen' : ''}`}>
      <ChallengesLayout>
        {children}
      </ChallengesLayout>
    </div>
  );
}
