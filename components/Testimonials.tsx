'use client';

import React from 'react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';
import { Testimonial } from '@/lib/db';

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export default function Testimonials({ testimonials }: TestimonialsProps) {
  return (
    <section id="testimonials" className="py-20 sm:py-24 bg-slate-50 text-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-900 text-xs font-semibold mb-3">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
            <span>เสียงตอบรับ & ความประทับใจจริงจากลูกค้า</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-emerald-950 tracking-tight">
            การันตีความพึงพอใจ <span className="emerald-gradient-text block sm:inline mt-1 sm:mt-0">จากกรุ๊ปทัวร์ทั่วไทย</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            ความปลอดภัยและรอยยิ้มของท่าน คือความภาคภูมิใจสูงสุดของทีมงานเมืองสองย่า ทรานสปอร์ต
          </p>
        </div>

        {/* Testimonials Grid (Clean White Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="p-7 sm:p-8 rounded-3xl bg-white border border-emerald-100 shadow-clean hover:shadow-clean-hover transition-all duration-300 flex flex-col justify-between relative group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {Array.from({ length: item.rating || 5 }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-emerald-100 group-hover:text-emerald-200 transition-colors" />
                </div>

                <p className="text-slate-700 text-sm leading-relaxed mb-6 italic">
                  "{item.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center justify-center font-bold text-sm">
                    {item.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-emerald-950 flex items-center gap-1.5">
                      <span>{item.name}</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    </div>
                    <div className="text-xs text-slate-500">{item.organization}</div>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between text-[11px] text-emerald-800 bg-emerald-50/70 px-3 py-1.5 rounded-xl border border-emerald-100">
                  <span className="truncate max-w-[200px]">ทริป: {item.trip}</span>
                  <span className="text-slate-500">{item.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
