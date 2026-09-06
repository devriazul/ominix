"use client";

import React, { useState, useEffect } from "react";
import { ServiceItem } from "@/lib/types";
import { Plus, Edit2, Trash2, Check, X, Globe, Save } from "lucide-react";

export default function AdminServicesPage() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<ServiceItem | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/content/services");
    const data = await res.json();
    setServices(data);
    setLoading(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    let updatedList: ServiceItem[];
    if (isNew) {
      updatedList = [...services, editingItem];
    } else {
      updatedList = services.map((s) => (s.id === editingItem.id ? editingItem : s));
    }

    const res = await fetch("/api/admin/content/services", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedList),
    });

    if (res.ok) {
      setServices(updatedList);
      setEditingItem(null);
      setMessage("Services saved successfully!");
      setTimeout(() => setMessage(""), 3000);
    } else {
      setMessage("Error saving services.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return;

    const updatedList = services.filter((s) => s.id !== id);
    const res = await fetch("/api/admin/content/services", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedList),
    });

    if (res.ok) {
      setServices(updatedList);
      setMessage("Service deleted.");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const startAddNew = () => {
    setIsNew(true);
    setEditingItem({
      id: `s${Date.now().toString().slice(-4)}`,
      title: { en: "", bn: "" },
      desc: { en: "", bn: "" },
      benefits: { en: "<li>Deliverable 1</li><li>Deliverable 2</li>", bn: "<li>সুবিধা ১</li><li>সুবিধা ২</li>" },
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=800&auto=format&fit=crop",
      featured: true,
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold font-display text-white">
            Manage Services
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Add, update, or remove agency services with English and Bengali details.
          </p>
        </div>
        <button
          onClick={startAddNew}
          className="px-4 py-2.5 rounded-xl bg-brand-accent hover:bg-brand-accentHover text-white text-xs font-bold transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Service</span>
        </button>
      </div>

      {message && (
        <div className="p-3.5 rounded-xl bg-emerald-950/50 border border-emerald-800/80 text-emerald-300 text-xs flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>{message}</span>
        </div>
      )}

      {/* Services List Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-4">ID</th>
                <th className="p-4">Title (English)</th>
                <th className="p-4">Title (Bengali)</th>
                <th className="p-4">Description (Excerpt)</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              {loading ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-500">
                    Loading services...
                  </td>
                </tr>
              ) : services.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-500">
                    No services found. Click "Add New Service" to create one.
                  </td>
                </tr>
              ) : (
                services.map((svc) => (
                  <tr key={svc.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-4 font-mono font-bold text-brand-cyan">{svc.id}</td>
                    <td className="p-4 font-semibold text-white">{svc.title.en}</td>
                    <td className="p-4 text-slate-300">{svc.title.bn}</td>
                    <td className="p-4 text-slate-400 max-w-xs truncate">{svc.desc.en}</td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => {
                          setIsNew(false);
                          setEditingItem({ ...svc });
                        }}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
                        title="Edit Service"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(svc.id)}
                        className="p-1.5 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 transition-colors"
                        title="Delete Service"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit / Add Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h2 className="text-xl font-bold font-display text-white">
                {isNew ? "Create New Service" : `Edit Service: ${editingItem.id}`}
              </h2>
              <button
                onClick={() => setEditingItem(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Service ID *</label>
                  <input
                    type="text"
                    required
                    disabled={!isNew}
                    value={editingItem.id}
                    onChange={(e) => setEditingItem({ ...editingItem, id: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 disabled:opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Image URL</label>
                  <input
                    type="text"
                    value={editingItem.image}
                    onChange={(e) => setEditingItem({ ...editingItem, image: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Title (English) *</label>
                  <input
                    type="text"
                    required
                    value={editingItem.title.en}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        title: { ...editingItem.title, en: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Title (Bengali) *</label>
                  <input
                    type="text"
                    required
                    value={editingItem.title.bn}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        title: { ...editingItem.title, bn: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">Description (English)</label>
                <textarea
                  rows={2}
                  value={editingItem.desc.en}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      desc: { ...editingItem.desc, en: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">Description (Bengali)</label>
                <textarea
                  rows={2}
                  value={editingItem.desc.bn}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      desc: { ...editingItem.desc, bn: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">
                  Deliverables & Benefits (English - HTML list format)
                </label>
                <textarea
                  rows={3}
                  value={editingItem.benefits.en}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      benefits: { ...editingItem.benefits, en: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">
                  Deliverables & Benefits (Bengali - HTML list format)
                </label>
                <textarea
                  rows={3}
                  value={editingItem.benefits.bn}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      benefits: { ...editingItem.benefits, bn: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 font-mono text-[11px]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-brand-accent hover:bg-brand-accentHover text-white font-bold flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
