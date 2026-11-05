'use client';

import React, { useState } from 'react';
import {
  Send,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Users,
  CheckCircle2,
  Sparkles,
  PhoneCall,
  Clock,
  ShieldCheck,
  Hotel,
  Mic,
  Compass,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { trackFacebookEvent } from '@/lib/facebook';

interface ContactAndQuoteFormProps {
  initialSeatPreference?: string;
  initialSeatMode?: number;
  initialStartDate?: string;
  initialEndDate?: string;
  initialDurationText?: string;
  phones: { number: string; raw: string; label: string }[];
  lineUrl?: string;
  facebookPageUrl?: string;
}

export default function ContactAndQuoteForm({
  initialSeatPreference = '',
  initialSeatMode = 46,
  initialStartDate = '',
  initialEndDate = '',
  initialDurationText = '',
  phones,
  lineUrl,
  facebookPageUrl,
}: ContactAndQuoteFormProps) {
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    origin: 'ภูเก็ต',
    destination: '',
    travelDate: initialStartDate || '',
    returnDate: initialEndDate || '',
    passengerCount: 40,
    seatPreference: initialSeatPreference || `เช่าเหมาคันรุ่น ${initialSeatMode} ที่นั่ง VIP`,
    requestTourPlan: true,
    requestHotelBooking: true,
    requestKaraoke: true,
    notes: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  React.useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      seatPreference: initialSeatPreference || prev.seatPreference,
      travelDate: initialStartDate || prev.travelDate,
      returnDate: initialEndDate || prev.returnDate,
    }));
  }, [initialSeatPreference, initialStartDate, initialEndDate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.customerName || !formData.phone) {
      setErrorMsg('กรุณากรอกชื่อและเบอร์โทรศัพท์ติดต่อ');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          freeServices: {
            requestTourPlan: formData.requestTourPlan,
            requestHotelBooking: formData.requestHotelBooking,
            requestKaraoke: formData.requestKaraoke,
          },
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'เกิดข้อผิดพลาดในการส่งข้อมูล');
      }

      trackFacebookEvent('Lead', {
        content_name: 'CharterCoachQuote',
        destination: formData.destination,
        passenger_count: formData.passengerCount,
        seat_preference: formData.seatPreference,
        request_tour_plan: formData.requestTourPlan,
        request_hotel_booking: formData.requestHotelBooking,
      });

      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#047857', '#064E3B', '#10B981', '#F59E0B'],
        });
      } catch (cErr) {}

      setSubmitted(true);
    } catch (err: any) {
      setErrorMsg(err.message || 'ไม่สามารถส่งข้อมูลได้ กรุณาลองใหม่อีกครั้ง');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="quote-section" className="py-20 sm:py-24 bg-white text-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 items-start">
          {/* Left Column: Business Credentials & Direct Contacts */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold mb-3">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>ติดต่อเจ้าของสายตรง • เช็คคิวรถว่างฟรี</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-emerald-950 tracking-tight leading-tight">
                ขอใบเสนอราคาเช่าเหมาคัน & <br />
                <span className="emerald-gradient-text">ติดต่อเมืองสองย่า ทรานสปอร์ต</span>
              </h2>
              <p className="text-slate-600 text-sm sm:text-base mt-4 leading-relaxed">
                กรุณาระบุรายละเอียดเส้นทางและช่วงเวลาเดินทาง ทางเรายินดีคำนวณราคาเช่าเหมาคันที่คุ้มค่าที่สุด พร้อมช่วยจัดโปรแกรมทัวร์และติดต่อโรงแรมให้ฟรีครบวงจรครับ
              </p>
            </div>

            {/* Direct Phone Numbers Card */}
            <div className="p-6 rounded-3xl bg-slate-50 border border-emerald-100 shadow-clean space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-emerald-700" />
                <span>สายด่วนโทรสอบถาม 24 ชั่วโมง</span>
              </h3>

              <div className="space-y-3">
                {phones.map((phone) => (
                  <div
                    key={phone.raw}
                    className="flex items-center justify-between p-4 rounded-2xl bg-white border border-slate-200 hover:border-emerald-500 transition shadow-sm group"
                  >
                    <div>
                      <div className="text-xs text-slate-500 font-medium">{phone.label}</div>
                      <div className="text-lg font-extrabold text-emerald-950 group-hover:text-emerald-700 transition-colors">
                        {phone.number}
                      </div>
                    </div>
                    <a
                      href={`tel:${phone.raw}`}
                      onClick={() =>
                        trackFacebookEvent('Contact', { action: 'contact_section_call', phone: phone.raw })
                      }
                      className="px-4 py-2 rounded-xl emerald-gradient-btn text-white font-bold text-xs flex items-center gap-1.5 shadow"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>โทรออก</span>
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* LINE Official & QR Code Card */}
            <div className="p-6 rounded-3xl bg-slate-50 border border-[#06C755]/30 shadow-clean space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-950 flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#06C755]" />
                  <span>ติดต่อผ่าน LINE & QR Code</span>
                </h3>
                <span className="text-[11px] font-bold text-[#05963f] bg-[#06C755]/10 px-2.5 py-0.5 rounded-full">
                  สะดวก รวดเร็ว
                </span>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 bg-white p-4 rounded-2xl border border-slate-200">
                <div className="p-2 rounded-xl bg-white border border-slate-200 shadow-sm shrink-0">
                  <img
                    src="/images/line-qr.jpg"
                    alt="LINE QR Code บจก. เมืองสองย่า ทรานสปอร์ต"
                    className="w-28 h-28 object-contain rounded-lg"
                  />
                </div>
                <div className="space-y-2 text-center sm:text-left">
                  <div className="text-xs text-slate-600 leading-relaxed">
                    สแกน QR Code หรือกดปุ่มด้านล่างเพื่อแอดไลน์ ปรึกษาเส้นทางและรับคำนวณราคาเหมาคันได้ทันที
                  </div>
                  <a
                    href={lineUrl || 'https://line.me/ti/p/Q9W-e6nWz0'}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackFacebookEvent('Contact', { action: 'contact_section_line' })}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#06C755] hover:bg-[#05b34c] text-white font-bold text-xs shadow transition w-full sm:w-auto"
                  >
                    <span>เปิดแชท LINE (คลิกเพื่อคุย)</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Address & Office info */}
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 text-sm space-y-4">
              <div className="flex items-start gap-3 text-slate-600">
                <MapPin className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-emerald-950 block">
                    ห้างหุ้นส่วนจำกัด เมืองสองย่า ทรานสปอร์ต แอนด์ ทัวร์
                  </strong>
                  <span>ถ.เทพกระษัตรี ต.เทพกระษัตรี อ.ถลาง จ.ภูเก็ต 83110</span>
                  <div className="text-xs text-emerald-700 font-medium mt-1">
                    (ฐานจอดรถภูเก็ต พร้อมวิ่งบริการรับ-ส่ง และนำเที่ยวทั่วไทย)
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 text-slate-600 pt-2 border-t border-slate-200">
                <Clock className="w-5 h-5 text-emerald-700 shrink-0" />
                <span>พร้อมบริการตลอด 365 วัน • ปรึกษาเส้นทางฟรีไม่มีค่าใช้จ่าย</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Quote Request Form (Clean White Theme) */}
          <div className="lg:col-span-7">
            <div className="p-7 sm:p-9 rounded-3xl bg-white border border-emerald-100 shadow-clean relative">
              {submitted ? (
                <div className="py-12 text-center space-y-5 animate-fadeIn">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 border-2 border-emerald-600 text-emerald-700 flex items-center justify-center mx-auto shadow-md">
                    <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                  </div>
                  <h3 className="text-2xl font-bold font-heading text-emerald-950">
                    ส่งข้อมูลขอใบเสนอราคาสำเร็จ!
                  </h3>
                  <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                    ขอบพระคุณที่ไว้วางใจ{' '}
                    <strong className="text-emerald-900">
                      หจก. เมืองสองย่า ทรานสปอร์ต แอนด์ ทัวร์
                    </strong>
                    <br />
                    เจ้าของจะตรวจสอบเส้นทาง วันที่เดินทาง และบริการเสริมที่ท่านเลือก เพื่อโทรติดต่อกลับหาท่านที่เบอร์{' '}
                    <span className="text-emerald-950 font-bold">{formData.phone}</span> โดยเร็วที่สุดครับ
                  </p>

                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          customerName: '',
                          phone: '',
                          origin: 'ภูเก็ต',
                          destination: '',
                          travelDate: '',
                          returnDate: '',
                          passengerCount: 40,
                          seatPreference: `เช่าเหมาคันรุ่น 46 ที่นั่ง VIP`,
                          requestTourPlan: true,
                          requestHotelBooking: true,
                          requestKaraoke: true,
                          notes: '',
                        });
                      }}
                      className="px-6 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold"
                    >
                      ส่งคำขอใบเสนอราคาใหม่
                    </button>
                    <a
                      href={`tel:${phones[0]?.raw || '0964638443'}`}
                      className="px-6 py-2.5 rounded-xl emerald-gradient-btn text-xs font-bold flex items-center gap-2"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>โทรสอบถามด่วนเลย</span>
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                  <div className="border-b border-slate-100 pb-3 mb-2">
                    <h3 className="text-xl font-bold font-heading text-emerald-950 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-emerald-700" />
                      <span>ฟอร์มขอใบเสนอราคาเช่าเหมาคัน</span>
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      ระบุข้อมูลเพื่อให้เจ้าของคำนวณราคาเหมาคันที่ดีที่สุดให้ท่าน
                    </p>
                  </div>

                  {errorMsg && (
                    <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs">
                      {errorMsg}
                    </div>
                  )}

                  {/* Customer Name & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        ชื่อผู้ติดต่อ / หน่วยงาน / องค์กร <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.customerName}
                        onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                        placeholder="เช่น คุณสมศักดิ์ / โรงเรียนอนุบาลภูเก็ต"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-xs sm:text-sm focus:border-emerald-600 focus:bg-white focus:outline-none transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        เบอร์โทรศัพท์ติดต่อ <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="เช่น 08X-XXX-XXXX"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-xs sm:text-sm focus:border-emerald-600 focus:bg-white focus:outline-none transition"
                      />
                    </div>
                  </div>

                  {/* Origin & Destination */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        สถานที่ต้นทาง (จุดรับ)
                      </label>
                      <input
                        type="text"
                        value={formData.origin}
                        onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                        placeholder="เช่น จ.ภูเก็ต (สนามบิน / อ.ถลาง / ตัวเมือง)"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-xs sm:text-sm focus:border-emerald-600 focus:bg-white focus:outline-none transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        จุดหมายปลายทาง <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.destination}
                        onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                        placeholder="เช่น เชียงใหม่, เขาใหญ่, กทม., พัทยา"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-xs sm:text-sm focus:border-emerald-600 focus:bg-white focus:outline-none transition"
                      />
                    </div>
                  </div>

                  {/* Travel Date & Return Date */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        วันที่ออกเดินทาง (สามารถเลือกจากปฏิทินด้านบนได้)
                      </label>
                      <input
                        type="date"
                        value={formData.travelDate}
                        onChange={(e) => setFormData({ ...formData, travelDate: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm focus:border-emerald-600 focus:bg-white focus:outline-none transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        วันที่เดินทางกลับ
                      </label>
                      <input
                        type="date"
                        value={formData.returnDate}
                        onChange={(e) => setFormData({ ...formData, returnDate: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm focus:border-emerald-600 focus:bg-white focus:outline-none transition"
                      />
                    </div>
                  </div>

                  {/* Passenger Count & Seat Preference */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        จำนวนผู้โดยสารในคณะ (คน)
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="60"
                        value={formData.passengerCount}
                        onChange={(e) =>
                          setFormData({ ...formData, passengerCount: Number(e.target.value) })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm focus:border-emerald-600 focus:bg-white focus:outline-none transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        ขนาดรถเหมาคันที่สนใจ
                      </label>
                      <input
                        type="text"
                        value={formData.seatPreference}
                        onChange={(e) =>
                          setFormData({ ...formData, seatPreference: e.target.value })
                        }
                        placeholder="เช่น เช่าเหมาคันรุ่น 46 ที่นั่ง VIP"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm focus:border-emerald-600 focus:bg-white focus:outline-none transition"
                      />
                    </div>
                  </div>

                  {/* FREE VALUE-ADDED SERVICES CHECKBOXES */}
                  <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-3">
                    <div className="flex items-center gap-2 text-emerald-900 text-xs font-bold uppercase tracking-wider">
                      <Sparkles className="w-4 h-4 text-emerald-700" />
                      <span>บริการเสริมพิเศษฟรี ไม่มีค่าใช้จ่าย (เลือกได้ตามต้องการ):</span>
                    </div>

                    <label className="flex items-start gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={formData.requestTourPlan}
                        onChange={(e) =>
                          setFormData({ ...formData, requestTourPlan: e.target.checked })
                        }
                        className="w-4 h-4 mt-0.5 rounded text-emerald-700 accent-emerald-700 cursor-pointer"
                      />
                      <div className="text-xs">
                        <span className="font-bold text-slate-900 group-hover:text-emerald-800 transition-colors flex items-center gap-1.5">
                          <Compass className="w-3.5 h-3.5 text-emerald-700" />
                          <span>ต้องการให้ทางทัวร์ช่วยจัดโปรแกรมทัวร์ให้ฟรี (Custom Itinerary Planning)</span>
                        </span>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          เจ้าของช่วยแนะนำจุดแวะพัก จุดท่องเที่ยว และร้านอาหารยอดนิยมตลอดเส้นทางฟรี
                        </p>
                      </div>
                    </label>

                    <label className="flex items-start gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={formData.requestHotelBooking}
                        onChange={(e) =>
                          setFormData({ ...formData, requestHotelBooking: e.target.checked })
                        }
                        className="w-4 h-4 mt-0.5 rounded text-emerald-700 accent-emerald-700 cursor-pointer"
                      />
                      <div className="text-xs">
                        <span className="font-bold text-slate-900 group-hover:text-emerald-800 transition-colors flex items-center gap-1.5">
                          <Hotel className="w-3.5 h-3.5 text-emerald-700" />
                          <span>ต้องการให้ช่วยประสานงานจองโรงแรม / ที่พักให้ฟรี (Hotel Booking Assistance)</span>
                        </span>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          ช่วยประสานงานที่พักสำหรับกรุ๊ปทัวร์ในราคาพิเศษ ไม่มีบวกค่าหัวคิวใดๆ
                        </p>
                      </div>
                    </label>

                    <label className="flex items-start gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={formData.requestKaraoke}
                        onChange={(e) =>
                          setFormData({ ...formData, requestKaraoke: e.target.checked })
                        }
                        className="w-4 h-4 mt-0.5 rounded text-emerald-700 accent-emerald-700 cursor-pointer"
                      />
                      <div className="text-xs">
                        <span className="font-bold text-slate-900 group-hover:text-emerald-800 transition-colors flex items-center gap-1.5">
                          <Mic className="w-3.5 h-3.5 text-emerald-700" />
                          <span>ขอรับบริการคาราโอเกะ ไมค์ลอย และจอ Smart TV ฟรีตลอดทริป</span>
                        </span>
                      </div>
                    </label>
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      รายละเอียดเพิ่มเติม / จุดแวะพัก / โรงแรมที่ต้องการ
                    </label>
                    <textarea
                      rows={2}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="เช่น มีผู้สูงอายุในคณะ, ต้องการห้องพัก 15 ห้อง, จุดพักทานอาหารเช้า ฯลฯ"
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-xs sm:text-sm focus:border-emerald-600 focus:bg-white focus:outline-none transition"
                    />
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-xl emerald-gradient-btn text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow active:scale-98 transition disabled:opacity-50 cursor-pointer"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>กำลังส่งข้อมูล...</span>
                      </span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>กดส่งข้อมูลขอใบเสนอราคาเช่าเหมาคัน (ประเมินราคาฟรี)</span>
                      </>
                    )}
                  </button>

                  <div className="text-center text-[11px] text-slate-500 flex items-center justify-center gap-1.5 pt-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>ข้อมูลของท่านจะถูกส่งตรงถึงเจ้าของรถ ปลอดภัย ไม่มีการเปิดเผยต่อบุคคลภายนอก</span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
