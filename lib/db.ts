import fs from 'fs';
import path from 'path';
import databaseTemplate from '@/data/db.example.json';

const LOCAL_DB_FILE = path.join(process.cwd(), 'data', 'db.json');
const TMP_DB_FILE = path.join('/tmp', 'phuketbus_db.json');

declare global {
  // eslint-disable-next-line no-var
  var __PHUKETBUS_MEMORY_DB__: DatabaseSchema | undefined;
}

export interface PhoneContact {
  number: string;
  raw: string;
  label: string;
}

export interface SeoSettings {
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  ogImageUrl: string;
  facebookPixelId: string;
  facebookAppId: string;
  facebookPageId: string;
  facebookAccessToken: string;
}

export interface TelegramSettings {
  botToken: string;
  chatId: string;
  enabled: boolean;
}

export interface SiteSettings {
  companyName: string;
  companyNameEn: string;
  logoUrl?: string;
  location: string;
  address: string;
  phones: PhoneContact[];
  lineId: string;
  lineUrl: string;
  lineQrUrl?: string;
  facebookPageUrl: string;
  facebookPageId: string;
  primarySlogan: string;
  alternativeSlogans: string[];
  selectedSlogan: string;
  heroBadge: string;
  heroSubtitle: string;
  supportedSeatModes: number[];
  defaultSeatMode: number;
  seo: SeoSettings;
  telegram?: TelegramSettings;
}

export interface Amenity {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'exterior' | 'interior' | 'entertainment' | 'trips';
  imageUrl: string;
  caption: string;
}

export interface Testimonial {
  id: string;
  name: string;
  organization: string;
  rating: number;
  comment: string;
  trip: string;
  date: string;
}

export interface FreeServices {
  requestTourPlan: boolean;
  requestHotelBooking: boolean;
  requestKaraoke: boolean;
}

export interface Inquiry {
  id: string;
  customerName: string;
  phone: string;
  origin: string;
  destination: string;
  travelDate: string;
  returnDate: string;
  passengerCount: number;
  seatPreference: string;
  freeServices?: FreeServices;
  notes?: string;
  status: 'pending' | 'contacted' | 'quoted' | 'booked' | 'cancelled';
  createdAt: string;
  adminNotes?: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  customerName?: string;
  phone?: string;
  status: 'booked' | 'maintenance' | 'tentative';
  coachId?: string;
  notes?: string;
}

export interface DatabaseSchema {
  settings: SiteSettings;
  amenities: Amenity[];
  gallery: GalleryItem[];
  testimonials: Testimonial[];
  inquiries: Inquiry[];
  calendarEvents: CalendarEvent[];
}

function getDatabaseTemplate(): DatabaseSchema {
  return JSON.parse(JSON.stringify(databaseTemplate)) as DatabaseSchema;
}

export function getDatabase(): DatabaseSchema {
  try {
    // 1. Check in-memory cache
    if (globalThis.__PHUKETBUS_MEMORY_DB__) {
      return globalThis.__PHUKETBUS_MEMORY_DB__;
    }

    // 2. Check /tmp file (Vercel serverless writable storage)
    if (fs.existsSync(TMP_DB_FILE)) {
      try {
        const tmpData = fs.readFileSync(TMP_DB_FILE, 'utf-8');
        const parsed = JSON.parse(tmpData) as DatabaseSchema;
        if (!parsed.calendarEvents) parsed.calendarEvents = [];
        globalThis.__PHUKETBUS_MEMORY_DB__ = parsed;
        return parsed;
      } catch {
        // Fall back to local file
      }
    }

    // 3. Check local static db file
    if (fs.existsSync(LOCAL_DB_FILE)) {
      const data = fs.readFileSync(LOCAL_DB_FILE, 'utf-8');
      const db = JSON.parse(data) as DatabaseSchema;
      if (!db.calendarEvents) {
        db.calendarEvents = [];
      }
      globalThis.__PHUKETBUS_MEMORY_DB__ = db;
      return db;
    }

    // 4. Fallback to template
    const template = getDatabaseTemplate();
    globalThis.__PHUKETBUS_MEMORY_DB__ = template;
    return template;
  } catch (error) {
    console.error('Error reading database:', error);
    const template = getDatabaseTemplate();
    globalThis.__PHUKETBUS_MEMORY_DB__ = template;
    return template;
  }
}

export function saveDatabase(data: DatabaseSchema): void {
  // Update in-memory state
  globalThis.__PHUKETBUS_MEMORY_DB__ = data;

  // Attempt to write to /tmp (supported in AWS Lambda / Vercel Serverless)
  try {
    fs.writeFileSync(TMP_DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (tmpErr) {
    console.warn('Could not write database to /tmp:', tmpErr);
  }

  // Attempt to write to local directory (local development and persistent servers)
  try {
    fs.writeFileSync(LOCAL_DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (fsErr: any) {
    // On Vercel, root filesystem is read-only (EROFS), which is completely normal and expected
    console.info('Local disk is read-only (e.g. Vercel), persistence stored in memory and /tmp:', fsErr?.message);
  }
}
