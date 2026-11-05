import { NextResponse } from 'next/server';
import { getDatabase, saveDatabase, SiteSettings } from '@/lib/db';
import { isAuthenticated } from '@/lib/auth';

export async function GET() {
  try {
    const db = getDatabase();
    return NextResponse.json({ settings: db.settings });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    if (!isAuthenticated()) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body: SiteSettings = await request.json();
    const db = getDatabase();
    db.settings = {
      ...db.settings,
      ...body,
      seo: {
        ...db.settings.seo,
        ...(body.seo || {}),
      },
    };
    saveDatabase(db);
    return NextResponse.json({ success: true, settings: db.settings });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
  }
}
