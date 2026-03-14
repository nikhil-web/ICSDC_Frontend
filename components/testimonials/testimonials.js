// ══════════════════════════════════════════════════════════
//  testimonials.js — Unified testimonials renderer
//  Replaces duplicated logic across all page-specific JS files.
//
//  Usage:
//    import { renderTestimonials } from '../components/testimonials/testimonials.js';
//    renderTestimonials({
//        gridId: 'ds-testi-grid',
//        dotsId: 'ds-testi-dots',
//        prevId: 'ds-testi-prev',
//        nextId: 'ds-testi-next',
//    }, DS_TESTIMONIALS);
// ══════════════════════════════════════════════════════════

export function getInitials(name) {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
}

export function starSVG() {
    return '<svg class="testi-star" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">' +
        '<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>' +
        '</svg>';
}

export function buildTestiCard(t, index) {
    const initials = getInitials(t.name);
    let stars = '';
    for (let s = 0; s < (t.rating || 5); s++) { stars += starSVG(); }

    return '<article class="testi-card" role="listitem" data-testi-index="' + index + '" aria-label="Testimonial from ' + t.name + '">' +
        '<div class="testi-left">' +
        '<div class="testi-avatar" aria-hidden="true">' +
        '<span class="testi-avatar-initials">' + initials + '</span>' +
        '</div>' +
        '<div class="testi-client-info">' +
        '<p class="testi-name">' + t.name + '</p>' +
        '<p class="testi-job">' + (t.title || t.jobTitle || '') + '</p>' +
        '<p class="testi-company">' + t.company + '</p>' +
        '</div>' +
        '<div class="testi-rating" aria-label="Rating: ' + (t.rating || 5) + ' out of 5 stars">' + stars + '</div>' +
        '</div>' +
        '<div class="testi-right">' +
        '<blockquote class="testi-quote">' + (t.quote || t.text || '') + '</blockquote>' +
        '</div>' +
        '</article>';
}

/**
 * renderTestimonials(config, items)
 * @param {Object} config - { gridId, dotsId, prevId, nextId }
 * @param {Array}  items  - Array of testimonial objects
 */
export function renderTestimonials(config, items) {
    const grid = document.getElementById(config.gridId);
    const dotsWrap = document.getElementById(config.dotsId);
    const prevBtn = document.getElementById(config.prevId);
    const nextBtn = document.getElementById(config.nextId);
    if (!grid || !dotsWrap || !items || !items.length) return;

    // Render cards
    grid.innerHTML = items.map((t, i) => buildTestiCard(t, i)).join('');

    // Render dots
    dotsWrap.innerHTML = items.map((_, i) =>
        '<button class="testi-dot' + (i === 0 ? ' testi-dot-active' : '') +
        '" role="tab" aria-selected="' + (i === 0) +
        '" aria-label="Go to testimonial ' + (i + 1) +
        '" data-dot="' + i + '"></button>'
    ).join('');

    const cards = Array.from(grid.querySelectorAll('.testi-card'));
    const dots = Array.from(dotsWrap.querySelectorAll('.testi-dot'));

    function scrollToCard(index) {
        const card = cards[index];
        if (!card) return;
        grid.scrollTo({ left: card.offsetLeft - 4, behavior: 'smooth' });
    }

    dots.forEach((btn, i) => {
        btn.addEventListener('click', () => scrollToCard(i));
    });

    function currentIndex() {
        const scrollLeft = grid.scrollLeft;
        let closest = 0, minDist = Infinity;
        cards.forEach((card, i) => {
            const dist = Math.abs(card.offsetLeft - scrollLeft);
            if (dist < minDist) { minDist = dist; closest = i; }
        });
        return closest;
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            const idx = currentIndex();
            scrollToCard(idx === 0 ? items.length - 1 : idx - 1);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const idx = currentIndex();
            scrollToCard(idx === items.length - 1 ? 0 : idx + 1);
        });
    }

    let scrollTimer;
    grid.addEventListener('scroll', () => {
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(() => {
            const idx = currentIndex();
            dots.forEach((d, i) => {
                d.classList.toggle('testi-dot-active', i === idx);
                d.setAttribute('aria-selected', i === idx ? 'true' : 'false');
            });
        }, 80);
    });
}
