# Comprehensive Testing Plan - develbyte.in

Last Updated: 2026-02-22

## 1. Pre-Deployment Testing

### 1.1 Local Build Verification
- [ ] `npm ci` runs without errors
- [ ] `npm run build` completes successfully
- [ ] Build output in `build/` directory contains:
  - [ ] index.html (terminal blog)
  - [ ] about.html (terminal blog)
  - [ ] styles.css, script.js
  - [ ] favicon.svg, favicon.ico
  - [ ] CNAME file with "develbyte.in"
  - [ ] .nojekyll file
  - [ ] Docusaurus blog posts in respective directories

### 1.2 GitHub Actions Workflow
- [ ] Workflow file `.github/workflows/deploy.yml` is valid
- [ ] All steps in workflow are correctly ordered:
  1. Checkout
  2. Setup Node
  3. Install dependencies
  4. Build website (Docusaurus)
  5. Copy terminal blog files to build/
  6. Upload artifact
  7. Deploy to GitHub Pages

---

## 2. Visual & UI Testing

### 2.1 Index Page (Terminal Blog Landing)
**URL:** https://develbyte.in/

#### Layout & Structure
- [ ] Terminal window renders with proper dimensions
- [ ] Terminal header shows correct title: "narendra@develbyte: ~/blog"
- [ ] macOS-style buttons (close/minimize/maximize) display in header
- [ ] Scanlines overlay effect is visible and subtle
- [ ] ASCII art "DEVELBYTE" header renders correctly (RubiFont)
- [ ] Navigation links present: "posts" (active), "about"
- [ ] Blog info shows: "BLOG • 5 posts indexed • Last updated: 2025-11-15"
- [ ] Separator line renders properly

#### Search Functionality
- [ ] Search prompt shows: "guest@develbyte:~$"
- [ ] Input field displays placeholder text: "search posts..."
- [ ] Cursor block (█) appears at correct position (after prompt)
- [ ] Cursor blinks with animation
- [ ] Input field auto-focuses on page load (500ms delay)
- [ ] Typing removes cursor block
- [ ] Clearing input restores cursor block

#### Post Listings
- [ ] All 5 posts display in correct chronological order (newest first)
- [ ] Each post line shows:
  - [ ] Date in format `[YYYY-MM-DD]`
  - [ ] Post title (clickable link)
  - [ ] Tags (2-3 tags per post)
- [ ] Post links are properly formatted with trailing slashes
- [ ] Hover effect on post titles changes color to green

#### Search Filter Testing
- [ ] Search "distributed" - filters to show only distributed-systems posts
- [ ] Search "machine" - shows ML platform post only
- [ ] Search "zookeeper" - shows 2 zookeeper posts only
- [ ] Search "50PaperChallenge" - shows 3 paper review posts
- [ ] Search "nonexistent" - hides all posts
- [ ] Clear search - restores all posts
- [ ] Search is case-insensitive

