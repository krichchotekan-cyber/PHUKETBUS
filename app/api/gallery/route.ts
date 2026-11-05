import { NextResponse } from 'next/server';
import { getDatabase, saveDatabase, GalleryItem } from '@/lib/db';
import { isAuthenticated } from '@/lib/auth';

export async function GET() {
  try {
    const db = getDatabase();
    return NextResponse.json({ gallery: db.gallery || [] });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch gallery' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    if (!isAuthenticated()) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { title, category, imageUrl, caption } = body;

    if (!title || !imageUrl) {
      return NextResponse.json({ error: 'Title and image URL are required' }, { status: 400 });
    }

    const db = getDatabase();
    const newItem: GalleryItem = {
      id: `gal-${Date.now()}`,
      title,
      category: category || 'exterior',
      imageUrl,
      caption: caption || '',
    };

    if (!db.gallery) db.gallery = [];
    db.gallery.push(newItem);
    saveDatabase(db);

    return NextResponse.json({ success: true, item: newItem });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add gallery item' }, { status: 500 });
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
    db.gallery = (db.gallery || []).filter((item) => item.id !== id);
    saveDatabase(db);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete gallery item' }, { status: 500 });
  }
}
