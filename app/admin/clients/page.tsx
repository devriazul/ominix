"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ClientLogoItem } from "@/lib/types";
import {
  Plus,
  Edit2,
  Trash2,
  Upload,
  Check,
  X,
  Save,
  Globe,
  Eye,
  EyeOff,
  Image as ImageIcon,
  Building2,
  ArrowUpDown,
  RefreshCw,
} from "lucide-react";

export default function AdminClientsPage() {
  const [clients, setClients] = useState<ClientLogoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<ClientLogoItem | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [uploading, setUploading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/content/clients");
      if (res.ok) {
        const data = await res.json();
        setClients(data);
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingItem) return;

    setUploading(true);
    setErrorMsg("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.url) {
        setEditingItem({
          ...editingItem,
          logo: data.url,
          name: editingItem.name || file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " "),
        });
        setMessage("Logo uploaded successfully!");
        setTimeout(() => setMessage(""), 3000);
      } else {
        setErrorMsg(data.error || "Upload failed. Check file type and size.");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Network error during file upload.");
    }

    setUploading(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    if (!editingItem.name.trim()) {
      setErrorMsg("Client name is required.");
      return;
    }

    if (!editingItem.logo.trim()) {
      setErrorMsg("Please upload a logo or enter an image URL.");
      return;
    }

    let updatedList: ClientLogoItem[];
    if (isNew) {
      updatedList = [...clients, editingItem];
    } else {
      updatedList = clients.map((c) => (c.id === editingItem.id ? editingItem : c));
    }

    try {
      const res = await fetch("/api/admin/content/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedList),
      });

      if (res.ok) {
        setClients(updatedList);
        setEditingItem(null);
        setIsNew(false);
        setMessage(isNew ? "Client logo added!" : "Client logo updated!");
        setTimeout(() => setMessage(""), 3000);
      } else {
        setErrorMsg("Failed to save client logo.");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Failed to save client logo.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this client logo?")) return;

    const updatedList = clients.filter((c) => c.id !== id);
    try {
      const res = await fetch("/api/admin/content/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedList),
      });

      if (res.ok) {
        setClients(updatedList);
        setMessage("Client logo deleted.");
        setTimeout(() => setMessage(""), 3000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const toggleActive = async (client: ClientLogoItem) => {
    const updated = clients.map((c) =>
      c.id === client.id ? { ...c, active: c.active === false ? true : false } : c
    );

    setClients(updated);
    await fetch("/api/admin/content/clients", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });
  };

  const startAddNew = () => {
    setIsNew(true);
    setErrorMsg("");
    setEditingItem({
      id: `client-${Date.now()}`,
      name: "",
      logo: "",
      website: "",
      order: clients.length + 1,
      active: true,
    });
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2.5">
            <Building2 className="w-6 h-6 text-brand-accent" />
            Client Logos Management
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Upload and manage client/partner brand logos displayed in the homepage infinite ticker.
          </p>
        </div>

        <button
          onClick={startAddNew}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-brand-accent hover:bg-blue-600 text-white text-sm font-semibold rounded-xl shadow-md shadow-brand-accent/20 transition-all hover:scale-105 active:scale-95 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          Add Client Logo
        </button>
      </div>

      {/* Success Notification */}
      {message && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center gap-2.5 animate-fade-in">
          <Check className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{message}</span>
        </div>
      )}

      {/* Error Notification */}
      {errorMsg && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-center gap-2.5 animate-fade-in">
          <X className="w-5 h-5 text-rose-600 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Logo Grid */}
      {loading ? (
        <div className="py-20 text-center text-slate-400">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-2 text-brand-accent" />
          Loading client logos...
        </div>
      ) : clients.length === 0 ? (
        <div className="py-16 text-center border-2 border-dashed border-slate-200 rounded-2xl p-8 bg-slate-50/50">
          <ImageIcon className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-600 font-semibold mb-1">No client logos found</p>
          <p className="text-slate-400 text-sm mb-4">
            Upload your first client or partner brand logo to display on the website.
          </p>
          <button
            onClick={startAddNew}
            className="px-4 py-2 bg-brand-accent text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition"
          >
            Upload Logo
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {clients.map((client) => (
            <div
              key={client.id}
              className={`relative group p-4 rounded-2xl bg-white border transition-all duration-200 flex flex-col justify-between ${
                client.active !== false
                  ? "border-slate-200 shadow-sm hover:shadow-md hover:border-brand-accent/40"
                  : "border-slate-200/60 opacity-60 bg-slate-50/60"
              }`}
            >
              {/* Logo Preview Box */}
              <div className="relative h-24 w-full bg-slate-50 rounded-xl border border-slate-150 flex items-center justify-center p-3 mb-3 overflow-hidden group-hover:bg-slate-100/70 transition-colors">
                {client.logo ? (
                  <div className="relative w-full h-full flex items-center justify-center">
                    <img
                      src={client.logo}
                      alt={client.name}
                      className="max-h-16 max-w-full object-contain filter drop-shadow-sm"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/logo.png";
                      }}
                    />
                  </div>
                ) : (
                  <ImageIcon className="w-8 h-8 text-slate-300" />
                )}

                {/* Active Indicator Badge */}
                <button
                  onClick={() => toggleActive(client)}
                  title={client.active !== false ? "Active (click to hide)" : "Hidden (click to show)"}
                  className="absolute top-2 right-2 p-1 rounded-md bg-white/90 shadow-sm hover:bg-white text-slate-500 hover:text-slate-800 transition"
                >
                  {client.active !== false ? (
                    <Eye className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <EyeOff className="w-3.5 h-3.5 text-slate-400" />
                  )}
                </button>
              </div>

              {/* Info & Actions */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-bold text-slate-800 text-sm truncate">{client.name}</h3>
                  <span className="text-xs font-mono text-slate-400">#{client.order || 0}</span>
                </div>

                {client.website ? (
                  <a
                    href={client.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-brand-accent hover:underline flex items-center gap-1 truncate mb-3"
                  >
                    <Globe className="w-3 h-3 shrink-0" />
                    <span className="truncate">{client.website.replace(/^https?:\/\//, "")}</span>
                  </a>
                ) : (
                  <div className="text-xs text-slate-400 italic mb-3">No website link</div>
                )}

                {/* Bottom Card Actions */}
                <div className="flex items-center justify-end gap-1.5 pt-2 border-t border-slate-100">
                  <button
                    onClick={() => {
                      setIsNew(false);
                      setErrorMsg("");
                      setEditingItem({ ...client });
                    }}
                    className="p-1.5 text-slate-500 hover:text-brand-accent hover:bg-blue-50 rounded-lg transition"
                    title="Edit Logo"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(client.id)}
                    className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                    title="Delete Logo"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit / Create Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-150 flex items-center justify-between bg-slate-50/70">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-brand-accent" />
                {isNew ? "Add New Client Logo" : "Edit Client Logo"}
              </h2>
              <button
                onClick={() => setEditingItem(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSave} className="p-6 space-y-5">
              {/* File Upload Section */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Client Logo Image
                </label>

                {/* Hidden File Input */}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/png,image/jpeg,image/svg+xml,image/webp"
                  className="hidden"
                />

                {/* Upload Box / Drag & Drop area */}
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-slate-200 hover:border-brand-accent/50 rounded-xl p-4 bg-slate-50/70 hover:bg-blue-50/30 cursor-pointer transition text-center flex flex-col items-center justify-center min-h-[120px]"
                >
                  {uploading ? (
                    <div className="flex flex-col items-center">
                      <RefreshCw className="w-6 h-6 animate-spin text-brand-accent mb-2" />
                      <span className="text-xs text-slate-500 font-medium">Uploading logo...</span>
                    </div>
                  ) : editingItem.logo ? (
                    <div className="flex flex-col items-center gap-2">
                      <div className="h-16 w-36 relative flex items-center justify-center p-2 bg-white rounded-lg border border-slate-200 shadow-sm">
                        <img
                          src={editingItem.logo}
                          alt="Preview"
                          className="max-h-12 max-w-full object-contain"
                        />
                      </div>
                      <span className="text-xs text-brand-accent font-semibold flex items-center gap-1">
                        <Upload className="w-3.5 h-3.5" />
                        Click to change image
                      </span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-blue-100/70 text-brand-accent flex items-center justify-center mb-2">
                        <Upload className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-bold text-slate-700">Click to upload logo</span>
                      <span className="text-[11px] text-slate-400 mt-0.5">
                        PNG, SVG, JPG, or WEBP (max 5MB)
                      </span>
                    </div>
                  )}
                </div>

                {/* Direct Image URL input */}
                <div className="mt-2.5">
                  <span className="text-[11px] text-slate-400 font-medium">Or enter image URL:</span>
                  <input
                    type="text"
                    value={editingItem.logo}
                    onChange={(e) => setEditingItem({ ...editingItem, logo: e.target.value })}
                    placeholder="https://example.com/logo.png or /clients/techflow.svg"
                    className="w-full mt-1 px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:border-brand-accent"
                  />
                </div>
              </div>

              {/* Client Name */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Client / Brand Name *
                </label>
                <input
                  type="text"
                  required
                  value={editingItem.name}
                  onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                  placeholder="e.g. TechFlow Systems"
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent"
                />
              </div>

              {/* Website URL & Order */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Website URL (Optional)
                  </label>
                  <input
                    type="url"
                    value={editingItem.website || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, website: e.target.value })}
                    placeholder="https://clientwebsite.com"
                    className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:border-brand-accent"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={editingItem.order || 1}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, order: parseInt(e.target.value) || 1 })
                    }
                    className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:border-brand-accent"
                  />
                </div>
              </div>

              {/* Active Toggle */}
              <div className="flex items-center gap-3 pt-1">
                <input
                  type="checkbox"
                  id="activeToggle"
                  checked={editingItem.active !== false}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, active: e.target.checked })
                  }
                  className="w-4 h-4 text-brand-accent rounded border-slate-300 focus:ring-brand-accent"
                />
                <label htmlFor="activeToggle" className="text-sm font-medium text-slate-700 cursor-pointer">
                  Display this logo in the homepage marquee
                </label>
              </div>

              {/* Modal Actions */}
              <div className="pt-4 border-t border-slate-150 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-sm font-semibold bg-brand-accent hover:bg-blue-600 text-white shadow-md shadow-brand-accent/20 transition flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Save Logo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
