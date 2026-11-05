import type { Metadata } from 'next';
import CookieConsentBanner from '@/components/CookieConsentBanner';
import { Prompt, Sarabun } from 'next/font/google';
import './globals.css';
import { getDatabase } from '@/lib/db';

const promptFont = Prompt({
  subsets: ['thai', 'latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-prompt',
  display: 'swap',
});

const sarabunFont = Sarabun({
  subsets: ['thai', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sarabun',
  display: 'swap',
});

export async function generateMetadata(): Promise<Metadata> {
  let db;
  try {
    db = getDatabase();
  } catch (e) {
    db = { settings: null };
  }

  const s = db?.settings;
  const seo = s?.seo || {
    metaTitle: 'เมืองสองย่า ทรานสปอร์ต แอนด์ ทัวร์ ภูเก็ต | บริการเช่าเหมารถทัวร์ VIP 2 ชั้น 40-46 ที่นั่ง ทั่วไทย (เจ้าของขับเอง)',
    metaDescription: 'อุ่นใจทุกเส้นทางทั่วไทย เจ้าของขับเอง ปลอดภัยระดับ VIP บริการเช่าเหมารถทัวร์ปรับอากาศ 2 ชั้น 40-46 ที่นั่ง เริ่มต้นจากภูเก็ตวิ่งทัวร์ทั่วประเทศ โทร 096-463-8443, 081-059-6350',
    metaKeywords: 'เช่ารถทัวร์ภูเก็ต, เหมารถทัวร์ทั่วไทย, รถทัวร์ 2 ชั้น VIP, เมืองสองย่า ทรานสปอร์ต แอนด์ ทัวร์, รถบัสเช่าเหมาภูเก็ต, รถทัวร์ 40 ที่นั่ง, รถทัวร์ 46 ที่นั่ง, รถทัวร์เจ้าของขับเอง',
    ogImageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80',
    facebookPixelId: 'FB-PIXEL-MSY-8443',
    facebookAppId: 'YOUR_FACEBOOK_APP_ID',
    facebookPageId: 'YOUR_FACEBOOK_PAGE_ID',
  };

  return {
    metadataBase: new URL('https://muangsongyatour.com'),
    title: seo.metaTitle,
    description: seo.metaDescription,
    keywords: seo.metaKeywords,
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      type: 'website',
      locale: 'th_TH',
      siteName: s?.companyName || 'ห้างหุ้นส่วนจำกัด เมืองสองย่า ทรานสปอร์ต แอนด์ ทัวร์',
      title: s?.selectedSlogan
        ? `${s.selectedSlogan} | เมืองสองย่า ทรานสปอร์ต ภูเก็ต`
        : 'อุ่นใจทุกเส้นทางทั่วไทย เจ้าของขับเอง ปลอดภัยระดับ VIP | เมืองสองย่า ทรานสปอร์ต ภูเก็ต',
      description: seo.metaDescription,
      images: [
        {
          url: seo.ogImageUrl,
          width: 1200,
          height: 630,
          alt: 'รถทัวร์ 2 ชั้น VIP ห้างหุ้นส่วนจำกัด เมืองสองย่า ทรานสปอร์ต แอนด์ ทัวร์ ภูเก็ต',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'เมืองสองย่า ทรานสปอร์ต แอนด์ ทัวร์ ภูเก็ต | รถทัวร์ VIP 2 ชั้น 40-46 ที่นั่ง',
      description: seo.metaDescription,
      images: [seo.ogImageUrl],
    },
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: 'any' },
        { url: '/icon.png', type: 'image/png' },
      ],
      apple: [{ url: '/icon.png' }],
    },
    other: {
      'fb:page_id': seo.facebookPageId || 'YOUR_FACEBOOK_PAGE_ID',
      'fb:app_id': seo.facebookAppId || 'YOUR_FACEBOOK_APP_ID',
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let db;
  try {
    db = getDatabase();
  } catch (e) {
    db = null;
  }

  const pixelId = db?.settings?.seo?.facebookPixelId;

  // JSON-LD Schema Markup for TravelAgency & LocalBusiness
  const schemaMarkup = {
    '@context': 'https://schema.org',
    '@type': ['TravelAgency', 'LocalBusiness'],
    '@id': 'https://muangsongyatour.com/#organization',
    name: 'ห้างหุ้นส่วนจำกัด เมืองสองย่า ทรานสปอร์ต แอนด์ ทัวร์',
    alternateName: 'Muang Song Ya Transport & Tour Limited Partnership',
    description:
      'บริการเช่าเหมารถทัวร์ปรับอากาศ 2 ชั้น VIP 40-46 ที่นั่ง จากภูเก็ตวิ่งทัวร์ทั่วประเทศ เจ้าของขับเองดูแลเองทุกทริป การันตีความปลอดภัยสูงสุด',
    url: 'https://muangsongyatour.com',
    telephone: ['+66-96-463-8443', '+66-81-059-6350'],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'ถ.เทพกระษัตรี ต.เทพกระษัตรี',
      addressLocality: 'ถลาง',
      addressRegion: 'ภูเก็ต',
      postalCode: '83110',
      addressCountry: 'TH',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '8.0315',
      longitude: '98.3345',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '06:00',
        closes: '23:00',
      },
    ],
    priceRange: '฿฿฿',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80',
    sameAs: [
      'https://facebook.com/muangsongyatour',
    ],
  };

  return (
    <html lang="th" className={`${promptFont.variable} ${sarabunFont.variable}`}>
      <head>
        {/* Schema.org Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
        />
        {/* Facebook Pixel Code */}
        {pixelId && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${pixelId}');
                fbq('track', 'PageView');
              `,
            }}
          />
        )}
      </head>
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-800 antialiased selection:bg-emerald-700 selection:text-white">
        {children}
        <CookieConsentBanner />
      </body>
    </html>
  );
}
