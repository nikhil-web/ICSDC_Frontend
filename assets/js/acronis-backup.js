/**
 * acronis-backup.js
 * Handles: testimonials carousel, FAQ accordion, CTA ripple, page loader
 * Prefix: acr
 */
(function () {
    'use strict';

    var TESTIMONIALS = [
        {
            name: 'Rahul Mehta',
            title: 'IT Manager',
            company: 'Fintech Company',
            quote: "Managing sensitive financial data requires a backup system we can depend on. ICSDC's Acronis Backup not only gave us secure cloud protection but also reduced our recovery time significantly. Their team helped us set everything up without any downtime.",
            rating: 5
        },
        {
            name: 'Sana Verma',
            title: 'Operations Head',
            company: 'Education Sector',
            quote: 'With thousands of student records and digital learning assets, we needed a backup solution that was reliable and easy to manage. ICSDC made the transition incredibly smooth. The automated backups and quick restore features have saved us multiple times.',
            rating: 5
        },
        {
            name: "Mark D'Souza",
            title: 'Founder',
            company: 'Creative & Media Agency',
            quote: "As a media agency, losing files even once can ruin client trust. ICSDC's Acronis Backup has been a game changer. We've restored entire project folders in minutes. The stability and speed are worth every penny.",
            rating: 5
        },
        {
            name: 'Nitin Rao',
            title: 'CTO',
            company: 'IT & Software Services',
            quote: 'We operate several servers and applications, so unified backup management was crucial. ICSDC delivered a solution that fits perfectly into our infrastructure. Their Acronis setup is fast, secure, and scalable.',
            rating: 5
        },
        {
            name: 'Aisha Khan',
            title: 'CEO',
            company: 'Healthcare Provider',
            quote: "Handling patient data comes with major responsibility. ICSDC's Acronis Backup gives us the confidence that our records are protected from threats and accidental loss. The encryption, ransomware protection, and expert guidance from their team made implementation effortless.",
            rating: 5
        }
    ];

    var FAQ = [
        {
            question: 'What is Acronis Backup?',
            answer: 'Acronis Backup is a cloud-based solution that protects your files, servers, and systems by creating secure backups that can be restored when needed — with built-in ransomware protection and encryption.'
        },
        {
            question: 'How does ICSDC support Acronis Backup?',
            answer: 'ICSDC provides the infrastructure, setup assistance, monitoring, and technical support needed to run Acronis Backup smoothly for your business.'
        },
        {
            question: 'Is my data encrypted during backup?',
            answer: 'Yes. All backups are encrypted at the source, during transfer, and while stored in the cloud using industry-standard AES-256 encryption to keep your data secure.'
        },
        {
            question: 'Can I restore individual files or only full systems?',
            answer: 'You can restore both — single files, folders, applications, or complete system images depending on your needs and the backup type configured.'
        },
        {
            question: 'Do I need technical experience to use Acronis Backup?',
            answer: 'No. The interface is simple, and ICSDC helps with initial configuration so you can manage backups easily without any technical expertise.'
        },
        {
            question: 'How often are backups taken?',
            answer: 'You can choose the backup frequency — daily, weekly, or custom schedules — and configure retention policies based on your requirements.'
        },
        {
            question: 'What happens if a backup fails?',
            answer: "The system alerts you automatically, and ICSDC's team can assist in identifying and resolving the issue immediately."
        },
        {
            question: 'Can I increase my backup storage later?',
            answer: 'Yes. Storage can be upgraded at any time without interrupting your existing backups — flexible scaling with no downtime.'
        },
        {
            question: 'Does it protect against ransomware?',
            answer: 'Yes. Acronis includes built-in ransomware detection and Active Protection to prevent unauthorized changes to your data and backups.'
        },
        {
            question: 'Can I back up both physical and virtual machines?',
            answer: 'Yes. Acronis Backup supports physical servers, virtual machines, cloud instances, and workstations from a single unified dashboard.'
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
        var grid = document.getElementById('acr-testi-grid');
        var dots = document.getElementById('acr-testi-dots');
        var prev = document.getElementById('acr-testi-prev');
        var next = document.getElementById('acr-testi-next');
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
        var dl = document.getElementById('acr-faq-accordions');
        if (!dl) return;
        var open = 0;
        function render() {
            dl.innerHTML = FAQ.map(function(f, i) {
                var isOpen = i === open;
                return '<div class="faq-item' + (isOpen?' faq-open':'') + '" data-faq-index="' + i + '">' +
                    '<dt><button class="faq-question" aria-expanded="' + isOpen + '" aria-controls="acr-faq-ans-' + i + '" id="acr-faq-q-' + i + '">' +
                    '<span>' + f.question + '</span>' +
                    '<svg class="faq-chevron" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
                    '</button></dt>' +
                    '<dd class="faq-answer" id="acr-faq-ans-' + i + '" role="region" aria-labelledby="acr-faq-q-' + i + '"><p>' + f.answer + '</p></dd></div>';
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
