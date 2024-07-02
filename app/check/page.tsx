import GalleryClient from './GalleryClient';
import { headers } from 'next/headers';

interface Image {
  id: string;
  href: string;
  name: string;
  imageSrc: string;
  prompt: string;
  confirmed: boolean | null;
}

export default async function Gallery() {
  const headersList = headers();
  const protocol = headersList.get('x-forwarded-proto') || 'http';
  const host = headersList.get('host') || '';
  const fullUrl = `${protocol}://${host}/api/fetchsupa?confirmed=null`;  

  let images: Image[];
  try {
    const response = await fetch(fullUrl, { cache: 'no-store' });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    images = await response.json();
  } catch (error) {
    console.error('Error fetching images:', error);
    return <div>Error loading images</div>;
  }

  if (!images || images.length === 0) {
    return <div>No images found</div>;
  }

  return <GalleryClient initialImages={images} />;
}