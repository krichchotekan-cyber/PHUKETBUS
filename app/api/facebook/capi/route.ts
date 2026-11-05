import { NextResponse } from 'next/server';
import { getDatabase } from '@/lib/db';
import { sendFacebookCapiEvent } from '@/lib/facebook';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      eventName,
      customData,
      eventSourceUrl,
      phone,
      email,
      testEventCode,
      testMode,
      customPixelId,
      customAccessToken,
    } = body;

    const db = getDatabase();
    const pixelId =
      customPixelId ||
      process.env.FACEBOOK_PIXEL_ID ||
      process.env.FB_PIXEL_ID ||
      db.settings.seo?.facebookPixelId;

    const token =
      customAccessToken ||
      process.env.FACEBOOK_ACCESS_TOKEN ||
      process.env.FB_ACCESS_TOKEN ||
      process.env.FB_CAPI_TOKEN ||
      db.settings.seo?.facebookAccessToken;

    if (testMode && (!pixelId || !token)) {
      return NextResponse.json({
        success: false,
        error: 'กรุณากรอกทั้ง Facebook Pixel ID และ Access Token ให้ครบถ้วนในช่องด้านบน',
      });
    }

    const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() || undefined;
    const userAgent = request.headers.get('user-agent') || undefined;

    const result = await sendFacebookCapiEvent(pixelId || '', token || '', {
      eventName: eventName || 'Contact',
      eventSourceUrl: eventSourceUrl || 'https://phuketbus.vercel.app',
      testEventCode: testEventCode || undefined,
      userData: {
        clientIpAddress: ip,
        clientUserAgent: userAgent,
        phone,
        email,
      },
      customData: customData || {
        source: testMode ? 'admin_test_button' : 'website_interaction',
      },
    });

    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
