import BlurImage from "@/components/gallery/ImageComponent";
import { headers } from 'next/headers';

interface Image {
  id: string;
  href: string;
  name: string;
  imageSrc: string;
  prompt: string;
  confirmed: boolean;
}

export default async function Gallery() {
  const headersList = headers();
  const protocol = headersList.get('x-forwarded-proto') || 'http';
  const host = headersList.get('host') || '';
  const fullUrl = `${protocol}://${host}/api/fetchsupa?confirmed=true`;

  let images: Image[];
  try {
    const response = await fetch(fullUrl, { cache: 'no-store' });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    images = await response.json();
  } catch (error) {
    console.error('Error fetching images:', error);
    return <div className="flex w-full h-full p-5">Error loading images</div>;
  }

  if (!images || images.length === 0) {
    return <div className="flex w-full h-full p-5">No images found</div>;
  }


  return (
    <div className="flex w-full h-full p-5 overflow-hidden">
      <div className="w-full h-full overflow-y-auto">
        <div className="grid grid-cols-2 gap-y-10 sm:grid-cols-3 gap-x-6 lg:grid-cols-4 xl:grid-cols-6 xl:gap-x-8">
          {images.map((image) => (
            <BlurImage key={image.id} image={image} />
          ))}
        </div>
      </div>
    </div>
  );
}