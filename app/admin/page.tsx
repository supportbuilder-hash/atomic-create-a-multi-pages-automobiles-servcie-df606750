"use client";

import { useState, useMemo } from "react";
import { Layout, User, Calendar, Settings, Search, Bell, Check, X, Trash2, Edit, Plus, Star, Activity, ArrowUp, ArrowDown, ArrowUpDown, AlertCircle } from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Reveal } from "@/components/Reveal";
import type { AppUser, Booking, BookingStatus, Service } from "@/lib/data";

type UserRole = "admin" | "customer";
type ServiceCategory = string;

// ---------------------------------------------------------------------------
// Mock data (self-contained — this page owns its dataset)
// ---------------------------------------------------------------------------

interface AppUserWithStatus extends AppUser {
  status: "active" | "suspended";
}

const INITIAL_USERS: AppUserWithStatus[] = [
  { id: "u1", name: "Marcus Reilly", email: "marcus.reilly@gmail.com", role: "customer", joined: "Jan 14, 2024", bookingsCount: 7, status: "active" },
  { id: "u2", name: "Priya Nandakumar", email: "priya.n@outlook.com", role: "customer", joined: "Feb 02, 2024", bookingsCount: 3, status: "active" },
  { id: "u3", name: "Derek Osei", email: "derek.osei@yahoo.com", role: "customer", joined: "Feb 19, 2024", bookingsCount: 1, status: "suspended" },
  { id: "u4", name: "Lena Fischer", email: "lena.fischer@gmail.com", role: "admin", joined: "Nov 30, 2023", bookingsCount: 0, status: "active" },
  { id: "u5", name: "Tomás Ibarra", email: "tomas.ibarra@proton.me", role: "customer", joined: "Mar 08, 2024", bookingsCount: 12, status: "active" },
  { id: "u6", name: "Grace Okonkwo", email: "grace.okonkwo@gmail.com", role: "customer", joined: "Mar 21, 2024", bookingsCount: 2, status: "active" },
  { id: "u7", name: "Sam Whitfield", email: "sam.whitfield@hotmail.com", role: "customer", joined: "Apr 03, 2024", bookingsCount: 5, status: "suspended" },
  { id: "u8", name: "Alina Kowalska", email: "alina.k@gmail.com", role: "admin", joined: "Oct 11, 2023", bookingsCount: 0, status: "active" },
];

interface BookingWithEmail extends Booking {
  customerEmail: string;
}

const INITIAL_BOOKINGS: BookingWithEmail[] = [
  { id: "b1", customerName: "Marcus Reilly", customerEmail: "marcus.reilly@gmail.com", email: "marcus.reilly@gmail.com", phone: "(555) 201-3344", serviceName: "Full Synthetic Oil Change", vehicle: "2019 Honda Accord", date: "Apr 22, 2024", time: "9:00 AM", status: "confirmed", total: 89 },
  { id: "b2", customerName: "Priya Nandakumar", customerEmail: "priya.n@outlook.com", email: "priya.n@outlook.com", phone: "(555) 402-8817", serviceName: "Brake Pad Replacement", vehicle: "2021 Mazda CX-5", date: "Apr 22, 2024", time: "11:30 AM", status: "pending", total: 245 },
  { id: "b3", customerName: "Tomás Ibarra", customerEmail: "tomas.ibarra@proton.me", email: "tomas.ibarra@proton.me", phone: "(555) 553-2290", serviceName: "Full Detail Package", vehicle: "2020 Tesla Model 3", date: "Apr 23, 2024", time: "1:00 PM", status: "confirmed", total: 220 },
  { id: "b4", customerName: "Grace Okonkwo", customerEmail: "grace.okonkwo@gmail.com", email: "grace.okonkwo@gmail.com", phone: "(555) 674-1123", serviceName: "Check Engine Diagnostics", vehicle: "2016 Ford Focus", date: "Apr 20, 2024", time: "10:15 AM", status: "completed", total: 129 },
  { id: "b5", customerName: "Sam Whitfield", customerEmail: "sam.whitfield@hotmail.com", email: "sam.whitfield@hotmail.com", phone: "(555) 887-4402", serviceName: "Tire Rotation & Balance", vehicle: "2018 Subaru Outback", date: "Apr 19, 2024", time: "3:45 PM", status: "cancelled", total: 65 },
  { id: "b6", customerName: "Derek Osei", customerEmail: "derek.osei@yahoo.com", email: "derek.osei@yahoo.com", phone: "(555) 330-9981", serviceName: "AC Recharge & Inspection", vehicle: "2017 Jeep Cherokee", date: "Apr 24, 2024", time: "8:30 AM", status: "pending", total: 155 },
  { id: "b7", customerName: "Marcus Reilly", customerEmail: "marcus.reilly@gmail.com", email: "marcus.reilly@gmail.com", phone: "(555) 201-3344", serviceName: "Fleet Multi-Point Inspection", vehicle: "2022 Ram ProMaster", date: "Apr 25, 2024", time: "2:00 PM", status: "confirmed", total: 340 },
];

