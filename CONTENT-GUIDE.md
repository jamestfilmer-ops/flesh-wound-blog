# 'Tis but a Flesh Wound — Content Cheat Sheet

## Adding a New Post (3 steps every time)

---

### STEP 1 — Copy the right template

| What you're writing | Template to copy | Save it as |
|---|---|---|
| Short story | `stories/TEMPLATE-new-story.html` | `stories/your-title.html` |
| Think piece | `think-pieces/TEMPLATE-new-think-piece.html` | `think-pieces/your-title.html` |
| Poem | `poems/TEMPLATE-new-poem.html` | `poems/your-title.html` |

Name the file with hyphens, all lowercase. Example: `stories/the-last-summer.html`

---

### STEP 2 — Fill in the template

Open the file in VS Code and change these things:

1. `<title>YOUR TITLE HERE` → your actual title
2. `<div class="article-eyebrow">` → Story / Think Piece / Poem
3. `<h1 class="article-title">YOUR TITLE HERE` → your actual title
4. `Mon DD, YYYY` → the date (e.g. `Mar 25, 2026`)
5. Paste your content between the `<div class="article-content">` tags
6. Wrap every paragraph in `<p>` tags
7. Update the two Related cards at the bottom to point to real posts

---

### STEP 3 — Add it to the archive index

Open the matching archive file and add a new entry:

**For a story** → open `stories/stories-index.html`, add inside `.archive-list`:
```html
<a href="your-title.html" style="display:block; color:inherit;">
  <div class="archive-item">
    <div>
      <div class="archive-item-genre">Story</div>
      <div class="archive-item-title">Your Title Here</div>
    </div>
    <div class="archive-item-date">Mar 25, 2026</div>
  </div>
</a>
```

Same pattern for think-pieces and poems — just open the right index file.

---

## Formatting Reference

### Pull quote (highlighted line)
```html
<div class="pull-quote">Your best line from the piece.</div>
```

### Section break ornament
```html
<div class="ornament">· · ·</div>
```

### Subheading inside an article
```html
<h2>Your Subheading</h2>
```

---

## Pushing to GitHub (every time you add a post)

```bash
cd ~/Desktop/flesh-wound-blog
git add .
git commit -m "Add: YOUR POST TITLE"
git push
```

That's it. Vercel auto-deploys within 30 seconds of every push.

---

## File Structure Reference

```
flesh-wound-blog/
├── index.html                          ← Homepage (update hero + cards when adding featured post)
├── css/style.css                       ← All styles — don't touch unless changing design
├── js/main.js                          ← All scripts — don't touch
├── stories/
│   ├── stories-index.html              ← Stories archive (add new entries here)
│   ├── TEMPLATE-new-story.html         ← Copy this for every new story
│   ├── dirt.html
│   └── greatest-beer-run.html
├── think-pieces/
│   ├── think-pieces-index.html         ← Think pieces archive
│   ├── TEMPLATE-new-think-piece.html   ← Copy this for every new think piece
│   └── rip-charlie-kirk.html
├── poems/
│   ├── poems-index.html                ← Poems archive
│   └── TEMPLATE-new-poem.html          ← Copy this for every new poem
└── about/
    └── about-index.html                ← Edit this to update your about page
```
