# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a minimal, terminal-themed static blog designed for technical content. The project prioritizes:
- Clean terminal aesthetics with minimal green accents (light gray text, green for prompts/highlights)
- Interactive search on index page (real-time post filtering)
- Exceptional readability for long-form technical writing
- Minimal build dependencies (Node.js for markdown conversion, no frameworks)
- Comprehensive content support (code blocks, tables, images, callouts)

This project is a pure static site with zero framework dependencies. Blog posts are written in Markdown (`blog/*.md`) and converted to static HTML pages using `convert-posts.js`.

## Architecture

### Design Philosophy
- **Terminal-First**: All UI elements follow CRT terminal conventions (monospace fonts, prompt styling)
- **Minimal Green**: Light gray text (`#c5d1d9`) for readability, green (`#00ff41`) only for accents
- **Interactive**: Search functionality on index page for filtering posts in real-time
- **Content-Optimized**: Typography and spacing tuned for reading technical articles (1.7 line height, 850px max-width, JetBrains Mono)
- **Static-First**: No frameworks or build tools - works immediately on GitHub Pages

### File Structure
```
/
├── index.html       # Blog listing page with interactive search and post list
├── about.html       # About page with profile info
├── styles.css       # Complete styling system with CSS variables
├── script.js        # Interactive features (search, code copy, smooth scroll)
├── template-post.html  # Clean template for creating new posts
├── convert-posts.js # Markdown to HTML converter for blog posts
├── package.json     # Minimal build scripts (no dependencies)
├── blog/            # Markdown source files for blog posts
│   └── *.md         # Blog posts in markdown format with YAML frontmatter
├── posts/           # Generated HTML directories (one per blog post)
│   ├── {slug}/      # Individual post directory
│   │   └── index.html   # Terminal-themed blog post HTML
├── .github/         # GitHub Actions workflow for deployment
└── README.md        # User documentation
```

### Build Process

**Converting Blog Posts**:
- Blog posts are written as Markdown files in the `blog/` directory
- Each markdown file has YAML frontmatter with metadata (title, tags, slug, date)
- Run `node convert-posts.js` to convert all markdown posts to HTML
- This creates a directory for each post in `posts/` (e.g., `/posts/why-write-amplification.../index.html`)
- The conversion script uses `template-post.html` as the base template
- GitHub Actions runs this automatically on every push to main

**Deployment**:
- GitHub Actions workflow (`.github/workflows/deploy.yml`) handles deployment
- Runs `convert-posts.js` to generate post HTML from markdown
- Copies all static files and the `posts/` directory to `deploy/`
- Deploys to GitHub Pages from the `deploy/` directory

### Styling System

**CSS Architecture** (`styles.css`):
- CSS custom properties for theming (lines 1-40)
- Terminal window chrome (header with macOS-style buttons)
- CRT effects (scanlines overlay, phosphor glow via text-shadow)
- Content components (code blocks, tables, callouts, navigation)
- Responsive breakpoints at 768px

**Color Palette**:
- Primary text: `#c5d1d9` (light gray) - main content
- Bright text: `#e6eef5` (brighter gray) - headings
- Dimmed text: `#8b949e` (dim gray) - meta info
- Accent: `#00ff41` (green) - prompts, highlights, interactive elements
- Background: `#0a0e14` (near-black)
- Secondary accents: blue (`#58a6ff`) for tags, yellow (`#ffcc00`) for links
- **Important**: Green is used sparingly only for terminal prompts and accents

**Typography**:
- Font: JetBrains Mono (loaded via Google Fonts)
- Base size: 15px with 1.7 line height for body text
- Code blocks: 14px with 1.5 line height
- Monospace enforced throughout for terminal authenticity

### Content Components

**Supported Elements** (all styled in `post.html`):
1. **Code blocks**: **Automatic syntax highlighting via Prism.js**
   - Just add `class="language-xxx"` to `<code>` tags
   - 16+ languages: rust, javascript, typescript, python, bash, go, java, c, cpp, json, yaml, toml, sql, docker, markdown
   - Custom terminal color theme overrides Prism defaults (see `styles.css:648-759`)
   - Color scheme: pink keywords, green functions, yellow strings, purple numbers, gray comments
   - Copy button functionality built-in
2. **Tables**: Responsive with hover effects, numeric column alignment (`.num` class)
3. **Images**: Full-width with border/shadow effects, caption support
4. **Callouts**: Three types (info/warning/tip) with left border accent
5. **Lists**: Styled markers matching terminal theme
6. **TOC**: Auto-numbered with smooth scroll anchors

**Post Metadata**:
- Date in `YYYY-MM-DD` format (dimmed text)
- Tags with pill styling (blue background/border)
- Reading time estimation
- Breadcrumb navigation (`← cd ..`)

**Index Page Search**:
- Interactive search input styled as terminal prompt
- Real-time filtering of posts by title, tags, or excerpt
- Match counter display
- Implemented in `script.js` via `initializeSearch()` function
- Posts have `data-*` attributes for searchable content

## Common Development Tasks

### Creating New Blog Posts

**Method 1: Markdown (Recommended)**:
1. **Create markdown file**: Add new file to `blog/` with format `YYYY-MM-DD-post-slug.md`
2. **Add frontmatter**: Include YAML metadata at the top:
   ```yaml
   ---
   slug: post-slug
   title: Your Post Title
   authors: narendra
   tags: [tag1, tag2, tag3]
   ---
   ```
