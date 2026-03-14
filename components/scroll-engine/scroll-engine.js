// ══════════════════════════════════════════════════════════
//  scroll-engine.js — Apple-style scroll animation engine
//  Uses IntersectionObserver to trigger CSS animations
//  on [data-animate] and [data-stagger] elements.
// ══════════════════════════════════════════════════════════

export function initScrollEngine() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('[data-animate], [data-stagger]').forEach(el => {
        observer.observe(el);
    });
}
