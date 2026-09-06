import React from "react";
import { isAuthenticated } from "@/lib/auth";
import AdminSidebar from "@/components/admin/AdminSidebar";

export const metadata = {
  title: "Omnix Admin Dashboard",
  description: "Manage all contents of the Omnix Network website.",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const auth = await isAuthenticated();

  // If user is on admin login, we render just the children (no sidebar)
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex">
      {auth ? (
        <>
          <AdminSidebar />
          <main className="flex-grow p-6 sm:p-10 lg:p-12 overflow-y-auto max-h-screen">
            <div className="max-w-7xl mx-auto">{children}</div>
          </main>
        </>
      ) : (
        <main className="w-full flex items-center justify-center p-4">
          {children}
        </main>
      )}
    </div>
  );
}
