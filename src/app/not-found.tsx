import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] p-8">
      <div className="text-center space-y-4">
        <h1 className="text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          404
        </h1>
        <h2 className="text-2xl font-semibold">Page Not Found</h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back to battling!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
          <Link 
            href="/"
            prefetch={true}
            className="btn btn-primary"
          >
            Return Home
          </Link>
          <Link 
            href="/challenges"
            prefetch={true}
            className="btn btn-ghost"
          >
            View Challenges
          </Link>
        </div>
      </div>

      <div className="fixed inset-0 -z-10 opacity-5">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>
    </div>
  );
}
