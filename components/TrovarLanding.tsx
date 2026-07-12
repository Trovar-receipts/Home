'use client'

import React, { useState, useEffect } from 'react'
import { motion, useReducedMotion, Variants } from 'framer-motion'
import { ArrowRight, Menu, X, ChevronDown, Zap, Shield, RefreshCw, BarChart3, Users, Mail, Play } from 'lucide-react'
import { cn } from '@/lib/utils'

// ─── Brand Tokens ────────────────────────────────────────────────────────────
const brand = {
  bg: '#000D0F',
  surface: '#1F2122',
  surfaceLight: '#2A2B2C',
  border: '#2E3032',
  borderLight: '#3A3B3D',
  textPrimary: '#F5F5F7',
  textSecondary: '#E6E6E8',
  textMuted: '#8A8D8F',
  accent: '#B6FF3B',
  accentGreen: '#22C55E',
}

// ─── Logo components using real brand assets ──────────────────────────────────
const TrovarMark = ({ size = 32, className, dark = false }: { size?: number; className?: string; dark?: boolean }) => (
  // eslint-disable-next-line @next/next/no-img-element
  <img
    src={dark ? '/logo-mark-black.svg' : '/logo-mark.svg'}
    alt="Trovar mark"
    width={size}
    height={size}
    className={className}
  />
)

const TrovarWordmark = ({ className }: { className?: string; light?: boolean }) => (
  // eslint-disable-next-line @next/next/no-img-element
  <img
    src="/logo-wordmark.svg"
    alt="Trovar"
    width={98}
    height={28}
    className={cn('h-7 w-auto', className)}
  />
)

// ─── Animation Helpers ───────────────────────────────────────────────────────
const transitionVariants: { container: Variants; item: Variants } = {
  container: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
  },
  item: {
    hidden: { opacity: 0, filter: 'blur(6px)', y: 12 },
    visible: { opacity: 1, filter: 'blur(0px)', y: 0, transition: { type: 'spring', bounce: 0.2, duration: 0.55 } },
  },
}

function AnimatedGroup({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div initial="hidden" animate="visible" variants={transitionVariants.container} className={cn(className)}>
      {React.Children.map(children, (child, i) => (
        <motion.div key={i} variants={transitionVariants.item}>{child}</motion.div>
      ))}
    </motion.div>
  )
}

