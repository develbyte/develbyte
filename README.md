# Terminal Blog

A minimal, terminal-themed blog design optimized for readability and technical content. Built for GitHub Pages with zero build dependencies.

## Features

- **Terminal Aesthetic**: Clean terminal design with minimal green accents and subtle scanline effects
- **Interactive Search**: Real-time post filtering on index page - search by title, tags, or excerpt
- **Optimized for Readability**: Light gray text on dark background with green only for accents
- **Full Content Support**: Text, code blocks, images, tables, lists, callouts, and more
- **GitHub Pages Ready**: Pure HTML/CSS/JS - no build step required
- **Responsive Design**: Works beautifully on all screen sizes
- **Accessible**: Semantic HTML, keyboard navigation, and proper ARIA labels

## Quick Start

1. Clone or download this repository
2. Edit `index.html` to add your blog posts
3. Create new post pages by copying `post.html`
4. Push to GitHub Pages or host anywhere

## File Structure

```
/
├── index.html       # Blog listing page
├── post.html        # Example post template
├── styles.css       # All styling
├── script.js        # Interactive features
└── README.md        # This file
```

## Creating New Posts

1. Copy `post.html` to a new file (e.g., `my-new-post.html`)
2. Update the content between `<article class="post-content">` tags
3. Update the meta information (title, date, tags)
4. Add an entry to `index.html` in the posts list

## Index Page Features

### Real-Time Search
The index page includes an interactive search prompt that filters posts as you type:
- Search across post titles, tags, and excerpts
- Instant results with match count display
- Highlighted search terms
- Keyboard-friendly (no mouse required)

## Supported Content Elements

### Text Formatting
- Paragraphs with optimal line length
- Headings (h2, h3)
- Bold, italic, links
- Inline code

### Code Blocks
- **Automatic syntax highlighting** powered by Prism.js
- Just add `class="language-xxx"` to code blocks
- 16+ languages supported out of the box
- IDE-style colors optimized for terminal theme
- Copy button functionality
- No manual span tags needed!

**Supported Languages:**
- Rust, JavaScript, TypeScript, Python
- Bash, Go, Java, C, C++
- JSON, YAML, TOML, SQL
- Docker, Markdown, and more

**Usage:**
```html
<pre><code class="language-rust">
fn main() {
    println!("Auto-highlighted!");
}
</code></pre>
```

**Color Scheme:**
- Keywords: Pink `#ff79c6`
- Functions: Green `#50fa7b`
- Strings: Yellow `#f1fa8c`
- Numbers: Purple `#bd93f9`
- Comments: Gray `#6a737d` (italic)
- Types: Cyan `#8be9fd`

### Images
- Full-width images with borders
- Image captions
- Lazy loading support

### Tables
- Responsive data tables
- Hover effects
- Numeric column alignment
- Highlight rows

### Lists
- Ordered and unordered lists
- Custom markers matching terminal theme
- Nested lists

### Callouts
- Info boxes
- Warning boxes
- Tip boxes
- Custom styled for terminal aesthetic

### Navigation
- Table of contents with smooth scroll
- Breadcrumb navigation
- Post footer navigation

## Customization

### Color Scheme

The design uses a minimal approach with light gray text and green accents. Edit CSS variables in `styles.css`:

```css
:root {
    --terminal-bg: #0a0e14;          /* Background */
    --terminal-fg: #c5d1d9;          /* Primary text (light gray) */
    --terminal-fg-bright: #e6eef5;   /* Bright text (headings) */
    --terminal-dim: #8b949e;         /* Dimmed text (meta info) */
    --terminal-accent: #00ff41;      /* Green accent (prompts, highlights) */
}
```

Color philosophy:
- **Main text**: Light gray (`#c5d1d9`) for readability
- **Accents**: Green (`#00ff41`) used sparingly for prompts and highlights
- **Tags**: Blue (`#58a6ff`) for visual variety
- **Avoid**: Overusing green - keep it minimal

### Typography

The design uses **JetBrains Mono** for authentic monospace feel. To change:

1. Update the Google Fonts import in HTML files
2. Update `--font-mono` variable in CSS

### Effects

Control visual effects in `styles.css`:
- **Scanlines**: Adjust opacity in `.scanlines` class
- **Glow**: Modify `text-shadow` values
- **Animations**: Edit `@keyframes` rules

## GitHub Pages Setup

1. Push this repository to GitHub
2. Go to Settings → Pages
3. Select branch and root folder
4. Your blog will be live at `https://username.github.io/repository-name/`

## Performance

- **Zero build dependencies** - just HTML/CSS/JS
- **Optimized fonts** - preconnect to Google Fonts
- **Lazy image loading** - images load as you scroll
- **Minimal JavaScript** - core functionality only
- **CSS-only animations** - hardware accelerated

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Accessibility

- Semantic HTML5 elements
- Proper heading hierarchy
- Keyboard navigation support
- Focus visible indicators
- High contrast ratios (WCAG AA compliant)
- Screen reader friendly

## License

Free to use for personal and commercial projects. Attribution appreciated but not required.

## Credits

- Design & Code: Built with Claude Code
- Font: JetBrains Mono (OFL License)
- Inspiration: Classic terminal emulators and CRT displays

## Support

For issues, questions, or suggestions, please open an issue on GitHub.

---

**Happy blogging!** 🖥️✨