interface ServiceWithDuration extends Service {
  durationMinutes: number;
  durationLabel: string;
}

const INITIAL_SERVICES: ServiceWithDuration[] = [
  { id: "s1", name: "Full Synthetic Oil Change", category: "Maintenance", description: "Premium synthetic oil, filter swap, and a 21-point inspection.", price: 89, priceLabel: "$89", duration: "45 min", durationMinutes: 45, durationLabel: "45 min", image: "https://images.unsplash.com/photo-1632823469850-1b7b1e8b7174?auto=format&fit=crop&w=800&q=80" },
  { id: "s2", name: "Brake Pad Replacement", category: "Repair", description: "Front or rear pad replacement with rotor inspection.", price: 245, priceLabel: "$245", duration: "1.5 hrs", durationMinutes: 90, durationLabel: "1.5 hrs", image: "https://images.unsplash.com/photo-1486754735734-325b5831c3ad?auto=format&fit=crop&w=800&q=80" },
  { id: "s3", name: "Full Detail Package", category: "Detailing", description: "Interior deep clean, clay bar, wax, and tire shine.", price: 220, priceLabel: "$220", duration: "3 hrs", durationMinutes: 180, durationLabel: "3 hrs", image: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&w=800&q=80" },
  { id: "s4", name: "Check Engine Diagnostics", category: "Diagnostics", description: "Full OBD-II scan with a written diagnosis report.", price: 129, priceLabel: "$129", duration: "1 hr", durationMinutes: 60, durationLabel: "1 hr", image: "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&w=800&q=80" },
  { id: "s5", name: "Tire Rotation & Balance", category: "Tires & Wheels", description: "Four-wheel rotation, balancing, and pressure check.", price: 65, priceLabel: "$65", duration: "40 min", durationMinutes: 40, durationLabel: "40 min", image: "https://images.unsplash.com/photo-1550355191-aa8a80b41353?auto=format&fit=crop&w=800&q=80" },
  { id: "s6", name: "Fleet Multi-Point Inspection", category: "Fleet", description: "Bulk inspection package for commercial fleet vehicles.", price: 340, priceLabel: "$340", duration: "2.5 hrs", durationMinutes: 150, durationLabel: "2.5 hrs", image: "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&w=800&q=80" },
];

const WEEKLY_ACTIVITY = [
  { day: "Mon", bookings: 12, revenue: 1180 },
  { day: "Tue", bookings: 18, revenue: 1640 },
  { day: "Wed", bookings: 15, revenue: 1390 },
  { day: "Thu", bookings: 22, revenue: 2010 },
  { day: "Fri", bookings: 27, revenue: 2480 },
  { day: "Sat", bookings: 31, revenue: 2960 },
  { day: "Sun", bookings: 19, revenue: 1750 },
];

type Tab = "overview" | "users" | "bookings" | "services";

const TABS: { key: Tab; label: string; icon: typeof Layout }[] = [
  { key: "overview", label: "Overview", icon: Layout },
  { key: "users", label: "Users", icon: User },
  { key: "bookings", label: "Bookings", icon: Calendar },
  { key: "services", label: "Services", icon: Settings },
];

function statusBadgeClasses(status: BookingStatus): string {
  switch (status) {
    case "confirmed":
      return "bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-200";
    case "pending":
      return "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200";
    case "completed":
      return "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200";
    case "cancelled":
      return "bg-red-50 text-red-700 ring-1 ring-inset ring-red-200";
    default:
      return "bg-slate-100 text-slate-700";
  }
}

function roleBadgeClasses(role: UserRole): string {
  return role === "admin"
    ? "bg-amber-500/10 text-amber-700 ring-1 ring-inset ring-amber-500/30"
    : "bg-slate-100 text-slate-600 ring-1 ring-inset ring-slate-200";
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [users, setUsers] = useState<AppUserWithStatus[]>(INITIAL_USERS);
  const [bookings, setBookings] = useState<BookingWithEmail[]>(INITIAL_BOOKINGS);
  const [services] = useState<ServiceWithDuration[]>(INITIAL_SERVICES);

  const [userSearch, setUserSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<UserRole | "all">("all");
  const [bookingFilter, setBookingFilter] = useState<BookingStatus | "all">("all");
  const [sortDesc, setSortDesc] = useState(true);

  const totalRevenue = useMemo(
    () => bookings.reduce((sum, b) => (b.status !== "cancelled" ? sum + b.total : sum), 0),
    [bookings]
  );
  const activeBookings = useMemo(
    () => bookings.filter((b) => b.status === "confirmed" || b.status === "pending").length,
    [bookings]
  );
  const totalUsers = users.length;
  const suspendedCount = users.filter((u) => u.status === "suspended").length;

  const filteredUsers = useMemo(() => {
    const list = users.filter((u) => {
      const matchesSearch =
        u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
        u.email.toLowerCase().includes(userSearch.toLowerCase());
      const matchesRole = roleFilter === "all" || u.role === roleFilter;
      return matchesSearch && matchesRole;
    });
    return [...list].sort((a, b) =>
      sortDesc ? b.bookingsCount - a.bookingsCount : a.bookingsCount - b.bookingsCount
    );
  }, [users, userSearch, roleFilter, sortDesc]);

  const filteredBookings = useMemo(
    () => bookings.filter((b) => bookingFilter === "all" || b.status === bookingFilter),
    [bookings, bookingFilter]
  );

  function toggleUserStatus(id: string) {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id ? { ...u, status: u.status === "active" ? "suspended" : "active" } : u
      )
    );
  }

  function removeUser(id: string) {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  }

  function cycleBookingStatus(id: string) {
    const order: BookingStatus[] = ["pending", "confirmed", "completed", "cancelled"];
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id !== id) return b;
        const idx = order.indexOf(b.status);
        const next = order[(idx + 1) % order.length] ?? "pending";
        return { ...b, status: next };
      })
    );
  }

  const serviceCategories = useMemo(
    () => Array.from(new Set(services.map((s) => s.category))) as ServiceCategory[],
    [services]
  );

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-6 px-4 py-8 md:flex-row md:px-8 md:py-10">
        {/* Sidebar */}
        <Reveal className="md:w-60 md:shrink-0">
          <aside className="sticky top-6 rounded-2xl border border-black/5 bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.12)]">
            <div className="mb-6 flex items-center gap-2 px-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500 text-white">
                <Activity className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">Admin Console</p>
                <p className="text-xs text-slate-600">Torque &amp; Tread</p>
              </div>
            </div>
            <nav className="flex flex-row gap-1 overflow-x-auto md:flex-col md:overflow-visible">
              {TABS.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.key;
                return (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setActiveTab(tab.key)}
                    className={`flex shrink-0 items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/50 ${
                      isActive
                        ? "bg-amber-500 text-white shadow-sm"
                        : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </aside>
        </Reveal>

        {/* Main content */}
        <div className="min-w-0 flex-1 space-y-8">
          <Reveal>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
                  Admin Dashboard
                </h1>
                <p className="mt-1 text-sm text-slate-600">
                  Manage customers, bookings, and service offerings from one place.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative hidden sm:block">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Quick search..."
                    className="w-56 rounded-xl border border-black/5 bg-white py-2 pl-9 pr-3 text-sm text-slate-700 shadow-sm outline-none transition-all duration-300 focus-visible:ring-2 focus-visible:ring-amber-500/40"
                  />
                </div>
                <button
                  type="button"
                  aria-label="Notifications"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-black/5 bg-white text-slate-700 shadow-sm transition-all duration-300 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/40"
                >
                  <Bell className="h-4 w-4" />
                </button>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-sm font-semibold text-white">
                  LF
                </div>
              </div>
            </div>
          </Reveal>

          {activeTab === "overview" && (
            <>
              <Reveal delay={0.05}>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <StatCard
                    label="Total Revenue"
                    value={`$${totalRevenue.toLocaleString("en-US")}`}
                    delta="+12.4%"
                    positive
                    icon={Activity}
                  />
                  <StatCard
                    label="Active Bookings"
                    value={String(activeBookings)}
                    delta="+3 today"
                    positive
                    icon={Calendar}
                  />
                  <StatCard
                    label="Total Users"
                    value={String(totalUsers)}
                    delta={`${suspendedCount} suspended`}
                    positive={suspendedCount === 0}
                    icon={User}
                  />
                  <StatCard
                    label="Avg. Rating"
                    value="4.8"
                    delta="+0.2 this month"
                    positive
                    icon={Star}
                  />
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.12)] md:p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <h2 className="text-base font-semibold text-slate-900">Weekly Activity</h2>
                      <p className="text-xs text-slate-500">Bookings and revenue over the last 7 days</p>
                    </div>
                  </div>
                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={WEEKLY_ACTIVITY} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                          <linearGradient id="bookingsFill" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.35} />
                            <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                        <XAxis dataKey="day" tick={{ fontSize: 12, fill: "#64748b" }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fontSize: 12, fill: "#64748b" }} axisLine={false} tickLine={false} />
                        <Tooltip
                          contentStyle={{
                            borderRadius: 12,
                            border: "1px solid rgba(0,0,0,0.06)",
                            boxShadow: "0 8px 24px -8px rgba(0,0,0,0.15)",
                            fontSize: 13,
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="bookings"
                          stroke="#f59e0b"
                          strokeWidth={2.5}
                          fill="url(#bookingsFill)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.15}>
                <div className="rounded-2xl border border-black/5 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.12)]">
                  <div className="flex items-center justify-between border-b border-black/5 p-5">
                    <h2 className="text-base font-semibold text-slate-900">Recent Bookings</h2>
                    <button
                      type="button"
                      onClick={() => setActiveTab("bookings")}
                      className="text-sm font-medium text-amber-600 transition-colors duration-300 hover:text-amber-700"
                    >
                      View all
                    </button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[640px] text-left text-sm">
                      <thead>
                        <tr className="text-xs uppercase tracking-wide text-slate-400">
                          <th className="px-5 py-3 font-medium">Customer</th>
                          <th className="px-5 py-3 font-medium">Service</th>
                          <th className="px-5 py-3 font-medium">Date</th>
                          <th className="px-5 py-3 font-medium">Status</th>
                          <th className="px-5 py-3 text-right font-medium">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {bookings.slice(0, 5).map((b) => (
                          <tr key={b.id} className="border-t border-black/5">
                            <td className="px-5 py-3 font-medium text-slate-800">{b.customerName}</td>
                            <td className="px-5 py-3 text-slate-600">{b.serviceName}</td>
                            <td className="px-5 py-3 text-slate-600">
                              {b.date} · {b.time}
                            </td>
                            <td className="px-5 py-3">
                              <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium capitalize ${statusBadgeClasses(b.status)}`}>
                                {b.status}
                              </span>
                            </td>
                            <td className="px-5 py-3 text-right font-semibold text-slate-800">${b.total}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </Reveal>
            </>
          )}

          {activeTab === "users" && (
            <Reveal delay={0.05}>
              <div className="rounded-2xl border border-black/5 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.12)]">
                <div className="flex flex-col gap-3 border-b border-black/5 p-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-base font-semibold text-slate-900">User Management</h2>
                    <p className="text-xs text-slate-500">{filteredUsers.length} of {users.length} users shown</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="relative">
                      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        value={userSearch}
                        onChange={(e) => setUserSearch(e.target.value)}
                        placeholder="Search name or email"
                        className="w-56 rounded-xl border border-black/5 bg-slate-50 py-2 pl-9 pr-3 text-sm outline-none transition-all duration-300 focus-visible:ring-2 focus-visible:ring-amber-500/40"
                      />
                    </div>
                    <select
                      value={roleFilter}
                      onChange={(e) => setRoleFilter(e.target.value as UserRole | "all")}
                      className="rounded-xl border border-black/5 bg-slate-50 px-3 py-2 text-sm text-slate-600 outline-none transition-all duration-300 focus-visible:ring-2 focus-visible:ring-amber-500/40"
                    >
                      <option value="all">All roles</option>
                      <option value="customer">Customer</option>
                      <option value="admin">Admin</option>
                    </select>
                    <button
                      type="button"
                      onClick={() => setSortDesc((v) => !v)}
                      className="flex items-center gap-1.5 rounded-xl border border-black/5 bg-slate-50 px-3 py-2 text-sm text-slate-600 transition-all duration-300 hover:bg-slate-100"
                    >
                      <ArrowUpDown className="h-3.5 w-3.5" />
                      Bookings
                    </button>
                    <button
                      type="button"
                      className="flex items-center gap-1.5 rounded-xl bg-amber-500 px-3.5 py-2 text-sm font-medium text-white shadow-sm transition-all duration-300 hover:bg-amber-600"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      Add User
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full min-w-[720px] text-left text-sm">
                    <thead>
                      <tr className="text-xs uppercase tracking-wide text-slate-400">
                        <th className="px-5 py-3 font-medium">Name</th>
                        <th className="px-5 py-3 font-medium">Email</th>
                        <th className="px-5 py-3 font-medium">Role</th>
                        <th className="px-5 py-3 font-medium">Joined</th>
                        <th className="px-5 py-3 font-medium">Bookings</th>
                        <th className="px-5 py-3 font-medium">Status</th>
                        <th className="px-5 py-3 text-right font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.length === 0 && (
                        <tr>
                          <td colSpan={7} className="px-5 py-10 text-center text-slate-400">
                            <div className="flex flex-col items-center gap-2">
                              <AlertCircle className="h-5 w-5" />
                              No users match your filters.
                            </div>
                          </td>
                        </tr>
                      )}
                      {filteredUsers.map((u) => (
                        <tr key={u.id} className="border-t border-black/5">
                          <td className="px-5 py-3 font-medium text-slate-800">{u.name}</td>
                          <td className="px-5 py-3 text-slate-500">{u.email}</td>
                          <td className="px-5 py-3">
                            <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium capitalize ${roleBadgeClasses(u.role)}`}>
                              {u.role}
                            </span>
                          </td>
                          <td className="px-5 py-3 text-slate-500">{u.joined}</td>
                          <td className="px-5 py-3 text-slate-600">{u.bookingsCount}</td>
                          <td className="px-5 py-3">
                            <span
                              className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
                                u.status === "active"
                                  ? "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200"
                                  : "bg-red-50 text-red-700 ring-1 ring-inset ring-red-200"
                              }`}
                            >
                              <span className={`h-1.5 w-1.5 rounded-full ${u.status === "active" ? "bg-emerald-500" : "bg-red-500"}`} />
                              {u.status}
                            </span>
                          </td>
                          <td className="px-5 py-3">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                type="button"
                                onClick={() => toggleUserStatus(u.id)}
                                title={u.status === "active" ? "Suspend user" : "Activate user"}
                                className="flex h-8 w-8 items-center justify-center rounded-lg border border-black/5 text-slate-500 transition-all duration-300 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/40"
                              >
                                {u.status === "active" ? <X className="h-3.5 w-3.5" /> : <Check className="h-3.5 w-3.5" />}
                              </button>
                              <button
                                type="button"
                                onClick={() => removeUser(u.id)}
                                title="Remove user"
                                className="flex h-8 w-8 items-center justify-center rounded-lg border border-black/5 text-slate-500 transition-all duration-300 hover:bg-red-50 hover:text-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/40"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </Reveal>
          )}

          {activeTab === "bookings" && (
            <Reveal delay={0.05}>
              <div className="rounded-2xl border border-black/5 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.12)]">
                <div className="flex flex-col gap-3 border-b border-black/5 p-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-base font-semibold text-slate-900">Booking Queue</h2>
                    <p className="text-xs text-slate-500">Click a status badge to cycle it forward.</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(["all", "pending", "confirmed", "completed", "cancelled"] as const).map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setBookingFilter(s)}
                        className={`rounded-full px-3 py-1.5 text-xs font-medium capitalize transition-all duration-300 ${
                          bookingFilter === s
                            ? "bg-slate-900 text-white"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[720px] text-left text-sm">
                    <thead>
                      <tr className="text-xs uppercase tracking-wide text-slate-400">
                        <th className="px-5 py-3 font-medium">Customer</th>
                        <th className="px-5 py-3 font-medium">Vehicle</th>
                        <th className="px-5 py-3 font-medium">Service</th>
                        <th className="px-5 py-3 font-medium">Date</th>
                        <th className="px-5 py-3 font-medium">Status</th>
                        <th className="px-5 py-3 text-right font-medium">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredBookings.map((b) => (
                        <tr key={b.id} className="border-t border-black/5">
                          <td className="px-5 py-3">
                            <div className="font-medium text-slate-800">{b.customerName}</div>
                            <div className="text-xs text-slate-400">{b.customerEmail}</div>
                          </td>
                          <td className="px-5 py-3 text-slate-600">{b.vehicle}</td>
                          <td className="px-5 py-3 text-slate-600">{b.serviceName}</td>
                          <td className="px-5 py-3 text-slate-600">
                            {b.date} · {b.time}
                          </td>
                          <td className="px-5 py-3">
                            <button
                              type="button"
                              onClick={() => cycleBookingStatus(b.id)}
                              className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium capitalize transition-all duration-300 hover:brightness-95 ${statusBadgeClasses(b.status)}`}
                            >
                              {b.status}
                            </button>
                          </td>
                          <td className="px-5 py-3 text-right font-semibold text-slate-800">${b.total}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </Reveal>
          )}

          {activeTab === "services" && (
            <Reveal delay={0.05}>
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h2 className="text-base font-semibold text-slate-900">Service Catalog</h2>
                    <p className="text-xs text-slate-500">
                      {services.length} services across {serviceCategories.length} categories
                    </p>
                  </div>
                  <button
                    type="button"
                    className="flex items-center gap-1.5 rounded-xl bg-amber-500 px-3.5 py-2 text-sm font-medium text-white shadow-sm transition-all duration-300 hover:bg-amber-600"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    New Service
                  </button>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {services.map((s) => (
                    <div
                      key={s.id}
                      className="group rounded-2xl border border-black/5 bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-0.5"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="inline-flex rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                          {s.category}
                        </span>
                        <span className="text-sm font-semibold text-slate-900">{s.priceLabel}</span>
                      </div>
                      <h3 className="mt-3 text-sm font-semibold text-slate-900">{s.name}</h3>
                      <p className="mt-1 text-xs leading-relaxed text-slate-500">{s.description}</p>
                      <div className="mt-3 flex items-center justify-between border-t border-black/5 pt-3 text-xs text-slate-400">
                        <span>{s.durationLabel}</span>
                        <div className="flex items-center gap-1.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                          <button
                            type="button"
                            className="flex h-7 w-7 items-center justify-center rounded-lg border border-black/5 text-slate-500 hover:bg-slate-100"
                          >
                            <Edit className="h-3.5 w-3.5" />
                          </button>
                          <button
                            type="button"
                            className="flex h-7 w-7 items-center justify-center rounded-lg border border-black/5 text-slate-500 hover:bg-red-50 hover:text-red-600"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </main>
  );
}

function StatCard({
  label,
  value,
  delta,
  positive,
  icon: Icon,
}: {
  label: string;
  value: string;
  delta: string;
  positive: boolean;
  icon: typeof Activity;
}) {
  return (
    <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-0.5">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wide text-slate-400">{label}</span>
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600">
          <Icon className="h-4 w-4" />
        </div>
      </div>
      <p className="mt-3 text-2xl font-semibold tracking-tight text-slate-900">{value}</p>
      <p className={`mt-1 flex items-center gap-1 text-xs font-medium ${positive ? "text-emerald-600" : "text-red-600"}`}>
        {positive ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
        {delta}
      </p>
    </div>
  );
}