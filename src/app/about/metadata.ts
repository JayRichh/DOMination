import type { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: {}
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  _props: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  if (!process.env.NEXT_PUBLIC_BASE_URL) {
    throw new Error('NEXT_PUBLIC_BASE_URL environment variable is required');
  }

  // Get parent metadata (allows extending it)
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: "About", // Will be templated to "About | DOMination"
    description: "Learn about DOMination - Master CSS through creative challenges and interactive learning",
    openGraph: {
      title: "About DOMination",
      description: "Master CSS by recreating targets with code. Engage in fun and interactive challenges to elevate your CSS skills.",
      url: new URL("/about", process.env.NEXT_PUBLIC_BASE_URL).toString(),
      images: [
        {
          url: new URL("/screenshots/editor.png", process.env.NEXT_PUBLIC_BASE_URL).toString(),
          width: 1200,
          height: 630,
          alt: "DOMination Editor Interface"
        },
        ...previousImages
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: "About DOMination",
      description: "Master CSS through creative challenges and interactive learning",
      images: [new URL("/screenshots/editor.png", process.env.NEXT_PUBLIC_BASE_URL).toString()]
    }
  };
}
