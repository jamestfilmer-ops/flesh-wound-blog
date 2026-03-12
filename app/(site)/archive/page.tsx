import type { Metadata } from 'next'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import ScrollReveal from '@/components/ScrollReveal'
import { getAllPosts, getCategoryLabel, formatDate } from '@/lib/posts'
import type { PostCategory } from '@/lib/posts'

export const metadata: Metadata = {
  title: 'Archive',
  description: 'All writing by Isaac Lindell — short stories, think pieces, and poems.',
}

const CATEGORIES: { value: PostCategory | 'all'; label: string }[] = [
  { value: 'all', label: 'All Writing' },
  { value: 'think-piece', label: 'Think Pieces' },
  { value: 'short-story', label: 'Short Stories' },
  { value: 'poem', label: 'Poems' },
]

export default function ArchivePage({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string }>
}) {
  const allPosts = getAllPosts()

  // We read cat from URL on client via search params — render all, filter client-side
  // For static generation, render all posts and use client filter

  return (
    <>
      <Nav />
      <ScrollReveal />

      {/* ── ARCHIVE HERO ── */}
      <div className="pt-[60px] border-b border-[#DDE0D6]" style={{ paddingTop: '100px', paddingBottom: '56px', paddingLeft: '64px', paddingRight: '64px' }}>
        <span
          className="block mb-5"
          style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: '8px', fontWeight: 300, letterSpacing: '0.6em', textTransform: 'uppercase', color: '#1A5230' }}
        >
          Complete Archive
        </span>
        <h1
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(36px, 5vw, 72px)',
            fontWeight: 300,
            fontStyle: 'italic',
            color: '#0C1F10',
            lineHeight: 1.05,
            marginBottom: '16px',
          }}
        >
          All Writing
        </h1>
        <p style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: '9px', fontWeight: 200, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#7A7E76' }}>
          {allPosts.length} pieces · Short Stories · Think Pieces · Poems
        </p>
      </div>

      {/* ── FILTER TABS ── */}
      <div className="border-b border-[#DDE0D6] px-16 flex gap-8 overflow-x-auto" id="archive-filter">
        {CATEGORIES.map(cat => (
          <Link
            key={cat.value}
            href={cat.value === 'all' ? '/archive' : `/archive?cat=${cat.value}`}
            className="no-underline py-5 border-b-2 border-transparent transition-all whitespace-nowrap"
            style={{
              fontFamily: 'Josefin Sans, sans-serif',
              fontSize: '9px',
              fontWeight: 300,
              letterSpacing: '0.4em',
              textTransform: 'uppercase',
              color: '#7A7E76',
            }}
            data-filter={cat.value}
          >
            {cat.label}
          </Link>
        ))}
      </div>

      {/* ── POST LIST ── */}
      <div className="px-16 py-8" id="archive-list">
        {allPosts.map((post, i) => (
          <Link
            key={post.slug}
            href={`/posts/${post.slug}`}
            className={`flex items-baseline gap-7 py-6 border-b border-[#DDE0D6] no-underline group transition-all duration-200 hover:bg-[#ECF0E8] hover:px-3 -mx-3 reveal reveal-${Math.min(i + 1, 3)}`}
            data-category={post.category}
          >
            <span
              className="shrink-0 w-10"
              style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: '10px', fontWeight: 200, letterSpacing: '0.1em', color: '#DDE0D6' }}
            >
              {String(i + 1).padStart(2, '0')}
            </span>

            <div className="flex-1 min-w-0">
              <div style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: '7px', fontWeight: 300, letterSpacing: '0.5em', textTransform: 'uppercase', color: '#1A5230', opacity: 0.8, marginBottom: '6px' }}>
                {getCategoryLabel(post.category)}
              </div>
              <div
                className="group-hover:text-[#1A5230] transition-colors mb-2"
                style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(20px,2vw,26px)', fontWeight: 300, fontStyle: 'italic', color: '#0C1F10', lineHeight: 1.2 }}
              >
                {post.title}
              </div>
              <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '14px', fontWeight: 300, color: '#7A7E76', lineHeight: 1.6 }}>
                {post.excerpt}
              </div>
            </div>

            <div className="hidden md:flex flex-col items-end gap-1 shrink-0">
              <span style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: '8px', fontWeight: 200, letterSpacing: '0.15em', color: '#7A7E76' }}>
                {formatDate(post.date)}
              </span>
              <span style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: '8px', fontWeight: 200, letterSpacing: '0.15em', color: '#BBBBB6' }}>
                {post.readTime}
              </span>
            </div>
          </Link>
        ))}
      </div>

      <Footer />

      {/* Client-side filter script */}
      <script dangerouslySetInnerHTML={{ __html: `
        (function() {
          var params = new URLSearchParams(window.location.search);
          var cat = params.get('cat') || 'all';

          // Highlight active tab
          document.querySelectorAll('[data-filter]').forEach(function(el) {
            if (el.getAttribute('data-filter') === cat) {
              el.style.color = '#1A5230';
              el.style.borderBottomColor = '#1A5230';
            }
          });

          // Filter list
          if (cat !== 'all') {
            document.querySelectorAll('[data-category]').forEach(function(el) {
              if (el.getAttribute('data-category') !== cat) {
                el.style.display = 'none';
              }
            });
          }
        })();
      `}} />
    </>
  )
}
