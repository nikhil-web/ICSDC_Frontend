// ══════════════════════════════════════════════════════════
//  faq.js — Unified FAQ accordion renderer
//  Replaces duplicated logic across all page-specific JS files.
//
//  Usage:
//    import { renderFAQ } from '../components/faq/faq.js';
//    renderFAQ('ds-faq-accordions', DS_FAQ);
// ══════════════════════════════════════════════════════════

/**
 * renderFAQ(containerId, items, prefix)
 * @param {string} containerId - ID of the <dl> element
 * @param {Array}  items       - Array of { question, answer }
 * @param {string} prefix      - Optional prefix for ARIA IDs (default: 'faq')
 */
export function renderFAQ(containerId, items, prefix) {
    const dl = document.getElementById(containerId);
    if (!dl || !items || !items.length) return;

    const idPrefix = prefix || containerId;
    let openIndex = 0;

    function render() {
        dl.innerHTML = items.map((faq, i) => {
            const isOpen = i === openIndex;
            return '<div class="faq-item' + (isOpen ? ' faq-open' : '') + '" data-faq-index="' + i + '">' +
                '<dt>' +
                '<button class="faq-question" aria-expanded="' + isOpen + '" aria-controls="' + idPrefix + '-answer-' + i + '" id="' + idPrefix + '-question-' + i + '">' +
                '<span>' + faq.question + '</span>' +
                '<svg class="faq-chevron" viewBox="0 0 20 20" fill="none" aria-hidden="true">' +
                '<path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>' +
                '</svg>' +
                '</button>' +
                '</dt>' +
                '<dd class="faq-answer" id="' + idPrefix + '-answer-' + i + '" role="region" aria-labelledby="' + idPrefix + '-question-' + i + '">' +
                '<p>' + faq.answer + '</p>' +
                '</dd>' +
                '</div>';
        }).join('');

        // Ensure answers are block-level for max-height animation (mirrors polish.js)
        dl.querySelectorAll('.faq-answer').forEach(ans => {
            ans.style.display = 'block';
            ans.style.overflow = 'hidden';
        });

        dl.querySelectorAll('.faq-question').forEach(btn => {
            btn.addEventListener('click', () => {
                const index = parseInt(btn.closest('.faq-item').dataset.faqIndex, 10);
                openIndex = (openIndex === index) ? null : index;
                render();
            });
        });
    }

    render();
}
