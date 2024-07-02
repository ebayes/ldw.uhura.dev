'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { SendHorizontal, Loader2, Check } from "lucide-react";
import { motion } from "framer-motion";
import { AuroraBackground } from "../ui/gradient";
import { BounceLoader } from "react-spinners";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ToastAction } from "@/components/ui/toast"
import { useRouter } from 'next/navigation';

const sleep = (ms: number): Promise<void> => new Promise((r) => setTimeout(r, ms));

export default function Dream() {
  const [prediction, setPrediction] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [imageName, setImageName] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  const { toast } = useToast()

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); 
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsGenerating(true);
    setError(null);
    setPrediction(null);
    const target = e.target as typeof e.target & {
      prompt: { value: string };
    };
    const response = await fetch("/api/predictions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: target.prompt.value,
      }),
    });
    let prediction = await response.json();
    if (response.status !== 201) {
      setError(prediction.detail);
      return;
    }
    setPrediction(prediction);

    while (
      prediction.status !== "succeeded" &&
      prediction.status !== "failed"
    ) {
      await sleep(1000);
      const response = await fetch("/api/predictions/" + prediction.id);
      prediction = await response.json();
      if (response.status !== 200) {
        setError(prediction.detail);
        return;
      }
      console.log({ prediction: prediction });
      setPrediction(prediction);
    }
    setIsGenerating(false);
  };

  const handleUpload = async () => {
    if (prediction && prediction.output) {
      setIsUploading(true);
      try {
        const response = await fetch("/api/uploadtosupa", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            imageUrl: prediction.output[prediction.output.length - 1],
            prompt: prediction.input.prompt,
            name: imageName,
          }),
        });
  
        const result = await response.json();
  
        if (result.success) {
          setUploadComplete(true);
          toast({
            title: "Image uploaded successfully",
            description: "The image has been saved to the gallery! Click here to view it",
            action:  <ToastAction altText="View in gallery" onClick={() => router.push('/gallery')}>View gallery</ToastAction>,
          });
          setTimeout(() => {
            setIsDialogOpen(false);
            setIsUploading(false);
            setUploadComplete(false);
          }, 1500);
        } else {
          throw new Error(result.error);
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        const errorMessage = error instanceof Error ? error.message : "There was an error uploading the image.";
        toast({
          title: "Upload failed",
          description: errorMessage,
          variant: "destructive",
        });
        setIsUploading(false);
      }
    }
  };

  if (isMobile) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-center text-lg font-medium">
          Please view on a bigger screen
        </p>
      </div>
    );
  }

  return (
    <div id="right-main" className='flex flex-col w-full h-full'>
      <div id="image-panel" className='flex-1 overflow-hidden'>
        <div className='flex flex-col w-full h-full items-center justify-center p-3'>
          {error && <div>{error}</div>}

          {!isGenerating && !prediction && (
            <div className="h-full w-full relative">
              <AuroraBackground className="absolute inset-0 rounded-2xl">
                <div className="h-full w-full flex items-center justify-center relative z-10">
                  <motion.div
                    initial={{ opacity: 0.0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.3,
                      duration: 0.8,
                      ease: "easeInOut",
                    }}
                    className="flex flex-col items-center justify-center"
                  >
                   
                  </motion.div>
                </div>
                </AuroraBackground>
            </div>
          )}

          {isGenerating && (
            <div className="h-full w-full flex items-center justify-center">
              <BounceLoader />
            </div>
          )}

{!isGenerating && prediction && prediction.output && (
        <>
          <div className="h-full w-full relative">
            <Image
              src={prediction.output[prediction.output.length - 1]}
              alt="output"
              fill
              style={{ objectFit: 'contain' }}
              priority
            />
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <div className="pt-2">
              <Button variant="dream">Upload</Button>
              </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Upload image</DialogTitle>
                <DialogDescription>
                  Upload your AI generated image to the image gallery
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="relative h-64 w-full">
                  <Image
                    src={prediction.output[prediction.output.length - 1]}
                    alt="output"
                    fill
                    style={{ objectFit: 'contain' }}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="prompt" className="text-right">
                    Prompt
                  </Label>
                  <Input
                    id="prompt"
                    value={prediction.input.prompt}
                    className="col-span-3"
                    disabled
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    value={imageName}
                    onChange={(e) => setImageName(e.target.value)}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
      <Button 
        variant="dream" 
        onClick={handleUpload}
        disabled={isUploading || uploadComplete}
      >
        {isUploading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : uploadComplete ? (
          <Check className="h-4 w-4" />
        ) : (
          "Upload Image"
        )}
      </Button>
    </DialogFooter>
            </DialogContent>
          </Dialog>
        </>
      )}
        </div>
      </div>

      <div className="w-full ">
        <form className="w-full flex items-center justify-center" onSubmit={handleSubmit}>
          <div className="relative w-full max-w-[700px]">
            <input
              type="text"
              className="w-full text-sm placeholder:text-muted-foreground rounded-full border bg-white px-5 py-3 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              name="prompt"
              placeholder="Enter a prompt to display an image"
            />
            <Button 
              variant="ghost" 
              size="icon" 
              type="submit"
              className="absolute right-[22px] top-1/2 transform -translate-y-1/2 rounded-full h-8 w-8 p-0"
            >
              <SendHorizontal className="w-5 h-5 text-muted-foreground" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}