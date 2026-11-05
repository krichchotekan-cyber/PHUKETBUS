'use client';

import React from 'react';
import { PhoneCall, ShieldCheck, Armchair, Sparkles, MapPin, CheckCircle2, ChevronDown, Calendar, Gift, Hotel } from 'lucide-react';
import { trackFacebookEvent } from '@/lib/facebook';

interface HeroProps {
  onOpenPhoneModal: () => void;
  badge: string;
  slogan: string;
  subtitle: string;
  companyName: string;
}

export default function Hero({
  onOpenPhoneModal,
  badge,
  slogan,
  subtitle,
  companyName,
}: HeroProps) {
  const handlePhoneClick = () => {
    trackFacebookEvent('Contact', { action: 'hero_phone_cta' });
    onOpenPhoneModal();
  };

  return (
    <section className="relative min-h-[95vh] flex items-center justify-center pt-24 sm:pt-28 pb-16 overflow-hidden">
      {/* Real Bus Photo Background with Clean Emerald Gradient Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0 scale-105 transform"
        style={{
          backgroundImage: `url('/images/bus/bus-hero.jpg')`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-emerald-950/80 to-slate-950/90 z-0" />

      {/* Decorative Light Glow */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-gradient-to-b from-emerald-500/20 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        {/* Official Transparent PNG Brand Logo (No border, no shadow, no background box) */}
        <div className="mb-6 flex justify-center">
          <img
            src="/images/logo.png"
            alt="โลโก้ทางการ บจก. เมืองสองย่า ทรานสปอร์ต"
            className="h-20 sm:h-28 md:h-36 w-auto object-contain mx-auto"
          />
        </div>

        {/* Top Highlight Badge */}
        <div className="flex items-center justify-center mb-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 shadow-lg backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span className="text-xs sm:text-sm font-semibold text-white tracking-wide">
              {badge || 'บริการจากภูเก็ต วิ่งทัวร์ทั่วไทย • เจ้าของขับเองปลอดภัย 100%'}
            </span>
          </div>
        </div>

        {/* Main Headline & Slogan */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-heading text-white tracking-tight leading-[1.2] sm:leading-[1.15] mb-5">
          <span className="block text-white">รถบัสสองชั้นภูเก็ต VIP นำเที่ยวทั่วไทย</span>
          <span className="block text-amber-300 drop-shadow mt-2 sm:mt-3">
            "เมืองสองย่าทรานสปอร์ต ทริปไหน...ก็ไปได้"
          </span>
        </h1>

        {/* 3 Core Services Badge Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-6">
          <span className="px-4 py-2 rounded-xl bg-emerald-900/80 border border-emerald-500/50 text-white font-bold text-xs sm:text-sm shadow-sm backdrop-blur-sm">
            👍 เช่ารถบัส
          </span>
          <span className="px-4 py-2 rounded-xl bg-emerald-900/80 border border-emerald-500/50 text-white font-bold text-xs sm:text-sm shadow-sm backdrop-blur-sm">
            👍 เช่ารถทัวร์
          </span>
          <span className="px-4 py-2 rounded-xl bg-amber-400 text-slate-950 font-extrabold text-xs sm:text-sm shadow-md">
            👍 รถตู้ แค่ติดต่อเรา
          </span>
        </div>

        {/* Free Service Callout Badge */}
        <div className="inline-flex flex-wrap items-center justify-center gap-2 px-5 py-2 rounded-2xl bg-white/15 border border-white/20 text-white text-xs sm:text-sm font-semibold mb-6 shadow-md backdrop-blur-md">
          <Gift className="w-4 h-4 text-amber-300" />
          <span>บริการเสริมฟรี: วางแผนจัดทำโปรแกรมทัวร์ให้ฟรี</span>
          <span className="text-white/40">•</span>
          <span>ช่วยประสานงานจองโรงแรมที่พักฟรี 100% ไม่มีบวกเพิ่ม</span>
        </div>

        {/* Sub-headline & VIP Bus Feature Highlights */}
        <p className="max-w-3xl mx-auto text-sm sm:text-base text-slate-100 leading-relaxed font-normal mb-8 sm:mb-9 text-balance">
          {subtitle ||
            'บริการรถบัสปรับอากาศ 2 ชั้น VIP รถใหม่ สวย หรูหรา สะอาด แอร์เย็น เบาะหนัง นั่งสบาย ฟรี WiFi ตลอดการเดินทาง ชาร์จแบตเตอรี่ได้ทุกที่นั่ง เครื่องเสียง คาราโอเกะ ครบครันทั้งในและนอกรถ บริการน้ำดื่มและอาหารว่างระหว่างทาง คนขับรถมืออาชีพ ชำนาญทุกเส้นทางทั่วประเทศ เน้นความปลอดภัย ตรวจเช็คสภาพรถก่อนออกทุกการเดินทาง'}
        </p>

        <div className="text-xs sm:text-sm text-emerald-200 font-semibold mb-8 flex items-center justify-center gap-2">
          <span>🚍 เดินทางสะดวกสบาย ปลอดภัย มั่นใจทุกเส้นทางทั่วไทย</span>
          <span>•</span>
          <span>พร้อมให้บริการส่วนราชการ รัฐวิสาหกิจ บริษัทเอกชน และบุคคลทั่วไป</span>
        </div>

        {/* Dual Call-To-Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 mb-12">
          {/* Primary CTA Button */}
          <button
            onClick={handlePhoneClick}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-amber-400 hover:bg-amber-300 text-emerald-950 text-base font-extrabold flex items-center justify-center gap-3 shadow-xl active:scale-95 transition cursor-pointer"
          >
            <PhoneCall className="w-5 h-5 text-emerald-950" />
            <span>โทรสอบถาม / เช็คราคาเหมาคัน</span>
          </button>

          {/* Secondary CTA Button */}
          <a
            href="#calendar-section"
            className="w-full sm:w-auto px-7 py-4 rounded-full bg-white/15 hover:bg-white/25 text-white border-2 border-white/30 text-base font-semibold flex items-center justify-center gap-2.5 backdrop-blur-md transition shadow-lg active:scale-95"
          >
            <Calendar className="w-5 h-5 text-amber-300" />
            <span>เช็คปฏิทินวันว่าง & จองวัน</span>
          </a>
        </div>

        {/* Trust Badges / Quick Highlights */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto pt-6 border-t border-white/15 text-left">
          <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-sm">
            <CheckCircle2 className="w-5 h-5 text-amber-300 shrink-0" />
            <div className="text-xs">
              <div className="font-bold text-white">เช่าเหมาคัน VIP</div>
              <div className="text-slate-200">40, 44, 46 ที่นั่ง</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-sm">
            <CheckCircle2 className="w-5 h-5 text-amber-300 shrink-0" />
            <div className="text-xs">
              <div className="font-bold text-white">เจ้าของขับเอง 100%</div>
              <div className="text-slate-200">ชำนาญทาง ปลอดภัยสูง</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-sm">
            <CheckCircle2 className="w-5 h-5 text-amber-300 shrink-0" />
            <div className="text-xs">
              <div className="font-bold text-white">จัดทริป + จองโรงแรม</div>
              <div className="text-amber-300 font-bold">ฟรี ไม่มีบวกเพิ่ม</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-sm">
            <CheckCircle2 className="w-5 h-5 text-amber-300 shrink-0" />
            <div className="text-xs">
              <div className="font-bold text-white">บันเทิง & ห้องน้ำ</div>
              <div className="text-slate-200">คาราโอเกะ จอภาพ USB</div>
            </div>
          </div>
        </div>

        {/* Scroll down indicator */}
        <div className="mt-10 sm:mt-12 flex justify-center">
          <a
            href="#scroll-3d"
            aria-label="เลื่อนลงดูรถจริงรอบคัน"
            className="text-white/60 hover:text-white transition-colors animate-bounce"
          >
            <ChevronDown className="w-6 h-6" />
          </a>
        </div>
      </div>
    </section>
  );
}
