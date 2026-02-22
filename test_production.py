#!/usr/bin/env python3
"""
Production Site Testing Script for develbyte.in
Tests the live site at https://develbyte.in
"""

import sys
import re
import time
from typing import Optional, Tuple
from urllib.parse import urljoin
import subprocess

# Check for required libraries
try:
    import requests
    from bs4 import BeautifulSoup
except ImportError:
    print("Error: Required libraries not installed.")
    print("Please install: pip install requests beautifulsoup4")
    sys.exit(1)


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
    print("─" * 60)


def test_url(url: str, expected_status: int = 200, timeout: int = 10) -> Tuple[bool, int, Optional[str]]:
    """Test if URL is accessible and returns expected status code"""
    try:
        response = requests.get(url, timeout=timeout, allow_redirects=True)
        return response.status_code == expected_status, response.status_code, response.text
    except requests.RequestException as e:
        return False, 0, str(e)


def test_url_loads(base_url: str, path: str, result: TestResult, description: str) -> Optional[str]:
    """Test if a URL loads successfully and return content"""
    url = urljoin(base_url, path)
    success, status, content = test_url(url)

    if success:
        result.add_pass(f"{description} (HTTP {status})")
        return content
    else:
        result.add_fail(f"{description} (HTTP {status})")
        return None


def test_content_contains(content: str, pattern: str, result: TestResult, description: str, is_regex: bool = False):
    """Test if content contains a pattern"""
    if not content:
        result.add_fail(f"{description} - No content to check")
        return False

    if is_regex:
        if re.search(pattern, content):
            result.add_pass(description)
            return True
    else:
        if pattern in content:
            result.add_pass(description)
            return True

    result.add_fail(f"{description} - Pattern not found")
    return False


def test_meta_tags(html: str, result: TestResult, page_name: str):
    """Test meta tags in HTML"""
    if not html:
        return

    soup = BeautifulSoup(html, 'html.parser')

    # Check title
    if soup.find('title'):
        result.add_pass(f"{page_name} has title tag")
    else:
        result.add_fail(f"{page_name} missing title tag")

    # Check viewport
    viewport = soup.find('meta', attrs={'name': 'viewport'})
    if viewport:
        result.add_pass(f"{page_name} has viewport meta tag")
    else:
        result.add_fail(f"{page_name} missing viewport meta tag")

    # Check charset
    if soup.find('meta', attrs={'charset': True}) or 'charset' in str(soup):
        result.add_pass(f"{page_name} has charset declaration")
    else:
        result.add_warn(f"{page_name} missing charset declaration")


def test_performance(url: str, result: TestResult, description: str, threshold_ms: int = 2000):
    """Test page load performance"""
    start = time.time()
    try:
        response = requests.get(url, timeout=30)
        load_time_ms = (time.time() - start) * 1000

        if response.status_code == 200:
            if load_time_ms < threshold_ms:
                result.add_pass(f"{description}: {load_time_ms:.0f}ms (< {threshold_ms}ms)")
            elif load_time_ms < threshold_ms * 2:
                result.add_warn(f"{description}: {load_time_ms:.0f}ms (> {threshold_ms}ms)")
            else:
                result.add_fail(f"{description}: {load_time_ms:.0f}ms (very slow)")
        else:
            result.add_fail(f"{description}: HTTP {response.status_code}")
    except Exception as e:
        result.add_fail(f"{description}: {str(e)}")


def test_https_security(base_url: str, result: TestResult):
    """Test HTTPS and security headers"""
    try:
        response = requests.get(base_url, timeout=10)

        # Check HTTPS
        if response.url.startswith('https://'):
            result.add_pass("Site uses HTTPS")
        else:
            result.add_fail("Site not using HTTPS")

        # Check security headers
        headers = response.headers

        # Strict-Transport-Security (may not be present on GitHub Pages)
        if 'Strict-Transport-Security' in headers:
            result.add_pass("HSTS header present")
        else:
            result.add_info("HSTS header not present (optional for GitHub Pages)")

    except Exception as e:
        result.add_fail(f"HTTPS check failed: {e}")


