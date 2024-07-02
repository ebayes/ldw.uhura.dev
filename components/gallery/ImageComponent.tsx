"use client"

import Image from 'next/image';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

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

function BlurImage({ image }: { image: Image }) {
  const [isLoading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <div className="group cursor-pointer" onClick={() => setIsDialogOpen(true)}>
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
        <h3 className="mt-4 text-sm text-gray-700 truncate max-w-full">{image.name}</h3>
        <p className="mt-1 text-lg font-medium text-gray-900 truncate max-w-full">{image.prompt}</p>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
  <DialogContent className="sm:max-w-[600px]">
    <div className="mt-4">
      <div className="relative aspect-square w-full">
        <Image
          src={image.imageSrc}
          alt={image.name}
          fill
          className="object-contain"
        />
      </div>
    </div>
    <div className="mt-4 space-y-2">
      <div className="flex gap-2">
        <span className="font-semibold">User:</span>
        <span>{image.name}</span>
      </div>
      <div className="flex gap-2">
        <span className="font-semibold">Prompt:</span>
        <span>{image.prompt}</span>
      </div>
    </div>
  </DialogContent>
</Dialog>
    </>
  );
}

export default BlurImage;