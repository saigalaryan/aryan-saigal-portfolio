import React from "react"
import type { Metadata } from 'next'
import { Instrument_Sans, Instrument_Serif, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { GoogleAnalytics } from '@/components/google-analytics'
import './globals.css'

// globals.css has always referenced these three faces, but nothing loaded them,
// so every fallback chain collapsed to system-ui / Georgia / Courier New.
// next/font self-hosts them and avoids layout shift.
const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  variable: '--font-instrument',
  display: 'swap',
})

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-instrument-serif',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
})

const fontVariables = `${instrumentSans.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`

const SITE_URL = 'https://aryan-saigal-portfolio.vercel.app'
const TITLE = 'Aryan Saigal | AI/ML Engineer & Solutions Architect'
const DESCRIPTION =
  'AI/ML engineer and solutions architect shipping production AI systems end to end: RAG pipelines, document intelligence, real-time voice AI, and Text-to-SQL with LangChain, FastAPI, Next.js, and GCP Cloud Run.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: '%s | Aryan Saigal',
  },
  description: DESCRIPTION,
  keywords: [
    'Aryan Saigal',
    'Solutions Architect',
    'AI engineer portfolio',
    'RAG chatbot developer',
    'FastAPI developer',
    'Next.js developer',
    'Cloud engineer',
    'LangChain',
    'Text-to-SQL',
  ],
  authors: [{ name: 'Aryan Saigal', url: SITE_URL }],
  creator: 'Aryan Saigal',
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
  // openGraph/twitter images are intentionally omitted: Next picks up
  // app/opengraph-image.tsx automatically and generates a real 1200x630 card.
  openGraph: {
    type: 'profile',
    url: SITE_URL,
    title: TITLE,
    description: DESCRIPTION,
    siteName: 'Aryan Saigal Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
  },
}

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Aryan Saigal',
  url: SITE_URL,
  jobTitle: 'AI/ML Engineer and Solutions Architect',
  email: 'mailto:saigalaryan03@gmail.com',
  telephone: '+91-98108-07911',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'New Delhi',
    addressCountry: 'IN',
  },
  worksFor: {
    '@type': 'Organization',
    name: 'EMB Global (Incuspaze)',
  },
  knowsLanguage: ['English', 'Hindi', 'French'],
  knowsAbout: [
    'Retrieval-Augmented Generation',
    'LangChain',
    'LangGraph',
    'Model Context Protocol',
    'FastAPI',
    'Next.js',
    'GCP Cloud Run',
    'MLOps',
    'LLM cost observability',
    'Text-to-SQL',
  ],
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'Amity University, Noida',
  },
  sameAs: [
    'https://github.com/saigalaryan',
    'https://www.linkedin.com/in/aryan-saigal-88644976/',
    'https://leetcode.com/u/saigalaryan/',
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // suppressHydrationWarning on <html>: the inline script below adds a `js`
  // class before React hydrates, so the server and client class lists
  // legitimately differ on that one element.
  return (
    <html lang="en" className={fontVariables} suppressHydrationWarning>
      {/* bg/text match the page's own light palette. This previously forced a
          near-black background that every section then had to paint over. */}
      <body className="font-sans antialiased bg-background text-foreground">
        {/* Runs before paint. Entrance animations start from opacity:0, so
            without this flag a JS failure (or a non-JS client) would leave the
            hero and every revealed section permanently invisible. The hidden
            state is scoped to .js so no-JS gets the content immediately. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              `document.documentElement.classList.add('js');` +
              `try{var t=localStorage.getItem('theme');` +
              `if(t==='dark'||(!t&&matchMedia('(prefers-color-scheme: dark)').matches))` +
              `document.documentElement.classList.add('dark')}catch(e){}`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <a
          href="#top"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-foreground focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-background"
        >
          Skip to content
        </a>
        {children}
        <Analytics />
        <GoogleAnalytics />
      </body>
    </html>
  )
}
