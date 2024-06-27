'use client';

import { useState } from "react";
import Image from "next/image";
import { Button } from "../ui/button"
import { SendHorizontal } from "lucide-react"
import { motion } from "framer-motion";
import { AuroraBackground } from "../ui/gradient";
import { BounceLoader } from "react-spinners";

const sleep = (ms: number): Promise<void> => new Promise((r) => setTimeout(r, ms));

export default function Dream() {
  const [prediction, setPrediction] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

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

  return (
    <div id="right-main" className='flex flex-col w-full h-full items-center p-3 gap-3'>
      <div id="image-panel" className='flex gap-3 w-full h-[calc(100vh-145px)]'>
        <div className='flex flex-col w-full h-full items-center p-3 gap-5'>
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
                    {/* You can add content here if needed */}
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
              <Button variant="outline">Submit</Button>
            </>
          )}

      <form className="w-full flex items-center justify-center" onSubmit={handleSubmit}>
        <div className="relative">
        <input
          type="text"
          className="text-sm placeholder:text-muted-foreground flex md:w-[700px] lg:w-[700px] w-[400px] rounded-full border bg-transparent px-5 py-3 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
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
    </div>
  );
}