import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-[#DDE0D6] px-12 py-10 flex flex-col md:flex-row justify-between items-center gap-4">
      <Link
        href="/"
        className="no-underline"
        style={{ fontFamily: 'Cinzel, serif', fontSize: '12px', letterSpacing: '0.25em', color: '#0C1F10' }}
      >
        &apos;TIS BUT A{' '}
        <span style={{ color: '#1A5230' }}>FLESH</span>{' '}
        WOUND
      </Link>

      <div
        className="flex gap-6 text-center"
        style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: '8px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#7A7E76' }}
      >
        <Link href="/archive?cat=short-story" className="no-underline hover:text-[#1A5230] transition-colors">Short Stories</Link>
        <Link href="/archive?cat=think-piece" className="no-underline hover:text-[#1A5230] transition-colors">Think Pieces</Link>
        <Link href="/archive?cat=poem" className="no-underline hover:text-[#1A5230] transition-colors">Poems</Link>
        <Link href="/about" className="no-underline hover:text-[#1A5230] transition-colors">About</Link>
      </div>

      <span
        style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: '8px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#7A7E76' }}
      >
        Isaac Lindell · No Comments
      </span>
    </footer>
  )
}
