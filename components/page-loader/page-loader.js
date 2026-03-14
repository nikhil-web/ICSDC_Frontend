// ══════════════════════════════════════════════════════════
//  page-loader.js — Page loader show/hide logic
// ══════════════════════════════════════════════════════════

export function showLoader() {
    document.getElementById('page-loader')?.classList.remove('loader-hidden');
}

export function hideLoader() {
    const loader = document.getElementById('page-loader');
    if (!loader) return;
    loader.classList.add('loader-done');
    setTimeout(() => loader.classList.add('loader-hidden'), 400);
}
