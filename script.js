// ═══════════════════════════════════════════════════════════════
// TERMINAL BLOG - INTERACTIVE ENHANCEMENTS
// ═══════════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════════
// SEARCH FUNCTIONALITY (INDEX PAGE)
// ═══════════════════════════════════════════════════════════════

function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    const postsList = document.getElementById('postsList');
    const statusElement = document.getElementById('search-results-status');

    if (!searchInput || !postsList) return;

    const posts = postsList.querySelectorAll('.post-line');

    // Handle search filtering
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        let visibleCount = 0;

        // Filter posts
        posts.forEach((post) => {
            const title = post.dataset.title?.toLowerCase() || '';
            const tags = post.dataset.tags?.toLowerCase() || '';

            const matchesSearch = !query ||
                title.includes(query) ||
                tags.includes(query);

            if (matchesSearch) {
                post.classList.remove('hidden');
                visibleCount++;
            } else {
                post.classList.add('hidden');
            }
        });

        // Announce results to screen readers
        if (statusElement) {
            if (query) {
                statusElement.textContent = `${visibleCount} post${visibleCount !== 1 ? 's' : ''} found`;
            } else {
                statusElement.textContent = '';
            }
        }
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Initialize search functionality
    initializeSearch();

    // Auto-focus search input on page load (only on index page)
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.focus();
    }

    // Click anywhere on search prompt to focus input
    const searchPrompt = document.querySelector('.search-prompt');
    if (searchPrompt && searchInput) {
        searchPrompt.addEventListener('click', () => {
            searchInput.focus();
        });
    }

    // Setup copy buttons with event delegation
    document.addEventListener('click', (e) => {
        const copyBtn = e.target.closest('[data-copy-btn]');
        if (!copyBtn) return;

        const codeBlock = copyBtn.closest('.code-block');
        if (!codeBlock) return;

        const codeElement = codeBlock.querySelector('code');
        if (!codeElement) return;

        const code = codeElement.textContent;

        navigator.clipboard.writeText(code).then(() => {
            const originalText = copyBtn.textContent;
            copyBtn.textContent = 'copied!';
            copyBtn.style.color = 'var(--terminal-bright)';
            copyBtn.setAttribute('aria-label', 'Code copied to clipboard');

            setTimeout(() => {
                copyBtn.textContent = originalText;
                copyBtn.style.color = '';
                copyBtn.setAttribute('aria-label', 'Copy code to clipboard');
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy code:', err);
            copyBtn.textContent = 'error';
            copyBtn.setAttribute('aria-label', 'Failed to copy code');

            // Reset error state after 2 seconds
            setTimeout(() => {
                copyBtn.textContent = 'copy';
                copyBtn.style.color = '';
                copyBtn.setAttribute('aria-label', 'Copy code to clipboard');
            }, 2000);
        });
    });

    // Smooth scroll for anchor links
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);

            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Update URL without jumping
                history.pushState(null, null, href);
            }
        });
    });
});

// Enhanced terminal boot animation
window.addEventListener('load', () => {
    // Add glow effect to terminal window
    const terminalWindow = document.querySelector('.terminal-window');
    if (terminalWindow) {
        setTimeout(() => {
            terminalWindow.style.transition = 'box-shadow 0.5s ease';
        }, 300);
    }
});

// Performance optimization: Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Console Easter egg
console.log('%c┌──────────────────────────────────────┐', 'color: #00ff41; font-family: monospace;');
console.log('%c│  Welcome to the terminal blog!      │', 'color: #00ff41; font-family: monospace;');
console.log('%c│  Built with ❤️ and green phosphor   │', 'color: #00ff41; font-family: monospace;');
console.log('%c└──────────────────────────────────────┘', 'color: #00ff41; font-family: monospace;');
