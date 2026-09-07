"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/app/context/LanguageContext";
import {
  X,
  Calendar,
  Clock,
  CheckCircle2,
  Send,
  User,
  Phone,
  Mail,
  FileText,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  ShieldCheck,
  MessageSquare,
} from "lucide-react";
import { ScheduleSettings, ScheduleItem } from "@/lib/types";

const SERVICE_TOPICS = [
  "360° Digital Marketing",
  "Website Development",
  "Professional SEO Services",
  "Mobile App Development",
  "Social Media Marketing",
  "Custom Enterprise Strategy",
];

export default function ScheduleModal() {
  const { isCalendlyModalOpen, closeCalendlyModal, t, siteSettings } = useLanguage();

  // Step control: 1: Service & Date/Time, 2: Client Info, 3: Confirmed
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Form selections
  const [selectedService, setSelectedService] = useState(SERVICE_TOPICS[0]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");

  // Remote data
  const [settings, setSettings] = useState<ScheduleSettings | null>(null);
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [confirmedBooking, setConfirmedBooking] = useState<ScheduleItem | null>(null);

  // Generate next 14 available dates
  const [availableDates, setAvailableDates] = useState<
    { dateStr: string; dayName: string; dayNum: number; monthName: string; isToday: boolean }[]
  >([]);

  useEffect(() => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 14; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      const dateStr = `${year}-${month}-${day}`;
      const dayName = d.toLocaleDateString("en-US", { weekday: "short" });
      const monthName = d.toLocaleDateString("en-US", { month: "short" });

      dates.push({
        dateStr,
        dayName,
        dayNum: d.getDate(),
        monthName,
        isToday: i === 0,
      });
    }
    setAvailableDates(dates);
    if (dates.length > 0 && !selectedDate) {
      setSelectedDate(dates[0].dateStr);
    }
  }, [selectedDate]);

  // Fetch settings & booked slots whenever date changes
  useEffect(() => {
    if (!isCalendlyModalOpen || !selectedDate) return;

    const fetchAvailability = async () => {
      setLoadingSlots(true);
      try {
        const res = await fetch(`/api/schedules?date=${selectedDate}`);
        const data = await res.json();
        if (data.settings) setSettings(data.settings);
        if (Array.isArray(data.bookedSlots)) setBookedSlots(data.bookedSlots);
      } catch (err) {
        console.error("Failed to fetch slots", err);
      } finally {
        setLoadingSlots(false);
      }
    };

    fetchAvailability();
  }, [isCalendlyModalOpen, selectedDate]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };
    if (isCalendlyModalOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isCalendlyModalOpen]);

  const handleClose = () => {
    closeCalendlyModal();
    setTimeout(() => {
      setStep(1);
      setSelectedTime("");
      setErrorMsg("");
      setConfirmedBooking(null);
    }, 250);
  };

  const handleProceedToDetails = () => {
    if (!selectedDate || !selectedTime) {
      setErrorMsg("Please select an available date and time slot.");
      return;
    }
    setErrorMsg("");
    setStep(2);
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      setErrorMsg("Please provide your name and WhatsApp/Phone number.");
      return;
    }

    setSubmitting(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/schedules", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          service: selectedService,
          date: selectedDate,
          timeSlot: selectedTime,
          notes,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setErrorMsg(data.error || "Failed to reserve appointment. Please try another time.");
        setSubmitting(false);
        return;
      }

      setConfirmedBooking(data.booking);
      setStep(3);
    } catch (err) {
      console.error(err);
      setErrorMsg("Connection error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!isCalendlyModalOpen) return null;

  const defaultSlots = [
    "10:00 AM",
    "11:30 AM",
    "02:00 PM",
    "03:30 PM",
    "05:00 PM",
    "06:30 PM",
    "08:00 PM",
  ];
  const activeSlots = settings?.timeSlots || defaultSlots;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/65 backdrop-blur-sm transition-opacity"
        onClick={handleClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] z-10 animate-in zoom-in-95 duration-200">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-b border-slate-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-accent to-brand-cyan text-white flex items-center justify-center shadow-md shadow-brand-accent/20 shrink-0">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 font-display flex items-center gap-2">
                <span>{t("schedule-title", "Schedule a Strategy Call")}</span>
                <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Instant Confirmation
                </span>
              </h3>
              <p className="text-xs text-slate-500 line-clamp-1">
                Choose your project focus, date & preferred time slot
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-xl transition-colors"
            aria-label="Close scheduler"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Bar */}
        <div className="bg-slate-100/80 px-6 py-2 border-b border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center space-x-2">
            <span
              className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                step >= 1 ? "bg-brand-accent text-white" : "bg-slate-200 text-slate-600"
              }`}
            >
              1
            </span>
            <span className={step === 1 ? "font-bold text-slate-900" : ""}>Date & Time</span>
          </div>

          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />

          <div className="flex items-center space-x-2">
            <span
              className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                step >= 2 ? "bg-brand-accent text-white" : "bg-slate-200 text-slate-600"
              }`}
            >
              2
            </span>
            <span className={step === 2 ? "font-bold text-slate-900" : ""}>Your Details</span>
          </div>

          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />

          <div className="flex items-center space-x-2">
            <span
              className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                step === 3 ? "bg-emerald-600 text-white" : "bg-slate-200 text-slate-600"
              }`}
            >
              3
            </span>
            <span className={step === 3 ? "font-bold text-slate-900" : ""}>Confirmed</span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-5">
          
          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <span className="font-bold">Notice:</span> {errorMsg}
            </div>
          )}

          {/* STEP 1: Select Service, Date & Time Slot */}
          {step === 1 && (
            <div className="space-y-6">
              
              {/* Service Topic Selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  1. What would you like to discuss?
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {SERVICE_TOPICS.map((topic) => (
                    <button
                      key={topic}
                      type="button"
                      onClick={() => setSelectedService(topic)}
                      className={`p-2.5 rounded-xl text-xs font-semibold text-left transition-all border ${
                        selectedService === topic
                          ? "bg-brand-accent text-white border-brand-accent shadow-sm"
                          : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300"
                      }`}
                    >
                      {topic}
                    </button>
                  ))}
                </div>
              </div>

              {/* Date Selection Carousel */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  2. Select a Date
                </label>
                <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
                  {availableDates.map((item) => (
                    <button
                      key={item.dateStr}
                      type="button"
                      onClick={() => {
                        setSelectedDate(item.dateStr);
                        setSelectedTime("");
                      }}
                      className={`min-w-[68px] sm:min-w-[74px] p-2.5 rounded-2xl text-center border transition-all shrink-0 ${
                        selectedDate === item.dateStr
                          ? "bg-brand-accent text-white border-brand-accent shadow-md shadow-brand-accent/20 scale-102"
                          : "bg-white text-slate-700 border-slate-200 hover:border-brand-accent/50 hover:bg-slate-50"
                      }`}
                    >
                      <span className="block text-[10px] font-bold uppercase tracking-wider opacity-80">
                        {item.dayName}
                      </span>
                      <span className="block text-lg font-black font-display my-0.5">
                        {item.dayNum}
                      </span>
                      <span className="block text-[10px] opacity-80">
                        {item.monthName}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Slot Picker */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    3. Select Time Slot (30 Mins)
                  </label>
                  {loadingSlots && (
                    <span className="text-[11px] text-brand-accent animate-pulse font-medium">
                      Checking availability...
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {activeSlots.map((slot) => {
                    const isBooked = bookedSlots.includes(slot);
                    const isSelected = selectedTime === slot;

                    return (
                      <button
                        key={slot}
                        type="button"
                        disabled={isBooked}
                        onClick={() => setSelectedTime(slot)}
                        className={`p-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all border ${
                          isBooked
                            ? "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed line-through opacity-60"
                            : isSelected
                            ? "bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-600/20 scale-102"
                            : "bg-slate-50 text-slate-800 border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/50"
                        }`}
                      >
                        <Clock className="w-3.5 h-3.5" />
                        <span>{slot}</span>
                        {isBooked && <span className="text-[9px] block">Booked</span>}
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>
          )}

          {/* STEP 2: Attendee Details Form */}
          {step === 2 && (
            <form onSubmit={handleBookingSubmit} className="space-y-4">
              
              {/* Selected Slot Summary Card */}
              <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-150 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-brand-accent tracking-wider block">
                    Selected Appointment
                  </span>
                  <div className="text-sm font-bold text-slate-900">
                    {selectedService}
                  </div>
                  <div className="text-xs text-slate-600 flex items-center gap-2 mt-0.5">
                    <span className="font-semibold text-slate-800">📅 {selectedDate}</span>
                    <span>•</span>
                    <span className="font-semibold text-emerald-700">⏰ {selectedTime}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs font-bold text-brand-accent hover:underline"
                >
                  Change Slot
                </button>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Tanvir Ahmed"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-brand-accent focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    WhatsApp / Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+880 1700 000000"
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-brand-accent focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@company.com"
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-brand-accent focus:bg-white transition-all"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Project Brief or Questions (Optional)
                </label>
                <div className="relative">
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Tell us about your website, SEO, or marketing goals..."
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-brand-accent focus:bg-white transition-all resize-none"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 text-xs font-bold transition-all"
                >
                  Back to Time Slots
                </button>

                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 py-3 px-6 rounded-xl bg-gradient-to-r from-brand-accent to-blue-600 hover:brightness-110 text-white text-xs sm:text-sm font-bold transition-all shadow-md shadow-brand-accent/25 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {submitting ? (
                    <span>Confirming Appointment...</span>
                  ) : (
                    <>
                      <span>Confirm & Reserve Slot</span>
                      <CheckCircle2 className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

            </form>
          )}

          {/* STEP 3: Booking Confirmed Screen */}
          {step === 3 && confirmedBooking && (
            <div className="text-center py-4 space-y-4 animate-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  Appointment Confirmed
                </span>
                <h3 className="text-xl sm:text-2xl font-black font-display text-slate-900 mt-2">
                  You're all booked, {confirmedBooking.name}!
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-md mx-auto">
                  Our tech & growth strategy squad has reserved your slot and prepared for your discovery session.
                </p>
              </div>

              {/* Ticket Details Box */}
              <div className="max-w-md mx-auto p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left space-y-2.5 text-xs">
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500">Booking ID:</span>
                  <span className="font-mono font-bold text-slate-900">{confirmedBooking.id}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500">Topic:</span>
                  <span className="font-bold text-brand-accent">{confirmedBooking.service}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500">Scheduled Date:</span>
                  <span className="font-bold text-slate-800">{confirmedBooking.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Time:</span>
                  <span className="font-bold text-emerald-700">{confirmedBooking.timeSlot} (30 Mins)</span>
                </div>
              </div>

              {/* Direct WhatsApp Sync Button */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={`https://wa.me/${siteSettings?.whatsappPhone || "8801841451241"}?text=${encodeURIComponent(
                    `Hi Omnix Network, I just scheduled a meeting!\n\n*Booking ID:* ${confirmedBooking.id}\n*Name:* ${confirmedBooking.name}\n*Topic:* ${confirmedBooking.service}\n*Date & Time:* ${confirmedBooking.date} at ${confirmedBooking.timeSlot}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat With Us on WhatsApp Now</span>
                </a>

                <button
                  type="button"
                  onClick={handleClose}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors"
                >
                  Done
                </button>
              </div>

            </div>
          )}

        </div>

        {/* Footer Actions (Step 1 only) */}
        {step === 1 && (
          <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
            <div className="text-xs text-slate-500 hidden sm:block">
              {selectedDate && selectedTime ? (
                <span>
                  Selected: <strong className="text-slate-800">{selectedDate}</strong> at{" "}
                  <strong className="text-emerald-700">{selectedTime}</strong>
                </span>
              ) : (
                <span>Select an available time slot above</span>
              )}
            </div>

            <div className="flex items-center gap-3 ml-auto w-full sm:w-auto">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 text-xs font-bold transition-colors w-1/2 sm:w-auto"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleProceedToDetails}
                disabled={!selectedDate || !selectedTime}
                className="px-6 py-2.5 rounded-xl bg-brand-accent hover:bg-brand-accentHover text-white text-xs font-bold transition-all shadow-md shadow-brand-accent/20 flex items-center justify-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed w-1/2 sm:w-auto"
              >
                <span>Continue</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
