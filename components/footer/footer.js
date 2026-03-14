// ══════════════════════════════════════════════════════════
//  footer.js — Footer component logic
// ══════════════════════════════════════════════════════════

/**
 * initFooter()
 * Injects the current year into the footer copyright text.
 */
export function initFooter() {
    const el = document.getElementById('footer-year');
    if (el) el.textContent = new Date().getFullYear();
}
