import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET(request: NextRequest) {
  const supabase = createClient();
  const { searchParams } = new URL(request.url);
  const confirmed = searchParams.get('confirmed');

  let query = supabase.from('images').select('*');

  if (confirmed === 'null') {
    query = query.is('confirmed', null);
  } else if (confirmed !== null) {
    query = query.eq('confirmed', confirmed === 'true');
  }

  const { data: images, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(images);
}