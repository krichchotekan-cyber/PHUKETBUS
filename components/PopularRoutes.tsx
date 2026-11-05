'use client';

import React, { useState } from 'react';
import {
  MapPin,
  Navigation,
  Clock,
  ShieldCheck,
  ChevronRight,
  Calendar,
  Compass,
  ArrowRight,
  Users,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { trackFacebookEvent } from '@/lib/facebook';

export default function PopularRoutes() {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'เส้นทางทั้งหมด' },
    { id: 'north', label: 'ภาคเหนือ' },
    { id: 'central', label: 'กรุงเทพฯ & ภาคกลาง' },
    { id: 'east', label: 'ชลบุรี-พัทยา-เขาใหญ่' },
    { id: 'isan', label: 'ภาคอีสาน (แสวงบุญ)' },
    { id: 'local', label: 'อันดามัน & สนามบิน' },
  ];

  const routes = [
    {
      id: 'r1',
      category: 'north',
      categoryLabel: 'ท่องเที่ยวข้ามภาค',
      origin: 'ภูเก็ต',
      destination: 'เชียงใหม่ / เชียงราย / ภาคเหนือ',
      duration: '5 วัน 4 คืน หรือตามโปรแกรม',
      distance: 'ประมาณ 1,500 กม.',
      highlights: [
        'วัดพระธาตุดอยสุเทพราชวรวิหาร',
        'จุดชมวิวม่อนแจ่ม & ดอยอินทนนท์',
        'วัดร่องขุ่น & ไร่ชาฉุยฟง เชียงราย',
        'ถนนคนเดินท่าแพ & ตลาดวโรรส',
      ],
      description: 'เส้นทางขึ้นเขาชันที่ต้องใช้ความชำนาญสูง เจ้าของขับเอง ปลอดภัยทุกโค้ง ทุกยอดดอย พักผ่อนบนเบาะนอน VIP ถึงปลายทางสดชื่นพร้อมเที่ยว',
      popularFor: 'กรุ๊ปศึกษาดูงาน, คณะครู, องค์กรสัมมนาประจำปี',
    },
    {
      id: 'r2',
      category: 'central',
      categoryLabel: 'สัมมนา & ทัศนศึกษา',
      origin: 'ภูเก็ต',
      destination: 'กรุงเทพมหานคร / นครปฐม / อยุธยา',
      duration: '3 วัน 2 คืน / 4 วัน 3 คืน',
      distance: 'ประมาณ 860 กม.',
      highlights: [
        'พระบรมมหาราชวัง & วัดพระแก้ว',
        'ศูนย์ประชุมแห่งชาติสิริกิติ์ & อิมแพ็ค',
        'เมืองเก่าอุทยานประวัติศาสตร์อยุธยา',
        'องค์พระปฐมเจดีย์ นครปฐม',
      ],
      description: 'เดินทางนุ่มนวล รถทรงตัวนิ่งด้วยช่วงล่างถุงลมมาตรฐานยุโรป เดินทางช่วงค่ำเพื่อถึงกรุงเทพฯ ในช่วงเช้าพร้อมเริ่มงานได้ทันที',
      popularFor: 'หน่วยงานราชการ, บริษัทเอกชน, สถาบันการศึกษา',
    },
    {
      id: 'r3',
      category: 'east',
      categoryLabel: 'Outing พักผ่อนประจำปี',
      origin: 'ภูเก็ต',
      destination: 'ชลบุรี / พัทยา / เขาใหญ่ / กาญจนบุรี',
      duration: '4 วัน 3 คืน / 5 วัน 4 คืน',
      distance: 'ประมาณ 980 กม.',
      highlights: [
        'อุทยานแห่งชาติเขาใหญ่ & คาเฟ่ชื่อดัง',
        'หาดจอมเทียน & แหลมบาลีฮาย พัทยา',
        'สะพานข้ามแม่น้ำแคว กาญจนบุรี',
        'สวนนงนุช พัทยา & ตลาดน้ำ 4 ภาค',
      ],
      description: 'ระบบความบันเทิง แสง สี เสียง และคาราโอเกะไมค์ลอยระดับพรีเมียม สังสรรค์สนุกสนาน สร้างความสามัคคีให้ทีมงานตลอดเส้นทาง',
      popularFor: 'ทริปบริษัท Outing, สมาคม, ชมรมท่องเที่ยว',
    },
    {
      id: 'r4',
      category: 'isan',
      categoryLabel: 'แสวงบุญ & กฐิน-ผ้าป่า',
      origin: 'ภูเก็ต',
      destination: 'ภาคอีสาน (นครพนม, ขอนแก่น, อุดรธานี, อุบลฯ)',
      duration: '4 วัน 3 คืน / 5 วัน 4 คืน',
      distance: 'ประมาณ 1,350 กม.',
      highlights: [
        'วัดพระธาตุพนมวรมหาวิหาร',
        'วัดพระธาตุเชิงชุม สกลนคร',
        'วัดป่าภูก้อน & คำชะโนด อุดรธานี',
        'อุทยานแห่งชาติผาแต้ม อุบลราชธานี',
      ],
      description: 'เบาะกว้างขวาง นั่งสบาย เหมาะกับผู้สูงอายุและญาติโยม มีห้องน้ำสะอาดถูกสุขอนามัยบนรถ คนขับสุภาพ ช่วยดูแลสัมภาระทุกท่าน',
      popularFor: 'ทริปแสวงบุญ, งานกฐินสามัคคี, ผ้าป่าสายใต้สู่สายอีสาน',
    },
    {
      id: 'r5',
      category: 'local',
      categoryLabel: 'Transfer & Shuttle',
      origin: 'สนามบินภูเก็ต (HKT)',
      destination: 'โรงแรม / ท่าเรือ / ทุกจุดในเกาะภูเก็ต-พังงา-กระบี่',
      duration: 'รายเที่ยว หรือเหมารายวัน',
      distance: 'ทั่วเกาะภูเก็ต & จังหวัดใกล้เคียง',
      highlights: [
        'สนามบินนานาชาติภูเก็ต',
        'หาดป่าตอง, กะตะ, กะรน, ราไวย์',
        'ท่าเรือรัษฎา & ท่าเรืออ่าวปอ',
        'เขาหลัก พังงา & อ่าวนาง กระบี่',
      ],
      description: 'ตรงต่อเวลา พนักงานขับรถสุภาพ ช่วยยกสัมภาระขึ้นลง แอร์เย็นฉ่ำต้อนรับแขกคนสำคัญและผู้บริหารอย่างสมเกียรติ',
      popularFor: 'กรุ๊ปทัวร์, คณะประชุม MICE, งานอีเวนต์',
    },
    {
      id: 'r6',
      category: 'local',
      categoryLabel: 'ท่องเที่ยวอันดามัน',
      origin: 'ภูเก็ต',
      destination: 'ทัวร์รอบเกาะภูเก็ต / อ่าวพังงา / กระบี่',
      duration: '1 วัน หรือ 2 วัน 1 คืน',
      distance: 'เส้นทางท่องเที่ยวอันดามัน',
      highlights: [
        'แหลมพรหมเทพ ชมพระอาทิตย์ตกดิน',
        'วัดฉลอง (วัดไชยธาราราม)',
        'ย่านเมืองเก่าภูเก็ต สถาปัตยกรรมชิโนโปรตุกีส',
        'จุดชมวิวเสม็ดนางชี อ่าวพังงา',
      ],
      description: 'สัมผัสความงามของไข่มุกอันดามันกับคนขับท้องถิ่นภูเก็ตแท้ๆ ชำนาญทุกตรอกซอกซอย แนะนำร้านอาหารพื้นเมืองรสเด็ดได้ทุกจุด',
      popularFor: 'ครอบครัวใหญ่, ทัวร์กรุ๊ปพิเศษ, รับรองแขกบ้านแขกเมือง',
    },
  ];

  const filteredRoutes =
    activeCategory === 'all'
      ? routes
      : routes.filter((r) => r.category === activeCategory);

  return (
    <section id="routes" className="py-20 sm:py-24 bg-slate-50 text-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-900 text-xs font-semibold mb-3">
            <Compass className="w-3.5 h-3.5 text-emerald-700" />
            <span>เส้นทางยอดนิยม & บริการที่ลูกค้าเลือกใช้มากที่สุด</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-emerald-950 tracking-tight">
            บริการรถทัวร์ VIP <span className="emerald-gradient-text">จากภูเก็ต วิ่งทั่วไทย</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            ไม่ว่าปลายทางจะใกล้หรือไกล เหนือ ใต้ ออก ตก เราพร้อมพาคณะของคุณไปถึงจุดหมายด้วยความปลอดภัยและความสุขสูงสุด
          </p>
        </div>

        {/* Category Filter Pills (Clean White Theme) */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-emerald-800 text-white shadow-md'
                  : 'bg-white text-slate-700 border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Redesigned Clean Route Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredRoutes.map((route) => (
            <div
              key={route.id}
              className="bg-white rounded-3xl border border-emerald-100 p-6 sm:p-7 shadow-clean hover:shadow-clean-hover transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-600 via-emerald-700 to-emerald-900" />

              <div>
                {/* Badge & Duration */}
                <div className="flex items-center justify-between text-xs mb-4">
                  <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold">
                    {route.categoryLabel}
                  </span>
                  <span className="flex items-center gap-1.5 text-slate-500 font-medium">
                    <Clock className="w-3.5 h-3.5 text-emerald-700" />
                    <span>{route.duration}</span>
                  </span>
                </div>

                {/* Route Visual Pathway (Origin ➔ Destination) */}
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 mb-5">
                  <div className="flex items-center gap-2 text-xs">
                    <div className="flex items-center gap-1.5 font-bold text-slate-700 shrink-0">
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                      <span>{route.origin}</span>
                    </div>

                    <div className="flex-1 flex items-center justify-center px-1">
                      <div className="w-full border-t border-dashed border-emerald-400 relative">
                        <Navigation className="w-3.5 h-3.5 text-emerald-700 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-90" />
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 font-bold text-emerald-950 shrink-0 text-right">
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                      <span className="truncate max-w-[130px]">{route.destination.split('/')[0]}</span>
                    </div>
                  </div>
                </div>

                {/* Main Route Title */}
                <h3 className="text-lg font-bold font-heading text-emerald-950 group-hover:text-emerald-700 transition-colors mb-2">
                  {route.destination}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5">
                  {route.description}
                </p>

                {/* Highlights list */}
                <div className="space-y-2 mb-5 pt-4 border-t border-slate-100">
                  <span className="text-xs font-bold text-emerald-900 block uppercase tracking-wider">
                    จุดแวะพัก & สถานที่ท่องเที่ยวสำคัญ:
                  </span>
                  <ul className="space-y-1.5">
                    {route.highlights.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-xs text-slate-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="truncate">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom Actions & Suitable badge */}
              <div className="pt-4 border-t border-slate-100 space-y-3">
                <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                  <span>เหมาะสำหรับ: <strong className="text-slate-700">{route.popularFor}</strong></span>
                </div>

                <a
                  href="#quote-section"
                  onClick={() => {
                    trackFacebookEvent('Contact', { action: 'select_route_quote', route: route.destination });
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-emerald-50 hover:bg-emerald-800 text-emerald-800 hover:text-white font-bold text-xs flex items-center justify-between transition-colors border border-emerald-200 hover:border-emerald-800"
                >
                  <span>ขอใบเสนอราคาเส้นทางนี้</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
