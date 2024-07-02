import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(request: NextRequest) {
  const supabase = createClient();
  
  try {
    const { id, confirmed } = await request.json();

    const { data, error } = await supabase
      .from('images')
      .update({ confirmed })
      .eq('id', id);

    if (error) {
      throw error;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating image status:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to update image status';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}