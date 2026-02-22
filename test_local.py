#!/usr/bin/env python3
"""
Local Build Testing Script for develbyte.in
Tests the build/ directory before deployment
"""

import os
import sys
import re
from pathlib import Path
from typing import List, Tuple
import mimetypes

# Colors for terminal output
class Colors:
    GREEN = '\033[0;32m'
    RED = '\033[0;31m'
    YELLOW = '\033[1;33m'
    BLUE = '\033[0;34m'
    BOLD = '\033[1m'
    NC = '\033[0m'  # No Color


class TestResult:
    def __init__(self):
        self.passed = 0
        self.failed = 0
        self.warnings = 0
        self.tests = []

    def add_pass(self, message: str):
        self.passed += 1
        self.tests.append(('PASS', message))
        print(f"{Colors.GREEN}✓{Colors.NC} {message}")

    def add_fail(self, message: str):
        self.failed += 1
        self.tests.append(('FAIL', message))
        print(f"{Colors.RED}✗{Colors.NC} {message}")

    def add_warn(self, message: str):
        self.warnings += 1
        self.tests.append(('WARN', message))
        print(f"{Colors.YELLOW}⚠{Colors.NC} {message}")

    def add_info(self, message: str):
        print(f"{Colors.BLUE}ℹ{Colors.NC} {message}")


def print_section(title: str):
    print(f"\n{Colors.YELLOW}{Colors.BOLD}[{title}]{Colors.NC}")
    print("─" * 50)


def test_file_exists(build_dir: Path, file_path: str, result: TestResult, description: str = None):
    """Test if a file exists in the build directory"""
    full_path = build_dir / file_path
    desc = description or f"File exists: {file_path}"

    if full_path.exists():
        result.add_pass(desc)
        return True
    else:
        result.add_fail(desc)
        return False


def test_file_contains(build_dir: Path, file_path: str, pattern: str, result: TestResult, description: str):
    """Test if a file contains a specific pattern"""
    full_path = build_dir / file_path

    if not full_path.exists():
        result.add_fail(f"{description} - File not found: {file_path}")
        return False

    try:
        with open(full_path, 'r', encoding='utf-8') as f:
            content = f.read()
            if pattern in content or re.search(pattern, content):
                result.add_pass(description)
                return True
            else:
                result.add_fail(f"{description} - Pattern not found: {pattern}")
                return False
    except Exception as e:
        result.add_fail(f"{description} - Error reading file: {e}")
        return False


def test_file_size(build_dir: Path, file_path: str, max_size_kb: int, result: TestResult):
    """Test if a file is within size limit"""
    full_path = build_dir / file_path

    if not full_path.exists():
        return

    size_bytes = full_path.stat().st_size
    size_kb = size_bytes / 1024

    if size_kb < max_size_kb:
        result.add_pass(f"{file_path}: {size_kb:.1f}KB (< {max_size_kb}KB)")
    else:
        result.add_warn(f"{file_path}: {size_kb:.1f}KB (> {max_size_kb}KB)")


def test_html_structure(build_dir: Path, file_path: str, result: TestResult):
    """Test HTML structure and required elements"""
    full_path = build_dir / file_path

    if not full_path.exists():
        return

    try:
        with open(full_path, 'r', encoding='utf-8') as f:
            content = f.read()

        # Required HTML elements
        required = {
            '<title>': f'{file_path} has title tag',
            'viewport': f'{file_path} has viewport meta tag',
            'charset': f'{file_path} has charset declaration',
        }

        for pattern, desc in required.items():
            if pattern in content:
                result.add_pass(desc)
            else:
                result.add_fail(desc)

    except Exception as e:
        result.add_fail(f"Error testing {file_path}: {e}")


def test_links(build_dir: Path, file_path: str, result: TestResult):
    """Test internal links in HTML file"""
    full_path = build_dir / file_path

    if not full_path.exists():
        return

    try:
        with open(full_path, 'r', encoding='utf-8') as f:
            content = f.read()

        # Find all href links
        links = re.findall(r'href=["\']([^"\']+)["\']', content)

        broken_links = []
        for link in links:
            # Skip external links, anchors, and mailto
            if link.startswith(('http://', 'https://', '#', 'mailto:')):
                continue

            # Remove leading slash for local path checking
            local_path = link.lstrip('/')

            # Check if file exists
            if not (build_dir / local_path).exists():
                broken_links.append(link)

        if broken_links:
            result.add_fail(f"{file_path} has broken links: {', '.join(broken_links[:3])}")
        else:
            result.add_pass(f"{file_path} has no broken internal links")

    except Exception as e:
        result.add_warn(f"Error checking links in {file_path}: {e}")


