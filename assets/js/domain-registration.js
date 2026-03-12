/**
 * domain-registration.js
 * Handles: testimonials carousel, FAQ accordion, CTA ripple, page loader
 * Prefix: dom
 */
(function () {
    'use strict';

    var TESTIMONIALS = [
        {
            name: 'Rohan Mehta',
            title: 'Co-Founder',
            company: 'Fintech Company',
            quote: 'ICSDC made our domain registration effortless. The process was quick, transparent, and secure — exactly what a fintech startup like ours needs. Their support team was always available when we had questions.',
            rating: 5
        },
        {
            name: 'Neha Arora',
            title: 'Operations Head',
            company: 'Education Company',
            quote: "We moved all our domains to ICSDC for better management, and it's been a great decision. Their dashboard is intuitive, and support is always available. DNS management has never been simpler.",
            rating: 5
        },
        {
            name: 'Arjun Nair',
            title: 'Technical Director',
            company: 'IT Company',
            quote: 'From registering domains to managing DNS, ICSDC gives us everything in one place. Their reliability and uptime are unmatched. The WHOIS privacy feature alone makes the switch worthwhile.',
            rating: 5
        },
        {
            name: 'Simran Kaur',
            title: 'Founder',
            company: 'E-Commerce Brand',
            quote: 'As a growing online brand, we needed a domain partner we could trust. ICSDC made it simple, affordable, and incredibly fast to get started. The free add-ons like DNS tools and forwarding are a great bonus.',
            rating: 5
        }
    ];

    var FAQ = [
        {
            question: 'How do I register a domain with ICSDC?',
            answer: 'Search your desired name on our domain checker, choose your preferred extension, and complete the registration in a few clicks. The process takes just a few minutes.'
        },
        {
            question: 'Can I transfer my existing domain to ICSDC?',
            answer: 'Yes, you can easily transfer your domain to ICSDC with zero downtime and full support throughout the process, including DNS migration assistance.'
        },
        {
            question: 'Will my personal details be protected?',
            answer: 'Absolutely. ICSDC offers WHOIS privacy protection to keep your personal information safe and hidden from public records and spam databases.'
        },
        {
            question: 'What if my desired domain name is already taken?',
            answer: 'Try alternative extensions or variations — our smart search tool helps you find the closest available match and suggests alternatives instantly.'
        },
        {
            question: 'Does ICSDC offer support after registration?',
            answer: 'Yes! Our expert support team is available 24/7 to assist you with setup, renewals, DNS management, transfers, and any other domain-related needs.'
        },
        {
            question: 'How long does a domain registration last?',
            answer: 'Most domains can be registered for 1 year, and you can extend them for multiple years. Some extensions may require a longer minimum term.'
        },
        {
            question: 'Can I change my domain after registering?',
            answer: 'Domain names cannot be renamed, but you can register a new one and redirect your old domain to it. Our team will help with the redirection setup.'
        },
        {
            question: 'What are TLDs, ccTLDs, and gTLDs?',
            answer: 'TLD is the ending of a domain (e.g., .com). ccTLD stands for country-specific TLDs (e.g., .in for India, .uk for the UK). gTLD refers to general TLDs like .com, .net, .online, etc.'
        },
        {
            question: 'What if the name I want is unavailable?',
            answer: 'Try a different extension or a slight variation of your name. Our domain search will also suggest available alternatives based on your search.'
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
        var grid = document.getElementById('dom-testi-grid');
        var dots = document.getElementById('dom-testi-dots');
        var prev = document.getElementById('dom-testi-prev');
        var next = document.getElementById('dom-testi-next');
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
        var dl = document.getElementById('dom-faq-accordions');
        if (!dl) return;
        var open = 0;
        function render() {
            dl.innerHTML = FAQ.map(function(f, i) {
                var isOpen = i === open;
                return '<div class="faq-item' + (isOpen?' faq-open':'') + '" data-faq-index="' + i + '">' +
                    '<dt><button class="faq-question" aria-expanded="' + isOpen + '" aria-controls="dom-faq-ans-' + i + '" id="dom-faq-q-' + i + '">' +
                    '<span>' + f.question + '</span>' +
                    '<svg class="faq-chevron" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
                    '</button></dt>' +
                    '<dd class="faq-answer" id="dom-faq-ans-' + i + '" role="region" aria-labelledby="dom-faq-q-' + i + '"><p>' + f.answer + '</p></dd></div>';
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
