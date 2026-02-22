#!/usr/bin/env node
/**
 * Convert markdown blog posts to terminal-themed HTML pages.
 * This script replaces the Docusaurus build process.
 */

const fs = require('fs');
const path = require('path');

const BLOG_DIR = path.join(__dirname, 'blog');
const OUTPUT_DIR = __dirname;
const TEMPLATE_PATH = path.join(__dirname, 'template-post.html');

/**
 * Parse YAML frontmatter from markdown content
 */
function parseFrontmatter(content) {
    if (!content.startsWith('---')) {
        return { metadata: {}, body: content };
    }

    const parts = content.split('---');
    if (parts.length < 3) {
        return { metadata: {}, body: content };
    }

    const frontmatter = parts[1].trim();
    const body = parts.slice(2).join('---').trim();

    const metadata = {};
    frontmatter.split('\n').forEach(line => {
        const colonIndex = line.indexOf(':');
        if (colonIndex === -1) return;

        const key = line.substring(0, colonIndex).trim();
        let value = line.substring(colonIndex + 1).trim();

        // Handle arrays like [tag1, tag2, tag3]
        if (value.startsWith('[') && value.endsWith(']')) {
            value = value
                .slice(1, -1)
                .split(',')
                .map(v => v.trim())
                .filter(v => v);
        }

        metadata[key] = value;
    });

    return { metadata, body };
}

/**
 * Simple markdown to HTML conversion (basic features only)
 */
function markdownToHtml(md) {
    let html = md;

    // Remove <!--truncate--> markers
    html = html.replace(/<!--\s*truncate\s*-->/gi, '');

    // Convert headers
    html = html.replace(/^### (.*?)$/gm, '<h3>// $1</h3>');
    html = html.replace(/^## (.*?)$/gm, '<h2>> $1</h2>');
    html = html.replace(/^# (.*?)$/gm, '<h1>$1</h1>');

    // Convert code blocks with language
    html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
        const language = lang || 'text';
        const escapedCode = code
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');

        return `<div class="code-block">
    <div class="code-header">
        <div class="code-window-buttons">
            <span class="code-btn-close"></span>
            <span class="code-btn-minimize"></span>
            <span class="code-btn-maximize"></span>
        </div>
        <span class="code-lang">${language}</span>
        <button class="code-copy" onclick="copyCode(this)">copy</button>
    </div>
    <pre><code class="language-${language}">${escapedCode}</code></pre>
</div>`;
    });

    // Convert inline code
    html = html.replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>');

    // Convert blockquotes to callouts
    html = html.replace(/^> (.*?)$/gm, (match, content) => {
        // Strip any <i> tags within blockquotes
        content = content.replace(/<\/?i>/g, '');
        return `<div class="callout callout-info"><div class="callout-content">${content}</div></div>`;
    });

    // Convert bold
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // Convert italic
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

    // Convert links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

    // Convert unordered lists
    html = html.replace(/^[\*\-] (.+)$/gm, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>)/s, match => {
        return '<ul>' + match + '</ul>';
    });

    // Convert ordered lists
    html = html.replace(/^\d+\. (.+)$/gm, '<li>$1</li>');

    // Convert paragraphs (text not already in tags)
    const lines = html.split('\n');
    const processed = [];
    let inParagraph = false;
    let paragraph = [];

    for (let line of lines) {
        const trimmed = line.trim();

        // Skip empty lines
        if (!trimmed) {
            if (inParagraph) {
                processed.push('<p>' + paragraph.join(' ') + '</p>');
                paragraph = [];
                inParagraph = false;
            }
            continue;
        }

        // Check if line is already wrapped in a tag
        if (trimmed.startsWith('<')) {
            if (inParagraph) {
                processed.push('<p>' + paragraph.join(' ') + '</p>');
                paragraph = [];
                inParagraph = false;
            }
            processed.push(line);
        } else {
            // Part of a paragraph
            paragraph.push(trimmed);
            inParagraph = true;
        }
    }

    if (inParagraph) {
        processed.push('<p>' + paragraph.join(' ') + '</p>');
    }

    html = processed.join('\n');

    return html;
}

/**
 * Estimate reading time based on word count
 */