#### Color Scheme
- [ ] Background: Dark terminal color (#0a0e14)
- [ ] Main text: Light gray (#c5d1d9)
- [ ] Bright text: Lighter gray (#e6eef5)
- [ ] Green accent used sparingly (#00ff41):
  - [ ] Cursor block
  - [ ] Prompt symbol
  - [ ] Link hover states

#### Typography
- [ ] JetBrains Mono font loads correctly
- [ ] Font weights (400, 500, 700) render properly
- [ ] Text is readable and properly spaced

### 2.2 About Page
**URL:** https://develbyte.in/about.html

#### Layout & Structure
- [ ] Terminal window renders correctly
- [ ] Terminal title: "narendra@develbyte: ~/about"
- [ ] ASCII art header displays
- [ ] Navigation shows "about" as active

#### Profile Section
- [ ] Profile image loads from: https://github.com/im-naren.png
- [ ] Image is circular with green border
- [ ] Image has green glow effect
- [ ] Profile image is responsive (120px on desktop)
- [ ] Name displays: "Narendra Kumar"
- [ ] Subtitle shows: "Systems builder. Platform tinkerer..."
- [ ] Profile section uses flexbox layout
- [ ] On mobile (<768px), image and text stack vertically

#### Content Sections
- [ ] "whoami" section displays bio
- [ ] "What I Write About" lists 4 topics with descriptions
- [ ] "Current Projects" shows #50PaperChallenge callout
- [ ] Paper reviews list shows 3 completed papers with links
- [ ] "Connect" section displays all contact info
- [ ] "Colophon" section explains blog tech stack

#### Contact Links
- [ ] GitHub: https://github.com/im-naren (opens in new tab)
- [ ] LinkedIn: https://linkedin.com/in/im-naren (opens in new tab)
- [ ] Email: mailto:naren.dubey@zoho.com
- [ ] Blog: https://develbyte.in
- [ ] Resume: /resume.pdf (opens in new tab)
- [ ] All links have proper rel="noopener noreferrer"

#### Paper Review Links
- [ ] Link 1: /why-write-amplification-not-just-throughput-shapes-modern-databases/
- [ ] Link 2: /why-latency-not-partitions-dictates-database-consistency/
- [ ] Link 3: /inside-modern-machine-learning-platforms/
- [ ] "View all paper reviews" link points to: /

#### Footer Navigation
- [ ] "← Back to posts" link works

### 2.3 Post Pages (Docusaurus Blog)

Test each post individually:

#### Post 1: Write Amplification
**URL:** https://develbyte.in/why-write-amplification-not-just-throughput-shapes-modern-databases/

- [ ] Page loads successfully (HTTP 200)
- [ ] Docusaurus layout renders correctly
- [ ] Post title displays
- [ ] Author info shows (Narendra Dubey)
- [ ] Date displays correctly
- [ ] Tags render properly
- [ ] Article content is readable
- [ ] Code blocks have syntax highlighting
- [ ] Images load (if any)
- [ ] Table of contents works (if present)
- [ ] Internal links function
- [ ] External links open in new tab
- [ ] Footer navigation present

#### Post 2: PACELC/Latency
**URL:** https://develbyte.in/why-latency-not-partitions-dictates-database-consistency/

- [ ] Same checks as Post 1

#### Post 3: ML Platforms
**URL:** https://develbyte.in/inside-modern-machine-learning-platforms/

- [ ] Same checks as Post 1

#### Post 4: Zookeeper Sessions
**URL:** https://develbyte.in/zookeeper-sessions-and-life-cycle/

- [ ] Same checks as Post 1

#### Post 5: Zookeeper Namespace
**URL:** https://develbyte.in/zookeeper-namespace-and-operations/

- [ ] Same checks as Post 1

---

## 3. Functionality Testing

### 3.1 Navigation Flow
- [ ] Index → About page
- [ ] About → Index page
- [ ] Index → Post 1 → Back to index
- [ ] Index → Post 2 → Back to index
- [ ] About page → Paper review links → Posts load
- [ ] Post page → Related posts navigation

### 3.2 JavaScript Functionality

#### Search (index.html)
- [ ] Real-time filtering works
- [ ] Debouncing (if implemented)
- [ ] Case-insensitive search
- [ ] Search by title works
- [ ] Search by tags works
- [ ] Hidden class toggles correctly
- [ ] Cursor visibility toggles on input

#### Code Copying (post.html, template-post.html)
- [ ] Copy button present on code blocks
- [ ] Click copies code to clipboard
- [ ] Button text changes to "copied!"
- [ ] Button reverts after 2 seconds
- [ ] Works across multiple code blocks
- [ ] Error handling for clipboard failures

#### Smooth Scrolling
- [ ] Anchor links scroll smoothly
- [ ] URL updates without page jump
- [ ] Works for table of contents (if present)

#### Keyboard Shortcuts
- [ ] Cmd/Ctrl + K focuses search (if implemented)
- [ ] Escape key behavior (if applicable)

### 3.3 Prism.js Syntax Highlighting

Test in template-post.html or actual posts:
- [ ] JavaScript highlighting works
- [ ] Rust highlighting works
- [ ] Python highlighting works
- [ ] Bash highlighting works
- [ ] Go highlighting works
- [ ] JSON highlighting works
- [ ] YAML highlighting works
- [ ] SQL highlighting works
- [ ] Line numbers display (if enabled)
- [ ] Color scheme matches terminal theme

### 3.4 Code Block UI

- [ ] macOS-style window header renders
- [ ] Three buttons (red, yellow, green) display correctly
- [ ] Language label shows in header
- [ ] Copy button positioned correctly
- [ ] Header height is 40px (sleek design)
- [ ] Code background contrasts with header
- [ ] Horizontal scrolling works for long lines
- [ ] Font size is readable (14px)

---

## 4. Responsive Design Testing

### 4.1 Desktop (≥1024px)
- [ ] Terminal window: max-width 900px, centered
- [ ] Post listings: full width layout
- [ ] Profile section: horizontal layout (image + text)
- [ ] Code blocks: readable without horizontal scroll (for reasonable line lengths)
- [ ] Navigation: all links visible
- [ ] Search input: full width

### 4.2 Tablet (768px - 1023px)
- [ ] Terminal window scales appropriately
- [ ] Post listings remain readable
- [ ] Profile section: may stack vertically
- [ ] Code blocks: horizontal scroll available
- [ ] Font sizes adjust
- [ ] Touch targets are adequate (min 44px)

### 4.3 Mobile (<768px)
- [ ] Terminal window: full width with padding
- [ ] Terminal header: buttons and title visible
- [ ] Search input: full width, keyboard accessible
- [ ] Post listings: stack vertically
- [ ] Tags wrap to new lines
- [ ] Profile image: centered, smaller size
- [ ] Profile text: centered below image
- [ ] Code blocks: horizontal scroll, smaller font
- [ ] Navigation: accessible
- [ ] Footer links: stacked or wrapped

### 4.4 Mobile Specific
- [ ] No horizontal overflow
- [ ] Text is readable without zooming
- [ ] Links are easily tappable
- [ ] Forms work with mobile keyboard
- [ ] Images don't exceed viewport width

---

## 5. Cross-Browser Testing

### 5.1 Chrome/Chromium
- [ ] Desktop: Latest version
- [ ] Mobile: Android Chrome

### 5.2 Firefox
- [ ] Desktop: Latest version
- [ ] Mobile: Firefox for Android

### 5.3 Safari
- [ ] Desktop: Latest macOS version
- [ ] Mobile: iOS Safari (iPhone, iPad)

### 5.4 Edge
- [ ] Desktop: Latest version

### 5.5 Browser-Specific Features
- [ ] CSS custom properties (variables) work
- [ ] CSS Grid layout renders correctly
- [ ] Flexbox layout works
- [ ] CSS animations (scanlines, cursor blink) function
- [ ] Web fonts load (JetBrains Mono)
- [ ] Clipboard API works (code copying)
- [ ] IntersectionObserver works (lazy loading)
- [ ] localStorage (if used)

---

## 6. Performance Testing

### 6.1 Load Time
- [ ] Index page loads in <2 seconds
- [ ] About page loads in <2 seconds
- [ ] Post pages load in <3 seconds
- [ ] No blocking resources
- [ ] Critical CSS inline (if applicable)

### 6.2 Asset Optimization
- [ ] Images optimized (reasonable file sizes)
- [ ] Profile image loads quickly
- [ ] SVG favicon is small (<5KB)
- [ ] CSS minified in production
- [ ] JavaScript minified in production
- [ ] No unused CSS/JS

### 6.3 Network Performance
- [ ] Test on 3G throttling
- [ ] Test on slow connection
- [ ] Progressive loading
- [ ] No render-blocking resources

### 6.4 Lighthouse Audit
Run on all pages:
- [ ] Performance score ≥90
- [ ] Accessibility score ≥90
- [ ] Best Practices score ≥90
- [ ] SEO score ≥90

### 6.5 Core Web Vitals
- [ ] LCP (Largest Contentful Paint) <2.5s
- [ ] FID (First Input Delay) <100ms
- [ ] CLS (Cumulative Layout Shift) <0.1

---

## 7. Accessibility Testing

### 7.1 Keyboard Navigation
- [ ] All interactive elements focusable with Tab
- [ ] Tab order is logical
- [ ] Focus indicators visible
- [ ] Skip to main content link (if present)
- [ ] No keyboard traps

### 7.2 Screen Reader Testing
Test with NVDA/JAWS/VoiceOver:
- [ ] Page title announced
- [ ] Headings structure logical (h1, h2, h3)
- [ ] Links have descriptive text
- [ ] Images have alt text
- [ ] Form inputs have labels
- [ ] ARIA labels used appropriately
- [ ] Landmark regions defined

### 7.3 Color Contrast
- [ ] Text contrast ratio ≥4.5:1 (normal text)
- [ ] Text contrast ratio ≥3:1 (large text)
- [ ] Link contrast sufficient
- [ ] Focus indicators contrast ≥3:1
- [ ] Check with browser DevTools

### 7.4 Semantic HTML
- [ ] Proper heading hierarchy
- [ ] Lists use <ul>/<ol> tags
- [ ] Links vs buttons used correctly
- [ ] <nav> for navigation
- [ ] <article> for blog posts
- [ ] <main> for main content

### 7.5 Zoom & Text Resize
- [ ] Layout works at 200% zoom
- [ ] No horizontal scrolling at 200% zoom
- [ ] Text remains readable
- [ ] Images scale appropriately

---

## 8. SEO Testing

### 8.1 Meta Tags
Check on each page:
- [ ] `<title>` tag present and unique
- [ ] Meta description present
- [ ] Canonical URL set
- [ ] Open Graph tags (og:title, og:description, og:image)
- [ ] Twitter Card tags
- [ ] Favicon links present

### 8.2 Content
- [ ] H1 present and unique per page
- [ ] Headings in logical order
- [ ] Internal links present
- [ ] External links have rel="noopener" (if target="_blank")
- [ ] Alt text on all images
- [ ] No broken links

### 8.3 Technical SEO
- [ ] robots.txt accessible (if needed)
- [ ] sitemap.xml present (Docusaurus generates)
- [ ] HTTPS enabled
- [ ] Custom domain configured (develbyte.in)
- [ ] No mixed content warnings
- [ ] Page speed optimized

### 8.4 Structured Data
- [ ] Schema.org markup (if implemented)
- [ ] Blog post schema
- [ ] Author schema
- [ ] BreadcrumbList (if applicable)

---

## 9. Deployment & Infrastructure

### 9.1 GitHub Pages
- [ ] Site accessible at https://develbyte.in
- [ ] Also works at https://develbyte.github.io (redirects)
- [ ] HTTPS enabled by default
- [ ] Custom domain DNS configured correctly
- [ ] CNAME file in build directory

### 9.2 DNS Configuration
- [ ] A records point to GitHub Pages IPs:
  - 185.199.108.153
  - 185.199.109.153
  - 185.199.110.153
  - 185.199.111.153
- [ ] CNAME record (if using www subdomain)
- [ ] DNS propagation complete (check multiple regions)

### 9.3 GitHub Actions
- [ ] Workflow runs on push to main
- [ ] Workflow can be manually triggered
- [ ] All steps complete successfully
- [ ] Deployment completes in <2 minutes
- [ ] No errors in workflow logs

### 9.4 Version Control
- [ ] All source files committed
- [ ] .gitignore excludes node_modules, build artifacts
- [ ] No sensitive data in repository
- [ ] Commit messages are descriptive
- [ ] Git history is clean

---

## 10. Content Accuracy

### 10.1 About Page Content
- [ ] Name: Narendra Kumar
- [ ] GitHub: @im-naren
- [ ] LinkedIn: in/im-naren
- [ ] Email: naren.dubey@zoho.com
- [ ] Blog URL: develbyte.in
- [ ] Bio information accurate
- [ ] Paper count accurate (3 papers listed)

### 10.2 Index Page Content
- [ ] Post count: 5 posts indexed
- [ ] Last updated date: 2025-11-15 (update if needed)
- [ ] All post titles accurate
- [ ] All dates correct
- [ ] Tags match post content

### 10.3 Post Content
- [ ] No typos in titles
- [ ] Dates accurate
- [ ] Author attribution correct
- [ ] Tags relevant to content
- [ ] Code examples work (if executable)

---

## 11. Error Handling

### 11.1 404 Page
- [ ] Custom 404 page exists (Docusaurus default or custom)
- [ ] 404 page styled appropriately
- [ ] Link back to homepage
- [ ] Search functionality (if applicable)

### 11.2 Broken Links
- [ ] No 404 errors on internal links
- [ ] External links valid (check manually or with tool)
- [ ] Image links work
- [ ] Asset links work

### 11.3 JavaScript Errors
- [ ] No console errors on index page
- [ ] No console errors on about page
- [ ] No console errors on post pages
- [ ] Graceful degradation if JS disabled

---

## 12. Security

### 12.1 HTTPS
- [ ] All pages load over HTTPS
- [ ] No mixed content warnings
- [ ] HSTS enabled (if configured)

### 12.2 External Links
- [ ] External links use rel="noopener noreferrer"
- [ ] No link injection vulnerabilities
- [ ] No XSS vulnerabilities

### 12.3 Dependencies
- [ ] No known vulnerabilities in npm packages
- [ ] Run `npm audit` and check results
- [ ] Dependencies up to date (or documented exceptions)

---

## 13. Edge Cases & Stress Testing

### 13.1 Long Content
- [ ] Very long post titles don't break layout
- [ ] Long code blocks scroll horizontally
- [ ] Many tags don't break layout
- [ ] Deeply nested content renders correctly

### 13.2 Empty States
- [ ] Search with no results shows appropriate message (or all posts hidden)
- [ ] Page with no tags handles gracefully

### 13.3 Special Characters
- [ ] Post titles with special characters (&, <, >, ", ')
- [ ] Code blocks with special characters
- [ ] Search with special characters

---

## 14. Automated Testing Scripts

### 14.1 Link Checker
```bash
# Install: npm install -g broken-link-checker
blc https://develbyte.in -ro
```

### 14.2 Lighthouse CI
```bash
# Run Lighthouse
npm install -g @lhci/cli
lhci autorun --collect.url=https://develbyte.in
lhci autorun --collect.url=https://develbyte.in/about.html
```

### 14.3 W3C Validator
```bash
# Validate HTML
curl https://develbyte.in | tidy -q -e
```

### 14.4 Accessibility Testing
```bash
# Install: npm install -g pa11y
pa11y https://develbyte.in
pa11y https://develbyte.in/about.html
```

---

## 15. Post-Deployment Checklist

### 15.1 Immediate Verification (Within 5 minutes)
- [ ] Site loads at custom domain
- [ ] GitHub Actions workflow completed successfully
- [ ] Latest commit hash matches deployed version
- [ ] No console errors on homepage

### 15.2 Quick Smoke Test (5-10 minutes)
- [ ] Homepage loads
- [ ] About page loads
- [ ] One post loads successfully
- [ ] Search works
- [ ] Profile image displays
- [ ] Contact links work

### 15.3 Full Regression Test (30-60 minutes)
- [ ] Run through full testing plan sections 2-8
- [ ] Check on mobile device
- [ ] Check on different browser
- [ ] Run Lighthouse audit

---

## 16. Monitoring & Maintenance

### 16.1 Regular Checks (Weekly)
- [ ] Site is accessible
- [ ] No broken links
- [ ] No console errors
- [ ] GitHub Actions still working

### 16.2 Monthly Reviews
- [ ] Update last modified date on index page (if new posts)
- [ ] Review analytics (if configured)
- [ ] Check for dependency updates
- [ ] Review and update this testing plan

### 16.3 Metrics to Track
- [ ] Uptime
- [ ] Page load times
- [ ] Error rates
- [ ] User feedback

---

## Test Execution Log

| Date | Tester | Pages Tested | Issues Found | Status |
|------|--------|--------------|--------------|--------|
| 2026-02-22 | - | All | TBD | Not Started |

---

## Known Issues

Document any known issues that are not critical:

1. **Issue:** [Describe issue]
   - **Impact:** [Low/Medium/High]
   - **Workaround:** [If any]
   - **Fix planned:** [Yes/No/Version]

---

## Testing Tools & Resources

### Browser DevTools
- Chrome DevTools
- Firefox Developer Tools
- Safari Web Inspector

### Online Tools
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [GTmetrix](https://gtmetrix.com/)
- [WebPageTest](https://www.webpagetest.org/)
- [W3C Markup Validator](https://validator.w3.org/)
- [WAVE Accessibility Checker](https://wave.webaim.org/)
- [Contrast Checker](https://webaim.org/resources/contrastchecker/)

### Command Line Tools
- `curl` - HTTP requests
- `broken-link-checker` - Link validation
- `lighthouse-ci` - Performance auditing
- `pa11y` - Accessibility testing

---

## Notes

- This testing plan should be updated as new features are added
- Not all tests need to be run for minor updates (use judgment)
- Automated tests are preferred where possible
- Document any deviations from this plan
