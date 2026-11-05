import { Inquiry } from './db';
import { getDatabase, saveDatabase } from './db';

const DEFAULT_BOT_TOKEN = '9260423736:AAHxrewFut_-_39ehaR3I8wwmDms9PJsXw0';

export interface TelegramConfig {
  botToken: string;
  chatId: string;
  enabled: boolean;
}

export function getTelegramConfig(): TelegramConfig {
  let botToken = process.env.TELEGRAM_BOT_TOKEN || '';
  let chatId = process.env.TELEGRAM_CHAT_ID || '';
  let enabled = true;

  try {
    const db = getDatabase();
    if (db?.settings?.telegram) {
      botToken = db.settings.telegram.botToken || botToken || DEFAULT_BOT_TOKEN;
      chatId = db.settings.telegram.chatId || chatId;
      enabled = db.settings.telegram.enabled !== undefined ? db.settings.telegram.enabled : true;
    }
  } catch (e) {
    // fallback
  }

  if (!botToken) {
    botToken = DEFAULT_BOT_TOKEN;
  }

  return { botToken, chatId, enabled };
}

/**
 * Check recent updates from Telegram to auto-detect chat_id of the bot owner
 */
export async function autoDetectChatId(botToken?: string): Promise<{
  success: boolean;
  chatId?: string;
  username?: string;
  firstName?: string;
  error?: string;
}> {
  const token = botToken || getTelegramConfig().botToken;
  if (!token) {
    return { success: false, error: 'ไม่พบ Bot Token' };
  }

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/getUpdates`, {
      method: 'GET',
      cache: 'no-store',
    });
    const data = await res.json();

    if (!data.ok) {
      return { success: false, error: data.description || 'เกิดข้อผิดพลาดในการเชื่อมต่อ Telegram' };
    }

    const updates = data.result || [];
    if (updates.length === 0) {
      return {
        success: false,
        error: 'ยังไม่มีข้อความส่งเข้ามา กรุณากดปุ่ม Start หรือส่งข้อความใดๆ ไปที่ @Phuketbusbot ใน Telegram ก่อน',
      };
    }

    // Get the most recent update that contains a chat id
    for (let i = updates.length - 1; i >= 0; i--) {
      const u = updates[i];
      const chat = u.message?.chat || u.channel_post?.chat || u.my_chat_member?.chat;
      if (chat && chat.id) {
        const detectedChatId = String(chat.id);
        const username = chat.username || '';
        const firstName = chat.first_name || chat.title || '';

        // Auto-save to database settings
        try {
          const db = getDatabase();
          if (db?.settings) {
            db.settings.telegram = {
              botToken: token,
              chatId: detectedChatId,
              enabled: true,
            };
            saveDatabase(db);
          }
        } catch (sErr) {}

        return {
          success: true,
          chatId: detectedChatId,
          username,
          firstName,
        };
      }
    }

    return { success: false, error: 'ไม่พบข้อมูล Chat ID ในข้อความล่าสุด' };
  } catch (err: any) {
    return { success: false, error: err.message || 'เชื่อมต่อ Telegram ล้มเหลว' };
  }
}

/**
 * Send raw text message to Telegram
 */
export async function sendTelegramMessage(
  text: string,
  targetChatId?: string,
  botToken?: string
): Promise<{ success: boolean; error?: string }> {
  const config = getTelegramConfig();
  const token = botToken || config.botToken;
  let chatId = targetChatId || config.chatId;

  // If chatId is missing, try auto-detecting it from getUpdates
  if (!chatId) {
    const detect = await autoDetectChatId(token);
    if (detect.success && detect.chatId) {
      chatId = detect.chatId;
    }
  }

  if (!token) {
    return { success: false, error: 'Missing Telegram Bot Token' };
  }

  if (!chatId) {
    return {
      success: false,
      error: 'Missing Chat ID. Please start @Phuketbusbot in Telegram and send a message or configure Chat ID.',
    };
  }

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      }),
    });

    const data = await res.json();
    if (!data.ok) {
      return { success: false, error: data.description };
    }

    return { success: true };
  } catch (error: any) {
    console.error('Telegram notification error:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Format and send a booking/inquiry notification to Telegram
 */
export async function sendTelegramBookingNotification(
  inquiry: Inquiry,
  freeServices?: { requestTourPlan?: boolean; requestHotelBooking?: boolean; requestKaraoke?: boolean }
): Promise<{ success: boolean; error?: string }> {
  const config = getTelegramConfig();
  if (!config.enabled) {
    return { success: true };
  }

  const freeServicesText: string[] = [];
  const fs = inquiry.freeServices || freeServices;
  if (fs) {
    if (fs.requestTourPlan) freeServicesText.push('จัดโปรแกรมทัวร์ฟรี');
    if (fs.requestHotelBooking) freeServicesText.push('ช่วยจองโรงแรมฟรี');
    if (fs.requestKaraoke) freeServicesText.push('คาราโอเกะ/เครื่องเสียง');
  }

  const travelDates = inquiry.returnDate
    ? `${inquiry.travelDate || '-'} ถึง ${inquiry.returnDate}`
    : inquiry.travelDate || 'ยังไม่ระบุ';

  const dateNow = new Date().toLocaleString('th-TH', {
    timeZone: 'Asia/Bangkok',
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  const message = `
🚌 <b>มีรายการขอใบเสนอราคา / จองรถใหม่!</b>
━━━━━━━━━━━━━━━━━━━━
👤 <b>ชื่อลูกค้า:</b> ${escapeHtml(inquiry.customerName)}
📞 <b>เบอร์ติดต่อ:</b> <a href="tel:${escapeHtml(inquiry.phone)}">${escapeHtml(inquiry.phone)}</a>
📍 <b>ต้นทาง:</b> ${escapeHtml(inquiry.origin || 'ภูเก็ต')}
🏁 <b>ปลายทาง:</b> ${escapeHtml(inquiry.destination || 'ยังไม่ระบุ')}
📅 <b>ช่วงเวลาเดินทาง:</b> ${escapeHtml(travelDates)}
👥 <b>จำนวนผู้โดยสาร:</b> ${inquiry.passengerCount} ท่าน
💺 <b>รุ่นรถที่สนใจ:</b> ${escapeHtml(inquiry.seatPreference || 'เหมาคัน 46 ที่นั่ง VIP')}
${
  freeServicesText.length > 0
    ? `🎁 <b>บริการเสริมฟรี:</b> ${freeServicesText.join(', ')}\n`
    : ''
}${
    inquiry.notes ? `📝 <b>หมายเหตุ:</b> ${escapeHtml(inquiry.notes)}\n` : ''
  }━━━━━━━━━━━━━━━━━━━━
⏰ <b>เวลาที่ส่งข้อมูล:</b> ${dateNow}
🌐 <b>ตรวจสอบในระบบ:</b> <a href="https://phuketbus.vercel.app/admin">เข้าสู่ระบบหลังบ้าน CMS</a>
`.trim();

  return await sendTelegramMessage(message);
}

function escapeHtml(text: string): string {
  return (text || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
