// Facebook Conversions API and Pixel helpers
import crypto from 'crypto';

export interface FacebookCapiEvent {
  eventName: 'Contact' | 'Lead' | 'PageView' | 'ViewContent';
  eventSourceUrl?: string;
  testEventCode?: string;
  userData?: {
    clientIpAddress?: string;
    clientUserAgent?: string;
    phone?: string;
    email?: string;
  };
  customData?: Record<string, unknown>;
}

// SHA256 helper conforming to Meta CAPI specification
function hashSha256(value?: string): string | undefined {
  if (!value) return undefined;
  const normalized = value.trim().toLowerCase();
  if (!normalized) return undefined;
  return crypto.createHash('sha256').update(normalized).digest('hex');
}

// Normalize phone according to Meta specification (digits only, country code e.g. 66)
function normalizeAndHashPhone(phone?: string): string | undefined {
  if (!phone) return undefined;
  let digits = phone.replace(/\D/g, '');
  if (!digits) return undefined;
  // If Thai local mobile starts with 0 (e.g. 0964638443), replace leading 0 with 66
  if (digits.startsWith('0') && digits.length === 10) {
    digits = '66' + digits.substring(1);
  }
  return crypto.createHash('sha256').update(digits).digest('hex');
}

export async function sendFacebookCapiEvent(
  pixelId: string,
  accessToken: string,
  event: FacebookCapiEvent
) {
  if (!pixelId || !accessToken) {
    return {
      success: false,
      skipped: true,
      message: 'Facebook Pixel ID หรือ Access Token ยังไม่ได้ถูกกำหนดค่า',
    };
  }

  const endpoint = `https://graph.facebook.com/v19.0/${encodeURIComponent(
    pixelId
  )}/events?access_token=${encodeURIComponent(accessToken)}`;

  const userDataPayload: Record<string, any> = {
    client_ip_address: event.userData?.clientIpAddress,
    client_user_agent: event.userData?.clientUserAgent,
  };

  if (event.userData?.phone) {
    const hashedPhone = normalizeAndHashPhone(event.userData.phone);
    if (hashedPhone) userDataPayload.ph = [hashedPhone];
  }

  if (event.userData?.email) {
    const hashedEmail = hashSha256(event.userData.email);
    if (hashedEmail) userDataPayload.em = [hashedEmail];
  }

  const payload: Record<string, any> = {
    data: [
      {
        event_name: event.eventName,
        event_time: Math.floor(Date.now() / 1000),
        action_source: 'website',
        event_source_url: event.eventSourceUrl || 'https://phuketbus.vercel.app',
        user_data: userDataPayload,
        custom_data: event.customData,
      },
    ],
  };

  if (event.testEventCode) {
    payload.test_event_code = event.testEventCode;
  }

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const result = await res.json();
    return {
      success: res.ok,
      data: result,
      eventsReceived: result?.events_received || 0,
      fbTraceId: result?.fbtrace_id,
      error: !res.ok ? (result?.error?.message || 'Meta CAPI Request Failed') : undefined,
    };
  } catch (error: any) {
    console.error('Facebook CAPI error:', error);
    return { success: false, error: error.message };
  }
}

// Client-side helper to trigger Facebook Pixel safely
export function trackFacebookEvent(eventName: string, params?: Record<string, unknown>) {
  if (typeof window !== 'undefined' && (window as any).fbq) {
    try {
      (window as any).fbq('track', eventName, params);
      console.log(`[Facebook Pixel] Tracked ${eventName}`, params);
    } catch (err) {
      console.warn('[Facebook Pixel] Error tracking event:', err);
    }
  }

  // Also send to backend CAPI route for dual-tracking
  if (typeof window !== 'undefined') {
    fetch('/api/facebook/capi', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        eventName,
        customData: params,
        eventSourceUrl: window.location.href,
        phone: typeof params?.phone === 'string' ? params.phone : undefined,
      }),
    }).catch(() => {});
  }
}
