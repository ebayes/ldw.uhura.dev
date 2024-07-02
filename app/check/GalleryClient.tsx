"use client"

import { useState } from 'react';
import BlurImage from "@/components/gallery/ImageComponent2";

interface Image {
  id: string;
  href: string;
  name: string;
  imageSrc: string;
  prompt: string;
  confirmed: boolean | null;
}

export default function GalleryClient({ initialImages }: { initialImages: Image[] }) {
  const [images, setImages] = useState<Image[]>(initialImages);

  const handleImageConfirmed = (id: string) => {
    setImages((prevImages) => prevImages.filter((img) => img.id !== id));
  };

  if (images.length === 0) {
    return <div>No images found</div>;
  }

  return (
    <div className="p-5 h-full overflow-hidden">
      <div className="w-full h-full overflow-y-auto">
        <div className="grid grid-cols-2 gap-y-10 sm:grid-cols-3 gap-x-6 lg:grid-cols-4 xl:grid-cols-6 xl:gap-x-8">
          {images.map((image) => (
            <BlurImage key={image.id} image={image} onImageConfirmed={handleImageConfirmed} />
          ))}
        </div>
      </div>
    </div>
  );
}