function estimateReadingTime(content) {
    const words = content.split(/\s+/).length;
    const minutes = Math.max(1, Math.round(words / 200));
    return `${minutes} min read`;
}

/**
 * Extract title from filename
 */
function extractTitleFromFilename(filename) {
    const name = filename
        .replace(/^\d{4}-\d{2}-\d{2}-/, '')
        .replace(/\.md$/, '')
        .replace(/-/g, ' ');

    return name
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

/**
 * Convert a single markdown file to HTML
 */
function convertPost(mdFile) {
    const content = fs.readFileSync(mdFile, 'utf-8');
    const { metadata, body } = parseFrontmatter(content);

    // Extract metadata
    const filename = path.basename(mdFile);
    const slug = metadata.slug || filename.replace(/\.md$/, '');
    const title = metadata.title || extractTitleFromFilename(filename);
    let tags = metadata.tags || [];
    if (typeof tags === 'string') {
        tags = tags.split(',').map(t => t.trim());
    }

    // Extract date from filename
    const dateMatch = filename.match(/^(\d{4})-(\d{2})-(\d{2})/);
    const date = dateMatch ? `${dateMatch[1]}-${dateMatch[2]}-${dateMatch[3]}` : 'Unknown';

    // Convert markdown to HTML
    const htmlContent = markdownToHtml(body);

    // Calculate reading time
    const readingTime = estimateReadingTime(body);

    // Read template
    let html = fs.readFileSync(TEMPLATE_PATH, 'utf-8');

    // Replace placeholders
    html = html.replace(/YOUR POST TITLE HERE/g, title);
    html = html.replace('YYYY-MM-DD', date);
    html = html.replace('tag1, tag2, tag3', tags.slice(0, 3).join(', ') || 'general');
    html = html.replace('X min read', readingTime);
    html = html.replace('./your-post-slug.md', `./${slug}/`);

    // Fix paths for subdirectory posts
    html = html.replace(/href="favicon\.svg"/g, 'href="../favicon.svg"');
    html = html.replace(/href="favicon\.ico"/g, 'href="../favicon.ico"');
    html = html.replace(/href="styles\.css"/g, 'href="../styles.css"');
    html = html.replace(/src="script\.js"/g, 'src="../script.js"');
    html = html.replace(/href="index\.html"/g, 'href="../index.html"');

    // Insert content
    const contentStart = html.indexOf('<!-- START YOUR CONTENT HERE -->');
    const contentEnd = html.indexOf('<!-- END YOUR CONTENT HERE -->');

    if (contentStart !== -1 && contentEnd !== -1) {
        html =
            html.substring(0, contentStart + '<!-- START YOUR CONTENT HERE -->'.length) +
            '\n' + htmlContent + '\n' +
            html.substring(contentEnd);
    }

    // Create output directory
    const outputDir = path.join(OUTPUT_DIR, slug);
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    // Write HTML file
    const outputFile = path.join(outputDir, 'index.html');
    fs.writeFileSync(outputFile, html, 'utf-8');

    console.log(`✓ Converted: ${filename} -> ${slug}/index.html`);

    return { slug, title, date, tags, readingTime };
}

/**
 * Main conversion function
 */
function main() {
    console.log('Converting blog posts to terminal theme...\n');

    // Find all markdown files
    const files = fs.readdirSync(BLOG_DIR)
        .filter(f => f.endsWith('.md') && f !== 'authors.yml')
        .map(f => path.join(BLOG_DIR, f))
        .sort();

    if (files.length === 0) {
        console.log('No markdown files found in blog/');
        return;
    }

    // Convert all posts
    const postsInfo = [];
    for (const file of files) {
        try {
            const info = convertPost(file);
            postsInfo.push(info);
        } catch (error) {
            console.error(`✗ Error converting ${path.basename(file)}:`, error.message);
        }
    }

    console.log(`\n✓ Successfully converted ${postsInfo.length} posts`);
    console.log('\nNext steps:');
    console.log('1. Posts are in individual directories (e.g., /why-write-amplification.../)');
    console.log('2. Each directory contains an index.html file');
    console.log('3. The index.html already links to these directories');
    console.log('4. Update GitHub Actions workflow to remove Docusaurus');
}

if (require.main === module) {
    main();
}
