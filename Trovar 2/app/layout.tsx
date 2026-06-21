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
  title: 'Trovar: Smart Receipt Collection for Modern Accountants',
  description:
    'Trovar connects directly to Meta, Google, Adobe and Shopify via billing APIs, automatically collecting invoices for NZ and AU accounting firms. No portals. No chasing. No 2FA headaches. IRD compliant records pushed to Xero automatically.',
  keywords: [
    'receipt automation NZ',
    'invoice collection New Zealand',
    'accounting software NZ',
    'Xero integration',
    'Meta ads invoices',
    'Google ads receipts',
    'IRD compliant records',
    'GST records New Zealand',
    'Hubdoc alternative',
    'accounting firm software',
    'digital receipt collection',
    'expense management NZ',
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
        {/* Schema.org structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              name: 'Trovar',
              description:
                'Smart receipt collection for modern accountants. Automatically collects invoices from Meta, Google, Adobe and Shopify via billing APIs. IRD compliant records pushed to Xero.',
              url: 'https://trovar.co.nz',
              applicationCategory: 'BusinessApplication',
              operatingSystem: 'Web',
              offers: {
                '@type': 'Offer',
                price: '29',
                priceCurrency: 'NZD',
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
                'Automatic invoice collection from Meta Ads',
                'Automatic invoice collection from Google Ads',
                'Automatic invoice collection from Adobe Creative Cloud',
                'Automatic invoice collection from Shopify',
                'IRD compliant expense records',
                'NZ GST calculation',
                'Xero integration',
                'Multi-client management for accounting firms',
              ],
              areaServed: ['New Zealand', 'Australia'],
              inLanguage: 'en-NZ',
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
