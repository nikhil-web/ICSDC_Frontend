/**
 * cloud-hosting.js
 * ─────────────────
 * Handles Cloud Hosting page-specific content:
 *   1. Testimonials  — uses #cloud-testi-grid (isolated from components.js)
 *   2. FAQ accordion — uses #cloud-faq-accordions
 *   3. Button ripple — extends to cloud-cta-btn-primary
 *   4. Page loader hide
 *
 * Pattern mirrors dedicated-server.js and vps-hosting.js exactly.
 */

(function () {
    'use strict';

    /* ─────────────────────────────────────────────────────────
       CLOUD-SPECIFIC TESTIMONIALS (from DOCX)
    ───────────────────────────────────────────────────────── */
    var CLOUD_TESTIMONIALS = [
        {
            name: 'Priya Sharma',
            title: 'Head of Technology',
            company: 'Leading Online Retail Brand',
            quote: 'We migrated our e-commerce platform to ICSDC Cloud Hosting, and the difference has been night and day. Page-load speed improved by more than 40%, and our downtime issues vanished. Their support is responsive and truly understands cloud infrastructure.',
            rating: 5
        },
        {
            name: 'Anil Mehta',
            title: 'CTO',
            company: 'Top FinTech Startup',
            quote: "As a fast-growing fintech company, we needed scalable hosting with no surprises on cost. ICSDC's flexible plans and powerful APIs let us deploy quickly and securely without a hitch.",
            rating: 5
        },
        {
            name: 'Smita Raj',
            title: 'Founder & CEO',
            company: 'Innovative EdTech Company',
            quote: "We opted for ICSDC's managed cloud solution, and it has been a game changer. From automated backups to 24/7 security monitoring, they handle everything — so we can focus fully on building our EdTech platform.",
            rating: 5
        },
        {
            name: 'Rakesh Verma',
            title: 'Director of IT Operations',
            company: 'Global Logistics Company',
            quote: 'Reliability is critical for our operations, and ICSDC has delivered exactly that. Their cloud infrastructure handles high traffic and complex workloads effortlessly. Issues are resolved before they impact our business.',
            rating: 5
        },
        {
            name: 'Neha Kapoor',
            title: 'Product Manager',
            company: 'SaaS-Based Marketing Platform',
            quote: "ICSDC Cloud Hosting gave us the performance and flexibility we were looking for. Scaling resources during peak usage is seamless, and their technical support team is always available with clear, practical guidance. It feels like working with a technology partner.",
            rating: 5
        }
    ];

    /* ─────────────────────────────────────────────────────────
       CLOUD-SPECIFIC FAQ ITEMS (from DOCX)
    ───────────────────────────────────────────────────────── */
    var CLOUD_FAQ = [
        {
            question: 'What makes ICSDC cloud hosting different from other providers in India?',
            answer: 'ICSDC offers locally hosted, high-performance cloud servers with real 24/7 support and scalable options for both technical and non-technical users. Our direct NIXI peering, 100% data residency, and guaranteed 2-hour RPO set us apart from global providers operating in India.'
        },
        {
            question: 'Do you offer both managed and unmanaged hosting services?',
            answer: 'Yes, we provide both. You can fully manage your cloud with root access, or choose our managed hosting and let our experts handle all the technical work — patches, updates, security configs, and monitoring.'
        },
        {
            question: 'Can I scale my resources later as my business grows?',
            answer: 'Absolutely! With ICSDC, you can upgrade CPU, RAM, storage, or bandwidth anytime — instantly and without downtime. Our infrastructure is designed for on-demand vertical and horizontal scaling.'
        },
        {
            question: 'Can I migrate my website or application from another hosting provider?',
            answer: 'Yes. Our team offers free migration support to ensure a smooth and seamless transition from your existing host. We handle the technical heavy lifting so your business experiences zero disruption.'
        },
        {
            question: 'Is my data secure on your cloud servers?',
            answer: 'Yes. ICSDC includes DDoS protection, free SSL, regular backups, firewalls, and 24/7 monitoring — your data stays safe and fully protected. All data is stored within Indian borders, ensuring full regulatory compliance.'
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
       TESTIMONIALS
    ───────────────────────────────────────────────────────── */
    function initCloudTestimonials() {
        var grid     = document.getElementById('cloud-testi-grid');
        var dotsWrap = document.getElementById('cloud-testi-dots');
        var prevBtn  = document.getElementById('cloud-testi-prev');
        var nextBtn  = document.getElementById('cloud-testi-next');
        if (!grid || !dotsWrap) return;

        grid.innerHTML = CLOUD_TESTIMONIALS.map(function (t, i) {
            return buildTestiCard(t, i);
        }).join('');

        dotsWrap.innerHTML = CLOUD_TESTIMONIALS.map(function (_, i) {
            return '<button class="testi-dot' + (i === 0 ? ' testi-dot-active' : '') +
                '" role="tab" aria-selected="' + (i === 0) +
                '" aria-label="Go to testimonial ' + (i + 1) +
                '" data-dot="' + i + '"></button>';
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
            scrollToCard(idx === 0 ? CLOUD_TESTIMONIALS.length - 1 : idx - 1);
        });

        nextBtn && nextBtn.addEventListener('click', function () {
            var idx = currentIndex();
            scrollToCard(idx === CLOUD_TESTIMONIALS.length - 1 ? 0 : idx + 1);
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
       FAQ ACCORDION
    ───────────────────────────────────────────────────────── */
    function initCloudFAQ() {
        var dl = document.getElementById('cloud-faq-accordions');
        if (!dl) return;

        var openIndex = 0;

        function render() {
            dl.innerHTML = CLOUD_FAQ.map(function (faq, i) {
                var isOpen = i === openIndex;
                return '<div class="faq-item' + (isOpen ? ' faq-open' : '') + '" data-faq-index="' + i + '">' +
                    '<dt>' +
                    '<button class="faq-question" aria-expanded="' + isOpen +
                    '" aria-controls="cloud-faq-answer-' + i +
                    '" id="cloud-faq-question-' + i + '">' +
                    '<span>' + faq.question + '</span>' +
                    '<svg class="faq-chevron" viewBox="0 0 20 20" fill="none" aria-hidden="true">' +
                    '<path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>' +
                    '</svg>' +
                    '</button>' +
                    '</dt>' +
                    '<dd class="faq-answer" id="cloud-faq-answer-' + i +
                    '" role="region" aria-labelledby="cloud-faq-question-' + i + '">' +
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
            var y = e.clientY - rect.top  - size / 2;

            var ripple = document.createElement('span');
            ripple.className = 'ripple-effect';
            ripple.style.cssText = [
                'position:absolute',
                'border-radius:50%',
                'background:rgba(255,255,255,0.25)',
                'transform:scale(0)',
                'animation:rippleAnim 0.5s linear',
                'pointer-events:none',
                'width:'  + size + 'px',
                'height:' + size + 'px',
                'left:'   + x    + 'px',
                'top:'    + y    + 'px'
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
        initCloudTestimonials();
        initCloudFAQ();
        initCTARipple();
        hidePageLoader();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
