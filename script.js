// ═══════════════════════════════════════════════════════════════
// DEVELBYTE - Terminal Interactions
// ═══════════════════════════════════════════════════════════════

function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    const postsList = document.getElementById('postsList');
    const statusElement = document.getElementById('search-results-status');

    if (!searchInput || !postsList) return;

    const posts = postsList.querySelectorAll('.post-line');

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        let visibleCount = 0;

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

        if (statusElement) {
            if (query) {
                statusElement.textContent = `${visibleCount} post${visibleCount !== 1 ? 's' : ''} found`;
            } else {
                statusElement.textContent = '';
            }
        }
    });
}

function initializeKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
        if (e.metaKey || e.ctrlKey || e.altKey) return;

        switch (e.key) {
            case '/': {
                e.preventDefault();
                const searchInput = document.getElementById('searchInput');
                if (searchInput) searchInput.focus();
                break;
            }
            case 'h':
            case 'H': {
                window.location.href = window.location.pathname.includes('/posts/')
                    ? '../../index.html'
                    : 'index.html';
                break;
            }
            case 'a':
            case 'A': {
                window.location.href = window.location.pathname.includes('/posts/')
                    ? '../../about.html'
                    : 'about.html';
                break;
            }
            case 'g':
            case 'G': {
                window.open('https://github.com/im-naren', '_blank');
                break;
            }
            case 'Escape': {
                const searchInput = document.getElementById('searchInput');
                if (searchInput && document.activeElement === searchInput) {
                    searchInput.value = '';
                    searchInput.dispatchEvent(new Event('input'));
                    searchInput.blur();
                }
                break;
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initializeSearch();
    initializeKeyboardShortcuts();

    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.focus();
    }

    const searchPrompt = document.querySelector('.search-prompt');
    if (searchPrompt && searchInput) {
        searchPrompt.addEventListener('click', () => {
            searchInput.focus();
        });
    }

    document.addEventListener('click', (e) => {
        const copyBtn = e.target.closest('[data-copy-btn]');
        if (!copyBtn) return;

        const codeBlock = copyBtn.closest('.code-block');
        if (!codeBlock) return;

        const codeElement = codeBlock.querySelector('code');
        if (!codeElement) return;

        navigator.clipboard.writeText(codeElement.textContent).then(() => {
            const originalText = copyBtn.textContent;
            copyBtn.textContent = 'copied!';
            copyBtn.setAttribute('aria-label', 'Code copied to clipboard');

            setTimeout(() => {
                copyBtn.textContent = originalText;
                copyBtn.setAttribute('aria-label', 'Copy code to clipboard');
            }, 2000);
        }).catch(() => {
            copyBtn.textContent = 'error';
            copyBtn.setAttribute('aria-label', 'Failed to copy code');

            setTimeout(() => {
                copyBtn.textContent = 'copy';
                copyBtn.setAttribute('aria-label', 'Copy code to clipboard');
            }, 2000);
        });
    });

    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                history.pushState(null, null, href);
            }
        });
    });
});

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
