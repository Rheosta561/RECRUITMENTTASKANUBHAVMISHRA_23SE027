import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

const SECRET = process.env.SHARE_SECRET || 'secret';

export async function POST(req: NextRequest) {
  const  data  = await req.json();

  const json = JSON.stringify(data);
  const hmac = crypto.createHmac('sha256', SECRET);
  hmac.update(json);
  const signature = hmac.digest('hex');

  const payload = {
    data,
    signature,
  };

  const token = Buffer.from(JSON.stringify(payload)).toString('base64url');

  return NextResponse.json({ token });
}
