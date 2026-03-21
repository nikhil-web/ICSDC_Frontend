// ══════════════════════════════════════════════════════════
//  main.js — ICSDC Frontend + Strapi Integration
//  Renders: Hero, Logo, Nav, WhyUs, WhoWeAre,
//           LessComplexity, CloudServices, IndustryValidated,
//           ContactInfo, Footer
// ══════════════════════════════════════════════════════════

import { uploadURL } from "./services/strapiClient.js";
import { fetchAllPageData } from "./services/contentService.js";

// ══════════════════════════════════════════════════════════
//  FALLBACK DATA — mirrors every Strapi field shape.
//  Used when Strapi is offline or returns no data.
// ══════════════════════════════════════════════════════════
const LOCAL_DATA = {
    hero: {
        mainHeading: "The Best Cloud isn't just in Sky, it's engineered here...",
        subHeading: "Best-in-Class Solutions for Your Business",
        description: "Say goodbye to slow speeds, security worries, and hidden costs. ICSDC is chosen as the Best Cloud Service Provider by industry leaders globally. We deliver unmatched performance, zero downtime, and rock-solid stability.",
        price: "$ 65.00",
        priceNote: "*Details about the above price",
    },
    whyUs: [
        { icon: "🔐", title: "Enterprise Security", desc: "Zero-trust architecture with compliance-ready infrastructure." },
        { icon: "⚡", title: "High Performance", desc: "Optimized cloud workloads with ultra-low latency." },
        { icon: "☁️", title: "Scalable Architecture", desc: "Scale seamlessly as your business grows globally." },
        { icon: "🛠️", title: "24/7 Expert Support", desc: "Dedicated cloud engineers available round-the-clock." },
    ],
    whoWeAre: {
        heading: "Who We Are?",
        paragraph: "At ICSDC, we don't just host your data - we power your digital infrastructure. As a next-generation cloud service provider and data center, we adjoin advanced technology, intelligent infrastructure, and expert support to deliver unmatched reliability and speed. For over 15 years, businesses have trusted us to keep their operations seamless, secure, and always connected.",
        featureCards: [
            { label: "Ultra-fast and scalable cloud solutions built for growth", variant: "outline" },
            { label: "Enterprise-grade security with Least downtime", variant: "outline" },
            { label: "Real people, real support - available 24/7", variant: "outline" },
            { label: "Connect with a Cloud Architect Now", variant: "primary" },
        ],
    },
    lessComplexity: {
        heading: "Less Cloud Complexity, More Expert Support with ICSDC Cloud Services",
        paragraph: "ICSDC servers operate across multiple global regions with dedicated deployment points in India (Noida & Mumbai) for unmatched speed and reliability.",
    },
    cloudServices: [
        { title: "Dedicated Server", description: "Get the exclusive power and control only dedicated hardware can offer.", svgIcon: '<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>', position: "left-top", animationDelay: "0s" },
        { title: "NVMe Storage", description: "Blazing-fast NVMe SSD arrays with enterprise-grade redundancy.", svgIcon: '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3"/>', position: "left-mid", animationDelay: "0.8s" },
        { title: "Bare Metal", description: "Single-tenant physical servers with no hypervisor overhead.", svgIcon: '<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M9 9h6M9 12h6M9 15h4"/>', position: "left-bot", animationDelay: "1.6s" },
        { title: "Managed Cloud", description: "Fully managed cloud infrastructure with 24×7 expert support.", svgIcon: '<path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>', position: "right-top", animationDelay: "0.4s" },
        { title: "GPU Servers", description: "High-density GPU clusters purpose-built for AI/ML training.", svgIcon: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>', position: "right-mid", animationDelay: "1.2s" },
        { title: "Global CDN", description: "Lightning-fast content delivery across 30+ PoPs worldwide.", svgIcon: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/>', position: "right-bot", animationDelay: "2.0s" },
        { title: "DDoS Protection", description: "Enterprise-grade mitigation absorbing multi-Tbps attacks.", svgIcon: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>', position: "bottom-left", animationDelay: "2.4s" },
        { title: "24×7 Support", description: "Round-the-clock certified cloud architects ready to resolve issues.", svgIcon: '<path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>', position: "bottom-right", animationDelay: "3.0s" },
    ],
    industryValidated: {
        heading: "Industry-Leading Excellence, Validated",
        paragraph: "ICSDC servers operate across multiple global regions with dedicated deployment points in India (Noida & Mumbai) for unmatched speed and reliability.",
    },
    contact: {
        email: "help@info.com",
        phone: "+91 98109 58857",
        assistanceHours: "Monday – Friday 6 am to 8 pm EST",
    },
};

// ══════════════════════════════════════════════════════════
//  LOADER
// ══════════════════════════════════════════════════════════
function showLoader() {
    document.getElementById("page-loader")?.classList.remove("loader-hidden");
}

function hideLoader() {
    const loader = document.getElementById("page-loader");
    if (!loader) return;
    loader.classList.add("loader-done");
    setTimeout(() => loader.classList.add("loader-hidden"), 400);
}

// ══════════════════════════════════════════════════════════
//  FILL — injects text/src into [data-strapi="key"] elements
// ══════════════════════════════════════════════════════════
function fill(data) {
    document.querySelectorAll("[data-strapi]").forEach(el => {
        const key = el.dataset.strapi;
        if (!key || !(key in data)) return;
        const value = data[key];
        if (el.tagName === "IMG") {
            el.src = value;
        } else {
            el.textContent = value;
        }
    });
}

// ══════════════════════════════════════════════════════════
//  RENDER: HERO + LOGO
// ══════════════════════════════════════════════════════════
function renderHeroAndLogo(heroData, logoData) {
    const hero = heroData?.data ?? LOCAL_DATA.hero;
    const logo = logoData?.data?.mainLogo;

    fill({
        mainHeading: hero.mainHeading ?? LOCAL_DATA.hero.mainHeading,
        subHeading: hero.subHeading ?? LOCAL_DATA.hero.subHeading,
        description: hero.description ?? LOCAL_DATA.hero.description,
        price: hero.price ?? LOCAL_DATA.hero.price,
        priceNote: hero.priceNote ?? LOCAL_DATA.hero.priceNote,
        mainLogo: logo ? uploadURL(logo, "thumbnail") : "",
    });
}

// ══════════════════════════════════════════════════════════
//  RENDER: WHY CHOOSE US
// ══════════════════════════════════════════════════════════
function renderWhyUs(whyUsData) {
    const items = whyUsData?.data?.cards ?? LOCAL_DATA.whyUs;

    const html = items.map(item => `
        <div class="why-card">
            <div class="why-icon">${item.icon}</div>
            <h3>${item.title}</h3>
            <p>${item.desc}</p>
        </div>
    `).join("");

    document.querySelectorAll('[data-strapi-grid="whyUs"]').forEach(grid => {
        grid.innerHTML = html;
    });
}

// ══════════════════════════════════════════════════════════
//  RENDER: WHO WE ARE
// ══════════════════════════════════════════════════════════
function renderWhoWeAre(whoWeAreData) {
    const data = whoWeAreData?.data ?? LOCAL_DATA.whoWeAre;
    const cards = data.featureCards ?? LOCAL_DATA.whoWeAre.featureCards;

    fill({
        whoWeAreHeading: data.heading ?? LOCAL_DATA.whoWeAre.heading,
        whoWeAreParagraph: data.paragraph ?? LOCAL_DATA.whoWeAre.paragraph,
    });

    const html = cards.map(card => {
        const cls = card.variant === "primary" ? "btn-primary feature-cards" : "btn-outline feature-cards";
        return `<button class="${cls}">${card.label}</button>`;
    }).join("");

    document.querySelectorAll('[data-strapi-grid="whoWeAreCards"]').forEach(el => {
        el.innerHTML = html;
    });
}

// ══════════════════════════════════════════════════════════
//  RENDER: LESS CLOUD COMPLEXITY
// ══════════════════════════════════════════════════════════
function renderLessComplexity(lessComplexityData) {
    const data = lessComplexityData?.data ?? LOCAL_DATA.lessComplexity;

    fill({
        lessComplexityHeading: data.heading ?? LOCAL_DATA.lessComplexity.heading,
        lessComplexityParagraph: data.paragraph ?? LOCAL_DATA.lessComplexity.paragraph,
    });
}

// ══════════════════════════════════════════════════════════
//  RENDER: CLOUD SOLUTIONS CARDS
//  Replaces hardcoded HTML floating cards with CMS data.
//  Matches position slugs to existing CSS classes.
// ══════════════════════════════════════════════════════════
const POSITION_CLASS_MAP = {
    "left-top": "fc-left fc-top",
    "left-mid": "fc-left fc-mid",
    "left-bot": "fc-left fc-bot",
    "right-top": "fc-right fc-top",
    "right-mid": "fc-right fc-mid",
    "right-bot": "fc-right fc-bot",
    "bottom-left": "fc-btm fc-btm-l",
    "bottom-right": "fc-btm fc-btm-r",
};

function renderCloudServices(cloudServicesData) {
    const services = cloudServicesData?.data ?? LOCAL_DATA.cloudServices;
    const wrapper = document.querySelector(".phone-mockup-wrapper");
    if (!wrapper) return;

    // Remove existing hardcoded floating cards
    wrapper.querySelectorAll(".floating-card").forEach(el => el.remove());

    // Re-insert dynamic cards in DOM before the ripple/phone center
    const rippleWrap = wrapper.querySelector(".ripple-wrap") ?? wrapper.querySelector(".image-wrapper");

    services.forEach(service => {
        const posClasses = POSITION_CLASS_MAP[service.position] ?? "fc-left fc-top";
        const card = document.createElement("div");
        card.className = `floating-card ${posClasses}`;
        card.style.setProperty("--fc-delay", service.animationDelay ?? "0s");

        card.innerHTML = `
            <div class="fc-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    ${service.svgIcon}
                </svg>
            </div>
            <h4>${service.title}</h4>
            <p>${service.description}</p>
        `;

        // Bottom cards go after the ripple/phone; side cards go before
        const isBottom = service.position?.startsWith("bottom");
        if (isBottom && rippleWrap) {
            wrapper.appendChild(card);
        } else if (rippleWrap) {
            wrapper.insertBefore(card, rippleWrap);
        } else {
            wrapper.appendChild(card);
        }
    });
}

// ══════════════════════════════════════════════════════════
//  RENDER: INDUSTRY VALIDATED
// ══════════════════════════════════════════════════════════
function renderIndustryValidated(homepageData) {
    // Fields live on the homepage single type in Strapi
    const data = homepageData?.data ?? LOCAL_DATA.industryValidated;

    fill({
        industryValidatedHeading: data.industryValidatedHeading ?? LOCAL_DATA.industryValidated.heading,
        industryValidatedParagraph: data.industryValidatedParagraph ?? LOCAL_DATA.industryValidated.paragraph,
    });

    // Optional: update the industry image if provided via CMS
    if (data.industryValidatedImage) {
        const imgEl = document.querySelector(".industry-validated img");
        if (imgEl) imgEl.src = uploadURL(data.industryValidatedImage, "large");
    }
}

// ══════════════════════════════════════════════════════════
//  RENDER: CONTACT INFO (from Global single type)
// ══════════════════════════════════════════════════════════
function renderContactInfo(globalData) {
    const contact = globalData?.data?.contactInfo ?? LOCAL_DATA.contact;

    const emailEls = document.querySelectorAll(".contact-info-card:first-child .contact-card-detail");
    const phoneEls = document.querySelectorAll(".contact-info-card:last-child .contact-card-detail");
    const hoursEls = document.querySelectorAll(".contact-card-meta");

    emailEls.forEach(el => { el.textContent = contact.email ?? LOCAL_DATA.contact.email; });
    phoneEls.forEach(el => { el.textContent = contact.phone ?? LOCAL_DATA.contact.phone; });
    hoursEls.forEach(el => {
        const hours = contact.assistanceHours ?? LOCAL_DATA.contact.assistanceHours;
        el.innerHTML = `Assistance hours:<br>${hours}`;
    });

    // Also update the FAQ sidebar phone number
    const faqPhone = document.querySelector(".faq-contact-desc");
    if (faqPhone && contact.phone) {
        faqPhone.innerHTML = faqPhone.innerHTML.replace(
            /\+[\d\s]+/,
            contact.phone
        );
    }
}

// ══════════════════════════════════════════════════════════
//  RENDER: NAV + DROPDOWN (unchanged from original)
// ══════════════════════════════════════════════════════════
function initNav(menuData) {
    const CMS_MENUS = (menuData?.data?.menus ?? []).map(menu => ({
        id: String(menu.id),
        label: menu.lebel,
        icon: menu.icon,
        desc: menu.desc,
        cols: menu.cols,
        items: (menu.items || []).map(item => ({
            icon: item.icon,
            title: item.title,
            sub: item.subtext,
            url: item.url || "#",
        })),
        sections: (menu.sections || []).map(sec => ({
            id: String(sec.id),
            label: sec.lebel,
            icon: sec.icon,
            items: (sec.items || []).map(item => ({
                icon: item.icon,
                title: item.title,
                sub: item.subtext,
                url: item.url || "#",
            })),
        })),
    }));

    function buildNavLinkHTML(menu) {
        return `
            <button class="nav-link" onclick="openDropdown('${menu.id}', this)">
                ${menu.label}
                <svg class="chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <polyline points="6 9 12 15 18 9"/>
                </svg>
            </button>`;
    }

    document.querySelectorAll("[data-strapi-nav]").forEach(navLinks => {
        CMS_MENUS.forEach(menu => {
            const li = document.createElement("li");
            li.className = "nav-item";
            li.innerHTML = buildNavLinkHTML(menu);
            navLinks.appendChild(li);
        });
    });

    document.querySelectorAll("[data-strapi-nav-mobile]").forEach(mobileNav => {
        CMS_MENUS.forEach(menu => {
            const li = document.createElement("li");
            li.className = "nav-item";
            li.innerHTML = `
                <button class="nav-link" onclick="openDropdown('${menu.id}', this); closeMobileMenu()">
                    ${menu.label}
                    <svg class="chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                        <polyline points="6 9 12 15 18 9"/>
                    </svg>
                </button>`;
            mobileNav.appendChild(li);
        });
    });

    let currentMenuId = null;

    function renderItems(source, cols, title) {
        const panelTitle = document.querySelector("[data-strapi-dd='panelTitle']");
        if (title) {
            panelTitle.textContent = title;
            panelTitle.classList.remove("hidden");
        } else {
            panelTitle.classList.add("hidden");
        }
        const grid = document.querySelector("[data-strapi-dd='grid']");
        grid.className = `cols-${cols || 2}`;
        grid.innerHTML = source.items.map(item => `
            <a href="${item.url}" class="dd-item">
                <div class="dd-item-icon">${item.icon}</div>
                <div class="dd-item-text">
                    <h5>${item.title}</h5>
                    <p>${item.sub}</p>
                </div>
            </a>
        `).join("");
    }

    window.openDropdown = function (menuId, btnEl) {
        if (currentMenuId === menuId) { closeDropdown(); return; }
        closeDropdown(false);
        currentMenuId = menuId;
        const menu = CMS_MENUS.find(m => m.id === menuId);
        if (!menu) return;

        document.querySelectorAll(".nav-link").forEach(b => b.classList.remove("active"));
        btnEl.classList.add("active");

        const sidebar = document.querySelector("[data-strapi-dd='sidebar']");
        const flatLeft = document.querySelector("[data-strapi-dd='flatLeft']");

        if (menu.sections && menu.sections.length) {
            sidebar.classList.remove("hidden");
            flatLeft.classList.add("hidden");
            sidebar.innerHTML = menu.sections.map((sec, i) => `
                <button class="sidebar-item${i === 0 ? " active" : ""}"
                        onclick="selectSection('${menu.id}', '${sec.id}', this)">
                    <div class="sidebar-icon">${sec.icon}</div>
                    <span class="sidebar-label">${sec.label}</span>
                    <span class="sidebar-arrow">›</span>
                </button>
            `).join("");
            renderItems(menu.sections[0], menu.cols, menu.sections[0].label);
        } else {
            sidebar.classList.add("hidden");
            flatLeft.classList.remove("hidden");
            document.querySelector("[data-strapi-dd='flatIcon']").textContent = menu.icon;
            document.querySelector("[data-strapi-dd='flatTitle']").textContent = menu.label;
            document.querySelector("[data-strapi-dd='flatDesc']").textContent = menu.desc;
            renderItems(menu, menu.cols, null);
        }

        document.getElementById("dropdown-wrap").classList.add("open");
        document.getElementById("overlay").classList.add("visible");
    };

    window.selectSection = function (menuId, sectionId, btnEl) {
        const menu = CMS_MENUS.find(m => m.id === menuId);
        const sec = menu.sections.find(s => s.id === sectionId);
        document.querySelectorAll(".sidebar-item").forEach(b => b.classList.remove("active"));
        btnEl.classList.add("active");
        renderItems(sec, menu.cols, sec.label);
    };

    window.closeDropdown = function (resetState = true) {
        document.getElementById("dropdown-wrap").classList.remove("open");
        document.getElementById("overlay").classList.remove("visible");
        document.querySelectorAll(".nav-link").forEach(b => b.classList.remove("active"));
        if (resetState) currentMenuId = null;
    };

    document.getElementById("overlay")?.addEventListener("click", closeDropdown);
    document.addEventListener("keydown", e => { if (e.key === "Escape") closeDropdown(); });
}

// ══════════════════════════════════════════════════════════
//  HAMBURGER MENU (unchanged)
// ══════════════════════════════════════════════════════════
function initHamburger() {
    const hamburger = document.getElementById("hamburger");
    const mobileMenu = document.getElementById("mobile-menu");
    if (!hamburger || !mobileMenu) return;

    window.closeMobileMenu = function () {
        hamburger.classList.remove("open");
        hamburger.setAttribute("aria-expanded", "false");
        mobileMenu.classList.remove("open");
        mobileMenu.setAttribute("aria-hidden", "true");
    };

    hamburger.addEventListener("click", () => {
        const isOpen = mobileMenu.classList.contains("open");
        if (isOpen) {
            closeMobileMenu();
        } else {
            hamburger.classList.add("open");
            hamburger.setAttribute("aria-expanded", "true");
            mobileMenu.classList.add("open");
            mobileMenu.setAttribute("aria-hidden", "false");
            if (typeof closeDropdown === "function") closeDropdown();
        }
    });

    document.addEventListener("click", e => {
        if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
            closeMobileMenu();
        }
    });
    document.addEventListener("keydown", e => { if (e.key === "Escape") closeMobileMenu(); });
    window.addEventListener("resize", () => { if (window.innerWidth > 1024) closeMobileMenu(); });
}

// ══════════════════════════════════════════════════════════
//  INIT — orchestrates the full render pipeline
// ══════════════════════════════════════════════════════════
async function init() {
    showLoader();
    try {
        const {
            heroData,
            logoData,
            menuData,
            whyUsData,
            whoWeAreData,
            lessComplexityData,
            globalData,
            cloudServicesData,
        } = await fetchAllPageData();

        renderHeroAndLogo(heroData, logoData);
        initNav(menuData);
        renderWhyUs(whyUsData);
        renderWhoWeAre(whoWeAreData);
        renderLessComplexity(lessComplexityData);
        renderCloudServices(cloudServicesData);
        renderIndustryValidated(heroData);   // industryValidated fields live on homepage
        renderContactInfo(globalData);

    } catch (err) {
        console.error("[main.js] Strapi fetch failed — rendering with local fallback data:", err);
        renderHeroAndLogo(null, null);
        renderWhyUs(null);
        renderWhoWeAre(null);
        renderLessComplexity(null);
        renderCloudServices(null);
        renderIndustryValidated(null);
        renderContactInfo(null);
    } finally {
        hideLoader();
    }

    initHamburger();
}

init();
