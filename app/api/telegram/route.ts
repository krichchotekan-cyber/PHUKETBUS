import { NextResponse } from 'next/server';
import { autoDetectChatId, sendTelegramMessage, getTelegramConfig } from '@/lib/telegram';
import { getDatabase, saveDatabase } from '@/lib/db';
import { isAuthenticated } from '@/lib/auth';

export async function GET() {
  try {
    if (!isAuthenticated()) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const config = getTelegramConfig();
    return NextResponse.json({ config });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    if (!isAuthenticated()) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { action, botToken, chatId, enabled } = body;

    // Action 1: Save settings
    if (action === 'save') {
      const db = getDatabase();
      if (!db.settings) db.settings = {} as any;
      db.settings.telegram = {
        botToken: botToken || '9260423736:AAHxrewFut_-_39ehaR3I8wwmDms9PJsXw0',
        chatId: chatId || '',
        enabled: enabled !== undefined ? enabled : true,
      };
      saveDatabase(db);
      return NextResponse.json({ success: true, message: 'บันทึกการตั้งค่า Telegram เรียบร้อยแล้ว' });
    }

    // Action 2: Auto-detect Chat ID from Telegram getUpdates
    if (action === 'detect') {
      const detectResult = await autoDetectChatId(botToken);
      if (!detectResult.success) {
        return NextResponse.json(
          {
            success: false,
            error: detectResult.error,
          },
          { status: 400 }
        );
      }

      return NextResponse.json({
        success: true,
        chatId: detectResult.chatId,
        username: detectResult.username,
        firstName: detectResult.firstName,
        message: `ตรวจพบ Chat ID: ${detectResult.chatId} (${detectResult.firstName || detectResult.username || 'ผู้ใช้'}) สำเร็จ!`,
      });
    }

    // Action 3: Send test notification
    if (action === 'test') {
      const dateNow = new Date().toLocaleString('th-TH', { timeZone: 'Asia/Bangkok' });
      const testMsg = `
🔔 <b>ทดสอบการแจ้งเตือน Telegram สำเร็จ!</b>
━━━━━━━━━━━━━━━━━━━━
ระบบแจ้งเตือนการจองรถของ <b>หจก. เมืองสองย่า ทรานสปอร์ต แอนด์ ทัวร์ ภูเก็ต</b>
เชื่อมต่อกับบอท <b>@Phuketbusbot</b> เรียบร้อยแล้ว พร้อมส่งการแจ้งเตือนทันทีเมื่อมีลูกค้าขอใบเสนอราคาใหม่ครับ 🚌✨
━━━━━━━━━━━━━━━━━━━━
⏰ เวลาทดสอบ: ${dateNow}
`.trim();

      const sendResult = await sendTelegramMessage(testMsg, chatId, botToken);
      if (!sendResult.success) {
        return NextResponse.json({ success: false, error: sendResult.error }, { status: 400 });
      }

      return NextResponse.json({ success: true, message: 'ส่งข้อความทดสอบไปยัง Telegram สำเร็จแล้ว!' });
    }

    return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
