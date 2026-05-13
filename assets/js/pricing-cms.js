/**
 * pricing-cms.js
 * ──────────────
 * Fetches all Pricing page content from Strapi and populates the DOM.
 *
 * Responsibilities:
 *   1. SEO meta tags
 *   2. Hero (eyebrow, title, sub, badges)
 *   3. Sidebar nav (grouped, with dividers)
 *   4. Mobile tab bar
 *   5. Billing toggle row (if applicable)
 *   6. All pricing sections + tables
 *   7. CTA band
 *   8. Show/hide page loader
 *
 * pricing.js handles: scroll-spy, sidebar phase (fixed/relative/absolute),
 * click-to-scroll, billing toggle state — do NOT duplicate that logic here.
 *
 * The billing toggle in pricing.js watches [data-price-monthly] and
 * [data-price-annual] attributes — these exact attribute names are used
 * when rendering price cells that have an annual subValue.
 */

import { getPricingPage } from './services/contentService.js';
import { populateSEO } from './utils/cms-helpers.js';

(function () {
    'use strict';

    /* ─────────────────────────────────────────────────────────
       SAFE TEXT / HTML HELPERS
    ───────────────────────────────────────────────────────── */

    function esc(str) {
        if (str == null) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    }

    function setText(el, text) {
        if (el && text != null) el.textContent = text;
    }

    /* ─────────────────────────────────────────────────────────
       HERO
    ───────────────────────────────────────────────────────── */

    function populateHero(page) {
        // Eyebrow text
        var eyebrowText = document.querySelector('[data-pr="eyebrow-text"]');
        setText(eyebrowText, page.heroEyebrow || '');

        // Title
        var titleEl = document.querySelector('[data-pr="title"]');
        setText(titleEl, page.heroTitle || '');

        // Sub
        var subEl = document.querySelector('[data-pr="sub"]');
        setText(subEl, page.heroSub || '');

        // Badges
        var badgesEl = document.getElementById('pr-hero-badges');
        if (badgesEl && Array.isArray(page.heroBadges) && page.heroBadges.length) {
            badgesEl.innerHTML = page.heroBadges.map(function (b) {
                return '<span class="pr-badge">' + esc(b.text) + '</span>';
            }).join('');
        }
    }

    /* ─────────────────────────────────────────────────────────
       SIDEBAR NAV + MOBILE TABS
       Group sections by sidebarGroupLabel. A null/empty label
       means the section inherits the previous group (no new label).
    ───────────────────────────────────────────────────────── */

    function buildNavigation(sections, page) {
        var sidebarEl = document.getElementById('pr-sidebar-nav');
        var mobTabsEl = document.getElementById('pr-mob-tabs');
        if (!sidebarEl || !sections || !sections.length) return;

        var sidebarHTML = '';
        var mobHTML = '';
        var lastGroupLabel = null;
        var isFirstGroup = true;

        sections.forEach(function (sec, idx) {
            var groupLabel = sec.sidebarGroupLabel || null;

            // Start a new group if this section has a non-empty label
            if (groupLabel) {
                if (!isFirstGroup) {
                    sidebarHTML += '<div class="pr-sidebar-divider"></div>';
                }
                sidebarHTML += '<div class="pr-sidebar-label">' + esc(groupLabel) + '</div>';
                lastGroupLabel = groupLabel;
                isFirstGroup = false;
            }

            var isActive = idx === 0 ? ' is-active' : '';
            var icon = sec.sidebarIcon
                ? '<span class="pr-sidebar-icon"><i class="fa-solid fa-' + esc(sec.sidebarIcon) + '"></i></span> '
                : '';

            sidebarHTML += '<button class="pr-sidebar-link' + isActive + '" data-target="' + esc(sec.sectionId) + '">' +
                icon + esc(sec.sidebarLinkText) +
                '</button>';

            // Mobile tabs — icon + short text
            var mobIsActive = idx === 0 ? ' is-active' : '';
            var mobIcon = sec.sidebarIcon
                ? '<i class="fa-solid fa-' + esc(sec.sidebarIcon) + '"></i> '
                : '';
            mobHTML += '<button class="pr-mob-tab' + mobIsActive + '" data-target="' + esc(sec.sectionId) + '">' +
                mobIcon + esc(sec.sidebarLinkText) +
                '</button>';
        });

        sidebarEl.innerHTML = sidebarHTML;
        if (mobTabsEl) mobTabsEl.innerHTML = mobHTML;
    }

    /* ─────────────────────────────────────────────────────────
       BILLING TOGGLE ROW
       Inserted as first child of #pr-content.
       pricing.js will then wire up the toggle behaviour.
    ───────────────────────────────────────────────────────── */

    function buildBillingToggle(page, contentEl) {
        if (!page.showBillingToggle) return;

        var monthlyLabel = page.billingMonthlyLabel || 'Monthly';
        var annualLabel = page.billingAnnualLabel || 'Annual';
        var savePill = page.billingSavePill || '';

        var html = '<div class="pr-billing-row">' +
            '<span class="pr-bill-opt is-monthly is-active">' + esc(monthlyLabel) + '</span>' +
            '<div class="pr-billing-switch" role="switch" aria-checked="false" tabindex="0"></div>' +
            '<span class="pr-bill-opt is-annual">' + esc(annualLabel) + '</span>' +
            (savePill ? '<span class="pr-save-pill">' + esc(savePill) + '</span>' : '') +
            '</div>';

        contentEl.insertAdjacentHTML('beforeend', html);
    }

    /* ─────────────────────────────────────────────────────────
       TABLE RENDERING
       New simplified structure:
         table.plans    → array of { name, monthlyPrice, annualPrice, isPopular, ctaText }
         table.features → array of { feature, p1, p2, p3, p4, p5, isHighlighted }

       Auto-generates:
         - thead row from plan names (+ POPULAR badge)
         - price row from plan prices (monthly/annual toggle)
         - CTA row from plan ctaText
         - feature rows from features array (p1–p5 map to plan positions)
    ───────────────────────────────────────────────────────── */

    /* ─────────────────────────────────────────────────────────
       SPEC-ROW TABLE
       Plans as rows, specs as columns.
       Auto-enabled when any plan has cpu / ram / storage /
       bandwidth / gpu fields filled.
    ───────────────────────────────────────────────────────── */

    var SPEC_COLS = [
        { key: 'cpu',       label: 'CPU',      icon: 'microchip'     },
        { key: 'ram',       label: 'RAM',      icon: 'memory'        },
        { key: 'gpu',       label: 'GPU',      icon: 'bolt'          },
        { key: 'storage',   label: 'Storage',  icon: 'hard-drive'    },
        { key: 'bandwidth', label: 'Transfer', icon: 'network-wired' },
    ];

    function renderSpecTable(table, plans) {
        // Standard spec columns (only render where ≥ 1 plan has a value)
        var activeCols = SPEC_COLS.filter(function (col) {
            return plans.some(function (p) { return p[col.key]; });
        });

        // Custom columns defined on the table (c1Label … c4Label)
        ['c1', 'c2', 'c3', 'c4'].forEach(function (k) {
            var label = table[k + 'Label'];
            if (label) {
                activeCols.push({ key: k, label: label, icon: null });
            }
        });

        var hasPrice  = plans.some(function (p) { return p.monthlyPrice; });
        var priceLabel = table.priceLabel || 'Monthly';

        // ── thead ──
        var headCells = '<th class="pr-sc-th pr-sc-th-name">Plan</th>';
        activeCols.forEach(function (col) {
            var iconHtml = col.icon
                ? '<i class="fa-solid fa-' + esc(col.icon) + '"></i>'
                : '';
            headCells += '<th class="pr-sc-th pr-sc-th-spec">' +
                iconHtml + '<span>' + esc(col.label) + '</span></th>';
        });
        if (hasPrice) {
            headCells += '<th class="pr-sc-th pr-sc-th-price">' +
                '<i class="fa-solid fa-tag"></i><span>' + esc(priceLabel) + '</span></th>';
        }
        headCells += '<th class="pr-sc-th pr-sc-th-action"></th>';

        var theadHTML = '<thead><tr class="pr-sc-head-row">' + headCells + '</tr></thead>';

        // ── tbody ──
        var tbodyRows = plans.map(function (plan) {
            var isFeat = !!plan.isPopular;
            var rowCls = isFeat ? ' class="pr-sc-row pr-sc-row-featured"' : ' class="pr-sc-row"';

            // Name cell
            var badge = isFeat ? '<span class="pr-sc-pop-badge">Popular</span>' : '';
            var nameTd = '<td class="pr-sc-td-name">' +
                '<span class="pr-sc-name-text">' + esc(plan.name) + '</span>' +
                badge + '</td>';

            // Spec cells
            var specTds = activeCols.map(function (col) {
                return '<td class="pr-sc-td-spec">' + esc(plan[col.key] || '—') + '</td>';
            }).join('');

            // Price cell
            var priceTd = '';
            if (hasPrice) {
                var pInner = '';
                if (plan.monthlyPrice && plan.annualPrice) {
                    pInner = '<span class="pr-sc-price" data-price-monthly>' +
                             esc(plan.monthlyPrice) +
                             '<span class="pr-sc-price-sub">/mo</span></span>' +
                             '<span class="pr-sc-price" data-price-annual>' +
                             esc(plan.annualPrice) +
                             '<span class="pr-sc-price-sub">/mo</span></span>';
                } else if (plan.monthlyPrice) {
                    pInner = '<span class="pr-sc-price">' +
                             esc(plan.monthlyPrice) +
                             '<span class="pr-sc-price-sub">/mo</span></span>';
                }
                priceTd = '<td class="pr-sc-td-price">' + pInner + '</td>';
            }

            // Action cell
            var btnCls = isFeat ? 'pr-sc-btn pr-sc-btn-featured' : 'pr-sc-btn';
            var actionTd = '<td class="pr-sc-td-action">' +
                '<button class="' + btnCls + '">' +
                esc(plan.ctaText || 'Deploy') + '</button></td>';

            return '<tr' + rowCls + '>' + nameTd + specTds + priceTd + actionTd + '</tr>';
        }).join('');

        var html =
            '<div class="pr-table-wrap">' +
            '<table class="pr-table pr-spec-table">' +
            theadHTML +
            '<tbody>' + tbodyRows + '</tbody>' +
            '</table></div>';

        if (table.caption) {
            html += '<p class="pr-caption">' + esc(table.caption) + '</p>';
        }
        if (table.noteText) {
            var nc = table.noteType === 'warning' ? 'pr-note pr-note-warning' : 'pr-note';
            html += '<div class="' + nc + '">&#8505;&#65039; ' + esc(table.noteText) + '</div>';
        }
        return html;
    }

    /* ─────────────────────────────────────────────────────────
       COMPARISON TABLE  (plans as columns, features as rows)
       Used when plans have no spec fields.
    ───────────────────────────────────────────────────────── */

    var PLAN_KEYS = ['p1', 'p2', 'p3', 'p4', 'p5'];

    function renderComparisonTable(table, plans, features) {
        var featuredIdx = plans.findIndex(function (p) { return p.isPopular; });

        function planCls(i) {
            return i === featuredIdx
                ? ' class="pr-plan-col pr-plan-featured"'
                : ' class="pr-plan-col"';
        }

        // Row 1 — plan names
        var nameRow = '<tr class="pr-thead-names">' +
            '<th class="pr-feature-col"></th>' +
            plans.map(function (plan, i) {
                var badge = plan.isPopular ? '<span class="pr-popular-tag">POPULAR</span>' : '';
                return '<th' + planCls(i) + '>' + badge +
                    '<span class="pr-plan-name">' + esc(plan.name) + '</span></th>';
            }).join('') + '</tr>';

        // Row 2 — prices
        var priceRow = '';
        if (plans.some(function (p) { return p.monthlyPrice; })) {
            priceRow = '<tr class="pr-thead-prices">' +
                '<th class="pr-feature-col"></th>' +
                plans.map(function (plan, i) {
                    var inner = '';
                    if (plan.monthlyPrice && plan.annualPrice) {
                        inner = '<div class="pr-price-amount" data-price-monthly>' +
                                esc(plan.monthlyPrice) +
                                '<span class="pr-pa-sub">/mo</span></div>' +
                                '<div class="pr-price-amount pr-price-annual-amt" data-price-annual>' +
                                esc(plan.annualPrice) +
                                '<span class="pr-pa-sub">/mo</span></div>';
                    } else if (plan.monthlyPrice) {
                        inner = '<div class="pr-price-amount">' + esc(plan.monthlyPrice) + '</div>';
                    }
                    return '<th' + planCls(i) + '>' + inner + '</th>';
                }).join('') + '</tr>';
        }

        // Row 3 — CTA buttons
        var ctaRow = '';
        if (plans.some(function (p) { return p.ctaText; })) {
            ctaRow = '<tr class="pr-thead-cta">' +
                '<th class="pr-feature-col"></th>' +
                plans.map(function (plan, i) {
                    var btnCls = plan.isPopular ? 'pr-plan-btn pr-plan-btn-featured' : 'pr-plan-btn';
                    return '<th' + planCls(i) + '><button class="' + btnCls + '">' +
                        esc(plan.ctaText || 'Get Started') + '</button></th>';
                }).join('') + '</tr>';
        }

        // tbody — feature rows
        var featureRows = features.map(function (row) {
            var trCls = row.isHighlighted ? ' class="pr-row-hl"' : '';
            var cells = '<td class="pr-feature-label">' + esc(row.feature || '') + '</td>';
            plans.forEach(function (plan, i) {
                var val = row[PLAN_KEYS[i]] != null ? row[PLAN_KEYS[i]] : '';
                var tdCls = i === featuredIdx ? ' class="pr-col-featured"' : '';
                cells += '<td' + tdCls + '>' + esc(val) + '</td>';
            });
            return '<tr' + trCls + '>' + cells + '</tr>';
        }).join('');

        var html =
            '<div class="pr-table-wrap">' +
            '<table class="pr-table">' +
            '<thead>' + nameRow + priceRow + ctaRow + '</thead>' +
            '<tbody>' + featureRows + '</tbody>' +
            '</table></div>';

        if (table.caption) {
            html += '<p class="pr-caption">' + esc(table.caption) + '</p>';
        }
        if (table.noteText) {
            var nc = table.noteType === 'warning' ? 'pr-note pr-note-warning' : 'pr-note';
            html += '<div class="' + nc + '">&#8505;&#65039; ' + esc(table.noteText) + '</div>';
        }
        return html;
    }

    /* ─────────────────────────────────────────────────────────
       TABLE DISPATCHER
       Auto-selects spec-row or comparison layout.
    ───────────────────────────────────────────────────────── */

    function renderTable(table) {
        if (!table) return '';

        var plans    = Array.isArray(table.plans)    ? table.plans    : [];
        var features = Array.isArray(table.features) ? table.features : [];

        if (!plans.length && !features.length) return '';

        // Use spec-row if any plan has a spec field OR if table has custom column labels
        var isSpecRow = plans.some(function (p) {
            return p.cpu || p.ram || p.storage || p.bandwidth || p.gpu || p.c1 || p.c2;
        }) || !!(table.c1Label || table.c2Label);

        return isSpecRow
            ? renderSpecTable(table, plans)
            : renderComparisonTable(table, plans, features);
    }

    /* ─────────────────────────────────────────────────────────
       SECTIONS
    ───────────────────────────────────────────────────────── */

    function buildSections(sections, contentEl) {
        if (!sections || !sections.length) return;

        sections.forEach(function (sec) {
            var tablesHTML = '';
            if (Array.isArray(sec.tables)) {
                sec.tables.forEach(function (tbl) {
                    tablesHTML += renderTable(tbl);
                });
            }

            var tagHTML = sec.sectionTag
                ? '<span class="pr-section-tag">' + esc(sec.sectionTag) + '</span>'
                : '';
            var descHTML = sec.description
                ? '<p class="pr-section-desc">' + esc(sec.description) + '</p>'
                : '';

            var secHTML =
                '<section class="pr-section" id="' + esc(sec.sectionId) + '">' +
                tagHTML +
                '<h2 class="pr-section-title">' + esc(sec.title) + '</h2>' +
                descHTML +
                tablesHTML +
                '</section>';

            contentEl.insertAdjacentHTML('beforeend', secHTML);
        });
    }

    /* ─────────────────────────────────────────────────────────
       CTA BAND
    ───────────────────────────────────────────────────────── */

    function populateCtaBand(cta) {
        if (!cta) return;

        var titleEl = document.querySelector('[data-pr="cta-title"]');
        var descEl = document.querySelector('[data-pr="cta-desc"]');
        var primBtn = document.querySelector('[data-pr="cta-primary-btn"]');
        var secBtn = document.querySelector('[data-pr="cta-secondary-btn"]');

        setText(titleEl, cta.title || '');
        setText(descEl, cta.description || '');

        if (primBtn && cta.ctaPrimary) {
            primBtn.textContent = cta.ctaPrimary.text || 'Talk to an Expert';
            if (cta.ctaPrimary.link) {
                primBtn.setAttribute('onclick', "window.location.href='" + cta.ctaPrimary.link + "'");
            }
        }
        if (secBtn && cta.ctaSecondary) {
            secBtn.textContent = cta.ctaSecondary.text || '';
            if (cta.ctaSecondary.link) {
                secBtn.setAttribute('onclick', "window.location.href='" + cta.ctaSecondary.link + "'");
            } else {


            }
        } else {
            secBtn.style.display = 'none';
        }
    }

    /* ─────────────────────────────────────────────────────────
       LOADER HELPERS
    ───────────────────────────────────────────────────────── */

    function hideLoader() {
        var loader = document.getElementById('page-loader');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(function () { loader.style.display = 'none'; }, 300);
        }
    }

    /* ─────────────────────────────────────────────────────────
       MAIN INIT
    ───────────────────────────────────────────────────────── */

    document.addEventListener('DOMContentLoaded', function () {

        getPricingPage()
            .then(function (data) {
                // Strapi v5 returns data directly for single types
                var page = data && data.data ? data.data : data;
                if (!page) {
                    console.warn('[pricing-cms] No data returned from Strapi');
                    hideLoader();
                    return;
                }

                // 1. SEO
                populateSEO(page.seo);

                // 2. Hero
                populateHero(page);

                // 3. Sidebar + Mobile tabs
                buildNavigation(page.sections || [], page);

                // 4. Content area — billing toggle + sections
                var contentEl = document.getElementById('pr-content');
                if (contentEl) {
                    // Billing toggle row first
                    buildBillingToggle(page, contentEl);

                    // Then all sections
                    buildSections(page.sections || [], contentEl);
                }

                // 5. CTA band
                populateCtaBand(page.ctaBand);

                // 6. Hide loader, then signal pricing.js to initialise
                hideLoader();
                document.dispatchEvent(new CustomEvent('pricing:ready'));
            })
            .catch(function (err) {
                console.error('[pricing-cms] Failed to load pricing page data:', err);
                hideLoader();
            });
    });

})();
