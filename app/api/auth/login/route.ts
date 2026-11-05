import { NextResponse } from 'next/server';
import {
  ADMIN_PASSWORD,
  ADMIN_USERNAME,
  hasAdminConfiguration,
  setAdminSession,
} from '@/lib/auth';

export async function POST(request: Request) {
  try {
    if (!hasAdminConfiguration()) {
      return NextResponse.json(
        { success: false, message: 'ระบบยังไม่ได้ตั้งค่าบัญชีผู้ดูแล' },
        { status: 503 }
      );
    }

    const body = await request.json();
    const { username, password } = body;

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setAdminSession();
      return NextResponse.json({ success: true, message: 'เข้าสู่ระบบสำเร็จ' });
    }

    return NextResponse.json(
      { success: false, message: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json({ success: false, message: 'เกิดข้อผิดพลาด' }, { status: 500 });
  }
}