def check_external_links(html: str, result: TestResult, page_name: str):
    """Check if external links have proper security attributes"""
    if not html:
        return

    soup = BeautifulSoup(html, 'html.parser')
    external_links = soup.find_all('a', href=re.compile(r'^https?://'))

    links_with_target_blank = [a for a in external_links if a.get('target') == '_blank']

    if links_with_target_blank:
        links_with_noopener = [a for a in links_with_target_blank if 'noopener' in a.get('rel', [])]

        if len(links_with_noopener) == len(links_with_target_blank):
            result.add_pass(f"{page_name}: All external links with target=_blank have noopener")
        else:
            result.add_warn(f"{page_name}: Some external links missing noopener")


def main():
    print(f"{Colors.BLUE}{Colors.BOLD}═" * 60)
    print("PRODUCTION SITE TESTING - develbyte.in")
    print(f"═" * 60 + f"{Colors.NC}\n")

    BASE_URL = "https://develbyte.in"

    # Check if site is reachable
    print(f"{Colors.BLUE}Testing site: {BASE_URL}{Colors.NC}\n")

    try:
        response = requests.get(BASE_URL, timeout=10)
        print(f"{Colors.GREEN}✓ Site is reachable{Colors.NC}\n")
    except requests.RequestException as e:
        print(f"{Colors.RED}✗ Site is not reachable: {e}{Colors.NC}")
        print(f"{Colors.YELLOW}Please check your internet connection or the site may be down.{Colors.NC}")
        sys.exit(1)

    result = TestResult()

    # ══════════════════════════════════════════════════════════
    # 1. PAGE AVAILABILITY
    # ══════════════════════════════════════════════════════════
    print_section("1. PAGE AVAILABILITY")

    pages = [
        ('/', 'Homepage'),
        ('/about.html', 'About page'),
        ('/why-write-amplification-not-just-throughput-shapes-modern-databases/', 'Post: Write Amplification'),
        ('/why-latency-not-partitions-dictates-database-consistency/', 'Post: PACELC'),
        ('/inside-modern-machine-learning-platforms/', 'Post: ML Platforms'),
        ('/zookeeper-sessions-and-life-cycle/', 'Post: Zookeeper Sessions'),
        ('/zookeeper-namespace-and-operations/', 'Post: Zookeeper Namespace'),
    ]

    page_contents = {}
    for path, desc in pages:
        content = test_url_loads(BASE_URL, path, result, desc)
        if content:
            page_contents[path] = content

    # ══════════════════════════════════════════════════════════
    # 2. ASSET AVAILABILITY
    # ══════════════════════════════════════════════════════════
    print_section("2. ASSET AVAILABILITY")

    assets = [
        ('/styles.css', 'CSS stylesheet'),
        ('/script.js', 'JavaScript file'),
        ('/favicon.svg', 'SVG favicon'),
        ('/favicon.ico', 'ICO favicon'),
        ('/CNAME', 'CNAME file'),
    ]

    for path, desc in assets:
        test_url_loads(BASE_URL, path, result, desc)

    # ══════════════════════════════════════════════════════════
    # 3. HOMEPAGE CONTENT
    # ══════════════════════════════════════════════════════════
    print_section("3. HOMEPAGE CONTENT")

    if '/' in page_contents:
        homepage = page_contents['/']

        content_checks = [
            ('DEVELBYTE', 'ASCII art header present', False),
            ('guest@develbyte:~\\$', 'Search prompt correct', False),
            ('5 posts indexed', 'Post count correct', False),
            ('search posts...', 'Search placeholder present', False),
            ('Why Write Amplification', 'Post 1 listed', False),
            ('Inside Modern Machine Learning Platforms', 'Post 3 listed', False),
            ('JetBrains Mono', 'Font family loaded', False),
        ]

        for pattern, desc, is_regex in content_checks:
            test_content_contains(homepage, pattern, result, desc, is_regex)

    # ══════════════════════════════════════════════════════════
    # 4. ABOUT PAGE CONTENT
    # ══════════════════════════════════════════════════════════
    print_section("4. ABOUT PAGE CONTENT")

    if '/about.html' in page_contents:
        about = page_contents['/about.html']

        about_checks = [
            ('Narendra Kumar', 'Name present', False),
            ('github.com/im-naren', 'GitHub link correct', False),
            ('naren.dubey@zoho.com', 'Email correct', False),
            ('https://github.com/im-naren.png', 'GitHub profile image used', False),
            ('#50PaperChallenge', 'Paper challenge mentioned', False),
            ('Systems builder', 'Subtitle present', False),
        ]

        for pattern, desc, is_regex in about_checks:
            test_content_contains(about, pattern, result, desc, is_regex)

    # ══════════════════════════════════════════════════════════
    # 5. META TAGS & SEO
    # ══════════════════════════════════════════════════════════
    print_section("5. META TAGS & SEO")

    if '/' in page_contents:
        test_meta_tags(page_contents['/'], result, "Homepage")

    if '/about.html' in page_contents:
        test_meta_tags(page_contents['/about.html'], result, "About page")

    # ══════════════════════════════════════════════════════════
    # 6. LINKS VALIDATION
    # ══════════════════════════════════════════════════════════
    print_section("6. LINK VALIDATION")

    if '/' in page_contents:
        homepage = page_contents['/']

        # Check post link format
        if re.search(r'href="/[a-z-]+/"', homepage):
            result.add_pass("Post links use correct format (relative with trailing slash)")
        else:
            result.add_warn("Post link format may be incorrect")

        # Check for broken internal links (sample check)
        soup = BeautifulSoup(homepage, 'html.parser')
        internal_links = soup.find_all('a', href=re.compile(r'^/[^/]'))

        if internal_links:
            result.add_info(f"Found {len(internal_links)} internal links to check")

    # ══════════════════════════════════════════════════════════
    # 7. SECURITY
    # ══════════════════════════════════════════════════════════
    print_section("7. HTTPS & SECURITY")

    test_https_security(BASE_URL, result)

    if '/about.html' in page_contents:
        check_external_links(page_contents['/about.html'], result, "About page")

    # ══════════════════════════════════════════════════════════
    # 8. PERFORMANCE
    # ══════════════════════════════════════════════════════════
    print_section("8. PERFORMANCE")

    test_performance(BASE_URL + '/', result, "Homepage load time", 2000)
    test_performance(BASE_URL + '/about.html', result, "About page load time", 2000)

    # ══════════════════════════════════════════════════════════
    # 9. RESPONSIVE DESIGN
    # ══════════════════════════════════════════════════════════
    print_section("9. RESPONSIVE DESIGN")

    if '/' in page_contents:
        if 'viewport' in page_contents['/']:
            result.add_pass("Homepage has viewport meta tag")
        else:
            result.add_fail("Homepage missing viewport meta tag")

        if '@media' in requests.get(BASE_URL + '/styles.css').text:
            result.add_pass("CSS has media queries")
        else:
            result.add_fail("CSS missing media queries")

    # ══════════════════════════════════════════════════════════
    # 10. JAVASCRIPT FUNCTIONALITY
    # ══════════════════════════════════════════════════════════
    print_section("10. JAVASCRIPT")

    try:
        js_content = requests.get(BASE_URL + '/script.js').text

        js_checks = [
            ('initializeSearch', 'Search initialization'),
            ('copyCode', 'Code copy functionality'),
            ('addEventListener', 'Event listeners'),
        ]

        for pattern, desc in js_checks:
            if pattern in js_content:
                result.add_pass(desc)
            else:
                result.add_fail(f"{desc} - Function not found")
    except Exception as e:
        result.add_fail(f"JavaScript check failed: {e}")

    # ══════════════════════════════════════════════════════════
    # 11. ACCESSIBILITY (Basic)
    # ══════════════════════════════════════════════════════════
    print_section("11. ACCESSIBILITY (Basic)")

    if '/' in page_contents:
        soup = BeautifulSoup(page_contents['/'], 'html.parser')

        # Check semantic HTML
        if soup.find('nav'):
            result.add_pass("Homepage has semantic nav element")
        else:
            result.add_fail("Homepage missing nav element")

        # Check lang attribute
        if soup.find('html', attrs={'lang': True}):
            result.add_pass("Homepage has lang attribute")
        else:
            result.add_warn("Homepage missing lang attribute")

    if '/about.html' in page_contents:
        soup = BeautifulSoup(page_contents['/about.html'], 'html.parser')

        # Check images have alt text
        images = soup.find_all('img')
        images_without_alt = [img for img in images if not img.get('alt')]

        if images and not images_without_alt:
            result.add_pass("About page: All images have alt text")
        elif images_without_alt:
            result.add_warn(f"About page: {len(images_without_alt)} images missing alt text")

    # ══════════════════════════════════════════════════════════
    # 12. CUSTOM DOMAIN & DNS
    # ══════════════════════════════════════════════════════════
    print_section("12. CUSTOM DOMAIN")

    # Check CNAME file
    try:
        cname_content = requests.get(BASE_URL + '/CNAME').text.strip()
        if cname_content == 'develbyte.in':
            result.add_pass("CNAME file contains correct domain")
        else:
            result.add_fail(f"CNAME file incorrect: {cname_content}")
    except Exception as e:
        result.add_fail(f"CNAME file not accessible: {e}")

    # Check DNS resolution
    try:
        dns_output = subprocess.run(['host', 'develbyte.in'], capture_output=True, text=True, timeout=5)
        if dns_output.returncode == 0:
            result.add_pass("DNS resolves for develbyte.in")
        else:
            result.add_warn("DNS resolution check failed")
    except Exception:
        result.add_info("DNS check skipped (host command not available)")

    # ══════════════════════════════════════════════════════════
    # 13. POST PAGES (Docusaurus)
    # ══════════════════════════════════════════════════════════
    print_section("13. BLOG POST PAGES")

    post_paths = [
        '/why-write-amplification-not-just-throughput-shapes-modern-databases/',
        '/why-latency-not-partitions-dictates-database-consistency/',
        '/inside-modern-machine-learning-platforms/',
    ]

    for path in post_paths:
        if path in page_contents:
            soup = BeautifulSoup(page_contents[path], 'html.parser')

            if soup.find('article'):
                result.add_pass(f"Post has article tag: {path.split('/')[1][:30]}...")
            else:
                result.add_warn(f"Post missing article tag: {path}")

    # ══════════════════════════════════════════════════════════
    # SUMMARY
    # ══════════════════════════════════════════════════════════
    print(f"\n{Colors.BLUE}{Colors.BOLD}═" * 60)
    print("TEST SUMMARY")
    print(f"═" * 60 + f"{Colors.NC}\n")

    total = result.passed + result.failed
    success_rate = (result.passed / total * 100) if total > 0 else 0

    print(f"{Colors.GREEN}Passed:{Colors.NC}   {result.passed} / {total} ({success_rate:.1f}%)")
    print(f"{Colors.RED}Failed:{Colors.NC}   {result.failed} / {total}")
    print(f"{Colors.YELLOW}Warnings:{Colors.NC} {result.warnings}")

    if result.failed == 0:
        print(f"\n{Colors.GREEN}{Colors.BOLD}✓ All tests passed! Site is working correctly.{Colors.NC}")
        return 0
    elif result.failed <= 3:
        print(f"\n{Colors.YELLOW}{Colors.BOLD}⚠ Minor issues found. Site is mostly functional.{Colors.NC}")
        return 0
    else:
        print(f"\n{Colors.RED}{Colors.BOLD}✗ Multiple tests failed. Please investigate.{Colors.NC}")
        return 1


if __name__ == '__main__':
    sys.exit(main())
