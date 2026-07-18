import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const inter = Inter({ variable: '--font-inter', subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Medicare Calculators 2026 — Free Medicare Cost & Benefits Estimator',
  description:
    'Free 2026 Medicare calculators: Part B IRMAA, Medicare Advantage, Part D, Medigap, Social Security, RMD and retirement income. Updated 2026 data. All 50 states.',
  keywords: [
    'medicare calculator 2026',
    'medicare cost calculator',
    'part b irmaa calculator',
    'medicare advantage calculator',
    'social security calculator',
    'medigap calculator',
    'part d calculator',
    'rmd calculator',
    'retirement income calculator',
    'medicare supplement calculator',
    'when to take social security',
  ],
  metadataBase: new URL('https://medicarecalculators.com'),
  alternates: { canonical: 'https://medicarecalculators.com' },
  openGraph: {
    title: 'Medicare Calculators 2026 — Free Medicare Cost & Benefits Estimator',
    description:
      'Free 2026 Medicare calculators: Part B IRMAA, Medicare Advantage, Part D, Medigap, Social Security, RMD and retirement income. Updated 2026 data. All 50 states.',
    url: 'https://medicarecalculators.com',
    siteName: 'medicarecalculators.com',
    type: 'website',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630, alt: 'Free Medicare Calculators 2026' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Medicare Calculators 2026 — Free Medicare Cost & Benefits Estimator',
    description: 'Free Medicare calculators for Part B IRMAA, Medicare Advantage, Part D, Medigap, Social Security, RMD and retirement income.',
    images: ['/twitter-image.png'],
  },
  robots: { index: true, follow: true },
  verification: { google: 'PLACEHOLDER_GOOGLE_SITE_VERIFICATION' },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <head>
        <meta name="google-adsense-account" content="ca-pub-5035661017594256" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if(localStorage.getItem('mc-theme')==='dark'){document.documentElement.classList.add('dark')}}catch(e){}})()`,
          }}
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-7HFRHGX9TK"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-7HFRHGX9TK');
          `}
        </Script>
      </head>
      <body
        className="min-h-full flex flex-col bg-white dark:bg-[#0a1929] text-gray-900 dark:text-[#e2e8f0]"
        style={{ fontFamily: 'var(--font-inter), sans-serif' }}
      >
        {children}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5035661017594256"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
