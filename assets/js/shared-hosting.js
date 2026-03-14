/**
 * shared-hosting.js
 * ─────────────────
 * Handles Shared Hosting page-specific content:
 *   1. Testimonials  — uses #shared-testi-grid (isolated from components.js)
 *   2. FAQ accordion — uses #shared-faq-accordions
 *   3. Button ripple — extends to cloud-cta-btn-primary
 *   4. Page loader hide
 *
 * Pattern mirrors cloud-hosting.js, dedicated-server.js, and vps-hosting.js exactly.
 */

(function () {
    'use strict';

    /* ─────────────────────────────────────────────────────────
       SHARED HOSTING TESTIMONIALS
    ───────────────────────────────────────────────────────── */
    var SHARED_TESTIMONIALS = [
        {
            name: 'Rohan Malhotra',
            title: 'CTO',
            company: 'FinTech Industry',
            quote: 'We moved our website to ICSDC Shared Hosting six months ago, and the difference has been night and day. Pages load instantly, and we haven\'t had a single outage since switching.',
            rating: 5
        },
        {
            name: 'Sneha Kapoor',
            title: 'Project Manager',
            company: 'Web Development Agency',
            quote: 'ICSDC made it simple for us to host multiple client projects under one account. The control panel is clean, and their server stability is something we can genuinely rely on.',
            rating: 5
        },
        {
            name: 'Arjun Sethi',
            title: 'Founder',
            company: 'Tech Startup',
            quote: 'As a startup founder, every rupee counts. ICSDC\'s shared hosting gave us enterprise-level reliability at startup-friendly pricing. Best hosting decision we\'ve made.',
            rating: 5
        },
        {
            name: 'Priya Mehta',
            title: 'Operations Head',
            company: 'eCommerce Sector',
            quote: 'We\'ve hosted eCommerce stores before, but ICSDC\'s shared hosting has been rock-solid. No downtime, excellent site speed, and automatic backups give us complete peace of mind.',
            rating: 5
        },
        {
            name: 'Vikram Nair',
            title: 'Founder',
            company: 'Digital Media Company',
            quote: 'Switching to ICSDC was the best infrastructure decision for our content platform. The NVMe speed is genuinely noticeable, and their support team actually picks up the phone.',
            rating: 5
        }
    ];

    /* ─────────────────────────────────────────────────────────
       SHARED HOSTING FAQ ITEMS
    ───────────────────────────────────────────────────────── */
    var SHARED_FAQ = [
        {
            question: 'What is Shared Hosting?',
            answer: 'Shared Hosting is a type of web hosting where multiple websites share server resources. It\'s perfect for small businesses, bloggers, and startups looking for affordable, reliable web hosting.'
        },
        {
            question: 'Is ICSDC Shared Hosting suitable for eCommerce websites?',
            answer: 'Yes! ICSDC Shared Hosting is optimized for small to medium eCommerce sites with fast page load speeds, free SSL, daily backups, and a secure environment to run your online store.'
        },
        {
            question: 'Can I upgrade my hosting plan later?',
            answer: 'Absolutely. You can easily upgrade from Shared Hosting to VPS or Cloud Hosting without downtime or data loss — your growth path is fully supported.'
        },
        {
            question: 'Do you provide website migration support?',
            answer: 'Yes. Our team offers free website migration assistance to help you transfer your website from another provider to ICSDC safely and seamlessly.'
        },
        {
            question: 'What kind of support can I expect?',
            answer: '24/7 expert support from real engineers — not bots. Whether it\'s setup, troubleshooting, or performance optimization, our India-based team is always ready to help.'
        },
        {
            question: 'Will shared hosting affect my website speed?',
            answer: 'No — ICSDC uses resource-isolated environments, NVMe SSD storage, and optimized server configurations to maintain consistent speed for every hosted site.'
        },
        {
            question: 'How many websites can I host?',
            answer: 'It depends on the plan. Some plans support a single website, while higher-tier shared hosting plans let you host multiple websites under one account.'
        },
        {
            question: 'Do I need technical knowledge to use shared hosting?',
            answer: 'Not at all. ICSDC Shared Hosting includes an easy control panel, one-click installs, guided setup, and 24/7 support — fully beginner-friendly from day one.'
        }
    ];

    /* ─────────────────────────────────────────────────────────
       HELPERS
    ───────────────────────────────────────────────────────── */
    function getInitials(name) {
        return name.split(' ').map(function (n) { return n[0]; }).join('').toUpperCase().slice(0, 2);
    }

    function starSVG() {
        return '<svg class="testi-star" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">' +
            '<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>' +
            '</svg>';
    }

    function buildTestiCard(t, index) {
        var initials = getInitials(t.name);
        var stars = '';
        for (var s = 0; s < t.rating; s++) { stars += starSVG(); }

        return '<article class="testi-card" role="listitem" data-testi-index="' + index + '" aria-label="Testimonial from ' + t.name + '">' +
            '<div class="testi-left">' +
            '<div class="testi-avatar" aria-hidden="true">' +
            '<span class="testi-avatar-initials">' + initials + '</span>' +
            '</div>' +
            '<div class="testi-client-info">' +
            '<p class="testi-name">' + t.name + '</p>' +
            '<p class="testi-job">' + (t.title || '') + '</p>' +
            '<p class="testi-company">' + t.company + '</p>' +
            '</div>' +
            '<div class="testi-rating" aria-label="Rating: ' + t.rating + ' out of 5 stars">' + stars + '</div>' +
            '</div>' +
            '<div class="testi-right">' +
            '<blockquote class="testi-quote">' + t.quote + '</blockquote>' +
            '</div>' +
            '</article>';
    }

    /* ─────────────────────────────────────────────────────────
       TESTIMONIALS RENDERER
    ───────────────────────────────────────────────────────── */
    function initSharedTestimonials() {
        var grid = document.getElementById('shared-testi-grid');
        var dotsWrap = document.getElementById('shared-testi-dots');
        var prevBtn = document.getElementById('shared-testi-prev');
        var nextBtn = document.getElementById('shared-testi-next');
        if (!grid || !dotsWrap) return;

        var items = SHARED_TESTIMONIALS;

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

        prevBtn && prevBtn.addEventListener('click', function () {
            var idx = currentIndex();
            scrollToCard(idx === 0 ? items.length - 1 : idx - 1);
        });

        nextBtn && nextBtn.addEventListener('click', function () {
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

    /* ─────────────────────────────────────────────────────────
       FAQ ACCORDION RENDERER
    ───────────────────────────────────────────────────────── */
    function initSharedFAQ() {
        var dl = document.getElementById('shared-faq-accordions');
        if (!dl) return;

        var openIndex = 0;

        function render() {
            dl.innerHTML = SHARED_FAQ.map(function (faq, i) {
                var isOpen = i === openIndex;
                return '<div class="faq-item' + (isOpen ? ' faq-open' : '') + '" data-faq-index="' + i + '">' +
                    '<dt>' +
                    '<button class="faq-question" aria-expanded="' + isOpen +
                    '" aria-controls="shared-faq-answer-' + i +
                    '" id="shared-faq-question-' + i + '">' +
                    '<span>' + faq.question + '</span>' +
                    '<svg class="faq-chevron" viewBox="0 0 20 20" fill="none" aria-hidden="true">' +
                    '<path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>' +
                    '</svg>' +
                    '</button>' +
                    '</dt>' +
                    '<dd class="faq-answer" id="shared-faq-answer-' + i +
                    '" role="region" aria-labelledby="shared-faq-question-' + i + '">' +
                    '<p>' + faq.answer + '</p>' +
                    '</dd>' +
                    '</div>';
            }).join('');

            dl.querySelectorAll('.faq-answer').forEach(function (ans) {
                ans.style.display = 'block';
                ans.style.overflow = 'hidden';
            });

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
       BUTTON RIPPLE
    ───────────────────────────────────────────────────────── */
    function initCTARipple() {
        function addRipple(e) {
            var btn = e.currentTarget;
            var existing = btn.querySelector('.ripple-effect');
            if (existing) existing.remove();

            var rect = btn.getBoundingClientRect();
            var size = Math.max(rect.width, rect.height);
            var x = e.clientX - rect.left - size / 2;
            var y = e.clientY - rect.top - size / 2;

            var ripple = document.createElement('span');
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
            ripple.addEventListener('animationend', function () { ripple.remove(); });
        }

        document.querySelectorAll('.cloud-cta-btn-primary').forEach(function (btn) {
            btn.addEventListener('click', addRipple);
        });
    }

    /* ─────────────────────────────────────────────────────────
       PAGE LOADER
    ───────────────────────────────────────────────────────── */
    function hidePageLoader() {
        var loader = document.getElementById('page-loader');
        if (!loader) return;
        loader.classList.add('loader-done');
        setTimeout(function () { loader.classList.add('loader-hidden'); }, 520);
    }

    /* ─────────────────────────────────────────────────────────
       BOOT
    ───────────────────────────────────────────────────────── */
    function init() {
        initSharedTestimonials();
        initSharedFAQ();
        initCTARipple();
        hidePageLoader();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();