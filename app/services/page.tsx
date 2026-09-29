"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Clock, DollarSign, Wrench, ArrowRight, SlidersHorizontal, Gauge, Sparkles, Disc3, Truck } from 'lucide-react';
import { Reveal } from "@/components/Reveal";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { Service } from "@/lib/data";

const APP_NAME = "Torque & Tread Auto Care";
const APP_TAGLINE = "Honest service, booked in minutes.";
type ServiceCategory = string;

interface ServiceWithDuration extends Service {
  durationMinutes: number;
  durationLabel: string;
}

// ---- Inline mock data (self-contained, never imported from lib/data) ----

const SERVICES: ServiceWithDuration[] = [
  {
    id: "svc-oil-change",
    name: "Full Synthetic Oil Change",
    category: "Maintenance",
    description:
      "Premium full-synthetic oil, new filter, and a 21-point courtesy inspection to catch small issues early.",
    price: 79,
    priceLabel: "$79",
    duration: "45 min",
    durationMinutes: 45,
    durationLabel: "45 min",
    image: "https://images.unsplash.com/photo-1632823469850-1b7b1e8b7174?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "svc-brake-repair",
    name: "Brake Pad & Rotor Service",
    category: "Repair",
    description:
      "OEM-grade pads and resurfaced or replaced rotors, installed by certified techs with a lifetime pad warranty.",
    price: 249,
    priceLabel: "$249",
    duration: "2 hrs",
    durationMinutes: 120,
    durationLabel: "2 hrs",
    image: "https://images.unsplash.com/photo-1486754735734-325b5831c3ad?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "svc-full-detail",
    name: "Interior & Exterior Detail",
    category: "Detailing",
    description:
      "Hand wash, clay bar, paint sealant, full interior shampoo and a leather conditioning finish.",
    price: 189,
    priceLabel: "$189",
    duration: "3 hrs",
    durationMinutes: 180,
    durationLabel: "3 hrs",
    image: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "svc-check-engine",
    name: "Check Engine Diagnostics",
    category: "Diagnostics",
    description:
      "Computerized scan and a licensed technician's write-up of root cause, with no-obligation repair estimate.",
    price: 59,
    priceLabel: "$59",
    duration: "30 min",
    durationMinutes: 30,
    durationLabel: "30 min",
    image: "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "svc-tire-rotation",
    name: "Tire Rotation & Balance",
    category: "Tires & Wheels",
    description:
      "Rotation, computer balancing, and tread-depth report to extend tire life and even out wear.",
    price: 49,
    priceLabel: "$49",
    duration: "40 min",
    durationMinutes: 40,
    durationLabel: "40 min",
    image: "https://images.unsplash.com/photo-1550355191-aa8a80b41353?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "svc-new-tires",
    name: "New Tire Installation",
    category: "Tires & Wheels",
    description:
      "Mount, balance, valve stem replacement and disposal of old tires, priced per set of four.",
    price: 620,
    priceLabel: "$620",
    duration: "90 min",
    durationMinutes: 90,
    durationLabel: "90 min",
    image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "svc-fleet-maintenance",
    name: "Fleet Preventive Maintenance",
    category: "Fleet",
    description:
      "Scheduled multi-vehicle service plans for small businesses, with priority bay access and volume pricing.",
    price: 0,
    priceLabel: "Custom quote",
    duration: "Varies",
    durationMinutes: 0,
    durationLabel: "Varies",
    image: "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "svc-ac-recharge",
    name: "A/C Recharge & Inspection",
    category: "Maintenance",
    description:
      "Refrigerant recharge, leak test, and cabin filter check to keep your cabin cold through summer.",
    price: 129,
    priceLabel: "$129",
    duration: "1 hr",
    durationMinutes: 60,
    durationLabel: "1 hr",
    image: "https://images.unsplash.com/photo-1625047509168-a7026f36de04?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "svc-transmission",
    name: "Transmission Fluid Service",
    category: "Repair",
    description:
      "Full fluid flush and filter replacement to protect against premature transmission wear.",
    price: 219,
    priceLabel: "$219",
    duration: "90 min",
    durationMinutes: 90,
    durationLabel: "90 min",
    image: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=800&q=80",
  },
];

