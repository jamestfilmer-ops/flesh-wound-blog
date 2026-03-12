import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: "'Tis but a Flesh Wound — An Blog by Isaac Lindell",
    template: "%s — 'Tis but a Flesh Wound",
  },
  description: 'Short stories, think pieces, and poems by Isaac Lindell. Independent writing. No ads. No comments.',
  authors: [{ name: 'Isaac Lindell' }],
  creator: 'Isaac Lindell',
  openGraph: {
    type: 'website',
    siteName: "'Tis but a Flesh Wound",
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Josefin+Sans:wght@200;300;400&family=Cinzel:wght@400;600&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Blog',
              name: "'Tis but a Flesh Wound",
              description: 'Short stories, think pieces, and poems by Isaac Lindell',
              author: { '@type': 'Person', name: 'Isaac Lindell' },
              inLanguage: 'en',
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
