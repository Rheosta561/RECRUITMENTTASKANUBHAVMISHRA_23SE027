import crypto from 'crypto';

const SECRET = process.env.NEXT_PUBLIC_SHARE_SECRET || 'secret';

export function signPayload(data: any): string {
  const json = JSON.stringify(data);

  const hmac = crypto.createHmac('sha256', SECRET);
  hmac.update(json);

  const signature = hmac.digest('hex');

  const payload = {
    data,
    signature,
  };

  return Buffer.from(JSON.stringify(payload)).toString('base64url');
}
