'use client';

import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Clock,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { CalendarEvent } from '@/lib/db';

interface BookingCalendarPickerProps {
  events?: CalendarEvent[];
  onSelectDateRange?: (startDate: string, endDate: string, durationText: string) => void;
}

export default function BookingCalendarPicker({
  events = [],
  onSelectDateRange,
}: BookingCalendarPickerProps) {
  // Current view date (year & month)
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState<number>(today.getMonth());
  const [currentYear, setCurrentYear] = useState<number>(today.getFullYear());

  // Selected range
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);

  // Month navigation
  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const monthNamesThai = [
    'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
    'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม',
  ];

  const formatDateString = (year: number, month: number, day: number) => {
    const m = String(month + 1).padStart(2, '0');
    const d = String(day).padStart(2, '0');
    return `${year}-${m}-${d}`;
  };

  const getDateStatus = (dateStr: string) => {
    for (const evt of events) {
      if (dateStr >= evt.startDate && dateStr <= evt.endDate) {
        return evt;
      }
    }
    return null;
  };

  const handleDateClick = (dateStr: string) => {
    const status = getDateStatus(dateStr);
    if (status) return;

    if (!startDate || (startDate && endDate)) {
      setStartDate(dateStr);
      setEndDate(null);
    } else if (startDate && !endDate) {
      if (dateStr < startDate) {
        setStartDate(dateStr);
        setEndDate(null);
      } else {
        let hasConflict = false;
        const cur = new Date(startDate);
        const end = new Date(dateStr);
        while (cur <= end) {
          const checkStr = cur.toISOString().split('T')[0];
          if (getDateStatus(checkStr)) {
            hasConflict = true;
            break;
          }
          cur.setDate(cur.getDate() + 1);
        }

        if (hasConflict) {
          alert('ช่วงวันที่เลือกมีบางวันที่ติดคิวจองแล้ว กรุณาเลือกช่วงเวลาใหม่ครับ');
          setStartDate(dateStr);
          setEndDate(null);
        } else {
          setEndDate(dateStr);
        }
      }
    }
  };

  const calculateDuration = () => {
    if (!startDate) return null;
    if (!endDate) {
      return { days: 1, nights: 0, text: 'ทริป 1 วัน (ไป-กลับ)' };
    }
    const d1 = new Date(startDate);
    const d2 = new Date(endDate);
    const diffTime = Math.abs(d2.getTime() - d1.getTime());
    const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    const nights = days - 1;
    return {
      days,
      nights,
      text: `${days} วัน ${nights} คืน`,
    };
  };

  const durationInfo = calculateDuration();

  const handleConfirmRange = () => {
    if (!startDate) return;
    const end = endDate || startDate;
    const durText = durationInfo?.text || '1 วัน';
    if (onSelectDateRange) {
      onSelectDateRange(startDate, end, durText);
    }
    const quoteEl = document.getElementById('quote-section');
    if (quoteEl) {
      quoteEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-emerald-100 p-6 sm:p-8 shadow-clean relative overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold mb-2">
            <CalendarIcon className="w-3.5 h-3.5 text-emerald-600" />
            <span>ปฏิทินตรวจเช็คคิวรถว่าง & จองวันเดินทาง</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-heading text-emerald-950">
            เลือกช่วงวันเดินทางของคุณ
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            คลิกเลือกวันเริ่มต้นและวันเดินทางกลับ เพื่อล็อคคิวรถทัวร์ VIP เหมาคัน
          </p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-emerald-50 border border-emerald-500" />
            <span>รถว่างพร้อมบริการ</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-rose-50 border border-rose-400" />
            <span>ติดคิวจองแล้ว</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-emerald-700 border border-emerald-800" />
            <span>ช่วงวันที่คุณเลือก</span>
          </div>
        </div>
      </div>

      {/* Calendar Month Header & Switcher */}
      <div className="flex items-center justify-between py-5">
        <button
          onClick={prevMonth}
          className="p-2 rounded-xl bg-slate-50 border border-slate-200 hover:border-emerald-500 text-slate-700 hover:text-emerald-800 transition"
          aria-label="เดือนก่อนหน้า"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="text-center">
          <span className="text-lg sm:text-xl font-extrabold text-emerald-950 font-heading">
            {monthNamesThai[currentMonth]} {currentYear + 543}
          </span>
          <span className="text-xs text-slate-400 block font-medium">
            (พุทธศักราช {currentYear + 543})
          </span>
        </div>

        <button
          onClick={nextMonth}
          className="p-2 rounded-xl bg-slate-50 border border-slate-200 hover:border-emerald-500 text-slate-700 hover:text-emerald-800 transition"
          aria-label="เดือนถัดไป"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Weekday Names */}
      <div className="grid grid-cols-7 gap-1.5 sm:gap-2 text-center text-xs font-bold text-slate-500 mb-2">
        <span className="text-rose-500">อา.</span>
        <span>จ.</span>
        <span>อ.</span>
        <span>พ.</span>
        <span>พฤ.</span>
        <span>ศ.</span>
        <span className="text-emerald-700">ส.</span>
      </div>

      {/* Month Days Grid */}
      <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
        {Array.from({ length: firstDayOfMonth }).map((_, i) => (
          <div key={`empty-${i}`} className="aspect-square rounded-xl" />
        ))}

        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const dateStr = formatDateString(currentYear, currentMonth, day);
          const eventStatus = getDateStatus(dateStr);
          const isBooked = !!eventStatus;

          const isSelectedStart = startDate === dateStr;
          const isSelectedEnd = endDate === dateStr;
          const isInRange =
            startDate &&
            endDate &&
            dateStr >= startDate &&
            dateStr <= endDate;

          return (
            <button
              key={day}
              onClick={() => handleDateClick(dateStr)}
              disabled={isBooked}
              title={
                isBooked
                  ? `ติดคิวงาน: ${eventStatus?.title}`
                  : `วันที่ ${day} ว่างพร้อมรับงาน (คลิกเพื่อเลือก)`
              }
              className={`aspect-square rounded-xl flex flex-col items-center justify-center p-1 relative text-xs sm:text-sm font-bold transition-all duration-150 ${
                isBooked
                  ? 'bg-rose-50/70 text-rose-400 border border-rose-200 cursor-not-allowed line-through'
                  : isSelectedStart || isSelectedEnd
                  ? 'bg-emerald-800 text-white font-extrabold shadow-md scale-105 z-10'
                  : isInRange
                  ? 'bg-emerald-100 text-emerald-950 font-bold border border-emerald-300'
                  : 'bg-slate-50/80 hover:bg-emerald-50 text-slate-700 hover:text-emerald-900 border border-slate-200/80 hover:border-emerald-300'
              }`}
            >
              <span>{day}</span>
              {isBooked ? (
                <span className="text-[9px] text-rose-500 leading-none mt-0.5 scale-90">
                  จองแล้ว
                </span>
              ) : isSelectedStart || isSelectedEnd ? (
                <span className="text-[9px] text-emerald-100 font-medium leading-none mt-0.5">
                  {isSelectedStart ? 'วันแรก' : 'วันกลับ'}
                </span>
              ) : (
                <span className="text-[9px] text-emerald-600 leading-none mt-0.5 scale-90">
                  ว่าง
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Selected Range Summary & Confirmation Bar */}
      <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          {startDate ? (
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-200">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-slate-500 font-medium">ช่วงเวลาที่คุณเลือก:</div>
                <div className="text-sm sm:text-base font-bold text-emerald-950 flex items-center gap-2">
                  <span>
                    {startDate} {endDate ? `ถึง ${endDate}` : '(เลือกวันกลับต่อได้)'}
                  </span>
                  {durationInfo && (
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold border border-emerald-200">
                      {durationInfo.text}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-xs text-slate-500 flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>ยังไม่ได้เลือกวันเดินทาง — กรุณาคลิกเลือกวันเริ่มต้นบนปฏิทิน</span>
            </div>
          )}
        </div>

        {startDate && (
          <button
            onClick={handleConfirmRange}
            className="w-full sm:w-auto px-6 py-3 rounded-xl emerald-gradient-btn text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow active:scale-95 transition cursor-pointer"
          >
            <span>นำวันที่นี้ไปขอใบเสนอราคา</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
