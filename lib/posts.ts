import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkHtml from 'remark-html'

const postsDir = path.join(process.cwd(), 'posts')

export type PostCategory = 'think-piece' | 'short-story' | 'poem'

export interface PostMeta {
  slug: string
  title: string
  date: string
  category: PostCategory
  excerpt: string
  readTime: string
  featured?: boolean
}

export interface Post extends PostMeta {
  content: string
}

const CATEGORY_LABELS: Record<PostCategory, string> = {
  'think-piece': 'Think Pieces',
  'short-story': 'Short Stories',
  'poem': 'Poems',
}

export function getCategoryLabel(cat: PostCategory): string {
  return CATEGORY_LABELS[cat]
}

export function getAllPosts(): PostMeta[] {
  const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'))

  const posts = files.map((file) => {
    const slug = file.replace(/\.md$/, '')
    const raw = fs.readFileSync(path.join(postsDir, file), 'utf8')
    const { data } = matter(raw)

    return {
      slug,
      title: data.title ?? 'Untitled',
      date: data.date ?? '',
      category: (data.category ?? 'think-piece') as PostCategory,
      excerpt: data.excerpt ?? '',
      readTime: data.readTime ?? '5 min read',
      featured: data.featured ?? false,
    }
  })

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getFeaturedPost(): PostMeta | undefined {
  const posts = getAllPosts()
  return posts.find(p => p.featured) ?? posts[0]
}

export function getRecentPosts(limit = 6, excludeSlug?: string): PostMeta[] {
  return getAllPosts()
    .filter(p => p.slug !== excludeSlug)
    .slice(0, limit)
}

export async function getPost(slug: string): Promise<Post | null> {
  const filePath = path.join(postsDir, `${slug}.md`)
  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(raw)

  const processed = await remark().use(remarkHtml, { sanitize: false }).process(content)
  const html = processed.toString()

  return {
    slug,
    title: data.title ?? 'Untitled',
    date: data.date ?? '',
    category: (data.category ?? 'think-piece') as PostCategory,
    excerpt: data.excerpt ?? '',
    readTime: data.readTime ?? '5 min read',
    featured: data.featured ?? false,
    content: html,
  }
}

export function formatDate(dateStr: string): string {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
}
