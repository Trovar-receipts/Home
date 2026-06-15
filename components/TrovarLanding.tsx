'use client'

import React, { useState, useEffect } from 'react'
import { motion, useReducedMotion, Variants } from 'framer-motion'
import { ArrowRight, Menu, X, ChevronDown, Zap, Shield, RefreshCw, BarChart3, Users, FileCheck, Mail } from 'lucide-react'
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
  accent: '#7DD3FC',
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
    className={cn('h-7 w-auto', className)}
  />
)

// ─── Animation Helpers ───────────────────────────────────────────────────────
const transitionVariants: { container: Variants; item: Variants } = {
  container: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  },
  item: {
    hidden: { opacity: 0, filter: 'blur(8px)', y: 16 },
    visible: { opacity: 1, filter: 'blur(0px)', y: 0, transition: { type: 'spring', bounce: 0.25, duration: 1.2 } },
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

function FadeIn({ children, className, delay = 0.1 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const reduce = useReducedMotion()
  if (reduce) return <div className={className}>{children}</div>
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.7 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ─── Header ──────────────────────────────────────────────────────────────────
const navItems = [
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
      <nav className="mx-auto mt-3 max-w-6xl px-4">
        <div
          className={cn(
            'flex items-center justify-between rounded-2xl px-5 py-3 transition-all duration-300',
            scrolled
              ? 'border border-[#2E3032] bg-[#000D0F]/90 backdrop-blur-xl shadow-2xl'
              : 'bg-transparent'
          )}
        >
          {/* Logo */}
          <a href="/" className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F5F5F7]">
              <TrovarMark size={22} dark />
            </div>
            <TrovarWordmark />
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
              className="rounded-lg bg-[#7DD3FC] px-4 py-2 text-sm font-medium text-[#04181C] transition hover:bg-[#9ADEFC]"
            >
              Get started
            </a>
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setOpen(!open)} className="lg:hidden">
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
              <a href="/get-started" className="rounded-lg bg-[#7DD3FC] px-4 py-2.5 text-center text-sm font-medium text-[#04181C]">
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
      <div className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-[#7DD3FC]/5 blur-3xl" />

      <div className="relative mx-auto max-w-5xl px-6 text-center">
        <AnimatedGroup>
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-[#2E3032] bg-[#1F2122] px-4 py-1.5 text-xs text-[#8A8D8F]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#22C55E]" />
            Now in early access for NZ & AU accounting firms
            <ArrowRight className="h-3 w-3" />
          </div>

          {/* Headline */}
          <h1 className="mt-8 text-5xl font-light leading-[1.1] tracking-tight text-[#F5F5F7] md:text-7xl">
            Every receipt.<br />
            <span className="text-[#8A8D8F]">Every subscription.</span><br />
            Every time.
          </h1>

          {/* Sub */}
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-[#8A8D8F]">
            Trovar connects directly to Meta, Google, Adobe and Shopify — pulling invoices automatically into Xero. No portals. No chasing. No 2FA headaches.
          </p>

          {/* CTA */}
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="/get-started"
              className="flex items-center gap-1.5 rounded-xl bg-[#7DD3FC] px-6 py-3 text-sm font-medium text-[#04181C] transition hover:bg-[#9ADEFC]"
            >
              Get started <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#how"
              className="rounded-xl border border-[#2E3032] px-6 py-3 text-sm text-[#E6E6E8] transition hover:bg-[#1F2122]"
            >
              See how it works
            </a>
          </div>
          <p className="mt-3 text-xs text-[#4A4D4F]">Free during beta · No credit card required · NZ & AU only</p>
        </AnimatedGroup>

        {/* Dashboard screenshot mockup */}
        <FadeIn delay={0.5} className="mt-16">
          <div className="relative mx-auto max-w-4xl">
            <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-[#7DD3FC]/20 to-transparent" />
            <div className="relative overflow-hidden rounded-2xl border border-[#2E3032] bg-[#1F2122] shadow-2xl">
              {/* Mock dashboard header */}
              <div className="flex items-center gap-2 border-b border-[#2E3032] px-5 py-3">
                <div className="h-3 w-3 rounded-full bg-[#FF5F57]" />
                <div className="h-3 w-3 rounded-full bg-[#FFBD2E]" />
                <div className="h-3 w-3 rounded-full bg-[#27C840]" />
                <div className="ml-4 flex items-center gap-2">
                  <div className="h-4 w-4 rounded bg-[#F5F5F7] flex items-center justify-center">
                    <TrovarMark size={12} dark />
                  </div>
                  <span className="text-xs text-[#4A4D4F]">trovar.app — Carter Accounting</span>
                </div>
              </div>

              {/* Mock dashboard body */}
              <div className="grid grid-cols-4 gap-4 p-5">
                {/* Stat cards */}
                {[
                  { label: 'Total collected', value: '$24,530', change: '+12.4%', up: true },
                  { label: 'Receipts', value: '128', change: '+8.2%', up: true },
                  { label: 'Auto-matched', value: '94%', change: '+3.1%', up: true },
                  { label: 'Pending', value: '7', change: '-2', up: false },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-xl border border-[#2E3032] bg-[#000D0F] p-4">
                    <p className="text-xs text-[#4A4D4F]">{stat.label}</p>
                    <p className="mt-1 text-2xl font-light text-[#F5F5F7]">{stat.value}</p>
                    <p className={cn('mt-1 text-xs', stat.up ? 'text-[#22C55E]' : 'text-[#8A8D8F]')}>{stat.change}</p>
                  </div>
                ))}
              </div>

              {/* Recent receipts table */}
              <div className="px-5 pb-5">
                <div className="rounded-xl border border-[#2E3032] overflow-hidden">
                  <div className="grid grid-cols-4 border-b border-[#2E3032] px-4 py-2 text-xs text-[#4A4D4F]">
                    <span>Merchant</span>
                    <span>Category</span>
                    <span>Amount</span>
                    <span>Status</span>
                  </div>
                  {[
                    { merchant: 'Meta Ads', category: 'Advertising', amount: '$1,250.00', status: 'Auto-matched', color: '#22C55E' },
                    { merchant: 'Google Ads', category: 'Advertising', amount: '$980.50', status: 'Auto-matched', color: '#22C55E' },
                    { merchant: 'Adobe Creative', category: 'Software', amount: '$52.99', status: 'Auto-matched', color: '#22C55E' },
                    { merchant: 'Shopify', category: 'Ecommerce', amount: '$29.00', status: 'Auto-matched', color: '#22C55E' },
                    { merchant: 'Wave Images', category: 'Creative', amount: '$199.00', status: 'Needs review', color: '#7DD3FC' },
                  ].map((row, i) => (
                    <div key={i} className="grid grid-cols-4 border-b border-[#2E3032]/50 px-4 py-3 text-sm last:border-0">
                      <span className="text-[#E6E6E8]">{row.merchant}</span>
                      <span className="text-[#8A8D8F]">{row.category}</span>
                      <span className="text-[#E6E6E8]">{row.amount}</span>
                      <span className="flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: row.color }} />
                        <span className="text-xs" style={{ color: row.color }}>{row.status}</span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

// ─── Platform logos strip ────────────────────────────────────────────────────
const platforms = ['Meta Ads', 'Google Ads', 'Adobe', 'Shopify', 'Microsoft', 'AWS', 'Slack', 'Xero']

function PlatformStrip() {
  return (
    <section className="border-y border-[#2E3032] py-10">
      <div className="mx-auto max-w-5xl px-6">
        <FadeIn>
          <p className="mb-8 text-center text-xs tracking-widest text-[#4A4D4F] uppercase">
            Automatically collects from
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {platforms.map((p) => (
              <span key={p} className="text-sm font-medium text-[#3A3B3D] transition hover:text-[#8A8D8F]">
                {p}
              </span>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

// ─── How it works ────────────────────────────────────────────────────────────
const steps = [
  {
    number: '01',
    title: 'Connect once',
    description: 'Your accountant connects your Meta, Google, Adobe and Shopify accounts via OAuth — no passwords stored, no 2FA issues.',
  },
  {
    number: '02',
    title: 'Trovar fetches everything',
    description: 'On demand or scheduled, Trovar pulls every invoice directly from the source. PDFs, amounts, dates — all captured automatically.',
  },
  {
    number: '03',
    title: 'Xero updated instantly',
    description: 'Every invoice is matched, GST calculated, and pushed to your Xero account correctly coded. Audit-ready from day one.',
  },
]

function HowItWorks() {
  return (
    <section id="how" className="py-20 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <FadeIn>
          <div className="mb-16 text-center">
            <p className="mb-3 text-xs tracking-widest text-[#4A4D4F] uppercase">How it works</p>
            <h2 className="text-3xl font-light text-[#F5F5F7] md:text-5xl">
              Three steps.<br />
              <span className="text-[#8A8D8F]">Zero touch.</span>
            </h2>
          </div>
        </FadeIn>

        <div className="grid gap-px md:grid-cols-3">
          {steps.map((step, i) => (
            <FadeIn key={i} delay={0.1 + i * 0.15}>
              <div className="relative border border-[#2E3032] bg-[#000D0F] p-8 first:rounded-l-2xl last:rounded-r-2xl md:first:rounded-l-2xl md:last:rounded-r-2xl">
                <span className="text-5xl font-light text-[#2E3032]">{step.number}</span>
                <h3 className="mt-4 text-lg font-medium text-[#F5F5F7]">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#8A8D8F]">{step.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Features ────────────────────────────────────────────────────────────────
const features = [
  {
    icon: Zap,
    title: 'API-first, not scraping',
    description: 'Direct billing API connections — not credential scraping. Works when Hubdoc doesn\'t. 2FA will never break Trovar.',
  },
  {
    icon: Shield,
    title: 'IRD compliant records',
    description: 'Every invoice is structured as a valid NZ taxable supply information record. GST calculated correctly including overseas merchants.',
  },
  {
    icon: RefreshCw,
    title: 'Auto-push to Xero',
    description: 'Matched invoices push directly to your client\'s Xero account — correctly coded, GST split, ready for reconciliation.',
  },
  {
    icon: BarChart3,
    title: 'Accountant dashboard',
    description: 'One view of all your clients\' invoices. See what\'s been collected, what\'s pending, what needs attention. No more inbox chaos.',
  },
  {
    icon: Users,
    title: 'Multi-client management',
    description: 'Manage unlimited clients from one practice login. Each client\'s connections are isolated and secure.',
  },
  {
    icon: FileCheck,
    title: 'Audit-ready exports',
    description: 'IRD audit? One click exports every record for any client, any period. Structured, compliant, complete.',
  },
]

function Features() {
  return (
    <section id="integrations" className="border-t border-[#2E3032] py-20 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <FadeIn>
          <div className="mb-16 text-center">
            <p className="mb-3 text-xs tracking-widest text-[#4A4D4F] uppercase">Why Trovar</p>
            <h2 className="text-3xl font-light text-[#F5F5F7] md:text-5xl">
              Built for the platforms<br />
              <span className="text-[#8A8D8F]">that actually matter.</span>
            </h2>
          </div>
        </FadeIn>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <FadeIn key={i} delay={0.05 + i * 0.08}>
              <div className="group rounded-2xl border border-[#2E3032] bg-[#1F2122] p-6 transition hover:border-[#3A3B3D] hover:bg-[#2A2B2C]">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#000D0F] border border-[#2E3032]">
                  <f.icon className="h-4 w-4 text-[#7DD3FC]" />
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
              One flat rate per client account under management. The more clients, the more you save.
            </p>
          </div>
        </FadeIn>

        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              name: 'Starter',
              price: '$29',
              desc: 'Per client / month',
              features: ['Up to 10 clients', 'Meta, Google, Adobe, Shopify', 'Xero push', 'IRD compliant records', 'Email support'],
              cta: 'Get started',
              highlight: false,
            },
            {
              name: 'Practice',
              price: '$22',
              desc: 'Per client / month',
              features: ['10–50 clients', 'Everything in Starter', 'Priority support', 'Bulk client onboarding', 'Practice dashboard'],
              cta: 'Get started',
              highlight: true,
            },
            {
              name: 'Enterprise',
              price: 'Custom',
              desc: 'For large firms',
              features: ['50+ clients', 'Everything in Practice', 'Dedicated account manager', 'Custom integrations', 'White-label option'],
              cta: 'Talk to us',
              highlight: false,
            },
          ].map((tier, i) => (
            <FadeIn key={i} delay={0.1 + i * 0.1}>
              <div
                className={cn(
                  'rounded-2xl border p-8 transition',
                  tier.highlight
                    ? 'border-[#7DD3FC]/40 bg-[#7DD3FC]/5'
                    : 'border-[#2E3032] bg-[#1F2122]'
                )}
              >
                {tier.highlight && (
                  <span className="mb-4 inline-block rounded-full border border-[#7DD3FC]/30 bg-[#7DD3FC]/10 px-3 py-1 text-xs text-[#7DD3FC]">
                    Most popular
                  </span>
                )}
                <h3 className="text-sm font-medium text-[#8A8D8F]">{tier.name}</h3>
                <div className="mt-2 flex items-end gap-1">
                  <span className="text-4xl font-light text-[#F5F5F7]">{tier.price}</span>
                  {tier.price !== 'Custom' && <span className="mb-1 text-sm text-[#4A4D4F]">NZD</span>}
                </div>
                <p className="mt-1 text-xs text-[#4A4D4F]">{tier.desc}</p>
                <ul className="mt-6 space-y-3">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-[#8A8D8F]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#22C55E]" />
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="/get-started"
                  className={cn(
                    'mt-8 block rounded-xl px-4 py-2.5 text-center text-sm font-medium transition',
                    tier.highlight
                      ? 'bg-[#7DD3FC] text-[#04181C] hover:bg-[#9ADEFC]'
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
            <p className="mb-4 text-xs tracking-widest text-[#4A4D4F] uppercase">Why not Hubdoc?</p>
            <h2 className="text-2xl font-light text-[#F5F5F7] md:text-4xl">
              "Hubdoc did a beautiful job.<br />
              <span className="text-[#8A8D8F]">Then 2FA killed it."</span>
            </h2>
            <p className="mt-4 max-w-xl text-[#8A8D8F]">
              A Xero Platinum Partner, 2024. Hubdoc stores your passwords and logs in as you — which breaks every time a platform adds 2FA. Meta, Google, Adobe have all added it. Hubdoc is increasingly unreliable for exactly the platforms your clients spend the most on.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-[#2E3032] bg-[#000D0F] p-5">
                <p className="mb-3 text-sm font-medium text-[#F5F5F7]">Hubdoc</p>
                {['Credential scraping — breaks on 2FA', 'Nearly 2,000 outages recorded', 'No NZ IRD compliance layer', 'Free but increasingly broken'].map((item) => (
                  <div key={item} className="flex items-center gap-2 py-1.5 text-sm text-[#8A8D8F]">
                    <X className="h-3.5 w-3.5 text-red-500/70" />
                    {item}
                  </div>
                ))}
              </div>
              <div className="rounded-xl border border-[#22C55E]/20 bg-[#22C55E]/5 p-5">
                <p className="mb-3 text-sm font-medium text-[#F5F5F7]">Trovar</p>
                {['OAuth API — immune to 2FA', 'Direct billing API connections', 'NZ GST & IRD records built in', 'Gets stronger as 2FA spreads'].map((item) => (
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
    a: 'Hubdoc stores your client\'s passwords and logs in as them — which breaks when platforms add 2FA. Trovar uses proper OAuth API connections, accessing billing data directly. It never stores passwords and won\'t break when Meta or Google updates their security.',
  },
  {
    q: 'Which platforms does Trovar connect to?',
    a: 'Meta Ads, Google Ads, Adobe Creative Cloud, Shopify, Microsoft 365, AWS, Slack, and more. We\'re adding new platform connections regularly. If your clients use a platform not on the list, let us know.',
  },
  {
    q: 'Does it work with Xero?',
    a: 'Yes — Xero is the primary accounting output. Every collected invoice is pushed directly to the client\'s Xero account, correctly coded and with GST calculated. We\'re also a Xero App Partner.',
  },
  {
    q: 'Is the data IRD compliant?',
    a: 'Yes. Every record Trovar generates contains the fields required by IRD as taxable supply information — supplier, date, amount, GST component, and description. Both domestic and overseas merchant GST is handled correctly.',
  },
  {
    q: 'How does pricing work for accounting firms?',
    a: 'You pay per client account under management — $29 NZD/month at Starter, $22 at Practice (10+ clients). You can pass this cost to clients as part of your bookkeeping fee — most firms charge $50-100/month and make a healthy margin.',
  },
  {
    q: 'Is there a free trial?',
    a: 'We\'re currently in early access for NZ and AU accounting firms. Request access above and we\'ll onboard you free for the first 30 days.',
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
            <FadeIn key={i} delay={0.05 * i}>
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
                <div className={cn('overflow-hidden transition-all duration-300', open === i ? 'max-h-60' : 'max-h-0')}>
                  <p className="px-6 pb-5 text-sm leading-relaxed text-[#8A8D8F]">{faq.a}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
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
            Ready to stop chasing<br />
            <span className="text-[#8A8D8F]">invoices?</span>
          </h2>
          <p className="mx-auto mt-4 max-w-md text-[#8A8D8F]">
            Join NZ accounting firms who are getting early access. Free for 30 days. No credit card.
          </p>
          <div className="mt-8 flex justify-center">
            <a
              href="/get-started"
              className="flex items-center gap-1.5 rounded-xl bg-[#7DD3FC] px-6 py-3 text-sm font-medium text-[#04181C] transition hover:bg-[#9ADEFC]"
            >
              Get started <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <p className="mt-3 text-xs text-[#4A4D4F]">trovar.co.nz · NZ & AU only · Early access 2026</p>
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
            <a href="/" className="flex items-center gap-3">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#F5F5F7]">
                <TrovarMark size={18} dark />
              </div>
              <TrovarWordmark />
            </a>
            <p className="mt-2 text-xs text-[#4A4D4F]">Smart receipt collection for modern accountants.</p>
          </div>

          <div className="flex items-center gap-6 text-sm text-[#4A4D4F]">
            <a href="mailto:matt@trovar.co.nz" className="flex items-center gap-1.5 transition hover:text-[#8A8D8F]">
              <Mail className="h-3.5 w-3.5" />
              matt@trovar.co.nz
            </a>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-4 border-t border-[#2E3032] pt-8 md:flex-row md:items-center">
          <p className="text-xs text-[#4A4D4F]">
            © {new Date().getFullYear()} Trovar. Built in New Zealand.
          </p>
          <div className="flex gap-6 text-xs text-[#4A4D4F]">
            <a href="#" className="transition hover:text-[#8A8D8F]">Privacy</a>
            <a href="#" className="transition hover:text-[#8A8D8F]">Terms</a>
            <a href="#" className="transition hover:text-[#8A8D8F]">Security</a>
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
        <PlatformStrip />
        <HowItWorks />
        <Features />
        <Pricing />
        <VsHubdoc />
        <FAQ />
        <WaitlistCTA />
      </main>
      <Footer />
    </div>
  )
}
