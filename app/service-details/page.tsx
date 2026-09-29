"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { Star, Clock, Check, Circle, ArrowRight, Activity, Sparkles, AlertCircle, Info, Calendar } from 'lucide-react';
import { Reveal } from "@/components/Reveal";
const APP_NAME = "Torque & Tread Auto Care";
const APP_PHONE = "(555) 010-2938";
import { cn } from "@/lib/utils";

// ---- Inline mock data for the featured service (page-local, not shared) ----

const FEATURED_SERVICE = {
  id: "brake-system-service",
  name: "Complete Brake System Service",
  category: "Repair" as const,
  tagline: "Stop with confidence. Full inspection, OEM-grade parts, and a fluid flush in one visit.",
  price: 189,
  priceLabel: "$189",
  durationLabel: "1.5 hours",
  rating: 4.9,
  reviewCount: 312,
  image: "https://images.unsplash.com/photo-1486754735734-325b5831c3ad?auto=format&fit=crop&w=1200&q=80",
};

const BENEFITS = [
  {
    icon: Activity,
    title: "Full brake pad & rotor inspection",
    detail: "Certified technicians measure pad thickness and rotor wear against manufacturer tolerances.",
  },
  {
    icon: Check,
    title: "OEM-grade pad replacement",
    detail: "We install pads matched to your vehicle's factory specification, never generic aftermarket fillers.",
  },
  {
    icon: Sparkles,
    title: "Brake fluid flush & top-off",
    detail: "Old, moisture-laden fluid is fully evacuated and replaced to protect your calipers and lines.",
  },
  {
    icon: Circle,
    title: "Caliper lubrication & inspection",
    detail: "Sliding pins are cleaned and greased so pads wear evenly and pedal feel stays consistent.",
  },
  {
    icon: Info,
    title: "Free 20-point safety check",
    detail: "Every brake job includes a complimentary inspection of suspension, tires, and fluid levels.",
  },
  {
    icon: AlertCircle,
    title: "12-month / 12,000-mile warranty",
    detail: "Parts and labor are covered so you can drive away without a second thought.",
  },
];

const PRICING_BREAKDOWN = [
  { label: "Diagnostic & Inspection", value: "Included" },
  { label: "Front Brake Pads (OEM-grade)", value: "$89" },
  { label: "Brake Fluid Flush", value: "$45" },
  { label: "Labor (1.5 hrs)", value: "$55" },
];

const ADD_ONS = [
  { label: "Rear brake pad replacement", value: "+$79" },
  { label: "Rotor resurfacing (per axle)", value: "+$59" },
  { label: "Rotor replacement (per axle)", value: "+$149" },
];

const PROCESS_STEPS = [
  { step: "01", title: "Book online", detail: "Pick a service bay time slot that fits your schedule in under a minute." },
  { step: "02", title: "Drop off your vehicle", detail: "Hand off your keys at our service desk, or wait in our lounge." },
  { step: "03", title: "Certified technician gets to work", detail: "Your brakes are inspected, serviced, and quality-checked." },
  { step: "04", title: "Drive away confident", detail: "We walk you through what was done before you leave the lot." },
];

const FAQS = [
  {
    question: "How long does the service actually take?",
    answer:
      "Most Complete Brake System Services are finished in about 90 minutes. If we find additional wear during inspection, we call before doing any extra work.",
  },
  {
    question: "Do you use OEM or aftermarket parts?",
    answer:
      "We install OEM-grade pads matched to your vehicle's factory specification as standard. Premium ceramic upgrades are available on request.",
  },
  {
    question: "What does the warranty actually cover?",
    answer:
      "Parts and labor on this service are covered for 12 months or 12,000 miles, whichever comes first, at any of our service locations.",
  },
  {
    question: "Can I wait at the shop while it's done?",
    answer:
      "Yes. Our customer lounge has seating, coffee, and free Wi-Fi, and most brake services finish well within a single visit.",
  },
];

