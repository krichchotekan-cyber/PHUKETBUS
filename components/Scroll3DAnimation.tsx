'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  RotateCw,
  Compass,
  MapPin,
  Hotel,
  Mic,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  Gift,
  Layers,
} from 'lucide-react';

export default function Scroll3DAnimation() {
  const [activeAngleIndex, setActiveAngleIndex] = useState(0);
  const [rotationY, setRotationY] = useState(-8);
  const [rotationX, setRotationX] = useState(4);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Real vehicle multi-angle assets
  const angles = [
    {
      id: 'front',
      name: 'มุมมองด้านหน้าพาโนรามา',
      sub: 'รถทัวร์ 2 ชั้น VIP สีมรกต (30-2542)',
      image: '/images/bus/bus-hero.jpg',
      badge: 'ด้านหน้าหรูหรา',
      description: 'กระจกหน้าบานใหญ่ 2 ชั้น มองเห็นทิวทัศน์พาโนรามา 180° แอร์เย็นฉ่ำ ไฟหน้า LED คมชัดปลอดภัยยามค่ำคืน',
    },
    {
      id: 'door',
      name: 'ประตูทางขึ้น & บันไดสู่ชั้น 2',
      sub: 'ก้าวขึ้นสะดวก ปลอดภัย ผู้สูงอายุขึ้นง่าย',
      image: '/images/bus/bus-door.jpg',
      badge: 'ช่องทางขึ้นมาตรฐาน',
      description: 'ประตูเปิดระบบลมกว้างขวาง บันไดไม้ลายหรูหราพร้อมราวจับมั่นคง เชื่อมต่อระหว่างชั้น 1 และชั้น 2',
    },
    {
      id: 'side',
      name: 'มุมมองด้านข้าง ลวดลายอินทรีพรีเมียม',
      sub: 'โครงสร้าง 3 เพลา ทรงตัวนุ่มนวลทุกโค้ง',
      image: '/images/bus/bus-side.jpg',
      badge: 'ตัวถัง 3 เพลา',
      description: 'ช่วงล่างถุงลมมาตรฐานยุโรป นุ่มนวลตลอดการเดินทาง ลวดลายวิจิตรบรรจงเอกลักษณ์เมืองสองย่า ทรานสปอร์ต',
    },
    {
      id: 'rear',
      name: 'มุมมองด้านท้ายรถ ทรงสปอร์ต VIP',
      sub: 'ท่อไอเสียคู่ ระบบไฟเตือนนิรภัยครบครัน',
      image: '/images/bus/bus-rear.jpg',
      badge: 'ความปลอดภัยท้ายรถ',
      description: 'ระบบไฟส่องสว่าง LED เตือนระยะเบรก พร้อมกล้องมองหลังและเซนเซอร์แจ้งเตือนตลอดเวลา',
    },
    {
      id: 'fleet',
      name: 'ฟลีทรถเสริมในสังกัด (30-1822)',
      sub: 'พร้อมให้บริการพร้อมกันหลายคันสำหรับกรุ๊ปใหญ่',
      image: '/images/bus/bus-fleet-2.jpg',
      badge: 'รองรับกรุ๊ปใหญ่',
      description: 'มีรถในเครือข่ายสภาพใหม่พร้อมออกวิ่งคู่ขนาน รองรับคณะศึกษาดูงานและสัมมนากว่า 100-200 ท่านได้สบาย',
    },
  ];

  // Mouse move 3D tilt effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotY = (x / (rect.width / 2)) * 14;
    const rotX = -(y / (rect.height / 2)) * 10;
    setRotationY(rotY);
    setRotationX(rotX);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotationY(-6);
    setRotationX(3);
  };

  // Scroll rotation reactive effect
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      if (rect.top < windowHeight && rect.bottom > 0) {
        const progress = (windowHeight - rect.top) / (windowHeight + rect.height);
        const dynamicY = (progress - 0.5) * 16;
        setRotationY(dynamicY);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const activeAngle = angles[activeAngleIndex];

  return (
    <section className="py-20 sm:py-24 bg-white text-slate-800 relative overflow-hidden border-b border-emerald-50">
      {/* Subtle background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-emerald-50 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold mb-3 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>3D Interactive Showcase • สัมผัสรถจริงรอบคัน</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-emerald-950 tracking-tight">
            รถทัวร์ 2 ชั้น VIP <span className="emerald-gradient-text">เมืองสองย่า ทรานสปอร์ต</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            ภาพถ่ายจริงจากตัวรถคันจริง ทะเบียน 30-2542 ภูเก็ต สภาพใหม่ สะอาด หรูหราทุกมุมมอง
          </p>
        </div>

        {/* FREE VALUE-ADDED SERVICES BANNER (Clean White & Emerald) */}
        <div className="mb-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-900 via-emerald-850 to-emerald-950 text-white shadow-xl relative overflow-hidden">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 relative z-10">
            <div className="space-y-2 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400 text-emerald-950 text-xs font-extrabold">
                <Gift className="w-3.5 h-3.5" />
                <span>สิทธิพิเศษสุด Exclusive สำหรับลูกค้าเช่าเหมาคัน</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold font-heading text-white">
                ทางทัวร์จัดโปรแกรมทัวร์ & จองโรงแรมให้ <span className="text-amber-300">ฟรี ไม่มีค่าใช้จ่าย</span>
              </h3>
              <p className="text-xs sm:text-sm text-emerald-100 max-w-2xl leading-relaxed">
                เพียงแจ้งเส้นทางและวันที่ต้องการเดินทาง เจ้าของยินดีช่วยวางแผนกำหนดการ จุดแวะทานอาหาร จุดชมวิว 
                พร้อมช่วยประสานงานจองที่พักในราคากรุ๊ปพิเศษให้ท่านโดยไม่มีการบวกค่าบริการใดๆ ทั้งสิ้น
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full lg:w-auto shrink-0">
              <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">จัดโปรแกรมทัวร์ฟรี</div>
                  <div className="text-[11px] text-emerald-200">วางแผนเส้นทางมืออาชีพ</div>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-400/20 text-emerald-300 flex items-center justify-center shrink-0">
                  <Hotel className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">จองโรงแรมให้ฟรี</div>
                  <div className="text-[11px] text-emerald-200">ราคากรุ๊ปพิเศษสุดคุ้ม</div>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/20 text-white flex items-center justify-center shrink-0">
                  <Mic className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">คาราโอเกะฟรี</div>
                  <div className="text-[11px] text-emerald-200">ไมค์ลอย & Smart TV</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3D Visual Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: 3D Animated Vehicle Display */}
          <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            className="lg:col-span-8 relative [perspective:1400px] cursor-grab active:cursor-grabbing select-none"
          >
            {/* 3D Rotating Card Container */}
            <div
              style={{
                transform: `rotateY(${rotationY}deg) rotateX(${rotationX}deg) translateZ(20px)`,
                transition: isHovered ? 'none' : 'transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)',
                transformStyle: 'preserve-3d',
              }}
              className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-3xl overflow-hidden bg-slate-900 border border-slate-200 shadow-2xl group"
            >
              <img
                src={activeAngle.image}
                alt={activeAngle.name}
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-103"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-75" />

              {/* 3D Floating Badges */}
              <div
                style={{ transform: 'translateZ(45px)' }}
                className="absolute top-5 left-5 px-3.5 py-1.5 rounded-full bg-emerald-950/90 border border-emerald-500/50 backdrop-blur-md shadow-lg flex items-center gap-2"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-xs font-bold text-emerald-200">
                  {activeAngle.badge}
                </span>
              </div>

              {/* Bottom Caption on Card */}
              <div
                style={{ transform: 'translateZ(40px)' }}
                className="absolute bottom-5 left-5 right-5 flex items-end justify-between text-white"
              >
                <div>
                  <h3 className="text-lg sm:text-2xl font-bold font-heading drop-shadow">
                    {activeAngle.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-emerald-300 font-medium">
                    {activeAngle.sub}
                  </p>
                </div>
                <span className="text-[11px] text-slate-300 bg-slate-900/80 px-2.5 py-1 rounded-lg border border-slate-700 hidden sm:inline-flex items-center gap-1">
                  <RotateCw className="w-3.5 h-3.5 animate-spin" />
                  <span>เลื่อนหรือขยับเมาส์เพื่อหมุน 3D</span>
                </span>
              </div>
            </div>

            {/* Reflection on Floor */}
            <div className="w-3/4 mx-auto h-4 bg-gradient-to-r from-transparent via-emerald-500/15 to-transparent blur-md mt-2" />
          </div>

          {/* Right: Angle Controls & Spec Cards (Clean White Theme) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="p-5 rounded-2xl bg-slate-50 border border-emerald-100 shadow-sm">
              <h4 className="text-xs uppercase tracking-wider text-emerald-900 font-bold mb-3 flex items-center gap-2">
                <Compass className="w-4 h-4 text-emerald-700" />
                <span>เลือกชมมุมมองภายนอก & ภายในตัวรถ</span>
              </h4>

              <div className="space-y-2">
                {angles.map((ang, idx) => (
                  <button
                    key={ang.id}
                    onClick={() => setActiveAngleIndex(idx)}
                    className={`w-full p-3 rounded-xl text-left transition-all duration-200 flex items-center justify-between ${
                      activeAngleIndex === idx
                        ? 'bg-emerald-800 text-white shadow-md'
                        : 'bg-white border border-slate-200 text-slate-700 hover:border-emerald-300 hover:bg-emerald-50/50'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold">{ang.name}</div>
                      <div
                        className={`text-[11px] truncate max-w-[200px] ${
                          activeAngleIndex === idx ? 'text-emerald-200' : 'text-slate-500'
                        }`}
                      >
                        {ang.sub}
                      </div>
                    </div>
                    {activeAngleIndex === idx ? (
                      <CheckCircle2 className="w-4 h-4 text-amber-300 shrink-0" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Angle Description detail */}
            <div className="p-5 rounded-2xl bg-white border border-emerald-100 text-xs text-slate-600 leading-relaxed shadow-sm">
              <div className="text-emerald-900 font-bold mb-1.5 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>รายละเอียดจุดเด่น:</span>
              </div>
              <p>{activeAngle.description}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
