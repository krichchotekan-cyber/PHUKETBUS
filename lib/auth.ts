import { createHmac, randomBytes, timingSafeEqual } from 'crypto';
import { cookies } from 'next/headers';

const ADMIN_TOKEN_KEY = 'msy_admin_token';
const ADMIN_SESSION_SECRET = process.env.ADMIN_SESSION_SECRET;
export const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

export function hasAdminConfiguration(): boolean {
  return Boolean(ADMIN_USERNAME && ADMIN_PASSWORD && ADMIN_SESSION_SECRET);
}

export function isAuthenticated(): boolean {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get(ADMIN_TOKEN_KEY)?.value;
    if (!token || !ADMIN_SESSION_SECRET) return false;

    const [nonce, signature] = token.split('.');
    if (!nonce || !signature) return false;

    const expectedSignature = createHmac('sha256', ADMIN_SESSION_SECRET)
      .update(nonce)
      .digest('hex');
    const actual = Buffer.from(signature, 'hex');
    const expected = Buffer.from(expectedSignature, 'hex');
    return actual.length === expected.length && timingSafeEqual(actual, expected);
  } catch {
    return false;
  }
}

export function setAdminSession() {
  if (!ADMIN_SESSION_SECRET) {
    throw new Error('ADMIN_SESSION_SECRET is not configured');
  }

  const nonce = randomBytes(32).toString('hex');
  const signature = createHmac('sha256', ADMIN_SESSION_SECRET).update(nonce).digest('hex');
  const cookieStore = cookies();
  cookieStore.set(ADMIN_TOKEN_KEY, `${nonce}.${signature}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  });
}

export function clearAdminSession() {
  const cookieStore = cookies();
  cookieStore.delete(ADMIN_TOKEN_KEY);
}
