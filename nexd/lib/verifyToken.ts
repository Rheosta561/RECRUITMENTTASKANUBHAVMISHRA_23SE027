import crypto from 'crypto';

const SECRET = process.env.SHARE_SECRET!;

interface SignedPayload {
  data: any;
  signature: string;
}

export function verifyToken(token: string): any | null {
  try {
    console.log(SECRET);
    const decoded = Buffer.from(token, 'base64url').toString('utf-8');
    const parsed: SignedPayload = JSON.parse(decoded);

    const { data, signature } = parsed;


    const hmac = crypto.createHmac('sha256', SECRET);
    hmac.update(JSON.stringify(data));
    const expectedSignature = hmac.digest('hex');


    if (expectedSignature === signature) {
      return data;
    } else {
      console.warn('Signature mismatch');
      return null;
    }
  } catch (err) {
    console.error('Invalid token format:', err);
    return null;
  }
}
