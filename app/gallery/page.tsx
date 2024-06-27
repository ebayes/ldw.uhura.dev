import BlurImage from "@/components/gallery/ImageComponent";
import { headers } from 'next/headers';

// Import or define the Image interface here
interface Image {
  id: string;
  href: string;
  name: string;
  imageSrc: string;
  prompt: string;
}

export default async function Gallery() {
  const headersList = headers();
  const protocol = headersList.get('x-forwarded-proto') || 'http';
  const host = headersList.get('host') || '';
  const fullUrl = `${protocol}://${host}/api/fetchsupa`;

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

  return (
    <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {images.map((image) => (
          <BlurImage key={image.id} image={image} />
        ))}
      </div>
    </div>
  );
}