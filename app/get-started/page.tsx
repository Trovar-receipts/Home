"use client";

import { useState, type ReactNode } from "react";
import { ArrowLeft, ArrowRight, Check, Loader2 } from "lucide-react";

// Curated integration list (also doubles as market research on demand)
const APPS = [
  { id: "meta", name: "Meta Ads", slug: "meta" },
  { id: "google_ads", name: "Google Ads", slug: "googleads" },
  { id: "microsoft_ads", name: "Microsoft Ads", slug: "microsoft" },
  { id: "tiktok_ads", name: "TikTok Ads", slug: "tiktok" },
  { id: "linkedin_ads", name: "LinkedIn Ads", slug: "linkedin" },
  { id: "amazon_ads", name: "Amazon Ads", slug: "amazon" },
  { id: "adobe", name: "Adobe", slug: "adobe" },
  { id: "canva", name: "Canva", slug: "canva" },
  { id: "shopify", name: "Shopify", slug: "shopify" },
  { id: "stripe", name: "Stripe", slug: "stripe" },
  { id: "klaviyo", name: "Klaviyo", slug: "klaviyo" },
  { id: "mailchimp", name: "Mailchimp", slug: "mailchimp" },
  { id: "hubspot", name: "HubSpot", slug: "hubspot" },
  { id: "xero", name: "Xero", slug: "xero" },
  { id: "google_workspace", name: "Google Workspace", slug: "google" },
  { id: "microsoft_365", name: "Microsoft 365", slug: "microsoftoffice" },
  { id: "dropbox", name: "Dropbox", slug: "dropbox" },
  { id: "aws", name: "AWS", slug: "amazonwebservices" },
];

const CLIENT_BANDS = ["1–5", "6–20", "21–50", "50+"];

const card = "rounded-xl border border-[#2E3032] bg-[#1F2122]";
const inputCls =
  "w-full rounded-xl border border-[#2E3032] bg-[#000D0F] px-4 py-3 text-sm text-[#F5F5F7] placeholder-[#4A4D4F] outline-none transition focus:border-[#7DD3FC]/50";

