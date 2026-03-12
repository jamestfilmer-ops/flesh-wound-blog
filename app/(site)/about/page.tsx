import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'About',
  description: 'About Isaac Lindell and this blog.',
}

export default function AboutPage() {
  return (
    <>
      <Nav />

      {/* ── HERO ── */}
      <div
        className="relative overflow-hidden px-16 pb-20"
        style={{ background: '#0C1F10', paddingTop: '100px' }}
      >
        <span
          className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none select-none leading-none"
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: '320px',
            fontWeight: 300,
            fontStyle: 'italic',
            color: 'rgba(26,82,48,0.045)',
          }}
        >
          A
        </span>

        <span
          className="flex items-center gap-3 mb-7"
          style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: '8px', fontWeight: 300, letterSpacing: '0.6em', textTransform: 'uppercase', color: '#1A5230' }}
        >
          <span className="block w-7 h-px bg-[#1A5230]" />
          About
        </span>

        <h1
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(36px, 4.5vw, 68px)',
            fontWeight: 300,
            fontStyle: 'italic',
            color: '#F4F5F0',
            lineHeight: 1.05,
            maxWidth: '680px',
            marginBottom: '24px',
          }}
        >
          'Tis but a Flesh Wound
        </h1>

        <p
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: '18px',
            fontWeight: 300,
            fontStyle: 'italic',
            color: 'rgba(244,245,240,0.4)',
            lineHeight: 1.75,
            maxWidth: '560px',
          }}
        >
          An independent blog by Isaac Lindell. Short stories, think pieces, poems.
        </p>
      </div>

      {/* ── BODY ── */}
      <div className="max-w-[660px] mx-auto px-12 py-20">
        <div className="prose-brg">
          {/* Replace this placeholder content with your actual about text */}
          <p>
            This is a place for writing that doesn&apos;t fit anywhere else. Short fiction, essays on things I&apos;ve been thinking about, and occasional poems. No particular theme. No particular schedule. Just the work.
          </p>

          <p>
            I&apos;m Isaac Lindell — a financial advisor by trade, a writer by compulsion. The name comes from the Monty Python bit, which felt right: the insistence that things are fine when they clearly aren&apos;t is a mode I recognise in myself and find oddly useful.
          </p>

          <p>
            There are no ads here. No comments. No newsletter (yet). If something here is worth reading, I hope it finds its way to people who need it.
          </p>
        </div>

        {/* Divider */}
        <div className="my-16 flex items-center gap-4">
          <div className="flex-1 h-px bg-[#DDE0D6]" />
          <span className="block w-1.5 h-1.5 rotate-45 bg-[#1A5230] opacity-50" />
          <div className="flex-1 h-px bg-[#DDE0D6]" />
        </div>

        {/* Site facts */}
        <div className="grid grid-cols-3 gap-8 text-center">
          {[
            { label: 'Since', value: '2025' },
            { label: 'Sections', value: '3' },
            { label: 'Comments', value: 'None' },
          ].map(item => (
            <div key={item.label}>
              <div
                style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: '36px',
                  fontWeight: 300,
                  fontStyle: 'italic',
                  color: '#1A5230',
                  lineHeight: 1,
                  marginBottom: '8px',
                }}
              >
                {item.value}
              </div>
              <div
                style={{
                  fontFamily: 'Josefin Sans, sans-serif',
                  fontSize: '8px',
                  fontWeight: 300,
                  letterSpacing: '0.4em',
                  textTransform: 'uppercase',
                  color: '#7A7E76',
                }}
              >
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  )
}
