'use client';

import React, { useState } from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import WhyChooseUs from './WhyChooseUs';
import Scroll3DAnimation from './Scroll3DAnimation';
import BookingCalendarPicker from './BookingCalendarPicker';
import BusSeatSimulator from './BusSeatSimulator';
import FleetAmenities from './FleetAmenities';
import PopularRoutes from './PopularRoutes';
import Testimonials from './Testimonials';
import FaqSection from './FaqSection';
import ContactAndQuoteForm from './ContactAndQuoteForm';
import Footer from './Footer';
import SpeedDialModal from './SpeedDialModal';
import PromoPopupModal from './PromoPopupModal';
import BusScrollProgress from './BusScrollProgress';
import TripEstimator from './TripEstimator';
import LiveActivityToast from './LiveActivityToast';
import { DatabaseSchema } from '@/lib/db';

interface OnePageSaleProps {
  initialData: DatabaseSchema;
}

export default function OnePageSale({ initialData }: OnePageSaleProps) {
  const { settings, amenities, gallery, testimonials, calendarEvents } = initialData;
  const [phoneModalOpen, setPhoneModalOpen] = useState(false);

  // Synchronized state for booking from simulator and calendar
  const [selectedSeatForQuote, setSelectedSeatForQuote] = useState<{
    label: string;
    mode: number;
  }>({
    label: `เช่าเหมาคันรุ่น ${settings.defaultSeatMode || 46} ที่นั่ง VIP`,
    mode: settings.defaultSeatMode || 46,
  });

  const [selectedDates, setSelectedDates] = useState<{
    startDate: string;
    endDate: string;
    durationText: string;
  }>({
    startDate: '',
    endDate: '',
    durationText: '',
  });

  const handleSeatModeSelect = (modeText: string, modeNum: number) => {
    setSelectedSeatForQuote({ label: modeText, mode: modeNum });
  };

  const handleDateRangeSelect = (
    startDate: string,
    endDate: string,
    durationText: string
  ) => {
    setSelectedDates({ startDate, endDate, durationText });
  };

  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-800 selection:bg-emerald-700 selection:text-white">
      {/* Interactive Bus Scroll Progress Indicator */}
      <BusScrollProgress />

      {/* Sticky Header */}
      <Navbar
        onOpenPhoneModal={() => setPhoneModalOpen(true)}
        companyName={settings.companyName}
      />

      <main>
        {/* Hero Section with Official Logo */}
        <Hero
          onOpenPhoneModal={() => setPhoneModalOpen(true)}
          badge={settings.heroBadge}
          slogan={settings.selectedSlogan || settings.primarySlogan}
          subtitle={settings.heroSubtitle}
          companyName={settings.companyName}
        />

        {/* 3D Scrolling Animation Experience with Real Bus Photos */}
        <div id="scroll-3d">
          <Scroll3DAnimation />
        </div>

        {/* Why Choose Us / Safety Guarantee */}
        <WhyChooseUs />

        {/* Date Range Calendar Booking Section (Clean White Theme) */}
        <section id="calendar-section" className="py-20 sm:py-24 bg-slate-50 text-slate-800 relative">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <BookingCalendarPicker
              events={calendarEvents || []}
              onSelectDateRange={handleDateRangeSelect}
            />
          </div>
        </section>

        {/* Non-Clickable Charter Coach Seat Layout Display */}
        <BusSeatSimulator
          onSelectSeatMode={handleSeatModeSelect}
          supportedModes={settings.supportedSeatModes || [40, 44, 46]}
          defaultMode={settings.defaultSeatMode || 46}
        />

        {/* Redesigned Popular Routes */}
        <PopularRoutes />

        {/* Interactive Trip Distance & Itinerary Estimator */}
        <TripEstimator />

        {/* Fleet & Amenities Showcase with Real Interior and Exterior Photos */}
        <FleetAmenities amenities={amenities || []} gallery={gallery || []} />

        {/* Customer Testimonials & Reviews */}
        <Testimonials testimonials={testimonials || []} />

        {/* Frequently Asked Questions */}
        <FaqSection />

        {/* Quotation Request Form & Direct Contact */}
        <ContactAndQuoteForm
          initialSeatPreference={selectedSeatForQuote.label}
          initialSeatMode={selectedSeatForQuote.mode}
          initialStartDate={selectedDates.startDate}
          initialEndDate={selectedDates.endDate}
          initialDurationText={selectedDates.durationText}
          phones={settings.phones}
          lineUrl={settings.lineUrl}
          facebookPageUrl={settings.facebookPageUrl}
        />
      </main>

      {/* Footer with Official Logo */}
      <Footer
        companyName={settings.companyName}
        phones={settings.phones}
        slogan={settings.selectedSlogan || settings.primarySlogan}
        lineUrl={settings.lineUrl}
        lineQrUrl={settings.lineQrUrl || '/images/line-qr.jpg'}
      />

      {/* Live Social Proof Activity Toast */}
      <LiveActivityToast />

      {/* Speed Dial Floating Action Button & Modal */}
      <SpeedDialModal
        phones={settings.phones}
        lineUrl={settings.lineUrl}
        lineQrUrl={settings.lineQrUrl || '/images/line-qr.jpg'}
        isOpen={phoneModalOpen}
        onOpen={() => setPhoneModalOpen(true)}
        onClose={() => setPhoneModalOpen(false)}
      />

      {/* Promotional Poster Popup Modal for Day Visitors */}
      <PromoPopupModal
        onOpenPhoneModal={() => setPhoneModalOpen(true)}
        phone1={settings.phones?.[0]?.number || '096-463-8443'}
        phone2={settings.phones?.[1]?.number || '081-059-6350'}
        lineUrl={settings.lineUrl}
      />
    </div>
  );
}
