# Migration from Docusaurus to Terminal Theme

## What Changed

This blog has been migrated from Docusaurus to a custom terminal-themed static site. All blog posts now use the new terminal aesthetic with minimal green accents.

## Changes Made

### 1. Blog Post Conversion
- **Created**: `convert-posts.js` - Converts Markdown blog posts to terminal-themed HTML
- **Converted**: 14 blog posts from `blog/*.md` to individual HTML directories
- **Format**: Each post is now at `/{slug}/index.html` (e.g., `/why-write-amplification.../index.html`)

### 2. Build System
- **Updated**: `.github/workflows/deploy.yml` - Removed Docusaurus build, added markdown conversion
- **Updated**: `package.json` - Changed `build` script to run `convert-posts.js`
- **Added**: `npm run convert` script for manual post conversion
- **Added**: `npm run serve` script for local testing

### 3. Configuration
- **Updated**: `CLAUDE.md` - Added build process documentation
- **Updated**: `.gitignore` - Added `deploy/` directory to ignore list

### 4. Generated Files
Created 14 post directories with terminal-themed HTML:
- `why-write-amplification-not-just-throughput-shapes-modern-databases/`
- `why-latency-not-partitions-dictates-database-consistency/`
- `inside-modern-machine-learning-platforms/`
- `zookeeper-sessions-and-life-cycle/`
- `zookeeper-namespace-and-operations/`
- `zookeeper-introduction-to-zookeeper/`
- `message-queue/`
- `normalisation/`
- `how-to-sort-a-hashmap-on-values/`
- `how-to-implement-singly-linked-list-in-java/`
- `introduction-to-mapreduce/`
- `hdfs-architecture/`
- `mapreduce-execution-in-hadoop/`
- `how-to-find-out-next-and-previous-day-of-week-in-oracle/`

## How It Works Now

### Writing New Posts

1. **Create Markdown file** in `blog/` directory:
   ```bash
   # Format: YYYY-MM-DD-post-slug.md
   blog/2026-02-22-my-new-post.md
   ```

2. **Add YAML frontmatter**:
   ```yaml
   ---
   slug: my-new-post
   title: My Amazing Blog Post
   authors: narendra
   tags: [tag1, tag2, tag3]
   ---
   ```

3. **Write content** in Markdown:
   ```markdown
   ## Introduction

   Your content here...

   ```python
   def example():
       print("Code blocks work!")
   ```
   ```

4. **Convert to HTML**:
   ```bash
   npm run convert
   # or
   node convert-posts.js
   ```

5. **Add to index.html** (manual step):
   - Add a `<div class="post-line">` entry with slug, title, tags, and date

### Local Development

```bash
# Convert posts
npm run convert

# Start local server
npm run serve

# Open http://localhost:8000
```

### Deployment

Deployment is automatic via GitHub Actions:
1. Push to `main` branch
2. GitHub Actions runs `convert-posts.js`
3. Copies all static files and post directories to `deploy/`
4. Deploys to GitHub Pages

## What's Still There (But Not Used)

The following Docusaurus files remain for reference but are not used in the build:
- `docusaurus.config.ts` - Docusaurus configuration
- `src/` - Docusaurus source files
- Docusaurus scripts in `package.json` (prefixed with `docusaurus:`)

These can be removed if you no longer need Docusaurus, or kept for reference.

## Testing the Migration

1. **Check a converted post**:
   ```bash
   open why-write-amplification-not-just-throughput-shapes-modern-databases/index.html
   ```

2. **Verify terminal theme** is applied:
   - Scanlines effect visible
   - Green accents on prompts
   - Light gray text
   - Monospace font (JetBrains Mono)

3. **Test locally**:
   ```bash
   npm run serve
   # Visit http://localhost:8000/why-write-amplification-not-just-throughput-shapes-modern-databases/
   ```

## Benefits of Migration

1. **No Build Dependencies**: Just Node.js (already required for npm)
2. **Faster Builds**: No React compilation, just markdown to HTML conversion
3. **Terminal Aesthetic**: Consistent theme across all pages
4. **Simpler Maintenance**: Pure HTML/CSS/JS, no framework updates needed
5. **Better Performance**: Static HTML loads faster than React hydration

## Rollback Plan

If you need to rollback to Docusaurus:

1. Revert `.github/workflows/deploy.yml` to use `npm run docusaurus:build`
2. Update `package.json` to restore `build: "docusaurus build"`
3. The markdown source files in `blog/` are unchanged and will work with Docusaurus

## Next Steps

1. **Commit the changes**:
   ```bash
   git add .
   git commit -m "Migrate from Docusaurus to terminal theme"
   git push
   ```

2. **Verify deployment**: Check GitHub Actions runs successfully

3. **Optional cleanup**: Remove Docusaurus files if no longer needed:
   ```bash
   rm -rf src/
   rm docusaurus.config.ts
   # Update package.json to remove Docusaurus dependencies
   ```
