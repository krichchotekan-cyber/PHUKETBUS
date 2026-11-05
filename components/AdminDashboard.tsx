'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Bus,
  LayoutDashboard,
  Settings,
  Users,
  Image as ImageIcon,
  Share2,
  PhoneCall,
  Search,
  Filter,
  CheckCircle,
  Clock,
  Trash2,
  Plus,
  Save,
  LogOut,
  ExternalLink,
  ShieldCheck,
  Star,
  Check,
  Sparkles,
  Layers,
  HelpCircle,
  Eye,
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  Wrench,
  Send,
  Bell,
  MessageSquare,
  RefreshCw,
} from 'lucide-react';
import {
  DatabaseSchema,
  SiteSettings,
  Inquiry,
  GalleryItem,
  Testimonial,
  CalendarEvent,
} from '@/lib/db';

interface AdminDashboardProps {
  initialData: DatabaseSchema;
}

export default function AdminDashboard({ initialData }: AdminDashboardProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<
    'inquiries' | 'calendar' | 'settings' | 'fleet' | 'gallery' | 'seo'
  >('inquiries');

  const [settings, setSettings] = useState<SiteSettings>(initialData.settings);
  const [inquiries, setInquiries] = useState<Inquiry[]>(initialData.inquiries || []);
  const [gallery, setGallery] = useState<GalleryItem[]>(initialData.gallery || []);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(
    initialData.testimonials || []
  );
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>(
    initialData.calendarEvents || []
  );

  const [saveStatus, setSaveStatus] = useState<string>('');
  const [inquirySearch, setInquirySearch] = useState('');
  const [inquiryStatusFilter, setInquiryStatusFilter] = useState('all');

  // Calendar month state
  const today = new Date();
  const [calMonth, setCalMonth] = useState<number>(today.getMonth());
  const [calYear, setCalYear] = useState<number>(today.getFullYear());

  // Form state for adding new calendar booking
  const [newEvent, setNewEvent] = useState({
    title: '',
    startDate: '',
    endDate: '',
    customerName: '',
    phone: '',
    status: 'booked' as 'booked' | 'maintenance' | 'tentative',
    notes: '',
  });

  // Form states for new gallery and reviews
  const [newGalleryItem, setNewGalleryItem] = useState({
    title: '',
    category: 'exterior' as 'exterior' | 'interior' | 'entertainment' | 'trips',
    imageUrl: '',
    caption: '',
  });

  const [newReviewItem, setNewReviewItem] = useState({
    name: '',
    organization: '',
    rating: 5,
    comment: '',
    trip: '',
    date: 'เร็วๆ นี้',
  });

  // Handle Logout
  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  // Save Settings
  const handleSaveSettings = async () => {
    setSaveStatus('กำลังบันทึก...');
    try {
      const pageId = settings.seo?.facebookPageId || settings.facebookPageId;
      const payload = {
        ...settings,
        facebookPageId: pageId,
        seo: {
          ...settings.seo,
          facebookPageId: pageId,
        },
      };

      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setSaveStatus('บันทึกข้อมูลเรียบร้อยแล้ว');
        setTimeout(() => setSaveStatus(''), 3000);
      } else {
        setSaveStatus('เกิดข้อผิดพลาดในการบันทึก');
      }
    } catch {
      setSaveStatus('เกิดข้อผิดพลาดในการเชื่อมต่อ');
    }
  };

  const [telegramStatus, setTelegramStatus] = useState<string>('');
  const [telegramLoading, setTelegramLoading] = useState<boolean>(false);

  const handleDetectTelegram = async () => {
    setTelegramLoading(true);
    setTelegramStatus('กำลังตรวจสอบข้อความจาก Telegram...');
    try {
      const res = await fetch('/api/telegram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'detect',
          botToken: settings.telegram?.botToken || '9260423736:AAHxrewFut_-_39ehaR3I8wwmDms9PJsXw0',
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSettings((prev) => ({
          ...prev,
          telegram: {
            botToken: prev.telegram?.botToken || '9260423736:AAHxrewFut_-_39ehaR3I8wwmDms9PJsXw0',
            chatId: data.chatId,
            enabled: true,
          },
        }));
        setTelegramStatus(`✅ ตรวจพบและบันทึก Chat ID: ${data.chatId} เรียบร้อยแล้ว!`);
      } else {
        setTelegramStatus(`⚠️ ${data.error || 'ไม่พบข้อความ กรุณากด Start ที่ @Phuketbusbot ก่อน'}`);
      }
    } catch (e: any) {
      setTelegramStatus(`❌ เกิดข้อผิดพลาด: ${e.message}`);
    } finally {
      setTelegramLoading(false);
    }
  };

  const handleTestTelegram = async () => {
    setTelegramLoading(true);
    setTelegramStatus('กำลังส่งข้อความทดสอบไปยัง Telegram...');
    try {
      const res = await fetch('/api/telegram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'test',
          botToken: settings.telegram?.botToken || '9260423736:AAHxrewFut_-_39ehaR3I8wwmDms9PJsXw0',
          chatId: settings.telegram?.chatId,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setTelegramStatus('✅ ส่งข้อความทดสอบสำเร็จ! ตรวจสอบใน Telegram ได้ทันที');
      } else {
        setTelegramStatus(`⚠️ ${data.error || 'ไม่สามารถส่งข้อความได้'}`);
      }
    } catch (e: any) {
      setTelegramStatus(`❌ เกิดข้อผิดพลาด: ${e.message}`);
    } finally {
      setTelegramLoading(false);
    }
  };

  // Facebook Feed & CAPI testing states
  const [fbFeedLoading, setFbFeedLoading] = useState<boolean>(false);
  const [fbFeedStatus, setFbFeedStatus] = useState<string>('');
  const [fbCapiLoading, setFbCapiLoading] = useState<boolean>(false);
  const [fbCapiStatus, setFbCapiStatus] = useState<string>('');
  const [fbTestCode, setFbTestCode] = useState<string>('');

  const handleTestFacebookFeed = async () => {
    setFbFeedLoading(true);
    setFbFeedStatus('กำลังเชื่อมต่อไปยัง Facebook Graph API เพื่อดึงโพสต์ล่าสุด...');
    try {
      const pageId = settings.seo?.facebookPageId || settings.facebookPageId || '';
      const token = settings.seo?.facebookAccessToken || '';
      const url = `/api/facebook/feed?test=true&pageId=${encodeURIComponent(
        pageId
      )}&token=${encodeURIComponent(token)}`;

      const res = await fetch(url);
      const data = await res.json();

      if (res.ok && data.success) {
        setFbFeedStatus(`✅ ${data.message}`);
      } else {
        setFbFeedStatus(`⚠️ ${data.error || 'ไม่สามารถดึงโพสต์จาก Facebook ได้'}`);
      }
    } catch (e: any) {
      setFbFeedStatus(`❌ เกิดข้อผิดพลาด: ${e.message}`);
    } finally {
      setFbFeedLoading(false);
    }
  };

  const handleTestFacebookCapi = async () => {
    setFbCapiLoading(true);
    setFbCapiStatus('กำลังส่ง Event ทดสอบไปยัง Facebook Conversions API...');
    try {
      const res = await fetch('/api/facebook/capi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          testMode: true,
          eventName: 'Lead',
          testEventCode: fbTestCode.trim() || undefined,
          customPixelId: settings.seo?.facebookPixelId,
          customAccessToken: settings.seo?.facebookAccessToken,
          phone: '0964638443',
          customData: {
            content_name: 'Test Event from PhuketBus Admin',
            status: 'verified_from_admin',
          },
        }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        const trace = data.fbTraceId ? ` (Trace ID: ${data.fbTraceId})` : '';
        setFbCapiStatus(`✅ ส่ง Event สำเร็จ! Meta ได้รับแล้ว ${data.eventsReceived || 1} Event${trace}`);
      } else {
        setFbCapiStatus(`⚠️ ${data.error || 'ส่งข้อมูลไปยัง CAPI ไม่สำเร็จ กรุณาตรวจสอบ Pixel ID หรือ Access Token'}`);
      }
    } catch (e: any) {
      setFbCapiStatus(`❌ เกิดข้อผิดพลาด: ${e.message}`);
    } finally {
      setFbCapiLoading(false);
    }
  };

  // Update Inquiry Status or Note
  const handleUpdateInquiry = async (
    id: string,
    status?: Inquiry['status'],
    adminNotes?: string
  ) => {
    try {
      const res = await fetch('/api/inquiries', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status, adminNotes }),
      });
      if (res.ok) {
        const { inquiry } = await res.json();
        setInquiries((prev) => prev.map((item) => (item.id === id ? inquiry : item)));
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Delete Inquiry
  const handleDeleteInquiry = async (id: string) => {
    if (!confirm('ต้องการลบรายการนี้ใช่หรือไม่?')) return;
    try {
      const res = await fetch(`/api/inquiries?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setInquiries((prev) => prev.filter((item) => item.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Add Calendar Event
  const handleAddCalendarEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEvent.title || !newEvent.startDate || !newEvent.endDate) {
      alert('กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }
    try {
      const res = await fetch('/api/calendar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEvent),
      });
      if (res.ok) {
        const { event } = await res.json();
        setCalendarEvents((prev) => [...prev, event]);
        setNewEvent({
          title: '',
          startDate: '',
          endDate: '',
          customerName: '',
          phone: '',
          status: 'booked',
          notes: '',
        });
        alert('เพิ่มคิวงานลงปฏิทินเรียบร้อยแล้ว');
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Delete Calendar Event
  const handleDeleteCalendarEvent = async (id: string) => {
    if (!confirm('ต้องการลบคิวงานนี้ออกจากปฏิทินใช่หรือไม่?')) return;
    try {
      const res = await fetch(`/api/calendar?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setCalendarEvents((prev) => prev.filter((e) => e.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  // One-click add inquiry to calendar
  const handleInquiryToCalendar = async (inq: Inquiry) => {
    if (!inq.travelDate) {
      alert('คำขอนี้ไม่ได้ระบุวันเดินทาง');
      return;
    }
    const title = `ทริป: ${inq.destination} (${inq.customerName})`;
    const payload = {
      title,
      startDate: inq.travelDate,
      endDate: inq.returnDate || inq.travelDate,
      customerName: inq.customerName,
      phone: inq.phone,
      status: 'booked',
      notes: `เหมาคัน: ${inq.seatPreference} / ${inq.notes || ''}`,
    };

    try {
      const res = await fetch('/api/calendar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        const { event } = await res.json();
        setCalendarEvents((prev) => [...prev, event]);
        handleUpdateInquiry(inq.id, 'booked');
        alert('บันทึกคิวงานลงปฏิทินและเปลี่ยนสถานะเป็น "จองสำเร็จ" เรียบร้อยแล้วครับ');
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Gallery CRUD
  const handleAddGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGalleryItem.title || !newGalleryItem.imageUrl) return;
    try {
      const res = await fetch('/api/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newGalleryItem),
      });
      if (res.ok) {
        const { item } = await res.json();
        setGallery((prev) => [...prev, item]);
        setNewGalleryItem({
          title: '',
          category: 'exterior',
          imageUrl: '',
          caption: '',
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteGallery = async (id: string) => {
    if (!confirm('ต้องการลบรูปภาพนี้ใช่หรือไม่?')) return;
    try {
      const res = await fetch(`/api/gallery?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setGallery((prev) => prev.filter((item) => item.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Testimonials CRUD
  const handleAddReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewItem.name || !newReviewItem.comment) return;
    try {
      const res = await fetch('/api/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newReviewItem),
      });
      if (res.ok) {
        const { item } = await res.json();
        setTestimonials((prev) => [...prev, item]);
        setNewReviewItem({
          name: '',
          organization: '',
          rating: 5,
          comment: '',
          trip: '',
          date: 'เร็วๆ นี้',
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteReview = async (id: string) => {
    if (!confirm('ต้องการลบรีวิวนี้ใช่หรือไม่?')) return;
    try {
      const res = await fetch(`/api/testimonials?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setTestimonials((prev) => prev.filter((item) => item.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Filter inquiries
  const filteredInquiries = inquiries.filter((inq) => {
    const matchesSearch =
      inq.customerName.toLowerCase().includes(inquirySearch.toLowerCase()) ||
      inq.phone.includes(inquirySearch) ||
      inq.destination.toLowerCase().includes(inquirySearch.toLowerCase());
    const matchesStatus =
      inquiryStatusFilter === 'all' || inq.status === inquiryStatusFilter;
    return matchesSearch && matchesStatus;
  });

  // Calendar calculations
  const monthNamesThai = [
    'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
    'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม',
  ];
  const firstDay = new Date(calYear, calMonth, 1).getDay();
  const daysCount = new Date(calYear, calMonth + 1, 0).getDate();

  const getEventsForDate = (dateStr: string) => {
    return calendarEvents.filter(
      (e) => dateStr >= e.startDate && dateStr <= e.endDate
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Top Admin Navbar */}
      <header className="bg-slate-900 border-b border-emerald-900/80 px-4 sm:px-6 py-3.5 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gold-500 text-emerald-950 flex items-center justify-center font-bold">
            <Bus className="w-5 h-5" />
          </div>
          <div>
            <div className="font-heading font-extrabold text-white text-sm sm:text-base flex items-center gap-2">
              <span>เมืองสองย่า CMS</span>
              <span className="text-[10px] bg-emerald-900/80 text-emerald-300 px-2 py-0.5 rounded border border-emerald-700">
                Admin Panel
              </span>
            </div>
            <div className="text-[11px] text-slate-400">
              หจก. เมืองสองย่า ทรานสปอร์ต แอนด์ ทัวร์ ภูเก็ต
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/"
            target="_blank"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition"
          >
            <Eye className="w-3.5 h-3.5 text-emerald-400" />
            <span>ดูหน้าเว็บจริง</span>
          </a>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-950/70 border border-rose-800 text-rose-300 hover:bg-rose-900 text-xs font-semibold transition"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>ออกจากระบบ</span>
          </button>
        </div>
      </header>

      {/* Main Admin Content */}
      <div className="flex-1 flex flex-col md:flex-row max-w-7xl w-full mx-auto p-4 sm:p-6 gap-6">
        {/* Sidebar Navigation */}
        <aside className="w-full md:w-64 bg-slate-900/90 rounded-2xl border border-emerald-900/60 p-3 sm:p-4 shrink-0 h-fit space-y-1">
          <button
            onClick={() => setActiveTab('inquiries')}
            className={`w-full flex items-center justify-between p-3 rounded-xl text-xs sm:text-sm font-semibold transition ${
              activeTab === 'inquiries'
                ? 'bg-gold-500 text-emerald-950 font-bold shadow'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Users className="w-4 h-4" />
              <span>รายการขอใบเสนอราคา</span>
            </div>
            {inquiries.filter((i) => i.status === 'pending').length > 0 && (
              <span className="w-5 h-5 rounded-full bg-rose-600 text-white text-[10px] flex items-center justify-center font-bold">
                {inquiries.filter((i) => i.status === 'pending').length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('calendar')}
            className={`w-full flex items-center gap-2.5 p-3 rounded-xl text-xs sm:text-sm font-semibold transition ${
              activeTab === 'calendar'
                ? 'bg-gold-500 text-emerald-950 font-bold shadow'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <CalendarIcon className="w-4 h-4" />
            <span>ปฏิทินจัดการคิวรถ</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-2.5 p-3 rounded-xl text-xs sm:text-sm font-semibold transition ${
              activeTab === 'settings'
                ? 'bg-gold-500 text-emerald-950 font-bold shadow'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>ข้อมูลทั่วไป & สโลแกน</span>
          </button>

          <button
            onClick={() => setActiveTab('fleet')}
            className={`w-full flex items-center gap-2.5 p-3 rounded-xl text-xs sm:text-sm font-semibold transition ${
              activeTab === 'fleet'
                ? 'bg-gold-500 text-emerald-950 font-bold shadow'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Bus className="w-4 h-4" />
            <span>ผังที่นั่ง & ขนาดรถ</span>
          </button>

          <button
            onClick={() => setActiveTab('gallery')}
            className={`w-full flex items-center gap-2.5 p-3 rounded-xl text-xs sm:text-sm font-semibold transition ${
              activeTab === 'gallery'
                ? 'bg-gold-500 text-emerald-950 font-bold shadow'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>แกลเลอรี & รีวิว</span>
          </button>

          <button
            onClick={() => setActiveTab('seo')}
            className={`w-full flex items-center gap-2.5 p-3 rounded-xl text-xs sm:text-sm font-semibold transition ${
              activeTab === 'seo'
                ? 'bg-gold-500 text-emerald-950 font-bold shadow'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Share2 className="w-4 h-4" />
            <span>SEO & Facebook API</span>
          </button>
        </aside>

        {/* Tab View Area */}
        <main className="flex-1 min-w-0">
          {/* TAB 1: Inquiries / Leads */}
          {activeTab === 'inquiries' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900 border border-emerald-900/60">
                <div>
                  <h2 className="text-xl font-bold font-heading text-white">
                    รายการขอใบเสนอราคา ({filteredInquiries.length})
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    รายชื่อลูกค้าที่ติดต่อขอใบเสนอราคาผ่านหน้าเว็บไซต์
                  </p>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                  <div className="relative flex-1 sm:w-48">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="ค้นหาชื่อ, เบอร์, ปลายทาง..."
                      value={inquirySearch}
                      onChange={(e) => setInquirySearch(e.target.value)}
                      className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-gold-500"
                    />
                  </div>

                  <select
                    value={inquiryStatusFilter}
                    onChange={(e) => setInquiryStatusFilter(e.target.value)}
                    className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none"
                  >
                    <option value="all">ทุกสถานะ</option>
                    <option value="pending">รอติดต่อกลับ</option>
                    <option value="contacted">ติดต่อแล้ว</option>
                    <option value="quoted">เสนอราคาแล้ว</option>
                    <option value="booked">จองสำเร็จ</option>
                    <option value="cancelled">ยกเลิก</option>
                  </select>
                </div>
              </div>

              {/* Inquiry List */}
              {filteredInquiries.length === 0 ? (
                <div className="p-12 text-center rounded-2xl bg-slate-900 border border-slate-800 text-slate-400 text-xs sm:text-sm">
                  ไม่พบรายการขอใบเสนอราคา
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredInquiries.map((inq) => (
                    <div
                      key={inq.id}
                      className="p-5 sm:p-6 rounded-2xl bg-slate-900 border border-emerald-900/60 hover:border-gold-500/50 transition-all shadow-lg space-y-4"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-base font-bold text-white">
                              {inq.customerName}
                            </h3>
                            <span
                              className={`text-[11px] px-2.5 py-0.5 rounded-full font-bold ${
                                inq.status === 'pending'
                                  ? 'bg-amber-950 text-amber-300 border border-amber-700'
                                  : inq.status === 'contacted'
                                  ? 'bg-blue-950 text-blue-300 border border-blue-700'
                                  : inq.status === 'quoted'
                                  ? 'bg-purple-950 text-purple-300 border border-purple-700'
                                  : inq.status === 'booked'
                                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-700'
                                  : 'bg-slate-800 text-slate-400'
                              }`}
                            >
                              {inq.status === 'pending'
                                ? 'รอติดต่อกลับ'
                                : inq.status === 'contacted'
                                ? 'ติดต่อแล้ว'
                                : inq.status === 'quoted'
                                ? 'เสนอราคาแล้ว'
                                : inq.status === 'booked'
                                ? 'จองสำเร็จ'
                                : 'ยกเลิก'}
                            </span>
                          </div>
                          <div className="text-[11px] text-slate-400 mt-1">
                            ส่งคำขอเมื่อ: {new Date(inq.createdAt).toLocaleString('th-TH')}
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                          <a
                            href={`tel:${inq.phone.replace(/[^0-9]/g, '')}`}
                            className="px-3 py-1.5 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-emerald-100 font-bold text-xs flex items-center gap-1.5 shadow"
                          >
                            <PhoneCall className="w-3.5 h-3.5" />
                            <span>โทร {inq.phone}</span>
                          </a>

                          {inq.travelDate && (
                            <button
                              onClick={() => handleInquiryToCalendar(inq)}
                              className="px-3 py-1.5 rounded-lg bg-gold-500 hover:bg-gold-400 text-emerald-950 font-bold text-xs flex items-center gap-1 shadow"
                              title="ล็อคคิวลงปฏิทินรถทันที"
                            >
                              <CalendarIcon className="w-3.5 h-3.5" />
                              <span>ลงปฏิทิน</span>
                            </button>
                          )}

                          <select
                            value={inq.status}
                            onChange={(e) =>
                              handleUpdateInquiry(
                                inq.id,
                                e.target.value as Inquiry['status']
                              )
                            }
                            className="px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none"
                          >
                            <option value="pending">รอติดต่อกลับ</option>
                            <option value="contacted">ติดต่อแล้ว</option>
                            <option value="quoted">เสนอราคาแล้ว</option>
                            <option value="booked">จองสำเร็จ</option>
                            <option value="cancelled">ยกเลิก</option>
                          </select>

                          <button
                            onClick={() => handleDeleteInquiry(inq.id)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-950/50"
                            title="ลบรายการ"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Inquiry Details Grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                        <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                          <span className="text-slate-400 block text-[11px]">ต้นทาง:</span>
                          <span className="font-semibold text-white">{inq.origin}</span>
                        </div>
                        <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                          <span className="text-slate-400 block text-[11px]">ปลายทาง:</span>
                          <span className="font-semibold text-gold-300">{inq.destination}</span>
                        </div>
                        <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                          <span className="text-slate-400 block text-[11px]">วันเดินทาง:</span>
                          <span className="font-semibold text-white">
                            {inq.travelDate || '-'} ถึง {inq.returnDate || '-'}
                          </span>
                        </div>
                        <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                          <span className="text-slate-400 block text-[11px]">ผู้โดยสาร / ผัง:</span>
                          <span className="font-semibold text-white">
                            {inq.passengerCount} คน ({inq.seatPreference})
                          </span>
                        </div>
                      </div>

                      {/* Free Service Badges */}
                      {inq.freeServices && (
                        <div className="flex flex-wrap items-center gap-2 text-[11px]">
                          <span className="text-slate-400">บริการเสริมที่ขอ:</span>
                          {inq.freeServices.requestTourPlan && (
                            <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 font-medium">
                              🗺️ ให้จัดทริปฟรี
                            </span>
                          )}
                          {inq.freeServices.requestHotelBooking && (
                            <span className="px-2 py-0.5 rounded-full bg-blue-950 text-blue-300 border border-blue-800 font-medium">
                              🏨 ช่วยจองโรงแรมฟรี
                            </span>
                          )}
                          {inq.freeServices.requestKaraoke && (
                            <span className="px-2 py-0.5 rounded-full bg-purple-950 text-purple-300 border border-purple-800 font-medium">
                              🎤 คาราโอเกะฟรี
                            </span>
                          )}
                        </div>
                      )}

                      {inq.notes && (
                        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300">
                          <strong className="text-slate-400 block mb-0.5">รายละเอียดเพิ่มเติมจากลูกค้า:</strong>
                          {inq.notes}
                        </div>
                      )}

                      {/* Admin Note Input */}
                      <div className="flex items-center gap-2 pt-1">
                        <input
                          type="text"
                          placeholder="บันทึกช่วยจำของเจ้าของ (เช่น เสนอราคาไป 38,000 บาท แนะนำโรงแรมให้อ่าวนาง)..."
                          defaultValue={inq.adminNotes || ''}
                          onBlur={(e) => handleUpdateInquiry(inq.id, undefined, e.target.value)}
                          className="flex-1 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-gold-500"
                        />
                        <span className="text-[11px] text-slate-500">พิมพ์แล้วคลิกออกเพื่อบันทึก</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: Calendar Management */}
          {activeTab === 'calendar' && (
            <div className="space-y-6">
              {/* Add event form & header */}
              <div className="p-6 rounded-2xl bg-slate-900 border border-emerald-900/60 space-y-5">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                  <div>
                    <h2 className="text-xl font-bold font-heading text-white flex items-center gap-2">
                      <CalendarIcon className="w-5 h-5 text-gold-400" />
                      <span>ปฏิทินจัดการคิวรถ & เช็ควันว่าง (Fleet Availability)</span>
                    </h2>
                    <p className="text-xs text-slate-400 mt-0.5">
                      ดูคิวงานทัวร์ทั้งหมด ล็อคคิวรถ หรือบันทึกวันซ่อมบำรุง
                    </p>
                  </div>
                </div>

                {/* Add new booking / block date form */}
                <form
                  onSubmit={handleAddCalendarEvent}
                  className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3"
                >
                  <h3 className="text-xs font-bold text-gold-300 uppercase flex items-center gap-1.5">
                    <Plus className="w-4 h-4" />
                    <span>+ ล็อคคิวรถใหม่ / บันทึกทริปลงปฏิทิน</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <input
                      type="text"
                      required
                      placeholder="ชื่องาน เช่น ทริปภูเก็ต-เชียงใหม่ (อบต.ถลาง)"
                      value={newEvent.title}
                      onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                      className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                    />

                    <div>
                      <label className="text-[10px] text-slate-400 block mb-0.5">วันเริ่มต้น</label>
                      <input
                        type="date"
                        required
                        value={newEvent.startDate}
                        onChange={(e) => setNewEvent({ ...newEvent, startDate: e.target.value })}
                        className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] text-slate-400 block mb-0.5">วันสิ้นสุด</label>
                      <input
                        type="date"
                        required
                        value={newEvent.endDate}
                        onChange={(e) => setNewEvent({ ...newEvent, endDate: e.target.value })}
                        className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <input
                      type="text"
                      placeholder="ชื่อลูกค้า / องค์กร"
                      value={newEvent.customerName}
                      onChange={(e) => setNewEvent({ ...newEvent, customerName: e.target.value })}
                      className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                    />
                    <input
                      type="tel"
                      placeholder="เบอร์โทรศัพท์ลูกค้า"
                      value={newEvent.phone}
                      onChange={(e) => setNewEvent({ ...newEvent, phone: e.target.value })}
                      className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                    />
                    <select
                      value={newEvent.status}
                      onChange={(e) => setNewEvent({ ...newEvent, status: e.target.value as any })}
                      className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                    >
                      <option value="booked">จองเหมาคันแล้ว (Booked)</option>
                      <option value="tentative">รอการมัดจำ (Tentative)</option>
                      <option value="maintenance">ซ่อมบำรุง / ตรวจสภาพ (Maintenance)</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <input
                      type="text"
                      placeholder="หมายเหตุเพิ่มเติม เช่น มัดจำแล้ว 10,000 บาท..."
                      value={newEvent.notes}
                      onChange={(e) => setNewEvent({ ...newEvent, notes: e.target.value })}
                      className="flex-1 mr-3 px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-lg gold-gradient-btn text-emerald-950 font-bold text-xs shrink-0 cursor-pointer"
                    >
                      บันทึกลงปฏิทิน
                    </button>
                  </div>
                </form>

                {/* Monthly Visual Calendar View */}
                <div className="pt-4 border-t border-slate-800">
                  <div className="flex items-center justify-between pb-4">
                    <button
                      onClick={() => {
                        if (calMonth === 0) {
                          setCalMonth(11);
                          setCalYear(calYear - 1);
                        } else {
                          setCalMonth(calMonth - 1);
                        }
                      }}
                      className="p-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 hover:text-white"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>

                    <div className="text-center font-bold text-white text-base">
                      {monthNamesThai[calMonth]} {calYear + 543}
                    </div>

                    <button
                      onClick={() => {
                        if (calMonth === 11) {
                          setCalMonth(0);
                          setCalYear(calYear + 1);
                        } else {
                          setCalMonth(calMonth + 1);
                        }
                      }}
                      className="p-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 hover:text-white"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Day Grid */}
                  <div className="grid grid-cols-7 gap-1 text-center text-xs font-bold text-slate-400 mb-2">
                    <span className="text-rose-400">อา.</span>
                    <span>จ.</span>
                    <span>อ.</span>
                    <span>พ.</span>
                    <span>พฤ.</span>
                    <span>ศ.</span>
                    <span className="text-emerald-400">ส.</span>
                  </div>

                  <div className="grid grid-cols-7 gap-1">
                    {Array.from({ length: firstDay }).map((_, i) => (
                      <div key={`cal-pad-${i}`} className="min-h-[70px] bg-slate-950/40 rounded-lg p-1" />
                    ))}

                    {Array.from({ length: daysCount }).map((_, i) => {
                      const day = i + 1;
                      const mStr = String(calMonth + 1).padStart(2, '0');
                      const dStr = String(day).padStart(2, '0');
                      const dateStr = `${calYear}-${mStr}-${dStr}`;
                      const dayEvents = getEventsForDate(dateStr);

                      return (
                        <div
                          key={day}
                          className={`min-h-[70px] rounded-lg p-1.5 border transition-all ${
                            dayEvents.length > 0
                              ? 'bg-emerald-950/60 border-emerald-700/80'
                              : 'bg-slate-950/80 border-slate-800/80'
                          }`}
                        >
                          <div className="text-[11px] font-bold text-slate-300 text-right">
                            {day}
                          </div>

                          <div className="space-y-1 mt-1">
                            {dayEvents.map((evt) => (
                              <div
                                key={evt.id}
                                className={`text-[9px] p-1 rounded font-semibold leading-tight truncate ${
                                  evt.status === 'maintenance'
                                    ? 'bg-rose-950 text-rose-300 border border-rose-800'
                                    : 'bg-gold-500/20 text-gold-300 border border-gold-500/40'
                                }`}
                                title={`${evt.title} (${evt.startDate} ถึง ${evt.endDate})`}
                              >
                                {evt.title}
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Calendar Events List with delete */}
                <div className="pt-6 border-t border-slate-800 space-y-3">
                  <h3 className="text-xs font-bold text-gold-300 uppercase">
                    รายการคิวงานและตารางการเดินรถทั้งหมด ({calendarEvents.length})
                  </h3>

                  <div className="space-y-2">
                    {calendarEvents.map((evt) => (
                      <div
                        key={evt.id}
                        className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-3 text-xs"
                      >
                        <div>
                          <div className="font-bold text-white flex items-center gap-2">
                            <span>{evt.title}</span>
                            <span
                              className={`text-[10px] px-2 py-0.5 rounded font-semibold ${
                                evt.status === 'maintenance'
                                  ? 'bg-rose-950 text-rose-300 border border-rose-800'
                                  : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                              }`}
                            >
                              {evt.status === 'maintenance' ? 'ซ่อมบำรุง' : 'จองเหมาคันแล้ว'}
                            </span>
                          </div>
                          <div className="text-slate-400 text-[11px] mt-0.5">
                            📅 วันที่: <strong className="text-gold-300">{evt.startDate}</strong> ถึง{' '}
                            <strong className="text-gold-300">{evt.endDate}</strong>
                            {evt.customerName && ` • ผู้ติดต่อ: ${evt.customerName}`}
                            {evt.phone && ` (${evt.phone})`}
                          </div>
                          {evt.notes && (
                            <div className="text-[11px] text-slate-500 mt-0.5">{evt.notes}</div>
                          )}
                        </div>

                        <button
                          onClick={() => handleDeleteCalendarEvent(evt.id)}
                          className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-950/50 rounded-lg transition"
                          title="ลบคิวนี้"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Site Settings & Slogans */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-slate-900 border border-emerald-900/60 space-y-6">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div>
                    <h2 className="text-xl font-bold font-heading text-white">
                      จัดการข้อมูลทั่วไป & สโลแกน (Site Settings)
                    </h2>
                    <p className="text-xs text-slate-400 mt-0.5">
                      ปรับเปลี่ยนสโลแกน ข้อความเปิดหัวเว็บ และเบอร์โทรศัพท์
                    </p>
                  </div>

                  <button
                    onClick={handleSaveSettings}
                    className="px-5 py-2 rounded-xl gold-gradient-btn text-emerald-950 font-bold text-xs flex items-center gap-1.5 shadow cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>บันทึกการตั้งค่า</span>
                  </button>
                </div>

                {saveStatus && (
                  <div className="p-3 rounded-xl bg-emerald-950 border border-emerald-600 text-emerald-300 text-xs font-semibold">
                    {saveStatus}
                  </div>
                )}

                {/* Slogan Selector & Editor */}
                <div className="space-y-3 p-4 rounded-xl bg-slate-950 border border-gold-500/40">
                  <label className="block text-xs font-bold text-gold-300 uppercase tracking-wider">
                    ★ เลือกสโลแกนที่ต้องการแสดงบนหน้าเว็บ (Active Slogan)
                  </label>
                  <div className="space-y-2">
                    {[settings.primarySlogan, ...settings.alternativeSlogans].map(
                      (slog, idx) => (
                        <label
                          key={idx}
                          className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition ${
                            settings.selectedSlogan === slog
                              ? 'bg-emerald-950/80 border-gold-500 text-white'
                              : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                          }`}
                        >
                          <input
                            type="radio"
                            name="selectedSlogan"
                            checked={settings.selectedSlogan === slog}
                            onChange={() => setSettings({ ...settings, selectedSlogan: slog })}
                            className="mt-1"
                          />
                          <div>
                            <span className="text-xs font-bold text-gold-400 block">
                              สโลแกนทางเลือกที่ {idx + 1}
                            </span>
                            <span className="text-xs sm:text-sm font-medium">{slog}</span>
                          </div>
                        </label>
                      )
                    )}
                  </div>

                  <div className="pt-2">
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      หรือ กำหนดสโลแกนเองแบบกำหนดเอง:
                    </label>
                    <input
                      type="text"
                      value={settings.selectedSlogan}
                      onChange={(e) =>
                        setSettings({ ...settings, selectedSlogan: e.target.value })
                      }
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm focus:border-gold-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Hero Badge & Subtitle */}
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      ข้อความ Badge บนสุดของหน้าเว็บ
                    </label>
                    <input
                      type="text"
                      value={settings.heroBadge}
                      onChange={(e) => setSettings({ ...settings, heroBadge: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs sm:text-sm focus:border-gold-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      คำบรรยาย Subtitle ใต้หัวข้อหลัก
                    </label>
                    <textarea
                      rows={3}
                      value={settings.heroSubtitle}
                      onChange={(e) => setSettings({ ...settings, heroSubtitle: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs sm:text-sm focus:border-gold-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Phone Numbers */}
                <div className="space-y-3">
                  <label className="block text-xs font-bold text-gold-300 uppercase">
                    เบอร์โทรศัพท์ติดต่อหลัก (2 เบอร์)
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {settings.phones.map((phone, idx) => (
                      <div key={idx} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                        <span className="text-xs text-gold-400 font-semibold">{phone.label}</span>
                        <input
                          type="text"
                          value={phone.number}
                          onChange={(e) => {
                            const newPhones = [...settings.phones];
                            newPhones[idx] = {
                              ...phone,
                              number: e.target.value,
                              raw: e.target.value.replace(/[^0-9]/g, ''),
                            };
                            setSettings({ ...settings, phones: newPhones });
                          }}
                          className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm focus:border-gold-500 focus:outline-none font-bold"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Line & Facebook Page */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      ลิงก์ Line Official / แอดไลน์
                    </label>
                    <input
                      type="text"
                      value={settings.lineUrl}
                      onChange={(e) => setSettings({ ...settings, lineUrl: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs sm:text-sm focus:border-gold-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      ลิงก์ Facebook Fanpage
                    </label>
                    <input
                      type="text"
                      value={settings.facebookPageUrl}
                      onChange={(e) => setSettings({ ...settings, facebookPageUrl: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs sm:text-sm focus:border-gold-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: Fleet & Seat Configurator */}
          {activeTab === 'fleet' && (
            <div className="p-6 rounded-2xl bg-slate-900 border border-emerald-900/60 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <h2 className="text-xl font-bold font-heading text-white">
                    ตั้งค่าผังที่นั่ง & ขนาดความจุรถ (Fleet Configurator)
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    กำหนดขนาดความจุเหมาคันที่ต้องการให้แสดงบนหน้าเว็บ (40, 44, 46 ที่นั่ง)
                  </p>
                </div>
                <button
                  onClick={handleSaveSettings}
                  className="px-5 py-2 rounded-xl gold-gradient-btn text-emerald-950 font-bold text-xs flex items-center gap-1.5 shadow cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>บันทึกการตั้งค่า</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[40, 44, 46].map((mode) => (
                  <div
                    key={mode}
                    className="p-4 rounded-xl bg-slate-950 border border-emerald-900/60 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-sm">เหมาคัน {mode} ที่นั่ง VIP</span>
                      <span className="text-[11px] text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                        2 ชั้น
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">
                      {mode === 40
                        ? '32 ที่นั่งชั้นบน + 8 ที่นั่งชั้นล่าง'
                        : mode === 44
                        ? '36 ที่นั่งชั้นบน + 8 ที่นั่งชั้นล่าง'
                        : '38 ที่นั่งชั้นบน + 8 ที่นั่งชั้นล่าง'}
                    </p>
                    <label className="flex items-center gap-2 pt-2 text-xs text-slate-300">
                      <input
                        type="radio"
                        name="defaultSeatMode"
                        checked={settings.defaultSeatMode === mode}
                        onChange={() => setSettings({ ...settings, defaultSeatMode: mode })}
                      />
                      <span>ตั้งเป็นค่าเริ่มต้นที่แสดงบนผัง</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: Gallery & Testimonials */}
          {activeTab === 'gallery' && (
            <div className="space-y-8">
              {/* Gallery Management */}
              <div className="p-6 rounded-2xl bg-slate-900 border border-emerald-900/60 space-y-6">
                <div className="border-b border-slate-800 pb-4">
                  <h2 className="text-xl font-bold font-heading text-white">
                    จัดการรูปภาพแกลเลอรี (Gallery Showcase)
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    เพิ่มหรือลบรูปภาพสภาพรถทัวร์ และบรรยากาศทริป
                  </p>
                </div>

                {/* Add new photo form */}
                <form
                  onSubmit={handleAddGallery}
                  className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3"
                >
                  <h3 className="text-xs font-bold text-gold-300 uppercase">
                    + เพิ่มรูปภาพใหม่
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      placeholder="ชื่อรูปภาพ เช่น เบาะ VIP นุ่มสบาย"
                      value={newGalleryItem.title}
                      onChange={(e) =>
                        setNewGalleryItem({ ...newGalleryItem, title: e.target.value })
                      }
                      className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                    />
                    <select
                      value={newGalleryItem.category}
                      onChange={(e) =>
                        setNewGalleryItem({
                          ...newGalleryItem,
                          category: e.target.value as any,
                        })
                      }
                      className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                    >
                      <option value="exterior">ภายนอกตัวรถ</option>
                      <option value="interior">ห้องโดยสาร VIP</option>
                      <option value="entertainment">ความบันเทิง & แสงสี</option>
                      <option value="trips">บรรยากาศทริปจริง</option>
                    </select>
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="URL รูปภาพ (เช่น /images/bus/bus-hero.jpg หรือ https://...)"
                    value={newGalleryItem.imageUrl}
                    onChange={(e) =>
                      setNewGalleryItem({ ...newGalleryItem, imageUrl: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                  />
                  <input
                    type="text"
                    placeholder="คำบรรยายสั้นๆ ใต้ภาพ"
                    value={newGalleryItem.caption}
                    onChange={(e) =>
                      setNewGalleryItem({ ...newGalleryItem, caption: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs cursor-pointer"
                  >
                    เพิ่มรูปภาพลงแกลเลอรี
                  </button>
                </form>

                {/* Existing Gallery Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {gallery.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-xl overflow-hidden bg-slate-950 border border-slate-800 p-2 space-y-2 relative group"
                    >
                      <div className="aspect-[4/3] rounded-lg overflow-hidden bg-slate-900">
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="text-xs font-bold text-white truncate">{item.title}</div>
                      <div className="text-[11px] text-slate-400 truncate">{item.caption}</div>
                      <button
                        onClick={() => handleDeleteGallery(item.id)}
                        className="w-full py-1.5 rounded bg-rose-950/80 text-rose-300 text-xs font-semibold hover:bg-rose-900 transition flex items-center justify-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>ลบรูปนี้</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Testimonials Management */}
              <div className="p-6 rounded-2xl bg-slate-900 border border-emerald-900/60 space-y-6">
                <div className="border-b border-slate-800 pb-4">
                  <h2 className="text-xl font-bold font-heading text-white">
                    จัดการรีวิวความประทับใจลูกค้า (Testimonials)
                  </h2>
                </div>

                {/* Add new review */}
                <form
                  onSubmit={handleAddReview}
                  className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3"
                >
                  <h3 className="text-xs font-bold text-gold-300 uppercase">+ เพิ่มรีวิวใหม่</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      placeholder="ชื่อลูกค้า / ตำแหน่ง"
                      value={newReviewItem.name}
                      onChange={(e) =>
                        setNewReviewItem({ ...newReviewItem, name: e.target.value })
                      }
                      className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                    />
                    <input
                      type="text"
                      placeholder="หน่วยงาน / องค์กร"
                      value={newReviewItem.organization}
                      onChange={(e) =>
                        setNewReviewItem({ ...newReviewItem, organization: e.target.value })
                      }
                      className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="เส้นทางทริป เช่น ภูเก็ต - เชียงใหม่"
                    value={newReviewItem.trip}
                    onChange={(e) =>
                      setNewReviewItem({ ...newReviewItem, trip: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                  />
                  <textarea
                    rows={2}
                    required
                    placeholder="ข้อความรีวิว..."
                    value={newReviewItem.comment}
                    onChange={(e) =>
                      setNewReviewItem({ ...newReviewItem, comment: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs cursor-pointer"
                  >
                    เพิ่มรีวิวลูกค้า
                  </button>
                </form>

                {/* Review list */}
                <div className="space-y-3">
                  {testimonials.map((test) => (
                    <div
                      key={test.id}
                      className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start justify-between gap-4"
                    >
                      <div>
                        <div className="text-sm font-bold text-white flex items-center gap-2">
                          <span>{test.name}</span>
                          <span className="text-xs text-slate-400">({test.organization})</span>
                        </div>
                        <p className="text-xs text-slate-300 mt-1 italic">"{test.comment}"</p>
                        <div className="text-[11px] text-emerald-400 mt-1">📍 {test.trip}</div>
                      </div>
                      <button
                        onClick={() => handleDeleteReview(test.id)}
                        className="p-2 text-slate-400 hover:text-rose-400"
                        title="ลบรีวิว"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: SEO, Meta Tags & Facebook API Settings */}
          {activeTab === 'seo' && (
            <div className="p-6 rounded-2xl bg-slate-900 border border-emerald-900/60 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <h2 className="text-xl font-bold font-heading text-white">
                    SEO, Open Graph & Facebook Meta API Integration
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    กำหนดค่า Meta Tags สำหรับการแชร์บน Facebook Page, Facebook Pixel ID และ Facebook Conversions API (CAPI)
                  </p>
                </div>
                <button
                  onClick={handleSaveSettings}
                  className="px-5 py-2 rounded-xl gold-gradient-btn text-emerald-950 font-bold text-xs flex items-center gap-1.5 shadow cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>บันทึกการตั้งค่า SEO</span>
                </button>
              </div>

              {saveStatus && (
                <div className="p-3 rounded-xl bg-emerald-950 border border-emerald-600 text-emerald-300 text-xs font-semibold">
                  {saveStatus}
                </div>
              )}

              {/* Meta Title */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Meta Title (ความยาวที่แนะนำ 50-65 ตัวอักษร)
                </label>
                <input
                  type="text"
                  value={settings.seo?.metaTitle || ''}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      seo: { ...settings.seo, metaTitle: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs sm:text-sm focus:border-gold-500 focus:outline-none"
                />
              </div>

              {/* Meta Description */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Meta Description (คำบรรยายสำหรับ Google และ Facebook Share)
                </label>
                <textarea
                  rows={3}
                  value={settings.seo?.metaDescription || ''}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      seo: { ...settings.seo, metaDescription: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs sm:text-sm focus:border-gold-500 focus:outline-none"
                />
              </div>

              {/* Keywords */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Keywords (คั่นด้วยจุลภาค)
                </label>
                <input
                  type="text"
                  value={settings.seo?.metaKeywords || ''}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      seo: { ...settings.seo, metaKeywords: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs sm:text-sm focus:border-gold-500 focus:outline-none"
                />
              </div>

              {/* OG Image URL */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  OG Image URL (ภาพหน้าปกแสดงผลเวลาแชร์ลิงก์ ขนาดแนะนำ 1200x630 px)
                </label>
                <input
                  type="text"
                  value={settings.seo?.ogImageUrl || ''}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      seo: { ...settings.seo, ogImageUrl: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs sm:text-sm focus:border-gold-500 focus:outline-none"
                />
              </div>

              {/* Facebook Graph API, Pixel & CAPI Suite */}
              <div className="p-5 sm:p-6 rounded-2xl bg-blue-950/30 border border-blue-500/40 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-blue-500/30 pb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold">
                      <Share2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                        <span>Facebook Integration (Graph API, Pixel & Conversions API)</span>
                        <span className="text-[10px] bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full border border-blue-500/30">
                          ซิงค์โพสต์ & แทร็ก Conversion
                        </span>
                      </h3>
                      <p className="text-xs text-slate-400">
                        ดึงโพสต์จากหน้า Facebook Fanpage มาแสดงบนเว็บ พร้อมระบบแทร็กผลลัพธ์ผ่าน Meta Pixel และ CAPI 2 ทาง
                      </p>
                    </div>
                  </div>
                </div>

                {/* Sub-card 1: Facebook Page & Feed Sync */}
                <div className="p-4 rounded-xl bg-slate-950/80 border border-blue-500/20 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-bold text-blue-300">
                      <ExternalLink className="w-4 h-4 text-blue-400" />
                      <span>1. การเชื่อมต่อ Facebook Fanpage เพื่อดึงโพสต์ (Feed Showcase)</span>
                    </div>
                    <span className="text-[10px] text-slate-400">Graph API v19.0</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Facebook Page ID / Username
                      </label>
                      <input
                        type="text"
                        placeholder="เช่น muangsongyatour หรือตัวเลข 1000..."
                        value={settings.seo?.facebookPageId || ''}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            facebookPageId: e.target.value,
                            seo: { ...settings.seo, facebookPageId: e.target.value },
                          })
                        }
                        className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm focus:border-blue-400 focus:outline-none"
                      />
                      <p className="text-[11px] text-slate-400 mt-1">
                        ชื่อหรือ ID ของเพจ เช่น <code>muangsongyatour</code> (หน้าเพจเมืองสองย่า ทรานสปอร์ต แอนด์ ทัวร์)
                      </p>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        ลิงก์ Facebook Fanpage (URL)
                      </label>
                      <input
                        type="text"
                        placeholder="https://facebook.com/muangsongyatour"
                        value={settings.facebookPageUrl || ''}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            facebookPageUrl: e.target.value,
                          })
                        }
                        className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm focus:border-blue-400 focus:outline-none"
                      />
                      <p className="text-[11px] text-slate-400 mt-1">
                        ใช้สำหรับปุ่ม &quot;ดูโพสต์ทั้งหมดบน Facebook&quot; ของผู้เข้าชม
                      </p>
                    </div>
                  </div>

                  {fbFeedStatus && (
                    <div className="p-3 rounded-xl bg-slate-900 border border-blue-500/50 text-xs font-semibold text-blue-200">
                      {fbFeedStatus}
                    </div>
                  )}

                  <div className="flex flex-wrap items-center gap-3 pt-1">
                    <button
                      type="button"
                      onClick={handleTestFacebookFeed}
                      disabled={fbFeedLoading}
                      className="py-2 px-3.5 rounded-xl bg-blue-700 hover:bg-blue-600 text-white text-xs font-bold flex items-center gap-1.5 shadow transition active:scale-95 cursor-pointer disabled:opacity-50"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${fbFeedLoading ? 'animate-spin' : ''}`} />
                      <span>{fbFeedLoading ? 'กำลังทดสอบ...' : '⚡ ทดสอบดึงโพสต์จาก Facebook'}</span>
                    </button>
                    <span className="text-[11px] text-slate-400">
                      * หากยังไม่ได้กรอก Access Token ระบบจะแสดงข้อมูลโพสต์ตัวอย่างทริปเสมือนจริงให้โดยอัตโนมัติ
                    </span>
                  </div>
                </div>

                {/* Sub-card 2: Facebook Pixel & Conversions API (CAPI) */}
                <div className="p-4 rounded-xl bg-slate-950/80 border border-blue-500/20 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-bold text-blue-300">
                      <ShieldCheck className="w-4 h-4 text-blue-400" />
                      <span>2. Facebook Pixel & Conversions API (CAPI Server-side Tracking)</span>
                    </div>
                    <span className="text-[10px] text-emerald-400 font-semibold">Dual-Tracking พร้อมใช้งาน</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Facebook Pixel ID
                      </label>
                      <input
                        type="text"
                        placeholder="เช่น 123456789012345"
                        value={settings.seo?.facebookPixelId || ''}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            seo: { ...settings.seo, facebookPixelId: e.target.value },
                          })
                        }
                        className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm focus:border-blue-400 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Test Event Code (สำหรับทดสอบใน Meta Events Manager)
                      </label>
                      <input
                        type="text"
                        placeholder="เช่น TEST12345 (เว้นว่างได้ถ้าใช้งานจริง)"
                        value={fbTestCode}
                        onChange={(e) => setFbTestCode(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm focus:border-blue-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Facebook Access Token (System User Access Token / CAPI Token)
                    </label>
                    <input
                      type="password"
                      placeholder="EAAGm0PX4ZC... (ใช้สำหรับทั้งดึง Feed โพสต์ และส่ง Server-side Event)"
                      value={settings.seo?.facebookAccessToken || ''}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          seo: { ...settings.seo, facebookAccessToken: e.target.value },
                        })
                      }
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm focus:border-blue-400 focus:outline-none font-mono"
                    />
                    <p className="text-[11px] text-slate-400 mt-1">
                      สามารถสร้างได้จาก <em>Meta Events Manager &gt; การตั้งค่า &gt; Conversions API &gt; สร้างโทเค็นการเข้าถึง</em> หรือจาก <em>Meta Business Settings &gt; System Users</em>
                    </p>
                  </div>

                  {fbCapiStatus && (
                    <div className="p-3 rounded-xl bg-slate-900 border border-blue-500/50 text-xs font-semibold text-blue-200">
                      {fbCapiStatus}
                    </div>
                  )}

                  <div className="flex flex-wrap items-center gap-3 pt-1">
                    <button
                      type="button"
                      onClick={handleTestFacebookCapi}
                      disabled={fbCapiLoading}
                      className="py-2 px-3.5 rounded-xl bg-indigo-700 hover:bg-indigo-600 text-white text-xs font-bold flex items-center gap-1.5 shadow transition active:scale-95 cursor-pointer disabled:opacity-50"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{fbCapiLoading ? 'กำลังส่ง Event...' : '🧪 ทดสอบส่ง Event ไปยัง Facebook CAPI'}</span>
                    </button>
                  </div>

                  <div className="text-[11px] text-slate-400 leading-relaxed pt-2 border-t border-slate-800">
                    <div className="font-semibold text-slate-300 mb-1">เหตุการณ์ (Standard Events) ที่ระบบบันทึกอัตโนมัติ:</div>
                    <ul className="list-disc pl-5 space-y-0.5 text-blue-200">
                      <li><code>PageView</code>: บันทึกทันทีเมื่อมีผู้เข้าชมเว็บไซต์</li>
                      <li><code>Contact</code>: บันทึกเมื่อผู้ชมกดโทรด่วน 096-463-8443 / 081-059-6350, กดคัดลอกเบอร์ หรือกดปุ่ม LINE</li>
                      <li><code>Lead</code>: บันทึกเมื่อผู้ชมส่งฟอร์มขอใบเสนอราคาเช่ารถทัวร์เหมาคัน</li>
                      <li><code>ViewContent</code>: บันทึกเมื่อผู้ชมเปิดดูโปรโมชั่นหรือรายละเอียดสเปกรถ</li>
                    </ul>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-blue-500/20">
                  <div className="text-xs text-blue-300 flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span>ข้อมูลจะถูกนำไปใช้ในหน้าเว็บและระบบหลังบ้านทันทีหลังกดบันทึก</span>
                  </div>

                  <button
                    type="button"
                    onClick={handleSaveSettings}
                    className="py-2.5 px-4 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow transition cursor-pointer"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>บันทึกการตั้งค่า Facebook & SEO</span>
                  </button>
                </div>
              </div>

              {/* Telegram Bot Notification Settings */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-sky-500/40 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold">
                      <Send className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white flex items-center gap-2">
                        <span>Telegram Bot Notification (@Phuketbusbot)</span>
                        <span className="text-[10px] bg-sky-500/20 text-sky-300 px-2 py-0.5 rounded-full border border-sky-500/30">
                          ส่งแจ้งเตือนจองรถทันที
                        </span>
                      </h3>
                      <p className="text-xs text-slate-400">
                        แจ้งเตือนเข้าแอป Telegram ทุกครั้งที่มีลูกค้าส่งฟอร์มขอใบเสนอราคาใหม่
                      </p>
                    </div>
                  </div>

                  <label className="flex items-center gap-2 cursor-pointer self-start sm:self-auto">
                    <input
                      type="checkbox"
                      checked={settings.telegram?.enabled !== false}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          telegram: {
                            botToken: settings.telegram?.botToken || '9260423736:AAHxrewFut_-_39ehaR3I8wwmDms9PJsXw0',
                            chatId: settings.telegram?.chatId || '',
                            enabled: e.target.checked,
                          },
                        })
                      }
                      className="w-4 h-4 rounded text-sky-500 accent-sky-500 cursor-pointer"
                    />
                    <span className="text-xs font-semibold text-slate-300">เปิดใช้งานแจ้งเตือน</span>
                  </label>
                </div>

                {telegramStatus && (
                  <div className="p-3 rounded-xl bg-slate-900 border border-sky-500/50 text-xs font-semibold text-sky-200">
                    {telegramStatus}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Telegram Bot Token
                    </label>
                    <input
                      type="text"
                      value={settings.telegram?.botToken || '9260423736:AAHxrewFut_-_39ehaR3I8wwmDms9PJsXw0'}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          telegram: {
                            botToken: e.target.value,
                            chatId: settings.telegram?.chatId || '',
                            enabled: settings.telegram?.enabled !== false,
                          },
                        })
                      }
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm focus:border-sky-400 focus:outline-none font-mono"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-semibold text-slate-300">
                        Chat ID (ห้องแชท หรือ กลุ่ม)
                      </label>
                      <button
                        type="button"
                        onClick={handleDetectTelegram}
                        disabled={telegramLoading}
                        className="text-[11px] text-sky-400 hover:text-sky-300 underline font-semibold cursor-pointer disabled:opacity-50"
                      >
                        {telegramLoading ? 'กำลังตรวจสอบ...' : '⚡ ตรวจจับ Chat ID อัตโนมัติ'}
                      </button>
                    </div>
                    <input
                      type="text"
                      placeholder="เช่น 123456789 หรือกดตรวจจับอัตโนมัติด้านบน"
                      value={settings.telegram?.chatId || ''}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          telegram: {
                            botToken: settings.telegram?.botToken || '9260423736:AAHxrewFut_-_39ehaR3I8wwmDms9PJsXw0',
                            chatId: e.target.value,
                            enabled: settings.telegram?.enabled !== false,
                          },
                        })
                      }
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm focus:border-sky-400 focus:outline-none font-mono"
                    />
                  </div>
                </div>

                {/* Step by step guide */}
                <div className="p-3.5 rounded-xl bg-sky-950/40 border border-sky-800/40 text-xs text-slate-300 space-y-1.5 leading-relaxed">
                  <div className="font-bold text-sky-300 flex items-center gap-1.5">
                    <Bell className="w-3.5 h-3.5 text-sky-400" />
                    <span>วิธีเชื่อมต่อ Telegram Bot รับแจ้งเตือนใน 1 นาที:</span>
                  </div>
                  <ol className="list-decimal pl-5 space-y-1 text-slate-300 text-[11px]">
                    <li>
                      เปิดแอป Telegram แล้วค้นหา <strong>@Phuketbusbot</strong> หรือคลิกลิงก์{' '}
                      <a
                        href="https://t.me/Phuketbusbot"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sky-400 font-bold underline"
                      >
                        t.me/Phuketbusbot
                      </a>
                    </li>
                    <li>
                      กดปุ่ม <strong>Start</strong> หรือพิมพ์ข้อความอะไรก็ได้ เช่น "สวัสดี" ส่งเข้าไปในบอท 1 ข้อความ
                    </li>
                    <li>
                      กลับมากดปุ่ม <strong>"⚡ ตรวจจับ Chat ID อัตโนมัติ"</strong> ด้านบนนี้ ระบบจะตรวจจับและบันทึก Chat ID ให้เองทันที!
                    </li>
                    <li>
                      กดปุ่ม <strong>"ส่งข้อความทดสอบ"</strong> ด้านล่างเพื่อยืนยันว่าได้รับแจ้งเตือนในมือถือ
                    </li>
                  </ol>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <button
                    type="button"
                    onClick={handleTestTelegram}
                    disabled={telegramLoading}
                    className="py-2.5 px-4 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold flex items-center gap-2 shadow transition active:scale-95 cursor-pointer disabled:opacity-50"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{telegramLoading ? 'กำลังส่ง...' : 'ส่งข้อความทดสอบไปยัง Telegram'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleSaveSettings}
                    className="py-2.5 px-4 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow transition cursor-pointer"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>บันทึกการตั้งค่า Telegram</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
