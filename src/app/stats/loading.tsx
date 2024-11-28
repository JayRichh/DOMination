"use client";

import { PageLayout } from "~/components/PageLayout";
import { LottieLoader } from "~/components/ui/LottieLoader";

export default function LoadingPage() {
  return (
    <PageLayout>
      <div className="min-h-screen flex items-center justify-center">
        <div className="scale-150">
          <LottieLoader size="lg" />
        </div>
      </div>
    </PageLayout>
  );
}
