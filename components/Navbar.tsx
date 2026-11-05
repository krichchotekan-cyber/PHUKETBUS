'use client';

import React, { useState, useEffect } from 'react';
import { PhoneCall, Menu, X, Calendar, MessageCircle, Sparkles } from 'lucide-react';
import Link from 'next/link';

interface NavbarProps {
  onOpenPhoneModal: () => void;
  companyName: string;
}

export default function Navbar({ onOpenPhoneModal, companyName }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 25) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Concise, single-line desktop navigation links
  const navLinks = [
    { name: 'จุดเด่นบริการ', href: '#why-choose-us' },
    { name: 'ผังที่นั่ง VIP', href: '#seat-layout' },
    { name: 'ปฏิทินจองวัน', href: '#calendar-section' },
    { name: 'เส้นทางยอดนิยม', href: '#routes' },
    { name: 'รีวิวลูกค้า', href: '#testimonials' },
    { name: 'ขอใบเสนอราคา', href: '#quote-section' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-emerald-950/95 backdrop-blur-md shadow-lg border-b border-emerald-800/60 py-2.5 text-white'
          : 'bg-gradient-to-b from-slate-950/90 via-slate-950/60 to-transparent py-3 text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3 xl:gap-6 flex-nowrap">
          {/* Logo & Brand with Transparent PNG Logo (No border, no shadow, no background box) */}
          <a href="#" className="flex items-center gap-2.5 shrink-0 group">
            <img
              src="/images/logo.png"
              alt="บจก. เมืองสองย่า ทรานสปอร์ต"
              className="h-9 sm:h-11 w-auto object-contain transition-transform group-hover:scale-105"
            />
            <div className="hidden sm:block text-left whitespace-nowrap">
              <div className="font-heading font-extrabold text-sm sm:text-base leading-tight text-white group-hover:text-amber-300 transition-colors">
                เมืองสองย่า ทรานสปอร์ต
              </div>
              <div className="text-[11px] flex items-center gap-1.5 font-medium text-emerald-200">
                <span>ภูเก็ต</span>
                <span>•</span>
                <span className="text-amber-300 font-semibold">
                  เจ้าของขับเอง 100%
                </span>
              </div>
            </div>
          </a>

          {/* Desktop Nav Links (Guaranteed Strict Single Line, No Linebreaks) */}
          <nav className="hidden lg:flex items-center gap-2.5 xl:gap-5 text-xs xl:text-[13px] font-medium whitespace-nowrap shrink">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-slate-100 hover:text-amber-300 transition-colors relative py-1 whitespace-nowrap shrink-0 hover:after:w-full after:w-0 after:h-0.5 after:bg-amber-300 after:absolute after:bottom-0 after:left-0 after:transition-all"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-2 shrink-0 whitespace-nowrap">
            {/* Quick LINE button */}
            <a
              href="https://line.me/ti/p/Q9W-e6nWz0"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 rounded-full bg-[#06C755] hover:bg-[#05b34c] text-white text-xs font-bold flex items-center gap-1.5 shadow transition active:scale-95 whitespace-nowrap shrink-0"
              title="คุย LINE กับเจ้าของ"
            >
              <MessageCircle className="w-3.5 h-3.5 shrink-0" />
              <span>แชท LINE</span>
            </a>

            {/* Quick Call Modal Trigger */}
            <button
              onClick={onOpenPhoneModal}
              className="px-3.5 py-2 rounded-full emerald-gradient-btn text-xs font-bold flex items-center gap-1.5 shadow-md hover:scale-105 active:scale-95 transition cursor-pointer whitespace-nowrap shrink-0"
            >
              <PhoneCall className="w-3.5 h-3.5 shrink-0" />
              <span>โทรด่วน / จองรถ</span>
            </button>
          </div>

          {/* Mobile Action Buttons */}
          <div className="flex items-center gap-2 lg:hidden">
            {/* Direct LINE on mobile */}
            <a
              href="https://line.me/ti/p/Q9W-e6nWz0"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-[#06C755] text-white font-bold text-xs flex items-center justify-center shadow"
              aria-label="ติดต่อทาง LINE"
            >
              <MessageCircle className="w-4 h-4" />
            </a>

            {/* Phone call modal button */}
            <button
              onClick={onOpenPhoneModal}
              className="p-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs flex items-center justify-center shadow cursor-pointer"
              aria-label="โทรด่วน"
            >
              <PhoneCall className="w-4 h-4" />
            </button>

            {/* Mobile Hamburger toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl border border-white/20 bg-white/10 text-white hover:bg-white/20 transition cursor-pointer"
              aria-label="เปิดเมนู"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-emerald-950/98 border-b border-emerald-800 text-white px-5 pt-4 pb-6 space-y-3 shadow-2xl backdrop-blur-md animate-fadeIn">
          <div className="py-2.5 border-b border-emerald-800/60 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src="/images/logo.png" alt="โลโก้เมืองสองย่า" className="h-8 w-auto object-contain rounded-md" />
              <span className="text-xs font-bold text-white">บจก. เมืองสองย่า ทรานสปอร์ต</span>
            </div>
            <span className="text-[10px] bg-amber-400 text-slate-950 px-2 py-0.5 rounded-full font-bold">
              เจ้าของขับเอง 100%
            </span>
          </div>

          <div className="space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 px-3 rounded-xl text-sm text-slate-200 hover:text-amber-300 hover:bg-emerald-900/60 font-medium transition"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-emerald-800/60 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPhoneModal();
              }}
              className="w-full py-3 rounded-xl emerald-gradient-btn text-white font-bold text-sm flex items-center justify-center gap-2 shadow cursor-pointer"
            >
              <PhoneCall className="w-4 h-4" />
              <span>โทรด่วนสายตรง (2 เบอร์)</span>
            </button>

            <a
              href="https://line.me/ti/p/Q9W-e6nWz0"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-xl bg-[#06C755] hover:bg-[#05b34c] text-white font-bold text-sm flex items-center justify-center gap-2 shadow"
            >
              <MessageCircle className="w-4 h-4" />
              <span>แอดไลน์ส่งโปรแกรมทัวร์ (QR Code)</span>
            </a>

            <Link
              href="/admin"
              className="text-center text-xs text-emerald-300 hover:text-white py-1.5"
            >
              เข้าสู่ระบบหลังบ้าน (Admin CMS)
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
