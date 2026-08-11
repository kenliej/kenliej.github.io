import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://kjugarap.top'),
  title: {
    default: 'Kenlie Jugarap — Main Website',
    template: '%s | Kenlie Jugarap',
  },
  description:
    'Kenlie Jugarap is a full-stack developer focused on backend systems, APIs, and modern web applications.',
  keywords: [
    'Kenlie Jugarap',
    'full-stack developer',
    'backend developer',
    'web developer',
    'Laravel',
    'Next.js',
    'React',
    'API development',
    'portfolio website',
  ],
  authors: [{ name: 'Kenlie Jugarap' }],
  creator: 'Kenlie Jugarap',
  publisher: 'Kenlie Jugarap',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Kenlie Jugarap — Main Website',
    description:
      'Portfolio of Kenlie Jugarap, a full-stack developer building reliable APIs and modern web experiences.',
    url: 'https://kjugarap.top',
    siteName: 'Kenlie Jugarap',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kenlie Jugarap — Main Website',
    description:
      'Portfolio of Kenlie Jugarap, a full-stack developer building reliable APIs and modern web experiences.',
    creator: '@kenliej',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#f7f5ee',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="bg-background" data-scroll-behavior="smooth">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
