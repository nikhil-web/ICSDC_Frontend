/**
 * windows-dedicated-server.js
 * Handles: testimonials carousel, FAQ accordion, CTA ripple, page loader
 * Prefix: wds
 */
(function () {
    'use strict';

    var TESTIMONIALS = [
        {
            name: 'Akash Sharma',
            title: 'IT Infrastructure Manager',
            company: 'IT Services Company',
            quote: "Switching to ICSDC's Windows Dedicated Server was the stability upgrade we desperately needed. Our .NET applications run smoother than ever, and the support team has been exceptionally responsive.",
            rating: 5
        },
        {
            name: 'Neha Kapoor',
            title: 'Operations Director',
            company: 'Manufacturing Company',
            quote: 'Our ERP and inventory system needed a server that could handle heavy workloads without crashing. ICSDC delivered exactly that. Performance has been consistent, and downtime has practically disappeared.',
            rating: 5
        },
        {
            name: 'Ritesh Menon',
            title: 'CTO',
            company: 'Healthcare Technology Firm',
            quote: "We deal with sensitive patient records and Windows-based medical software. ICSDC's secure and isolated server environment gave us the compliance and reliability our business requires.",
            rating: 5
        },
        {
            name: 'Sandeep Bhat',
            title: 'Co-Founder',
            company: 'Logistics & Supply Chain Company',
            quote: 'Our tracking system and SQL database always struggled on shared hosting. After moving to ICSDC Windows Dedicated Server, speed and real-time accuracy improved drastically.',
            rating: 5
        },
        {
            name: 'Aditi Verma',
            title: 'Senior Developer',
            company: 'Software Development Agency',
            quote: 'Our development team needed full administrative control for testing and deploying Windows applications. ICSDC provided the perfect setup — fast, customizable, and backed by excellent technical support.',
            rating: 5
        }
    ];

    var FAQ = [
        {
            question: 'What is a Windows Dedicated Server from ICSDC?',
            answer: 'ICSDC Windows Dedicated Server is a high-performance physical machine reserved entirely for your workloads. It runs Windows Server OS and gives you full control, dedicated CPU/RAM/storage, and enterprise-grade reliability — ideal for applications, databases, and RDP users.'
        },
        {
            question: 'Which Windows Server editions does ICSDC support?',
            answer: 'ICSDC offers Windows Server Standard and Datacenter editions. Standard is best for limited virtualization (up to two VMs), while Datacenter is ideal for large-scale virtualization with unlimited VMs/containers.'
        },
        {
            question: 'Why choose a dedicated server instead of VPS or shared hosting?',
            answer: 'With ICSDC dedicated servers, you get exclusive hardware, consistent performance, better security isolation, and full OS-level control — making it suitable for enterprise workloads, ERPs, CRM tools, RDP environments, and heavy databases.'
        },
        {
            question: 'Is the Windows Server licence included?',
            answer: 'Yes. ICSDC provides genuine Microsoft Windows Server licences as part of your plan. Additional CALs or RDS licences can also be arranged based on your requirements.'
        },
        {
            question: 'Can ICSDC help me migrate my existing Windows environment?',
            answer: 'Yes. ICSDC supports seamless migration of websites, databases, on-premise systems, and remote desktop environments with minimal downtime.'
        },
        {
            question: 'How secure is the ICSDC Windows Dedicated Server?',
            answer: 'Security includes dedicated hardware isolation, robust firewalls, enterprise-level DDoS protection, and Windows Server security features such as role-based access, encryption, and regular patch support.'
        },
        {
            question: 'Can I run Hyper-V or multiple VMs on the server?',
            answer: 'Absolutely. Both Hyper-V and Windows Containers are supported. Virtualization limits depend on your chosen Windows edition — Datacenter gives you unlimited VM rights.'
        },
        {
            question: 'Are automatic backups available?',
            answer: 'Yes. ICSDC offers optional automated backups and snapshot solutions. You may also use built-in Windows Server Backup or third-party backup tools for added safety.'
        },
        {
            question: 'What performance can I expect from ICSDC?',
            answer: 'ICSDC uses enterprise-grade processors, NVMe/SSD storage, high-bandwidth network ports, and optimized datacenter infrastructure — ensuring fast, stable, and consistent performance even for heavy workloads.'
        },
        {
            question: 'What uptime guarantee does ICSDC offer?',
            answer: 'ICSDC provides a high-availability environment with strong uptime SLAs, backed by redundant power, cooling, network paths, and enterprise-grade hardware.'
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
        var grid = document.getElementById('wds-testi-grid');
        var dots = document.getElementById('wds-testi-dots');
        var prev = document.getElementById('wds-testi-prev');
        var next = document.getElementById('wds-testi-next');
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
        var dl = document.getElementById('wds-faq-accordions');
        if (!dl) return;
        var open = 0;
        function render() {
            dl.innerHTML = FAQ.map(function(f, i) {
                var isOpen = i === open;
                return '<div class="faq-item' + (isOpen?' faq-open':'') + '" data-faq-index="' + i + '">' +
                    '<dt><button class="faq-question" aria-expanded="' + isOpen + '" aria-controls="wds-faq-ans-' + i + '" id="wds-faq-q-' + i + '">' +
                    '<span>' + f.question + '</span>' +
                    '<svg class="faq-chevron" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
                    '</button></dt>' +
                    '<dd class="faq-answer" id="wds-faq-ans-' + i + '" role="region" aria-labelledby="wds-faq-q-' + i + '"><p>' + f.answer + '</p></dd></div>';
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
