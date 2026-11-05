import fs from 'fs';
import path from 'path';
import databaseTemplate from '@/data/db.example.json';

const DB_FILE = path.join(process.cwd(), 'data', 'db.json');

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
    if (!fs.existsSync(DB_FILE)) {
      console.warn(`Database file not found at ${DB_FILE}; using the sanitized sample database.`);
      return getDatabaseTemplate();
    }
    const data = fs.readFileSync(DB_FILE, 'utf-8');
    const db = JSON.parse(data) as DatabaseSchema;
    if (!db.calendarEvents) {
      db.calendarEvents = [];
    }
    return db;
  } catch (error) {
    console.error('Error reading database:', error);
    throw error;
  }
}

export function saveDatabase(data: DatabaseSchema): void {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error saving database:', error);
    throw error;
  }
}
