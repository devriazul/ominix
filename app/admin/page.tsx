import { redirect } from "next/navigation";
import Link from "next/link";
import { isAuthenticated } from "@/lib/auth";
import {
  getServices,
  getPackages,
  getPortfolio,
  getBlogs,
  getTestimonials,
  getFaqs,
  getEnquiries,
} from "@/lib/db";
import {
  Globe,
  Package,
  Briefcase,
  BookOpen,
  MessageSquare,
  HelpCircle,
  Users,
  ArrowRight,
  TrendingUp,
  Clock,
  ExternalLink,
} from "lucide-react";

export default async function AdminDashboardPage() {
  const auth = await isAuthenticated();
  if (!auth) {
    redirect("/admin/login");
  }

  const services = await getServices();
  const packages = await getPackages();
  const portfolio = await getPortfolio();
  const blogs = await getBlogs();
  const testimonials = await getTestimonials();
  const faqs = await getFaqs();
  const enquiries = await getEnquiries();

  const newEnquiriesCount = enquiries.filter((e) => e.status === "new").length;

  const stats = [
    { label: "Services", count: services.length, href: "/admin/services", icon: Globe, color: "text-blue-400 bg-blue-500/10" },
    { label: "Packages", count: packages.length, href: "/admin/packages", icon: Package, color: "text-cyan-400 bg-cyan-500/10" },
    { label: "Case Studies", count: portfolio.length, href: "/admin/portfolio", icon: Briefcase, color: "text-purple-400 bg-purple-500/10" },
    { label: "Blogs", count: blogs.length, href: "/admin/blogs", icon: BookOpen, color: "text-amber-400 bg-amber-500/10" },
    { label: "Reviews", count: testimonials.length, href: "/admin/testimonials", icon: MessageSquare, color: "text-emerald-400 bg-emerald-500/10" },
    { label: "FAQs", count: faqs.length, href: "/admin/faqs", icon: HelpCircle, color: "text-rose-400 bg-rose-500/10" },
    { label: "Total Leads", count: enquiries.length, href: "/admin/leads", icon: Users, color: "text-green-400 bg-green-500/10", badge: `${newEnquiriesCount} New` },
  ];

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold font-display text-white">
            Dashboard Overview
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time summary of all dynamic website modules and visitor inquiries.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/leads"
            className="px-4 py-2 rounded-xl bg-emerald-600/20 border border-emerald-500/30 text-emerald-300 text-xs font-bold hover:bg-emerald-600/30 transition-colors flex items-center gap-1.5"
          >
            <span>{newEnquiriesCount} New Leads Pending</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              href={item.href}
              className="bg-slate-900 border border-slate-800/90 rounded-2xl p-5 hover:border-slate-700 transition-all group flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2.5 rounded-xl ${item.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                {item.badge && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {item.badge}
                  </span>
                )}
              </div>
              <div>
                <div className="text-2xl font-black font-display text-white">
                  {item.count}
                </div>
                <div className="text-xs text-slate-400 font-semibold group-hover:text-brand-accent transition-colors flex items-center justify-between mt-1">
                  <span>{item.label}</span>
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Recent Leads & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Leads Table */}
        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold font-display text-white">
                Recent Leads & Inquiries
              </h2>
              <p className="text-xs text-slate-400">
                Visitor inquiries submitted via website forms
              </p>
            </div>
            <Link
              href="/admin/leads"
              className="text-xs font-bold text-brand-accent hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {enquiries.slice(0, 4).map((enq) => (
              <div
                key={enq.id}
                className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm">{enq.name}</span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                        enq.status === "new"
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                          : "bg-slate-800 text-slate-400"
                      }`}
                    >
                      {enq.status}
                    </span>
                  </div>
                  <div className="text-slate-400 flex items-center gap-3">
                    <span>{enq.phone}</span>
                    <span>•</span>
                    <span className="text-brand-cyan">{enq.service}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={`https://wa.me/${enq.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(`Hi ${enq.name}, thank you for contacting Omnix Network regarding ${enq.service}.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] transition-colors"
                  >
                    Reply on WhatsApp
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Management Actions */}
        <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
          <h2 className="text-lg font-bold font-display text-white">
            Quick Content Shortcuts
          </h2>
          <p className="text-xs text-slate-400">
            Direct access to update critical areas of the website.
          </p>

          <div className="space-y-2 pt-2 text-xs">
            <Link
              href="/admin/services"
              className="w-full flex items-center justify-between p-3.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 transition-colors"
            >
              <span className="font-semibold text-slate-300">Add / Edit Services</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
            </Link>

            <Link
              href="/admin/translations"
              className="w-full flex items-center justify-between p-3.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 transition-colors"
            >
              <span className="font-semibold text-slate-300">Edit Hero & UI Texts (EN/BN)</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
            </Link>

            <Link
              href="/admin/blogs"
              className="w-full flex items-center justify-between p-3.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 transition-colors"
            >
              <span className="font-semibold text-slate-300">Write New Blog Article</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
            </Link>

            <Link
              href="/admin/portfolio"
              className="w-full flex items-center justify-between p-3.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 transition-colors"
            >
              <span className="font-semibold text-slate-300">Publish Client Case Study</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
            </Link>

            <Link
              href="/admin/settings"
              className="w-full flex items-center justify-between p-3.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 transition-colors"
            >
              <span className="font-semibold text-slate-300">WhatsApp & Office Settings</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
