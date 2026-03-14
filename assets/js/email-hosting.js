/**
 * email-hosting.js
 * Handles: testimonials carousel, FAQ accordion, CTA ripple, page loader
 * Prefix: email
 */
(function () {
    'use strict';

    var TESTIMONIALS = [
        {
            name: 'Anya Sharma',
            title: 'Founder & Creative Director',
            company: 'Digital Marketing Agency',
            quote: "Switching to ICSDC was our biggest credibility upgrade this year. As a small firm, that branded @ email instantly changed how big clients viewed us. The system is clean, intuitive, and the speed is phenomenal. It's our new digital handshake.",
            rating: 5
        },
        {
            name: 'David Chen',
            title: 'Chief Operations Officer',
            company: 'Financial Services',
            quote: "In finance, security is non-negotiable. ICSDC's enterprise inbox protection is the real deal. We have zero anxiety about data exchange. Plus, the near-perfect uptime means our trading and client communication never skips a beat.",
            rating: 5
        },
        {
            name: 'Omar Hassan',
            title: 'Head of IT Administration',
            company: 'Educational Technology (EdTech)',
            quote: 'We manage hundreds of faculty and student accounts. The most amazing thing about ICSDC is the simplicity of scale. I can onboard new teachers and create departmental aliases in minutes, not hours. It truly freed up my team.',
            rating: 5
        }
    ];

    var FAQ = [
        {
            question: 'What is the biggest advantage over a free email service?',
            answer: 'Credibility and security. You get a branded address (you@yourcompany.com), enterprise-grade security, 99.9% uptime, and zero ads — instantly establishing professional trust with every email you send.'
        },
        {
            question: 'Will the migration process cause downtime?',
            answer: 'No. Our migration service is free, risk-free, and automated. We securely move all your old emails and contacts with zero service interruption.'
        },
        {
            question: 'How secure is my data against spam and viruses?',
            answer: "Highly secure. We use advanced, real-time filters to block 99.9% of malware, phishing, and spam before they ever reach your team's inbox."
        },
        {
            question: 'Can I check my email on my phone or in Outlook?',
            answer: 'Yes! Access your email instantly via our webmail or seamlessly connect it to any third-party app (Outlook, Apple Mail, etc.) on any device using IMAP or POP3.'
        },
        {
            question: 'Is it easy to set up new accounts for a growing team?',
            answer: 'Absolutely. Our user management tools allow you to add new team members, create aliases (sales@, billing@), and manage permissions instantly from the admin panel.'
        },
        {
            question: 'What email hosting solutions does ICSDC offer?',
            answer: 'ICSDC provides Google Workspace (formerly G Suite), Microsoft 365 Business Email, and Zimbra Business Email Hosting — each with full setup support, migration, and 24/7 local expert assistance.'
        },
        {
            question: 'Is there a custom domain email option?',
            answer: 'Yes. Every ICSDC email plan supports custom domain email addresses (you@yourcompany.com), giving your business a professional and credible online presence.'
        },
        {
            question: 'What happens if I exceed my storage limit?',
            answer: 'You can easily upgrade storage at any time from the admin panel. ICSDC provides instant, seamless resource scaling without any service interruption.'
        }
    ];

    function getInitials(n) { return n.split(' ').map(function(w){return w[0];}).join('').toUpperCase().slice(0,2); }
    function starSVG() { return '<svg class="testi-star" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>'; }

    function buildCard(t, i) {
        var init = getInitials(t.name);
        var stars = '';
        for (var s = 0; s < t.rating; s++) stars += starSVG();
        return '<article class="testi-card" role="listitem" data-testi-index="' + i + '" aria-label="Testimonial from ' + t.name + '">' +
            '<div class="testi-left"><div class="testi-avatar" aria-hidden="true"><span class="testi-avatar-initials">' + init + '</span></div>' +
            '<div class="testi-client-info"><p class="testi-name">' + t.name + '</p><p class="testi-job">' + (t.title||'') + '</p><p class="testi-company">' + t.company + '</p></div>' +
            '<div class="testi-rating" aria-label="Rating: ' + t.rating + ' out of 5 stars">' + stars + '</div></div>' +
            '<div class="testi-right"><blockquote class="testi-quote">' + t.quote + '</blockquote></div></article>';
    }

    function initTestimonials() {
        var grid = document.getElementById('email-testi-grid');
        var dots = document.getElementById('email-testi-dots');
        var prev = document.getElementById('email-testi-prev');
        var next = document.getElementById('email-testi-next');
        if (!grid || !dots) return;
        grid.innerHTML = TESTIMONIALS.map(buildCard).join('');
        dots.innerHTML = TESTIMONIALS.map(function(_, i) {
            return '<button class="testi-dot' + (i===0?' testi-dot-active':'') + '" role="tab" aria-selected="' + (i===0) + '" aria-label="Go to testimonial ' + (i+1) + '" data-dot="' + i + '"></button>';
        }).join('');
        var cards = Array.from(grid.querySelectorAll('.testi-card'));
        var dotBtns = Array.from(dots.querySelectorAll('.testi-dot'));
        function scrollTo(i) { var c = cards[i]; if (c) grid.scrollTo({left: c.offsetLeft - 4, behavior: 'smooth'}); }
        dotBtns.forEach(function(b, i) { b.addEventListener('click', function() { scrollTo(i); }); });
        function current() {
            var sl = grid.scrollLeft, cl = 0, md = Infinity;
            cards.forEach(function(c, i) { var d = Math.abs(c.offsetLeft - sl); if (d < md) { md = d; cl = i; } });
            return cl;
        }
        prev && prev.addEventListener('click', function() { var i = current(); scrollTo(i===0?TESTIMONIALS.length-1:i-1); });
        next && next.addEventListener('click', function() { var i = current(); scrollTo(i===TESTIMONIALS.length-1?0:i+1); });
        var t;
        grid.addEventListener('scroll', function() {
            clearTimeout(t);
            t = setTimeout(function() {
                var i = current();
                dotBtns.forEach(function(d, n) { d.classList.toggle('testi-dot-active', n===i); d.setAttribute('aria-selected', n===i?'true':'false'); });
            }, 80);
        });
    }

    function initFAQ() {
        var dl = document.getElementById('email-faq-accordions');
        if (!dl) return;
        var open = 0;
        function render() {
            dl.innerHTML = FAQ.map(function(f, i) {
                var isOpen = i === open;
                return '<div class="faq-item' + (isOpen?' faq-open':'') + '" data-faq-index="' + i + '">' +
                    '<dt><button class="faq-question" aria-expanded="' + isOpen + '" aria-controls="email-faq-ans-' + i + '" id="email-faq-q-' + i + '">' +
                    '<span>' + f.question + '</span>' +
                    '<svg class="faq-chevron" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
                    '</button></dt>' +
                    '<dd class="faq-answer" id="email-faq-ans-' + i + '" role="region" aria-labelledby="email-faq-q-' + i + '"><p>' + f.answer + '</p></dd></div>';
            }).join('');
            dl.querySelectorAll('.faq-question').forEach(function(btn) {
                btn.addEventListener('click', function() {
                    var idx = parseInt(btn.closest('.faq-item').dataset.faqIndex, 10);
                    open = (open === idx) ? null : idx;
                    render();
                });
            });
        }
        render();
    }

    function initRipple() {
        document.querySelectorAll('.cloud-cta-btn-primary').forEach(function(btn) {
            btn.addEventListener('click', function(e) {
                var r = btn.getBoundingClientRect(), sz = Math.max(r.width, r.height);
                var sp = document.createElement('span');
                sp.style.cssText = 'position:absolute;border-radius:50%;background:rgba(255,255,255,0.25);transform:scale(0);animation:rippleAnim 0.5s linear;pointer-events:none;width:'+sz+'px;height:'+sz+'px;left:'+(e.clientX-r.left-sz/2)+'px;top:'+(e.clientY-r.top-sz/2)+'px';
                btn.style.overflow = 'hidden'; btn.style.position = 'relative';
                btn.appendChild(sp);
                sp.addEventListener('animationend', function() { sp.remove(); });
            });
        });
    }

    function init() {
        initTestimonials();
        initFAQ();
        initRipple();
        var ldr = document.getElementById('page-loader');
        if (ldr) { ldr.classList.add('loader-done'); setTimeout(function(){ ldr.classList.add('loader-hidden'); }, 520); }
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
})();
