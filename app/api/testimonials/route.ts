import { NextResponse } from 'next/server';
import { getDatabase, saveDatabase, Testimonial } from '@/lib/db';
import { isAuthenticated } from '@/lib/auth';

export async function GET() {
  try {
    const db = getDatabase();
    return NextResponse.json({ testimonials: db.testimonials || [] });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch testimonials' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    if (!isAuthenticated()) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { name, organization, rating, comment, trip, date } = body;

    if (!name || !comment) {
      return NextResponse.json({ error: 'Name and comment are required' }, { status: 400 });
    }

    const db = getDatabase();
    const newTestimonial: Testimonial = {
      id: `test-${Date.now()}`,
      name,
      organization: organization || '',
      rating: Number(rating) || 5,
      comment,
      trip: trip || '',
      date: date || 'เร็วๆ นี้',
    };

    if (!db.testimonials) db.testimonials = [];
    db.testimonials.push(newTestimonial);
    saveDatabase(db);

    return NextResponse.json({ success: true, item: newTestimonial });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add testimonial' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    if (!isAuthenticated()) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const db = getDatabase();
    db.testimonials = (db.testimonials || []).filter((item) => item.id !== id);
    saveDatabase(db);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete testimonial' }, { status: 500 });
  }
}
