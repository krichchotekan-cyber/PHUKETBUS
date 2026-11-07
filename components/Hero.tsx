'use client';

import React from 'react';
import { PhoneCall, ShieldCheck, Armchair, Sparkles, MapPin, CheckCircle2, ChevronDown, Calendar, Gift } from 'lucide-react';
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
    <section className="relative min-h-[92vh] flex items-center justify-center pt-24 sm:pt-28 pb-14 overflow-hidden">
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
        {/* Official Transparent PNG Brand Logo */}
        <div className="mb-4 sm:mb-5 flex justify-center">
          <img
            src="/images/logo.png"
            alt="โลโก้ทางการ บจก. เมืองสองย่า ทรานสปอร์ต"
            className="h-16 sm:h-20 md:h-24 w-auto object-contain mx-auto drop-shadow-md"
          />
        </div>

        {/* Top Highlight Badge */}
        <div className="flex items-center justify-center mb-3 sm:mb-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/70 border border-emerald-400/40 text-emerald-200 text-xs sm:text-sm font-medium backdrop-blur-md shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0" />
            <span>{badge || 'รถบัสสองชั้นภูเก็ต VIP นำเที่ยวทั่วไทย • เมืองสองย่าทรานสปอร์ต'}</span>
          </div>
        </div>

        {/* Main Headline & Slogan - Protected Against Thai Word-Break Orphans */}
        <h1 className="font-heading font-extrabold text-white text-2xl sm:text-4xl md:text-5xl lg:text-[54px] leading-tight sm:leading-snug mb-4 tracking-normal">
          <span className="block drop-shadow-md">
            รถบัสสองชั้นภูเก็ต VIP <span className="text-emerald-300">นำเที่ยวทั่วไทย</span>
          </span>
          <span className="block text-amber-300 drop-shadow-lg text-xl sm:text-3xl md:text-4xl lg:text-[42px] font-bold mt-2 sm:mt-2.5">
            <span className="inline-block whitespace-nowrap">"เมืองสองย่าทรานสปอร์ต</span>{' '}
            <span className="inline-block whitespace-nowrap">ทริปไหน...ก็ไปได้"</span>
          </span>
        </h1>

        {/* 3 Core Services Badge Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-5">
          <span className="px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-white font-semibold text-xs sm:text-sm shadow-sm backdrop-blur-sm flex items-center gap-1.5">
            <span className="text-amber-300">👍</span> เช่ารถบัส VIP (40-46 ที่นั่ง)
          </span>
          <span className="px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-white font-semibold text-xs sm:text-sm shadow-sm backdrop-blur-sm flex items-center gap-1.5">
            <span className="text-amber-300">👍</span> เช่ารถทัวร์นำเที่ยวทั่วประเทศ
          </span>
          <span className="px-3.5 py-1.5 rounded-full bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm shadow-md flex items-center gap-1.5">
            <span>👍</span> รถตู้ VIP แค่ติดต่อเรา
          </span>
        </div>

        {/* VIP Key Features Highlight Grid (Easy to scan, readable Thai chips) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 max-w-4xl mx-auto mb-4 text-xs sm:text-sm text-slate-100 font-medium">
          <div className="p-2.5 rounded-xl bg-white/10 border border-white/10 backdrop-blur-sm flex items-center justify-center gap-1.5 text-center">
            <span>✨</span> รถใหม่ แอร์เย็น สะอาด
          </div>
          <div className="p-2.5 rounded-xl bg-white/10 border border-white/10 backdrop-blur-sm flex items-center justify-center gap-1.5 text-center">
            <span>💺</span> เบาะหนัง VIP ชาร์จแบตได้
          </div>
          <div className="p-2.5 rounded-xl bg-white/10 border border-white/10 backdrop-blur-sm flex items-center justify-center gap-1.5 text-center">
            <span>🎤</span> เครื่องเสียง คาราโอเกะ
          </div>
          <div className="p-2.5 rounded-xl bg-white/10 border border-white/10 backdrop-blur-sm flex items-center justify-center gap-1.5 text-center">
            <span>🛡️</span> คนขับมืออาชีพ ชำนาญทาง
          </div>
          <div className="p-2.5 rounded-xl bg-white/10 border border-white/10 backdrop-blur-sm flex items-center justify-center gap-1.5 text-center col-span-2 sm:col-span-1">
            <span>📶</span> ฟรี WiFi + น้ำดื่มของว่าง
          </div>
        </div>

        {/* Free Service Callout Badge */}
        <div className="inline-flex flex-wrap items-center justify-center gap-2 px-4 py-2 rounded-xl bg-emerald-950/80 border border-emerald-400/40 text-emerald-200 text-xs sm:text-sm font-semibold mb-4 backdrop-blur-md shadow-sm">
          <Gift className="w-4 h-4 text-amber-300 shrink-0" />
          <span><strong>บริการเสริมฟรี:</strong> วางแผนจัดโปรแกรมทัวร์ให้ฟรี</span>
          <span className="text-white/40">•</span>
          <span>ช่วยประสานงานจองโรงแรมที่พักฟรี 100% ไม่มีบวกเพิ่ม</span>
        </div>

        {/* Customer Segment Sub-line */}
        <p className="text-xs sm:text-sm text-slate-200 font-normal mb-7">
          🚍 เดินทางสะดวกสบาย ปลอดภัย มั่นใจทุกเส้นทาง • พร้อมให้บริการส่วนราชการ รัฐวิสาหกิจ บริษัทเอกชน และบุคคลทั่วไป
        </p>

        {/* Dual Call-To-Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-9">
          {/* Primary CTA Button */}
          <button
            onClick={handlePhoneClick}
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 text-sm sm:text-base font-extrabold flex items-center justify-center gap-2.5 shadow-xl hover:scale-105 active:scale-95 transition cursor-pointer"
          >
            <PhoneCall className="w-4 h-4 text-slate-950" />
            <span>โทรสายด่วน 096-463-8443 / 081-059-6350</span>
          </button>

          {/* Secondary CTA Button */}
          <a
            href="#calendar-section"
            className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white/15 hover:bg-white/25 text-white border border-white/30 text-sm sm:text-base font-semibold flex items-center justify-center gap-2 backdrop-blur-md transition shadow-md active:scale-95"
          >
            <Calendar className="w-4 h-4 text-amber-300" />
            <span>เช็คปฏิทินวันว่าง & จองวัน</span>
          </a>
        </div>

        {/* Trust Badges / Quick Highlights */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3 max-w-4xl mx-auto pt-5 border-t border-white/15 text-left">
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/10 border border-white/10 backdrop-blur-sm">
            <CheckCircle2 className="w-4 h-4 text-amber-300 shrink-0" />
            <div className="text-xs">
              <div className="font-bold text-white">เช่าเหมาคัน VIP</div>
              <div className="text-slate-200">40, 44, 46 ที่นั่ง</div>
            </div>
          </div>

          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/10 border border-white/10 backdrop-blur-sm">
            <CheckCircle2 className="w-4 h-4 text-amber-300 shrink-0" />
            <div className="text-xs">
              <div className="font-bold text-white">เจ้าของขับเอง 100%</div>
              <div className="text-slate-200">ชำนาญทาง ปลอดภัยสูง</div>
            </div>
          </div>

          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/10 border border-white/10 backdrop-blur-sm">
            <CheckCircle2 className="w-4 h-4 text-amber-300 shrink-0" />
            <div className="text-xs">
              <div className="font-bold text-white">จัดทริป + จองโรงแรม</div>
              <div className="text-amber-300 font-bold">ฟรี ไม่มีบวกเพิ่ม</div>
            </div>
          </div>

          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/10 border border-white/10 backdrop-blur-sm">
            <CheckCircle2 className="w-4 h-4 text-amber-300 shrink-0" />
            <div className="text-xs">
              <div className="font-bold text-white">บันเทิง & ห้องน้ำ</div>
              <div className="text-slate-200">คาราโอเกะ จอภาพ USB</div>
            </div>
          </div>
        </div>

        {/* Scroll down indicator */}
        <div className="mt-8 sm:mt-10 flex justify-center">
          <a
            href="#scroll-3d"
            aria-label="เลื่อนลงดูรถจริงรอบคัน"
            className="text-white/60 hover:text-white transition-colors animate-bounce"
          >
            <ChevronDown className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
}
