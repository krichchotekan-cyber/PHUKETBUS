import { NextResponse } from 'next/server';
import { getDatabase, saveDatabase, Inquiry } from '@/lib/db';
import { isAuthenticated } from '@/lib/auth';
import { sendFacebookCapiEvent } from '@/lib/facebook';
import { sendTelegramBookingNotification } from '@/lib/telegram';

export async function GET() {
  try {
    if (!isAuthenticated()) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const db = getDatabase();
    // Return inquiries sorted latest first
    const inquiries = [...(db.inquiries || [])].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    return NextResponse.json({ inquiries });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch inquiries' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      customerName,
      phone,
      origin,
      destination,
      travelDate,
      returnDate,
      passengerCount,
      seatPreference,
      notes,
    } = body;

    if (!customerName || !phone) {
      return NextResponse.json({ error: 'กรุณากรอกชื่อและเบอร์โทรติดต่อ' }, { status: 400 });
    }

    const db = getDatabase();
    const newInquiry: Inquiry = {
      id: `inq-${Date.now()}`,
      customerName,
      phone,
      origin: origin || 'ภูเก็ต',
      destination: destination || '',
      travelDate: travelDate || '',
      returnDate: returnDate || '',
      passengerCount: Number(passengerCount) || 40,
      seatPreference: seatPreference || 'รุ่น 46 ที่นั่ง',
      notes: notes || '',
      status: 'pending',
      createdAt: new Date().toISOString(),
      adminNotes: '',
    };

    if (!db.inquiries) {
      db.inquiries = [];
    }
    db.inquiries.push(newInquiry);
    saveDatabase(db);

    // Send Facebook CAPI Lead Event if pixel & token are set
    const ip = request.headers.get('x-forwarded-for') || undefined;
    const userAgent = request.headers.get('user-agent') || undefined;

    if (db.settings.seo?.facebookPixelId && db.settings.seo?.facebookAccessToken) {
      await sendFacebookCapiEvent(
        db.settings.seo.facebookPixelId,
        db.settings.seo.facebookAccessToken,
        {
          eventName: 'Lead',
          userData: {
            clientIpAddress: ip,
            clientUserAgent: userAgent,
            phone: phone.replace(/[^0-9]/g, ''),
          },
          customData: {
            destination,
            passengerCount,
            seatPreference,
          },
        }
      );
    }

    // Send Telegram Notification to the bot
    try {
      await sendTelegramBookingNotification(newInquiry, body.freeServices);
    } catch (telegramErr) {
      console.error('Error sending Telegram notification:', telegramErr);
    }

    return NextResponse.json({
      success: true,
      message: 'ส่งคำขอใบเสนอราคาเรียบร้อยแล้ว เจ้าหน้าที่จะติดต่อกลับโดยเร็วที่สุด',
      inquiry: newInquiry,
    });
  } catch (error) {
    console.error('Error saving inquiry:', error);
    return NextResponse.json({ error: 'Failed to create inquiry' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    if (!isAuthenticated()) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { id, status, adminNotes } = body;

    if (!id) {
      return NextResponse.json({ error: 'Inquiry ID is required' }, { status: 400 });
    }

    const db = getDatabase();
    const inquiryIndex = db.inquiries.findIndex((i) => i.id === id);

    if (inquiryIndex === -1) {
      return NextResponse.json({ error: 'Inquiry not found' }, { status: 404 });
    }

    if (status) db.inquiries[inquiryIndex].status = status;
    if (adminNotes !== undefined) db.inquiries[inquiryIndex].adminNotes = adminNotes;

    saveDatabase(db);
    return NextResponse.json({ success: true, inquiry: db.inquiries[inquiryIndex] });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update inquiry' }, { status: 500 });
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
      return NextResponse.json({ error: 'Inquiry ID is required' }, { status: 400 });
    }

    const db = getDatabase();
    db.inquiries = db.inquiries.filter((i) => i.id !== id);
    saveDatabase(db);

    return NextResponse.json({ success: true, message: 'Deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete inquiry' }, { status: 500 });
  }
}
