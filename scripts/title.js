/**
 * Expuz Stream Title Changer
 * Handles multiple scenarios and edge cases
 */
(function() {
    'use strict';

    // Configuration
    const CONFIG = {
        FROM_TITLE: ['Jellyfin', 'Jelly' + 'fish'],
        TO_TITLE: 'Expuz Stream',
        CASE_SENSITIVE: false,
        TRIM_WHITESPACE: true,
        DEBUG: false
    };

    // Utility functions
    const log = CONFIG.DEBUG ? console.log.bind(console, '[TitleChanger]') : () => {};
    const titleElement = document.querySelector('title');
    let observer = null;
    let isProcessing = false;

    // Normalize title for comparison
    function normalizeTitle(title) {
        if (!title) return '';
        let normalized = CONFIG.TRIM_WHITESPACE ? title.trim() : title;
        return CONFIG.CASE_SENSITIVE ? normalized : normalized.toLowerCase();
    }

    // Check if title should be changed
    function shouldChangeTitle(title) {
        const normalizedTitle = normalizeTitle(title);
        const normalizedFrom = Array.isArray(CONFIG.FROM_TITLE) ? CONFIG.FROM_TITLE.map(normalizeTitle) : [normalizeTitle(CONFIG.FROM_TITLE)];
        return normalizedFrom.includes(normalizedTitle);
    }

    // Safely change the title
    function changeTitle(newTitle = CONFIG.TO_TITLE) {
        if (isProcessing) return;
        isProcessing = true;

        try {
            if (titleElement) {
                titleElement.textContent = newTitle;
                log(`Title changed to: ${newTitle}`);
            }
        } catch (error) {
            log('Error changing title:', error);
        } finally {
            isProcessing = false;
        }
    }

    // Process title change
    function processTitle() {
        const currentTitle = titleElement?.textContent || document.title;
        if (shouldChangeTitle(currentTitle)) {
            changeTitle();
        }
    }

    // Initialize title processing
    function init() {
        if (!titleElement) {
            log('Title element not found');
            return;
        }

        // Initial title check
        processTitle();

        // Enhanced MutationObserver
        observer = new MutationObserver((mutations) => {
            let shouldProcess = false;

            mutations.forEach((mutation) => {
                if (mutation.type === 'childList' || mutation.type === 'characterData') {
                    shouldProcess = true;
                }
            });

            if (shouldProcess) {
                requestAnimationFrame(processTitle);
            }
        });

        // Observe with comprehensive options
        observer.observe(titleElement, {
            childList: true,
            characterData: true,
            subtree: true
        });

        // Enhanced property descriptor
        const originalDescriptor = Object.getOwnPropertyDescriptor(Document.prototype, 'title') ||
                                 Object.getOwnPropertyDescriptor(HTMLDocument.prototype, 'title');

        if (originalDescriptor) {
            Object.defineProperty(document, 'title', {
                get: function() {
                    return titleElement?.textContent || '';
                },
                set: function(value) {
                    if (titleElement) {
                        titleElement.textContent = shouldChangeTitle(value) ? CONFIG.TO_TITLE : value;
                    }
                },
                configurable: true,
                enumerable: true
            });
        }

        // Periodic check as fallback
        const intervalId = setInterval(() => {
            processTitle();
        }, 1000);

        // Cleanup on page unload
        window.addEventListener('beforeunload', () => {
            if (observer) {
                observer.disconnect();
                observer = null;
            }
            clearInterval(intervalId);
            log('Cleanup completed');
        });

        log('Title changer initialized');
    }

    // Start when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();