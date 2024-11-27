"use client";

import { PageLayout } from "~/components/PageLayout";

export default function LoadingPage() {
  return (
    <PageLayout>
      <div className="space-y-8">
        <div>
          <div className="h-10 w-48 bg-muted rounded-lg animate-pulse" />
          <div className="h-6 w-96 mt-2 bg-muted rounded-lg animate-pulse" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-lg border border-border bg-card"
            >
              <div className="aspect-video w-full bg-muted p-4 flex items-center justify-center">
                <div className="w-32 h-32 rounded-lg bg-background animate-pulse" />
              </div>
              <div className="p-4 space-y-2">
                <div className="h-6 w-3/4 bg-muted rounded-lg animate-pulse" />
                <div className="h-4 w-full bg-muted rounded-lg animate-pulse" />
                <div className="flex items-center gap-2">
                  <div className="h-4 w-16 bg-muted rounded-full animate-pulse" />
                  <div className="h-4 w-16 bg-muted rounded-full animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
