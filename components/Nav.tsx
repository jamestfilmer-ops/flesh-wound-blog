'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 h-[60px] bg-[#F4F5F0] border-b border-[#DDE0D6] flex items-center justify-between px-12 transition-shadow duration-300 ${
        scrolled ? 'shadow-[0_2px_24px_rgba(12,31,16,0.06)]' : ''
      }`}
    >
      {/* Green stripe */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#1A5230]" />

      {/* Logo */}
      <Link href="/" className="flex flex-col gap-0.5 no-underline">
        <span
          className="font-cinzel text-[13px] font-semibold tracking-[0.18em] text-[#0C1F10] leading-none"
          style={{ fontFamily: 'Cinzel, serif' }}
        >
          &apos;TIS BUT A FLESH WOUND
        </span>
        <span
          className="text-[7px] font-light tracking-[0.35em] uppercase text-[#7A7E76] leading-none"
          style={{ fontFamily: 'Josefin Sans, sans-serif' }}
        >
          An Blog by Isaac Lindell
        </span>
      </Link>

      {/* Centre links */}
      <ul className="hidden md:flex absolute left-1/2 -translate-x-1/2 gap-8 list-none">
        {[
          { label: 'Short Stories', href: '/archive?cat=short-story' },
          { label: 'Think Pieces', href: '/archive?cat=think-piece' },
          { label: 'Poems', href: '/archive?cat=poem' },
          { label: 'Archive', href: '/archive' },
        ].map(({ label, href }) => (
          <li key={label}>
            <Link
              href={href}
              className="nav-link"
              style={{
                fontFamily: 'Josefin Sans, sans-serif',
                fontSize: '9px',
                fontWeight: 300,
                letterSpacing: '0.35em',
                textTransform: 'uppercase',
                color: '#0C1F10',
                textDecoration: 'none',
                paddingBottom: '2px',
                borderBottom: '1px solid transparent',
                transition: 'color 0.2s, border-color 0.2s',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLAnchorElement
                el.style.color = '#1A5230'
                el.style.borderBottomColor = '#1A5230'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLAnchorElement
                el.style.color = '#0C1F10'
                el.style.borderBottomColor = 'transparent'
              }}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Right label */}
      <span
        className="hidden md:block text-[8px] tracking-[0.25em] uppercase text-[#7A7E76]"
        style={{ fontFamily: 'Josefin Sans, sans-serif' }}
      >
        Independent · No Ads
      </span>
    </nav>
  )
}
