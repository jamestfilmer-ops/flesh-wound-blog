# 'Tis but a Flesh Wound

**An Blog by Isaac Lindell** — Short stories, think pieces, poems.
Built with Next.js 15 + Tailwind. Deployed via Vercel.

---

## Deploy in 3 steps

1. **Push to GitHub**
   ```bash
   git init && git add . && git commit -m "initial"
   git remote add origin https://github.com/YOUR_USERNAME/flesh-wound.git
   git push -u origin main
   ```

2. **Connect Vercel** — vercel.com → New Project → Import repo → Deploy

3. **Done.**

---

## Writing a new post

Create a `.md` file in `/posts`:

```md
---
title: "Your Post Title"
date: "2026-03-15"
category: "think-piece"
excerpt: "One sentence shown on homepage and archive."
readTime: "8 min read"
featured: false
---

Your content here. Standard markdown.

Use > blockquotes for pull quotes.
Use *italic* inside blockquotes for green accent.
```

**Categories:** `think-piece` | `short-story` | `poem`

Set `featured: true` on one post to feature it in the homepage hero.

---

## Local dev

```bash
npm install && npm run dev
```