const heroImageVariant: Variants = {
  hidden: { opacity: 0, scale: 0.96, x: 24 },
  visible: { opacity: 1, scale: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

function StarRating({ rating }: { rating: number }) {
  const fullStars = Math.round(rating);
  return (
    <div className="flex items-center gap-0.5" role="img" aria-label={`Rated ${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            "h-4 w-4",
            i < fullStars ? "fill-[var(--accent)] text-[var(--accent)]" : "text-[hsl(var(--muted-foreground))]",
          )}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

export default function ServiceDetailsPage() {
  return (
    <main className="bg-[hsl(var(--background))]">
      {/* Service Header */}
      <Reveal>
        <section id="service-header" className="border-b border-[hsl(var(--border))]">
          <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 py-16 md:grid-cols-2 md:py-24">
            <div>
              <span className="inline-flex items-center rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-3 py-1 text-xs font-medium uppercase tracking-wide text-[hsl(var(--muted-foreground))]">
                {FEATURED_SERVICE.category}
              </span>
              <h1 className="mt-4 text-balance text-4xl font-bold tracking-tight text-[hsl(var(--foreground))] sm:text-5xl">
                {FEATURED_SERVICE.name}
              </h1>
              <p className="mt-4 max-w-md text-pretty leading-relaxed text-[hsl(var(--muted-foreground))]">
                {FEATURED_SERVICE.tagline}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-2">
                  <StarRating rating={FEATURED_SERVICE.rating} />
                  <span className="text-sm text-[hsl(var(--muted-foreground))]">
                    {FEATURED_SERVICE.rating.toFixed(1)} ({FEATURED_SERVICE.reviewCount} reviews)
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-sm text-[hsl(var(--muted-foreground))]">
                  <Clock className="h-4 w-4" aria-hidden="true" />
                  {FEATURED_SERVICE.durationLabel}
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-end gap-4">
                <div>
                  <div className="text-xs uppercase tracking-wide text-[hsl(var(--muted-foreground))]">Starting at</div>
                  <div className="text-4xl font-bold tracking-tight text-[hsl(var(--foreground))]">
                    {FEATURED_SERVICE.priceLabel}
                  </div>
                </div>
                <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    href="/booking"
                    className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-[var(--accent-foreground,white)] shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.25)] transition-all duration-300 ease-out hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
                  >
                    Book this service
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </motion.div>
              </div>
            </div>

            <motion.div
              variants={heroImageVariant}
              initial="hidden"
              animate="visible"
              className="relative overflow-hidden rounded-2xl border border-[hsl(var(--border))] shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.16)]"
            >
              <Image
                src={FEATURED_SERVICE.image}
                alt="Technician performing a complete brake system service on a vehicle"
                width={800}
                height={600}
                className="h-full w-full object-cover"
                priority
              />
            </motion.div>
          </div>
        </section>
      </Reveal>

      {/* Description / Benefits */}
      <Reveal>
        <section id="description" className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-[hsl(var(--foreground))]">
              What&apos;s included
            </h2>
            <p className="mt-3 text-pretty leading-relaxed text-[hsl(var(--muted-foreground))]">
              Every brake job at {APP_NAME} follows the same disciplined checklist, whether it&apos;s a routine pad
              swap or a full system overhaul.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {BENEFITS.map((benefit, i) => (
              <Reveal key={benefit.title} delay={i * 0.06}>
                <div className="h-full rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_1px_2px_rgba(0,0,0,0.04),0_12px_28px_-10px_rgba(0,0,0,0.18)]">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent)]/10 text-[var(--accent)]">
                    <benefit.icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-[hsl(var(--foreground))]">{benefit.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">{benefit.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      </Reveal>

      {/* Process steps - full-bleed tinted band, distinct layout from grid above */}
      <Reveal>
        <section className="border-y border-[hsl(var(--border))] bg-[hsl(var(--card))]">
          <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
            <h2 className="text-3xl font-bold tracking-tight text-[hsl(var(--foreground))]">How it works</h2>
            <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-4">
              {PROCESS_STEPS.map((item, i) => (
                <Reveal key={item.step} delay={i * 0.08}>
                  <div className="relative pl-0">
                    <span className="text-sm font-semibold text-[var(--accent)]">{item.step}</span>
                    <h3 className="mt-2 text-lg font-semibold text-[hsl(var(--foreground))]">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">{item.detail}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* Pricing breakdown */}
      <Reveal>
        <section id="pricing" className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold tracking-tight text-[hsl(var(--foreground))]">Pricing breakdown</h2>
              <p className="mt-3 text-pretty leading-relaxed text-[hsl(var(--muted-foreground))]">
                No surprise line items. Here&apos;s exactly what makes up the {FEATURED_SERVICE.priceLabel} price for
                front-axle service, plus common add-ons for a full four-wheel job.
              </p>
              <div className="mt-6 flex items-start gap-2 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4 text-sm text-[hsl(var(--muted-foreground))]">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent)]" aria-hidden="true" />
                Final pricing may vary slightly by vehicle make and model. We always confirm before any additional
                work begins.
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="overflow-hidden rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.12)]">
                <div className="border-b border-[hsl(var(--border))] px-6 py-4">
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-[hsl(var(--muted-foreground))]">
                    Included in {FEATURED_SERVICE.priceLabel}
                  </h3>
                </div>
                <ul>
                  {PRICING_BREAKDOWN.map((row, i) => (
                    <li
                      key={row.label}
                      className={cn(
                        "flex items-center justify-between px-6 py-4 text-sm",
                        i !== PRICING_BREAKDOWN.length - 1 && "border-b border-[hsl(var(--border))]",
                      )}
                    >
                      <span className="text-[hsl(var(--foreground))]">{row.label}</span>
                      <span className="font-medium text-[hsl(var(--foreground))]">{row.value}</span>
                    </li>
                  ))}
                  <li className="flex items-center justify-between bg-[var(--accent)]/5 px-6 py-4 text-sm">
                    <span className="font-semibold text-[hsl(var(--foreground))]">Total (front axle)</span>
                    <span className="text-lg font-bold text-[var(--accent)]">{FEATURED_SERVICE.priceLabel}</span>
                  </li>
                </ul>

                <div className="border-t border-[hsl(var(--border))] px-6 py-4">
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-[hsl(var(--muted-foreground))]">
                    Common add-ons
                  </h3>
                  <ul className="mt-3 space-y-2">
                    {ADD_ONS.map((row) => (
                      <li key={row.label} className="flex items-center justify-between text-sm">
                        <span className="text-[hsl(var(--muted-foreground))]">{row.label}</span>
                        <span className="font-medium text-[hsl(var(--foreground))]">{row.value}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* FAQ */}
      <Reveal>
        <section className="border-t border-[hsl(var(--border))] bg-[hsl(var(--card))]">
          <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
            <h2 className="text-3xl font-bold tracking-tight text-[hsl(var(--foreground))]">Common questions</h2>
            <div className="mt-8 divide-y divide-[hsl(var(--border))]">
              {FAQS.map((faq, i) => (
                <Reveal key={faq.question} delay={i * 0.05}>
                  <div className="py-5">
                    <h3 className="text-base font-semibold text-[hsl(var(--foreground))]">{faq.question}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">{faq.answer}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* Booking CTA */}
      <Reveal>
        <section id="booking-cta" className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <div className="relative overflow-hidden rounded-3xl border border-[hsl(var(--border))] bg-[hsl(var(--foreground))] px-8 py-14 text-center shadow-[0_1px_2px_rgba(0,0,0,0.04),0_20px_48px_-16px_rgba(0,0,0,0.35)] sm:px-16">
            <div
              className="pointer-events-none absolute inset-0 opacity-20"
              style={{
                background:
                  "radial-gradient(600px circle at 50% 0%, var(--accent), transparent 60%)",
              }}
              aria-hidden="true"
            />
            <div className="relative">
              <h2 className="text-balance text-3xl font-bold tracking-tight text-[hsl(var(--background))] sm:text-4xl">
                Ready to get your brakes serviced?
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-pretty leading-relaxed text-[hsl(var(--background))]/70">
                Reserve a bay in under two minutes, or call us and we&apos;ll find the next available slot for your
                vehicle.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    href="/booking"
                    className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-7 py-3 text-sm font-semibold text-[var(--accent-foreground,white)] transition-all duration-300 ease-out hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
                  >
                    <Calendar className="h-4 w-4" aria-hidden="true" />
                    Book this service
                  </Link>
                </motion.div>
                <a
                  href={`tel:${APP_PHONE.replace(/[^0-9+]/g, "")}`}
                  className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--background))]/20 px-7 py-3 text-sm font-semibold text-[hsl(var(--background))] transition-all duration-300 ease-out hover:bg-[hsl(var(--background))]/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[hsl(var(--background))]"
                >
                  Call {APP_PHONE}
                </a>
              </div>
            </div>
          </div>
        </section>
      </Reveal>
    </main>
  );
}