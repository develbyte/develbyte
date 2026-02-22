#!/bin/bash

# ═══════════════════════════════════════════════════════════════
# Automated Testing Script for develbyte.in
# ═══════════════════════════════════════════════════════════════

set -e

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

SITE_URL="${1:-https://develbyte.in}"
FAILED_TESTS=0
PASSED_TESTS=0

echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}Testing: $SITE_URL${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}"
echo ""

# Helper functions
pass() {
    echo -e "${GREEN}✓${NC} $1"
    ((PASSED_TESTS++))
}

fail() {
    echo -e "${RED}✗${NC} $1"
    ((FAILED_TESTS++))
}

warn() {
    echo -e "${YELLOW}⚠${NC} $1"
}

info() {
    echo -e "${BLUE}ℹ${NC} $1"
}

test_url() {
    local url=$1
    local expected_code=${2:-200}
    local description=$3

    http_code=$(curl -s -o /dev/null -w "%{http_code}" -L "$url" 2>/dev/null || echo "000")

    if [ "$http_code" = "$expected_code" ]; then
        pass "$description (HTTP $http_code)"
        return 0
    else
        fail "$description (Expected $expected_code, got $http_code)"
        return 1
    fi
}

test_content() {
    local url=$1
    local pattern=$2
    local description=$3

    content=$(curl -s -L "$url" 2>/dev/null || echo "")

    if echo "$content" | grep -q "$pattern"; then
        pass "$description"
        return 0
    else
        fail "$description (Pattern not found: $pattern)"
        return 1
    fi
}

# ═══════════════════════════════════════════════════════════════
# 1. PAGE AVAILABILITY TESTS
# ═══════════════════════════════════════════════════════════════

echo -e "\n${YELLOW}[1] PAGE AVAILABILITY${NC}"
echo "──────────────────────────────────────"

test_url "$SITE_URL/" 200 "Homepage loads"
test_url "$SITE_URL/about.html" 200 "About page loads"
test_url "$SITE_URL/why-write-amplification-not-just-throughput-shapes-modern-databases/" 200 "Post 1: Write Amplification"
test_url "$SITE_URL/why-latency-not-partitions-dictates-database-consistency/" 200 "Post 2: PACELC"
test_url "$SITE_URL/inside-modern-machine-learning-platforms/" 200 "Post 3: ML Platforms"
test_url "$SITE_URL/zookeeper-sessions-and-life-cycle/" 200 "Post 4: Zookeeper Sessions"
test_url "$SITE_URL/zookeeper-namespace-and-operations/" 200 "Post 5: Zookeeper Namespace"

# ═══════════════════════════════════════════════════════════════
# 2. CONTENT VERIFICATION TESTS
# ═══════════════════════════════════════════════════════════════

echo -e "\n${YELLOW}[2] CONTENT VERIFICATION${NC}"
echo "──────────────────────────────────────"

test_content "$SITE_URL/" "DEVELBYTE" "Homepage has ASCII art header"
test_content "$SITE_URL/" "guest@develbyte:~\$" "Homepage has search prompt"
test_content "$SITE_URL/" "5 posts indexed" "Homepage shows correct post count"
test_content "$SITE_URL/" "search posts..." "Search placeholder text present"
test_content "$SITE_URL/" "Why Write Amplification" "Homepage lists Write Amplification post"
test_content "$SITE_URL/" "Inside Modern Machine Learning Platforms" "Homepage lists ML Platforms post"

test_content "$SITE_URL/about.html" "Narendra Kumar" "About page has correct name"
test_content "$SITE_URL/about.html" "github.com/im-naren" "About page has GitHub link"
test_content "$SITE_URL/about.html" "naren.dubey@zoho.com" "About page has email"
test_content "$SITE_URL/about.html" "https://github.com/im-naren.png" "About page uses GitHub profile image"
test_content "$SITE_URL/about.html" "#50PaperChallenge" "About page mentions paper challenge"

# ═══════════════════════════════════════════════════════════════
# 3. ASSET TESTS
# ═══════════════════════════════════════════════════════════════

echo -e "\n${YELLOW}[3] ASSET AVAILABILITY${NC}"
echo "──────────────────────────────────────"

test_url "$SITE_URL/styles.css" 200 "CSS file loads"
test_url "$SITE_URL/script.js" 200 "JavaScript file loads"
test_url "$SITE_URL/favicon.svg" 200 "SVG favicon loads"
test_url "$SITE_URL/favicon.ico" 200 "ICO favicon loads"

# ═══════════════════════════════════════════════════════════════
# 4. HTTPS & SECURITY TESTS
# ═══════════════════════════════════════════════════════════════

echo -e "\n${YELLOW}[4] HTTPS & SECURITY${NC}"
echo "──────────────────────────────────────"

if curl -s -I "$SITE_URL/" | grep -q "HTTP/2 200\|HTTP/1.1 200"; then
    pass "HTTPS enabled"
else
    fail "HTTPS check"
fi

if curl -s -L "$SITE_URL/about.html" | grep -q 'rel="noopener'; then
    pass "External links use noopener"
else
    warn "Some external links may be missing noopener"
fi

# ═══════════════════════════════════════════════════════════════
# 5. META TAG TESTS
# ═══════════════════════════════════════════════════════════════

echo -e "\n${YELLOW}[5] META TAGS & SEO${NC}"
echo "──────────────────────────────────────"

test_content "$SITE_URL/" "<title>" "Homepage has title tag"
test_content "$SITE_URL/about.html" "<title>" "About page has title tag"
test_content "$SITE_URL/" "JetBrains Mono" "Homepage loads JetBrains Mono font"

# ═══════════════════════════════════════════════════════════════
# 6. LINK VALIDATION TESTS
# ═══════════════════════════════════════════════════════════════

