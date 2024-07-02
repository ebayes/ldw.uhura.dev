"use client"

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Check, Trash } from "lucide-react";

interface Image {
  id: string;
  href: string;
  name: string;
  imageSrc: string;
  prompt: string;
  confirmed: boolean | null;
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

function BlurImage({ image, onImageConfirmed }: { image: Image; onImageConfirmed: (id: string) => void }) {
  const [isLoading, setLoading] = useState(true);
  const [confirmed, setConfirmed] = useState<boolean | null>(image.confirmed);

  useEffect(() => {
    if (confirmed !== null) {
      onImageConfirmed(image.id);
    }
  }, [confirmed, image.id, onImageConfirmed]);

  const handleConfirm = async (status: boolean) => {
    try {
      const response = await fetch('/api/confirm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: image.id, confirmed: status }),
      });

      if (!response.ok) {
        throw new Error('Failed to update image status');
      }

      setConfirmed(status);
    } catch (error) {
      console.error('Error updating image status:', error);
    }
  };

  return (
    <div className="group">
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
      <div className="mt-2 flex justify-between">
        <Button 
          className="bg-green-500 hover:bg-green-600" 
          size="sm" 
          onClick={() => handleConfirm(true)}
          disabled={confirmed === true}
        >
          <Check className="w-4 h-4 mr-2" /> Confirm
        </Button>
        <Button 
          className="bg-red-500 hover:bg-red-600" 
          size="sm" 
          onClick={() => handleConfirm(false)}
          disabled={confirmed === false}
        >
          <Trash className="w-4 h-4 mr-2" /> Reject
        </Button>
      </div>
    </div>
  );
}

export default BlurImage;