import { NextRequest } from 'next/server';
import OpenGraphImage from '@/components/OpenGraph';

export const config = {
  runtime: 'edge',
};

export default async function handler(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    // Get the query parameters
    const title = searchParams.get('title') ?? 'Zerops Documentation';
    const description = searchParams.get('description') ?? 'Developer-First Cloud Platform';
    const type = (searchParams.get('type') ?? 'feature') as 'feature' | 'guide' | 'reference';

    // Generate the image
    return OpenGraphImage({
      title,
      description,
      type,
    });
  } catch (e) {
    console.error(e);
    return new Response(`Failed to generate image`, {
      status: 500,
    });
  }
} 