def main():
    print(f"{Colors.BLUE}{Colors.BOLD}═" * 60)
    print(f"LOCAL BUILD TESTING - develbyte.in")
    print(f"═" * 60 + f"{Colors.NC}\n")

    # Determine build directory
    build_dir = Path(__file__).parent / 'build'

    if not build_dir.exists():
        print(f"{Colors.RED}Error: Build directory not found: {build_dir}{Colors.NC}")
        print(f"{Colors.YELLOW}Run 'npm run build' first{Colors.NC}")
        sys.exit(1)

    print(f"{Colors.BLUE}Testing build directory: {build_dir}{Colors.NC}\n")

    result = TestResult()

    # ══════════════════════════════════════════════════════════
    # 1. FILE STRUCTURE TESTS
    # ══════════════════════════════════════════════════════════
    print_section("1. FILE STRUCTURE")

    required_files = [
        ('index.html', 'Terminal blog index page'),
        ('about.html', 'About page'),
        ('styles.css', 'CSS stylesheet'),
        ('script.js', 'JavaScript file'),
        ('favicon.svg', 'SVG favicon'),
        ('favicon.ico', 'ICO favicon'),
        ('CNAME', 'Custom domain file'),
        ('.nojekyll', 'Jekyll bypass file'),
    ]

    for file_path, desc in required_files:
        test_file_exists(build_dir, file_path, result, desc)

    # ══════════════════════════════════════════════════════════
    # 2. CONTENT VERIFICATION - INDEX PAGE
    # ══════════════════════════════════════════════════════════
    print_section("2. INDEX PAGE CONTENT")

    index_content = [
        ('DEVELBYTE', 'ASCII art header present'),
        ('guest@develbyte:~\\$', 'Search prompt correct'),
        ('5 posts indexed', 'Post count correct'),
        ('search posts...', 'Search placeholder present'),
        ('Why Write Amplification', 'Post 1 listed'),
        ('Inside Modern Machine Learning Platforms', 'Post 3 listed'),
        ('Zookeeper', 'Zookeeper posts listed'),
        ('JetBrains Mono', 'JetBrains Mono font loaded'),
    ]

    for pattern, desc in index_content:
        test_file_contains(build_dir, 'index.html', pattern, result, desc)

    # ══════════════════════════════════════════════════════════
    # 3. CONTENT VERIFICATION - ABOUT PAGE
    # ══════════════════════════════════════════════════════════
    print_section("3. ABOUT PAGE CONTENT")

    about_content = [
        ('Narendra Kumar', 'Name present'),
        ('github.com/im-naren', 'GitHub link correct'),
        ('naren.dubey@zoho.com', 'Email correct'),
        ('https://github.com/im-naren.png', 'GitHub profile image used'),
        ('#50PaperChallenge', 'Paper challenge mentioned'),
        ('profile-image', 'Profile image element present'),
        ('Systems builder', 'Subtitle present'),
    ]

    for pattern, desc in about_content:
        test_file_contains(build_dir, 'about.html', pattern, result, desc)

    # ══════════════════════════════════════════════════════════
    # 4. HTML STRUCTURE
    # ══════════════════════════════════════════════════════════
    print_section("4. HTML STRUCTURE")

    test_html_structure(build_dir, 'index.html', result)
    test_html_structure(build_dir, 'about.html', result)

    # ══════════════════════════════════════════════════════════
    # 5. JAVASCRIPT FUNCTIONALITY
    # ══════════════════════════════════════════════════════════
    print_section("5. JAVASCRIPT")

    js_features = [
        ('initializeSearch', 'Search initialization function'),
        ('copyCode', 'Code copy function'),
        ('addEventListener', 'Event listeners registered'),
        ('DOMContentLoaded', 'DOM ready handler'),
    ]

    for pattern, desc in js_features:
        test_file_contains(build_dir, 'script.js', pattern, result, desc)

    # ══════════════════════════════════════════════════════════
    # 6. CSS STYLES
    # ══════════════════════════════════════════════════════════
    print_section("6. CSS STYLES")

    css_features = [
        (':root', 'CSS variables defined'),
        ('--terminal-bg', 'Terminal background variable'),
        ('--terminal-accent', 'Accent color variable'),
        ('@media', 'Responsive media queries'),
        ('.terminal-window', 'Terminal window styles'),
        ('.search-prompt', 'Search prompt styles'),
        ('.code-block', 'Code block styles'),
        ('JetBrains Mono', 'Font family specified'),
    ]

    for pattern, desc in css_features:
        test_file_contains(build_dir, 'styles.css', pattern, result, desc)

    # ══════════════════════════════════════════════════════════
    # 7. LINK VALIDATION
    # ══════════════════════════════════════════════════════════
    print_section("7. LINK VALIDATION")

    # Check post links format
    test_file_contains(
        build_dir,
        'index.html',
        r'href="/[a-z-]+/"',
        result,
        'Post links use correct format (relative with trailing slash)'
    )

    # Check external links have noopener
    test_file_contains(
        build_dir,
        'about.html',
        'rel="noopener',
        result,
        'External links use noopener'
    )

    # ══════════════════════════════════════════════════════════
    # 8. CNAME CONFIGURATION
    # ══════════════════════════════════════════════════════════
    print_section("8. CUSTOM DOMAIN")

    test_file_contains(build_dir, 'CNAME', 'develbyte.in', result, 'CNAME contains correct domain')

    # ══════════════════════════════════════════════════════════
    # 9. FILE SIZES
    # ══════════════════════════════════════════════════════════
    print_section("9. FILE SIZES")

    test_file_size(build_dir, 'favicon.svg', 10, result)
    test_file_size(build_dir, 'favicon.ico', 50, result)
    test_file_size(build_dir, 'styles.css', 500, result)
    test_file_size(build_dir, 'script.js', 100, result)

    # ══════════════════════════════════════════════════════════
    # 10. POST PAGES (DOCUSAURUS)
    # ══════════════════════════════════════════════════════════
    print_section("10. BLOG POST PAGES")

    expected_posts = [
        'why-write-amplification-not-just-throughput-shapes-modern-databases',
        'why-latency-not-partitions-dictates-database-consistency',
        'inside-modern-machine-learning-platforms',
        'zookeeper-sessions-and-life-cycle',
        'zookeeper-namespace-and-operations',
    ]

    for post_slug in expected_posts:
        post_path = Path(post_slug) / 'index.html'
        if test_file_exists(build_dir, str(post_path), result, f"Post exists: {post_slug}"):
            # Test post content
            test_file_contains(
                build_dir,
                str(post_path),
                '<article',
                result,
                f"Post has article tag: {post_slug}"
            )

    # ══════════════════════════════════════════════════════════
    # 11. ACCESSIBILITY
    # ══════════════════════════════════════════════════════════
    print_section("11. ACCESSIBILITY (Basic)")

    accessibility_checks = [
        ('index.html', '<nav', 'Semantic nav element'),
        ('about.html', 'alt=', 'Images have alt text'),
        ('index.html', 'lang=', 'HTML lang attribute'),
    ]

    for file_path, pattern, desc in accessibility_checks:
        test_file_contains(build_dir, file_path, pattern, result, desc)

    # ══════════════════════════════════════════════════════════
    # SUMMARY
    # ══════════════════════════════════════════════════════════
    print(f"\n{Colors.BLUE}{Colors.BOLD}═" * 60)
    print("TEST SUMMARY")
    print(f"═" * 60 + f"{Colors.NC}\n")

    total = result.passed + result.failed
    print(f"{Colors.GREEN}Passed:{Colors.NC}   {result.passed} / {total}")
    print(f"{Colors.RED}Failed:{Colors.NC}   {result.failed} / {total}")
    print(f"{Colors.YELLOW}Warnings:{Colors.NC} {result.warnings}")

    if result.failed == 0:
        print(f"\n{Colors.GREEN}{Colors.BOLD}✓ All tests passed! Build is ready for deployment.{Colors.NC}")
        return 0
    else:
        print(f"\n{Colors.RED}{Colors.BOLD}✗ Some tests failed. Please fix issues before deploying.{Colors.NC}")
        return 1


if __name__ == '__main__':
    sys.exit(main())
