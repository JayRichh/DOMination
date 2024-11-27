import { PageLayout } from "~/components/PageLayout";

export default function LoadingPage() {
  return (
    <PageLayout>
      <div className="min-h-[calc(100vh-4rem)] flex flex-col">
        <div className="flex-1 flex items-center justify-center py-16">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="h-16 w-96 bg-muted rounded-lg animate-pulse mx-auto" />
            <div className="h-8 w-80 bg-muted rounded-lg animate-pulse mx-auto" />
            <div className="flex items-center justify-center gap-4">
              <div className="h-12 w-32 bg-muted rounded-lg animate-pulse" />
              <div className="h-12 w-32 bg-muted rounded-lg animate-pulse" />
            </div>
          </div>
        </div>

        <div className="container mx-auto pb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-lg border border-border bg-card/50 backdrop-blur-sm">
                <div className="p-6 space-y-4">
                  <div className="h-48 bg-muted rounded-md animate-pulse" />
                  <div className="h-6 w-48 bg-muted rounded-lg animate-pulse" />
                  <div className="h-4 w-full bg-muted rounded-lg animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
