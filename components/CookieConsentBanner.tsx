'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Cookie, X, ShieldCheck } from 'lucide-react';

export default function CookieConsentBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem('muangsongya_cookie_consent');
      if (!consent) {
        const timer = setTimeout(() => {
          setShowBanner(true);
        }, 600);
        return () => clearTimeout(timer);
      }
    } catch (e) {}
  }, []);

  const handleAcceptAll = () => {
    try {
      localStorage.setItem('muangsongya_cookie_consent', 'accepted');
    } catch (e) {}
    setShowBanner(false);
  };

  const handleEssentialOnly = () => {
    try {
      localStorage.setItem('muangsongya_cookie_consent', 'essential_only');
    } catch (e) {}
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div
      role="region"
      aria-label="การจัดเก็บคุกกี้"
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-lg z-50 animate-fadeIn"
    >
      <div className="p-5 sm:p-6 rounded-3xl bg-slate-950 text-white border-2 border-emerald-500/80 shadow-2xl backdrop-blur-md">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md">
            <Cookie className="w-5 h-5 text-amber-300" />
          </div>

          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between gap-2">
              <h4 className="text-sm sm:text-base font-extrabold text-white flex items-center gap-1.5">
                <span>การจัดเก็บคุกกี้ (Cookie Policy)</span>
              </h4>
              <button
                onClick={handleEssentialOnly}
                className="text-slate-400 hover:text-white p-1 rounded-full transition cursor-pointer"
                aria-label="ปิดการแจ้งเตือน"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs sm:text-sm text-slate-100 font-normal leading-relaxed">
              เว็บไซต์นี้ใช้คุกกี้เพื่อปรับปรุงประสบการณ์การใช้งาน วิเคราะห์การเข้าชม และเชื่อมโยงกับการตลาดผ่าน Meta Pixel 
              ท่านสามารถอ่านรายละเอียดเพิ่มเติมได้ที่{' '}
              <Link
                href="/privacy"
                className="text-amber-300 hover:text-amber-200 font-bold underline decoration-amber-400 underline-offset-2"
              >
                นโยบายความเป็นส่วนตัวและคุกกี้
              </Link>
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center gap-2.5">
              <button
                onClick={handleAcceptAll}
                className="w-full sm:w-auto flex-1 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm shadow-md active:scale-95 transition cursor-pointer"
              >
                ยอมรับทั้งหมด
              </button>
              <button
                onClick={handleEssentialOnly}
                className="w-full sm:w-auto py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs sm:text-sm border border-slate-700 transition cursor-pointer"
              >
                เฉพาะที่จำเป็น
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
