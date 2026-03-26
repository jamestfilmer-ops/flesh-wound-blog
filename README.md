# 'Tis but a Flesh Wound
### An Blog by Isaac Lindell

A static HTML/CSS/JS blog. British Racing Green palette. Editorial magazine layout.

---

## File Structure

```
flesh-wound-blog/
├── index.html              ← Homepage
├── vercel.json             ← Deployment config
├── css/
│   └── style.css           ← All styles (CSS variables at top)
├── js/
│   └── main.js             ← Progress bar, scroll effects, nav
├── stories/
│   ├── index.html          ← Stories archive
│   ├── dirt.html
│   └── greatest-beer-run.html
├── think-pieces/
│   ├── index.html          ← Think Pieces archive
│   └── rip-charlie-kirk.html
├── poems/
│   └── index.html          ← Poems archive (add posts here)
└── about/
    └── index.html          ← About page
```

---

## Deploy to Vercel (3 steps)

**Step 1 — Push to GitHub**
```bash
cd ~/Desktop/flesh-wound-blog
git init
git add .
git commit -m "Initial build"
gh repo create flesh-wound-blog --public --source=. --push
```

**Step 2 — Deploy on Vercel**
1. Go to vercel.com → New Project
2. Import your `flesh-wound-blog` GitHub repo
3. Framework Preset: **Other**
4. Output Directory: leave blank (root)
5. Click Deploy

**Step 3 — Done**
Your site is live. Connect a custom domain in Vercel's dashboard whenever you're ready.

---

## Adding New Posts

**New story:**
1. Copy `stories/dirt.html`
2. Rename it to `stories/your-title.html`
3. Update the title, eyebrow genre, meta date, and article content
4. Add it to `stories/index.html` archive list
5. Add it to the homepage card grid in `index.html`

**New think piece:**
Same pattern — copy `think-pieces/rip-charlie-kirk.html`

**New poem:**
Copy either article template. For poems, remove the drop-cap by adding `class="poem"` to the content div (you can add a `.poem p::first-letter` override in style.css to disable the drop cap).

---

## Pull Quotes
Anywhere in article content:
```html
<div class="pull-quote">Your best line from the piece.</div>
```

## Section Breaks
```html
<div class="ornament">· · ·</div>
```

---

## Migrating from Blogger

1. Go to https://lindellsblog.blogspot.com
2. Open each post
3. Copy the text
4. Paste into the appropriate HTML template
5. Wrap paragraphs in `<p>` tags
6. Add pull quotes and ornament dividers where they feel right

Read time calculates automatically from word count (~250 wpm).

---

## CSS Variables (top of style.css)
```css
--bg:         #F8F8F6   ← Page background (never change this)
--primary:    #0C3224   ← Racing Green
--secondary:  #1A4A38   ← Club Green
--accent1:    #C8A96E   ← Paddock Gold
--accent2:    #A08040   ← Brass
--text:       #1A1A18   ← Ink
--muted:      #B0ADA6   ← Metadata grey
--border:     #E6E4DF   ← Dividers
```
