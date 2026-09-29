"use client";

import Link from "next/link";
import { ArrowRight, Wrench, ShieldCheck, Clock, Star, Gauge, Car, CheckCircle2, PhoneCall } from 'lucide-react';
import { BRAND } from "@/lib/data";
import { Reveal } from "@/components/Reveal";

const HERO_STATS = [
  { label: "Vehicles serviced yearly", value: "6,200+" },
  { label: "Average turnaround", value: "48 min" },
  { label: "Certified technicians", value: "14" },
];

const FEATURED_SERVICES = [
  {
    id: "oil-change",
    name: "Full Synthetic Oil Change",
    category: "Maintenance",
    description:
      "Premium synthetic oil, new filter, and a 21-point inspection so small issues never become expensive ones.",
    price: "$59",
    duration: "35 min",
    image: "https://images.unsplash.com/photo-1632823469850-1b7b1e8b7174?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "brake-service",
    name: "Brake Pad & Rotor Service",
    category: "Repair",
    description:
      "OEM-grade pads and rotors installed by ASE-certified techs, with a free brake fluid check included.",
    price: "$189",
    duration: "1.5 hrs",
    image: "https://images.unsplash.com/photo-1486754735734-325b5831c3ad?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "diagnostics",
    name: "Check Engine Diagnostics",
    category: "Diagnostics",
    description:
      "Computerized scan that pinpoints the exact fault code and gives you a clear, written repair estimate.",
    price: "$89",
    duration: "40 min",
    image: "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "detailing",
    name: "Interior & Exterior Detail",
    category: "Detailing",
    description:
      "Hand wash, clay bar, interior steam clean, and a ceramic-boosted wax finish that lasts for months.",
    price: "$149",
    duration: "2 hrs",
    image: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&w=1200&q=80",
  },
];

const VALUE_PROPS = [
  {
    icon: ShieldCheck,
    title: "12-month warranty",
    description:
      "Every repair and part we install is backed by a full year warranty, parts and labor included.",
  },
  {
    icon: Clock,
    title: "Same-day service",
    description:
      "Book before noon and drive out the same day for most maintenance and repair jobs, no exceptions.",
  },
  {
    icon: Gauge,
    title: "Transparent pricing",
    description:
      "You approve a written quote before any work starts. No surprise line items on your final invoice.",
  },
  {
    icon: Car,
    title: "Loaner vehicles",
    description:
      "Longer repairs come with a complimentary loaner car so your day never has to stop moving.",
  },
];

const TESTIMONIALS = [
  {
    name: "Renee Castillo",
    role: "Owner, Castillo Landscaping",
    quote:
      "They keep our whole work fleet running. Booking online takes two minutes and the trucks come back the same afternoon.",
    rating: 5,
  },
  {
    name: "Marcus Yee",
    role: "Daily Commuter",
    quote:
      "First shop that showed me the actual worn part before charging me for it. That alone earned my repeat business.",
    rating: 5,
  },
  {
    name: "Priya Nandakumar",
    role: "First-time Customer",
    quote:
      "Transparent quote, friendly front desk, and my brakes feel brand new. Already booked my next oil change.",
    rating: 5,
  },
];

const FALLBACK_BRAND_NAME = "Torque & Tread Auto Care";
const FALLBACK_PHONE_DISPLAY = "Call us";

