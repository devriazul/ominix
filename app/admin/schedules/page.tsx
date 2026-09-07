"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ScheduleItem, ScheduleSettings } from "@/lib/types";
import {
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  Search,
  Trash2,
  ExternalLink,
  MessageSquare,
  Mail,
  Phone,
  Plus,
  Settings,
  RefreshCw,
  Filter,
  User,
  Check,
} from "lucide-react";

export default function AdminSchedulesPage() {
  const router = useRouter();
  const [schedules, setSchedules] = useState<ScheduleItem[]>([]);
  const [settings, setSettings] = useState<ScheduleSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"bookings" | "settings">("bookings");
  const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "confirmed" | "completed" | "cancelled">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [notification, setNotification] = useState("");

  // Settings form state
  const [timeSlots, setTimeSlots] = useState<string[]>([]);
  const [newSlotInput, setNewSlotInput] = useState("");
  const [meetingDuration, setMeetingDuration] = useState(30);
  const [savingSettings, setSavingSettings] = useState(false);

  useEffect(() => {
    checkAuthAndFetch();
  }, []);

  const checkAuthAndFetch = async () => {
    try {
      const authRes = await fetch("/api/admin/auth");
      const authData = await authRes.json();
      if (!authData.authenticated) {
        router.push("/admin/login");
        return;
      }
      fetchData();
    } catch {
      fetchData();
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/schedules");
      const data = await res.json();
      if (Array.isArray(data.schedules)) {
        setSchedules(data.schedules);
      }
      if (data.settings) {
        setSettings(data.settings);
        setTimeSlots(data.settings.timeSlots || []);
        setMeetingDuration(data.settings.meetingDuration || 30);
      }
    } catch (err) {
      console.error("Failed to load schedules", err);
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(""), 3500);
  };

  const handleStatusUpdate = async (id: string, newStatus: ScheduleItem["status"]) => {
    try {
      const res = await fetch("/api/schedules", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });

      if (res.ok) {
        setSchedules((prev) =>
          prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
        );
        showNotification(`Appointment marked as ${newStatus}.`);
      }
    } catch (err) {
      console.error(err);
      showNotification("Failed to update status.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this schedule record?")) return;

    try {
      const res = await fetch(`/api/schedules?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setSchedules((prev) => prev.filter((item) => item.id !== id));
        showNotification("Schedule record removed.");
      }
    } catch (err) {
      console.error(err);
      showNotification("Failed to delete record.");
    }
  };

  const handleAddSlot = () => {
    if (!newSlotInput.trim()) return;
    const formatted = newSlotInput.trim();
    if (timeSlots.includes(formatted)) {
      alert("This time slot already exists.");
      return;
    }
    setTimeSlots([...timeSlots, formatted]);
    setNewSlotInput("");
  };

  const handleRemoveSlot = (slotToRemove: string) => {
    setTimeSlots(timeSlots.filter((slot) => slot !== slotToRemove));
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingSettings(true);

    try {
      const res = await fetch("/api/schedules/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...(settings || {
            workingDays: [0, 1, 2, 3, 4, 5, 6],
            bufferDays: 0,
            maxAdvanceDays: 14,
            blockedDates: [],
          }),
          timeSlots,
          meetingDuration: Number(meetingDuration),
        }),
      });

      if (res.ok) {
        showNotification("Schedule settings successfully updated!");
      }
    } catch (err) {
      console.error(err);
      showNotification("Failed to save settings.");
    } finally {
      setSavingSettings(false);
    }
  };

  // KPI Metrics
  const totalCount = schedules.length;
  const pendingCount = schedules.filter((s) => s.status === "pending").length;
  const confirmedCount = schedules.filter((s) => s.status === "confirmed").length;
  const completedCount = schedules.filter((s) => s.status === "completed").length;
  const cancelledCount = schedules.filter((s) => s.status === "cancelled").length;

  // Filtered and sorted schedules
  const filteredSchedules = schedules
    .slice()
    .sort((a, b) => {
      // Prioritize pending, then by date descending
      if (a.status === "pending" && b.status !== "pending") return -1;
      if (b.status === "pending" && a.status !== "pending") return 1;
      return (b.date || "").localeCompare(a.date || "");
    })
    .filter((item) => {
      const matchesStatus = statusFilter === "all" || item.status === statusFilter;
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        item.name.toLowerCase().includes(q) ||
        item.phone.includes(q) ||
        (item.email && item.email.toLowerCase().includes(q)) ||
        item.service.toLowerCase().includes(q) ||
        item.id.toLowerCase().includes(q);
      return matchesStatus && matchesSearch;
    });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <div className="flex items-center space-x-2 text-brand-accent text-xs font-bold uppercase tracking-wider mb-1">
            <Calendar className="w-4 h-4" />
            <span>Native Booking Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-display text-white">
            Appointments & Schedules
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage client strategy calls, adjust time slots, and connect with prospects
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center space-x-2 bg-slate-900 border border-slate-800 p-1 rounded-xl text-xs font-bold">
          <button
            onClick={() => setActiveTab("bookings")}
            className={`px-4 py-2 rounded-lg transition-all ${
              activeTab === "bookings"
                ? "bg-brand-accent text-white shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            All Appointments ({totalCount})
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`px-4 py-2 rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === "settings"
                ? "bg-brand-accent text-white shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Slot Availability</span>
          </button>
        </div>
      </div>

        {/* Floating Notification */}
        {notification && (
          <div className="p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-700/80 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{notification}</span>
          </div>
        )}

        {/* TAB 1: BOOKINGS LIST */}
        {activeTab === "bookings" && (
          <div className="space-y-6">
            
            {/* Stat Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
                <div className="text-[10px] uppercase font-bold text-slate-400">Total Bookings</div>
                <div className="text-2xl font-black text-white font-display mt-1">{totalCount}</div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
                <div className="text-[10px] uppercase font-bold text-amber-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
                  Pending Review
                </div>
                <div className="text-2xl font-black text-amber-300 font-display mt-1">{pendingCount}</div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
                <div className="text-[10px] uppercase font-bold text-emerald-400">Confirmed</div>
                <div className="text-2xl font-black text-emerald-400 font-display mt-1">{confirmedCount}</div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
                <div className="text-[10px] uppercase font-bold text-blue-400">Completed</div>
                <div className="text-2xl font-black text-blue-400 font-display mt-1">{completedCount}</div>
              </div>
            </div>

            {/* Filter Bar & Search */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-900/80 p-3.5 rounded-2xl border border-slate-800">
              
              {/* Search */}
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by client, phone, or service..."
                  className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-accent"
                />
              </div>

              {/* Status Filter Buttons */}
              <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
                {(["all", "pending", "confirmed", "completed", "cancelled"] as const).map((st) => {
                  const count =
                    st === "all"
                      ? totalCount
                      : st === "pending"
                      ? pendingCount
                      : st === "confirmed"
                      ? confirmedCount
                      : st === "completed"
                      ? completedCount
                      : cancelledCount;

                  return (
                    <button
                      key={st}
                      onClick={() => setStatusFilter(st)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                        statusFilter === st
                          ? "bg-brand-accent text-white shadow-sm"
                          : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
                      }`}
                    >
                      <span>{st}</span>
                      <span className="text-[10px] opacity-75">({count})</span>
                    </button>
                  );
                })}

                <button
                  onClick={fetchData}
                  className="p-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors"
                  title="Refresh bookings"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

            {/* Table / List */}
            {loading ? (
              <div className="p-12 text-center text-slate-500 text-xs font-medium">
                Loading appointments...
              </div>
            ) : filteredSchedules.length === 0 ? (
              <div className="p-12 text-center bg-slate-900/40 rounded-2xl border border-slate-800/80 space-y-2">
                <Calendar className="w-8 h-8 text-slate-600 mx-auto" />
                <p className="text-slate-400 text-xs font-medium">No appointment records found.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredSchedules.map((item) => {
                  let waNumber = item.phone.replace(/[^0-9]/g, "");
                  if (waNumber.startsWith("01") && waNumber.length === 11) {
                    waNumber = "88" + waNumber;
                  }
                  const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(
                    `Hi ${item.name}, this is Omnix Network regarding your scheduled meeting on ${item.date} at ${item.timeSlot} (${item.service}).`
                  )}`;

                  const mailSubject = encodeURIComponent(
                    `Omnix Network: Scheduled Consultation on ${item.date}`
                  );
                  const mailBody = encodeURIComponent(
                    `Hi ${item.name},\n\nWe look forward to meeting with you on ${item.date} at ${item.timeSlot} regarding ${item.service}.\n\nReference ID: ${item.id}\n\nBest regards,\nOmnix Network Team`
                  );
                  const mailUrl = item.email ? `mailto:${item.email}?subject=${mailSubject}&body=${mailBody}` : null;

                  return (
                    <div
                      key={item.id}
                      className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-4"
                    >
                      {/* Left info */}
                      <div className="space-y-2 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs font-black text-white font-display">
                            {item.name}
                          </span>
                          <span className="font-mono text-[10px] text-slate-500 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                            {item.id}
                          </span>
                          
                          {/* Status Badge */}
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                              item.status === "confirmed"
                                ? "bg-emerald-950 text-emerald-400 border border-emerald-800"
                                : item.status === "pending"
                                ? "bg-amber-950 text-amber-300 border border-amber-800"
                                : item.status === "completed"
                                ? "bg-blue-950 text-blue-400 border border-blue-800"
                                : "bg-rose-950 text-rose-400 border border-rose-800"
                            }`}
                          >
                            {item.status}
                          </span>
                        </div>

                        {/* Date & Service */}
                        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
                          <span className="flex items-center gap-1 font-semibold text-brand-cyan">
                            <Calendar className="w-3.5 h-3.5" />
                            {item.date}
                          </span>
                          <span className="flex items-center gap-1 font-semibold text-emerald-400">
                            <Clock className="w-3.5 h-3.5" />
                            {item.timeSlot}
                          </span>
                          <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-[11px] text-slate-300">
                            {item.service}
                          </span>
                        </div>

                        {/* Contact details */}
                        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 pt-1">
                          <span className="flex items-center gap-1">
                            <Phone className="w-3 h-3 text-slate-500" />
                            {item.phone}
                          </span>
                          {item.email && (
                            <span className="flex items-center gap-1">
                              <Mail className="w-3 h-3 text-slate-500" />
                              {item.email}
                            </span>
                          )}
                        </div>

                        {/* Client Notes */}
                        {item.notes && (
                          <div className="text-xs text-slate-400 bg-slate-950 p-2.5 rounded-xl border border-slate-800/80 mt-1 max-w-2xl">
                            <strong className="text-slate-300 block mb-0.5">Notes:</strong>
                            {item.notes}
                          </div>
                        )}
                      </div>

                      {/* Right Action Buttons */}
                      <div className="flex flex-wrap items-center gap-2 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-800">
                        {/* 1-Click WhatsApp Button */}
                        <a
                          href={waUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-2 rounded-xl bg-emerald-950 hover:bg-emerald-900 border border-emerald-800 text-emerald-300 text-xs font-bold transition-all flex items-center gap-1.5"
                          title="Message on WhatsApp"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>WhatsApp</span>
                        </a>

                        {/* 1-Click Email Button */}
                        {mailUrl && (
                          <a
                            href={mailUrl}
                            className="px-3 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs font-bold transition-all flex items-center gap-1.5"
                            title="Send Email"
                          >
                            <Mail className="w-3.5 h-3.5 text-slate-400" />
                            <span>Email</span>
                          </a>
                        )}

                        {/* Status Switcher Dropdown */}
                        <select
                          value={item.status}
                          onChange={(e) =>
                            handleStatusUpdate(item.id, e.target.value as ScheduleItem["status"])
                          }
                          className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs font-bold text-slate-200 focus:outline-none focus:border-brand-accent cursor-pointer"
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>

                        {/* Delete */}
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-2 rounded-xl bg-slate-950 hover:bg-rose-950/60 border border-slate-800 hover:border-rose-800 text-slate-400 hover:text-rose-400 transition-colors"
                          title="Delete appointment"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

          </div>
        )}

        {/* TAB 2: SLOT AVAILABILITY & SETTINGS */}
        {activeTab === "settings" && (
          <form onSubmit={handleSaveSettings} className="space-y-6 max-w-3xl">
            
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-5">
              <div>
                <h3 className="text-base font-bold text-white font-display">
                  Meeting Duration
                </h3>
                <p className="text-xs text-slate-400">
                  Select the default meeting length allocated for discovery calls
                </p>
                <div className="flex items-center gap-3 mt-3">
                  {[15, 30, 45, 60].map((mins) => (
                    <button
                      key={mins}
                      type="button"
                      onClick={() => setMeetingDuration(mins)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                        meetingDuration === mins
                          ? "bg-brand-accent text-white border-brand-accent shadow-sm"
                          : "bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700"
                      }`}
                    >
                      {mins} Minutes
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800">
                <h3 className="text-base font-bold text-white font-display mb-1">
                  Active Booking Slots
                </h3>
                <p className="text-xs text-slate-400 mb-4">
                  These times will be available for clients to book in the public schedule modal
                </p>

                {/* Slots Grid */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {timeSlots.map((slot) => (
                    <div
                      key={slot}
                      className="px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-bold text-slate-200 flex items-center gap-2 group"
                    >
                      <Clock className="w-3 h-3 text-brand-accent" />
                      <span>{slot}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveSlot(slot)}
                        className="text-slate-500 hover:text-rose-400 transition-colors ml-1"
                        title="Remove time slot"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>

                {/* Add new slot */}
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={newSlotInput}
                    onChange={(e) => setNewSlotInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddSlot();
                      }
                    }}
                    placeholder="e.g. 04:00 PM"
                    className="px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-accent"
                  />
                  <button
                    type="button"
                    onClick={handleAddSlot}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Slot</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex items-center justify-end">
              <button
                type="submit"
                disabled={savingSettings}
                className="px-6 py-3 rounded-xl bg-brand-accent hover:bg-brand-accentHover text-white text-xs font-bold transition-all shadow-md shadow-brand-accent/20 flex items-center gap-2 disabled:opacity-50"
              >
                {savingSettings ? "Saving Settings..." : "Save Availability Settings"}
              </button>
            </div>

          </form>
        )}
    </div>
  );
}
