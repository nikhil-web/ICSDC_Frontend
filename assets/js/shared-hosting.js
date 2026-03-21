/**
 * shared-hosting.js
 * ─────────────────
 * CMS-driven page: fetches content from Strapi and populates DOM.
 *
 * Sections handled:
 *   1.  SEO meta tags
 *   2.  Hero (eyebrow + visual badges)
 *   3.  4 Pillars (icon cards)
 *   4.  Who We Are (about section)
 *   5.  Features (12 icon cards)
 *   6.  Why Choose ICSDC (8 numbered items)
 *   7.  Next-Gen Tech (6 icon cards)
 *   8.  CTA Band #1
 *   9.  Testimonials
 *  10.  FAQ
 *  11.  CTA Band #2
 */

import {
    populateSEO,
    populateHero,
    populateIconCards,
    populateSectionHeader,
    populateCtaBand,
    hidePageLoader,
    markActiveNavLink,
    setText,
    setHTML,
    resolveIcon,
    getInitials,
    starSVG
} from './utils/cms-helpers.js';

import { getSharedHostingPage } from './services/contentService.js';

(async function () {
    'use strict';

    markActiveNavLink();

    try {
        var res = await getSharedHostingPage();
        var page = res.data;

        /* 1. SEO */
        populateSEO(page.seo);

        /* 2. Hero */
        var heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            // Eyebrow
            if (page.heroEyebrow) {
                var eyebrow = heroSection.querySelector('.cloud-eyebrow');
                if (eyebrow) {
                    var dot = eyebrow.querySelector('.cloud-eyebrow-dot');
                    eyebrow.textContent = '';
                    if (dot) eyebrow.appendChild(dot);
                    eyebrow.appendChild(document.createTextNode(' ' + page.heroEyebrow));
                }
            }

            setText(heroSection, '.hero-title', page.heroTitle);
            setText(heroSection, '.hero-sub', page.heroSubtitle);
            setHTML(heroSection, '.hero-desc', page.heroDescription);

            // CTA buttons
            var heroBtns = heroSection.querySelectorAll('.hero-btns button');
            if (heroBtns.length >= 2) {
                if (page.heroCtaPrimary) {
                    heroBtns[0].innerHTML = page.heroCtaPrimary.text;
                    if (page.heroCtaPrimary.link) heroBtns[0].setAttribute('onclick', "window.location.href='" + page.heroCtaPrimary.link + "'");
                }
                if (page.heroCtaSecondary) {
                    heroBtns[1].textContent = page.heroCtaSecondary.text;
                    if (page.heroCtaSecondary.link) heroBtns[1].setAttribute('onclick', "window.location.href='" + page.heroCtaSecondary.link + "'");
                }
            }
        }

        /* 3. Pillars (4 icon cards) */
        populateIconCards('.why-us .why-grid', page.pillars, 'why-card');

        /* 4. Who We Are (about section) */
        var aboutSection = document.querySelector('#about');
        if (aboutSection) {
            if (page.aboutImage) {
                var imgEl = aboutSection.querySelector('.who-we-are-image img');
                if (imgEl) imgEl.src = page.aboutImage;
            }
            if (page.aboutLabel) setText(aboutSection, '.cloud-section-label', page.aboutLabel);
            if (page.aboutTitle) setText(aboutSection, '.title', page.aboutTitle);
            if (page.aboutDescription) setHTML(aboutSection, '.who-we-are-paragraph', page.aboutDescription);

            if (page.aboutItems && page.aboutItems.length) {
                var aboutGrid = aboutSection.querySelector('.cloud-why-grid');
                if (aboutGrid) {
                    aboutGrid.innerHTML = page.aboutItems.map(function (item) {
                        return '<div class="cloud-why-item">' +
                            '<div class="cloud-why-num">' + item.number + '</div>' +
                            '<h3>' + item.title + '</h3>' +
                            '</div>';
                    }).join('');
                }
            }
        }

        /* 5. Features (12 icon cards) */
        populateSectionHeader('#features', page.featuresLabel, page.featuresTitle, page.featuresSubtitle);
        populateIconCards('#features .cloud-power-grid', page.features, 'cloud-power-card');

        /* 6. Why Choose ICSDC (8 numbered items) */
        var whySection = document.querySelector('#why-us');
        if (whySection) {
            if (page.whyLabel) setText(whySection, '.cloud-section-label', page.whyLabel);
            if (page.whyTitle) setText(whySection, '.title', page.whyTitle);
            if (page.whySubtitle) setHTML(whySection, '.subtitle', page.whySubtitle);

            if (page.whyReasons && page.whyReasons.length) {
                var whyGrid = whySection.querySelector('.cloud-why-grid');
                if (whyGrid) {
                    whyGrid.innerHTML = page.whyReasons.map(function (item) {
                        return '<div class="cloud-why-item">' +
                            '<div class="cloud-why-num">' + item.number + '</div>' +
                            '<h3>' + item.title + '</h3>' +
                            '</div>';
                    }).join('');
                }
            }
        }

        /* 7. Next-Gen Tech (6 icon cards) */
        populateSectionHeader('#tech', page.techLabel, page.techTitle, page.techSubtitle);
        populateIconCards('#tech .cloud-use-grid', page.techCards, 'cloud-use-card');

        /* 8. CTA Band #1 */
        populateCtaBand('.cloud-cta-band:not(.cloud-cta-dark)', page.ctaBand1);

        /* 9. Testimonials */
        initTestimonials(page.testimonials, 'shared');

        /* 10. FAQ */
        initFAQ(page.faqs, 'shared');

        /* 11. CTA Band #2 */
        populateCtaBand('.cloud-cta-dark', page.ctaBand2);

    } catch (err) {
        console.error('[shared-hosting] CMS load failed:', err);
    }

    hidePageLoader();

    /* ───────────────────────────────────────────────────────
       TESTIMONIALS CAROUSEL
    ─────────────────────────────────────────────────────── */
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

    function initTestimonials(items, prefix) {
        if (!items || !items.length) return;
        var grid = document.getElementById(prefix + '-testi-grid');
        var dotsWrap = document.getElementById(prefix + '-testi-dots');
        var prevBtn = document.getElementById(prefix + '-testi-prev');
        var nextBtn = document.getElementById(prefix + '-testi-next');
        if (!grid || !dotsWrap) return;

        grid.innerHTML = items.map(function (t, i) { return buildTestiCard(t, i); }).join('');

        dotsWrap.innerHTML = items.map(function (_, i) {
            return '<button class="testi-dot' + (i === 0 ? ' testi-dot-active' : '') +
                '" role="tab" aria-selected="' + (i === 0) +
                '" aria-label="Go to testimonial ' + (i + 1) +
                '" data-dot="' + i + '"></button>';
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

    /* ───────────────────────────────────────────────────────
       FAQ ACCORDION
    ─────────────────────────────────────────────────────── */
    function initFAQ(faqItems, prefix) {
        var dl = document.getElementById(prefix + '-faq-accordions');
        if (!dl || !faqItems || !faqItems.length) return;

        var sorted = faqItems.slice().sort(function (a, b) { return (a.order || 0) - (b.order || 0); });
        var openIndex = 0;

        function render() {
            dl.innerHTML = sorted.map(function (faq, i) {
                var isOpen = i === openIndex;
                return '<div class="faq-item' + (isOpen ? ' faq-open' : '') + '" data-faq-index="' + i + '">' +
                    '<dt>' +
                    '<button class="faq-question" aria-expanded="' + isOpen + '" aria-controls="' + prefix + '-faq-a-' + i + '">' +
                    '<span>' + faq.question + '</span>' +
                    '<svg class="faq-chevron" viewBox="0 0 20 20" fill="none" aria-hidden="true">' +
                    '<path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>' +
                    '</svg>' +
                    '</button>' +
                    '</dt>' +
                    '<dd class="faq-answer" id="' + prefix + '-faq-a-' + i + '" role="region">' +
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

})();