export default function HomePage() {
  const brandName = BRAND?.name ?? FALLBACK_BRAND_NAME;
  const brandTagline = BRAND?.tagline ?? "Honest work. Every time.";
  const brandEmail = BRAND?.email ?? "service@torqueandtread.com";
  const brandAddress = BRAND?.address ?? "482 Industrial Pkwy, Riverton";
  const brandHours = BRAND?.hours ?? "Mon-Sat, 7:30am - 6:30pm";
  const brandPhoneDisplay = BRAND?.phone ?? FALLBACK_PHONE_DISPLAY;
  const brandPhoneHref =
    typeof brandPhoneDisplay === "string"
      ? brandPhoneDisplay.replace(/[^0-9+]/g, "")
      : "";

  return (
    <main className="overflow-hidden">
      <section className="relative bg-[var(--card)]">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-[var(--primary)]/10 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-[var(--accent)]/10 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-28 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-[var(--primary)]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-[var(--primary)]">
              <Wrench className="h-3.5 w-3.5" aria-hidden="true" />
              {brandTagline}
            </span>
            <h1 className="mt-6 font-[family-name:var(--font-sora)] text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[var(--foreground)] text-balance">
              Expert auto care that respects your time and your budget.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-[var(--muted-foreground)] max-w-xl text-pretty">
              {brandName} keeps your vehicle running strong with certified technicians, transparent pricing, and same-day service for most repairs. Book online in under two minutes.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link href="/booking">
                <span className="inline-flex items-center gap-2 rounded-full border border-[var(--primary)] bg-[var(--primary)] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.25)] transition-all duration-300 ease-out hover:brightness-110 hover:shadow-[0_1px_2px_rgba(0,0,0,0.06),0_12px_28px_-8px_rgba(0,0,0,0.3)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]">
                  Book an appointment
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </Link>
              <Link href="/services">
                <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card)] px-6 py-3.5 text-sm font-semibold text-[var(--foreground)] transition-all duration-300 ease-out hover:border-[var(--accent)]/40 hover:text-[var(--accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]">
                  View services
                </span>
              </Link>
            </div>
            <div className="mt-12 grid grid-cols-3 gap-6 max-w-lg">
              {HERO_STATS.map((stat) => (
                <div key={stat.label}>
                  <p className="font-[family-name:var(--font-sora)] text-2xl md:text-3xl font-bold text-[var(--foreground)]">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs leading-snug text-[var(--muted-foreground)]">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="relative">
              <div className="relative overflow-hidden rounded-2xl border border-black/5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_24px_48px_-16px_rgba(0,0,0,0.25)]">
                <img
                  src="https://images.unsplash.com/photo-1486754735734-325b5831c3ad?auto=format&fit=crop&w=1200&q=80"
                  alt="Technician servicing a vehicle in a bright auto shop bay"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://images.unsplash.com/photo-1632823469850-1b7b1e8b7174?auto=format&fit=crop&w=1200&q=80";
                  }}
                  className="h-[420px] w-full object-cover md:h-[500px]"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 hidden md:flex items-center gap-3 rounded-2xl border border-black/5 bg-[var(--card)] px-5 py-4 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.12)]">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--accent)]/10 text-[var(--accent)]">
                  <ShieldCheck className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-[var(--foreground)]">12-month guarantee</p>
                  <p className="text-xs text-[var(--muted-foreground)]">Parts and labor covered</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-[var(--background)] py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-wide text-[var(--primary)]">
              Popular services
            </span>
            <h2 className="mt-3 font-[family-name:var(--font-sora)] text-3xl md:text-4xl font-bold tracking-tight text-[var(--foreground)] text-balance">
              Everything your vehicle needs, under one roof.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--muted-foreground)]">
              From routine maintenance to complex diagnostics, our certified team handles it with clear pricing up front.
            </p>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURED_SERVICES.map((service, index) => (
              <Reveal key={service.id} delay={index * 0.08}>
                <div className="group h-full flex flex-col overflow-hidden rounded-2xl border border-black/5 bg-[var(--card)] shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.12)] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_1px_2px_rgba(0,0,0,0.06),0_16px_32px_-10px_rgba(0,0,0,0.2)]">
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.name}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://images.unsplash.com/photo-1632823469850-1b7b1e8b7174?auto=format&fit=crop&w=1200&q=80";
                      }}
                      className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                    <span className="absolute top-3 left-3 rounded-full bg-[var(--card)]/90 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wide text-[var(--accent)] backdrop-blur">
                      {service.category}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-[family-name:var(--font-sora)] text-lg font-bold text-[var(--foreground)]">
                      {service.name}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--muted-foreground)] flex-1">
                      {service.description}
                    </p>
                    <div className="mt-5 flex items-center justify-between border-t border-[var(--border)] pt-4">
                      <div>
                        <p className="font-[family-name:var(--font-sora)] text-lg font-bold text-[var(--primary)]">
                          {service.price}
                        </p>
                        <p className="text-xs text-[var(--muted-foreground)]">{service.duration}</p>
                      </div>
                      <Link
                        href="/booking"
                        className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--accent)] transition-colors duration-200 hover:text-[var(--primary)]"
                      >
                        Book
                        <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-10 flex justify-center">
            <Link href="/services">
              <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card)] px-6 py-3 text-sm font-semibold text-[var(--foreground)] transition-all duration-300 ease-out hover:border-[var(--primary)]/40 hover:text-[var(--primary)]">
                See all services
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="bg-[var(--accent)] py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          <Reveal className="lg:col-span-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-[var(--foreground)]">
              Why choose us
            </span>
            <h2 className="mt-3 font-[family-name:var(--font-sora)] text-3xl md:text-4xl font-bold tracking-tight text-white text-balance">
              Built on trust, backed by results.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/75">
              We treat every vehicle like it is our own. That means clear communication, fair pricing, and workmanship that holds up over time.
            </p>
            <div className="mt-8 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-white">
                <PhoneCall className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-xs text-white/60">Questions? Call us</p>
                <a
                  href={brandPhoneHref ? `tel:${brandPhoneHref}` : undefined}
                  className="text-sm font-semibold text-white transition-colors duration-200 hover:text-white/70"
                >
                  {brandPhoneDisplay}
                </a>
              </div>
            </div>
          </Reveal>

          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {VALUE_PROPS.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.08}>
                <div className="h-full rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur transition-all duration-300 ease-out hover:bg-white/[0.08]">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--primary)]/90 text-white">
                    <item.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-[family-name:var(--font-sora)] text-base font-bold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/75">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--background)] py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="max-w-2xl mx-auto text-center">
            <span className="text-xs font-semibold uppercase tracking-wide text-[var(--primary)]">
              Customer stories
            </span>
            <h2 className="mt-3 font-[family-name:var(--font-sora)] text-3xl md:text-4xl font-bold tracking-tight text-[var(--foreground)] text-balance">
              Drivers trust us with what matters most.
            </h2>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((testimonial, index) => (
              <Reveal key={testimonial.name} delay={index * 0.08}>
                <div className="h-full rounded-2xl border border-black/5 bg-[var(--card)] p-7 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.12)]">
                  <div className="flex items-center gap-1 text-[var(--primary)]">
                    {Array.from({ length: testimonial.rating }).map((_, starIndex) => (
                      <Star key={starIndex} className="h-4 w-4 fill-current" aria-hidden="true" />
                    ))}
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-[var(--foreground)]/85">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  <div className="mt-6 border-t border-[var(--border)] pt-4">
                    <p className="text-sm font-semibold text-[var(--foreground)]">{testimonial.name}</p>
                    <p className="text-xs text-[var(--muted-foreground)]">{testimonial.role}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--card)] py-24 md:py-32">
        <div className="mx-auto max-w-5xl px-6">
          <div className="relative overflow-hidden rounded-2xl bg-[var(--primary)] px-8 py-14 md:px-16 md:py-16">
            <div className="absolute -top-16 -right-16 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <Reveal>
                <h2 className="font-[family-name:var(--font-sora)] text-3xl md:text-4xl font-bold tracking-tight text-white text-balance">
                  Ready to get your vehicle back in top shape?
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-white/85">
                  Book online in under two minutes, or reach out and our team will get you scheduled today.
                </p>
              </Reveal>
              <Reveal delay={0.1} className="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-4 md:justify-end">
                <Link href="/booking">
                  <span className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-[var(--primary)] shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.2)] transition-all duration-300 ease-out hover:brightness-95">
                    Book now
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </Link>
                <Link href="/contact">
                  <span className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 ease-out hover:bg-white/10">
                    Contact us
                  </span>
                </Link>
              </Reveal>
            </div>
          </div>

          <Reveal delay={0.15}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-[var(--muted-foreground)]">
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[var(--accent)]" aria-hidden="true" />
                {brandAddress}
              </span>
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[var(--accent)]" aria-hidden="true" />
                {brandHours}
              </span>
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[var(--accent)]" aria-hidden="true" />
                {brandEmail}
              </span>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
