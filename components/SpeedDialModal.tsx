'use client';

import React, { useState } from 'react';
import {
  Phone,
  PhoneCall,
  Copy,
  Check,
  X,
  ShieldCheck,
  MessageCircle,
  QrCode,
  ExternalLink,
} from 'lucide-react';
import { trackFacebookEvent } from '@/lib/facebook';

interface SpeedDialModalProps {
  phones: { number: string; raw: string; label: string }[];
  lineUrl?: string;
  lineQrUrl?: string;
  isOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
}

export default function SpeedDialModal({
  phones,
  lineUrl = 'https://line.me/ti/p/Q9W-e6nWz0',
  lineQrUrl = '/images/line-qr.jpg',
  isOpen: controlledIsOpen,
  onOpen: controlledOnOpen,
  onClose: controlledOnClose,
}: SpeedDialModalProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'phone' | 'line'>('phone');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // Controlled or uncontrolled modal state
  const isModalOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;

  const handleOpen = () => {
    if (controlledOnOpen) {
      controlledOnOpen();
    } else {
      setInternalIsOpen(true);
    }
    trackFacebookEvent('Contact', { action: 'open_phone_modal' });
  };

  const handleClose = () => {
    if (controlledOnClose) {
      controlledOnClose();
    } else {
      setInternalIsOpen(false);
    }
  };

  const handleCopy = (num: string, idx: number) => {
    navigator.clipboard.writeText(num);
    setCopiedIndex(idx);
    trackFacebookEvent('Contact', { action: 'copy_phone', phone: num });
    setTimeout(() => setCopiedIndex(null), 2500);
  };

  const handleCall = (num: string) => {
    trackFacebookEvent('Contact', { action: 'click_to_call', phone: num });
  };

  return (
    <>
      {/* Desktop Floating Action Button (FAB) */}
      <div className="fixed bottom-6 right-6 z-40 hidden sm:flex flex-col items-end gap-3">
        <div className="group relative flex items-center gap-2">
          {/* Quick LINE pill */}
          <a
            href={lineUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackFacebookEvent('Contact', { action: 'click_fab_line' })}
            className="flex items-center gap-2 px-4 py-3 rounded-full bg-[#06C755] hover:bg-[#05b34c] text-white shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 font-bold text-xs"
            title="ติดต่อผ่าน LINE"
          >
            <MessageCircle className="w-4 h-4" />
            <span>LINE จองรถ</span>
          </a>

          {/* Quick Call FAB */}
          <button
            onClick={handleOpen}
            aria-label="โทรด่วนติดต่อเจ้าของ"
            className="flex items-center gap-3 px-5 py-3.5 rounded-full bg-emerald-800 hover:bg-emerald-700 text-white shadow-xl animate-pulse-glow hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
          >
            <div className="w-9 h-9 rounded-full bg-white text-emerald-800 flex items-center justify-center font-bold shadow-sm">
              <PhoneCall className="w-4 h-4 animate-bounce" />
            </div>
            <div className="text-left pr-1">
              <div className="text-[11px] text-emerald-200 font-semibold tracking-wider uppercase">
                สายด่วน VIP ภูเก็ต
              </div>
              <div className="text-sm font-bold text-white tracking-wide">
                โทรจองรถทัวร์
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Sticky Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 sm:hidden bg-white/95 backdrop-blur-md border-t border-slate-200 px-3 py-2 flex items-center justify-between gap-2 shadow-xl">
        <a
          href={lineUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackFacebookEvent('Contact', { action: 'click_mobile_bottom_line' })}
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-[#06C755]/10 text-[#05963f] border border-[#06C755]/30 text-xs font-bold"
        >
          <MessageCircle className="w-4 h-4 text-[#06C755]" />
          <span>แชท LINE</span>
        </a>

        <button
          onClick={handleOpen}
          className="flex-[1.4] flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl emerald-gradient-btn text-white font-bold text-sm shadow-md active:scale-98 cursor-pointer"
        >
          <PhoneCall className="w-4 h-4" />
          <span>สายด่วน</span>
        </button>

        <a
          href="#quote-section"
          className="flex-1 flex items-center justify-center gap-1 py-2.5 px-2 rounded-xl bg-slate-100 text-slate-800 border border-slate-200 text-xs font-semibold"
        >
          <span>เช็คราคา</span>
        </a>
      </div>

      {/* Phone & LINE Modal */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={handleClose}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm transition-opacity duration-200 animate-fadeIn"
        >
          <div
            className="relative w-full max-w-md rounded-3xl bg-white text-slate-900 border border-emerald-100 shadow-2xl p-6 sm:p-7 overflow-hidden max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
              aria-label="ปิดหน้าต่าง"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="text-center mb-5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold mb-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                <span>เจ้าของขับเอง ดูแลเองทุกทริป 100%</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-heading text-emerald-950">
                ติดต่อสอบถาม / จองคิวรถ
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                บจก. เมืองสองย่า ทรานสปอร์ต แอนด์ ทัวร์ ภูเก็ต
              </p>
            </div>

            {/* Tabs Switcher: Phone Call vs LINE QR */}
            <div className="grid grid-cols-2 gap-2 p-1.5 rounded-2xl bg-slate-100 mb-5">
              <button
                onClick={() => setActiveTab('phone')}
                className={`py-2 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition cursor-pointer ${
                  activeTab === 'phone'
                    ? 'bg-emerald-800 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <PhoneCall className="w-4 h-4" />
                <span>โทรด่วน (2 เบอร์หลัก)</span>
              </button>
              <button
                onClick={() => setActiveTab('line')}
                className={`py-2 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition cursor-pointer ${
                  activeTab === 'line'
                    ? 'bg-[#06C755] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <QrCode className="w-4 h-4" />
                <span>LINE & QR Code</span>
              </button>
            </div>

            {/* Phone Tab Content */}
            {activeTab === 'phone' && (
              <div className="space-y-3 mb-4">
                {phones.map((phone, idx) => (
                  <div
                    key={phone.raw}
                    className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-emerald-500 transition-all shadow-sm group"
                  >
                    <div className="flex items-center justify-between text-xs text-emerald-800 font-semibold mb-1">
                      <span>{phone.label}</span>
                      <span className="text-[10px] text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full font-medium">
                        พร้อมรับสาย
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-2 mt-1.5">
                      <a
                        href={`tel:${phone.raw}`}
                        onClick={() => handleCall(phone.raw)}
                        className="text-lg sm:text-xl font-extrabold tracking-wider text-emerald-950 hover:text-emerald-700 flex items-center gap-2 transition"
                      >
                        <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center group-hover:bg-emerald-800 group-hover:text-white transition">
                          <Phone className="w-3.5 h-3.5" />
                        </div>
                        <span>{phone.number}</span>
                      </a>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleCopy(phone.number, idx)}
                          className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-slate-900 transition text-xs flex items-center gap-1 cursor-pointer"
                          title="คัดลอกเบอร์โทร"
                        >
                          {copiedIndex === idx ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                              <span className="text-emerald-700 text-[10px] font-bold">คัดลอกแล้ว</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span className="text-[10px] hidden sm:inline">คัดลอก</span>
                            </>
                          )}
                        </button>

                        <a
                          href={`tel:${phone.raw}`}
                          onClick={() => handleCall(phone.raw)}
                          className="px-3 py-2 rounded-xl emerald-gradient-btn text-white font-bold text-xs flex items-center gap-1 shadow"
                        >
                          <PhoneCall className="w-3 h-3" />
                          <span>โทร</span>
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* LINE & QR Code Tab Content */}
            {activeTab === 'line' && (
              <div className="text-center py-2 space-y-4">
                <div className="bg-[#06C755]/10 border border-[#06C755]/30 rounded-2xl p-4 text-center">
                  <div className="flex items-center justify-center gap-2 text-[#05963f] font-bold text-sm mb-1">
                    <MessageCircle className="w-5 h-5 text-[#06C755]" />
                    <span>ติดต่อทาง LINE ได้โดยตรง</span>
                  </div>
                  <p className="text-xs text-slate-600">
                    แอดไลน์ส่งโปรแกรมทริป วันเดินทาง หรือสอบถามราคาเหมาคันได้ทันที
                  </p>
                </div>

                {/* LINE QR Code Display */}
                <div className="inline-block p-3 rounded-2xl bg-white border-2 border-emerald-500 shadow-md">
                  <img
                    src={lineQrUrl}
                    alt="LINE QR Code บจก. เมืองสองย่า ทรานสปอร์ต"
                    className="w-48 h-48 sm:w-56 sm:h-56 object-contain rounded-xl mx-auto"
                  />
                  <div className="text-[11px] text-slate-500 font-semibold mt-2">
                    สแกน QR Code เพื่อเพิ่มเพื่อนใน LINE
                  </div>
                </div>

                {/* Open LINE Button */}
                <a
                  href={lineUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3.5 px-4 rounded-xl bg-[#06C755] hover:bg-[#05b34c] text-white font-bold text-sm shadow-md transition cursor-pointer"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>เปิดแชท LINE ตอนนี้ (คลิกเพื่อเพิ่มเพื่อน)</span>
                </a>
              </div>
            )}

            {/* Bottom Note */}
            <div className="pt-3 border-t border-slate-100 text-center">
              <p className="text-xs text-slate-500 leading-relaxed">
                บริการ 24 ชม. • ยินดีให้คำปรึกษาเส้นทางและวางแผนโปรแกรมทัวร์ฟรี
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
