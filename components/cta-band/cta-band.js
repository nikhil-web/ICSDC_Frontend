// ══════════════════════════════════════════════════════════
//  cta-band.js — Reusable CTA band renderer
//
//  Usage:
//    import { renderCTABand } from '../components/cta-band/cta-band.js';
//    renderCTABand(containerEl, {
//        headline: 'Ready to Get Started?',
//        subtitle: 'Deploy your server in minutes.',
//        primaryBtn: { label: 'Get Started', href: '/contact' },
//        secondaryBtn: { label: 'View Plans', href: '/pricing' },
//        isDark: false,
//    });
// ══════════════════════════════════════════════════════════

/**
 * renderCTABand(container, config)
 * @param {HTMLElement|string} container - Element or CSS selector
 * @param {Object} config - CTA band configuration
 */
export function renderCTABand(container, config) {
    const el = typeof container === 'string' ? document.querySelector(container) : container;
    if (!el || !config) return;

    const darkClass = config.isDark ? ' cloud-cta-dark' : '';

    el.innerHTML = `
        <section class="cloud-cta-band${darkClass}">
            <div class="cloud-cta-inner">
                <h2>${config.headline || ''}</h2>
                <p>${config.subtitle || ''}</p>
                <div class="cloud-cta-btns">
                    ${config.primaryBtn ? `<a href="${config.primaryBtn.href || '#'}" class="cloud-cta-btn-primary">${config.primaryBtn.label}</a>` : ''}
                    ${config.secondaryBtn ? `<a href="${config.secondaryBtn.href || '#'}" class="cloud-cta-btn-outline">${config.secondaryBtn.label}</a>` : ''}
                </div>
            </div>
        </section>
    `;
}
