#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const ROOT_DIR = __dirname;
const BLOG_DIR = path.join(ROOT_DIR, 'blog');
const POSTS_DIR = path.join(ROOT_DIR, 'posts');
const METADATA_PATH = path.join(ROOT_DIR, 'posts-metadata.json');
const SITEMAP_PATH = path.join(ROOT_DIR, 'sitemap.xml');

const requiredRootFiles = [
    'index.html',
    'about.html',
    'styles.css',
    'script.js',
    'template-post.html',
    'convert-posts.js',
    'posts-metadata.json',
    'sitemap.xml'
];

function fail(message) {
    console.error(`✗ ${message}`);
}

function pass(message) {
    console.log(`✓ ${message}`);
}

function parseFrontmatter(content) {
    if (!content.startsWith('---\n') && !content.startsWith('---\r\n')) {
        return null;
    }

    const separatorMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
    if (!separatorMatch) {
        return null;
    }

    const metadata = {};
    for (const rawLine of separatorMatch[1].split(/\r?\n/)) {
        const line = rawLine.trim();
        if (!line) {
            continue;
        }

        const separatorIndex = line.indexOf(':');
        if (separatorIndex === -1) {
            continue;
        }

        const key = line.slice(0, separatorIndex).trim();
        let value = line.slice(separatorIndex + 1).trim();

        if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith('\'') && value.endsWith('\''))) {
            value = value.slice(1, -1);
        }

        if (value.startsWith('[') && value.endsWith(']')) {
            value = value
                .slice(1, -1)
                .split(',')
                .map((item) => item.trim())
                .filter(Boolean)
                .map((item) => item.replace(/^['"]|['"]$/g, ''));
        }

        metadata[key] = value;
    }

    return metadata;
}

function main() {
    const errors = [];

    for (const file of requiredRootFiles) {
        const filePath = path.join(ROOT_DIR, file);
        if (!fs.existsSync(filePath)) {
            errors.push(`Missing required file: ${file}`);
        }
    }

    if (!fs.existsSync(BLOG_DIR)) {
        errors.push('Missing blog/ directory');
    }

    if (!fs.existsSync(POSTS_DIR)) {
        errors.push('Missing posts/ directory');
    }

    let metadataEntries = [];
    let metadataSlugs = new Set();
    let sitemap = '';

    if (fs.existsSync(METADATA_PATH)) {
        try {
            metadataEntries = JSON.parse(fs.readFileSync(METADATA_PATH, 'utf8'));
            metadataSlugs = new Set(metadataEntries.map((entry) => entry.slug).filter(Boolean));
        } catch (error) {
            errors.push(`Invalid posts-metadata.json: ${error.message}`);
        }
    }

    if (fs.existsSync(SITEMAP_PATH)) {
        sitemap = fs.readFileSync(SITEMAP_PATH, 'utf8');
    }

    const markdownFiles = fs.existsSync(BLOG_DIR)
        ? fs.readdirSync(BLOG_DIR).filter((file) => file.endsWith('.md')).sort()
        : [];

    if (markdownFiles.length === 0) {
        errors.push('No markdown posts found in blog/');
    }

    for (const file of markdownFiles) {
        const filePath = path.join(BLOG_DIR, file);
        const content = fs.readFileSync(filePath, 'utf8');
        const metadata = parseFrontmatter(content);

        if (!metadata) {
            errors.push(`${file}: missing or malformed frontmatter`);
            continue;
        }

        for (const field of ['slug', 'title', 'authors', 'tags']) {
            if (metadata[field] === undefined || metadata[field] === '') {
                errors.push(`${file}: missing required frontmatter field '${field}'`);
            }
        }

        if (!metadata.slug || typeof metadata.slug !== 'string') {
            continue;
        }

        const generatedPostPath = path.join(POSTS_DIR, metadata.slug, 'index.html');
        if (!fs.existsSync(generatedPostPath)) {
            errors.push(`${file}: missing generated file posts/${metadata.slug}/index.html`);
        }

        if (metadataEntries.length > 0 && !metadataSlugs.has(metadata.slug)) {
            errors.push(`${file}: slug '${metadata.slug}' missing from posts-metadata.json`);
        }

        if (sitemap && !sitemap.includes(`/posts/${metadata.slug}/`)) {
            errors.push(`${file}: slug '${metadata.slug}' missing from sitemap.xml`);
        }
    }

    if (metadataEntries.length > 0) {
        for (const entry of metadataEntries) {
            if (!entry.slug || !entry.title) {
                errors.push('posts-metadata.json contains an entry missing slug or title');
                continue;
            }

            const generatedPostPath = path.join(POSTS_DIR, entry.slug, 'index.html');
            if (!fs.existsSync(generatedPostPath)) {
                errors.push(`posts-metadata.json references missing file posts/${entry.slug}/index.html`);
            }
        }
    }

    if (errors.length > 0) {
        errors.forEach(fail);
        process.exit(1);
    }

    pass(`Verified ${markdownFiles.length} markdown posts`);
    pass('Verified required root files');
    pass('Verified generated posts, metadata, and sitemap references');
}

main();
