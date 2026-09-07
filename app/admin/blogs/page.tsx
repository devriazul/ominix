"use client";

import React, { useState, useEffect } from "react";
import { BlogPost } from "@/lib/types";
import { Plus, Edit2, Trash2, Check, X, Save, BookOpen } from "lucide-react";

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<BlogPost | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/content/blogs");
    const data = await res.json();
    setBlogs(data);
    setLoading(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    let updatedList: BlogPost[];
    if (isNew) {
      updatedList = [...blogs, editingItem];
    } else {
      updatedList = blogs.map((b) => (b.id === editingItem.id ? editingItem : b));
    }

    const res = await fetch("/api/admin/content/blogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedList),
    });

    if (res.ok) {
      setBlogs(updatedList);
      setEditingItem(null);
      setMessage("Blog posts saved successfully!");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;

    const updatedList = blogs.filter((b) => b.id !== id);
    const res = await fetch("/api/admin/content/blogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedList),
    });

    if (res.ok) {
      setBlogs(updatedList);
      setMessage("Blog post deleted.");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const startAddNew = () => {
    setIsNew(true);
    setEditingItem({
      id: `${Date.now()}`,
      title: { en: "", bn: "" },
      excerpt: { en: "", bn: "" },
      content: {
        en: "<p>Article write-up begins here...</p>",
        bn: "<p>নিবন্ধের বিবরণ...</p>",
      },
      author: "Admin Strategist",
      date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop",
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold font-display text-white">
            Manage Blog Posts
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Publish thought-leadership articles and digital marketing guides in both English and Bengali.
          </p>
        </div>
        <button
          onClick={startAddNew}
          className="px-4 py-2.5 rounded-xl bg-brand-accent hover:bg-brand-accentHover text-white text-xs font-bold transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Write New Blog</span>
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
              <th className="p-4">Title (English)</th>
              <th className="p-4">Author</th>
              <th className="p-4">Date</th>
              <th className="p-4">Read Time</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 text-slate-300">
            {loading ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-slate-500">
                  Loading blog posts...
                </td>
              </tr>
            ) : (
              blogs.map((b) => (
                <tr key={b.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-4 font-bold text-white max-w-sm truncate">{b.title.en}</td>
                  <td className="p-4 text-slate-300">{b.author}</td>
                  <td className="p-4 text-slate-400">{b.date}</td>
                  <td className="p-4 text-brand-cyan">{b.readTime}</td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => {
                        setIsNew(false);
                        setEditingItem({ ...b });
                      }}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(b.id)}
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
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 w-full max-w-3xl max-h-[90vh] overflow-y-auto space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h2 className="text-xl font-bold font-display text-white">
                {isNew ? "Create Blog Article" : `Edit Article: ${editingItem.title.en}`}
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
                  <label className="block text-slate-400 font-bold mb-1">Author</label>
                  <input
                    type="text"
                    value={editingItem.author}
                    onChange={(e) => setEditingItem({ ...editingItem, author: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Date</label>
                  <input
                    type="text"
                    value={editingItem.date}
                    onChange={(e) => setEditingItem({ ...editingItem, date: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Read Time</label>
                  <input
                    type="text"
                    value={editingItem.readTime}
                    onChange={(e) => setEditingItem({ ...editingItem, readTime: e.target.value })}
                    placeholder="e.g. 5 min read"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">Cover Image URL</label>
                <input
                  type="text"
                  value={editingItem.image}
                  onChange={(e) => setEditingItem({ ...editingItem, image: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200"
                />
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
                  <label className="block text-slate-400 font-bold mb-1">Excerpt (English)</label>
                  <textarea
                    rows={2}
                    value={editingItem.excerpt.en}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        excerpt: { ...editingItem.excerpt, en: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Excerpt (Bengali)</label>
                  <textarea
                    rows={2}
                    value={editingItem.excerpt.bn}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        excerpt: { ...editingItem.excerpt, bn: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">Full Article HTML (English)</label>
                <textarea
                  rows={6}
                  value={editingItem.content.en}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      content: { ...editingItem.content, en: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">Full Article HTML (Bengali)</label>
                <textarea
                  rows={6}
                  value={editingItem.content.bn}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      content: { ...editingItem.content, bn: e.target.value },
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
                  <span>Publish / Save Blog</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
