import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Inter({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = JetBrains_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Trovar: Expense Automation for Accounting Firms',
  description:
    'Trovar automates the collecting, matching and reconciling of every client expense, so you can stop chasing invoices and start trusting the numbers. It builds IRD-compliant GST records as it goes, saving you hours and sparing your clients the chase for receipts.',
  keywords: [
    'expense automation platform',
    'expense automation for accountants',
    'operating system for business expenses',
    'Hubdoc alternative',
    'Dext alternative',
    'Tailride alternative',
    'Vic.ai alternative',
    'Ramp alternative',
    'Receipt Bank alternative',
    'invoice automation for accountants',
    'expense reconciliation software NZ',
    'accounting software NZ',
    'Xero invoice automation',
    'Meta ads invoices',
    'Google ads receipts',
    'IRD compliant records',
    'GST records New Zealand',
    'accounting firm software NZ AU',
    'bookkeeping automation',
    'supplier invoice capture',
  ],
  authors: [{ name: 'Trovar', url: 'https://trovar.co.nz' }],
  creator: 'Trovar',
  publisher: 'Trovar',
  metadataBase: new URL('https://trovar.co.nz'),
  alternates: {
    canonical: 'https://trovar.co.nz',
  },
  openGraph: {
    type: 'website',
    locale: 'en_NZ',
    url: 'https://trovar.co.nz',
    title: 'Trovar: Expense Automation Platform for Modern Accountants',
    description:
      'Automates collecting, matching and reconciling every client expense, from Meta, Google, Adobe, Shopify and more. Built for NZ and AU accounting firms who want to deliver a better experience for their clients.',
    siteName: 'Trovar',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Trovar: Expense Automation Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Trovar: Expense Automation Platform for Modern Accountants',
    description:
      'Automates collecting, matching and reconciling every client expense, from Meta, Google, Adobe, Shopify and more. IRD compliant records pushed to Xero.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en-NZ">
      <head>
        {/* Schema.org structured data: graph of Organization, SoftwareApplication & FAQ.
            The FAQPage is what AI assistants (ChatGPT, Perplexity, Gemini) and Google
            surface directly, so the answers double as our AI-search positioning. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'Organization',
                  '@id': 'https://trovar.co.nz/#organization',
                  name: 'Trovar',
                  url: 'https://trovar.co.nz',
                  logo: 'https://trovar.co.nz/logo-mark.svg',
                  email: 'hello@trovar.co.nz',
                  areaServed: ['New Zealand', 'Australia'],
                  description:
                    'The expense automation platform for accounting firms in New Zealand and Australia: it automates collecting, matching and reconciling every client expense.',
                },
                {
                  '@type': 'SoftwareApplication',
                  '@id': 'https://trovar.co.nz/#software',
                  name: 'Trovar',
                  description:
                    'Trovar is the operating system for business expenses: it automatically collects every supplier invoice without logging in on a client\'s behalf, matches every charge against the bank feed, and proves it reconciles. An alternative to Hubdoc, Dext, Tailride, Vic.ai and Ramp, with IRD-compliant GST records for NZ & AU accountants.',
                  url: 'https://trovar.co.nz',
                  applicationCategory: 'BusinessApplication',
                  operatingSystem: 'Web',
                  publisher: { '@id': 'https://trovar.co.nz/#organization' },
                  offers: {
                    '@type': 'Offer',
                    price: '59',
                    priceCurrency: 'NZD',
                    description: 'First client free forever, then $59 NZD per client per month.',
                    priceSpecification: {
                      '@type': 'UnitPriceSpecification',
                      price: '59',
                      priceCurrency: 'NZD',
                      unitText: 'per client per month',
                    },
                  },
                  audience: {
                    '@type': 'Audience',
                    audienceType: 'Accounting firms in New Zealand and Australia',
                  },
                  featureList: [
                    'Automatic invoice capture for suppliers that email invoices',
                    'Monthly one-click collection for Meta and Google Ads charges',
                    'Email-in capture: forward any supplier invoice',
                    'Manual invoice entry for off-platform expenses',
                    'IRD-compliant taxable supply records with GST calculated',
                    'Practice dashboard and one-click exports',
                    'Multi-client management for accounting firms',
                    'Xero integration (coming soon)',
                  ],
                  areaServed: ['New Zealand', 'Australia'],
                  inLanguage: 'en-NZ',
                },
                {
                  '@type': 'FAQPage',
                  '@id': 'https://trovar.co.nz/#faq',
                  mainEntity: [
                    {
                      '@type': 'Question',
                      name: 'How is Trovar different from Hubdoc?',
                      acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'Hubdoc stores your client’s passwords and logs in as them, which breaks when platforms add 2FA. Trovar uses proper OAuth API connections to access billing data directly. It never stores passwords and won’t break when Meta updates their security.',
                      },
                    },
                    {
                      '@type': 'Question',
                      name: 'How is Trovar different from Dext?',
                      acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'Dext mostly waits for documents to arrive, and for platforms it does chase, it logs into the account for you, the same credential-scraping approach that breaks Hubdoc. Trovar never logs in on a client’s behalf: suppliers that email invoices file themselves, ad platforms take a short monthly step using the client’s own export, and Trovar captures anything forwarded by email or added by hand.',
                      },
                    },
                    {
                      '@type': 'Question',
                      name: 'How is Trovar different from Tailride?',
                      acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'For Meta Ads, Tailride uses a browser extension that has to ride the client’s live, logged-in session, so someone still has to open the account each time. Trovar pulls Meta’s billing charges directly via API, so once your practice is connected, the accountant can pull a client’s charges directly, without ever asking the client to log in. The task stays with the accountant, reducing client dependency and the chance of error. Tailride is also priced per invoice for any business; Trovar is built specifically for NZ & AU accounting practices, with GST and IRD taxable-supply rules handled correctly and pricing per client rather than per invoice.',
                      },
                    },
                    {
                      '@type': 'Question',
                      name: 'How is Trovar different from Vic.ai?',
                      acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'Vic.ai is AI-powered invoice processing built for larger finance teams that already have documents flowing into an AP or procurement system. Trovar is built for NZ & AU accounting practices managing many client businesses: it collects the invoices in the first place, without logging in on a client’s behalf, then matches every charge to the bank feed automatically. Vic.ai automates processing once documents already exist in your system; Trovar automates getting them there, and proves they reconcile.',
                      },
                    },
                    {
                      '@type': 'Question',
                      name: 'How is Trovar different from Ramp?',
                      acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'Ramp is a corporate card and spend-management platform, most useful once a business runs its spending through Ramp’s own card. Trovar works regardless of which bank or card a client already uses, and is focused on the accountant’s problem: collecting every supplier invoice and proving it reconciles against the bank feed, without asking the client to switch banking providers.',
                      },
                    },
                    {
                      '@type': 'Question',
                      name: 'Why did you build Trovar?',
                      acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'Accountants lose real time every month chasing clients for missing receipts, then manually matching each one against the bank statement. Clients don’t enjoy the chase any more than accountants enjoy doing it. As a rough estimate, New Zealand has tens of thousands of businesses that rely on an external accountant or bookkeeper; at just 2-3 hours of manual reconciliation admin per client per month at typical bookkeeping rates, that is well over $100 million a year of billable time nationally spent on paperwork instead of advice, not to mention the client’s own time wasted digging through folders and inboxes for receipts. Trovar exists to automate that admin away entirely: collect it, match it, prove it is reconciled.',
                      },
                    },
                    {
                      '@type': 'Question',
                      name: 'What does the reconciled percentage on the Trovar dashboard mean?',
                      acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'Trovar connects to a client’s Airwallex card feed and checks every charge against the invoices already collected. Instead of a spreadsheet of red dots, or chasing an accountant to confirm what’s missing, you see a live reconciled percentage per client, and exactly which transactions still need a receipt. This closed-loop matching is not something Hubdoc, Dext or Tailride offer.',
                      },
                    },
                    {
                      '@type': 'Question',
                      name: 'Which platforms does Trovar connect to?',
                      acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'Where it’s not practical to log in and grab the receipt yourself, Trovar connects directly to your clients’ paid subscriptions, the likes of Meta Ads, Google Ads, Adobe, Shopify, Microsoft 365, Stripe and more, with new connections added regularly. Suppliers that email invoices are captured automatically, ad platforms take a short monthly step, and for anything off-platform you can forward an invoice by email or add it manually.',
                      },
                    },
                    {
                      '@type': 'Question',
                      name: 'Does Trovar work with Xero?',
                      acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'Direct push to Xero, correctly coded with the GST split, is coming soon. Today every invoice is captured, GST-calculated and exportable into your workflow.',
                      },
                    },
                    {
                      '@type': 'Question',
                      name: 'Is the data IRD compliant?',
                      acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'Yes. Every record Trovar generates contains the fields IRD requires as taxable supply information: supplier, date, amount, GST component and description. Both domestic and overseas merchant GST is handled correctly.',
                      },
                    },
                    {
                      '@type': 'Question',
                      name: 'How much does Trovar cost?',
                      acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'Your first client is free, forever, with no card required. After that it is $59 NZD per client account per month. Add or remove clients any time. Most firms fold this into their bookkeeping fee.',
                      },
                    },
                  ],
                },
              ],
            }),
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  )
}
