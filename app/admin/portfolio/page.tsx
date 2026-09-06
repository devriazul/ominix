"use client";

import React, { useState, useEffect } from "react";
import { PortfolioItem } from "@/lib/types";
import { Plus, Edit2, Trash2, Check, X, Save, Briefcase } from "lucide-react";

export default function AdminPortfolioPage() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const fetchPortfolio = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/content/portfolio");
    const data = await res.json();
    setItems(data);
    setLoading(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    let updatedList: PortfolioItem[];
    if (isNew) {
      updatedList = [...items, editingItem];
    } else {
      updatedList = items.map((p) => (p.id === editingItem.id ? editingItem : p));
    }

    const res = await fetch("/api/admin/content/portfolio", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedList),
    });

    if (res.ok) {
      setItems(updatedList);
      setEditingItem(null);
      setMessage("Portfolio updated successfully!");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this case study?")) return;

    const updatedList = items.filter((p) => p.id !== id);
    const res = await fetch("/api/admin/content/portfolio", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedList),
    });

    if (res.ok) {
      setItems(updatedList);
      setMessage("Case study deleted.");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const startAddNew = () => {
    setIsNew(true);
    setEditingItem({
      id: `${Date.now()}`,
      title: { en: "", bn: "" },
      tag: "WEB / SEO",
      category: "web",
      client: "New Client Ltd",
      duration: "3 Months",
      metrics: { en: "+100% Growth", bn: "+১০০% বৃদ্ধি" },
      details: {
        en: "<p>Case study detailed results...</p>",
        bn: "<p>কেস স্টাডি বিবরণ...</p>",
      },
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=800&auto=format&fit=crop",
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold font-display text-white">
            Manage Case Studies
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Publish client success stories, conversion metrics, and project outcomes.
          </p>
        </div>
        <button
          onClick={startAddNew}
          className="px-4 py-2.5 rounded-xl bg-brand-accent hover:bg-brand-accentHover text-white text-xs font-bold transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Case Study</span>
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
              <th className="p-4">Client</th>
              <th className="p-4">Title (EN)</th>
              <th className="p-4">Category</th>
              <th className="p-4">Result Metric</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 text-slate-300">
            {loading ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-slate-500">
                  Loading case studies...
                </td>
              </tr>
            ) : (
              items.map((item) => (
                <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-4 font-bold text-white">{item.client}</td>
                  <td className="p-4 font-semibold text-slate-200">{item.title.en}</td>
                  <td className="p-4">
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-brand-cyan text-[10px] font-bold uppercase">
                      {item.category}
                    </span>
                  </td>
                  <td className="p-4 text-emerald-400 font-semibold">{item.metrics.en}</td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => {
                        setIsNew(false);
                        setEditingItem({ ...item });
                      }}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
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
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h2 className="text-xl font-bold font-display text-white">
                {isNew ? "Create Case Study" : `Edit Case Study: ${editingItem.title.en}`}
              </h2>
              <button
                onClick={() => setEditingItem(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Client Name *</label>
                  <input
                    type="text"
                    required
                    value={editingItem.client}
                    onChange={(e) => setEditingItem({ ...editingItem, client: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Category *</label>
                  <select
                    value={editingItem.category}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        category: e.target.value as any,
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200"
                  >
                    <option value="web">Web Development</option>
                    <option value="seo">SEO</option>
                    <option value="ads">Media Buying / Ads</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Duration</label>
                  <input
                    type="text"
                    value={editingItem.duration}
                    onChange={(e) => setEditingItem({ ...editingItem, duration: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Tag (Badge Text)</label>
                  <input
                    type="text"
                    value={editingItem.tag}
                    onChange={(e) => setEditingItem({ ...editingItem, tag: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200"
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Result Metric (EN) *</label>
                  <input
                    type="text"
                    required
                    value={editingItem.metrics.en}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        metrics: { ...editingItem.metrics, en: e.target.value },
                      })
                    }
                    placeholder="e.g. +340% ROI on Social Campaigns"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Result Metric (BN) *</label>
                  <input
                    type="text"
                    required
                    value={editingItem.metrics.bn}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        metrics: { ...editingItem.metrics, bn: e.target.value },
                      })
                    }
                    placeholder="e.g. +৩৪০% আরওআই"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">Details HTML (English)</label>
                <textarea
                  rows={4}
                  value={editingItem.details.en}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      details: { ...editingItem.details, en: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">Details HTML (Bengali)</label>
                <textarea
                  rows={4}
                  value={editingItem.details.bn}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      details: { ...editingItem.details, bn: e.target.value },
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
                  <span>Save Case Study</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
