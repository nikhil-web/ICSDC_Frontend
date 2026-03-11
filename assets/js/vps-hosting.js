/**
 * vps-hosting.js
 * ──────────────
 * Handles VPS-page-specific content:
 *   1. Testimonials  — uses #vps-testi-grid (isolated from components.js)
 *   2. FAQ accordion — uses #vps-faq-accordions
 *   3. Button ripple — extends to vps-cta-btn-primary
 *   4. Page loader hide
 *
 * Pattern mirrors dedicated-server.js exactly.
 */

(function () {
    'use strict';

    /* ─────────────────────────────────────────────────────────
       VPS-SPECIFIC TESTIMONIALS (from DOCX)
    ───────────────────────────────────────────────────────── */
    var VPS_TESTIMONIALS = [
        {
            name: 'A. Miller',
            title: 'Lead DevOps Engineer',
            company: 'Tech Company',
            quote: 'The difference after moving our high-transaction database was immediate. Query speeds dropped by 40% thanks to the NVMe I/O. The performance is genuinely dedicated.',
            rating: 5
        },
        {
            name: 'S. Chen',
            title: 'Software Architect',
            company: 'Software Company',
            quote: 'Finally, a VPS that truly respects root access. We needed a specific kernel module for our staging environment, and ICSDC let us install it in minutes. Complete freedom.',
            rating: 5
        },
        {
            name: 'R. Singh',
            title: 'CTO',
            company: 'FinTech Startup',
            quote: "We can't afford silent failures. The KVM isolation means our resources are always there, and the monitoring alerts are spot-on. Solid infrastructure, period.",
            rating: 5
        },
        {
            name: 'E. Lopez',
            title: 'E-commerce Director',
            company: 'E-commerce Company',
            quote: "We outgrew our old host overnight. With ICSDC, the one-click RAM and CPU scaling meant zero downtime during our peak traffic surge. Seamless growth is a reality here.",
            rating: 5
        }
    ];

    /* ─────────────────────────────────────────────────────────
       VPS-SPECIFIC FAQ ITEMS (from DOCX)
    ───────────────────────────────────────────────────────── */
    var VPS_FAQ = [
        {
            question: 'Is my CPU/RAM truly dedicated, or is it burstable?',
            answer: 'Your resources are truly guaranteed and dedicated via ICSDC KVM virtualization. There is no resource over-selling, ensuring your assigned CPU, RAM, and storage IOPS are consistently available to your environment at all times.'
        },
        {
            question: 'Can I install a custom OS or kernel?',
            answer: 'Yes. You are given full root access, allowing you complete freedom to install any compatible Linux distribution or Windows OS version, and to compile or modify custom kernel modules as your application demands.'
        },
        {
            question: 'How fast is the VPS provisioning process?',
            answer: 'Provisioning is instant and automated. Once your order is processed, your VPS environment will be available and ready for SSH access within minutes, allowing you to deploy your applications immediately.'
        },
        {
            question: 'What is the process for scaling up resources?',
            answer: 'Scaling is on-demand and vertical. You can instantly add CPU cores, RAM, or storage via your central control panel with minimal to zero downtime, eliminating the need for complex server migration.'
        },
        {
            question: 'Do you offer management services?',
            answer: 'ICSDC provides unmanaged VPS hosting, giving you maximum control and cost efficiency. We manage the hardware and network, while you manage the OS, software, and application stack using your full root access. Managed plans are also available on request.'
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
    function initVPSTestimonials() {
        var grid     = document.getElementById('vps-testi-grid');
        var dotsWrap = document.getElementById('vps-testi-dots');
        var prevBtn  = document.getElementById('vps-testi-prev');
        var nextBtn  = document.getElementById('vps-testi-next');
        if (!grid || !dotsWrap) return;

        grid.innerHTML = VPS_TESTIMONIALS.map(function (t, i) { return buildTestiCard(t, i); }).join('');

        dotsWrap.innerHTML = VPS_TESTIMONIALS.map(function (_, i) {
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
            scrollToCard(idx === 0 ? VPS_TESTIMONIALS.length - 1 : idx - 1);
        });

        nextBtn && nextBtn.addEventListener('click', function () {
            var idx = currentIndex();
            scrollToCard(idx === VPS_TESTIMONIALS.length - 1 ? 0 : idx + 1);
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
    function initVPSFAQ() {
        var dl = document.getElementById('vps-faq-accordions');
        if (!dl) return;

        var openIndex = 0;

        function render() {
            dl.innerHTML = VPS_FAQ.map(function (faq, i) {
                var isOpen = i === openIndex;
                return '<div class="faq-item' + (isOpen ? ' faq-open' : '') + '" data-faq-index="' + i + '">' +
                    '<dt>' +
                    '<button class="faq-question" aria-expanded="' + isOpen + '" aria-controls="vps-faq-answer-' + i + '" id="vps-faq-question-' + i + '">' +
                    '<span>' + faq.question + '</span>' +
                    '<svg class="faq-chevron" viewBox="0 0 20 20" fill="none" aria-hidden="true">' +
                    '<path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>' +
                    '</svg>' +
                    '</button>' +
                    '</dt>' +
                    '<dd class="faq-answer" id="vps-faq-answer-' + i + '" role="region" aria-labelledby="vps-faq-question-' + i + '">' +
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

        document.querySelectorAll('.vps-cta-btn-primary').forEach(function (btn) {
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
        initVPSTestimonials();
        initVPSFAQ();
        initCTARipple();
        hidePageLoader();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
