import { NextResponse } from 'next/server';
import { getDatabase } from '@/lib/db';
import { sendFacebookCapiEvent } from '@/lib/facebook';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { eventName, customData, eventSourceUrl } = body;

    const db = getDatabase();
    const pixelId = db.settings.seo?.facebookPixelId;
    const token = db.settings.seo?.facebookAccessToken;

    const ip = request.headers.get('x-forwarded-for') || undefined;
    const userAgent = request.headers.get('user-agent') || undefined;

    const result = await sendFacebookCapiEvent(pixelId, token, {
      eventName: eventName || 'Contact',
      eventSourceUrl: eventSourceUrl,
      userData: {
        clientIpAddress: ip,
        clientUserAgent: userAgent,
      },
      customData,
    });

    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