echo -e "\n${YELLOW}[6] LINK VALIDATION${NC}"
echo "──────────────────────────────────────"

# Extract and test post links from homepage
homepage_content=$(curl -s -L "$SITE_URL/" 2>/dev/null || echo "")

if echo "$homepage_content" | grep -q 'href="/why-write-amplification'; then
    pass "Post links use correct URL format (relative paths)"
else
    fail "Post link format incorrect"
fi

if echo "$homepage_content" | grep -q 'href="/.*/"'; then
    pass "Post links have trailing slashes"
else
    warn "Some post links may be missing trailing slashes"
fi

# ═══════════════════════════════════════════════════════════════
# 7. JAVASCRIPT FUNCTIONALITY TESTS
# ═══════════════════════════════════════════════════════════════

echo -e "\n${YELLOW}[7] JAVASCRIPT RESOURCES${NC}"
echo "──────────────────────────────────────"

test_content "$SITE_URL/" "initializeSearch" "Search functionality present"
test_content "$SITE_URL/" "copyCode" "Code copy functionality present"
test_content "$SITE_URL/" "addEventListener" "Event listeners registered"

# ═══════════════════════════════════════════════════════════════
# 8. RESPONSIVE DESIGN TESTS
# ═══════════════════════════════════════════════════════════════

echo -e "\n${YELLOW}[8] RESPONSIVE DESIGN${NC}"
echo "──────────────────────────────────────"

test_content "$SITE_URL/" 'name="viewport"' "Viewport meta tag present on homepage"
test_content "$SITE_URL/about.html" 'name="viewport"' "Viewport meta tag present on about page"

# Check for media queries in CSS
if curl -s -L "$SITE_URL/styles.css" | grep -q "@media"; then
    pass "CSS has media queries for responsive design"
else
    fail "CSS missing media queries"
fi

# ═══════════════════════════════════════════════════════════════
# 9. PERFORMANCE TESTS (Basic)
# ═══════════════════════════════════════════════════════════════

echo -e "\n${YELLOW}[9] PERFORMANCE (Basic)${NC}"
echo "──────────────────────────────────────"

# Test homepage load time
start_time=$(date +%s%3N)
curl -s -o /dev/null "$SITE_URL/"
end_time=$(date +%s%3N)
load_time=$((end_time - start_time))

if [ $load_time -lt 2000 ]; then
    pass "Homepage loads in ${load_time}ms (< 2s)"
elif [ $load_time -lt 5000 ]; then
    warn "Homepage loads in ${load_time}ms (2-5s)"
else
    fail "Homepage loads in ${load_time}ms (> 5s)"
fi

# Test about page load time
start_time=$(date +%s%3N)
curl -s -o /dev/null "$SITE_URL/about.html"
end_time=$(date +%s%3N)
load_time=$((end_time - start_time))

if [ $load_time -lt 2000 ]; then
    pass "About page loads in ${load_time}ms (< 2s)"
elif [ $load_time -lt 5000 ]; then
    warn "About page loads in ${load_time}ms (2-5s)"
else
    fail "About page loads in ${load_time}ms (> 5s)"
fi

# ═══════════════════════════════════════════════════════════════
# 10. SYNTAX HIGHLIGHTING TESTS
# ═══════════════════════════════════════════════════════════════

echo -e "\n${YELLOW}[10] PRISM.JS SYNTAX HIGHLIGHTING${NC}"
echo "──────────────────────────────────────"

test_content "$SITE_URL/template-post.html" "prism" "Prism.js loaded in template"
test_content "$SITE_URL/template-post.html" "language-javascript" "JavaScript language support"
test_content "$SITE_URL/template-post.html" "language-rust" "Rust language support"
test_content "$SITE_URL/template-post.html" "language-python" "Python language support"

# ═══════════════════════════════════════════════════════════════
# 11. ACCESSIBILITY TESTS (Basic)
# ═══════════════════════════════════════════════════════════════

echo -e "\n${YELLOW}[11] ACCESSIBILITY (Basic)${NC}"
echo "──────────────────────────────────────"

test_content "$SITE_URL/" "<nav" "Semantic nav element present"
test_content "$SITE_URL/about.html" 'alt="' "Images have alt text"
test_content "$SITE_URL/" "JetBrains Mono" "Readable font family used"

# ═══════════════════════════════════════════════════════════════
# 12. CUSTOM DOMAIN & DNS TESTS
# ═══════════════════════════════════════════════════════════════

echo -e "\n${YELLOW}[12] CUSTOM DOMAIN${NC}"
echo "──────────────────────────────────────"

if [ "$SITE_URL" = "https://develbyte.in" ]; then
    # Check DNS resolution
    if host develbyte.in > /dev/null 2>&1; then
        pass "DNS resolves for develbyte.in"
    else
        fail "DNS resolution failed"
    fi

    # Check if CNAME file exists
    test_url "$SITE_URL/CNAME" 200 "CNAME file accessible"
fi

# ═══════════════════════════════════════════════════════════════
# SUMMARY
# ═══════════════════════════════════════════════════════════════

echo -e "\n${BLUE}═══════════════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}TEST SUMMARY${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}"

TOTAL_TESTS=$((PASSED_TESTS + FAILED_TESTS))

echo -e "${GREEN}Passed:${NC} $PASSED_TESTS / $TOTAL_TESTS"
echo -e "${RED}Failed:${NC} $FAILED_TESTS / $TOTAL_TESTS"

if [ $FAILED_TESTS -eq 0 ]; then
    echo -e "\n${GREEN}✓ All tests passed!${NC}"
    exit 0
else
    echo -e "\n${RED}✗ Some tests failed. Please review the output above.${NC}"
    exit 1
fi
