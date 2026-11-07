'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, CheckCircle2, Star, Users, PhoneCall, X, ShieldCheck } from 'lucide-react';

interface ActivityItem {
  id: number;
  icon: 'star' | 'bus' | 'quote' | 'phone' | 'shield';
  title: string;
  detail: string;
  timeAgo: string;
}

const ACTIVITIES: ActivityItem[] = [
  {
    id: 1,
    icon: 'bus',
    title: 'จองคิวรถสำเร็จ 1 คัน',
    detail: 'กรุ๊ปทัวร์บริษัท (ภูเก็ต ➔ สุราษฎร์ฯ) จองรถทัวร์ 2 ชั้น VIP 46 ที่นั่ง',
    timeAgo: '15 นาทีที่แล้ว',
  },
  {
    id: 2,
    icon: 'star',
    title: 'รีวิวความประทับใจ 5 ดาว',
    detail: '"รถใหม่สะอาดมาก คนขับสุภาพ ขับนิ่ม ปลอดภัยตลอดเส้นทางครับ"',
    timeAgo: '32 นาทีที่แล้ว',
  },
  {
    id: 3,
    icon: 'quote',
    title: 'มีผู้ขอใบเสนอราคาใหม่',
    detail: 'เส้นทางภูเก็ต - กระบี่ (สระมรกต-อ่าวนาง) คณะ 38 ท่าน',
    timeAgo: '45 นาทีที่แล้ว',
  },
  {
    id: 4,
    icon: 'shield',
    title: 'ตรวจเช็คความปลอดภัย 100%',
    detail: 'รถสองชั้น VIP ทะเบียน 30-2542 ภูเก็ต ผ่านการตรวจเช็คสภาพพร้อมออกเดินทาง',
    timeAgo: '1 ชั่วโมงที่แล้ว',
  },
  {
    id: 5,
    icon: 'phone',
    title: 'สอบถามคิววันหยุดยาว',
    detail: 'ทริปสัมมนาหน่วยงานราชการ สอบถามเส้นทางภูเก็ต-หัวหิน ผ่านสายด่วน',
    timeAgo: '2 ชั่วโมงที่แล้ว',
  },
];

export default function LiveActivityToast() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    // Initial delay before first toast appears (4 seconds)
    const initialTimer = setTimeout(() => {
      if (!isDismissed) {
        setIsVisible(true);
      }
    }, 4000);

    return () => clearTimeout(initialTimer);
  }, [isDismissed]);

  useEffect(() => {
    if (isDismissed || isPaused) return;

    // Toast visible for 8 seconds, hides for 5 seconds, then shows next
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % ACTIVITIES.length);
        setIsVisible(true);
      }, 800);
    }, 13000);

    return () => clearInterval(interval);
  }, [isDismissed, isPaused]);

  if (isDismissed) return null;

  const current = ACTIVITIES[currentIndex];

  const getIcon = () => {
    switch (current.icon) {
      case 'bus':
        return (
          <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
            <span className="text-base">🚌</span>
          </div>
        );
      case 'star':
        return (
          <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
            <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
          </div>
        );
      case 'phone':
        return (
          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
            <PhoneCall className="w-4 h-4 text-blue-600" />
          </div>
        );
      case 'shield':
        return (
          <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
          </div>
        );
      default:
        return (
          <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4 text-purple-600" />
          </div>
        );
    }
  };

  return (
    <div
      className={`fixed bottom-24 sm:bottom-6 left-4 z-40 max-w-[340px] sm:max-w-sm transition-all duration-500 ease-out pointer-events-auto ${
        isVisible
          ? 'translate-y-0 opacity-100 scale-100'
          : 'translate-y-6 opacity-0 scale-95 pointer-events-none'
      }`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="p-3.5 sm:p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-emerald-200/90 shadow-xl text-slate-800 flex items-start gap-3 relative">
        {/* Live Pulse Dot */}
        <span className="absolute top-2 left-2 flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>

        {getIcon()}

        <div className="flex-1 min-w-0 pr-4">
          <div className="flex items-center justify-between gap-2">
            <h5 className="text-xs font-bold text-emerald-950 truncate">
              {current.title}
            </h5>
            <span className="text-[10px] text-slate-400 whitespace-nowrap">
              {current.timeAgo}
            </span>
          </div>
          <p className="text-[11px] sm:text-xs text-slate-600 mt-0.5 leading-snug line-clamp-2">
            {current.detail}
          </p>
        </div>

        {/* Dismiss Button */}
        <button
          onClick={() => setIsDismissed(true)}
          className="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 transition absolute top-2 right-2 cursor-pointer"
          aria-label="ปิดการแจ้งเตือน"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
