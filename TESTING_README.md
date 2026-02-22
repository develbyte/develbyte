# Testing Suite for develbyte.in

This directory contains comprehensive testing tools for the develbyte.in blog.

## Available Tests

### 1. Local Build Testing (Python)
**File:** `test_local.py`
**Purpose:** Tests the local `build/` directory before deployment

```bash
# Run local tests
python3 test_local.py

# Or make it executable and run directly
./test_local.py
```

**What it tests:**
- File structure (all required files present)
- HTML content (index.html, about.html)
- JavaScript functionality (search, code copy)
- CSS styles and variables
- Link validation
- CNAME configuration
- File sizes
- Post pages existence
- Basic accessibility

**When to use:** Run this BEFORE pushing to GitHub to catch issues early.

---

### 2. Production Site Testing (Python)
**File:** `test_production.py`
**Purpose:** Tests the live site at https://develbyte.in

```bash
# Run production tests
python3 test_production.py

# Or make it executable and run directly
./test_production.py
```

**Requirements:**
```bash
pip install requests beautifulsoup4
```

**What it tests:**
- Page availability (all pages load)
- Asset availability (CSS, JS, images)
- Content verification (homepage and about page)
- Meta tags and SEO
- Link validation
- HTTPS and security
- Performance (load times)
- Responsive design
- JavaScript functionality
- Basic accessibility
- Custom domain configuration
- Post pages (Docusaurus)

**When to use:** Run this AFTER deployment to verify the live site works correctly.

---

### 3. Shell Script Testing
**File:** `test-site.sh`
**Purpose:** Quick smoke tests using bash/curl

```bash
# Test production site
./test-site.sh https://develbyte.in

# Test local server (if running)
./test-site.sh http://localhost:3000
```

**What it tests:**
- HTTP status codes
- Basic content checks
- Asset availability
- Simple performance metrics

**When to use:** Quick verification without Python dependencies.

---

### 4. Comprehensive Testing Plan
**File:** `TESTING.md`
**Purpose:** Full manual testing checklist

This document contains a detailed testing plan covering:
- Visual & UI testing
- Functionality testing
- Responsive design
- Cross-browser testing
- Performance testing
- Accessibility testing
- SEO testing
- Deployment & infrastructure
- Security testing

**When to use:** For thorough manual testing before major releases.

---

## Testing Workflow

### Before Deployment
1. Make changes to code
2. Build the site: `npm run build`
3. Run local tests: `./test_local.py`
4. Fix any issues
5. Commit and push: `git push origin main`

### After Deployment
1. Wait for GitHub Actions to complete (~1 minute)
2. Run production tests: `./test_production.py`
3. Verify all critical tests pass
4. If issues found, fix and redeploy

### Weekly Maintenance
1. Run production tests: `./test_production.py`
2. Check for broken links
3. Verify site is accessible
4. Review any warnings

---

## Test Categories

### Critical Tests (Must Pass)
- Homepage loads (HTTP 200)
- About page loads (HTTP 200)
- All 5 post pages load
- Search functionality works
- CSS and JS files load
- HTTPS enabled
- CNAME file correct

### Important Tests (Should Pass)
- All content present (ASCII art, posts, profile image)
- Links not broken
- Meta tags present
- Performance < 2s load time
- External links have noopener
- Responsive design working

### Optional Tests (Nice to Have)
- Accessibility fully compliant
- All warnings resolved
- Perfect Lighthouse scores
- All post content validated

---

## Interpreting Results

### Exit Codes
- **0**: All tests passed or minor warnings only
- **1**: Some tests failed, investigation needed

### Color Codes
- **Green ✓**: Test passed
- **Red ✗**: Test failed
- **Yellow ⚠**: Warning (not critical but should be reviewed)
- **Blue ℹ**: Information only

---

## Common Issues and Solutions

### "Build directory not found"
**Solution:** Run `npm run build` first

### "Site is not reachable"
**Solution:**
- Check internet connection
- Verify site is deployed
- Wait for DNS propagation (up to 24 hours for new domains)

### "Some tests failed"
**Solution:**
1. Read the specific error messages
2. Check which tests failed
3. Fix the issues in source files
4. Rebuild and retest

### "Import Error: requests not found"
**Solution:**
```bash
pip install requests beautifulsoup4
```

---

## Advanced Usage

### Test Specific URL
```bash
# Test custom domain
./test-site.sh https://develbyte.in

# Test GitHub Pages URL
./test-site.sh https://develbyte.github.io
```

### Continuous Integration
Add to GitHub Actions workflow:

```yaml
- name: Run local tests
  run: python3 test_local.py

- name: Wait for deployment
  run: sleep 60

- name: Run production tests
  run: |
    pip install requests beautifulsoup4
    python3 test_production.py
```

### Automated Daily Checks
Set up a cron job:

```bash
# Run daily at 9 AM
0 9 * * * cd /path/to/develbyte && ./test_production.py >> test.log 2>&1
```

---

## Adding New Tests

### To add a test to `test_local.py`:
1. Add test function in appropriate section
2. Use `result.add_pass()` or `result.add_fail()`
3. Run and verify

Example:
```python
def test_new_feature(build_dir: Path, result: TestResult):
    """Test new feature"""
    if test_file_exists(build_dir, 'new_file.html', result):
        test_file_contains(
            build_dir,
            'new_file.html',
            'expected_content',
            result,
            'New feature content present'
        )
```

### To add a test to `test_production.py`:
1. Add test in appropriate section
2. Use helper functions: `test_url_loads()`, `test_content_contains()`
3. Run and verify

---

## Performance Benchmarks

### Expected Results

| Metric | Target | Acceptable | Poor |
|--------|--------|------------|------|
| Homepage load | < 1s | < 2s | > 3s |
| About page load | < 1s | < 2s | > 3s |
| Post page load | < 2s | < 3s | > 5s |
| CSS size | < 100KB | < 500KB | > 1MB |
| JS size | < 50KB | < 100KB | > 200KB |

---

## Troubleshooting

### Python version issues
Use Python 3.7+:
```bash
python3 --version
```

### Permission denied
Make scripts executable:
```bash
chmod +x test_local.py test_production.py test-site.sh
```

### Tests timing out
Increase timeout in production script (default: 10s)

### False positives
Some tests may fail temporarily due to:
- DNS propagation
- CDN caching
- Network issues
- Site deployment in progress

Wait a few minutes and retest.

---

## Support

- Full testing plan: `TESTING.md`
- GitHub Issues: https://github.com/develbyte/develbyte/issues
- Local testing troubleshooting: Check build/ directory exists

---

## Quick Reference

```bash
# Build
npm run build

# Test local build
./test_local.py

# Test production
./test_production.py

# Quick smoke test
./test-site.sh https://develbyte.in

# All tests
npm run build && ./test_local.py && ./test_production.py
```
