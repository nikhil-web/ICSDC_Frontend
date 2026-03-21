/**
 * homepage-cms.js
 * Supplements main.js by populating remaining hardcoded sections from CMS.
 * Sections already handled by main.js (via data-strapi attributes) are skipped.
 */
import { populateSEO, populateIconCards, hidePageLoader, markActiveNavLink, setText, setHTML } from './utils/cms-helpers.js';
import { getHomepagePage } from './services/contentService.js';

(async function () {
    'use strict';
    markActiveNavLink();
    try {
        var res = await getHomepagePage();
        var page = res.data;

        populateSEO(page.seo);

        // Who We Are — buttons/cards
        if (page.whoWeAreHeading) setText(document, '.who-we-are-heading', page.whoWeAreHeading);
        if (page.whoWeAreDescription) setHTML(document, '.who-we-are-paragraph', page.whoWeAreDescription);
        populateIconCards('.who-we-are-btns', page.whoWeAreCards, 'btn-outline feature-cards');

        // Less Cloud Complexity
        if (page.complexityHeading) setText(document, '.less-complexity-heading', page.complexityHeading);
        if (page.complexityDescription) setHTML(document, '.less-complexity-paragraph', page.complexityDescription);

        // Cloud Solutions (floating cards)
        populateIconCards('.cloud-solutions-grid', page.solutionCards, 'cloud-solution-card');

        // Why Business Needs Cloud
        if (page.cloudNeedsTitle) setText(document, '.cloud-needs-title', page.cloudNeedsTitle);
        populateIconCards('.cloud-needs-grid', page.cloudNeedsItems, 'cloud-need-item');

        // Contact
        if (page.contactEmail) {
            var emailEl = document.querySelector('.contact-email');
            if (emailEl) emailEl.textContent = page.contactEmail;
        }
        if (page.contactPhone) {
            var phoneEl = document.querySelector('.contact-phone');
            if (phoneEl) phoneEl.textContent = page.contactPhone;
        }
    } catch (err) {
        console.error('[homepage-cms] CMS load failed:', err);
    } finally {
        hidePageLoader();
    }
})();
