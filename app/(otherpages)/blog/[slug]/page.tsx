import { Metadata } from "next";
import BlogPost from "./BlogComponent";


export const metadata: Metadata = {
  title: 'Acme Dashboard',
  description: 'The official Next.js Learn Dashboard built with App Router.',
  keywords: ['Next.js', 'Dashboard', 'App Router'],
  openGraph: {
    title: 'Acme',
    description: 'Acme is a...',
    images: [
      {
        url: 'https://example.com/og-image.jpg',  
        width: 1200,
        height: 630,
        alt: 'Acme Open Graph Image',
      },
    ],
  },
};
  

const page = async ({ params }: { params: { slug: string } }) => {
  const {slug} = await params;

  return (
    <BlogPost slug={slug} />
  );
};

export default page;