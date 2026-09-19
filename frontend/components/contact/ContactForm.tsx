"use client";

import { useState } from "react";
import apiRequest from "@/lib/api";

const INDUSTRY_OPTIONS = [
  { value: "restaurants", label: "Restaurant / Quick Service" },
  { value: "hotels", label: "Hotel / Accommodation" },
  { value: "golfclubs", label: "Golf & Member Club" },
  { value: "bars", label: "Bar / Lounge" },
  { value: "smes", label: "SME / General Retail" },
  { value: "other", label: "Other System Support" }
];

// Wired to POST /api/leads (Phase 14) — no auth required, the endpoint is
// public but rate-limited on the backend.
export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage(null);

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      await apiRequest("/api/leads", {
        method: "POST",
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          phone: formData.get("phone") || null,
          interest: formData.get("interest"),
          message: formData.get("message")
        })
      });
      setStatus("success");
      form.reset();
      setTimeout(() => setStatus("idle"), 5000);
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong — please try again."
      );
    }
  };

  return (
    <div className="rounded-2xl border border-daltar-border bg-daltar-bg-card p-8 shadow-2xl shadow-black/20">
      <h2 className="mb-6 text-xl font-bold text-daltar-text-bright">
        Send Us An Enterprise Request
      </h2>

      {status === "success" && (
        <div className="mb-5 rounded-lg border border-daltar-whatsapp bg-daltar-whatsapp/10 px-4 py-3.5 text-[13.5px] text-daltar-whatsapp">
          &#10003; Thank you! Your request has been received — our team will be in touch
          shortly.
        </div>
      )}

      {status === "error" && (
        <div className="mb-5 rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3.5 text-[13.5px] text-red-400">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="contactName"
              className="mb-2 block text-xs font-semibold uppercase tracking-wide text-daltar-text-muted"
            >
              Your Full Name
            </label>
            <input
              id="contactName"
              name="name"
              type="text"
              required
              placeholder="e.g., John Doe"
              className="w-full rounded-lg border border-daltar-border bg-daltar-bg-deep px-4 py-3 text-sm text-daltar-text-bright transition focus:border-daltar-accent-blue focus:outline-none focus:ring-2 focus:ring-daltar-accent-blue/20"
            />
          </div>
          <div>
            <label
              htmlFor="contactEmail"
              className="mb-2 block text-xs font-semibold uppercase tracking-wide text-daltar-text-muted"
            >
              Corporate Email Address
            </label>
            <input
              id="contactEmail"
              name="email"
              type="email"
              required
              placeholder="name@company.co.ke"
              className="w-full rounded-lg border border-daltar-border bg-daltar-bg-deep px-4 py-3 text-sm text-daltar-text-bright transition focus:border-daltar-accent-blue focus:outline-none focus:ring-2 focus:ring-daltar-accent-blue/20"
            />
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="contactPhone"
              className="mb-2 block text-xs font-semibold uppercase tracking-wide text-daltar-text-muted"
            >
              Phone Number
            </label>
            <input
              id="contactPhone"
              name="phone"
              type="tel"
              required
              placeholder="e.g., +254 700 000 000"
              className="w-full rounded-lg border border-daltar-border bg-daltar-bg-deep px-4 py-3 text-sm text-daltar-text-bright transition focus:border-daltar-accent-blue focus:outline-none focus:ring-2 focus:ring-daltar-accent-blue/20"
            />
          </div>
          <div>
            <label
              htmlFor="contactSegment"
              className="mb-2 block text-xs font-semibold uppercase tracking-wide text-daltar-text-muted"
            >
              Industry Segment
            </label>
            <select
              id="contactSegment"
              name="interest"
              className="w-full rounded-lg border border-daltar-border bg-daltar-bg-deep px-4 py-3 text-sm text-daltar-text-bright transition focus:border-daltar-accent-blue focus:outline-none focus:ring-2 focus:ring-daltar-accent-blue/20"
            >
              {INDUSTRY_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-5">
          <label
            htmlFor="contactMessage"
            className="mb-2 block text-xs font-semibold uppercase tracking-wide text-daltar-text-muted"
          >
            Operational Needs / Message
          </label>
          <textarea
            id="contactMessage"
            name="message"
            required
            placeholder="Detail any system requirements or scaling pain points..."
            className="min-h-[120px] w-full resize-y rounded-lg border border-daltar-border bg-daltar-bg-deep px-4 py-3 text-sm text-daltar-text-bright transition focus:border-daltar-accent-blue focus:outline-none focus:ring-2 focus:ring-daltar-accent-blue/20"
          />
        </div>

        <button
          type="submit"
          disabled={status === "submitting"}
          className="mt-6 w-full rounded-md bg-daltar-accent-blue px-5 py-3.5 text-sm font-semibold text-daltar-bg-deep transition hover:bg-daltar-accent-blue-hover disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "submitting" ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
}