export default function GetStarted() {
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    practiceName: "",
    phone: "",
    clientBand: "",
    notes: "",
    otherApps: "",
  });
  const [apps, setApps] = useState<string[]>([]);

  function set(key: keyof typeof form, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function toggleApp(id: string) {
    setApps((prev) => (prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]));
  }

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
  const canContinue = step === 0 ? form.name.trim() && emailValid && form.practiceName.trim() : true;

  async function submit() {
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, apps }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Request failed");
      }
      setDone(true);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong";
      setError(`${msg}. Please try again, or email us at hello@trovar.co.nz.`);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#000D0F]">
      {/* Header */}
      <header className="border-b border-[#2E3032]">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 px-4 py-5 sm:px-6">
          <a href="/" className="flex shrink-0 items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-wordmark.svg" alt="Trovar" className="h-5 w-auto" />
          </a>
          <a href="/" className="shrink-0 text-sm text-[#8A8D8F] transition hover:text-[#F5F5F7]">
            Back to site
          </a>
        </div>
      </header>

      <div className="mx-auto max-w-2xl px-6 py-14">
        {done ? (
          <Success email={form.email} />
        ) : (
          <>
            {/* Progress */}
            <div className="mb-10 flex items-center gap-2">
              {[0, 1, 2].map((s) => (
                <div
                  key={s}
                  className="h-1 flex-1 rounded-full transition-colors"
                  style={{ backgroundColor: s <= step ? "#7DD3FC" : "#2E3032" }}
                />
              ))}
            </div>

            {step === 0 && (
              <Section
                title="Let's get you set up"
                subtitle="Tell us a little about your practice and we'll prepare your account."
              >
                <div className="space-y-4">
                  <Field label="Your name">
                    <input className={inputCls} value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Jane Smith" />
                  </Field>
                  <Field label="Work email">
                    <input className={inputCls} type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="jane@accountingfirm.co.nz" />
                  </Field>
                  <Field label="Practice name">
                    <input className={inputCls} value={form.practiceName} onChange={(e) => set("practiceName", e.target.value)} placeholder="Smith & Co Accountants" />
                  </Field>
                  <Field label="Phone (optional)">
                    <input className={inputCls} value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="021 234 5678" />
                  </Field>
                </div>
              </Section>
            )}

            {step === 1 && (
              <Section
                title="Which apps do you need invoices from?"
                subtitle="Pick everything your clients spend on. We'll prioritise connecting these first."
              >
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {APPS.map((app) => {
                    const selected = apps.includes(app.id);
                    return (
                      <button
                        key={app.id}
                        type="button"
                        onClick={() => toggleApp(app.id)}
                        className="relative flex flex-col items-center gap-2.5 rounded-xl border p-4 text-center transition-colors"
                        style={{
                          borderColor: selected ? "#7DD3FC" : "#2E3032",
                          backgroundColor: selected ? "#7DD3FC14" : "#1F2122",
                        }}
                      >
                        {selected && (
                          <span className="absolute right-2 top-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#7DD3FC]">
                            <Check size={11} className="text-[#04181C]" strokeWidth={3} />
                          </span>
                        )}
                        <AppIcon slug={app.slug} name={app.name} />
                        <span className="text-xs font-medium text-[#F5F5F7]">{app.name}</span>
                      </button>
                    );
                  })}
                </div>
                <div className="mt-4">
                  <Field label="Anything else? (optional)">
                    <input className={inputCls} value={form.otherApps} onChange={(e) => set("otherApps", e.target.value)} placeholder="e.g. Spotify Ads, Pinterest, a niche tool…" />
                  </Field>
                </div>
              </Section>
            )}

            {step === 2 && (
              <Section
                title="Last thing"
                subtitle="This helps us tailor your onboarding."
              >
                <Field label="How many clients do you manage?">
                  <div className="grid grid-cols-4 gap-2">
                    {CLIENT_BANDS.map((band) => (
                      <button
                        key={band}
                        type="button"
                        onClick={() => set("clientBand", band)}
                        className="rounded-xl border py-3 text-sm font-medium transition-colors"
                        style={{
                          borderColor: form.clientBand === band ? "#7DD3FC" : "#2E3032",
                          backgroundColor: form.clientBand === band ? "#7DD3FC14" : "#1F2122",
                          color: form.clientBand === band ? "#F5F5F7" : "#8A8D8F",
                        }}
                      >
                        {band}
                      </button>
                    ))}
                  </div>
                </Field>
                <div className="mt-4">
                  <Field label="Anything we should know? (optional)">
                    <textarea
                      className={`${inputCls} min-h-[90px] resize-none`}
                      value={form.notes}
                      onChange={(e) => set("notes", e.target.value)}
                      placeholder="Tell us about your current setup or what's painful today."
                    />
                  </Field>
                </div>
                {error && <p className="mt-4 text-sm text-[#F5A97D]">{error}</p>}
              </Section>
            )}

            {/* Nav */}
            <div className="mt-8 flex items-center justify-between">
              {step > 0 ? (
                <button
                  onClick={() => setStep((s) => s - 1)}
                  className="flex items-center gap-1.5 text-sm text-[#8A8D8F] transition hover:text-[#F5F5F7]"
                >
                  <ArrowLeft size={15} /> Back
                </button>
              ) : (
                <span />
              )}

              {step < 2 ? (
                <button
                  onClick={() => canContinue && setStep((s) => s + 1)}
                  disabled={!canContinue}
                  className="flex items-center gap-1.5 rounded-xl px-5 py-3 text-sm font-medium transition"
                  style={{
                    backgroundColor: canContinue ? "#7DD3FC" : "#2E3032",
                    color: canContinue ? "#04181C" : "#6B6E70",
                    cursor: canContinue ? "pointer" : "not-allowed",
                  }}
                >
                  Continue <ArrowRight size={15} />
                </button>
              ) : (
                <button
                  onClick={submit}
                  disabled={submitting}
                  className="flex items-center gap-2 rounded-xl bg-[#7DD3FC] px-5 py-3 text-sm font-medium text-[#04181C] transition"
                  style={{ opacity: submitting ? 0.7 : 1 }}
                >
                  {submitting ? <Loader2 size={15} className="animate-spin" /> : null}
                  {submitting ? "Submitting…" : "Request my account"}
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </main>
  );
}

function AppIcon({ slug, name }: { slug: string; name: string }) {
  const [errored, setErrored] = useState(false);
  return (
    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white">
      {errored ? (
        <span className="text-sm font-bold text-[#04181C]">{name[0]}</span>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={`https://cdn.simpleicons.org/${slug}`}
          alt={name}
          className="h-5 w-5"
          onError={() => setErrored(true)}
        />
      )}
    </span>
  );
}

function Section({ title, subtitle, children }: { title: string; subtitle: string; children: ReactNode }) {
  return (
    <div>
      <h1 className="text-2xl font-light text-[#F5F5F7] md:text-3xl">{title}</h1>
      <p className="mt-2 mb-8 text-[#8A8D8F]">{subtitle}</p>
      {children}
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="space-y-1.5 text-left">
      <label className="text-sm text-[#8A8D8F]">{label}</label>
      {children}
    </div>
  );
}

function Success({ email }: { email: string }) {
  return (
    <div className="py-10 text-center">
      <div className="mb-6 flex justify-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#7DD3FC]">
          <Check size={28} className="text-[#04181C]" strokeWidth={2.5} />
        </div>
      </div>
      <h1 className="text-3xl font-light text-[#F5F5F7] md:text-4xl">We're preparing your account</h1>
      <p className="mx-auto mt-4 max-w-md text-[#8A8D8F]">
        Thanks — we've got your details. Our team is setting up your connections now. We'll email{" "}
        <span className="text-[#F5F5F7]">{email}</span> the moment it's ready to use.
      </p>
      <a
        href="/"
        className="mt-8 inline-flex items-center gap-1.5 rounded-xl border border-[#2E3032] px-5 py-3 text-sm text-[#E6E6E8] transition hover:bg-[#1F2122]"
      >
        Back to site
      </a>
    </div>
  );
}
