"use client";

import React, { useState, useEffect } from "react";
import { TestimonialItem } from "@/lib/types";
import { Plus, Edit2, Trash2, Check, X, Save, MessageSquare } from "lucide-react";

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<TestimonialItem | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/content/testimonials");
    const data = await res.json();
    setTestimonials(data);
    setLoading(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    let updatedList: TestimonialItem[];
    if (isNew) {
      updatedList = [...testimonials, editingItem];
    } else {
      updatedList = testimonials.map((t) => (t.id === editingItem.id ? editingItem : t));
    }

    const res = await fetch("/api/admin/content/testimonials", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedList),
    });

    if (res.ok) {
      setTestimonials(updatedList);
      setEditingItem(null);
      setMessage("Testimonials updated successfully!");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this review?")) return;

    const updatedList = testimonials.filter((t) => t.id !== id);
    const res = await fetch("/api/admin/content/testimonials", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedList),
    });

    if (res.ok) {
      setTestimonials(updatedList);
      setMessage("Review deleted.");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const startAddNew = () => {
    setIsNew(true);
    setEditingItem({
      id: `${Date.now()}`,
      name: "Client Name",
      company: "Founder / CEO, Company Ltd",
      rating: "⭐⭐⭐⭐⭐",
      text: {
        en: "Omnix Network delivers outstanding digital marketing growth and high transparency.",
        bn: "ওমনিক্স নেটওয়ার্কের কাজের মান এবং পারফরম্যান্স দারুণ।",
      },
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold font-display text-white">
            Manage Testimonials
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Curate client reviews and ratings displayed on the homepage slider.
          </p>
        </div>
        <button
          onClick={startAddNew}
          className="px-4 py-2.5 rounded-xl bg-brand-accent hover:bg-brand-accentHover text-white text-xs font-bold transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Testimonial</span>
        </button>
      </div>

      {message && (
        <div className="p-3.5 rounded-xl bg-emerald-950/50 border border-emerald-800/80 text-emerald-300 text-xs flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>{message}</span>
        </div>
      )}

      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-950 border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
            <tr>
              <th className="p-4">Client Name</th>
              <th className="p-4">Company / Role</th>
              <th className="p-4">Rating</th>
              <th className="p-4">Review Statement (EN)</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 text-slate-300">
            {loading ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-slate-500">
                  Loading testimonials...
                </td>
              </tr>
            ) : (
              testimonials.map((t) => (
                <tr key={t.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-4 font-bold text-white">{t.name}</td>
                  <td className="p-4 text-slate-300">{t.company}</td>
                  <td className="p-4 text-amber-400">{t.rating}</td>
                  <td className="p-4 text-slate-400 max-w-sm truncate">&ldquo;{t.text.en}&rdquo;</td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => {
                        setIsNew(false);
                        setEditingItem({ ...t });
                      }}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(t.id)}
                      className="p-1.5 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 transition-colors"
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

      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 w-full max-w-xl max-h-[90vh] overflow-y-auto space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h2 className="text-xl font-bold font-display text-white">
                {isNew ? "Add Testimonial" : `Edit Testimonial: ${editingItem.name}`}
              </h2>
              <button
                onClick={() => setEditingItem(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Client Name *</label>
                  <input
                    type="text"
                    required
                    value={editingItem.name}
                    onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Company / Role *</label>
                  <input
                    type="text"
                    required
                    value={editingItem.company}
                    onChange={(e) => setEditingItem({ ...editingItem, company: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">Rating String</label>
                <input
                  type="text"
                  value={editingItem.rating}
                  onChange={(e) => setEditingItem({ ...editingItem, rating: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">Review Statement (English) *</label>
                <textarea
                  rows={3}
                  required
                  value={editingItem.text.en}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      text: { ...editingItem.text, en: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">Review Statement (Bengali) *</label>
                <textarea
                  rows={3}
                  required
                  value={editingItem.text.bn}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      text: { ...editingItem.text, bn: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200"
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
                  <span>Save Review</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
