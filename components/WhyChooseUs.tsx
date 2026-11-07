'use client';

import React from 'react';
import { ShieldCheck, Bus, MapPin, Sparkles, UserCheck, CheckCircle2 } from 'lucide-react';

export default function WhyChooseUs() {
  const cards = [
    {
      icon: UserCheck,
      badge: 'จุดเด่นอันดับ 1',
      title: 'เจ้าของขับเอง (Owner-Driven Safety)',
      subtitle: 'หัวใจของความปลอดภัย คือความใส่ใจที่มากกว่า',
      points: [
        'เจ้าของรถขับเองทุกรอบ ใส่ใจทุกชีวิตผู้โดยสารประหนึ่งครอบครัว',
        'ไม่ขับซิ่ง ไม่ประมาท ไม่เสี่ยงทางลัดอันตราย พักผ่อนเต็มที่ 100% ก่อนออกเดินทาง',
        'ชำนาญเส้นทางทั่วไทย ทั้งขึ้นเขาชัน ทางคดเคี้ยวภาคเหนือ และทางไกลข้ามภาค',
      ],
      highlight: true,
    },
    {
      icon: Bus,
      badge: 'ความสะดวกสบายระดับ VIP',
      title: 'รถทัวร์ 2 ชั้น VIP มาตรฐานสูง',
      subtitle: 'รองรับผู้โดยสารได้ 40 – 46 ที่นั่ง ปรับเลือกได้ตามขนาดกรุ๊ป',
      points: [
        'เบาะหนังนุ่มพิเศษ VIP ปรับเอนนอนได้สบาย ไม่เมื่อยล้าตลอดการเดินทาง',
        'ระบบแอร์เย็นฉ่ำทั่วถึงทั้งคัน ปรับแรงลมอิสระแยกแต่ละเบาะ',
        'โครงสร้างรถทัวร์มาตรฐานยุโรป ทรงตัวนุ่มนวล ระบบเบรก ABS/Retarder หน่วงความเร็วปลอดภัย',
      ],
      highlight: false,
    },
    {
      icon: MapPin,
      badge: 'ครอบคลุมทุกจุดหมาย',
      title: 'ฐานที่ตั้งภูเก็ต บริการทั่วไทย',
      subtitle: 'เชื่อมโยงภาคใต้ สู่ทุกภูมิภาคทั่วประเทศอย่างราบรื่น',
      points: [
        'รับ-ส่งสนามบินภูเก็ต โรงแรม ท่าเรือ และทุกจุดในเกาะภูเก็ต-พังงา-กระบี่',
        'จัดทริปนำเที่ยวทั่วประเทศ: เชียงใหม่ แม่ฮ่องสอน น่าน กทม. เขาใหญ่ พัทยา อีสาน',
        'พร้อมบริการจัดตารางเวลาการเดินทาง ให้คำปรึกษาจุดพักรถและเส้นทางฟรี',
      ],
      highlight: false,
    },
    {
      icon: Sparkles,
      badge: 'ครบทุกฟังก์ชัน',
      title: 'สิ่งอำนวยความสะดวกครบครัน',
      subtitle: 'ความบันเทิงและสุขอนามัยมาตรฐานพรีเมียมตลอดทริป',
      points: [
        'เครื่องเสียงระดับพรีเมียม คาราโอเกะเพลงใหม่ ไมค์ลอยไร้สาย และ Smart TV',
        'ช่องชาร์จ USB ทุกที่นั่ง ชาร์จมือถือได้ตลอดทาง ไม่พลาดทุกการติดต่อ',
        'ห้องน้ำสะอาดถูกสุขอนามัย ไร้กลิ่นรบกวน พร้อมประกันภัยผู้โดยสารคุ้มครองเต็มวงเงิน',
      ],
      highlight: false,
    },
  ];

  return (
    <section id="why-choose-us" className="py-20 sm:py-24 bg-slate-50 text-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-200 text-emerald-900 text-xs font-semibold mb-3">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>มาตรฐานความปลอดภัยสูงสุดที่คุณวางใจได้</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-emerald-950 tracking-tight">
            ทำไมลูกค้าถึงเลือก <span className="emerald-gradient-text block sm:inline mt-1 sm:mt-0">เมืองสองย่า ทรานสปอร์ต</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-4 leading-relaxed">
            เรามุ่งมั่นให้บริการเช่าเหมารถทัวร์ระดับ VIP ด้วยความจริงใจ รถสวย สะอาด คนขับสุภาพ 
            และจุดยืนสำคัญที่สุดคือ <strong className="text-emerald-800 font-bold">"เจ้าของขับเองทุกทริป"</strong> เพื่อมอบความปลอดภัยสูงสุดให้แก่ผู้โดยสารทุกท่าน
          </p>
        </div>

        {/* 4 Clean Luxury Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className={`rounded-3xl p-7 sm:p-8 transition-all duration-300 relative overflow-hidden group ${
                  card.highlight
                    ? 'bg-gradient-to-br from-emerald-900 via-emerald-850 to-emerald-950 text-white shadow-xl'
                    : 'bg-white border border-emerald-100 text-slate-800 hover:border-emerald-300 hover:shadow-clean-hover shadow-clean'
                }`}
              >
                <div className="flex items-start justify-between mb-5">
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform ${
                      card.highlight
                        ? 'bg-white/10 text-amber-300 border border-white/20'
                        : 'bg-emerald-50 text-emerald-800 border border-emerald-100'
                    }`}
                  >
                    <Icon className="w-7 h-7" />
                  </div>
                  <span
                    className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${
                      card.highlight
                        ? 'bg-amber-400/20 text-amber-300 border-amber-400/30'
                        : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                    }`}
                  >
                    {card.badge}
                  </span>
                </div>

                <h3
                  className={`text-xl sm:text-2xl font-bold font-heading mb-1 ${
                    card.highlight ? 'text-white' : 'text-emerald-950'
                  }`}
                >
                  {card.title}
                </h3>
                <p
                  className={`text-xs sm:text-sm font-medium mb-6 ${
                    card.highlight ? 'text-emerald-200' : 'text-slate-500'
                  }`}
                >
                  {card.subtitle}
                </p>

                <ul className="space-y-3">
                  {card.points.map((point) => (
                    <li
                      key={point}
                      className={`flex items-start gap-2.5 text-xs sm:text-sm leading-relaxed ${
                        card.highlight ? 'text-emerald-100' : 'text-slate-600'
                      }`}
                    >
                      <CheckCircle2
                        className={`w-4 h-4 shrink-0 mt-0.5 ${
                          card.highlight ? 'text-amber-300' : 'text-emerald-600'
                        }`}
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
