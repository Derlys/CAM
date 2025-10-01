import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { privy } from '@/lib/auth';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const hdr = req.headers.get('authorization');
    const bearer = hdr?.startsWith('Bearer ') ? hdr.slice(7) : null;
    const cookieToken = (await cookies()).get('privy-token')?.value;
    const authToken = bearer ?? cookieToken;

    if (!authToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const claims = await privy.verifyAuthToken(authToken);

    return NextResponse.json({ ok: true, userId: claims.userId });
  } catch (err) {
    console.error('[verifyAuthToken] failed', err);
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
}
