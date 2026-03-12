import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import ScrollReveal from '@/components/ScrollReveal'
import { getFeaturedPost, getRecentPosts, getCategoryLabel, formatDate } from '@/lib/posts'
import type { PostMeta } from '@/lib/posts'

export default function HomePage() {
  const featured = getFeaturedPost()
  const recent = getRecentPosts(6, featured?.slug)

  return (
    <>
      <Nav />
      <ScrollReveal />

      {/* ── HERO ── */}
      <section className="pt-[60px] min-h-screen grid grid-cols-1 md:grid-cols-2">

        {/* Left — dark forest */}
        <div
          className="relative flex flex-col justify-end p-16 min-h-[70vh] md:min-h-screen overflow-hidden"
          style={{ background: '#0C1F10' }}
        >
          {/* Watermark letter */}
          <span
            className="absolute right-[-20px] top-1/2 -translate-y-1/2 pointer-events-none select-none leading-none"
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: '380px',
              fontWeight: 300,
              fontStyle: 'italic',
              color: 'rgba(26,82,48,0.07)',
            }}
          >
            I
          </span>

          {featured && (
            <>
              <span
                className="flex items-center gap-3 mb-5"
                style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: '8px', fontWeight: 300, letterSpacing: '0.55em', textTransform: 'uppercase', color: '#1A5230' }}
              >
                <span className="block w-7 h-px bg-[#1A5230]" />
                {getCategoryLabel(featured.category)}
              </span>

              <h1
                className="mb-6 leading-[1.08]"
                style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: 'clamp(32px, 3.8vw, 56px)',
                  fontWeight: 300,
                  fontStyle: 'italic',
                  color: '#F4F5F0',
                  animation: 'heroTitle 1.2s cubic-bezier(0.25,0.46,0.45,0.94) both',
                }}
              >
                {featured.title}
              </h1>

              <p
                className="mb-10 max-w-[420px]"
                style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: '15px',
                  fontWeight: 300,
                  color: 'rgba(244,245,240,0.45)',
                  lineHeight: 1.75,
                }}
              >
                {featured.excerpt}
              </p>

              <Link
                href={`/posts/${featured.slug}`}
                className="inline-flex items-center gap-4 w-fit group no-underline"
              >
                <span
                  style={{
                    fontFamily: 'Josefin Sans, sans-serif',
                    fontSize: '8px',
                    fontWeight: 300,
                    letterSpacing: '0.5em',
                    textTransform: 'uppercase',
                    color: 'rgba(244,245,240,0.5)',
                    borderBottom: '1px solid rgba(26,82,48,0.5)',
                    paddingBottom: '3px',
                    transition: 'color 0.3s, letter-spacing 0.3s',
                  }}
                  className="group-hover:!text-white group-hover:!border-[#1A5230] group-hover:!tracking-[0.65em]"
                >
                  Read the piece
                </span>
                <span
                  className="block h-px bg-[rgba(26,82,48,0.5)] transition-all duration-300 group-hover:w-9 group-hover:!bg-[#1A5230]"
                  style={{ width: '20px' }}
                />
              </Link>
            </>
          )}
        </div>

        {/* Right — sidebar */}
        <div className="hidden md:flex flex-col border-l border-[#DDE0D6] bg-[#FAFBF8]">
          <div
            className="px-12 py-7 border-b border-[#DDE0D6] flex items-center gap-3"
          >
            <span className="block w-1.5 h-1.5 rounded-full bg-[#1A5230]" />
            <span style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: '8px', fontWeight: 300, letterSpacing: '0.5em', textTransform: 'uppercase', color: '#7A7E76' }}>
              Also in this issue
            </span>
          </div>

          {recent.slice(0, 4).map((post, i) => (
            <Link
              key={post.slug}
              href={`/posts/${post.slug}`}
              className={`flex-1 px-12 py-7 border-b border-[#DDE0D6] no-underline group transition-all duration-300 reveal reveal-${i + 1} hover:bg-[#ECF0E8] hover:pl-14`}
            >
              <div style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: '7px', fontWeight: 300, letterSpacing: '0.5em', textTransform: 'uppercase', color: '#1A5230', marginBottom: '8px', opacity: 0.8 }}>
                {getCategoryLabel(post.category)}
              </div>
              <div
                className="group-hover:text-[#1A5230] transition-colors mb-1"
                style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '21px', fontWeight: 400, fontStyle: 'italic', lineHeight: 1.2, color: '#0C1F10' }}
              >
                {post.title}
              </div>
              <div style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: '8px', fontWeight: 200, letterSpacing: '0.2em', color: '#7A7E76' }}>
                {post.readTime}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── GREEN RULE ── */}
      <div className="h-[3px] bg-[#1A5230]" />

      {/* ── RECENT WORK ── */}
      <section className="px-12 pt-10 pb-16">
        <div className="flex items-center justify-between mb-7 reveal">
          <h2 style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: '9px', fontWeight: 400, letterSpacing: '0.5em', textTransform: 'uppercase', color: '#0C1F10' }}>
            Recent Work
          </h2>
          <Link
            href="/archive"
            className="no-underline transition-all duration-300 hover:tracking-[0.45em]"
            style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: '8px', fontWeight: 300, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#1A5230' }}
          >
            View Archive →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#DDE0D6]">
          {recent.slice(0, 3).map((post, i) => (
            <ArticleCard key={post.slug} post={post} index={i} />
          ))}
        </div>
      </section>

      {/* ── MASTHEAD BAND ── */}
      <div
        className="px-16 py-14 flex flex-col md:flex-row items-center justify-between gap-10 reveal"
        style={{ background: '#0C1F10' }}
      >
        <span style={{ fontFamily: 'Cinzel, serif', fontSize: '10px', letterSpacing: '0.5em', textTransform: 'uppercase', color: '#1a2e1e', whiteSpace: 'nowrap' }}>
          &apos;Tis but a Flesh Wound
        </span>
        <p
          className="text-center max-w-[520px] flex-1"
          style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '22px', fontStyle: 'italic', fontWeight: 300, color: 'rgba(244,245,240,0.6)', lineHeight: 1.4 }}
        >
          "The best arguments live in the <em style={{ color: '#1A5230', fontStyle: 'normal' }}>margin</em>."
        </p>
        <span
          className="hidden md:block text-right"
          style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: '8px', letterSpacing: '0.25em', color: '#2a3e2e', lineHeight: 1.8, whiteSpace: 'nowrap' }}
        >
          Independent<br />No Ads · No Comments<br />Est. 2025
        </span>
      </div>

      <Footer />

      <style>{`
        @keyframes heroTitle {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  )
}

function ArticleCard({ post, index }: { post: PostMeta; index: number }) {
  const isPoem = post.category === 'poem'
  return (
    <Link
      href={`/posts/${post.slug}`}
      className={`no-underline group relative overflow-hidden p-9 transition-colors duration-300 reveal reveal-${index + 1} hover:bg-[#ECF0E8] ${isPoem ? 'bg-[#E8EEE4]' : 'bg-[#F4F5F0]'}`}
    >
      {/* Green underline on hover */}
      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1A5230] scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" />

      <div style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: '9px', letterSpacing: '0.2em', color: '#DDE0D6', marginBottom: '20px', fontWeight: 300 }}>
        {String(index + 1).padStart(3, '0')}
      </div>
      <div style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: '7px', fontWeight: 300, letterSpacing: '0.5em', textTransform: 'uppercase', color: '#1A5230', marginBottom: '10px', opacity: 0.8 }}>
        {getCategoryLabel(post.category)}
      </div>
      <h3
        className="group-hover:text-[#1A5230] transition-colors mb-3"
        style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: isPoem ? '28px' : '24px', fontWeight: 300, fontStyle: 'italic', lineHeight: 1.2, color: '#0C1F10' }}
      >
        {post.title}
      </h3>
      <p
        className="mb-5"
        style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '13px', fontWeight: 300, fontStyle: isPoem ? 'italic' : 'normal', color: '#7A7E76', lineHeight: 1.75 }}
      >
        {post.excerpt}
      </p>
      <span style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: '8px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#7A7E76' }}>
        {post.readTime}
      </span>
    </Link>
  )
}
