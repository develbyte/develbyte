#!/usr/bin/env node
/**
 * Convert markdown blog posts to terminal-themed HTML pages.
 * This script replaces the Docusaurus build process.
 */

const fs = require('fs');
const path = require('path');

const BLOG_DIR = path.join(__dirname, 'blog');
const OUTPUT_DIR = path.join(__dirname, 'posts');
const TEMPLATE_PATH = path.join(__dirname, 'template-post.html');

/**
 * Validate template exists before conversion
 */
function validateTemplate() {
    if (!fs.existsSync(TEMPLATE_PATH)) {
        console.error(`✗ Template not found: ${TEMPLATE_PATH}`);
        process.exit(1);
    }
}

/**
 * Parse YAML frontmatter from markdown content
 */
function parseFrontmatter(content) {
    if (!content.startsWith('---')) {
        console.warn('⚠ No frontmatter found, using defaults');
        return { metadata: {}, body: content };
    }

    const parts = content.split('---');
    if (parts.length < 3) {
        console.error('✗ Malformed frontmatter: expected at least 2 "---" separators');
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
 * Validate post metadata
 */
function validateMetadata(metadata, filename) {
    const errors = [];

    // Check slug
    if (!metadata.slug || typeof metadata.slug !== 'string') {
        errors.push('Missing or invalid slug');
    }

    // Check title
    if (!metadata.title || typeof metadata.title !== 'string') {
        errors.push('Missing or invalid title');
    }

    // Check tags
    if (metadata.tags && !Array.isArray(metadata.tags) && typeof metadata.tags !== 'string') {
        errors.push('Tags must be array or string');
    }

    if (errors.length > 0) {
        console.warn(`⚠ Validation warnings for ${filename}:\n  - ${errors.join('\n  - ')}`);
    }

    return errors.length === 0;
}

/**
 * Convert lists in markdown (handles mixed ul/ol correctly)
 */
function convertLists(html) {
    const lines = html.split('\n');
    const processed = [];
    let inList = false;
    let listType = null; // 'ul' or 'ol'

    for (let line of lines) {
        const ulMatch = line.match(/^[\*\-] (.+)$/);
        const olMatch = line.match(/^\d+\. (.+)$/);

        if (ulMatch) {
            if (!inList || listType !== 'ul') {
                if (inList) processed.push(`</${listType}>`);
                processed.push('<ul>');
                inList = true;
                listType = 'ul';
            }
            processed.push(`<li>${ulMatch[1]}</li>`);
        } else if (olMatch) {
            if (!inList || listType !== 'ol') {
                if (inList) processed.push(`</${listType}>`);
                processed.push('<ol>');
                inList = true;
                listType = 'ol';
            }
            processed.push(`<li>${olMatch[1]}</li>`);
        } else {
            if (inList) {
                processed.push(`</${listType}>`);
                inList = false;
                listType = null;
            }
            processed.push(line);
        }
    }

    if (inList) {
        processed.push(`</${listType}>`);
    }

    return processed.join('\n');
}

/**
 * Extract excerpt from content for meta description
 */
function extractExcerpt(content, maxLength = 150) {
    // Remove markdown formatting
    const plainText = content
        .replace(/```[\s\S]*?```/g, '') // Remove code blocks
        .replace(/[#*`>\-]/g, '') // Remove markdown syntax
        .replace(/\n+/g, ' ') // Replace newlines with spaces
        .trim();

    if (plainText.length <= maxLength) return plainText;

    return plainText.substring(0, maxLength).trim() + '...';
}

/**
 * Convert markdown tables to HTML
 */
function convertTables(html) {
    const lines = html.split('\n');
    const result = [];
    let i = 0;

    while (i < lines.length) {
        const line = lines[i];

        // Check if this line starts a table (starts with |)
        if (line.trim().startsWith('|')) {
            const tableLines = [];

            // Collect all consecutive table lines
            while (i < lines.length && lines[i].trim().startsWith('|')) {
                tableLines.push(lines[i]);
                i++;
            }

            if (tableLines.length >= 2) {
                // Parse table
                const headerRow = tableLines[0].split('|').filter(cell => cell.trim());
                const dataRows = tableLines.slice(2).map(row =>
                    row.split('|').filter(cell => cell.trim())
                );

                // Build HTML table
                let tableHtml = '<table>\n<thead>\n<tr>\n';
                headerRow.forEach(cell => {
                    tableHtml += `<th>${cell.trim()}</th>\n`;
                });
                tableHtml += '</tr>\n</thead>\n<tbody>\n';

                dataRows.forEach(row => {
                    tableHtml += '<tr>\n';
                    row.forEach(cell => {
                        tableHtml += `<td>${cell.trim()}</td>\n`;
                    });
                    tableHtml += '</tr>\n';
                });

                tableHtml += '</tbody>\n</table>';
                result.push(tableHtml);
            }
        } else {
            result.push(line);
            i++;
        }
    }

    return result.join('\n');
}

/**
 * Simple markdown to HTML conversion (basic features only)
 */
function markdownToHtml(md) {
    let html = md;

    // Remove <!--truncate--> markers
    html = html.replace(/<!--\s*truncate\s*-->/gi, '');

    // Convert tables (must come early to avoid conflicts)
    html = convertTables(html);

    // Convert headers (wrap ❯ in green span)
    html = html.replace(/^### (.*?)$/gm, (match, content) => {
        return `<h3>${content.replace(/❯/g, '<span class="terminal-prompt">❯</span>')}</h3>`;
    });
    html = html.replace(/^## (.*?)$/gm, (match, content) => {
        return `<h2>${content.replace(/❯/g, '<span class="terminal-prompt">❯</span>')}</h2>`;
    });
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
        <button class="code-copy" data-copy-btn aria-label="Copy code to clipboard">copy</button>
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

    // Handle bold+italic (***text***)
    html = html.replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>');
    // Handle bold (**text**)
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    // Handle italic (*text*)
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

    // Convert images (must come before links!)
    html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" loading="lazy">');

    // Convert links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

    // Convert lists (using improved function)
    html = convertLists(html);

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

    // Validate metadata
    const filename = path.basename(mdFile);
    validateMetadata(metadata, filename);

    // Extract metadata
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

    // Extract excerpt for meta description
    const excerpt = extractExcerpt(body);

    // Read template
    let html = fs.readFileSync(TEMPLATE_PATH, 'utf-8');

    // Replace placeholders
    html = html.replace(/YOUR POST TITLE HERE/g, title);
    html = html.replace(/\[POST EXCERPT - First 150 chars\]/g, excerpt);
    html = html.replace(/\[POST EXCERPT\]/g, excerpt);
    html = html.replace(/POST_SLUG/g, slug);
    html = html.replace(/YYYY-MM-DD/g, date);
    html = html.replace('tag1, tag2, tag3', tags.slice(0, 3).join(', ') || 'general');
    html = html.replace('X min read', readingTime);
    html = html.replace('./your-post-slug.md', `./${slug}/`);

    // Fix paths for posts/{slug}/ subdirectory (two levels deep)
    html = html.replace(/href="favicon\.svg"/g, 'href="../../favicon.svg"');
    html = html.replace(/href="favicon\.ico"/g, 'href="../../favicon.ico"');
    html = html.replace(/href="styles\.css"/g, 'href="../../styles.css"');
    html = html.replace(/src="script\.js"/g, 'src="../../script.js"');
    html = html.replace(/href="index\.html"/g, 'href="../../index.html"');

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
 * Generate sitemap.xml from post metadata
 */
function generateSitemap(postsInfo) {
    const baseURL = 'https://develbyte.in';
    const now = new Date().toISOString().split('T')[0];

    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <!-- Homepage -->
    <url>
        <loc>${baseURL}/</loc>
        <lastmod>${now}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
    </url>

    <!-- About page -->
    <url>
        <loc>${baseURL}/about.html</loc>
        <lastmod>${now}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>

`;

    // Add blog posts
    postsInfo.forEach(post => {
        xml += `    <!-- ${post.title} -->
    <url>
        <loc>${baseURL}/posts/${post.slug}/</loc>
        <lastmod>${post.date}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>

`;
    });

    xml += `</urlset>`;

    fs.writeFileSync(
        path.join(__dirname, 'sitemap.xml'),
        xml,
        'utf-8'
    );

    console.log('✓ Generated sitemap.xml');
}

/**
 * Update index.html with auto-generated post list
 */
function updateIndexHTML(postsInfo) {
    const indexPath = path.join(__dirname, 'index.html');
    let html = fs.readFileSync(indexPath, 'utf-8');

    // Update post count
    html = html.replace(
        /<span class="post-count">\d+<\/span>/,
        `<span class="post-count">${postsInfo.length}</span>`
    );

    // Generate post list HTML
    const postListHTML = postsInfo.map(post => {
        const tags = post.tags.slice(0, 3).map(tag =>
            `<span class="tag-compact">${tag}</span>`
        ).join('\n                            ');

        return `                    <div class="post-line" data-tags="${post.tags.join(' ')}" data-title="${post.title}">
                        <span class="post-date-compact">[${post.date}]</span>
                        <a href="/posts/${post.slug}/" class="post-title-compact">${post.title}</a>
                        <span class="post-tags-compact">
                            ${tags}
                        </span>
                    </div>`;
    }).join('\n\n');

    // Replace post list (find the posts-list-compact div and replace its contents)
    const startMarker = '<div class="posts-list-compact" id="postsList">';
    const endMarker = '</div>';

    const postListStart = html.indexOf(startMarker);
    if (postListStart === -1) {
        console.warn('⚠ Could not find posts list in index.html');
        return;
    }

    // Find the closing div for posts-list-compact
    let depth = 1;
    let pos = postListStart + startMarker.length;
    while (depth > 0 && pos < html.length) {
        if (html.substring(pos, pos + 5) === '<div ') {
            depth++;
        } else if (html.substring(pos, pos + 6) === '</div>') {
            depth--;
            if (depth === 0) break;
        }
        pos++;
    }

    if (depth !== 0) {
        console.warn('⚠ Could not find matching closing div for posts list');
        return;
    }

    html = html.substring(0, postListStart + startMarker.length) +
           '\n' + postListHTML + '\n                ' +
           html.substring(pos);

    fs.writeFileSync(indexPath, html, 'utf-8');
    console.log(`✓ Updated index.html with ${postsInfo.length} posts`);
}

/**
 * Main conversion function
 */
function main() {
    validateTemplate();
    console.log('Converting blog posts to terminal theme...\n');

    // Find all markdown files
    const files = fs.readdirSync(BLOG_DIR)
        .filter(f => f.endsWith('.md') && f !== 'authors.yml')
        .map(f => path.join(BLOG_DIR, f))
        .sort()
        .reverse(); // Newest first

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

    // Write posts metadata to JSON
    fs.writeFileSync(
        path.join(__dirname, 'posts-metadata.json'),
        JSON.stringify(postsInfo, null, 2),
        'utf-8'
    );

    console.log(`\n✓ Successfully converted ${postsInfo.length} posts`);

    // Generate sitemap
    generateSitemap(postsInfo);

    // Update index.html with post list
    updateIndexHTML(postsInfo);

    console.log('\nNext steps:');
    console.log('1. Posts are in posts/ directory (e.g., /posts/why-write-amplification.../)');
    console.log('2. Each directory contains an index.html file');
    console.log('3. index.html has been updated with the current post list');
    console.log('4. sitemap.xml has been generated');
}

if (require.main === module) {
    main();
}
