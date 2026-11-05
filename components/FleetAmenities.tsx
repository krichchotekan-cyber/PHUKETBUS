'use client';

import React, { useState } from 'react';
import {
  Armchair,
  Tv,
  Zap,
  Bath,
  FileCheck,
  ShieldCheck,
  Wind,
  Image as ImageIcon,
  ChevronRight,
  Maximize2,
  X,
  Sparkles,
} from 'lucide-react';
import { GalleryItem, Amenity } from '@/lib/db';

interface FleetAmenitiesProps {
  amenities: Amenity[];
  gallery: GalleryItem[];
}

export default function FleetAmenities({ amenities, gallery }: FleetAmenitiesProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [previewImage, setPreviewImage] = useState<GalleryItem | null>(null);

  const categories = [
    { id: 'all', label: 'ทั้งหมด' },
    { id: 'exterior', label: 'ภายนอกตัวรถ' },
    { id: 'interior', label: 'ห้องโดยสาร VIP' },
    { id: 'entertainment', label: 'ความบันเทิง & แสงสี' },
    { id: 'trips', label: 'บรรยากาศทริปจริง' },
  ];

  const filteredGallery =
    activeCategory === 'all'
      ? gallery
      : gallery.filter((item) => item.category === activeCategory);

  const getAmenityIcon = (iconName: string) => {
    switch (iconName) {
      case 'Armchair':
        return <Armchair className="w-6 h-6 text-emerald-700" />;
      case 'Tv':
        return <Tv className="w-6 h-6 text-emerald-700" />;
      case 'Zap':
        return <Zap className="w-6 h-6 text-emerald-700" />;
      case 'Bath':
        return <Bath className="w-6 h-6 text-emerald-700" />;
      case 'FileCheck':
        return <FileCheck className="w-6 h-6 text-emerald-700" />;
      case 'Wind':
        return <Wind className="w-6 h-6 text-emerald-700" />;
      default:
        return <ShieldCheck className="w-6 h-6 text-emerald-700" />;
    }
  };

  return (
    <section id="amenities" className="py-20 sm:py-24 bg-white text-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold mb-3">
            <Armchair className="w-4 h-4 text-emerald-700" />
            <span>มาตรฐานอุปกรณ์ & ความสะดวกสบายระดับ VIP</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-emerald-950 tracking-tight">
            สิ่งอำนวยความสะดวกบนรถ & <span className="emerald-gradient-text">แกลเลอรีภาพถ่ายจริง</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            สัมผัสประสบการณ์เดินทางเหนือระดับ รถสภาพใหม่ ตรวจเช็คความพร้อมก่อนออกเดินทางทุกครั้ง
          </p>
        </div>

        {/* 6 Amenities Grid (Clean White Theme) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {amenities.map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-2xl bg-white border border-emerald-100 hover:border-emerald-300 hover:shadow-clean-hover transition-all duration-300 group shadow-clean"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                {getAmenityIcon(item.icon)}
              </div>
              <h3 className="text-lg font-bold font-heading text-emerald-950 group-hover:text-emerald-700 transition-colors">
                {item.title}
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm mt-2 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Gallery Section */}
        <div id="gallery" className="pt-10 border-t border-slate-100">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
            <div>
              <h3 className="text-2xl font-bold font-heading text-emerald-950 flex items-center gap-2">
                <ImageIcon className="w-6 h-6 text-emerald-700" />
                <span>ภาพถ่ายตัวรถ & บรรยากาศจริง</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                คลิกที่รูปภาพเพื่อเปิดชมภาพขยาย
              </p>
            </div>

            {/* Category filter buttons */}
            <div className="flex flex-wrap gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    activeCategory === cat.id
                      ? 'bg-emerald-800 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Photo Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGallery.map((item) => (
              <div
                key={item.id}
                onClick={() => setPreviewImage(item)}
                className="group relative rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-sm cursor-pointer transform hover:-translate-y-1 transition-all duration-300"
              >
                <div className="aspect-[4/3] w-full overflow-hidden bg-slate-200">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-75 group-hover:opacity-90 transition-opacity" />

                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <div className="flex items-center justify-between text-xs text-amber-300 font-medium mb-1">
                    <span className="uppercase tracking-wider">{item.category}</span>
                    <Maximize2 className="w-4 h-4 text-white/80 group-hover:text-amber-300 transition-colors" />
                  </div>
                  <h4 className="text-sm font-bold text-white group-hover:text-amber-200 transition-colors line-clamp-1">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-slate-200 line-clamp-2 mt-1">
                    {item.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {previewImage && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setPreviewImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-white rounded-2xl overflow-hidden border border-emerald-200 shadow-2xl"
          >
            <button
              onClick={() => setPreviewImage(null)}
              aria-label="ปิดรูปภาพ"
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-950/80 text-white hover:bg-emerald-800 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="max-h-[70vh] bg-black flex items-center justify-center overflow-hidden">
              <img
                src={previewImage.imageUrl}
                alt={previewImage.title}
                className="max-h-[70vh] w-auto object-contain"
              />
            </div>

            <div className="p-5 bg-white border-t border-slate-100">
              <div className="text-xs uppercase tracking-wider text-emerald-700 font-bold mb-1">
                {previewImage.category}
              </div>
              <h3 className="text-lg font-bold text-slate-900">{previewImage.title}</h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                {previewImage.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
