# DevelByte - Terminal Blog

Personal technical blog by Narendra Kumar covering distributed systems, databases, and machine learning infrastructure.

## Live Site

**[develbyte.in](https://develbyte.in)** - Minimal terminal-themed static blog

## Features

- **Terminal Aesthetic** - CRT-inspired design with scanlines and monospace fonts
- **Interactive Search** - Real-time post filtering on index page
- **Syntax Highlighting** - Prism.js support for 16+ programming languages
- **SEO Optimized** - Meta descriptions, Open Graph, Twitter Cards, structured data
- **Accessibility** - WCAG AA compliant with skip links, ARIA labels, reduced motion support
- **Security** - SRI hashes on all CDN resources, Content Security Policy headers
- **Zero Dependencies** - Pure HTML/CSS/JS, no build frameworks
- **GitHub Pages Ready** - Automatic deployment via GitHub Actions

## Local Development

### Quick Start

Open `index.html` directly in your browser - no build step required!

### Agent Workflow

- Read `AGENTS.md` for repo-specific agent instructions.
- Use `npm run build` after changing markdown, the post template, or generation logic.
- Use `npm run verify` before wrapping up to confirm source and generated files are in sync.

### Creating Blog Posts

1. **Create markdown file** in `blog/` directory:
   ```bash
   blog/YYYY-MM-DD-post-slug.md
   ```

2. **Add frontmatter**:
   ```yaml
   ---
   slug: post-slug
   title: Your Post Title
   authors: narendra
   tags: [tag1, tag2, tag3]
   ---

   Your post content here...
   ```

3. **Convert to HTML**:
   ```bash
   npm run convert
   # or
   node convert-posts.js
   ```

   This will:
   - Generate HTML for each post in `/{slug}/index.html`
   - Auto-update `index.html` with the post list
   - Generate `sitemap.xml`
   - Create `posts-metadata.json`

4. **Preview locally**:
    ```bash
    npm run serve
    # Open http://localhost:8000
    ```

### Verification

```bash
npm run verify
```

This checks that:
- required repo files exist
- blog posts have the expected frontmatter
- each markdown post has a generated `posts/<slug>/index.html`
- `posts-metadata.json` and `sitemap.xml` still reference the generated posts

### Deployment

GitHub Actions automatically:
- Converts markdown posts to HTML
- Generates sitemap and metadata
- Updates post listing
- Deploys to GitHub Pages

See `.github/workflows/deploy.yml` for details.

## Project Structure

```
/
├── index.html           # Blog listing with search
├── about.html          # About page
├── styles.css          # Complete styling system
├── script.js           # Interactive features
├── template-post.html  # Template for blog posts
├── convert-posts.js    # Markdown→HTML converter
├── robots.txt          # SEO crawl directives
├── sitemap.xml         # Auto-generated sitemap (14 posts)
├── posts-metadata.json # Auto-generated metadata
├── blog/              # Markdown source files
│   └── *.md
├── {slug}/            # Generated post directories
│   └── index.html
└── .github/
    └── workflows/
        └── deploy.yml  # Deployment automation
```

## Technical Details

- **Typography**: JetBrains Mono from Google Fonts
- **Syntax Highlighting**: Prism.js (16 languages with SRI hashes)
- **Build**: Node.js (markdown conversion only)
- **Hosting**: GitHub Pages
- **CI/CD**: GitHub Actions
- **SEO**: Sitemap, robots.txt, Open Graph, Twitter Cards, structured data
- **Security**: SRI hashes, CSP headers
- **Accessibility**: WCAG AA compliant, skip links, ARIA labels, reduced motion

See `CLAUDE.md` for complete technical documentation.

## Performance

- **First Contentful Paint**: Optimized with async scripts and resource preloads
- **Lighthouse Score**: 95+ (Performance, Accessibility, Best Practices, SEO)
- **No Build Step**: Open HTML files directly, works instantly

## License

- **Content**: All rights reserved
- **Code**: MIT License
