/**
 * acronis-backup.js
 * ─────────────────
 * CMS-driven version: fetches all page content from Strapi
 * and populates DOM sections dynamically.
 *
 * Sections handled:
 *   1.  SEO meta tags
 *   2.  Hero (eyebrow + shield visual + stat cards + status badge)
 *   3.  4 Pillars (icon cards)
 *   4.  Pricing (section header + placeholder message + CTA)
 *   5.  Features (section header + 12 icon cards)
 *   6.  CTA Band #1
 *   7.  Why Choose ICSDC (section header + 6 icon cards)
 *   8.  Testimonials
 *   9.  FAQ
 *   10. CTA Band #2
 */

import { getAcronisBackupPage } from './services/contentService.js';
import {
    populateSEO,
    populateHero,
    populateIconCards,
    populateSectionHeader,
    populateCtaBand,
    populateTldCards,
    populateStats,
    hidePageLoader,
    markActiveNavLink,
    setText,
    setHTML
} from './utils/cms-helpers.js';

(function () {
    'use strict';

    /* ─────────────────────────────────────────────────────────
       LOCAL HELPERS
    ───────────────────────────────────────────────────────── */

    function getInitials(name) {
        if (!name) return '';
        return name.split(' ').map(function (n) { return n[0]; }).join('').toUpperCase().slice(0, 2);
    }

    function starSVG() {
        return '<svg class="testi-star" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">' +
            '<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>' +
            '</svg>';
    }

    /* ─────────────────────────────────────────────────────────
       SECTION POPULATORS
    ───────────────────────────────────────────────────────── */

    /** 2. Hero Section */
    function populateAcrHero(page) {
        var section = document.querySelector('.hero-section');
        if (!section) return;

        // Eyebrow
        if (page.heroEyebrow) {
            var eyebrow = section.querySelector('.acr-eyebrow');
            if (eyebrow) {
                var dot = eyebrow.querySelector('.acr-eyebrow-dot');
                eyebrow.textContent = '';
                if (dot) eyebrow.appendChild(dot);
                eyebrow.appendChild(document.createTextNode(' ' + page.heroEyebrow));
            }
        }

        if (page.heroTitle) setText(section, '.hero-title', page.heroTitle);
        if (page.heroSubtitle) setText(section, '.hero-sub', page.heroSubtitle);
        if (page.heroDescription) setHTML(section, '.hero-desc', page.heroDescription);

        // CTA Buttons
        var btns = section.querySelectorAll('.hero-btns button');
        if (btns.length >= 1 && page.heroCtaPrimary) {
            btns[0].innerHTML = page.heroCtaPrimary.text;
            if (page.heroCtaPrimary.link) btns[0].setAttribute('onclick', "window.location.href='" + page.heroCtaPrimary.link + "'");
        }
        if (btns.length >= 2 && page.heroCtaSecondary) {
            btns[1].textContent = page.heroCtaSecondary.text;
            if (page.heroCtaSecondary.link) btns[1].setAttribute('onclick', "window.location.href='" + page.heroCtaSecondary.link + "'");
        }

        // Hero stat cards
        if (page.heroStats && page.heroStats.length) {
            var stat1 = section.querySelector('.acr-stat-1');
            var stat2 = section.querySelector('.acr-stat-2');
            if (stat1 && page.heroStats[0]) {
                setText(stat1, '.acr-stat-val', page.heroStats[0].value);
                setText(stat1, '.acr-stat-label', page.heroStats[0].label);
            }
            if (stat2 && page.heroStats[1]) {
                setText(stat2, '.acr-stat-val', page.heroStats[1].value);
                setText(stat2, '.acr-stat-label', page.heroStats[1].label);
            }
        }
    }

    /** 3. Pillars (4 icon cards in .why-us .why-grid) */
    function populatePillars(pillars) {
        if (!pillars || !pillars.length) return;
        populateIconCards('.why-us .why-grid', pillars, 'why-card');
    }

    /** 4. Pricing Section (header + placeholder message + CTA) */
    function populatePricing(page) {
        populateSectionHeader('#acr-pricing', page.pricingLabel, page.pricingTitle, page.pricingSubtitle);

        // Pricing placeholder message
        if (page.pricingMessage) {
            var placeholder = document.querySelector('#acr-pricing .acr-pricing-placeholder');
            if (placeholder) {
                var msgP = placeholder.querySelector('p');
                if (msgP) msgP.textContent = page.pricingMessage;
            }
        }

        // Pricing CTA buttons
        var pricingBtns = document.querySelectorAll('#acr-pricing .hero-btns button');
        if (pricingBtns.length >= 1 && page.pricingCtaPrimary) {
            pricingBtns[0].innerHTML = page.pricingCtaPrimary.text;
            if (page.pricingCtaPrimary.link) pricingBtns[0].setAttribute('onclick', "window.location.href='" + page.pricingCtaPrimary.link + "'");
        }
        if (pricingBtns.length >= 2 && page.pricingCtaSecondary) {
            pricingBtns[1].textContent = page.pricingCtaSecondary.text;
            if (page.pricingCtaSecondary.link) pricingBtns[1].setAttribute('onclick', "window.location.href='" + page.pricingCtaSecondary.link + "'");
        }
    }

    /** 5. Features (12 icon cards in #acr-features .cloud-power-grid) */
    function populateFeatures(label, title, subtitle, features) {
        populateSectionHeader('#acr-features', label, title, subtitle);
        if (features && features.length) {
            populateIconCards('#acr-features .cloud-power-grid', features, 'cloud-power-card');
        }
    }

    /** 7. Why Choose ICSDC (6 icon cards in #acr-why .cloud-use-grid) */
    function populateWhyCards(label, title, subtitle, cards) {
        populateSectionHeader('#acr-why', label, title, subtitle);
        if (cards && cards.length) {
            populateIconCards('#acr-why .cloud-use-grid', cards, 'cloud-use-card');
        }
    }

    /** 8. Testimonials */
    function buildTestiCard(t, index) {
        var initials = getInitials(t.name);
        var stars = '';
        for (var s = 0; s < (t.rating || 5); s++) { stars += starSVG(); }

        return '<article class="testi-card" role="listitem" data-testi-index="' + index + '" aria-label="Testimonial from ' + t.name + '">' +
            '<div class="testi-left">' +
            '<div class="testi-avatar" aria-hidden="true">' +
            '<span class="testi-avatar-initials">' + initials + '</span>' +
            '</div>' +
            '<div class="testi-client-info">' +
            '<p class="testi-name">' + t.name + '</p>' +
            '<p class="testi-job">' + (t.title || '') + '</p>' +
            '<p class="testi-company">' + (t.company || '') + '</p>' +
            '</div>' +
            '<div class="testi-rating" aria-label="Rating: ' + (t.rating || 5) + ' out of 5 stars">' + stars + '</div>' +
            '</div>' +
            '<div class="testi-right">' +
            '<blockquote class="testi-quote">' + t.quote + '</blockquote>' +
            '</div>' +
            '</article>';
    }

    function initTestimonials(items) {
        var grid = document.getElementById('acr-testi-grid');
        var dotsWrap = document.getElementById('acr-testi-dots');
        var prevBtn = document.getElementById('acr-testi-prev');
        var nextBtn = document.getElementById('acr-testi-next');
        if (!grid || !dotsWrap || !items || !items.length) return;

        grid.innerHTML = items.map(function (t, i) { return buildTestiCard(t, i); }).join('');

        dotsWrap.innerHTML = items.map(function (_, i) {
            return '<button class="testi-dot' + (i === 0 ? ' testi-dot-active' : '') + '" role="tab" aria-selected="' + (i === 0) + '" aria-label="Go to testimonial ' + (i + 1) + '" data-dot="' + i + '"></button>';
        }).join('');

        var cards = Array.from(grid.querySelectorAll('.testi-card'));
        var dots = Array.from(dotsWrap.querySelectorAll('.testi-dot'));

        function scrollToCard(index) {
            var card = cards[index];
            if (!card) return;
            grid.scrollTo({ left: card.offsetLeft - 4, behavior: 'smooth' });
        }

        dots.forEach(function (btn, i) {
            btn.addEventListener('click', function () { scrollToCard(i); });
        });

        function currentIndex() {
            var scrollLeft = grid.scrollLeft;
            var closest = 0, minDist = Infinity;
            cards.forEach(function (card, i) {
                var dist = Math.abs(card.offsetLeft - scrollLeft);
                if (dist < minDist) { minDist = dist; closest = i; }
            });
            return closest;
        }

        if (prevBtn) prevBtn.addEventListener('click', function () {
            var idx = currentIndex();
            scrollToCard(idx === 0 ? items.length - 1 : idx - 1);
        });

        if (nextBtn) nextBtn.addEventListener('click', function () {
            var idx = currentIndex();
            scrollToCard(idx === items.length - 1 ? 0 : idx + 1);
        });

        var scrollTimer;
        grid.addEventListener('scroll', function () {
            clearTimeout(scrollTimer);
            scrollTimer = setTimeout(function () {
                var idx = currentIndex();
                dots.forEach(function (d, i) {
                    d.classList.toggle('testi-dot-active', i === idx);
                    d.setAttribute('aria-selected', i === idx ? 'true' : 'false');
                });
            }, 80);
        });
    }

    /** 9. FAQ Accordion */
    function initFAQ(faqItems) {
        var dl = document.getElementById('acr-faq-accordions');
        if (!dl || !faqItems || !faqItems.length) return;

        var sorted = faqItems.slice().sort(function (a, b) { return (a.order || 0) - (b.order || 0); });
        var openIndex = 0;

        function render() {
            dl.innerHTML = sorted.map(function (faq, i) {
                var isOpen = i === openIndex;
                return '<div class="faq-item' + (isOpen ? ' faq-open' : '') + '" data-faq-index="' + i + '">' +
                    '<dt>' +
                    '<button class="faq-question" aria-expanded="' + isOpen + '" aria-controls="acr-faq-' + i + '">' +
                    '<span>' + faq.question + '</span>' +
                    '<svg class="faq-chevron" viewBox="0 0 20 20" fill="none" aria-hidden="true">' +
                    '<path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>' +
                    '</svg>' +
                    '</button>' +
                    '</dt>' +
                    '<dd class="faq-answer" id="acr-faq-' + i + '" role="region">' +
                    '<p>' + faq.answer + '</p>' +
                    '</dd>' +
                    '</div>';
            }).join('');

            dl.querySelectorAll('.faq-question').forEach(function (btn) {
                btn.addEventListener('click', function () {
                    var index = parseInt(btn.closest('.faq-item').dataset.faqIndex, 10);
                    openIndex = (openIndex === index) ? null : index;
                    render();
                });
            });
        }

        render();
    }

    /* ─────────────────────────────────────────────────────────
       BOOT -- Fetch from CMS, then populate all sections
    ───────────────────────────────────────────────────────── */
    async function init() {
        markActiveNavLink();

        try {
            var response = await getAcronisBackupPage();
            var page = response.data;

            // 1. SEO
            populateSEO(page.seo);

            // 2. Hero
            populateAcrHero(page);

            // 3. Pillars
            populatePillars(page.pillars);

            // 4. Pricing
            populatePricing(page);

            // 5. Features
            populateFeatures(page.featuresLabel, page.featuresTitle, page.featuresSubtitle, page.features);

            // 6. CTA Band #1
            populateCtaBand('.cloud-cta-band:not(.cloud-cta-dark)', page.ctaBand1);

            // 7. Why Choose ICSDC
            populateWhyCards(page.whyLabel, page.whyTitle, page.whySubtitle, page.whyCards);

            // 8. Testimonials
            if (page.testimonialTitle) {
                setText(document, '#acr-testi-heading', page.testimonialTitle);
            }
            initTestimonials(page.testimonials);

            // 9. FAQ
            if (page.faqTitle) {
                setText(document, '#acr-faq-heading', page.faqTitle);
            }
            initFAQ(page.faqs);

            // 10. CTA Band #2
            populateCtaBand('.cloud-cta-dark', page.ctaBand2);

        } catch (err) {
            console.error('[acronis-backup] Failed to load CMS data:', err);
        }

        // Always hide loader after content attempt
        hidePageLoader();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
