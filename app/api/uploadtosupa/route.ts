import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { nanoid } from 'nanoid';

export async function POST(request: NextRequest) {
  const supabase = createClient();
  
  try {
    const { imageUrl, prompt, name } = await request.json();
    console.log("Received image URL:", imageUrl);

    // Use the received URL directly, as it's already the original URL
    const originalImageUrl = imageUrl;
    console.log("Original image URL:", originalImageUrl);

    // Fetch the image data
    const imageResponse = await fetch(originalImageUrl);
    if (!imageResponse.ok) {
      throw new Error(`Failed to fetch image: ${imageResponse.statusText}`);
    }
    const imageBlob = await imageResponse.blob();
    console.log("Image fetched successfully");

    // Generate a unique filename
    const filename = `${nanoid()}.png`;

    // Upload the image to Supabase storage
    const { data, error } = await supabase.storage
      .from('images')
      .upload(filename, imageBlob, {
        contentType: 'image/png'
      });

    if (error) {
      console.error("Supabase storage upload error:", error);
      throw error;
    }

    // Get the public URL of the uploaded image
    const { data: publicUrlData } = supabase.storage
      .from('images')
      .getPublicUrl(filename);

    // Save image metadata to the 'images' table
    const { data: insertData, error: insertError } = await supabase
      .from('images')
      .insert({
        name: name,
        href: publicUrlData.publicUrl,
        prompt: prompt,
        imageSrc: publicUrlData.publicUrl,
        confirmed: null
      });

    if (insertError) {
      console.error("Supabase database insert error:", insertError);
      throw insertError;
    }

    return NextResponse.json({ success: true, url: publicUrlData.publicUrl });
  } catch (error) {
    console.error('Detailed error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to upload image';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}