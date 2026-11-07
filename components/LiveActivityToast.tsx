'use client';

import React, { useState, useEffect } from 'react';
import { CheckCircle2, X } from 'lucide-react';

interface BookingSuccessData {
  customerName: string;
  destination: string;
  passengerCount: number;
  timeText?: string;
}

export default function LiveActivityToast() {
  const [bookingData, setBookingData] = useState<BookingSuccessData | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleBookingCompleted = (e: any) => {
      if (e.detail) {
        setBookingData(e.detail);
        setIsVisible(true);

        // Auto-hide after 8 seconds
        const timer = setTimeout(() => {
          setIsVisible(false);
          setTimeout(() => setBookingData(null), 500);
        }, 8000);

        return () => clearTimeout(timer);
      }
    };

    window.addEventListener('booking-completed', handleBookingCompleted);
    return () => window.removeEventListener('booking-completed', handleBookingCompleted);
  }, []);

  if (!bookingData) return null;

  return (
    <div
      className={`fixed bottom-24 sm:bottom-6 left-4 z-40 max-w-[340px] sm:max-w-sm transition-all duration-500 ease-out pointer-events-auto ${
        isVisible
          ? 'translate-y-0 opacity-100 scale-100'
          : 'translate-y-6 opacity-0 scale-95 pointer-events-none'
      }`}
    >
      <div className="p-3.5 sm:p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-emerald-300 shadow-2xl text-slate-800 flex items-start gap-3 relative">
        {/* Pulse Dot */}
        <span className="absolute top-2 left-2 flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>

        <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
        </div>

        <div className="flex-1 min-w-0 pr-4">
          <div className="flex items-center justify-between gap-2">
            <h5 className="text-xs font-bold text-emerald-950 truncate">
              ส่งคำขอจองคิวรถสำเร็จ!
            </h5>
            <span className="text-[10px] text-emerald-700 font-semibold whitespace-nowrap">
              เมื่อสักครู่
            </span>
          </div>
          <p className="text-[11px] sm:text-xs text-slate-600 mt-1 leading-snug">
            คุณ{bookingData.customerName} ได้ส่งข้อมูลทริป {bookingData.destination || 'นำเที่ยวทั่วไทย'} ({bookingData.passengerCount} ท่าน) เรียบร้อยแล้ว ทีมงานกำลังตรวจเช็คคิวรถให้ครับ
          </p>
        </div>

        {/* Close button */}
        <button
          onClick={() => {
            setIsVisible(false);
            setTimeout(() => setBookingData(null), 300);
          }}
          className="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 transition absolute top-2 right-2 cursor-pointer"
          aria-label="ปิดการแจ้งเตือน"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
