/**
 * dedicated-server.js
 * ───────────────────
 * Handles DS-page-specific content:
 *   1. Testimonials  — uses #ds-testi-grid (not #testi-grid,
 *      so components.js does not overwrite with generic data)
 *   2. FAQ accordion — uses #ds-faq-accordions
 *   3. Button ripple — extends polish.js to cover ds-cta-btn-primary
 *   4. Page loader hide
 *
 * Pattern mirrors components.js — same markup, same classes,
 * different data and different container IDs.
 */

(function () {
    'use strict';

    /* ─────────────────────────────────────────────────────────
       DS-SPECIFIC TESTIMONIALS (from DOCX)
    ───────────────────────────────────────────────────────── */
    var DS_TESTIMONIALS = [
        {
            name: 'Rohan Mehta',
            title: 'IT Head',
            company: 'IT Company',
            quote: 'Switching to ICSDC\'s dedicated servers was one of the smartest infrastructure decisions we made. What I appreciate most is their proactive support — they anticipate our needs. It feels less like a vendor relationship and more like having our own extended IT team.',
            rating: 5
        },
        {
            name: 'Ananya Iyer',
            title: 'Co-Founder',
            company: 'Web Development Company',
            quote: 'As our startup began scaling, shared hosting just couldn\'t keep up. The ICSDC setup process was smooth, and their team actually took time to explain everything in plain language — that kind of patience is rare. We\'re now hosting all our client projects with ICSDC.',
            rating: 5
        },
        {
            name: 'Arjun Nair',
            title: 'Senior Systems Administrator',
            company: 'Financial Advisory Company',
            quote: 'I\'ve managed servers with multiple providers before, but ICSDC stands out for one reason — genuine support. The transition to their dedicated environment was seamless, and the performance has been stellar ever since. It\'s reassuring to know my servers are in capable hands 24/7.',
            rating: 5
        },
        {
            name: 'Neha Kapoor',
            title: 'Product Manager',
            company: 'SaaS Company',
            quote: 'Reliability was our biggest concern before moving to dedicated servers, and ICSDC delivered exactly that. From initial planning to post-deployment checks, their team stayed involved at every step. Downtime is no longer something we worry about.',
            rating: 5
        },
        {
            name: 'Kunal Verma',
            title: 'Director of Technology',
            company: 'E-commerce Company',
            quote: 'Our platform handles heavy traffic spikes, and performance issues used to be a constant headache. After migrating to ICSDC\'s dedicated servers, the difference was immediate. Stable performance, clear communication, and a support team that understands business urgency.',
            rating: 5
        }
    ];

    /* ─────────────────────────────────────────────────────────
       DS-SPECIFIC FAQ ITEMS (from DOCX)
    ───────────────────────────────────────────────────────── */
    var DS_FAQ = [
        {
            question: 'Do I receive full control over the server environment?',
            answer: 'Yes. You get administrator access, allowing you to install any operating system, custom software, and configure all security settings exactly to your needs. This is your machine — 100% dedicated to your business.'
        },
        {
            question: 'How quickly will my dedicated server be ready to use?',
            answer: 'We perform quick setup and complete testing to ensure your hardware is immediately stable and ready for deployment. Most servers are provisioned and handed over within hours of order confirmation.'
        },
        {
            question: 'Can ICSDC help me move my existing website or data?',
            answer: 'Absolutely. If you choose a Managed server plan, our expert team provides free, assisted migration from your old host, ensuring a smooth and zero-downtime transfer with no disruption to your live systems.'
        },
        {
            question: 'What if I need more resources (RAM, Storage) in the future?',
            answer: 'Dedicated servers are highly scalable. You can easily upgrade components like RAM, hard drives (HDD/SSD), and even network bandwidth as your business grows, often with minimal service interruption.'
        },
        {
            question: 'What is the difference between Managed and Unmanaged hosting?',
            answer: 'In Unmanaged hosting, you handle all software, security, and updates yourself — ideal for experienced sysadmins who want full control. In Managed hosting, our ICSDC experts handle the patching, security hardening, and proactive monitoring for you, so you can focus entirely on your business.'
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
    function initDSTestimonials() {
        var grid    = document.getElementById('ds-testi-grid');
        var dotsWrap = document.getElementById('ds-testi-dots');
        var prevBtn  = document.getElementById('ds-testi-prev');
        var nextBtn  = document.getElementById('ds-testi-next');
        if (!grid || !dotsWrap) return;

        var items = DS_TESTIMONIALS;

        // Render cards
        grid.innerHTML = items.map(function (t, i) { return buildTestiCard(t, i); }).join('');

        // Render dots
        dotsWrap.innerHTML = items.map(function (_, i) {
            return '<button class="testi-dot' + (i === 0 ? ' testi-dot-active' : '') + '" role="tab" aria-selected="' + (i === 0) + '" aria-label="Go to testimonial ' + (i + 1) + '" data-dot="' + i + '"></button>';
        }).join('');

        var cards = Array.from(grid.querySelectorAll('.testi-card'));
        var dots  = Array.from(dotsWrap.querySelectorAll('.testi-dot'));

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
    function initDSFAQ() {
        var dl = document.getElementById('ds-faq-accordions');
        if (!dl) return;

        var openIndex = 0;

        function render() {
            dl.innerHTML = DS_FAQ.map(function (faq, i) {
                var isOpen = i === openIndex;
                return '<div class="faq-item' + (isOpen ? ' faq-open' : '') + '" data-faq-index="' + i + '">' +
                    '<dt>' +
                    '<button class="faq-question" aria-expanded="' + isOpen + '" aria-controls="ds-faq-answer-' + i + '" id="ds-faq-question-' + i + '">' +
                    '<span>' + faq.question + '</span>' +
                    '<svg class="faq-chevron" viewBox="0 0 20 20" fill="none" aria-hidden="true">' +
                    '<path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>' +
                    '</svg>' +
                    '</button>' +
                    '</dt>' +
                    '<dd class="faq-answer" id="ds-faq-answer-' + i + '" role="region" aria-labelledby="ds-faq-question-' + i + '">' +
                    '<p>' + faq.answer + '</p>' +
                    '</dd>' +
                    '</div>';
            }).join('');

            // Ensure answers are block-level for max-height animation (mirrors polish.js)
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
       BUTTON RIPPLE EXTENSION
       Extends polish.js ripple to cover ds-cta-btn-primary
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

        document.querySelectorAll('.ds-cta-btn-primary').forEach(function (btn) {
            btn.addEventListener('click', addRipple);
        });
    }

    /* ─────────────────────────────────────────────────────────
       PAGE LOADER
       Mirrors the homepage loader-done / loader-hidden pattern
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
       NAVBAR ACTIVE STATE
       Marks "Dedicated Server" nav link as active if present
    ───────────────────────────────────────────────────────── */
    function markActiveNavLink() {
        var path = window.location.pathname;
        document.querySelectorAll('.nav-link, .mobile-nav-links .nav-link').forEach(function (link) {
            var href = link.getAttribute('href') || '';
            if (href && path.includes(href) && href !== '/') {
                link.classList.add('active');
            }
        });
    }

    /* ─────────────────────────────────────────────────────────
       BOOT
    ───────────────────────────────────────────────────────── */
    function init() {
        initDSTestimonials();
        initDSFAQ();
        initCTARipple();
        markActiveNavLink();
        hidePageLoader();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
