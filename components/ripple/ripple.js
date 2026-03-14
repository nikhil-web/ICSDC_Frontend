// ══════════════════════════════════════════════════════════
//  ripple.js — Button ripple effect
//  Extracted from polish.js and page-specific JS files.
//
//  Usage:
//    import { initRipple } from '../components/ripple/ripple.js';
//    initRipple('.ds-cta-btn-primary, .btn-primary');
// ══════════════════════════════════════════════════════════

let cssInjected = false;

function injectCSS() {
    if (cssInjected) return;
    cssInjected = true;
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rippleAnim {
            to { transform: scale(4); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

function addRipple(e) {
    const btn = e.currentTarget;
    const existing = btn.querySelector('.ripple-effect');
    if (existing) existing.remove();

    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    const ripple = document.createElement('span');
    ripple.className = 'ripple-effect';
    ripple.style.cssText = [
        'position:absolute',
        'border-radius:50%',
        'background:rgba(255,255,255,0.25)',
        'transform:scale(0)',
        'animation:rippleAnim 0.5s linear',
        'pointer-events:none',
        'width:' + size + 'px',
        'height:' + size + 'px',
        'left:' + x + 'px',
        'top:' + y + 'px'
    ].join(';');

    btn.style.overflow = 'hidden';
    btn.style.position = 'relative';
    btn.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove());
}

/**
 * initRipple(selector)
 * @param {string} selector - CSS selector for buttons to add ripple to
 */
export function initRipple(selector) {
    injectCSS();
    document.querySelectorAll(selector).forEach(btn => {
        btn.addEventListener('click', addRipple);
    });
}