const CATEGORY_ICONS: Record<ServiceCategory, typeof Wrench> = {
  Maintenance: Wrench,
  Repair: Gauge,
  Detailing: Sparkles,
  Diagnostics: Gauge,
  "Tires & Wheels": Disc3,
  Fleet: Truck,
};

const CATEGORIES = ["All", ...new Set(SERVICES.map((s) => s.category))] as const;

const PRICE_RANGES = [
  { label: "Any price", min: 0, max: Infinity },
  { label: "Under $75", min: 0, max: 75 },
  { label: "$75 - $150", min: 75, max: 150 },
  { label: "$150 - $300", min: 150, max: 300 },
  { label: "$300+", min: 300, max: Infinity },
] as const;

const DURATIONS = [
  { label: "Any duration", max: Infinity },
  { label: "Under 1 hr", max: 60 },
  { label: "1 - 2 hrs", max: 120 },
  { label: "2+ hrs", max: Infinity },
] as const;

function slugify(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default function ServicesPage() {
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>("All");
  const [priceRangeLabel, setPriceRangeLabel] = useState<(typeof PRICE_RANGES)[number]["label"]>(
    "Any price"
  );
  const [durationLabel, setDurationLabel] = useState<(typeof DURATIONS)[number]["label"]>(
    "Any duration"
  );
  const [query, setQuery] = useState("");

  const activePriceRange = useMemo(
    () => PRICE_RANGES.find((r) => r.label === priceRangeLabel) ?? PRICE_RANGES[0],
    [priceRangeLabel]
  );
  const activeDuration = useMemo(
    () => DURATIONS.find((d) => d.label === durationLabel) ?? DURATIONS[0],
    [durationLabel]
  );

  const filteredServices = useMemo(() => {
    return SERVICES.filter((service) => {
      const matchesCategory = category === "All" || service.category === category;
      const matchesQuery =
        query.trim().length === 0 ||
        service.name.toLowerCase().includes(query.trim().toLowerCase()) ||
        service.description.toLowerCase().includes(query.trim().toLowerCase());
      const matchesPrice =
        service.price === 0 || (service.price >= activePriceRange.min && service.price <= activePriceRange.max);
      const matchesDuration = service.durationMinutes === 0 || service.durationMinutes <= activeDuration.max;
      return matchesCategory && matchesQuery && matchesPrice && matchesDuration;
    });
  }, [category, query, activePriceRange, activeDuration]);

  return (
    <main className="bg-[var(--background)]">
      {/* Hero */}
      <Reveal>
        <section
          id="hero"
          className="relative overflow-hidden border-b border-black/5 bg-[var(--background)] py-24 md:py-32"
        >
          <div
            className="pointer-events-none absolute -top-32 right-[-10%] h-[420px] w-[420px] rounded-full opacity-20 blur-3xl"
            style={{ background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)" }}
          />
          <div className="relative mx-auto flex max-w-6xl flex-col gap-6 px-6">
            <motion.span
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="inline-flex w-fit items-center gap-2 rounded-full border border-black/10 bg-[var(--card)] px-4 py-1.5 text-sm font-medium text-[var(--muted-foreground)]"
            >
              <Wrench className="h-4 w-4 text-[var(--accent)]" />
              {APP_NAME} services
            </motion.span>
            <motion.h1
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              transition={{ delay: 0.08 }}
              className="max-w-3xl text-balance text-4xl font-bold tracking-tight text-[var(--foreground)] sm:text-5xl md:text-6xl"
            >
              Every service your vehicle needs, priced up front.
            </motion.h1>
            <motion.p
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              transition={{ delay: 0.16 }}
              className="max-w-2xl text-pretty text-lg leading-relaxed text-[var(--muted-foreground)]"
            >
              {APP_TAGLINE} Browse our full menu of maintenance, repair, and detailing work,
              filter by what matters to you, and book a bay in minutes.
            </motion.p>
          </div>
        </section>
      </Reveal>

      {/* Filters */}
      <Reveal delay={0.05}>
        <section id="filters" className="border-b border-black/5 bg-[var(--card)] py-10">
          <div className="mx-auto max-w-6xl px-6">
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="relative w-full md:max-w-sm">
                  <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted-foreground)]" />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search services..."
                    className="w-full rounded-full border border-black/10 bg-[var(--background)] py-2.5 pl-10 pr-4 text-sm text-[var(--foreground)] outline-none transition-colors placeholder:text-[var(--muted-foreground)] focus-visible:border-[var(--accent)]"
                  />
                </div>
                <div className="flex items-center gap-2 text-sm font-medium text-[var(--muted-foreground)]">
                  <SlidersHorizontal className="h-4 w-4" />
                  {filteredServices.length} of {SERVICES.length} services
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-all duration-300 ease-out ${
                      category === cat
                        ? "border-[var(--accent)] bg-[var(--accent)] text-black"
                        : "border-black/10 bg-[var(--background)] text-[var(--muted-foreground)] hover:border-[var(--accent)]/40 hover:text-[var(--foreground)]"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 shrink-0 text-[var(--muted-foreground)]" />
                  <select
                    value={priceRangeLabel}
                    onChange={(e) =>
                      setPriceRangeLabel(e.target.value as (typeof PRICE_RANGES)[number]["label"])
                    }
                    className="w-full rounded-lg border border-black/10 bg-[var(--background)] px-3 py-2 text-sm text-[var(--foreground)] outline-none transition-colors focus-visible:border-[var(--accent)] sm:w-auto"
                  >
                    {PRICE_RANGES.map((range) => (
                      <option key={range.label} value={range.label}>
                        {range.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 shrink-0 text-[var(--muted-foreground)]" />
                  <select
                    value={durationLabel}
                    onChange={(e) =>
                      setDurationLabel(e.target.value as (typeof DURATIONS)[number]["label"])
                    }
                    className="w-full rounded-lg border border-black/10 bg-[var(--background)] px-3 py-2 text-sm text-[var(--foreground)] outline-none transition-colors focus-visible:border-[var(--accent)] sm:w-auto"
                  >
                    {DURATIONS.map((d) => (
                      <option key={d.label} value={d.label}>
                        {d.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* Service grid */}
      <section id="service-list" className="bg-[var(--background)] py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          {filteredServices.length === 0 ? (
            <Reveal>
              <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-black/10 bg-[var(--card)] py-20 text-center">
                <Search className="h-8 w-8 text-[var(--muted-foreground)]" />
                <p className="text-lg font-medium text-[var(--foreground)]">No services match those filters</p>
                <p className="text-sm text-[var(--muted-foreground)]">
                  Try widening your price range or clearing the search.
                </p>
              </div>
            </Reveal>
          ) : (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {filteredServices.map((service) => {
                const Icon = CATEGORY_ICONS[service.category] ?? Wrench;
                return (
                  <motion.article
                    key={service.id}
                    variants={fadeInUp}
                    whileHover={{ y: -4 }}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-black/5 bg-[var(--card)] shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.12)] transition-all duration-300 ease-out hover:shadow-[0_2px_4px_rgba(0,0,0,0.06),0_16px_32px_-8px_rgba(0,0,0,0.16)]"
                  >
                    <div className="relative h-44 w-full overflow-hidden bg-black/5">
                      <img
                        src={service.image}
                        alt={service.name}
                        className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      />
                      <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-[var(--foreground)] backdrop-blur">
                        <Icon className="h-3.5 w-3.5" />
                        {service.category}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="text-lg font-semibold tracking-tight text-[var(--foreground)]">
                        {service.name}
                      </h3>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--muted-foreground)]">
                        {service.description}
                      </p>
                      <div className="mt-5 flex items-center justify-between border-t border-black/5 pt-4">
                        <div className="flex flex-col">
                          <span className="text-lg font-bold text-[var(--foreground)]">{service.priceLabel}</span>
                          <span className="flex items-center gap-1 text-xs text-[var(--muted-foreground)]">
                            <Clock className="h-3 w-3" /> {service.durationLabel}
                          </span>
                        </div>
                        <Link
                          href="/booking"
                          className="inline-flex items-center gap-1.5 rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-black transition-all duration-300 ease-out hover:brightness-95"
                        >
                          Book
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </motion.div>
          )}
        </div>
      </section>
    </main>
  );
}
