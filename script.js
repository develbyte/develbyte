// ═══════════════════════════════════════════════════════════════
// TERMINAL BLOG - INTERACTIVE ENHANCEMENTS
// ═══════════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════════
// SEARCH FUNCTIONALITY (INDEX PAGE)
// ═══════════════════════════════════════════════════════════════

function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    const postsList = document.getElementById('postsList');
    const searchPrompt = document.querySelector('.search-prompt');

    if (!searchInput || !postsList) return;

    const posts = postsList.querySelectorAll('.post-line');

    // Handle search filtering
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();

        // Filter posts
        posts.forEach((post) => {
            const title = post.dataset.title?.toLowerCase() || '';
            const tags = post.dataset.tags?.toLowerCase() || '';

            const matchesSearch = !query ||
                title.includes(query) ||
                tags.includes(query);

            if (matchesSearch) {
                post.classList.remove('hidden');
            } else {
                post.classList.add('hidden');
            }
        });
    });
}

// Copy code block functionality
function copyCode(button) {
    const codeBlock = button.closest('.code-block');
    const code = codeBlock.querySelector('code').textContent;

    navigator.clipboard.writeText(code).then(() => {
        const originalText = button.textContent;
        button.textContent = 'copied!';
        button.style.color = 'var(--terminal-bright)';

        setTimeout(() => {
            button.textContent = originalText;
            button.style.color = '';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy code:', err);
        button.textContent = 'error';
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Initialize search functionality
    initializeSearch();

    // Auto-focus search input on page load
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        // Immediate focus
        searchInput.focus();

        // Ensure focus after short delays (in case other scripts interfere)
        setTimeout(() => searchInput.focus(), 50);
        setTimeout(() => searchInput.focus(), 200);
        setTimeout(() => searchInput.focus(), 500);
    }

    // Click anywhere on search prompt to focus input
    const searchPrompt = document.querySelector('.search-prompt');
    if (searchPrompt && searchInput) {
        searchPrompt.addEventListener('click', () => {
            searchInput.focus();
        });
    }

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

    // Ensure search input is focused after page load
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.focus();
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K to focus search (if implemented)
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        // Implement search functionality here
    }

    // Escape to close modals/overlays
    if (e.key === 'Escape') {
        // Implement modal close functionality here
    }
});

// Track reading progress (optional)
function updateReadingProgress() {
    const article = document.querySelector('.post-content');
    if (!article) return;

    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight - windowHeight;
    const scrolled = window.scrollY;
    const progress = (scrolled / documentHeight) * 100;

    // You can use this to show a progress bar
    // document.querySelector('.progress-bar').style.width = progress + '%';
}

// Optional: Update on scroll
window.addEventListener('scroll', () => {
    requestAnimationFrame(updateReadingProgress);
}, { passive: true });

// Add current year to footer if needed
const currentYear = new Date().getFullYear();
// document.querySelector('.footer-year')?.textContent = currentYear;

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
