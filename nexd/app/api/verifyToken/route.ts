import { verifyToken } from '@/lib/verifyToken';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { token } = await req.json();
  console.log('api hit');

  const decodedData = verifyToken(token);

  if (!decodedData) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }

  return NextResponse.json(decodedData);
}
