'use client';

import React from 'react';
import { Bus, Phone, ShieldCheck, Heart, MapPin, Lock } from 'lucide-react';
import Link from 'next/link';

interface FooterProps {
  companyName: string;
  phones: { number: string; raw: string; label: string }[];
  slogan: string;
  lineUrl?: string;
  lineQrUrl?: string;
}

export default function Footer({
  companyName,
  phones,
  slogan,
  lineUrl = 'https://line.me/ti/p/Q9W-e6nWz0',
  lineQrUrl = '/images/line-qr.jpg',
}: FooterProps) {
  return (
    <footer className="bg-emerald-950 text-white border-t border-emerald-900 pt-16 pb-32 sm:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand Col with Transparent PNG Logo (No border, no shadow, no background box) */}
          <div className="space-y-4">
            <img
              src="/images/logo.png"
              alt="บจก. เมืองสองย่า ทรานสปอร์ต"
              className="h-14 sm:h-16 w-auto object-contain"
            />

            <p className="text-xs text-emerald-100/90 leading-relaxed">
              "{slogan}"
            </p>

            <div className="pt-2 text-xs text-emerald-300 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-300 shrink-0" />
              <span>การันตีความปลอดภัย 100% เจ้าของขับเองทุกทริป</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-amber-300 font-heading">
              เมนูนำทางด่วน
            </h4>
            <ul className="space-y-2 text-xs text-emerald-100">
              <li>
                <a href="#why-choose-us" className="hover:text-amber-300 transition-colors">
                  จุดเด่นบริการ & ความปลอดภัย
                </a>
              </li>
              <li>
                <a href="#scroll-3d" className="hover:text-amber-300 transition-colors">
                  3D สัมผัสรถจริงรอบคัน
                </a>
              </li>
              <li>
                <a href="#calendar-section" className="hover:text-amber-300 transition-colors">
                  ปฏิทินตรวจเช็คคิวรถว่าง
                </a>
              </li>
              <li>
                <a href="#seat-layout" className="hover:text-amber-300 transition-colors">
                  ผังเหมาคัน 40-46 ที่นั่ง 2 ชั้น
                </a>
              </li>
              <li>
                <a href="#routes" className="hover:text-amber-300 transition-colors">
                  เส้นทางยอดนิยมทั่วไทย
                </a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-amber-300 transition-colors">
                  รีวิวความประทับใจลูกค้า
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details & LINE QR */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-amber-300 font-heading">
              ติดต่อสอบถาม / จองคิว
            </h4>
            <div className="space-y-2 text-xs text-emerald-100">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>อ.ถลาง จ.ภูเก็ต (วิ่งทัวร์ทั่วไทย)</span>
              </div>
              {phones.map((phone) => (
                <div key={phone.raw} className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-amber-300 shrink-0" />
                  <a
                    href={`tel:${phone.raw}`}
                    className="hover:text-amber-300 font-bold tracking-wide"
                  >
                    {phone.number} ({phone.label})
                  </a>
                </div>
              ))}
            </div>

            {/* Quick LINE QR code */}
            <div className="pt-2">
              <div className="bg-black/30 p-3 rounded-2xl border border-emerald-800/80 flex items-center gap-3">
                <img
                  src={lineQrUrl}
                  alt="LINE QR Code"
                  className="w-16 h-16 object-contain rounded-lg bg-white p-1"
                />
                <div className="space-y-1">
                  <div className="text-xs font-bold text-emerald-200">LINE Official</div>
                  <a
                    href={lineUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-[11px] text-amber-300 hover:underline font-semibold"
                  >
                    แอดไลน์คลิกที่นี่ →
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Admin, Legal & Security */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-amber-300 font-heading">
              นโยบายและความปลอดภัย
            </h4>
            <ul className="space-y-2 text-xs text-emerald-100">
              <li>
                <Link
                  href="/terms"
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-900/70 border border-emerald-800 hover:border-amber-400 hover:text-amber-300 transition-colors"
                >
                  <ShieldCheck className="w-4 h-4 text-amber-300 shrink-0" />
                  <span className="font-medium">ข้อกำหนดและเงื่อนไข (Terms & Conditions)</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-900/70 border border-emerald-800 hover:border-amber-400 hover:text-amber-300 transition-colors"
                >
                  <ShieldCheck className="w-4 h-4 text-amber-300 shrink-0" />
                  <span className="font-medium">นโยบายความเป็นส่วนตัว & คุกกี้ (PDPA)</span>
                </Link>
              </li>
            </ul>
            <div className="pt-2">
              <Link
                href="/admin"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-900 border border-emerald-700 text-emerald-200 hover:text-white hover:border-emerald-500 text-xs font-semibold transition"
              >
                <Lock className="w-3.5 h-3.5 text-amber-300" />
                <span>เข้าสู่ระบบหลังบ้าน (Admin CMS)</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-emerald-900/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-300">
          <div>
            © {new Date().getFullYear()} {companyName}. สงวนลิขสิทธิ์ทุกประการ
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <Link href="/terms" className="hover:text-amber-300 transition underline underline-offset-2">
              ข้อกำหนดและเงื่อนไข
            </Link>
            <span>•</span>
            <Link href="/privacy" className="hover:text-amber-300 transition underline underline-offset-2">
              นโยบายคุกกี้ & PDPA
            </Link>
            <span>•</span>
            <div className="flex items-center gap-1">
              <span>บริการด้วยใจ</span>
              <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
