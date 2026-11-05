import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck, FileText, CheckCircle2, AlertTriangle, PhoneCall } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ข้อกำหนดและเงื่อนไขการให้บริการ (Terms & Conditions) | เมืองสองย่า ทรานสปอร์ต แอนด์ ทัวร์',
  description: 'ข้อกำหนด เงื่อนไขการเช่าเหมารถทัวร์ 2 ชั้น VIP การวางเงินมัดจำ การยกเลิก และมาตรฐานความปลอดภัย หจก. เมืองสองย่า ทรานสปอร์ต แอนด์ ทัวร์ ภูเก็ต',
};

export default function TermsPage() {
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
              <FileText className="w-3.5 h-3.5 text-emerald-700" />
              <span>เอกสารข้อตกลงการให้บริการ</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-emerald-950">
              ข้อกำหนดและเงื่อนไขการให้บริการ (Terms & Conditions)
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              ห้างหุ้นส่วนจำกัด เมืองสองย่า ทรานสปอร์ต แอนด์ ทัวร์ (ปรับปรุงล่าสุด พฤศจิกายน 2567)
            </p>
          </div>

          {/* Section 1: บทนำและรูปแบบการให้บริการ */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-emerald-950 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 text-xs flex items-center justify-center font-bold">1</span>
              <span>รูปแบบการให้บริการเช่าเหมารถทัวร์</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              ห้างหุ้นส่วนจำกัด เมืองสองย่า ทรานสปอร์ต แอนด์ ทัวร์ ให้บริการเช่าเหมารถทัวร์ปรับอากาศ 2 ชั้น VIP ขนาด 40 – 46 ที่นั่ง แบบ <strong>เช่าเหมาทั้งคัน (Whole Coach Charter)</strong> เท่านั้น โดยไม่มีการจำหน่ายตั๋วโดยสารรายที่นั่ง การให้บริการครอบคลุมการเดินทางทั่วประเทศไทย โดยมีจุดเริ่มต้นหรือจุดหมายปลายทางตามที่ตกลงกันไว้ในใบเสนอราคา
            </p>
          </section>

          {/* Section 2: การจองและการชำระเงิน */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-emerald-950 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 text-xs flex items-center justify-center font-bold">2</span>
              <span>การจองคิวรถและการวางเงินมัดจำ</span>
            </h2>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600 list-disc list-inside leading-relaxed">
              <li>การจองคิวรถจะมีผลสมบูรณ์เมื่อผู้เช่าได้ทำการยืนยันใบเสนอราคาและชำระเงินมัดจำตามที่ระบุในสัญญาหรือใบเสนอราคา (โดยทั่วไป 30% ของยอดรวม)</li>
              <li>ยอดเงินส่วนที่เหลือ ผู้เช่าต้องชำระให้เสร็จสิ้นก่อนเริ่มออกเดินทาง หรือตามเงื่อนไขที่ตกลงกันเป็นลายลักษณ์อักษร</li>
              <li>การชำระเงินสามารถทำได้ผ่านการโอนเงินเข้าบัญชีธนาคารทางการของ หจก. เมืองสองย่า ทรานสปอร์ต แอนด์ ทัวร์ เท่านั้น</li>
            </ul>
          </section>

          {/* Section 3: นโยบายการยกเลิกและการเลื่อนวันเดินทาง */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-emerald-950 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 text-xs flex items-center justify-center font-bold">3</span>
              <span>นโยบายการยกเลิกและการเลื่อนวันเดินทาง</span>
            </h2>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-600 space-y-2">
              <p>• <strong>แจ้งยกเลิกล่วงหน้ามากกว่า 15 วัน:</strong> คืนเงินมัดจำ 50% หรือสามารถขอเลื่อนวันเดินทางได้โดยไม่เสียค่าธรรมเนียม (ขึ้นอยู่กับคิวรถว่าง)</p>
              <p>• <strong>แจ้งยกเลิกล่วงหน้าน้อยกว่า 7 วัน:</strong> ทางบริษัทฯ ขอสงวนสิทธิ์ไม่คืนเงินมัดจำ เนื่องจากได้ทำการล็อกคิวรถและปฏิเสธลูกค้ารายอื่นแล้ว</p>
              <p>• <strong>กรณีเหตุสุดวิสัย (ภัยธรรมชาติ, ประกาศภาวะฉุกเฉิน):</strong> สามารถพูดคุยเพื่อเลื่อนวันเดินทางได้ตามความเหมาะสม</p>
            </div>
          </section>

          {/* Section 4: ความปลอดภัยและการปฏิบัติตนบนรถ */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-emerald-950 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 text-xs flex items-center justify-center font-bold">4</span>
              <span>มาตรฐานความปลอดภัยและข้อปฏิบัติบนรถทัวร์</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-700">
              <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-100 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <span>ผู้โดยสารทุกคนต้องคาดเข็มขัดนิรภัยตลอดเวลาขณะรถกำลังเคลื่อนที่ตามกฎหมายกำหนด</span>
              </div>
              <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-100 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <span>พนักงานขับรถเป็นเจ้าของรถโดยตรง ชำนาญเส้นทาง และปฏิบัติตามกฎจำกัดความเร็วเคร่งครัด</span>
              </div>
              <div className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-200 flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <span>ห้ามสูบบุหรี่ บุหรี่ไฟฟ้า หรือเสพสิ่งผิดกฎหมายทุกชนิดบนรถโดยเด็ดขาด</span>
              </div>
              <div className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-200 flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <span>ห้ามนำวัตถุไวไฟ สารเคมีอันตราย หรืออาวุธขึ้นบนรถโดยสาร</span>
              </div>
            </div>
          </section>

          {/* Section 5: ประกันภัย */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-emerald-950 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 text-xs flex items-center justify-center font-bold">5</span>
              <span>การประกันภัยผู้โดยสาร</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              รถทัวร์ของเมืองสองย่า ทรานสปอร์ต มีการจัดทำประกันภัยภาคบังคับ (พ.ร.บ.) และประกันภัยผู้โดยสารประเภท 1 คุ้มครองเต็มวงเงินตามมาตรฐานกรมการขนส่งทางบก ครอบคลุมผู้โดยสารทุกที่นั่งตลอดระยะเวลาเดินทาง
            </p>
          </section>

          {/* Section 6: บริการเสริมฟรี */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-emerald-950 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 text-xs flex items-center justify-center font-bold">6</span>
              <span>บริการจัดโปรแกรมทัวร์และจองโรงแรมฟรี</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              บริการวางแผนโปรแกรมทัวร์และช่วยประสานงานจองห้องพักโรงแรม เป็นบริการอำนวยความสะดวกพิเศษจากทางทัวร์โดยไม่มีการบวกค่าใช้จ่ายเพิ่ม ทั้งนี้ค่าใช้จ่ายที่เกิดขึ้นจริงกับทางโรงแรม ที่พัก ค่าบัตรเข้าชมสถานที่ หรือค่าอาหาร ผู้เช่าเป็นผู้ชำระโดยตรงตามจริง
            </p>
          </section>

          {/* Section 7: การติดต่อ */}
          <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-xs font-bold text-emerald-900 uppercase">มีข้อสงสัยเกี่ยวกับเงื่อนไข?</div>
              <div className="text-sm font-semibold text-slate-800 mt-0.5">
                ติดต่อเจ้าของโดยตรง: 096-463-8443, 081-059-6350
              </div>
            </div>
            <Link
              href="/"
              className="px-5 py-2.5 rounded-xl emerald-gradient-btn text-white text-xs font-bold shadow transition"
            >
              กลับหน้าหลัก
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
