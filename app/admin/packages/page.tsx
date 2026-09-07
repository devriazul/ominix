"use client";

import React, { useState, useEffect } from "react";
import { PackageItem } from "@/lib/types";
import { Plus, Edit2, Trash2, Check, X, Save, Package } from "lucide-react";

export default function AdminPackagesPage() {
  const [packages, setPackages] = useState<PackageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<PackageItem | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/content/packages");
    const data = await res.json();
    setPackages(data);
    setLoading(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    let updatedList: PackageItem[];
    if (isNew) {
      updatedList = [...packages, editingItem];
    } else {
      updatedList = packages.map((p) => (p.id === editingItem.id ? editingItem : p));
    }

    const res = await fetch("/api/admin/content/packages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedList),
    });

    if (res.ok) {
      setPackages(updatedList);
      setEditingItem(null);
      setMessage("Packages updated successfully!");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this package?")) return;

    const updatedList = packages.filter((p) => p.id !== id);
    const res = await fetch("/api/admin/content/packages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedList),
    });

    if (res.ok) {
      setPackages(updatedList);
      setMessage("Package deleted.");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const startAddNew = () => {
    setIsNew(true);
    setEditingItem({
      id: `pkg-${Date.now().toString().slice(-4)}`,
      title: { en: "", bn: "" },
      type: "Custom",
      desc: { en: "", bn: "" },
      price: "Custom / Month",
      features: {
        en: "<li>Feature 1</li><li>Feature 2</li>",
        bn: "<li>বৈশিষ্ট্য ১</li><li>বৈশিষ্ট্য ২</li>",
      },
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold font-display text-white">
            Manage Packages
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Configure agency retainers, pricing tags, and feature sets.
          </p>
        </div>
        <button
          onClick={startAddNew}
          className="px-4 py-2.5 rounded-xl bg-brand-accent hover:bg-brand-accentHover text-white text-xs font-bold transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Package</span>
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
              <th className="p-4">ID</th>
              <th className="p-4">Package Name (EN)</th>
              <th className="p-4">Type</th>
              <th className="p-4">Pricing</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 text-slate-300">
            {loading ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-slate-500">
                  Loading packages...
                </td>
              </tr>
            ) : (
              packages.map((pkg) => (
                <tr key={pkg.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-4 font-mono font-bold text-brand-cyan">{pkg.id}</td>
                  <td className="p-4 font-semibold text-white">{pkg.title.en}</td>
                  <td className="p-4">
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 text-[10px] font-bold">
                      {pkg.type}
                    </span>
                  </td>
                  <td className="p-4 text-emerald-400 font-bold">{pkg.price || "Custom"}</td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => {
                        setIsNew(false);
                        setEditingItem({ ...pkg });
                      }}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(pkg.id)}
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
                {isNew ? "Create New Package" : `Edit Package: ${editingItem.id}`}
              </h2>
              <button
                onClick={() => setEditingItem(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Package ID *</label>
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
                  <label className="block text-slate-400 font-bold mb-1">Type Tag</label>
                  <input
                    type="text"
                    value={editingItem.type}
                    onChange={(e) => setEditingItem({ ...editingItem, type: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Price</label>
                  <input
                    type="text"
                    value={editingItem.price || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, price: e.target.value })}
                    placeholder="e.g. $499 / Month"
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
                  Features (English - HTML list)
                </label>
                <textarea
                  rows={3}
                  value={editingItem.features.en}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      features: { ...editingItem.features, en: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">
                  Features (Bengali - HTML list)
                </label>
                <textarea
                  rows={3}
                  value={editingItem.features.bn}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      features: { ...editingItem.features, bn: e.target.value },
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
                  <span>Save Package</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
