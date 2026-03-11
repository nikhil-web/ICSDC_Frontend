/**
 * windows-vps-hosting.js
 * ──────────────────────
 * Handles Windows VPS Hosting page-specific content:
 *   1. Testimonials  — uses #winvps-testi-grid (isolated from components.js)
 *   2. FAQ accordion — uses #winvps-faq-accordions
 *   3. Button ripple — extends to cloud-cta-btn-primary
 *   4. Page loader hide
 *
 * Pattern mirrors cloud-hosting.js, shared-hosting.js, dedicated-server.js exactly.
 */

(function () {
    'use strict';

    /* ─────────────────────────────────────────────────────────
       WINDOWS VPS TESTIMONIALS
    ───────────────────────────────────────────────────────── */
    var WINVPS_TESTIMONIALS = [
        {
            name: 'Riya S.',
            title: 'Operations Manager',
            company: 'FinTech Company',
            quote: 'ICSDC made our Windows-based applications run smoother than they ever did on our previous host. We shifted our internal CRM and reporting tools and the performance difference was immediate.',
            rating: 5
        },
        {
            name: 'Arvind Kumar',
            title: 'Founder',
            company: 'IT Services Firm',
            quote: 'The reliability has been consistent from day one. Our remote staff uses RDP daily and we\'ve never experienced lag or disconnects. ICSDC\'s infrastructure genuinely feels enterprise-grade.',
            rating: 5
        },
        {
            name: 'Minal Jain',
            title: 'Senior Developer',
            company: 'Software Development Agency',
            quote: 'We run a mix of legacy apps and new .NET builds — ICSDC handles both effortlessly. Easy deployment, smooth updates, and support that actually knows Windows inside out.',
            rating: 5
        },
        {
            name: 'Soham Verma',
            title: 'Product Lead',
            company: 'SaaS Company',
            quote: 'The managed plan was a lifesaver. We didn\'t have an in-house server admin, so ICSDC\'s team handled security patches and monitoring while we focused on our product.',
            rating: 5
        },
        {
            name: 'Priyanka Rao',
            title: 'Head of IT',
            company: 'Financial Services Company',
            quote: 'Moving our Tally and accounting infrastructure to ICSDC Windows VPS was seamless. Zero downtime, fast RDP, and their team knew exactly how to configure our environment.',
            rating: 5
        }
    ];

    /* ─────────────────────────────────────────────────────────
       WINDOWS VPS FAQ ITEMS
    ───────────────────────────────────────────────────────── */
    var WINVPS_FAQ = [
        {
            question: 'What is Windows VPS Hosting and how does it work at ICSDC?',
            answer: 'Windows VPS Hosting at ICSDC provides a virtual server running Windows OS with dedicated resources, full admin control, and RDP access — isolated from other users on high-performance KVM infrastructure.'
        },
        {
            question: 'Do I get full RDP and administrator access?',
            answer: 'Yes. Every ICSDC Windows VPS includes full admin-level Remote Desktop (RDP) access, allowing complete control over software installation, configurations, and server management.'
        },
        {
            question: 'Which Windows Server versions are available?',
            answer: 'You can choose from Windows Server 2016, 2019, or 2022 depending on your application requirements and compatibility needs.'
        },
        {
            question: 'Can I host .NET, IIS, SQL Server, or custom Windows applications?',
            answer: 'Absolutely. ICSDC Windows VPS supports ASP.NET, .NET Core, IIS-based apps, MS SQL databases, Crystal Reports, ERP tools, CRM systems, and any Windows-native software.'
        },
        {
            question: 'Does ICSDC offer Managed and Unmanaged Windows VPS?',
            answer: 'Yes. Choose Managed if you want ICSDC to handle updates, monitoring, and security, or Unmanaged if you prefer complete technical control over your environment.'
        },
        {
            question: 'Can I upgrade my CPU, RAM, or storage later?',
            answer: 'Yes. ICSDC allows seamless scaling — upgrade RAM, CPU, and storage anytime without downtime, ensuring smooth growth as your workloads evolve.'
        },
        {
            question: 'How secure is my Windows VPS with ICSDC?',
            answer: 'Your VPS is protected with multi-layered firewalls, encrypted RDP, OS hardening, DDoS mitigation, continuous monitoring, and snapshot recovery — enterprise-grade security by default.'
        },
        {
            question: 'What type of support does ICSDC provide?',
            answer: 'ICSDC offers 24/7/365 expert support through chat, tickets, and phone, assisting with setup, troubleshooting, security, and Windows-specific workload optimisation.'
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
    function initWinVPSTestimonials() {
        var grid = document.getElementById('winvps-testi-grid');
        var dotsWrap = document.getElementById('winvps-testi-dots');
        var prevBtn = document.getElementById('winvps-testi-prev');
        var nextBtn = document.getElementById('winvps-testi-next');
        if (!grid || !dotsWrap) return;

        var items = WINVPS_TESTIMONIALS;

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
    function initWinVPSFAQ() {
        var dl = document.getElementById('winvps-faq-accordions');
        if (!dl) return;

        var openIndex = 0;

        function render() {
            dl.innerHTML = WINVPS_FAQ.map(function (faq, i) {
                var isOpen = i === openIndex;
                return '<div class="faq-item' + (isOpen ? ' faq-open' : '') + '" data-faq-index="' + i + '">' +
                    '<dt>' +
                    '<button class="faq-question" aria-expanded="' + isOpen +
                    '" aria-controls="winvps-faq-answer-' + i +
                    '" id="winvps-faq-question-' + i + '">' +
                    '<span>' + faq.question + '</span>' +
                    '<svg class="faq-chevron" viewBox="0 0 20 20" fill="none" aria-hidden="true">' +
                    '<path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>' +
                    '</svg>' +
                    '</button>' +
                    '</dt>' +
                    '<dd class="faq-answer" id="winvps-faq-answer-' + i +
                    '" role="region" aria-labelledby="winvps-faq-question-' + i + '">' +
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
        initWinVPSTestimonials();
        initWinVPSFAQ();
        initCTARipple();
        hidePageLoader();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();