import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import ScrollReveal from '@/components/ScrollReveal'
import { getPost, getAllPosts, getRecentPosts, getCategoryLabel, formatDate } from '@/lib/posts'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllPosts().map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: ['Isaac Lindell'],
    },
  }
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) notFound()

  const related = getRecentPosts(3, post.slug)
  const isPoem = post.category === 'poem'

  return (
    <>
      <Nav />
      <ScrollReveal />

      {/* ── ARTICLE HERO ── */}
      {isPoem ? (
        /* Poem hero — centred, light */
        <div className="pt-[60px] bg-[#E8EEE4] border-b border-[#DDE0D6] px-16 pb-16" style={{ paddingTop: '100px' }}>
          <div className="flex items-center justify-center gap-3 mb-7">
            <span className="block w-7 h-px bg-[#1A5230] opacity-60" />
            <span style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: '8px', fontWeight: 300, letterSpacing: '0.6em', textTransform: 'uppercase', color: '#1A5230' }}>
              {getCategoryLabel(post.category)}
            </span>
          </div>
          <h1
            className="text-center mx-auto mb-5"
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(36px,4vw,60px)',
              fontWeight: 300,
              fontStyle: 'italic',
              color: '#0C1F10',
              lineHeight: 1.08,
              maxWidth: '640px',
            }}
          >
            {post.title}
          </h1>
          <div className="flex items-center justify-center gap-4 pt-6 border-t border-[#DDE0D6] mt-6">
            <MetaItem>{formatDate(post.date)}</MetaItem>
            <MetaDot />
            <MetaItem>{post.readTime}</MetaItem>
          </div>
        </div>
      ) : (
        /* Think piece / Story hero — dark */
        <div
          className="relative overflow-hidden px-16 pb-20"
          style={{ background: '#0C1F10', paddingTop: '100px' }}
        >
          {/* Watermark */}
          <span
            className="absolute right-[-10px] top-1/2 -translate-y-1/2 pointer-events-none select-none leading-none"
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: '320px',
              fontWeight: 300,
              fontStyle: 'italic',
              color: 'rgba(26,82,48,0.04)',
            }}
          >
            {post.title[0]}
          </span>

          <div className="flex items-center gap-3 mb-7">
            <span className="block w-7 h-px bg-[#1A5230]" />
            <span style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: '8px', fontWeight: 300, letterSpacing: '0.6em', textTransform: 'uppercase', color: '#1A5230' }}>
              {getCategoryLabel(post.category)}
            </span>
          </div>

          <h1
            className="mb-6 max-w-[780px]"
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(32px,4.5vw,68px)',
              fontWeight: 300,
              fontStyle: 'italic',
              color: '#F4F5F0',
              lineHeight: 1.05,
              animation: 'heroTitle 1s cubic-bezier(0.25,0.46,0.45,0.94) both',
            }}
          >
            {post.title}
          </h1>

          {post.excerpt && (
            <p
              className="mb-10 max-w-[600px]"
              style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '18px', fontWeight: 300, fontStyle: 'italic', color: 'rgba(244,245,240,0.4)', lineHeight: 1.75 }}
            >
              {post.excerpt}
            </p>
          )}

          <div className="flex items-center gap-5 pt-8 border-t border-[rgba(255,255,255,0.06)]">
            <MetaItemDark>Isaac Lindell</MetaItemDark>
            <MetaDotDark />
            <MetaItemDark>{post.readTime}</MetaItemDark>
            <MetaDotDark />
            <MetaItemDark>{formatDate(post.date)}</MetaItemDark>
          </div>
        </div>
      )}

      {/* ── CONTENT ── */}
      {isPoem ? (
        <div className="max-w-[500px] mx-auto px-6 py-20 text-center">
          <div
            className="prose-poem"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      ) : (
        <div className="max-w-[680px] mx-auto px-12 py-20">
          <div
            className="prose-brg"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      )}

      {/* ── RELATED ── */}
      {related.length > 0 && (
        <section className="border-t border-[#DDE0D6] px-12 py-14">
          <div
            className="mb-8 flex items-center gap-3"
          >
            <span className="block w-7 h-px bg-[#1A5230]" />
            <h2 style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: '8px', fontWeight: 300, letterSpacing: '0.5em', textTransform: 'uppercase', color: '#0C1F10' }}>
              More Writing
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#DDE0D6]">
            {related.map((p, i) => (
              <Link
                key={p.slug}
                href={`/posts/${p.slug}`}
                className="no-underline group bg-[#F4F5F0] p-8 transition-colors hover:bg-[#ECF0E8]"
              >
                <div style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: '7px', fontWeight: 300, letterSpacing: '0.5em', textTransform: 'uppercase', color: '#1A5230', opacity: 0.8, marginBottom: '8px' }}>
                  {getCategoryLabel(p.category)}
                </div>
                <div
                  className="group-hover:text-[#1A5230] transition-colors"
                  style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '20px', fontWeight: 300, fontStyle: 'italic', color: '#0C1F10', lineHeight: 1.25 }}
                >
                  {p.title}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

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

function MetaItem({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: '8px', fontWeight: 300, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#7A7E76' }}>
      {children}
    </span>
  )
}
function MetaDot() {
  return <span className="block w-1 h-1 rounded-full bg-[#DDE0D6]" />
}
function MetaItemDark({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: '8px', fontWeight: 300, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.22)' }}>
      {children}
    </span>
  )
}
function MetaDotDark() {
  return <span className="block w-1 h-1 rounded-full bg-[rgba(255,255,255,0.1)]" />
}
