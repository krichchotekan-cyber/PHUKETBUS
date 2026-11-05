import { NextResponse } from 'next/server';
import { getDatabase, saveDatabase, CalendarEvent } from '@/lib/db';
import { isAuthenticated } from '@/lib/auth';

export async function GET() {
  try {
    const db = getDatabase();
    return NextResponse.json({ events: db.calendarEvents || [] });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch calendar events' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    if (!isAuthenticated()) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { title, startDate, endDate, customerName, phone, status, notes } = body;

    if (!title || !startDate || !endDate) {
      return NextResponse.json(
        { error: 'กรุณาระบุหัวข้อ และช่วงวันที่เริ่มต้น-สิ้นสุด' },
        { status: 400 }
      );
    }

    const db = getDatabase();
    const newEvent: CalendarEvent = {
      id: `cal-${Date.now()}`,
      title,
      startDate,
      endDate,
      customerName: customerName || '',
      phone: phone || '',
      status: status || 'booked',
      coachId: '30-2542 (เมืองสองย่า VIP)',
      notes: notes || '',
    };

    if (!db.calendarEvents) db.calendarEvents = [];
    db.calendarEvents.push(newEvent);
    saveDatabase(db);

    return NextResponse.json({ success: true, event: newEvent });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add calendar event' }, { status: 500 });
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
    db.calendarEvents = (db.calendarEvents || []).filter((e) => e.id !== id);
    saveDatabase(db);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete calendar event' }, { status: 500 });
  }
}
