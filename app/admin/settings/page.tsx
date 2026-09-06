"use client";

import React, { useState, useEffect } from "react";
import { SiteSettings } from "@/lib/types";
import { Save, Check, Settings, Lock, MapPin, Share2 } from "lucide-react";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // Account password change state
  const [newUsername, setNewUsername] = useState("admin");
  const [newPassword, setNewPassword] = useState("");
  const [passwordMsg, setPasswordMsg] = useState("");

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/content/settings");
    const data = await res.json();
    setSettings(data);
    setLoading(false);
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;

    const res = await fetch("/api/admin/content/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });

    if (res.ok) {
      setMessage("Site and contact settings saved successfully!");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword) {
      setPasswordMsg("Please enter a new password");
      return;
    }

    const res = await fetch("/api/admin/content/account", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: newUsername,
        password: newPassword,
      }),
    });

    if (res.ok) {
      setPasswordMsg("Admin credentials updated successfully!");
      setNewPassword("");
      setTimeout(() => setPasswordMsg(""), 4000);
    }
  };

  if (loading || !settings) {
    return <div className="p-8 text-center text-slate-500">Loading settings...</div>;
  }

  return (
    <div className="space-y-10">
      <div className="border-b border-slate-800 pb-6">
        <h1 className="text-3xl font-extrabold font-display text-white">
          Site & Brand Settings
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Configure agency contact numbers, WhatsApp lead routing, office locations, and security.
        </p>
      </div>

      {message && (
        <div className="p-3.5 rounded-xl bg-emerald-950/50 border border-emerald-800/80 text-emerald-300 text-xs flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>{message}</span>
        </div>
      )}

      {/* Main Settings Form */}
      <form onSubmit={handleSaveSettings} className="space-y-8">
        {/* Core Communication */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <h2 className="text-lg font-bold font-display text-white flex items-center gap-2">
            <Settings className="w-5 h-5 text-brand-accent" />
            <span>Lead Routing & Main Contact</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block text-slate-400 font-bold mb-1">
                WhatsApp Forwarding Number (Without +) *
              </label>
              <input
                type="text"
                required
                value={settings.whatsappPhone}
                onChange={(e) => setSettings({ ...settings, whatsappPhone: e.target.value })}
                placeholder="8801841451241"
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 font-mono"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">
                All WhatsApp consultation buttons forward directly to this number.
              </span>
            </div>

            <div>
              <label className="block text-slate-400 font-bold mb-1">Contact Phone</label>
              <input
                type="text"
                value={settings.contactPhone}
                onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-bold mb-1">Contact Email</label>
              <input
                type="email"
                value={settings.contactEmail}
                onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200"
              />
            </div>
          </div>
        </div>

        {/* Multiple Offices */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <h2 className="text-lg font-bold font-display text-white flex items-center gap-2">
            <MapPin className="w-5 h-5 text-brand-cyan" />
            <span>Office Locations</span>
          </h2>

          <div className="space-y-6">
            {settings.offices.map((office, idx) => (
              <div
                key={office.id}
                className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 text-xs"
              >
                <div className="text-sm font-bold text-white flex items-center justify-between">
                  <span>Office #{idx + 1} ({office.id})</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 font-bold mb-1">
                      Office Name (English)
                    </label>
                    <input
                      type="text"
                      value={office.name.en}
                      onChange={(e) => {
                        const newOffices = [...settings.offices];
                        newOffices[idx].name.en = e.target.value;
                        setSettings({ ...settings, offices: newOffices });
                      }}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 font-bold mb-1">
                      Office Name (Bengali)
                    </label>
                    <input
                      type="text"
                      value={office.name.bn}
                      onChange={(e) => {
                        const newOffices = [...settings.offices];
                        newOffices[idx].name.bn = e.target.value;
                        setSettings({ ...settings, offices: newOffices });
                      }}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 font-bold mb-1">
                      Address (English)
                    </label>
                    <input
                      type="text"
                      value={office.address.en}
                      onChange={(e) => {
                        const newOffices = [...settings.offices];
                        newOffices[idx].address.en = e.target.value;
                        setSettings({ ...settings, offices: newOffices });
                      }}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 font-bold mb-1">
                      Address (Bengali)
                    </label>
                    <input
                      type="text"
                      value={office.address.bn}
                      onChange={(e) => {
                        const newOffices = [...settings.offices];
                        newOffices[idx].address.bn = e.target.value;
                        setSettings({ ...settings, offices: newOffices });
                      }}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 font-bold mb-1">Phone</label>
                    <input
                      type="text"
                      value={office.phone}
                      onChange={(e) => {
                        const newOffices = [...settings.offices];
                        newOffices[idx].phone = e.target.value;
                        setSettings({ ...settings, offices: newOffices });
                      }}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 font-bold mb-1">Email</label>
                    <input
                      type="email"
                      value={office.email}
                      onChange={(e) => {
                        const newOffices = [...settings.offices];
                        newOffices[idx].email = e.target.value;
                        setSettings({ ...settings, offices: newOffices });
                      }}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Social Media Links */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <h2 className="text-lg font-bold font-display text-white flex items-center gap-2">
            <Share2 className="w-5 h-5 text-purple-400" />
            <span>Social Handles & Profiles</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-400 font-bold mb-1">Facebook Page</label>
              <input
                type="text"
                value={settings.socialLinks.facebook}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    socialLinks: { ...settings.socialLinks, facebook: e.target.value },
                  })
                }
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200"
              />
            </div>
            <div>
              <label className="block text-slate-400 font-bold mb-1">Instagram</label>
              <input
                type="text"
                value={settings.socialLinks.instagram}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    socialLinks: { ...settings.socialLinks, instagram: e.target.value },
                  })
                }
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200"
              />
            </div>
            <div>
              <label className="block text-slate-400 font-bold mb-1">LinkedIn</label>
              <input
                type="text"
                value={settings.socialLinks.linkedin}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    socialLinks: { ...settings.socialLinks, linkedin: e.target.value },
                  })
                }
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200"
              />
            </div>
            <div>
              <label className="block text-slate-400 font-bold mb-1">YouTube</label>
              <input
                type="text"
                value={settings.socialLinks.youtube}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    socialLinks: { ...settings.socialLinks, youtube: e.target.value },
                  })
                }
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-8 py-3 rounded-xl bg-brand-accent hover:bg-brand-accentHover text-white text-xs font-bold transition-colors flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Settings</span>
          </button>
        </div>
      </form>

      {/* Admin Security Settings */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
        <h2 className="text-lg font-bold font-display text-white flex items-center gap-2">
          <Lock className="w-5 h-5 text-amber-400" />
          <span>Admin Credentials & Security</span>
        </h2>

        {passwordMsg && (
          <div className="p-3.5 rounded-xl bg-emerald-950/50 border border-emerald-800/80 text-emerald-300 text-xs">
            {passwordMsg}
          </div>
        )}

        <form onSubmit={handleUpdatePassword} className="space-y-4 max-w-lg text-xs">
          <div>
            <label className="block text-slate-400 font-bold mb-1">Admin Username</label>
            <input
              type="text"
              required
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200"
            />
          </div>

          <div>
            <label className="block text-slate-400 font-bold mb-1">New Password</label>
            <input
              type="password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200"
            />
          </div>

          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold transition-colors flex items-center gap-2"
          >
            <Lock className="w-4 h-4" />
            <span>Update Password</span>
          </button>
        </form>
      </div>
    </div>
  );
}
