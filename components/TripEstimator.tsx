'use client';

import React, { useState } from 'react';
import {
  MapPin,
  Navigation,
  Clock,
  Coffee,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Compass,
} from 'lucide-react';

interface RoutePreset {
  id: string;
  name: string;
  destination: string;
  distanceKm: number;
  durationHours: string;
  recommendedDays: string;
  restStops: string[];
  highlights: string[];
  recommendedAmenities: string[];
  tag: string;
}

const PRESET_ROUTES: RoutePreset[] = [
  {
    id: 'krabi',
    name: 'กระบี่ (อ่าวนาง - คลองท่อม - สระมรกต)',
    destination: 'กระบี่ (อ่าวนาง / สระมรกต / วัดถ้ำเสือ)',
    distanceKm: 165,
    durationHours: '2.5 – 3 ชม.',
    recommendedDays: '1 – 2 วัน',
    restStops: ['จุดชมวิวสะพานสารสิน', 'จุดพักรถเขาต่อ', 'อ่าวลึก'],
    highlights: ['หาดอ่าวนาง', 'สระมรกต น้ำตกร้อน', 'วัดถ้ำเสือ', 'ลานปูดำ'],
    recommendedAmenities: ['คาราโอเกะไมค์ลอย', 'ชาร์จมือถือทุกเบาะ', 'แอร์เย็นฉ่ำ'],
    tag: 'ยอดนิยมอันดับ 1 ทริปสั้น',
  },
  {
    id: 'phangnga',
    name: 'พังงา (เสม็ดนางชี - เขาหลัก - ตะกั่วป่า)',
    destination: 'พังงา (เสม็ดนางชี / เขาหลัก / เมืองเก่าตะกั่วป่า)',
    distanceKm: 95,
    durationHours: '1.5 – 2 ชม.',
    recommendedDays: '1 – 2 วัน',
    restStops: ['จุดชมวิวเสม็ดนางชีคาเฟ่', 'สะพานไม้เขาปิหลาย', 'สวนสนท่านุ่น'],
    highlights: ['วิวอ่าวพังงา 180 องศา', 'หาดนางทองทรายดำ', 'ล่องแพคลองสังเน่ห์'],
    recommendedAmenities: ['จอ Smart TV', 'เบาะหนังนุ่ม VIP', 'คนขับชำนาญเส้นทาง'],
    tag: 'ใกล้ภูเก็ต เดินทางชิลล์',
  },
  {
    id: 'surat',
    name: 'สุราษฎร์ธานี (เขื่อนเชี่ยวหลาน - เขาสก - พระธาตุไชยา)',
    destination: 'สุราษฎร์ธานี (เขื่อนรัชชประภา / อุทยานเขาสก / วัดพระบรมธาตุไชยา)',
    distanceKm: 240,
    durationHours: '3.5 – 4 ชม.',
    recommendedDays: '2 – 3 วัน',
    restStops: ['จุดชมวิวเขาสก', 'ร้านกาแฟริมทางพนม', 'จุดพักรถกม. 42'],
    highlights: ['ล่องเรือกุ้ยหลินเมืองไทย', 'นอนแพกลางเขื่อน', 'ไหว้พระบรมธาตุไชยา'],
    recommendedAmenities: ['ไมค์ลอยคาราโอเกะ', 'ห้องสุขภัณฑ์สะอาด', 'WiFi ฟรี'],
    tag: 'ทริปกรุ๊ปสัมมนา & พักผ่อน',
  },
  {
    id: 'nakhon',
    name: 'นครศรีธรรมราช (วัดเจดีย์ไอ้ไข่ - คีรีวง - วัดพระมหาธาตุ)',
    destination: 'นครศรีธรรมราช (วัดเจดีย์ไอ้ไข่ / หมู่บ้านคีรีวง / วัดพระมหาธาตุวรมหาวิหาร)',
    distanceKm: 310,
    durationHours: '4.5 – 5 ชม.',
    recommendedDays: '2 – 3 วัน',
    restStops: ['ทับปุด (พังงา)', 'ทุ่งสง', 'ลานสกา จุดสูดโอโซน'],
    highlights: ['ขอพรไอ้ไข่วัดเจดีย์', 'สูดอากาศบริสุทธิ์คีรีวง', 'พระบรมธาตุเมืองคอน'],
    recommendedAmenities: ['เบาะปรับเอนนอน VIP', 'ช่องชาร์จ Type-C / USB', 'ฟรีน้ำดื่ม'],
    tag: 'สายบุญ & ท่องเที่ยวธรรมชาติ',
  },
  {
    id: 'hatyai',
    name: 'สงขลา - หาดใหญ่ (ตลาดกิมหยง - แหลมสมิหลา - ด่านนอก)',
    destination: 'สงขลา - หาดใหญ่ (ตลาดกิมหยง / แหลมสมิหลา / เขาคอหงส์)',
    distanceKm: 435,
    durationHours: '6 – 6.5 ชม.',
    recommendedDays: '2 – 3 วัน',
    restStops: ['จุดพักรถเขาพับผ้า (ตรัง-พัทลุง)', 'เขาเจียก พัทลุง'],
    highlights: ['ช้อปปิ้งของฝากกิมหยง', 'ถ่ายรูปนางเงือกสมิหลา', 'ติ่มซำหาดใหญ่'],
    recommendedAmenities: ['ระบบบันเทิงชุดใหญ่', 'เบาะนวดผ่อนคลาย', '2 พนักงานขับสลับ'],
    tag: 'ทริปช้อปปิ้ง & อาหารอร่อย',
  },
  {
    id: 'huahin',
    name: 'หัวหิน - ชะอำ - เพชรบุรี (ราชภักดิ์ - ตลาดโต้รุ่ง)',
    destination: 'ประจวบคีรีขันธ์ - เพชรบุรี (หัวหิน / ชะอำ / อุทยานราชภักดิ์)',
    distanceKm: 650,
    durationHours: '9 – 10 ชม.',
    recommendedDays: '3 – 4 วัน',
    restStops: ['จุดพักรถท่าแซะ ชุมพร', 'เขาโพธิ์ บางสะพาน', 'กุยบุรี'],
    highlights: ['อุทยานราชภักดิ์', 'ไหว้หลวงปู่ทวดวัดห้วยมงคล', 'ชายหาดหัวหิน'],
    recommendedAmenities: ['เก้าอี้นวด VIP', 'คาราโอเกะเพลงใหม่ล่าสุด', 'ช่วยจองโรงแรมฟรี'],
    tag: 'ทริปท่องเที่ยวทางไกลสุดหรู',
  },
  {
    id: 'bkk',
    name: 'กรุงเทพฯ - ปริมณฑล - อยุธยา (ศึกษาดูงาน & ไหว้พระ)',
    destination: 'กรุงเทพฯ / ปริมณฑล / พระนครศรีอยุธยา',
    distanceKm: 860,
    durationHours: '11 – 12 ชม.',
    recommendedDays: '3 – 5 วัน',
    restStops: ['จุดพักรถละแม ชุมพร', 'ท่าแซะ', 'วังมะนาว เพชรบุรี'],
    highlights: ['ศึกษาดูงานหน่วยงานราชการ', 'ไหว้พระ 9 วัดอยุธยา', 'ล่องเรือเจ้าพระยา'],
    recommendedAmenities: ['ห้องสุขภัณฑ์มาตรฐานสากล', 'คนขับคู่สลับ 100%', 'GPS ติดตาม'],
    tag: 'ยอดนิยมสำหรับหน่วยงานรัฐ & อบต.',
  },
  {
    id: 'chiangmai',
    name: 'เชียงใหม่ - ภาคเหนือ (ดอยอินทนนท์ - ม่อนแจ่ม - นิมมาน)',
    destination: 'เชียงใหม่ / ลำพูน / ลำปาง (ดอยอินทนนท์ / ม่อนแจ่ม)',
    distanceKm: 1520,
    durationHours: '20 ชม. (จัดแวะพักค้างคืน)',
    recommendedDays: '4 – 6 วัน',
    restStops: ['ชุมพร', 'เพชรบุรี', 'นครสวรรค์', 'ตาก', 'ลำปาง'],
    highlights: ['สัมผัสลมหนาวดอยอินทนนท์', 'ชมทะเลหมอกม่อนแจ่ม', 'ไหว้พระธาตุดอยสุเทพ'],
    recommendedAmenities: ['รถสภาพใหม่กริ๊บ', 'เบาะเอนนอนสบายตลอดคืน', 'ช่วยวางทริปฟรี'],
    tag: 'ทริปประทับใจประจำปีวิ่งทั่วไทย',
  },
];

