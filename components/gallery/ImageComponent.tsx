"use client"

import Image from 'next/image';
import { useState } from 'react';

// Define the Image interface
interface Image {
  id: string;
  href: string;
  name: string;
  imageSrc: string;
  prompt: string;
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

// Update the prop type to use the Image interface
function BlurImage({ image }: { image: Image }) {
  const [isLoading, setLoading] = useState(true);

  return (
    <a href={image.href} className="group">
      <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
        <Image
          alt={image.name}
          src={image.imageSrc}
          layout="fill"
          objectFit="cover"
          className={cn(
            'group-hover:opacity-75 duration-700 ease-in-out',
            isLoading
              ? 'grayscale blur-2xl scale-110'
              : 'grayscale-0 blur-0 scale-100'
          )}
          onLoadingComplete={() => setLoading(false)}
        />
      </div>
      <h3 className="mt-4 text-sm text-gray-700">{image.name}</h3>
      <p className="mt-1 text-lg font-medium text-gray-900">{image.prompt}</p>
    </a>
  );
}

export default BlurImage;