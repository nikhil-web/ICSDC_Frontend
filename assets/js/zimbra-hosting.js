/**
 * zimbra-hosting.js
 * ─────────────────
 * CMS-driven version: fetches all page content from Strapi
 * and populates DOM sections dynamically.
 *
 * Sections handled:
 *   1.  SEO meta tags
 *   2.  Hero (eyebrow + visual badges)
 *   3.  4 Pillars (icon cards)
 *   4.  Feature Badges (21 items)
 *   5.  Why Choose ICSDC (8 icon cards)
 *   6.  CTA Band #1
 *   7.  Migration Steps (6 steps)
 *   8.  Comparison Table (Zimbra vs M365)
 *   9.  FAQ (8 items + contact card)
 *   10. CTA Band #2
 *   11. Footer
 */

import { getZimbraHostingPage } from './services/contentService.js';

(function () {
    'use strict';

    /* ─────────────────────────────────────────────────────────
       ICONS MAP — CMS stores key names, we resolve to SVG here
    ───────────────────────────────────────────────────────── */
    var ICONS = {
        shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="22" height="22"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
        activity: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="22" height="22"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>',
        grid: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="22" height="22"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg>',
        users: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="22" height="22"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>',
        monitor: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="22" height="22"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>',
        layers: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="22" height="22"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5M2 12l10 5 10-5"/></svg>',
        code: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="22" height="22"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
        database: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="22" height="22"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/></svg>',
        'file-text': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="22" height="22"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M9 9h6M9 12h6M9 15h4"/></svg>',
        lock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="22" height="22"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>',
        clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="22" height="22"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>'
    };

    /* ─────────────────────────────────────────────────────────
       HELPERS
    ───────────────────────────────────────────────────────── */

    function setText(parent, selector, text) {
        var el = parent.querySelector(selector);
        if (el && text != null) el.textContent = text;
    }

    function setHTML(parent, selector, html) {
        var el = parent.querySelector(selector);
        if (el && html != null) el.innerHTML = html;
    }

    function resolveIcon(key) {
        return (key && ICONS[key]) || defaultIconSVG();
    }

    function defaultIconSVG() {
        return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="22" height="22">' +
            '<circle cx="12" cy="12" r="10" />' +
            '</svg>';
    }

    function starSVG() {
        return '<svg class="testi-star" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">' +
            '<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>' +
            '</svg>';
    }

    function getInitials(name) {
        return name.split(' ').map(function (n) { return n[0]; }).join('').toUpperCase().slice(0, 2);
    }

    /* ─────────────────────────────────────────────────────────
       SECTION POPULATORS
    ───────────────────────────────────────────────────────── */

    /** 1. SEO Meta */
    function populateSEO(seo) {
        if (!seo) return;
        if (seo.metaTitle) document.title = seo.metaTitle;
        if (seo.metaDescription) {
            var meta = document.querySelector('meta[name="description"]');
            if (meta) meta.setAttribute('content', seo.metaDescription);
        }
    }

    /** 2. Hero Section */
    function populateHero(page) {
        var section = document.querySelector('.hero-section');
        if (!section) return;

        if (page.heroEyebrow) setHTML(section, '.zimbra-eyebrow', page.heroEyebrow);
        if (page.heroTitle) setText(section, '.hero-title', page.heroTitle);
        if (page.heroSubtitle) setText(section, '.hero-sub', page.heroSubtitle);
        if (page.heroDescription) setHTML(section, '.hero-desc', page.heroDescription);

        // CTA Buttons
        var btns = section.querySelectorAll('.hero-btns button');
        if (btns.length >= 2) {
            if (page.heroCtaPrimary) {
                btns[0].innerHTML = page.heroCtaPrimary.text;
                if (page.heroCtaPrimary.link) btns[0].setAttribute('onclick', "window.location.href='" + page.heroCtaPrimary.link + "'");
            }
            if (page.heroCtaSecondary) {
                btns[1].textContent = page.heroCtaSecondary.text;
                if (page.heroCtaSecondary.link) btns[1].setAttribute('onclick', "window.location.href='" + page.heroCtaSecondary.link + "'");
            }
        }

        // Visual badges
        if (page.heroTopBadge) setHTML(section, '.zimbra-top-badge', page.heroTopBadge);
        if (page.heroStatusTitle) setText(section, '.zimbra-bt', page.heroStatusTitle);
        if (page.heroStatusSubtitle) setText(section, '.zimbra-bs', page.heroStatusSubtitle);
    }

    /** 3. Pillars (4 icon cards) */
    function populatePillars(pillars) {
        if (!pillars || !pillars.length) return;
        var grid = document.querySelector('.why-us .why-grid');
        if (!grid) return;

        var sorted = pillars.slice().sort(function (a, b) { return (a.order || 0) - (b.order || 0); });

        grid.innerHTML = sorted.map(function (card) {
            return '<div class="why-card">' +
                '<div class="why-icon" aria-hidden="true">' + resolveIcon(card.icon) + '</div>' +
                '<h3>' + card.title + '</h3>' +
                '<p>' + card.description + '</p>' +
                '</div>';
        }).join('');
    }

    /** 4. Feature Badges */
    function populateFeatures(label, title, subtitle, badges) {
        var section = document.getElementById('features');
        if (!section) return;

        if (label) setText(section, '.cloud-section-label', label);
        if (title) setText(section, '.title', title);
        if (subtitle) setHTML(section, '.subtitle', subtitle);

        if (!badges || !badges.length) return;
        var grid = section.querySelector('.zimbra-features-grid');
        if (!grid) return;

        var sorted = badges.slice().sort(function (a, b) { return (a.order || 0) - (b.order || 0); });

        grid.innerHTML = sorted.map(function (b) {
            return '<div class="zimbra-feat-badge">' + b.text + '</div>';
        }).join('');
    }

    /** 5. Why Choose ICSDC (8 icon cards) */
    function populateWhyCards(label, title, subtitle, cards) {
        var section = document.getElementById('why-us');
        if (!section) return;

        if (label) setText(section, '.cloud-section-label', label);
        if (title) setText(section, '.title', title);
        if (subtitle) setHTML(section, '.subtitle', subtitle);

        if (!cards || !cards.length) return;
        var grid = section.querySelector('.cloud-power-grid');
        if (!grid) return;

        var sorted = cards.slice().sort(function (a, b) { return (a.order || 0) - (b.order || 0); });

        grid.innerHTML = sorted.map(function (card) {
            return '<div class="cloud-power-card">' +
                '<div class="cloud-power-icon">' + resolveIcon(card.icon) + '</div>' +
                '<h3>' + card.title + '</h3>' +
                '<p>' + card.description + '</p>' +
                '</div>';
        }).join('');
    }

    /** 6. CTA Band */
    function populateCtaBand(selector, cta) {
        if (!cta) return;
        var section = document.querySelector(selector);
        if (!section) return;
        var inner = section.querySelector('.cloud-cta-inner');
        if (!inner) return;

        setHTML(inner, 'h2', cta.title);
        setHTML(inner, 'p', cta.description);

        var btns = inner.querySelector('.cloud-cta-btns');
        if (btns) {
            var primaryBtn = btns.querySelector('.cloud-cta-btn-primary');
            var secondaryBtn = btns.querySelector('.cloud-cta-btn-outline');
            if (primaryBtn && cta.ctaPrimary) {
                primaryBtn.innerHTML = cta.ctaPrimary.text;
                if (cta.ctaPrimary.link) primaryBtn.setAttribute('onclick', "window.location.href='" + cta.ctaPrimary.link + "'");
            }
            if (secondaryBtn && cta.ctaSecondary) {
                secondaryBtn.textContent = cta.ctaSecondary.text;
                if (cta.ctaSecondary.link) secondaryBtn.setAttribute('onclick', "window.location.href='" + cta.ctaSecondary.link + "'");
            }
        }
    }

    /** 7. Migration Steps */
    function populateMigration(label, title, subtitle, steps) {
        var section = document.getElementById('migration');
        if (!section) return;

        if (label) setText(section, '.cloud-section-label', label);
        if (title) setText(section, '.title', title);
        if (subtitle) setHTML(section, '.subtitle', subtitle);

        if (!steps || !steps.length) return;
        var grid = section.querySelector('.zimbra-steps');
        if (!grid) return;

        var sorted = steps.slice().sort(function (a, b) { return (a.order || 0) - (b.order || 0); });

        grid.innerHTML = sorted.map(function (step, i) {
            var arrow = (i < sorted.length - 1)
                ? '<div class="zimbra-step-arrow">&#8250;</div>'
                : '';
            return '<div class="zimbra-step">' +
                '<div class="zimbra-step-num">' + step.number + '</div>' +
                '<h3>' + step.title + '</h3>' +
                '<p>' + step.description + '</p>' +
                arrow +
                '</div>';
        }).join('');
    }

    /** 8. Comparison Table */
    function populateComparison(label, title, subtitle, columns, rows) {
        var section = document.getElementById('comparison');
        if (!section) return;

        if (label) setText(section, '.cloud-section-label', label);
        if (title) setText(section, '.title', title);
        if (subtitle) setHTML(section, '.subtitle', subtitle);

        // Column headers
        if (columns && columns.length) {
            var ths = section.querySelectorAll('.zimbra-compare thead th');
            columns.forEach(function (col, i) {
                if (ths[i]) ths[i].textContent = col;
            });
        }

        if (!rows || !rows.length) return;
        var tbody = section.querySelector('.zimbra-compare tbody');
        if (!tbody) return;

        var sorted = rows.slice().sort(function (a, b) { return (a.order || 0) - (b.order || 0); });

        tbody.innerHTML = sorted.map(function (r) {
            var zimbraClass = r.zimbraStatus === 'check' ? ' class="zimbra-check"'
                : r.zimbraStatus === 'cross' ? ' class="zimbra-cross"' : '';
            var m365Class = r.m365Status === 'check' ? ' class="zimbra-check"'
                : r.m365Status === 'cross' ? ' class="zimbra-cross"' : '';

            // For "Best For" row (neutral status), wrap in <strong>
            var zimbraContent = r.zimbraStatus === 'neutral' && !r.zimbraValue.startsWith('&#10003;') && !r.zimbraValue.startsWith('&#10007;')
                ? '<strong>' + r.zimbraValue + '</strong>'
                : r.zimbraValue;

            return '<tr>' +
                '<td>' + r.feature + '</td>' +
                '<td' + zimbraClass + '>' + zimbraContent + '</td>' +
                '<td' + m365Class + '>' + r.m365Value + '</td>' +
                '</tr>';
        }).join('');
    }

    /** 9. FAQ */
    function initZimbraFAQ(faqItems) {
        var dl = document.getElementById('zimbra-faq-accordions');
        if (!dl || !faqItems || !faqItems.length) return;

        var sorted = faqItems.slice().sort(function (a, b) { return (a.order || 0) - (b.order || 0); });
        var openIndex = 0;

        function render() {
            dl.innerHTML = sorted.map(function (faq, i) {
                var isOpen = i === openIndex;
                return '<div class="faq-item' + (isOpen ? ' faq-open' : '') + '" data-faq-index="' + i + '">' +
                    '<dt>' +
                    '<button class="faq-question" aria-expanded="' + isOpen + '" aria-controls="zfaq-' + i + '">' +
                    '<span>' + faq.question + '</span>' +
                    '<svg class="faq-chevron" viewBox="0 0 20 20" fill="none" aria-hidden="true">' +
                    '<path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>' +
                    '</svg>' +
                    '</button>' +
                    '</dt>' +
                    '<dd class="faq-answer" id="zfaq-' + i + '" role="region">' +
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

    /** FAQ Contact Card */
    function populateFaqContact(title, desc, btnLabel, btnUrl) {
        var card = document.querySelector('.faq-contact-card');
        if (!card) return;
        if (title) setHTML(card, '.faq-contact-title', title);
        if (desc) setHTML(card, '.faq-contact-desc', desc);
        if (btnLabel) {
            var btn = card.querySelector('.faq-contact-btn');
            if (btn) {
                var svg = btn.querySelector('svg');
                btn.textContent = btnLabel + ' ';
                if (svg) btn.appendChild(svg);
                if (btnUrl) btn.setAttribute('href', btnUrl);
            }
        }
    }

    /** 11. Footer */
    function populateFooter(footer) {
        if (!footer) return;
        var footerEl = document.querySelector('.site-footer');
        if (!footerEl) return;

        // Logo
        if (footer.logo) {
            var logoImg = footerEl.querySelector('.footer-logo');
            if (logoImg) logoImg.src = footer.logo;
        }

        // Address
        if (footer.address) {
            var addr = footerEl.querySelector('.footer-address');
            if (addr) {
                var a = footer.address;
                addr.innerHTML =
                    '<span>' + a.street + '</span>' +
                    '<span>' + a.city + '</span>' +
                    '<span>' + a.country + '</span>' +
                    '<span class="footer-phone">Phone: ' + a.phone + '</span>' +
                    '<span>Email: <a href="mailto:' + a.email + '" class="footer-email-link">' + a.email + '</a></span>';
            }
        }

        // Social links
        if (footer.socialLinks && footer.socialLinks.length) {
            var socialWrap = footerEl.querySelector('.footer-social');
            if (socialWrap) {
                socialWrap.innerHTML = footer.socialLinks.map(function (s) {
                    return '<a href="' + s.url + '" target="_blank" rel="noopener noreferrer" class="footer-social-link" aria-label="' + s.label + '">' +
                        s.svg +
                        '</a>';
                }).join('');
            }
        }

        // Link groups
        if (footer.linkGroups && footer.linkGroups.length) {
            var container = footerEl.querySelector('.footer-container');
            if (container) {
                container.querySelectorAll('.footer-link-group').forEach(function (g) { g.remove(); });

                footer.linkGroups.forEach(function (group) {
                    var div = document.createElement('div');
                    div.className = 'footer-link-group';
                    div.setAttribute('aria-labelledby', group.groupId);
                    div.innerHTML =
                        '<h3 id="' + group.groupId + '" class="footer-link-title">' + group.title + '</h3>' +
                        '<ul>' +
                        (group.links || []).map(function (link) {
                            return '<li><a href="' + link.url + '" class="footer-link">' + link.text + '</a></li>';
                        }).join('') +
                        '</ul>';
                    container.appendChild(div);
                });
            }
        }

        // Copyright
        if (footer.copyrightText) {
            var bottomP = footerEl.querySelector('.footer-bottom p');
            if (bottomP) {
                bottomP.innerHTML = footer.copyrightText.replace('{year}', new Date().getFullYear());
            }
        }
    }

    /* ─────────────────────────────────────────────────────────
       PAGE LOADER
    ───────────────────────────────────────────────────────── */
    function hidePageLoader() {
        var loader = document.getElementById('page-loader');
        if (!loader) return;
        loader.classList.add('loader-done');
        setTimeout(function () {
            loader.classList.add('loader-hidden');
        }, 520);
    }

    /* ─────────────────────────────────────────────────────────
       BOOT — Fetch from CMS, then populate all sections
    ───────────────────────────────────────────────────────── */
    async function init() {
        try {
            var response = await getZimbraHostingPage();
            var page = response.data;

            // 1. SEO
            populateSEO(page.seo);

            // 2. Hero
            populateHero(page);

            // 3. Pillars
            populatePillars(page.pillars);

            // 4. Feature Badges
            populateFeatures(page.featuresLabel, page.featuresTitle, page.featuresSubtitle, page.featureBadges);

            // 5. Why Choose ICSDC
            populateWhyCards(page.whyLabel, page.whyTitle, page.whySubtitle, page.whyCards);

            // 6. CTA Band #1
            populateCtaBand('.cloud-cta-band:not(.cloud-cta-dark)', page.ctaBand1);

            // 7. Migration Steps
            populateMigration(page.migrationLabel, page.migrationTitle, page.migrationSubtitle, page.migrationSteps);

            // 8. Comparison Table
            populateComparison(page.comparisonLabel, page.comparisonTitle, page.comparisonSubtitle, page.comparisonColumns, page.comparisonRows);

            // 9. Testimonials title (carousel handled by components.js)
            if (page.testimonialTitle) {
                setText(document, '#testi-heading', page.testimonialTitle);
            }

            // 10. FAQ
            if (page.faqTitle) {
                setText(document, '#faq-heading', page.faqTitle);
            }
            initZimbraFAQ(page.faqs);
            populateFaqContact(page.faqContactTitle, page.faqContactDescription, page.faqContactBtnLabel, page.faqContactBtnUrl);

            // 11. CTA Band #2
            populateCtaBand('.cloud-cta-dark', page.ctaBand2);

            // 12. Footer
            populateFooter(page.footer);

        } catch (err) {
            console.error('[zimbra-hosting] Failed to load CMS data:', err);
            // Page will display with hardcoded fallback content from HTML
        } finally {
            // Always hide loader after content attempt
            hidePageLoader();
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
