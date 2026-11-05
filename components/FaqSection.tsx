'use client';

import React, { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'ทำไมบริการเช่าเหมาคัน "เจ้าของขับเอง" ถึงปลอดภัยและคุ้มค่ากว่า?',
      answer:
        'เพราะเจ้าของกิจการรักและทะนุถนอมรถคันนี้มากที่สุด ใส่ใจในชีวิตผู้โดยสารทุกท่านเสมือนคนในครอบครัว มีประสบการณ์ขับรถทัวร์กว่า 15 ปี ไม่ดื่มของมึนเมา ไม่ขับเร็วเกินกฎหมายกำหนด พักผ่อนเต็มที่ก่อนเริ่มทริป และชำนาญเส้นทางทั้งขึ้นเขาชันและทางไกลทั่วประเทศ แตกต่างจากการจ้างคนขับรับจ้างทั่วไปที่อาจเปลี่ยนมือบ่อยครับ',
    },
    {
      question: 'รถทัวร์ 2 ชั้น VIP รองรับได้กี่ที่นั่ง และเลือกรุ่นอย่างไร?',
      answer:
        'เรามีผังที่นั่งให้ปรับเลือกได้ตั้งแต่ 40 ที่นั่ง, 44 ที่นั่ง, ไปจนถึง 46 ที่นั่ง (ชั้นบนและชั้นล่าง) เบาะนั่งปรับเอนนอนได้สบาย มีช่องชาร์จ USB ทุกที่นั่ง แอร์เย็นฉ่ำ ทีวีคาราโอเกะทั้ง 2 ชั้น และห้องน้ำสะอาดพร้อมอ่างล้างมือบนรถ สามารถเลือกตามขนาดกรุ๊ปและจำนวนสัมภาระได้ทันที',
    },
    {
      question: 'บริการช่วยจัดโปรแกรมทัวร์ฟรี และจองโรงแรมฟรี มีเงื่อนไขอย่างไร?',
      answer:
        'ไม่มีเงื่อนไขซับซ้อนครับ! เพียงท่านเช่าเหมารถทัวร์กับเรา เจ้าของยินดีช่วยแนะนำและวางแผนกำหนดการเดินทาง จุดแวะรับประทานอาหาร จุดชมวิว รวมถึงช่วยติดต่อประสานงานจองห้องพักโรงแรมสำหรับหมู่คณะในราคากรุ๊ปพิเศษ โดยไม่มีการคิดค่าบริการเสริมหรือบวกเพิ่มใดๆ ทั้งสิ้นครับ',
    },
    {
      question: 'ขั้นตอนการจองรถทัวร์และขอใบเสนอราคาทำอย่างไร?',
      answer:
        'ทำได้ง่ายๆ 3 ช่องทางครับ: 1) โทรสายด่วน 096-463-8443 หรือ 081-059-6350 2) แอดไลน์ @muangsongya ส่งกำหนดการเดินทาง 3) กรอกฟอร์มขอใบเสนอราคาบนเว็บไซต์นี้ เมื่อตกลงราคาเรียบร้อย ทางเราจะออกหนังสือยืนยันการจองพร้อมมัดจำเพื่อล็อคคิวรถ 100%',
    },
    {
      question: 'มีประกันภัยผู้โดยสารและมาตรฐานความปลอดภัยอย่างไร?',
      answer:
        'รถทัวร์ของเรามีประกันภัย พ.ร.บ. และประกันภัยผู้โดยสารชั้น 1 คุ้มครองเต็มวงเงินตามกฎหมาย มีถังดับเพลิง ค้อนทุบกระจก ทางออกฉุกเฉินบนหลังคา และระบบ GPS ติดตามความเร็วเชื่อมต่อกับกรมการขนส่งทางบกตลอด 24 ชั่วโมง',
    },
    {
      question: 'สามารถออกใบเสร็จรับเงิน หรือใบกำกับภาษีสำหรับหน่วยงานราชการ/บริษัทได้ไหม?',
      answer:
        'ได้แน่นอนครับ ห้างหุ้นส่วนจำกัด เมืองสองย่า ทรานสปอร์ต แอนด์ ทัวร์ จดทะเบียนนิติบุคคลถูกต้องตามกฎหมาย มีเลขประจำตัวผู้เสียภาษี สามารถออกใบเสนอราคา ใบเสร็จรับเงิน และเอกสารเบิกจ่ายสำหรับหน่วยงานราชการ โรงเรียน มหาวิทยาลัย และบริษัทเอกชนได้อย่างครบถ้วน',
    },
  ];

  return (
    <section className="py-20 sm:py-24 bg-white text-slate-800 relative border-t border-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-emerald-700" />
            <span>คำถามที่พบบ่อย (FAQ)</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-emerald-950 tracking-tight">
            ข้อสงสัยเกี่ยวกับ <span className="emerald-gradient-text">บริการเช่าเหมารถทัวร์</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3">
            รวมคำตอบที่คุณอยากรู้ก่อนตัดสินใจเดินทางกับเมืองสองย่า ทรานสปอร์ต
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.question}
                className="rounded-2xl bg-slate-50 border border-slate-200 overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 hover:bg-emerald-50/50 transition cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="font-heading font-bold text-sm sm:text-base text-slate-900 hover:text-emerald-800 transition-colors">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen
                        ? 'rotate-180 bg-emerald-800 text-white border-emerald-800'
                        : 'bg-white text-slate-500 border-slate-300'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200/60 bg-white">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
