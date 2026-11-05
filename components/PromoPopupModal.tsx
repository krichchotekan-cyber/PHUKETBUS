'use client';

import React, { useState, useEffect } from 'react';
import { X, PhoneCall, MessageCircle, FileText, Check, ShieldCheck } from 'lucide-react';
import { trackFacebookEvent } from '@/lib/facebook';

interface PromoPopupModalProps {
  onOpenPhoneModal?: () => void;
  phone1?: string;
  phone2?: string;
  lineUrl?: string;
}

export default function PromoPopupModal({
  onOpenPhoneModal,
  phone1 = '096-463-8443',
  phone2 = '081-059-6350',
  lineUrl = 'https://line.me/ti/p/Q9W-e6nWz0',
}: PromoPopupModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  useEffect(() => {
    try {
      // Check if dismissed forever
      const dismissedForever = localStorage.getItem('muangsongya_promo_dismissed_forever');
      if (dismissedForever === 'true') {
        return;
      }

      // Check if dismissed today
      const todayStr = new Date().toISOString().split('T')[0];
      const lastDismissedDate = localStorage.getItem('muangsongya_promo_dismissed_date');
      if (lastDismissedDate === todayStr) {
        return;
      }

      // Show popup after 1.2s for visitors entering the site
      const timer = setTimeout(() => {
        setIsOpen(true);
        trackFacebookEvent('ViewContent', { content_name: 'PromoPopupPoster' });
      }, 1200);

      return () => clearTimeout(timer);
    } catch (e) {
      // localStorage may fail in private mode
    }
  }, []);

  const handleClose = () => {
    try {
      const todayStr = new Date().toISOString().split('T')[0];
      if (dontShowAgain) {
        localStorage.setItem('muangsongya_promo_dismissed_forever', 'true');
      } else {
        localStorage.setItem('muangsongya_promo_dismissed_date', todayStr);
      }
    } catch (e) {}
    setIsOpen(false);
  };

  const handlePhoneClick = () => {
    trackFacebookEvent('Contact', { action: 'promo_popup_call' });
    handleClose();
    if (onOpenPhoneModal) {
      onOpenPhoneModal();
    }
  };

  const handleQuoteClick = () => {
    handleClose();
    const el = document.getElementById('quote-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={handleClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg rounded-3xl bg-slate-900 text-white border-2 border-amber-400/80 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col animate-scaleUp"
      >
        {/* Close Button (X) */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 z-20 w-9 h-9 rounded-full bg-black/70 hover:bg-black text-white hover:text-amber-300 flex items-center justify-center transition border border-white/20 shadow-lg cursor-pointer"
          aria-label="ปิดหน้าต่างโฆษณา"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Poster Image Container */}
        <div className="relative w-full bg-black overflow-hidden flex items-center justify-center">
          <img
            src="/images/promo-poster.jpg"
            alt="โปรโมชั่นเช่าเหมารถทัวร์ 2 ชั้น VIP เมืองสองย่า ทรานสปอร์ต ภูเก็ต"
            className="w-full h-auto max-h-[58vh] sm:max-h-[62vh] object-contain select-none"
          />
        </div>

        {/* Modal Action Footer */}
        <div className="p-4 sm:p-5 bg-gradient-to-b from-slate-900 to-slate-950 border-t border-white/10 space-y-3">
          {/* Quick Action CTA Buttons */}
          <div className="grid grid-cols-2 gap-2.5">
            <button
              onClick={handlePhoneClick}
              className="py-3 px-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-emerald-950 font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg active:scale-95 transition cursor-pointer"
            >
              <PhoneCall className="w-4 h-4" />
              <span>โทรจอง 096-463-8443</span>
            </button>

            <a
              href={lineUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleClose}
              className="py-3 px-3 rounded-xl bg-[#06C755] hover:bg-[#05b34c] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg active:scale-95 transition cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>แชท LINE จองรถ</span>
            </a>
          </div>

          {/* Secondary Action & Do Not Show Again Checkbox */}
          <div className="flex items-center justify-between pt-1 text-xs text-slate-300">
            <label className="flex items-center gap-2 cursor-pointer select-none group">
              <input
                type="checkbox"
                checked={dontShowAgain}
                onChange={(e) => setDontShowAgain(e.target.checked)}
                className="w-4 h-4 rounded text-emerald-600 accent-amber-400 cursor-pointer"
              />
              <span className="text-[11px] sm:text-xs text-slate-300 group-hover:text-white transition-colors">
                ไม่ต้องแสดงโฆษณานี้อีก
              </span>
            </label>

            <button
              onClick={handleQuoteClick}
              className="text-[11px] sm:text-xs text-amber-300 hover:text-amber-200 underline underline-offset-2 font-semibold cursor-pointer"
            >
              ขอใบเสนอราคาเช่าเหมาคัน →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