function FadeIn({ children, className, delay = 0.05 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const reduce = useReducedMotion()
  if (reduce) return <div className={className}>{children}</div>
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, filter: 'blur(3px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ delay, duration: 0.4, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ─── Header ──────────────────────────────────────────────────────────────────
const navItems = [
  { name: 'Reconciliation', href: '#reconciliation' },
  { name: 'How it works', href: '#how' },
  { name: 'Integrations', href: '#integrations' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'FAQ', href: '#faq' },
]

function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <header className="fixed z-30 w-full">
      <nav className="mx-auto mt-3 max-w-6xl px-3 sm:px-4">
        <div
          className={cn(
            'flex items-center justify-between gap-3 rounded-2xl px-4 py-3 transition-all duration-300 sm:px-5',
            scrolled
              ? 'border border-[#2E3032] bg-[#000D0F]/90 backdrop-blur-xl shadow-2xl'
              : 'bg-transparent'
          )}
        >
          {/* Logo */}
          <a href="/" className="flex shrink-0 items-center gap-2">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#F5F5F7] sm:h-8 sm:w-8">
              <TrovarMark size={20} dark />
            </div>
            <TrovarWordmark className="h-[18px] w-auto sm:h-6" />
          </a>

          {/* Desktop nav */}
          <ul className="hidden items-center gap-8 text-sm lg:flex">
            {navItems.map((item) => (
              <li key={item.name}>
                <a href={item.href} className="text-[#8A8D8F] transition hover:text-[#F5F5F7]">
                  {item.name}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="hidden items-center gap-3 lg:flex">
            <a
              href="https://app.trovar.co.nz/login"
              className="rounded-lg border border-[#2E3032] px-4 py-2 text-sm text-[#E6E6E8] transition hover:border-[#3A3B3D] hover:bg-[#1F2122]"
            >
              Sign in
            </a>
            <a
              href="/get-started"
              className="rounded-lg bg-[#B6FF3B] px-4 py-2 text-sm font-medium text-[#04181C] transition hover:bg-[#C9FF6B]"
            >
              Get started
            </a>
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setOpen(!open)} className="-mr-1 shrink-0 p-1 lg:hidden" aria-label="Menu">
            {open ? <X className="h-5 w-5 text-[#F5F5F7]" /> : <Menu className="h-5 w-5 text-[#F5F5F7]" />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="mt-2 rounded-2xl border border-[#2E3032] bg-[#000D0F]/95 p-6 backdrop-blur-xl lg:hidden">
            <ul className="space-y-5">
              {navItems.map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="text-[#8A8D8F] hover:text-[#F5F5F7]" onClick={() => setOpen(false)}>
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-col gap-3">
              <a href="https://app.trovar.co.nz/login" className="rounded-lg border border-[#2E3032] px-4 py-2.5 text-center text-sm text-[#E6E6E8]">
                Sign in
              </a>
              <a href="/get-started" className="rounded-lg bg-[#B6FF3B] px-4 py-2.5 text-center text-sm font-medium text-[#04181C]">
                Get started
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

// ─── Hero ────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-44 md:pb-32">
      {/* Background grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'linear-gradient(#F5F5F7 1px, transparent 1px), linear-gradient(90deg, #F5F5F7 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
      {/* Glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-[#B6FF3B]/5 blur-3xl" />

      <div className="relative mx-auto max-w-5xl px-6 text-center">
        <AnimatedGroup>
          {/* Headline */}
          <h1 className="text-5xl font-light leading-[1.1] tracking-tight text-[#F5F5F7] md:text-7xl">
            The expense engine<br />
            <span className="text-[#8A8D8F]">for accounting</span><br />
            firms.
          </h1>

          {/* Sub: the closed loop */}
          <p className="mx-auto mt-6 max-w-2xl text-xl font-light leading-snug text-[#E6E6E8] md:text-2xl">
            Trovar automates the whole cycle{' '}<br className="hidden sm:block" />
            <span className="text-[#B6FF3B]">collect it, match it, prove it&apos;s reconciled.</span>
          </p>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[#8A8D8F]">
            Whatever the platform, there&apos;s a way to capture it: email it through, fetch it by API, or
            upload it manually when nothing else fits. Unlike tools that log in with headless browsers and
            risk tripping 2FA or getting an ad account flagged, Trovar never logs in at all. Every charge is
            then matched against the bank feed automatically. The control sits with you, not your client, so
            the hard work of chasing invoices is gone for good.
          </p>

          {/* CTA */}
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="/get-started"
              className="flex items-center gap-1.5 rounded-xl bg-[#B6FF3B] px-6 py-3 text-sm font-medium text-[#04181C] transition hover:bg-[#C9FF6B]"
            >
              Get started <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#demo"
              className="rounded-xl border border-[#2E3032] px-6 py-3 text-sm text-[#E6E6E8] transition hover:bg-[#1F2122]"
            >
              See how it works
            </a>
          </div>
          <p className="mt-3 text-xs text-[#4A4D4F]">First client free, forever · NZ &amp; AU</p>
        </AnimatedGroup>

        {/* Demo video placeholder */}
        <FadeIn delay={0.15} className="mt-16">
          <div id="demo" className="relative mx-auto max-w-4xl scroll-mt-28">
            <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-[#B6FF3B]/20 to-transparent" />
            <div className="relative overflow-hidden rounded-2xl border border-[#2E3032] bg-[#1F2122] shadow-2xl">
              {/* Browser chrome */}
              <div className="flex items-center gap-2 border-b border-[#2E3032] px-5 py-3">
                <div className="h-3 w-3 rounded-full bg-[#FF5F57]" />
                <div className="h-3 w-3 rounded-full bg-[#FFBD2E]" />
                <div className="h-3 w-3 rounded-full bg-[#27C840]" />
                <div className="ml-4 flex items-center gap-2">
                  <div className="h-4 w-4 rounded bg-[#F5F5F7] flex items-center justify-center">
                    <TrovarMark size={12} dark />
                  </div>
                  <span className="text-xs text-[#4A4D4F]">app.trovar.co.nz</span>
                </div>
              </div>

              {/* Video area placeholder (replace with embedded demo video) */}
              <div className="relative aspect-video w-full bg-gradient-to-br from-[#0B1416] to-[#000D0F]">
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                  <button
                    aria-label="Play product demo"
                    className="flex h-16 w-16 items-center justify-center rounded-full bg-[#B6FF3B] text-[#04181C] shadow-lg transition hover:scale-105"
                  >
                    <Play className="h-6 w-6 translate-x-0.5" fill="currentColor" />
                  </button>
                  <p className="text-sm text-[#8A8D8F]">Watch the 2-minute demo</p>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

// ─── Closed loop / reconciliation showcase ───────────────────────────────────
function ClosedLoop() {
  const missing = [
    { date: '14 Jun', merchant: 'Adobe Creative Cloud', amount: 'NZD 79.99' },
    { date: '18 Jun', merchant: 'Meta Ads', amount: 'AUD 245.10' },
  ]
  return (
    <section id="reconciliation" className="border-y border-[#2E3032] py-20 md:py-28 scroll-mt-24" style={{ backgroundColor: '#050C0D' }}>
      <div className="mx-auto grid max-w-5xl items-center gap-12 px-6 md:grid-cols-2">
        <FadeIn>
          <p className="mb-3 text-xs tracking-widest text-[#4A4D4F] uppercase">The closed loop</p>
          <h2 className="text-3xl font-light leading-tight text-[#F5F5F7] md:text-4xl">
            Other tools collect invoices.<br />
            <span className="text-[#8A8D8F]">Trovar proves they match.</span>
          </h2>
          <p className="mt-5 max-w-md text-[#8A8D8F]">
            Every card transaction your client&apos;s bank feed reports gets matched against a captured
            invoice, automatically. No more spreadsheets of red dots, no more chasing your client to
            confirm what&apos;s missing. You see it, per client, in real time.
          </p>
          <ul className="mt-6 space-y-2.5">
            {['Bank feed matched to captured invoices, line by line', 'A live reconciled % per client, not a guess', 'Exactly what’s still missing, drilled down'].map((f) => (
              <li key={f} className="flex items-start gap-2.5 text-sm text-[#C9CCCE]">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#B6FF3B]" />
                {f}
              </li>
            ))}
          </ul>
          <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#2E3032] bg-[#1F2122] px-3 py-1.5 text-[11px] text-[#8A8D8F]">
            Powered by
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://icons.duckduckgo.com/ip3/airwallex.com.ico" alt="Airwallex" className="h-3.5 w-3.5 rounded-sm" />
            Airwallex
          </span>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="rounded-2xl border border-[#2E3032] bg-[#1F2122] p-6 shadow-2xl">
            <p className="text-xs font-medium uppercase tracking-wide text-[#6B6E70]">Reconciled</p>
            <div className="mt-2 flex items-end gap-3">
              <span className="text-5xl font-semibold text-[#3DD68C]">94%</span>
              <span className="mb-1.5 text-sm text-[#8A8D8F]">last 30 days</span>
            </div>
            <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-[#2E3032]">
              <div className="h-full rounded-full bg-[#3DD68C]" style={{ width: '94%' }} />
            </div>
            <p className="mt-4 text-sm text-[#8A8D8F]">32 of 34 card transactions matched to a captured invoice.</p>
            <div className="mt-5 space-y-2 border-t border-[#2E3032] pt-4">
              <p className="text-xs text-[#6B6E70]">Still missing</p>
              {missing.map((m) => (
                <div key={m.merchant} className="flex items-center gap-3 text-xs text-[#C9CCCE]">
                  <span className="text-[#8A8D8F]">{m.date}</span>
                  <span className="flex-1 truncate">{m.merchant}</span>
                  <span className="text-[#F5F5F7]">{m.amount}</span>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

// ─── Platform logos strip ────────────────────────────────────────────────────
const platforms: { name: string; domain: string }[] = [
  { name: 'Meta Ads', domain: 'facebook.com' },
  { name: 'Google Ads', domain: 'google.com' },
  { name: 'Microsoft Ads', domain: 'about.ads.microsoft.com' },
  { name: 'TikTok Ads', domain: 'tiktok.com' },
  { name: 'LinkedIn Ads', domain: 'linkedin.com' },
  { name: 'Amazon Ads', domain: 'advertising.amazon.com' },
  { name: 'Adobe', domain: 'adobe.com' },
  { name: 'Canva', domain: 'canva.com' },
  { name: 'Shopify', domain: 'shopify.com' },
  { name: 'Stripe', domain: 'stripe.com' },
  { name: 'Klaviyo', domain: 'klaviyo.com' },
  { name: 'Mailchimp', domain: 'mailchimp.com' },
  { name: 'HubSpot', domain: 'hubspot.com' },
  { name: 'Microsoft 365', domain: 'office.com' },
  { name: 'Dropbox', domain: 'dropbox.com' },
  { name: 'Xero', domain: 'xero.com' },
]

function PlatformStrip() {
  return (
    <section id="integrations" className="border-y border-[#2E3032] py-14 md:py-20">
      <div className="mx-auto max-w-5xl px-6">
        <FadeIn>
          <p className="mb-2 text-center text-xs tracking-widest text-[#4A4D4F] uppercase">Integrations</p>
          <h2 className="mb-10 text-center text-2xl font-light text-[#F5F5F7] md:text-3xl">
            Connects to all your clients&apos; paid subscriptions
          </h2>
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-8">
            {platforms.map((p) => (
              <div
                key={p.name}
                className="flex flex-col items-center gap-2 rounded-xl border border-[#2E3032] bg-[#1F2122] p-3 transition hover:border-[#3A3B3D]"
                title={p.name}
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://icons.duckduckgo.com/ip3/${p.domain}.ico`}
                    alt={`${p.name} logo`}
                    width={20}
                    height={20}
                    loading="lazy"
                    decoding="async"
                    className="h-5 w-5"
                  />
                </span>
                <span className="text-center text-[10px] leading-tight text-[#8A8D8F]">{p.name}</span>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-sm text-[#8A8D8F]">…and many more. If your client uses it, just ask and we&apos;ll connect it.</p>
        </FadeIn>
      </div>
    </section>
  )
}

// ─── How it works ────────────────────────────────────────────────────────────
const steps = [
  {
    icon: Mail,
    label: 'COLLECT',
    title: 'We collect',
    description: 'Trovar automatically gathers receipts and invoices from inboxes, connected apps and spending platforms.',
  },
  {
    icon: RefreshCw,
    label: 'MATCH',
    title: 'We match',
    description: 'Trovar checks every charge on your client\'s Airwallex feed against what\'s been collected, so you know exactly what\'s missing, not just what\'s been filed. It\'s the fully closed loop, and nobody\'s done it before Trovar.',
  },
  {
    icon: ArrowRight,
    label: 'DELIVER',
    title: 'We deliver',
    description: 'Everything is organised and coded, ready for your accounting software, reports and tax time.',
  },
]

// Sources feeding in, and the accounting platforms it all comes out into.
// Kept separate from ad-network billing sources — this is about the shape of
// the flow (many in, one hub, many out), not a claim about every integration.
const flowSources = [
  { name: 'Email', domain: 'gmail.com' },
  { name: 'Meta', domain: 'facebook.com' },
  { name: 'Google Ads', domain: 'google.com' },
  { name: 'Bank feed', domain: 'airwallex.com' },
  { name: 'Shopify', domain: 'shopify.com' },
]
const flowDestinations = [
  { name: 'Xero', domain: 'xero.com' },
  { name: 'MYOB', domain: 'myob.com' },
  { name: 'QuickBooks', domain: 'quickbooks.intuit.com' },
]

// Straight-line paths in a 760x400 coordinate space. The dots are native SVG
// <animateMotion> riding the exact same <path> elements as the visible dashed
// lines, all inside one viewBox — so as the container is scaled to fit any
// screen width, the dots and the lines scale together and never drift apart.
// (An earlier version used a CSS `offset-path` with raw pixel coordinates,
// which only lined up with the visible SVG at the one width it was designed
// for — on a narrower phone the container shrank but the dots kept moving
// across the original 600px-wide path, so they drifted off the lines and
// the stray real pixels past ~600 wide could even push the page's scroll width.)
function FlowDiagram() {
  const reduceMotion = useReducedMotion()
  const hub = { x: 260, y: 200 }
  const gst = { x: 460, y: 200 }
  const destX = 660
  const sourceX = 120
  const sourceYs = [40, 120, 200, 280, 360]
  const destYs = [130, 200, 270]

  const sourcePaths = sourceYs.map((y) => `M ${sourceX} ${y} L ${hub.x} ${hub.y}`)
  // Routed through the GST node so the "compliant record" step is visible
  // on the line itself, not just implied.
  const destPaths = destYs.map((y) => `M ${hub.x} ${hub.y} L ${gst.x} ${gst.y} L ${destX} ${y}`)

  return (
    <div className="relative mx-auto w-full max-w-lg" style={{ aspectRatio: '760 / 400' }}>
      <svg viewBox="0 0 760 400" className="absolute inset-0 h-full w-full" fill="none">
        {sourcePaths.map((d, i) => (
          <path key={`s${i}`} d={d} stroke="#2E3032" strokeWidth="1.5" strokeDasharray="4 4" />
        ))}
        {destPaths.map((d, i) => (
          <path key={`d${i}`} id={`trovar-dest-path-${i}`} d={d} stroke="#2E3032" strokeWidth="1.5" strokeDasharray="4 4" />
        ))}

        {!reduceMotion && (
          <>
            {sourcePaths.map((d, i) => (
              <circle key={`sdot${i}`} r="4" fill="#B6FF3B">
                <animateMotion dur="2.4s" begin={`${i * 0.4}s`} repeatCount="indefinite" path={d} />
                <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.08;0.92;1" dur="2.4s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
              </circle>
            ))}
            {destPaths.map((d, i) => (
              <circle key={`ddot${i}`} r="4" fill="#B6FF3B">
                <animateMotion dur="2.4s" begin={`${1.4 + i * 0.4}s`} repeatCount="indefinite" path={d} />
                <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.08;0.92;1" dur="2.4s" begin={`${1.4 + i * 0.4}s`} repeatCount="indefinite" />
              </circle>
            ))}
          </>
        )}
      </svg>

      {/* Source chips — icon-only below `sm` so the longest label (Google Ads)
          can't clip past the viewport edge on narrow phones */}
      {flowSources.map((s, i) => (
        <div
          key={s.name}
          className="absolute flex -translate-x-full -translate-y-1/2 items-center gap-1.5 rounded-lg border border-[#2E3032] bg-[#1F2122] p-1 sm:py-1 sm:pl-1.5 sm:pr-2.5"
          style={{ left: `${(sourceX / 760) * 100}%`, top: `${(sourceYs[i] / 400) * 100}%` }}
        >
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-white">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`https://icons.duckduckgo.com/ip3/${s.domain}.ico`} alt="" width={12} height={12} className="h-3 w-3" />
          </span>
          <span className="hidden text-[10px] whitespace-nowrap text-[#8A8D8F] sm:inline">{s.name}</span>
        </div>
      ))}

      {/* Hub */}
      <div
        className="absolute flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl bg-[#F5F5F7] shadow-lg"
        style={{ left: `${(hub.x / 760) * 100}%`, top: `${(hub.y / 400) * 100}%` }}
      >
        <TrovarMark size={28} dark />
      </div>

      {/* GST-compliant record waypoint, between the hub and the destination apps */}
      <div
        className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1"
        style={{ left: `${(gst.x / 760) * 100}%`, top: `${(gst.y / 400) * 100}%` }}
      >
        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#B6FF3B]/30 bg-[#B6FF3B]/10">
          <Shield className="h-5 w-5 text-[#B6FF3B]" />
        </div>
        <span className="whitespace-nowrap text-[9px] font-medium uppercase tracking-wide text-[#8A8D8F]">GST record</span>
      </div>

      {/* Destination chips — icon-only below `sm`, same reasoning as source chips */}
      {flowDestinations.map((d, i) => (
        <div
          key={d.name}
          className="absolute flex translate-x-0 -translate-y-1/2 items-center gap-1.5 rounded-lg border border-[#2E3032] bg-[#1F2122] p-1 sm:py-1 sm:pl-1.5 sm:pr-2.5"
          style={{ left: `${(destX / 760) * 100}%`, top: `${(destYs[i] / 400) * 100}%` }}
        >
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-white">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`https://icons.duckduckgo.com/ip3/${d.domain}.ico`} alt="" width={12} height={12} className="h-3 w-3" />
          </span>
          <span className="hidden text-[10px] whitespace-nowrap text-[#8A8D8F] sm:inline">{d.name}</span>
        </div>
      ))}
    </div>
  )
}

function HowItWorks() {
  return (
    <section id="how" className="py-20 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <FadeIn>
          <div className="mb-16 text-center">
            <p className="mb-3 text-xs tracking-widest text-[#4A4D4F] uppercase">How it works</p>
            <h2 className="text-3xl font-light text-[#F5F5F7] md:text-5xl">
              Expense automation<br />
              <span className="text-[#8A8D8F]">on autopilot.</span>
            </h2>
          </div>
        </FadeIn>

        <div className="grid items-center gap-12 md:grid-cols-2">
          <FadeIn>
            <div className="space-y-8">
              {steps.map((step, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#2E3032] bg-[#1F2122]">
                    <step.icon className="h-4 w-4 text-[#B6FF3B]" />
                  </div>
                  <div>
                    <h3 className="text-base font-medium text-[#F5F5F7]">{step.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-[#8A8D8F]">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <FlowDiagram />
          </FadeIn>
        </div>
      </div>
    </section>
  )
}

// ─── Features ────────────────────────────────────────────────────────────────
const features = [
  {
    icon: Zap,
    title: 'Never logs in as your client',
    description: 'No stored passwords, no bots driving a browser session. Works when Hubdoc doesn\'t, and your clients\' ad accounts are never at risk of being flagged for suspicious login activity.',
  },
  {
    icon: Mail,
    title: 'Email-in & manual capture',
    description: 'Every client gets a unique Trovar email address. Forward any supplier invoice and it files itself. Off-platform expense? Add it by hand in seconds.',
  },
  {
    icon: Shield,
    title: 'IRD-compliant records',
    description: 'Every invoice is structured as valid NZ taxable supply information, with GST calculated correctly, even on overseas merchants. Built for NZ, not adapted for it.',
  },
  {
    icon: BarChart3,
    title: 'Accountant dashboard',
    description: 'One view of every client\'s invoices: collected, pending, what needs attention.',
  },
  {
    icon: Users,
    title: 'Multi-client management',
    description: 'Run your whole book from one practice login. Each client\'s connections are isolated and secure.',
  },
  {
    icon: RefreshCw,
    title: 'Push to Xero',
    description: 'Coded invoices push straight into your client\'s Xero, with GST split.',
    soon: true,
  },
]

function Features() {
  return (
    <section id="why" className="border-t border-[#2E3032] py-20 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <FadeIn>
          <div className="mb-16 text-center">
            <p className="mb-3 text-xs tracking-widest text-[#4A4D4F] uppercase">Why Trovar</p>
            <h2 className="text-3xl font-light text-[#F5F5F7] md:text-5xl">
              Every client expense,<br />
              <span className="text-[#8A8D8F]">automated end to end.</span>
            </h2>
          </div>
        </FadeIn>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <FadeIn key={i} delay={i * 0.05}>
              <div className="group h-full rounded-2xl border border-[#2E3032] bg-[#1F2122] p-6 transition hover:border-[#3A3B3D] hover:bg-[#2A2B2C]">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#000D0F] border border-[#2E3032]">
                    <f.icon className="h-4 w-4 text-[#B6FF3B]" />
                  </div>
                  {f.soon && (
                    <span className="rounded-full border border-[#2E3032] bg-[#000D0F] px-2 py-0.5 text-[10px] text-[#8A8D8F]">
                      Coming soon
                    </span>
                  )}
                </div>
                <h3 className="mb-2 font-medium text-[#F5F5F7]">{f.title}</h3>
                <p className="text-sm leading-relaxed text-[#8A8D8F]">{f.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Pricing ──────────────────────────────────────────────────────────────────
function Pricing() {
  const tiers = [
    {
      name: 'First client',
      price: '$0',
      desc: 'Free, forever · no card needed',
      badge: 'Start here',
      features: [
        'Full access, no feature limits',
        'Connects to your client\'s paid subscriptions',
        'IRD-compliant taxable supply records',
        'Run it on a real client for as long as you like',
      ],
      cta: 'Get started',
      href: '/get-started',
      highlight: false,
    },
    {
      name: 'Practice',
      price: '$59',
      desc: 'Per client / month, after your first client',
      badge: 'Most popular',
      features: [
        'Connects to your clients\' paid subscriptions',
        'Meta & many more',
        'Email-in & manual invoice capture',
        'IRD-compliant taxable supply records',
        'Practice dashboard & one-click exports',
        'Priority support from the founders',
        'Xero integration (coming soon)',
      ],
      cta: 'Get started',
      href: '/get-started',
      highlight: true,
    },
    {
      name: 'Custom',
      price: 'Custom',
      desc: 'For large firms & networks',
      badge: null,
      features: [
        'Everything in Practice',
        'Volume pricing',
        'Dedicated account manager',
        'Custom integrations',
        'White-label option',
      ],
      cta: 'Talk to us',
      href: 'mailto:hello@trovar.co.nz',
      highlight: false,
    },
  ]

  return (
    <section id="pricing" className="border-t border-[#2E3032] py-20 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <FadeIn>
          <div className="mb-16 text-center">
            <p className="mb-3 text-xs tracking-widest text-[#4A4D4F] uppercase">Pricing</p>
            <h2 className="text-3xl font-light text-[#F5F5F7] md:text-5xl">
              Simple pricing.<br />
              <span className="text-[#8A8D8F]">Per client account.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-md text-[#8A8D8F]">
              One flat rate per client under management, and your first client is free, forever (no card needed). Most firms fold it straight into their bookkeeping fee.
            </p>
          </div>
        </FadeIn>

        <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-3">
          {tiers.map((tier, i) => (
            <FadeIn key={i} delay={i * 0.06}>
              <div
                className={cn(
                  'h-full rounded-2xl border p-8 transition',
                  tier.highlight ? 'border-[#B6FF3B]/40 bg-[#B6FF3B]/5' : 'border-[#2E3032] bg-[#1F2122]'
                )}
              >
                {tier.badge && (
                  <span
                    className={cn(
                      'mb-4 inline-block rounded-full border px-3 py-1 text-xs',
                      tier.highlight
                        ? 'border-[#B6FF3B]/30 bg-[#B6FF3B]/10 text-[#B6FF3B]'
                        : 'border-[#3DD68C]/30 bg-[#3DD68C]/10 text-[#3DD68C]'
                    )}
                  >
                    {tier.badge}
                  </span>
                )}
                <h3 className="text-sm font-medium text-[#C9CCCE]">{tier.name}</h3>
                <div className="mt-2 flex items-end gap-1">
                  <span className="text-4xl font-light text-[#F5F5F7]">{tier.price}</span>
                  {tier.price !== 'Custom' && <span className="mb-1 text-sm text-[#8A8D8F]">NZD</span>}
                </div>
                <p className="mt-1 text-xs text-[#8A8D8F]">{tier.desc}</p>
                <ul className="mt-6 space-y-3">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-[#C9CCCE]">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#22C55E]" />
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href={tier.href}
                  className={cn(
                    'mt-8 block rounded-xl px-4 py-2.5 text-center text-sm font-medium transition',
                    tier.highlight
                      ? 'bg-[#B6FF3B] text-[#04181C] hover:bg-[#C9FF6B]'
                      : 'border border-[#2E3032] text-[#E6E6E8] hover:border-[#3A3B3D] hover:bg-[#2A2B2C]'
                  )}
                >
                  {tier.cta}
                </a>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── vs Hubdoc callout ────────────────────────────────────────────────────────
function VsHubdoc() {
  return (
    <section className="border-t border-[#2E3032] py-20 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <FadeIn>
          <div className="rounded-2xl border border-[#2E3032] bg-[#1F2122] p-8 md:p-12">
            <p className="mb-4 text-xs tracking-widest text-[#4A4D4F] uppercase">Why not Hubdoc or Dext?</p>
            <h2 className="text-2xl font-light text-[#F5F5F7] md:text-4xl">
              &ldquo;Hubdoc did a beautiful job.<br />
              <span className="text-[#8A8D8F]">Then 2FA killed it.&rdquo;</span>
            </h2>
            <p className="mt-4 max-w-xl text-[#8A8D8F]">
              A Xero Platinum Partner, 2024. Hubdoc stores your passwords and logs in as you, which breaks every time a platform adds 2FA. Meta, Google and Adobe all have. Hubdoc is increasingly unreliable for exactly the platforms your clients spend the most on.
            </p>
            <p className="mt-3 max-w-xl text-[#8A8D8F]">
              <span className="text-[#E6E6E8]">And vs Dext?</span> Dext waits for documents to arrive, or logs into your client&apos;s ad accounts to fetch them, the same risky trick as Hubdoc. Trovar never logs in on your behalf, and every ad-platform charge comes straight from the client&apos;s own export, matched to the bank line.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-[#2E3032] bg-[#000D0F] p-5">
                <p className="mb-3 text-sm font-medium text-[#F5F5F7]">Hubdoc</p>
                {['Credential scraping that breaks on 2FA', 'Nearly 2,000 outages recorded', 'No NZ IRD compliance layer', 'Free but increasingly broken'].map((item) => (
                  <div key={item} className="flex items-center gap-2 py-1.5 text-sm text-[#8A8D8F]">
                    <X className="h-3.5 w-3.5 text-red-500/70" />
                    {item}
                  </div>
                ))}
              </div>
              <div className="rounded-xl border border-[#22C55E]/20 bg-[#22C55E]/5 p-5">
                <p className="mb-3 text-sm font-medium text-[#F5F5F7]">Trovar</p>
                {['OAuth API, immune to 2FA', 'Reads invoices forwarded by email too', 'NZ GST & IRD records built in', 'Gets stronger as 2FA spreads'].map((item) => (
                  <div key={item} className="flex items-center gap-2 py-1.5 text-sm text-[#8A8D8F]">
                    <span className="h-3.5 w-3.5 rounded-full bg-[#22C55E]/60 flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────
const faqs = [
  {
    q: 'How is Trovar different from Hubdoc?',
    a: 'Hubdoc stores your client\'s passwords and logs in as them, which breaks when platforms add 2FA. Trovar uses proper OAuth API connections, accessing billing data directly. It never stores passwords and won\'t break when Meta updates their security. Trovar also goes a step further than Hubdoc ever did: it checks every collected invoice against your client\'s bank feed, so you know it\'s reconciled, not just filed.',
  },
  {
    q: 'How is Trovar different from Dext?',
    a: 'Dext (and Receipt Bank before it) mostly waits for documents to arrive, and for platforms it does chase, it logs into the account for you, the same credential-scraping trick that breaks Hubdoc. Trovar never logs in on a client\'s behalf. Suppliers that email invoices file themselves; ad platforms take a 60-second monthly step using the client\'s own export, never a shared login. Dext is a smart inbox; Trovar closes the loop without the risk, and matches everything collected against the bank feed automatically, something Dext doesn\'t do.',
  },
  {
    q: 'How is Trovar different from Tailride?',
    a: 'For Meta Ads, Tailride uses a browser extension that has to ride your client\'s live, logged-in session, so someone still has to open the account and click through it every time. Trovar pulls Meta\'s billing charges directly via API. Once your practice is connected, you pull a client\'s charges yourself, whenever suits you, without ever asking them to log into anything. The task stays with you, not your client, which means one less thing for them to forget and one less chance of the wrong file being sent. Tailride is also a general tool priced per invoice, for any business. Trovar is built specifically for NZ & AU accounting practices: GST and IRD taxable-supply rules are handled correctly by default, pricing is per client so it folds straight into your bookkeeping fee, and the whole workflow is designed to run an entire practice\'s book, not one company\'s inbox, including checking every invoice against the client\'s bank feed to prove it\'s reconciled.',
  },
  {
    q: 'How is Trovar different from Vic.ai?',
    a: 'Vic.ai is AI-powered invoice processing built for larger finance teams that already have documents flowing into an AP or procurement system, and it\'s priced for that scale. Trovar solves the step before that: it\'s built for NZ & AU accounting practices managing many small-to-mid client businesses, and it collects the invoices in the first place, without ever logging in on a client\'s behalf, then matches every charge to the bank feed automatically. Vic.ai automates processing once documents already exist in your system; Trovar automates getting them there, and proves they reconcile.',
  },
  {
    q: 'How is Trovar different from Ramp?',
    a: 'Ramp is a corporate card and spend-management platform, most useful once a business runs its spending through Ramp\'s own card. Trovar works regardless of which bank or card your client already uses, Airwallex, ASB, ANZ or anything else, and is focused on the accountant\'s problem specifically: collecting every supplier invoice and proving it reconciles against the bank feed, without asking your client to switch banking providers.',
  },
  {
    q: 'Why did you build Trovar?',
    a: 'We kept watching accountants lose real time every month to the same manual grind: chasing clients for missing receipts, then matching each one against the bank statement line by line. Clients don\'t enjoy the chase any more than accountants enjoy doing it, it\'s necessary work, but it doesn\'t scale and it isn\'t what anyone trained to do. As a rough, back-of-envelope estimate: New Zealand has tens of thousands of businesses that rely on an external accountant or bookkeeper. If each one costs just 2-3 hours of manual reconciliation admin a month at typical bookkeeping rates, that alone adds up to well over $100 million a year of billable time nationally spent on paperwork instead of advice (not to mention the client\'s own time wasted digging through folders and inboxes for receipts). Trovar exists to take that admin off the desk entirely: collect it, match it, prove it\'s reconciled, automatically, so accountants can spend that time on the work that actually grows their clients\' businesses.',
  },
  {
    q: 'What does the "reconciled %" on my dashboard mean?',
    a: 'Trovar connects to your client\'s Airwallex card feed and checks every charge against the invoices you\'ve already collected. Instead of a spreadsheet of red dots, or chasing your accountant to confirm what\'s missing, you see a live percentage per client, and exactly which transactions still need a receipt. It\'s the difference between collecting invoices and proving they actually match what was spent, and it\'s not something Hubdoc, Dext or Tailride do.',
  },
  {
    q: 'Which platforms does Trovar connect to?',
    a: 'Where it\'s not practical for you to log in and grab the receipt yourself, Trovar connects directly to your clients\' paid subscriptions, the likes of Meta Ads, Google Ads, Adobe, Shopify, Microsoft 365, AWS, Slack, Stripe and more, with new connections added regularly. Suppliers that email invoices are captured automatically; ad platforms take a short monthly step; and for anything off-platform, you can forward an invoice by email or add it manually, so nothing slips through.',
  },
  {
    q: 'Can I forward invoices by email?',
    a: 'Yes. Every client gets a unique Trovar email address. Forward any supplier invoice (or have a supplier send straight to it) and Trovar reads it and files it automatically. You can also add invoices by hand for anything off-platform.',
  },
  {
    q: 'Does it work with Xero?',
    a: 'Direct push to Xero, correctly coded with GST split, is coming soon. Today, every invoice is captured, GST-calculated and exportable into your workflow.',
  },
  {
    q: 'Is the data IRD compliant?',
    a: 'Yes. Every record Trovar generates contains the fields IRD requires as taxable supply information: supplier, date, amount, GST component and description. Both domestic and overseas merchant GST is handled correctly.',
  },
  {
    q: 'How does pricing work for accounting firms?',
    a: 'It\'s $59 NZD per client account per month, and your first client is free, forever, with no card required. Add more clients for $59 each whenever you\'re ready; remove one and it drops off. Most firms fold this into their bookkeeping fee and make a healthy margin.',
  },
  {
    q: 'Do I need a card to start?',
    a: 'No card needed to start. Your first client is free forever, so you can run Trovar on a real client at no cost for as long as you like. Add more for $59/month each whenever you\'re ready.',
  },
]

function FAQ() {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <section id="faq" className="border-t border-[#2E3032] py-20 md:py-32">
      <div className="mx-auto max-w-3xl px-6">
        <FadeIn>
          <div className="mb-12 text-center">
            <p className="mb-3 text-xs tracking-widest text-[#4A4D4F] uppercase">FAQ</p>
            <h2 className="text-3xl font-light text-[#F5F5F7] md:text-5xl">Common questions</h2>
          </div>
        </FadeIn>
        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <FadeIn key={i} delay={i * 0.03}>
              <div className="rounded-xl border border-[#2E3032] bg-[#1F2122] overflow-hidden">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="flex w-full items-center justify-between px-6 py-4 text-left"
                >
                  <span className="font-medium text-[#E6E6E8]">{faq.q}</span>
                  <ChevronDown
                    className={cn('h-4 w-4 text-[#4A4D4F] transition-transform duration-200 flex-shrink-0 ml-4', open === i && 'rotate-180')}
                  />
                </button>
                <div
                  className="grid transition-[grid-template-rows] duration-300 ease-in-out"
                  style={{ gridTemplateRows: open === i ? '1fr' : '0fr' }}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-5 text-sm leading-relaxed text-[#8A8D8F]">{faq.a}</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Founders note ────────────────────────────────────────────────────────────
function FoundersNote() {
  return (
    <section className="border-t border-[#2E3032] py-20 md:py-28">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <FadeIn>
          <h2 className="text-2xl font-light leading-snug text-[#F5F5F7] md:text-3xl">
            You&apos;re supported by NZ based founders, not a call centre overseas.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[#8A8D8F]">
            Trovar is built by NZ-based technical founders who genuinely care about your
            practice&apos;s success. When you need a hand, you talk to the people who build the
            product, and we&apos;ll make sure you&apos;re set up to win.
          </p>
        </FadeIn>
      </div>
    </section>
  )
}

// ─── Waitlist CTA ─────────────────────────────────────────────────────────────
function WaitlistCTA() {
  return (
    <section id="waitlist" className="border-t border-[#2E3032] py-20 md:py-32">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <FadeIn>
          <div className="mb-2 flex justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F5F5F7]">
              <TrovarMark size={28} dark />
            </div>
          </div>
          <h2 className="mt-6 text-3xl font-light text-[#F5F5F7] md:text-5xl">
            Ready to automate<br />
            <span className="text-[#8A8D8F]">your clients&apos; expense admin?</span>
          </h2>
          <p className="mx-auto mt-4 max-w-md text-[#8A8D8F]">
            Join NZ accounting firms automating their expense admin. Your first client is free, forever.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="/get-started"
              className="flex items-center gap-1.5 rounded-xl bg-[#B6FF3B] px-6 py-3 text-sm font-medium text-[#04181C] transition hover:bg-[#C9FF6B]"
            >
              Get started <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="mailto:hello@trovar.co.nz"
              className="rounded-xl border border-[#2E3032] px-6 py-3 text-sm text-[#E6E6E8] transition hover:bg-[#1F2122]"
            >
              Contact us
            </a>
          </div>
          <p className="mt-3 text-xs text-[#4A4D4F]">trovar.co.nz · NZ &amp; AU only</p>
        </FadeIn>
      </div>
    </section>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="border-t border-[#2E3032] py-12">
      <div className="mx-auto max-w-5xl px-6">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <a href="/" className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#F5F5F7]">
                <TrovarMark size={18} dark />
              </div>
              <TrovarWordmark className="h-5 w-auto" />
            </a>
            <p className="mt-4 text-xs leading-relaxed text-[#4A4D4F]">The expense automation platform for modern accountants.</p>
          </div>

          <div className="flex items-center gap-6 text-sm text-[#4A4D4F]">
            <a href="mailto:hello@trovar.co.nz" className="flex items-center gap-1.5 transition hover:text-[#8A8D8F]">
              <Mail className="h-3.5 w-3.5" />
              hello@trovar.co.nz
            </a>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-4 border-t border-[#2E3032] pt-8 md:flex-row md:items-center">
          <p className="text-xs text-[#4A4D4F]">
            © {new Date().getFullYear()} Trovar. Built in New Zealand.
          </p>
          <div className="flex gap-6 text-xs text-[#4A4D4F]">
            <a href="/privacy" className="transition hover:text-[#8A8D8F]">Privacy</a>
            <a href="mailto:hello@trovar.co.nz" className="transition hover:text-[#8A8D8F]">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function TrovarLanding() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: brand.bg, color: brand.textPrimary }}>
      <Header />
      <main>
        <Hero />
        <ClosedLoop />
        <PlatformStrip />
        <HowItWorks />
        <Features />
        <Pricing />
        <VsHubdoc />
        <FAQ />
        <FoundersNote />
        <WaitlistCTA />
      </main>
      <Footer />
    </div>
  )
}
