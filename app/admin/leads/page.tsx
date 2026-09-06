"use client";

import React, { useState, useEffect } from "react";
import { EnquiryItem } from "@/lib/types";
import { Users, Search, Trash2, CheckCircle, Clock, Check, MessageSquare, AlertCircle } from "lucide-react";

export default function AdminLeadsPage() {
  const [enquiries, setEnquiries] = useState<EnquiryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "new" | "contacted" | "closed">("all");
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    setLoading(true);
    const res = await fetch("/api/enquiries");
    const data = await res.json();
    setEnquiries(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  const handleStatusChange = async (id: string, newStatus: EnquiryItem["status"]) => {
    const res = await fetch("/api/enquiries", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status: newStatus }),
    });

    if (res.ok) {
      setEnquiries((prev) =>
        prev.map((e) => (e.id === id ? { ...e, status: newStatus } : e))
      );
      setMessage("Lead status updated.");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this enquiry record?")) return;

    const res = await fetch(`/api/enquiries?id=${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setEnquiries((prev) => prev.filter((e) => e.id !== id));
      setMessage("Lead record deleted.");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const filtered = enquiries.filter((item) => {
    const matchFilter = filter === "all" ? true : item.status === filter;
    const matchSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.phone.includes(search) ||
      item.service.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold font-display text-white">
            Visitor Inquiries & Leads
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Track inquiries captured via the website popup modal and contact forms.
          </p>
        </div>
      </div>

      {message && (
        <div className="p-3.5 rounded-xl bg-emerald-950/50 border border-emerald-800/80 text-emerald-300 text-xs flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>{message}</span>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Status Filters */}
        <div className="flex items-center space-x-2 bg-slate-900 border border-slate-800 p-1 rounded-2xl text-xs font-bold">
          {(["all", "new", "contacted", "closed"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl capitalize transition-colors ${
                filter === f
                  ? "bg-brand-accent text-white"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {f} ({enquiries.filter((e) => (f === "all" ? true : e.status === f)).length})
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search leads by name, phone..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-xs focus:ring-2 focus:ring-brand-accent/20 outline-none"
          />
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-4">Lead Name</th>
                <th className="p-4">Contact Info</th>
                <th className="p-4">Requested Service</th>
                <th className="p-4">Project Details</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              {loading ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-500">
                    Loading inquiries...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-500">
                    No leads found matching current filter.
                  </td>
                </tr>
              ) : (
                filtered.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-4">
                      <div className="font-bold text-white text-sm">{lead.name}</div>
                      <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                        {new Date(lead.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </td>
                    <td className="p-4 space-y-0.5">
                      <div className="font-semibold text-slate-200">{lead.phone}</div>
                      {lead.email && <div className="text-slate-400">{lead.email}</div>}
                    </td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-full bg-slate-800 text-brand-cyan text-[10px] font-bold">
                        {lead.service}
                      </span>
                    </td>
                    <td className="p-4 text-slate-400 max-w-xs truncate" title={lead.details}>
                      {lead.details || "—"}
                    </td>
                    <td className="p-4">
                      <select
                        value={lead.status}
                        onChange={(e) =>
                          handleStatusChange(lead.id, e.target.value as EnquiryItem["status"])
                        }
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase border bg-slate-950 outline-none cursor-pointer ${
                          lead.status === "new"
                            ? "text-emerald-400 border-emerald-500/40"
                            : lead.status === "contacted"
                            ? "text-cyan-400 border-cyan-500/40"
                            : "text-slate-400 border-slate-700"
                        }`}
                      >
                        <option value="new">New</option>
                        <option value="in_progress">In Progress</option>
                        <option value="contacted">Contacted</option>
                        <option value="closed">Closed</option>
                      </select>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <a
                        href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(`Hi ${lead.name}, thank you for your enquiry with Omnix Network regarding "${lead.service}". How can we help you today?`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] inline-flex items-center gap-1.5 transition-colors"
                      >
                        <MessageSquare className="w-3 h-3" />
                        <span>Reply</span>
                      </a>
                      <button
                        onClick={() => handleDelete(lead.id)}
                        className="p-1.5 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 transition-colors inline-flex items-center"
                        title="Delete record"
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
    </div>
  );
}
