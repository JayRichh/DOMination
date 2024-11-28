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
  const parentMetadata = await parent;
  const previousImages = parentMetadata.openGraph?.images || [];

  const title = "About | DOMination";
  const description = "Learn about DOMination - Master CSS through creative challenges and interactive learning";
  const editorImageUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/screenshots/editor.png`;

  return {
    title,
    description,
    openGraph: {
      title,
      description: "Master CSS by recreating targets with code. Engage in fun and interactive challenges to elevate your CSS skills.",
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/about`,
      images: [
        {
          url: editorImageUrl,
          width: 1200,
          height: 630,
          alt: "DOMination Editor Interface"
        },
        ...previousImages
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [editorImageUrl]
    }
  };
}
