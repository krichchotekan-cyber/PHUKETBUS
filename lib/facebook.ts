// Facebook Conversions API and Pixel helpers

export interface FacebookCapiEvent {
  eventName: 'Contact' | 'Lead' | 'PageView' | 'ViewContent';
  eventSourceUrl?: string;
  userData?: {
    clientIpAddress?: string;
    clientUserAgent?: string;
    phone?: string;
    email?: string;
  };
  customData?: Record<string, unknown>;
}

export async function sendFacebookCapiEvent(
  pixelId: string,
  accessToken: string,
  event: FacebookCapiEvent
) {
  if (!pixelId || !accessToken) {
    // If credentials are not set, log safely in dev
    return {
      success: false,
      skipped: true,
      message: 'Facebook Pixel ID or Access Token not configured',
    };
  }

  const endpoint = `https://graph.facebook.com/v19.0/${pixelId}/events?access_token=${accessToken}`;
  const payload = {
    data: [
      {
        event_name: event.eventName,
        event_time: Math.floor(Date.now() / 1000),
        action_source: 'website',
        event_source_url: event.eventSourceUrl || 'https://muangsongyatour.com',
        user_data: {
          client_ip_address: event.userData?.clientIpAddress,
          client_user_agent: event.userData?.clientUserAgent,
        },
        custom_data: event.customData,
      },
    ],
  };

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const result = await res.json();
    return { success: res.ok, data: result };
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
      }),
    }).catch(() => {});
  }
}
