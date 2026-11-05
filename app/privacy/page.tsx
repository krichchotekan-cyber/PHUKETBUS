import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck, Cookie, Lock, Eye, Database, PhoneCall, CheckCircle2 } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'นโยบายความเป็นส่วนตัวและนโยบายคุกกี้ (Privacy & Cookie Policy) | เมืองสองย่า ทรานสปอร์ต แอนด์ ทัวร์',
  description: 'นโยบายคุ้มครองข้อมูลส่วนบุคคล (PDPA) และนโยบายการจัดเก็บคุกกี้ ห้างหุ้นส่วนจำกัด เมืองสองย่า ทรานสปอร์ต แอนด์ ทัวร์ ภูเก็ต',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 selection:bg-emerald-700 selection:text-white">
      {/* Top Header */}
      <header className="bg-emerald-950 text-white border-b border-emerald-900 py-6 sticky top-0 z-30 shadow-md">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-emerald-200 hover:text-amber-300 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>กลับสู่หน้าหลัก</span>
          </Link>
          <div className="flex items-center gap-2">
            <img src="/images/logo.png" alt="โลโก้" className="h-8 w-auto object-contain" />
            <span className="text-xs font-bold text-white hidden sm:inline">
              เมืองสองย่า ทรานสปอร์ต แอนด์ ทัวร์
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="bg-white rounded-3xl border border-emerald-100 p-6 sm:p-10 shadow-clean space-y-8">
          {/* Document Header */}
          <div className="border-b border-slate-100 pb-6 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold mb-3 border border-emerald-200">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
              <span>คุ้มครองข้อมูลส่วนบุคคลตาม พ.ร.บ. PDPA</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-emerald-950">
              นโยบายความเป็นส่วนตัวและการจัดเก็บคุกกี้ (Privacy & Cookie Policy)
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              ห้างหุ้นส่วนจำกัด เมืองสองย่า ทรานสปอร์ต แอนด์ ทัวร์ (ปรับปรุงล่าสุด พฤศจิกายน 2567)
            </p>
          </div>

          {/* Section 1: บทนำ */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-emerald-950 flex items-center gap-2">
              <Lock className="w-5 h-5 text-emerald-700" />
              <span>1. ความมุ่งมั่นในการคุ้มครองข้อมูลส่วนบุคคล</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              ห้างหุ้นส่วนจำกัด เมืองสองย่า ทรานสปอร์ต แอนด์ ทัวร์ ("บริษัทฯ") ตระหนักถึงความสำคัญของการคุ้มครองข้อมูลส่วนบุคคลของท่านตามพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 (PDPA) นโยบายนี้จัดทำขึ้นเพื่อชี้แจงรายละเอียดเกี่ยวกับการเก็บรวบรวม ใช้ และเปิดเผยข้อมูลส่วนบุคคล รวมถึงการใช้งานคุกกี้บนเว็บไซต์นี้
            </p>
          </section>

          {/* Section 2: ข้อมูลที่จัดเก็บ */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-emerald-950 flex items-center gap-2">
              <Database className="w-5 h-5 text-emerald-700" />
              <span>2. ข้อมูลส่วนบุคคลที่เราจัดเก็บ</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              เมื่อท่านติดต่อสอบถาม จองคิวรถ หรือขอใบเสนอราคาผ่านเว็บไซต์ บริษัทฯ อาจจัดเก็บข้อมูลของท่านดังต่อไปนี้:
            </p>
            <ul className="space-y-1.5 text-xs sm:text-sm text-slate-600 list-disc list-inside">
              <li>ชื่อ-นามสกุล หรือชื่อหน่วยงาน/องค์กร</li>
              <li>เบอร์โทรศัพท์สำหรับติดต่อกลับ และ ID Line</li>
              <li>ข้อมูลการเดินทาง เช่น จุดรับ-ส่ง, ปลายทาง, วันและเวลาเดินทาง, จำนวนผู้โดยสาร</li>
              <li>ความต้องการพิเศษ เช่น การจัดโปรแกรมทัวร์, การประสานงานจองที่พัก หรือสิ่งอำนวยความสะดวกบนรถ</li>
              <li>ข้อมูลทางเทคนิค เช่น IP Address, ชนิดของเบราว์เซอร์, และข้อมูลคุกกี้ในการเข้าชมเว็บไซต์</li>
            </ul>
          </section>

          {/* Section 3: วัตถุประสงค์ */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-emerald-950 flex items-center gap-2">
              <Eye className="w-5 h-5 text-emerald-700" />
              <span>3. วัตถุประสงค์ในการเก็บรวบรวมและใช้ข้อมูล</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-700">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <strong className="block text-emerald-950 mb-1">การให้บริการเช่าเหมารถทัวร์:</strong>
                ใช้สำหรับการจัดทำใบเสนอราคา การยืนยันคิวรถ และติดต่อประสานงานการเดินทาง
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <strong className="block text-emerald-950 mb-1">การประกันภัยและความปลอดภัย:</strong>
                ใช้สำหรับการทำประกันภัยผู้โดยสารคุ้มครองการเดินทางตามกฎหมาย
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <strong className="block text-emerald-950 mb-1">การบริการเสริมฟรี:</strong>
                ใช้ในการประสานงานจองห้องพักโรงแรมและวางแผนโปรแกรมทัวร์ตามที่ลูกค้าร้องขอ
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <strong className="block text-emerald-950 mb-1">พัฒนาการให้บริการ:</strong>
                วิเคราะห์สถิติการใช้งานเว็บไซต์เพื่อปรับปรุงประสบการณ์ของลูกค้า
              </div>
            </div>
          </section>

          {/* Section 4: นโยบายการจัดเก็บคุกกี้ (Cookie Policy) */}
          <section className="space-y-4 p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200">
            <h2 className="text-lg font-bold text-emerald-950 flex items-center gap-2">
              <Cookie className="w-5 h-5 text-emerald-700" />
              <span>4. นโยบายการจัดเก็บและการใช้งานคุกกี้ (Cookie Policy)</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              เว็บไซต์นี้ใช้คุกกี้ (Cookies) เพื่อเพิ่มประสิทธิภาพในการใช้งานและนำเสนอเนื้อหาที่เหมาะสมกับท่าน โดยคุกกี้ที่ใช้งานแบ่งออกเป็นประเภทต่างๆ ดังนี้:
            </p>
            <div className="space-y-2.5 text-xs sm:text-sm text-slate-700">
              <div className="p-3 rounded-xl bg-white border border-emerald-100">
                <strong className="text-emerald-900 block font-semibold mb-0.5">
                  1) คุกกี้ที่จำเป็นอย่างยิ่ง (Strictly Necessary Cookies):
                </strong>
                คุกกี้ที่จำเป็นต่อการทำงานพื้นฐานของเว็บไซต์ เช่น การจดจำความยินยอมคุกกี้ และการทำงานของระบบความปลอดภัย
              </div>
              <div className="p-3 rounded-xl bg-white border border-emerald-100">
                <strong className="text-emerald-900 block font-semibold mb-0.5">
                  2) คุกกี้เพื่อการวิเคราะห์และวัดผล (Analytics Cookies):
                </strong>
                ช่วยให้เราเข้าใจว่าผู้เข้าชมมีปฏิสัมพันธ์กับเว็บไซต์อย่างไร เพื่อนำมาปรับปรุงความเร็วและการใช้งาน
              </div>
              <div className="p-3 rounded-xl bg-white border border-emerald-100">
                <strong className="text-emerald-900 block font-semibold mb-0.5">
                  3) คุกกี้เพื่อการตลาดและการโฆษณา (Marketing & Meta Pixel Cookies):
                </strong>
                ใช้สำหรับการเชื่อมต่อกับ Facebook Meta Pixel และ Conversions API เพื่อประเมินประสิทธิภาพของการโฆษณา และนำเสนอข้อเสนอพิเศษที่ตรงกับความสนใจของท่าน
              </div>
            </div>
            <p className="text-xs text-slate-500">
              ท่านสามารถจัดการหรือปฏิเสธการจัดเก็บคุกกี้ที่ไม่จำเป็นได้ตลอดเวลาผ่านแถบแจ้งเตือนคุกกี้ (Cookie Consent Banner) ด้านล่างของเว็บไซต์
            </p>
          </section>

          {/* Section 5: สิทธิของเจ้าของข้อมูลส่วนบุคคล */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-emerald-950 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-700" />
              <span>5. สิทธิของท่านตามกฎหมาย PDPA</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              ท่านมีสิทธิตามกฎหมายในการขอเข้าถึง ขอรับสำเนา ขอแก้ไขข้อมูลให้ถูกต้อง ขอให้ลบหรือทำลายข้อมูล หรือเพิกถอนความยินยอมในการประมวลผลข้อมูลส่วนบุคคลของท่าน โดยสามารถติดต่อเจ้าหน้าที่ของเราได้ตามช่องทางด้านล่างนี้
            </p>
          </section>

          {/* Section 6: ช่องทางการติดต่อ */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <div className="text-xs font-bold text-emerald-900 uppercase">เจ้าหน้าที่คุ้มครองข้อมูลส่วนบุคคล (DPO)</div>
              <div className="text-sm font-semibold text-slate-800">
                หจก. เมืองสองย่า ทรานสปอร์ต แอนด์ ทัวร์ ภูเก็ต
              </div>
              <div className="text-xs text-slate-500">
                โทร: 096-463-8443, 081-059-6350 | LINE: @muangsongya
              </div>
            </div>
            <Link
              href="/"
              className="px-5 py-2.5 rounded-xl emerald-gradient-btn text-white text-xs font-bold shadow transition shrink-0"
            >
              กลับหน้าหลัก
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
