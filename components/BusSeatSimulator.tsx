'use client';

import React, { useState } from 'react';
import {
  Layers,
  Users,
  Info,
  Tv,
  ArrowUpRight,
  Sparkles,
  ShieldCheck,
  Bath,
  Luggage,
  Compass,
} from 'lucide-react';

interface BusSeatSimulatorProps {
  onSelectSeatMode?: (modeText: string, modeNumber: number) => void;
  supportedModes?: number[];
  defaultMode?: number;
}

export default function BusSeatSimulator({
  onSelectSeatMode,
  supportedModes = [40, 44, 46],
  defaultMode = 46,
}: BusSeatSimulatorProps) {
  const [activeDeck, setActiveDeck] = useState<1 | 2>(2);
  const [seatMode, setSeatMode] = useState<number>(defaultMode);

  // Layout calculations (Purely informative diagram for whole coach charter)
  // Mode 40: Upper 32 seats (8 rows) + Lower 8 seats (2 rows) = 40 seats
  // Mode 44: Upper 36 seats (9 rows) + Lower 8 seats (2 rows) = 44 seats
  // Mode 46: Upper 38 seats (9 rows + 2 rear) + Lower 8 seats (2 rows) = 46 seats
  let upperRowCount = 8;
  if (seatMode === 44) upperRowCount = 9;
  if (seatMode === 46) upperRowCount = 10;

  const upperSeatsCount = seatMode === 40 ? 32 : seatMode === 44 ? 36 : 38;
  const lowerSeatsCount = 8;

  const handleApplyCharter = () => {
    if (onSelectSeatMode) {
      onSelectSeatMode(`เช่าเหมาคันรุ่น ${seatMode} ที่นั่ง VIP`, seatMode);
    }
    const quoteEl = document.getElementById('quote-section');
    if (quoteEl) {
      quoteEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="seat-layout" className="py-20 sm:py-24 bg-slate-50 text-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-900 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
            <span>ผังที่นั่งประจำรถสำหรับการเช่าเหมาคัน (Whole Coach Charter Layout)</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-emerald-950 tracking-tight">
            ผังที่นั่งรถทัวร์ 2 ชั้น VIP <span className="emerald-gradient-text block sm:inline mt-1 sm:mt-0">40 – 46 ที่นั่ง</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            แสดงโครงสร้างผังที่นั่งจริงของรถแต่ละรุ่น สำหรับหัวหน้าทัวร์และผู้จัดงานใช้ตรวจดูสัดส่วนและจัดสรรที่นั่งให้สมาชิกในคณะ
          </p>
        </div>

        {/* CLARIFICATION ALERT (Charter only, no seat-by-seat ticket booking) */}
        <div className="max-w-4xl mx-auto mb-10 p-5 rounded-2xl bg-white border border-emerald-200 shadow-sm flex items-start gap-3.5">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-100 mt-0.5">
            <Info className="w-5 h-5" />
          </div>
          <div className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            <strong className="text-emerald-950 block text-sm sm:text-base font-bold mb-1">
              บริการเช่าเหมาคันทั้งคัน (Whole Coach Charter)
            </strong>
            ผังที่นั่งนี้มีไว้เพื่อให้ผู้จัดงานได้เห็นภาพรวมการจัดวางเบาะของรถแต่ละรุ่น (40, 44, หรือ 46 ที่นั่ง) 
            ทางเราให้บริการแบบ <strong className="text-emerald-900 font-semibold">เช่าเหมาทั้งคัน</strong> โดยไม่มีการขายตั๋วแยกรายที่นั่ง 
            ท่านสามารถเลือกรุ่นขนาดความจุที่ต้องการเพื่อนำไปขอใบเสนอราคาได้ทันทีครับ
          </div>
        </div>

        {/* Controls: Deck Switcher & Capacity Selector */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-emerald-100 mb-8 shadow-sm">
          {/* Deck Switcher Tabs - Single line without wrapping */}
          <div className="flex items-center overflow-x-auto no-scrollbar max-w-full bg-slate-100 p-1.5 rounded-xl border border-slate-200 w-full md:w-auto">
            <button
              onClick={() => setActiveDeck(2)}
              className={`flex-1 md:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                activeDeck === 2
                  ? 'bg-emerald-800 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
              <span>ชั้น 2 (Upper Deck - โซนที่นั่ง VIP {upperSeatsCount} ที่นั่ง)</span>
            </button>

            <button
              onClick={() => setActiveDeck(1)}
              className={`flex-1 md:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                activeDeck === 1
                  ? 'bg-emerald-800 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
              <span>ชั้น 1 (Lower Deck - โซนรับรอง &amp; ห้องน้ำ {lowerSeatsCount} ที่นั่ง)</span>
            </button>
          </div>

          {/* Seat Mode Switcher */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <span className="text-xs text-slate-500 font-medium flex items-center gap-1.5 hidden sm:flex">
              <Users className="w-3.5 h-3.5 text-emerald-700" />
              <span>เลือกรุ่นผังเหมาคัน:</span>
            </span>
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 w-full sm:w-auto">
              {[40, 44, 46].map((mode) => (
                <button
                  key={mode}
                  onClick={() => setSeatMode(mode)}
                  className={`flex-1 sm:flex-initial px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    seatMode === mode
                      ? 'bg-emerald-800 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  รุ่น {mode} ที่นั่ง
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Coach Simulator Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Visual Layout (Coach Chassis) */}
          <div className="lg:col-span-8 bg-white rounded-3xl border border-emerald-100 p-5 sm:p-8 shadow-clean relative overflow-hidden">
            {/* Front of bus indicator */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-900">
                  {activeDeck === 2
                    ? `ชั้น 2: โซนวิวพาโนรามา (${upperSeatsCount} ที่นั่ง VIP)`
                    : `ชั้น 1: โซนห้องรับรอง VIP + คนขับ + ห้องน้ำ (${lowerSeatsCount} ที่นั่ง)`}
                </span>
              </div>
              <div className="text-xs text-slate-500 flex items-center gap-1.5">
                <span>รุ่นรถ:</span>
                <span className="text-emerald-800 font-bold">เช่าเหมาคัน {seatMode} ที่นั่ง VIP</span>
              </div>
            </div>

            {/* Coach Interior Canvas */}
            <div className="relative mx-auto max-w-xl bg-slate-50 rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-inner">
              {/* Front Windshield Curved Glass / Front Nose */}
              <div className="w-full py-2.5 px-4 rounded-xl bg-emerald-900 text-center text-xs font-semibold text-white mb-5 flex items-center justify-center gap-2 shadow-sm">
                <Compass className="w-4 h-4 text-emerald-300" />
                <span>ด้านหน้ารถ (Front Windshield) - มุ่งหน้าสู่จุดหมาย</span>
              </div>

              {/* Upper Deck (Deck 2) Layout */}
              {activeDeck === 2 && (
                <div>
                  <div className="grid grid-cols-4 gap-2 mb-4 p-2.5 rounded-xl bg-white border border-slate-200 text-center text-[11px] text-slate-600">
                    <div className="flex items-center justify-center gap-1 text-emerald-900 font-semibold col-span-2">
                      <Tv className="w-3.5 h-3.5 text-emerald-700" />
                      <span>จอ Smart TV 43" ด้านหน้า</span>
                    </div>
                    <div className="flex items-center justify-center gap-1 text-slate-600 col-span-2">
                      <ArrowUpRight className="w-3.5 h-3.5 rotate-90 text-emerald-700" />
                      <span>บันไดขึ้น-ลงหน้ารถ</span>
                    </div>
                  </div>

                  {/* Single Continuous Central Walkway & Seat Grid */}
                  <div className="relative bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 overflow-hidden">
                    {/* Top Aisle Header Indicator (Clean left and right without overlapping center pill) */}
                    <div className="flex items-center justify-between text-[11px] text-slate-500 mb-5 px-3 pb-2.5 border-b border-slate-100 font-semibold">
                      <span>ฝั่งซ้าย (ริมหน้าต่าง A / ทางเดิน B)</span>
                      <span>ฝั่งขวา (ทางเดิน C / ริมหน้าต่าง D)</span>
                    </div>

                    {/* Single continuous vertical walkway corridor (แนวตั้งยาว) with vertical text "ทางเดินกลาง" */}
                    <div className="absolute top-14 bottom-6 left-1/2 -translate-x-1/2 w-8 sm:w-10 border-x border-dashed border-emerald-300/60 bg-emerald-50/20 rounded flex flex-col items-center justify-center pointer-events-none z-0">
                      <div className="flex flex-col items-center justify-center gap-1 text-[10px] sm:text-[11px] font-extrabold text-emerald-850 select-none bg-white/95 px-1 py-3 rounded-full border border-emerald-300/80 shadow-xs">
                        <span>ท</span>
                        <span>า</span>
                        <span>ง</span>
                        <span>เ</span>
                        <span>ดิ</span>
                        <span>น</span>
                        <span>ก</span>
                        <span>ล</span>
                        <span>า</span>
                        <span>ง</span>
                      </div>
                    </div>

                    {/* Seat Rows Matrix */}
                    <div className="space-y-3 relative z-10">
                      {Array.from({ length: upperRowCount }).map((_, rIdx) => {
                        const rowNum = rIdx + 1;
                        const isLastRow46 = rowNum === 10 && seatMode === 46;
                        const isFrontRow = rowNum === 1;

                        return (
                          <div key={rowNum} className="flex items-center justify-between gap-1 sm:gap-2">
                            {/* Row Indicator */}
                            <span className="w-5 sm:w-6 text-[11px] text-slate-400 font-mono font-bold text-center shrink-0">
                              R{rowNum}
                            </span>

                            {/* Left Pair (A & B) */}
                            <div className="flex items-center gap-1.5 sm:gap-2 flex-1 justify-end">
                              <RealisticCoachSeat
                                label={`${rowNum}A`}
                                isFrontRow={isFrontRow}
                                isWindow={true}
                              />
                              {!isLastRow46 ? (
                                <RealisticCoachSeat
                                  label={`${rowNum}B`}
                                  isFrontRow={isFrontRow}
                                  isWindow={false}
                                />
                              ) : (
                                <div className="w-8 sm:w-10" />
                              )}
                            </div>

                            {/* Open Central Walkway Gap (Exactly matching corridor width w-8 sm:w-10) */}
                            <div className="w-8 sm:w-10 shrink-0" />

                            {/* Right Pair (C & D) */}
                            <div className="flex items-center gap-1.5 sm:gap-2 flex-1 justify-start">
                              {!isLastRow46 ? (
                                <RealisticCoachSeat
                                  label={`${rowNum}C`}
                                  isFrontRow={isFrontRow}
                                  isWindow={false}
                                />
                              ) : (
                                <div className="w-8 sm:w-10" />
                              )}
                              <RealisticCoachSeat
                                label={`${rowNum}D`}
                                isFrontRow={isFrontRow}
                                isWindow={true}
                              />
                            </div>

                            {/* Balancing spacer on the right so center aisle is exactly at 50% */}
                            <span className="w-5 sm:w-6 shrink-0" />
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="mt-5 p-2.5 rounded-xl bg-white border border-slate-200 text-center text-xs text-slate-500">
                    ด้านท้ายรถ (Upper Rear) • ทางออกฉุกเฉินบนหลังคา (Roof Emergency Exit)
                  </div>
                </div>
              )}

              {/* Lower Deck (Deck 1) Layout */}
              {activeDeck === 1 && (
                <div className="space-y-5">
                  {/* Cockpit / Driver Zone */}
                  <div className="p-4 rounded-xl bg-white border border-emerald-200 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-10 h-10 rounded-full bg-emerald-800 text-white flex items-center justify-center font-bold">
                          <ShieldCheck className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-emerald-800 uppercase">
                            โซนคนขับ (Driver Cockpit)
                          </div>
                          <div className="text-sm font-extrabold text-slate-900">
                            เจ้าของขับเอง ดูแลตลอดเส้นทาง 100%
                          </div>
                        </div>
                      </div>
                      <span className="text-[11px] bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded-full border border-emerald-200 font-semibold">
                        ปลอดภัยสูงสุด
                      </span>
                    </div>
                  </div>

                  {/* Stairs and Main Doorway */}
                  <div className="grid grid-cols-2 gap-3 text-center text-xs">
                    <div className="p-3 rounded-xl bg-white border border-slate-200 text-emerald-800 font-semibold flex items-center justify-center gap-1.5">
                      <ArrowUpRight className="w-4 h-4 text-emerald-700" />
                      <span>บันไดขึ้นชั้น 2</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white border border-slate-200 text-slate-700 font-semibold flex items-center justify-center gap-1.5">
                      <ArrowUpRight className="w-4 h-4 rotate-45 text-emerald-700" />
                      <span>ประตูขึ้น-ลงหลัก</span>
                    </div>
                  </div>

                  {/* VIP Lounge Seats on Lower Deck with Central Aisle */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 relative overflow-hidden">
                    <div className="text-xs text-emerald-950 font-bold mb-4 flex items-center justify-between border-b border-slate-100 pb-2">
                      <span>โซนที่นั่ง VIP ชั้นล่าง ({lowerSeatsCount} ที่นั่ง)</span>
                      <span className="text-[11px] text-slate-500">เหมาะสำหรับผู้สูงอายุ / ผู้บริหาร</span>
                    </div>

                    {/* Single continuous vertical walkway corridor for lower deck with vertical text */}
                    <div className="absolute top-14 bottom-4 left-1/2 -translate-x-1/2 w-8 sm:w-10 border-x border-dashed border-emerald-300/60 bg-emerald-50/20 rounded flex flex-col items-center justify-center pointer-events-none z-0">
                      <div className="flex flex-col items-center justify-center gap-1 text-[10px] font-extrabold text-emerald-850 select-none bg-white/95 px-1 py-2 rounded-full border border-emerald-300/80 shadow-xs">
                        <span>ท</span>
                        <span>า</span>
                        <span>ง</span>
                        <span>เ</span>
                        <span>ดิ</span>
                        <span>น</span>
                      </div>
                    </div>

                    <div className="space-y-3 relative z-10">
                      {[1, 2].map((rowNum) => (
                        <div key={rowNum} className="flex items-center justify-between gap-1 sm:gap-2">
                          <span className="w-5 sm:w-6 text-[11px] text-slate-400 font-mono font-bold text-center shrink-0">
                            L{rowNum}
                          </span>
                          <div className="flex items-center gap-1.5 sm:gap-2 flex-1 justify-end">
                            <RealisticCoachSeat label={`L${rowNum}A`} isFrontRow={false} isWindow={true} />
                            <RealisticCoachSeat label={`L${rowNum}B`} isFrontRow={false} isWindow={false} />
                          </div>
                          {/* Continuous Central Walkway Space */}
                          <div className="w-8 sm:w-10 shrink-0" />
                          <div className="flex items-center gap-1.5 sm:gap-2 flex-1 justify-start">
                            <RealisticCoachSeat label={`L${rowNum}C`} isFrontRow={false} isWindow={false} />
                            <RealisticCoachSeat label={`L${rowNum}D`} isFrontRow={false} isWindow={true} />
                          </div>
                          {/* Right spacer for 50% perfect center alignment */}
                          <span className="w-5 sm:w-6 shrink-0" />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Restroom & Luggage Zone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div className="p-3.5 rounded-xl bg-white border border-slate-200 flex items-center gap-3 shadow-sm">
                      <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0">
                        <Bath className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900">ห้องน้ำสะอาด VIP</div>
                        <div className="text-[11px] text-slate-500">มีอ่างล้างมือ ถูกสุขอนามัย ไร้กลิ่น</div>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white border border-slate-200 flex items-center gap-3 shadow-sm">
                      <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                        <Luggage className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900">ช่องเก็บสัมภาระใต้ท้องรถ</div>
                        <div className="text-[11px] text-slate-500">จุสัมภาระขนาดใหญ่ได้ไม่อั้น</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Layout Legends */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-center gap-5 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <div className="flex flex-col items-center">
                  <div className="w-4 h-1 rounded-t-sm bg-emerald-900" />
                  <div className="w-5 h-4 rounded-b-sm bg-emerald-800" />
                </div>
                <span>เบาะ VIP มาตรฐาน</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex flex-col items-center">
                  <div className="w-4 h-1 rounded-t-sm bg-amber-400" />
                  <div className="w-5 h-4 rounded-b-sm bg-emerald-900" />
                </div>
                <span>แถวหน้าสุดวิวพาโนรามา 180°</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-500">
                <span className="w-3 h-3 rounded-sm border border-dashed border-emerald-400 bg-emerald-50/50" />
                <span>ทางเดินกลางแนวตั้งยาว (Aisle)</span>
              </div>
            </div>
          </div>

          {/* Coach Specifications & Charter Action Sidebar */}
          <div className="lg:col-span-4 bg-white rounded-3xl border border-emerald-100 p-6 shadow-clean sticky top-24 space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold mb-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                <span>ข้อมูลสเปกรถเช่าเหมาคัน</span>
              </div>
              <h3 className="text-xl font-bold font-heading text-emerald-950">
                รุ่นเหมาคัน {seatMode} ที่นั่ง VIP
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                รถทัวร์ปรับอากาศ 2 ชั้น มาตรฐานความปลอดภัยสูงสุด
              </p>
            </div>

            {/* Specification summary list */}
            <div className="space-y-3 text-xs text-slate-700">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-500">ความจุผู้โดยสารรวม:</span>
                <span className="font-extrabold text-emerald-950 text-sm">{seatMode} ที่นั่ง</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-500">สัดส่วนที่นั่งชั้น 2 (บน):</span>
                <span className="font-bold text-slate-800">{upperSeatsCount} ที่นั่ง (ผัง 2-2)</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-500">สัดส่วนที่นั่งชั้น 1 (ล่าง):</span>
                <span className="font-bold text-slate-800">{lowerSeatsCount} ที่นั่ง VIP</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-500">คนขับรถ:</span>
                <span className="font-bold text-emerald-800">เจ้าของขับเอง 100%</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-500">ห้องน้ำ & สิ่งอำนวยความสะดวก:</span>
                <span className="font-bold text-slate-800">สุขา, TV, คาราโอเกะ, USB</span>
              </div>
            </div>

            {/* Charter Action Button */}
            <button
              onClick={handleApplyCharter}
              className="w-full py-4 px-4 rounded-xl emerald-gradient-btn text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow active:scale-95 transition cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>เลือกเช่าเหมาคันรุ่น {seatMode} ที่นั่งนี้</span>
            </button>

            <div className="text-[11px] text-slate-500 text-center leading-relaxed">
              คลิกเพื่อนำรุ่นความจุนี้ไประบุในฟอร์มขอใบเสนอราคาด่วน เจ้าของยินดีประเมินราคาเหมาคันที่คุ้มค่าที่สุดให้ครับ
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Architectural realistic coach seat graphic (Pure layout display, no selection frame/button look)
function RealisticCoachSeat({
  label,
  isFrontRow,
  isWindow,
}: {
  label: string;
  isFrontRow: boolean;
  isWindow: boolean;
}) {
  return (
    <div
      title={`ที่นั่ง ${label} (${isWindow ? 'ริมหน้าต่าง' : 'ติดทางเดิน'})`}
      className="flex flex-col items-center select-none cursor-default"
    >
      {/* Headrest contour */}
      <div
        className={`w-6 sm:w-7 h-1.5 sm:h-2 rounded-t-sm ${
          isFrontRow ? 'bg-amber-400' : 'bg-emerald-950'
        }`}
      />
      {/* Backrest Cushion with seat label inside (No selection borders/boxes) */}
      <div
        className={`w-8 sm:w-10 h-7 sm:h-8 rounded-b-lg flex items-center justify-center text-xs font-bold shadow-xs ${
          isFrontRow
            ? 'bg-emerald-950 text-amber-300 border border-amber-300/40'
            : 'bg-emerald-800 text-white'
        }`}
      >
        <span className="text-[10px] sm:text-[11px] font-extrabold tracking-tight">
          {label}
        </span>
      </div>
    </div>
  );
}
