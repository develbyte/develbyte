# Quick Testing Guide

## Test Before Deploying (Local)

```bash
# 1. Build the site
npm run build

# 2. Run local tests (Python required)
python3 test_local.py
```

**Expected output:** All tests should pass (green ✓ marks)

---

## Test After Deploying (Production)

```bash
# Install dependencies first (one-time setup)
pip3 install --user requests beautifulsoup4 --break-system-packages

# Run production tests
python3 test_production.py
```

**Expected output:** 40+ tests passing with 0 failures

---

## Quick Smoke Test (No Python needed)

```bash
# Test the live site
./test-site.sh https://develbyte.in
```

This runs basic curl tests to verify:
- All pages load (HTTP 200)
- Content is present
- Assets are accessible
- HTTPS is working

---

## Manual Testing

### Test Individual Pages

```bash
# Homepage
curl -I https://develbyte.in/

# About page
curl -I https://develbyte.in/about.html

# Blog post
curl -I https://develbyte.in/why-write-amplification-not-just-throughput-shapes-modern-databases/
```

### Check Specific Content

```bash
# Verify profile image on about page
curl -s https://develbyte.in/about.html | grep "github.com/im-naren.png"

# Verify search functionality
curl -s https://develbyte.in/ | grep "search posts..."

# Verify post count
curl -s https://develbyte.in/ | grep "5 posts indexed"
```

---

## Troubleshooting

### Python libraries not installing
```bash
# Use --break-system-packages flag (macOS)
pip3 install --break-system-packages requests beautifulsoup4

# Or use --user flag
pip3 install --user requests beautifulsoup4
```

### Build directory not found
```bash
# Make sure you've built the site first
npm run build
```

### Tests failing
1. Check which specific test failed
2. Look at the error message
3. Verify the source files are correct
4. Rebuild: `npm run build`
5. Retest

---

## What Each Test Suite Checks

### test_local.py (70+ checks)
- ✓ File structure (index.html, about.html, CSS, JS, etc.)
- ✓ Homepage content (ASCII art, search, posts)
- ✓ About page content (profile, links, contact info)
- ✓ JavaScript functions (search, code copy)
- ✓ CSS variables and styles
- ✓ Link formats and validation
- ✓ CNAME configuration
- ✓ File sizes
- ✓ Post pages exist
- ✓ Basic accessibility

### test_production.py (50+ checks)
- ✓ All pages load (HTTP 200)
- ✓ Assets load (CSS, JS, images)
- ✓ Content verification
- ✓ Meta tags and SEO
- ✓ HTTPS enabled
- ✓ Security headers
- ✓ Performance (load times)
- ✓ Link validation
- ✓ Responsive design
- ✓ Custom domain works

### test-site.sh (30+ checks)
- ✓ Page availability
- ✓ Asset availability
- ✓ Basic content checks
- ✓ HTTPS enabled
- ✓ Performance metrics
- ✓ DNS resolution

---

## CI/CD Integration

Add to `.github/workflows/deploy.yml`:

```yaml
- name: Run local tests
  run: |
    python3 test_local.py

- name: Wait for deployment
  run: sleep 60

- name: Run production tests
  run: |
    pip3 install --break-system-packages requests beautifulsoup4
    python3 test_production.py
```

---

## Current Status

**Last Manual Test:** 2026-02-22

All key pages verified working:
- ✓ Homepage: https://develbyte.in/
- ✓ About page: https://develbyte.in/about.html
- ✓ Post pages: All 5 posts loading
- ✓ Assets: CSS, JS, favicons all loading
- ✓ Profile image: Using GitHub image (https://github.com/im-naren.png)
- ✓ Custom domain: develbyte.in working
- ✓ HTTPS: Enabled