3. **Write content**: Use standard Markdown syntax (headers, code blocks, lists, etc.)
4. **Convert to HTML**: Run `node convert-posts.js` to generate HTML in `posts/{slug}/`
5. **Auto-update**: The script automatically updates `index.html` with the new post
6. **Test locally**: Open the generated `posts/{slug}/index.html` in a browser

**Method 2: Direct HTML** (for special layouts):
1. **Copy template**: Duplicate `template-post.html` to `posts/{slug}/index.html`
2. **Update meta tags**: Change `<title>` and post header metadata
3. **Replace content**: Edit inside `<article class="post-content">`
4. **Add to index**: Create new `<div class="post-line">` in `index.html`
5. **Fix paths**: Update `href` and `src` paths to use `../../` for root directory

### Customizing Colors

**Change color scheme** (edit CSS variables in `styles.css:1-25`):
```css
:root {
    --terminal-fg: #c5d1d9;        /* Main text (keep light gray) */
    --terminal-fg-bright: #e6eef5; /* Headings (bright gray) */
    --terminal-accent: #00ff41;    /* Accent color (green/amber/blue) */
}
```

Accent color alternatives (change `--terminal-accent` only):
- Amber terminal: `#ffb000`
- Blue terminal: `#58a6ff`
- Cyan terminal: `#39c5cf`
- Keep main text gray for readability!

### Modifying Visual Effects

**Scanlines intensity** (`styles.css:147`):
```css
.scanlines {
    opacity: 0.3; /* Lower = less visible */
}
```

**Disable CRT effects**: Remove or comment out `.scanlines` class (lines 147-161 in `styles.css`)

### Adding Syntax Highlighting to Code (Prism.js)

**Automatic highlighting** - no manual span tags needed:

1. Add `class="language-xxx"` to your `<code>` tag:
   ```html
   <pre><code class="language-rust">
   fn main() {
       println!("Hello!");
   }
   </code></pre>
   ```

2. **Supported languages** (loaded in post.html footer):
   - `language-rust` - Rust
   - `language-javascript` - JavaScript
   - `language-typescript` - TypeScript
   - `language-python` - Python
   - `language-bash` - Bash/Shell
   - `language-go` - Go
   - `language-java` - Java
   - `language-c` - C
   - `language-cpp` - C++
   - `language-json` - JSON
   - `language-yaml` - YAML
   - `language-toml` - TOML
   - `language-sql` - SQL
   - `language-docker` - Dockerfile
   - `language-markdown` - Markdown

3. **Adding more languages**:
   - Find language at https://prismjs.com/#supported-languages
   - Add script tag: `<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-LANG.min.js"></script>`

4. **Custom colors** defined in `styles.css:648-759`

5. See `post.html` for working examples

### Adding New Content Types

When adding new semantic elements:
1. Add HTML structure to `post.html` as example
2. Define styles in `styles.css` following existing patterns:
   - Use CSS variables for colors
   - Add terminal-appropriate borders/backgrounds
   - Include hover states for interactive elements
   - Ensure responsive behavior in `@media (max-width: 768px)`
3. Test readability with long-form content

## Technical Constraints

### GitHub Pages Compatibility
- No JSX, TypeScript, or build step
- No npm dependencies
- All assets must be static or from CDN (Google Fonts)
- Relative paths for all internal links

### Performance Requirements
- Inline critical CSS or keep single stylesheet
- Lazy load images via Intersection Observer (`script.js`)
- Use CSS animations over JavaScript for smooth 60fps
- Keep font files minimal (only required weights)

### Browser Support
- Modern browsers (Chrome 90+, Firefox 88+, Safari 14+)
- CSS Grid and Custom Properties required
- Graceful degradation for older browsers (scanlines hidden if not supported)

## Code Conventions

### HTML
- Semantic HTML5 (`<article>`, `<section>`, `<nav>`)
- BEM-inspired class naming (`.post-entry`, `.post-title`, `.code-block`)
- Accessibility: proper heading hierarchy, focus states, alt text

### CSS
- Organized by component (clear section comments)
- Mobile-first responsive design
- CSS custom properties for all theme values
- Avoid `!important` - use specificity correctly

### JavaScript
- Vanilla JS only (no frameworks)
- Progressive enhancement (works without JS)
- Event delegation for performance
- Console easter egg maintained for developer experience

## Design Principles

When modifying or extending:
1. **Minimal green usage**: Use light gray for text, green only for accents/prompts
2. **Maintain terminal authenticity**: All UI should feel like terminal output
3. **Prioritize readability**: Line length, spacing, and contrast are tuned for long reads
4. **Keep it minimal**: Only add features that serve content consumption
5. **Preserve zero-build**: Any additions must work in pure HTML/CSS/JS
6. **Test on mobile**: Terminal aesthetic must work on small screens (current breakpoint: 768px)

## Important Files

- `convert-posts.js` - Markdown to HTML converter (auto-generates post list, sitemap, metadata)
- `template-post.html` - Base template for generated blog posts (includes SRI hashes, SEO tags)
- `styles.css:1-45` - CSS variables (primary theming control point - minimal green!)
- `styles.css:147-161` - Scanlines effect
- `styles.css:1272-1323` - Accessibility features (skip-link, sr-only, reduced-motion)
- `script.js:9-48` - Search functionality with screen reader announcements
- `script.js:64-99` - Copy button functionality with event delegation and accessibility
- `index.html` - Auto-updated by convert-posts.js (post list, post count)
- `sitemap.xml` - Auto-generated by convert-posts.js (14 posts + 2 pages)
- `posts-metadata.json` - Auto-generated metadata for all posts
- `robots.txt` - SEO crawl directives
- `.github/workflows/deploy.yml` - GitHub Actions deployment workflow
