/**
 * dedicated-server.js  — thin page orchestrator
 * Imports shared components + page-specific data.
 */
import { renderTestimonials } from '../../components/testimonials/testimonials.js';
import { renderFAQ }          from '../../components/faq/faq.js';
import { initRipple }         from '../../components/ripple/ripple.js';
import { hideLoader }         from '../../components/page-loader/page-loader.js';
import { TESTIMONIALS, FAQ, CONFIG, RIPPLE_SELECTOR } from '../../pages/dedicated-server/data.js';

function init() {
    renderTestimonials(CONFIG, TESTIMONIALS);
    renderFAQ(CONFIG.faqId, FAQ, CONFIG.faqPrefix);
    initRipple(RIPPLE_SELECTOR);
    hideLoader();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
