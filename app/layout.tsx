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
  title: 'Trovar: Invoice Collection for Accountants | Hubdoc, Dext & Tailride Alternative',
  description:
    'Trovar collects every supplier invoice for your clients without ever logging in on their behalf. Suppliers that email invoices file themselves, Meta and Google Ads take a 60-second monthly step, and everything else can be forwarded or added by hand. IRD-compliant GST records, built for NZ & AU accounting firms. First client free, forever.',
  keywords: [
    'invoice collection for accountants',
    'Hubdoc alternative',
    'Dext alternative',
    'Tailride alternative',
    'Receipt Bank alternative',
    'invoice collection software NZ',
    'invoice automation for accountants',
    'receipt automation NZ',
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
    title: 'Trovar: Smart Receipt Collection for Modern Accountants',
    description:
      'Automatically collect invoices from Meta, Google, Adobe and Shopify. IRD compliant records pushed to Xero. Built for NZ and AU accounting firms.',
    siteName: 'Trovar',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Trovar: Smart Receipt Collection',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Trovar: Smart Receipt Collection for Modern Accountants',
    description:
      'Automatically collect invoices from Meta, Google, Adobe and Shopify. IRD compliant records pushed to Xero.',
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
                    'Automatic supplier-invoice collection for accounting firms in New Zealand and Australia.',
                },
                {
                  '@type': 'SoftwareApplication',
                  '@id': 'https://trovar.co.nz/#software',
                  name: 'Trovar',
                  description:
                    'Trovar collects every supplier invoice for your clients without logging in on their behalf: automatic capture for suppliers that email invoices, a short monthly step for Meta and Google Ads, and email or manual capture for everything else. An alternative to Hubdoc, Dext and Tailride, with IRD-compliant GST records for NZ & AU accountants.',
                  url: 'https://trovar.co.nz',
                  applicationCategory: 'BusinessApplication',
                  operatingSystem: 'Web',
                  publisher: { '@id': 'https://trovar.co.nz/#organization' },
                  offers: {
                    '@type': 'Offer',
                    price: '29',
                    priceCurrency: 'NZD',
                    description: 'First client free forever, then $29 NZD per client per month.',
                    priceSpecification: {
                      '@type': 'UnitPriceSpecification',
                      price: '29',
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
                        text: 'Hubdoc stores your client’s passwords and logs in as them, which breaks when platforms add 2FA. Trovar uses proper OAuth API connections to access billing data directly. It never stores passwords and won’t break when Meta or Google update their security.',
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
                      name: 'Which platforms does Trovar connect to?',
                      acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'Trovar connects to your clients’ paid subscriptions, the likes of Meta Ads, Google Ads, Adobe, Shopify, Microsoft 365, Stripe and more, with new connections added regularly. Suppliers that email invoices are captured automatically, ad platforms take a short monthly step, and for anything off-platform you can forward an invoice by email or add it manually.',
                      },
                    },
                    {
                      '@type': 'Question',
                      name: 'Does Trovar work with Xero?',
                      acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'Direct push to Xero, correctly coded with the GST split, is coming soon, and Trovar is a Xero App Partner. Today every invoice is captured, GST-calculated and one-click exportable into your workflow.',
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
                        text: 'Your first client is free, forever, with no card required. After that it is $29 NZD per client account per month. Add or remove clients any time. Most firms fold this into their bookkeeping fee.',
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