export default function TripEstimator() {
  const [origin, setOrigin] = useState('ภูเก็ต (เมือง / ถลาง / ป่าตอง / สนามบิน)');
  const [selectedRouteId, setSelectedRouteId] = useState('krabi');
  const [passengerEstimate, setPassengerEstimate] = useState(40);

  const currentRoute =
    PRESET_ROUTES.find((r) => r.id === selectedRouteId) || PRESET_ROUTES[0];

  const handleApplyToQuote = () => {
    if (typeof window !== 'undefined') {
      const detail = {
        origin,
        destination: currentRoute.destination,
        notes: `วางแผนทริปด้วยเครื่องมือคำนวณ: ${currentRoute.name} (ประมาณการระยะทาง ${currentRoute.distanceKm} กม., ระยะเวลา ${currentRoute.durationHours}, แนะนำช่วงเวลา ${currentRoute.recommendedDays}, คณะประมาณ ${passengerEstimate} ท่าน)`,
      };
      window.dispatchEvent(
        new CustomEvent('trip-route-selected', { detail })
      );

      const quoteSection = document.getElementById('quote-section');
      if (quoteSection) {
        quoteSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section id="trip-planner" className="py-16 sm:py-20 bg-slate-100/70 border-y border-slate-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-950 text-xs font-bold mb-3 shadow-sm">
            <Compass className="w-4 h-4 text-emerald-700 animate-spin-slow" />
            <span>กิมมิกเครื่องมือคำนวณ • Smart Route & Trip Planner</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-emerald-950 tracking-tight">
            เครื่องคำนวณระยะทาง & <span className="emerald-gradient-text block sm:inline mt-1 sm:mt-0">ประมาณการเดินทาง VIP</span>
          </h2>
          <p className="text-slate-600 text-xs sm:text-base mt-2.5 leading-relaxed">
            ลองเลือกเส้นทางที่คณะของคุณสนใจ ระบบจะประเมินระยะทาง เวลาเดินทาง จุดพักรถ และแนะนำความจุรถที่คุ้มค่าที่สุดให้ทันที
          </p>
        </div>

        {/* Planner Card */}
        <div className="bg-white rounded-3xl border border-emerald-100 shadow-xl overflow-hidden">
          {/* Top Controls Row */}
          <div className="p-6 sm:p-8 bg-gradient-to-r from-emerald-950 via-emerald-900 to-slate-900 text-white">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
              {/* Origin */}
              <div className="md:col-span-4">
                <label className="block text-xs font-semibold text-emerald-200 mb-2 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-300" />
                  <span>จุดเริ่มต้นการเดินทาง (Pick-up Point)</span>
                </label>
                <select
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white text-xs sm:text-sm font-medium focus:outline-none focus:border-amber-400 backdrop-blur-md cursor-pointer"
                >
                  <option value="ภูเก็ต (เมือง / ถลาง / ป่าตอง / สนามบิน)" className="text-slate-900">
                    📍 ภูเก็ต (จุดนัดพบในเกาะภูเก็ตทุกจุด)
                  </option>
                  <option value="สนามบินนานาชาติภูเก็ต (HKT Airport)" className="text-slate-900">
                    ✈️ สนามบินนานาชาติภูเก็ต (HKT)
                  </option>
                  <option value="พังงา (โคกกลอย / ท้ายเหมือง / ตะกั่วป่า)" className="text-slate-900">
                    📍 พังงา
                  </option>
                  <option value="กระบี่ (อ่าวนาง / เมือง / สนามบิน)" className="text-slate-900">
                    📍 กระบี่
                  </option>
                  <option value="สุราษฎร์ธานี (เมือง / ท่าเรือ / สนามบิน)" className="text-slate-900">
                    📍 สุราษฎร์ธานี
                  </option>
                  <option value="กรุงเทพมหานคร และปริมณฑล" className="text-slate-900">
                    📍 กรุงเทพมหานคร (วิ่งลงใต้)
                  </option>
                </select>
              </div>

              {/* Destination Preset */}
              <div className="md:col-span-5">
                <label className="block text-xs font-semibold text-emerald-200 mb-2 flex items-center gap-1.5">
                  <Navigation className="w-3.5 h-3.5 text-amber-300" />
                  <span>เลือกปลายทางยอดนิยม (Destination)</span>
                </label>
                <select
                  value={selectedRouteId}
                  onChange={(e) => setSelectedRouteId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-emerald-800/80 border border-emerald-400/50 text-white text-xs sm:text-sm font-bold focus:outline-none focus:border-amber-400 backdrop-blur-md cursor-pointer"
                >
                  {PRESET_ROUTES.map((route) => (
                    <option key={route.id} value={route.id} className="text-slate-900">
                      {route.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Passengers Estimate */}
              <div className="md:col-span-3">
                <label className="block text-xs font-semibold text-emerald-200 mb-2 flex items-center gap-1.5">
                  <span className="text-amber-300">👥</span>
                  <span>จำนวนผู้โดยสารในคณะ</span>
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="20"
                    max="46"
                    step="1"
                    value={passengerEstimate}
                    onChange={(e) => setPassengerEstimate(parseInt(e.target.value, 10))}
                    className="w-full accent-amber-400 cursor-pointer"
                  />
                  <span className="font-extrabold text-amber-300 text-sm w-12 text-right">
                    {passengerEstimate} คน
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Results Showcase Body */}
          <div className="p-6 sm:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Metrics Stat Cards */}
              <div className="lg:col-span-7 space-y-6">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold border border-emerald-300">
                    🏷️ {currentRoute.tag}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    แนะนำขนาดรถ: <strong className="text-emerald-800">{passengerEstimate > 42 ? 'รถทัวร์ 2 ชั้น VIP 46 ที่นั่ง' : passengerEstimate > 35 ? 'รถทัวร์ 2 ชั้น VIP 44 ที่นั่ง' : 'รถทัวร์ VIP 40 ที่นั่ง'}</strong>
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-3 sm:gap-4">
                  <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100 text-center">
                    <div className="text-[11px] text-slate-500 font-semibold mb-1">ระยะทางโดยประมาณ</div>
                    <div className="text-2xl sm:text-3xl font-extrabold text-emerald-950 font-heading">
                      ~{currentRoute.distanceKm}
                    </div>
                    <div className="text-[10px] text-emerald-700 font-bold uppercase mt-0.5">กิโลเมตร (km)</div>
                  </div>

                  <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-center">
                    <div className="text-[11px] text-slate-500 font-semibold mb-1">เวลาเดินทางเฉลี่ย</div>
                    <div className="text-xl sm:text-2xl font-extrabold text-amber-950 font-heading">
                      {currentRoute.durationHours}
                    </div>
                    <div className="text-[10px] text-amber-700 font-bold uppercase mt-0.5">ปลอดภัย ไม่ซิ่ง</div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                    <div className="text-[11px] text-slate-500 font-semibold mb-1">ระยะเวลาทริปแนะนำ</div>
                    <div className="text-xl sm:text-2xl font-extrabold text-slate-900 font-heading">
                      {currentRoute.recommendedDays}
                    </div>
                    <div className="text-[10px] text-slate-600 font-bold uppercase mt-0.5">กำลังพอดี ไม่เหนื่อย</div>
                  </div>
                </div>

                {/* Route Highlights & Rest Stops */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-start gap-2.5 text-xs sm:text-sm">
                    <Coffee className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900">จุดพักรถ / จุดแวะทานกาแฟแนะนำ:</strong>{' '}
                      <span className="text-slate-600">
                        {currentRoute.restStops.join(' ➔ ')}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 text-xs sm:text-sm">
                    <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900">ไฮไลท์ประจำเส้นทางนี้:</strong>{' '}
                      <span className="text-slate-600">
                        {currentRoute.highlights.join(' • ')}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 text-xs sm:text-sm">
                    <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900">อุปกรณ์อำนวยความสะดวกที่จัดเตรียมให้:</strong>{' '}
                      <span className="text-slate-600">
                        {currentRoute.recommendedAmenities.join(' • ')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: CTA Box with instant application */}
              <div className="lg:col-span-5 bg-gradient-to-br from-emerald-50 via-white to-amber-50/40 p-6 rounded-2xl border border-emerald-200 shadow-sm flex flex-col justify-between h-full space-y-5">
                <div>
                  <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm mb-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>สรุปแผนการเดินทางที่คุณเลือก</span>
                  </div>
                  <div className="text-xs text-slate-600 space-y-1.5 leading-relaxed bg-white/80 p-3.5 rounded-xl border border-emerald-100">
                    <div>
                      <strong className="text-slate-800">จาก:</strong> {origin}
                    </div>
                    <div>
                      <strong className="text-slate-800">ไป:</strong> {currentRoute.destination}
                    </div>
                    <div>
                      <strong className="text-slate-800">ขนาดกรุ๊ป:</strong> {passengerEstimate} ท่าน (แนะนำรถ 2 ชั้น VIP)
                    </div>
                    <div className="text-[11px] text-emerald-700 font-medium pt-1">
                      ✨ พร้อมบริการช่วยวางแผนโปรแกรมทัวร์ & ติดต่อโรงแรมฟรี 100%
                    </div>
                  </div>
                </div>

                <div className="space-y-2.5">
                  <button
                    onClick={handleApplyToQuote}
                    className="w-full py-3.5 px-5 rounded-xl emerald-gradient-btn text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg active:scale-98 transition cursor-pointer"
                  >
                    <span>นำเส้นทางนี้ไปขอใบเสนอราคาเช่าเหมาคัน</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <p className="text-[11px] text-center text-slate-500">
                    ระบบจะส่งข้อมูลปลายทางนี้ไปกรอกในฟอร์มด้านล่างให้ท่านโดยอัตโนมัติ
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
