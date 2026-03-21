// ══════════════════════════════════════
//  CONFIG
// ══════════════════════════════════════
const STRAPI_URL = (typeof window !== "undefined" && typeof window.resolveStrapiBaseUrl === "function")
    ? window.resolveStrapiBaseUrl()
    : "";
const TOKEN = (typeof window !== "undefined" && typeof window.TOKEN !== "undefined") ? window.TOKEN : "5e685bd788588b5db88df3d3d47ad9a446f82768a2514d7dce437f6dc10c872d61b83b91763e6ea54acb9f7d7aac432e1714eef2dd12d718aae5c3bbae246aa90a85d22938474559dd9327dc2f7c9114b06bfdbb4ce9daf5d4e8f45b7a608c7d80eea92ac9896b47238380007a7d592b3825db93c9f9e5fbdab95be79a2c8e6e";


// ══════════════════════════════════════
//  FALLBACK DATA — used if Strapi is down
// ══════════════════════════════════════
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
};

// ══════════════════════════════════════
//  HELPERS
// ══════════════════════════════════════
const strapiHeaders = { Authorization: `Bearer ${TOKEN}` };

function strapiFetch(endpoint) {
    return fetch(`${STRAPI_URL}${endpoint}`, { headers: strapiHeaders }).then(r => r.json());
}

// ══════════════════════════════════════
//  LOADER
// ══════════════════════════════════════
function showLoader() {
    document.getElementById("page-loader").classList.remove("loader-hidden");
}

function hideLoader() {
    const loader = document.getElementById("page-loader");
    loader.classList.add("loader-done");
    setTimeout(() => loader.classList.add("loader-hidden"), 400);
}

// ══════════════════════════════════════
//  FILL — core utility
// ══════════════════════════════════════
function fill(data) {
    document.querySelectorAll("[data-strapi]").forEach(el => {
        const key = el.dataset.strapi;
        if (!(key in data)) return;
        const value = data[key];
        if (el.tagName === "IMG") {
            el.src = value;
        } else {
            el.textContent = value;
        }
    });
}

// ══════════════════════════════════════
//  FETCH ALL DATA IN PARALLEL
// ══════════════════════════════════════
async function fetchAllData() {
    const [heroData, logoData, menuData, whyUsData, whoWeAreData, lessComplexityData] = await Promise.all([
        strapiFetch("/api/hero-section"),
        strapiFetch("/api/main-logo?populate=*"),
        strapiFetch("/api/navigation?populate[menus][populate][sections][populate]=items&populate[menus][populate]=items"),
        strapiFetch("/api/why-us-section?populate=cards"),
        strapiFetch("/api/who-we-are-section?populate=featureCards"),
        strapiFetch("/api/less-complexity-section"),
    ]);
    return { heroData, logoData, menuData, whyUsData, whoWeAreData, lessComplexityData };
}

// ══════════════════════════════════════
//  RENDER: LOGO + HERO
// ══════════════════════════════════════
function renderHeroAndLogo(heroData, logoData) {
    const hero = heroData?.data ?? LOCAL_DATA.hero;
    const logo = logoData?.data?.mainLogo;

    fill({
        mainHeading: hero.mainHeading ?? LOCAL_DATA.hero.mainHeading,
        subHeading: hero.subHeading ?? LOCAL_DATA.hero.subHeading,
        description: hero.description ?? LOCAL_DATA.hero.description,
        price: hero.price ?? LOCAL_DATA.hero.price,
        priceNote: hero.priceNote ?? LOCAL_DATA.hero.priceNote,
        mainLogo: logo ? STRAPI_URL + logo.url : "",
    });
}

// ══════════════════════════════════════
//  RENDER: WHY CHOOSE US
// ══════════════════════════════════════
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


// ══════════════════════════════════════
//  RENDER: WHO WE ARE
// ══════════════════════════════════════
function renderWhoWeAre(whoWeAreData) {
    const data = whoWeAreData?.data ?? LOCAL_DATA.whoWeAre;

    fill({
        whoWeAreHeading: data.heading ?? LOCAL_DATA.whoWeAre.heading,
        whoWeAreParagraph: data.paragraph ?? LOCAL_DATA.whoWeAre.paragraph,
    });

    const cards = data.featureCards ?? LOCAL_DATA.whoWeAre.featureCards;
    const html = cards.map(card => {
        const cls = card.variant === "primary" ? "btn-primary feature-cards" : "btn-outline feature-cards";
        return `<button class="${cls}">${card.label}</button>`;
    }).join("");

    document.querySelectorAll('[data-strapi-grid="whoWeAreCards"]').forEach(container => {
        container.innerHTML = html;
    });
}

// ══════════════════════════════════════
//  RENDER: LESS CLOUD COMPLEXITY
// ══════════════════════════════════════
function renderLessComplexity(lessComplexityData) {
    const data = lessComplexityData?.data ?? LOCAL_DATA.lessComplexity;

    fill({
        lessComplexityHeading: data.heading ?? LOCAL_DATA.lessComplexity.heading,
        lessComplexityParagraph: data.paragraph ?? LOCAL_DATA.lessComplexity.paragraph,
    });
}

// ══════════════════════════════════════
//  RENDER: NAV + DROPDOWN
// ══════════════════════════════════════
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

    // Build nav link HTML for a given menu
    function buildNavLinkHTML(menu) {
        return `
            <button class="nav-link" onclick="openDropdown('${menu.id}', this)">
                ${menu.label}
                <svg class="chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <polyline points="6 9 12 15 18 9"/>
                </svg>
            </button>`;
    }

    // Fill desktop nav
    document.querySelectorAll("[data-strapi-nav]").forEach(navLinks => {
        CMS_MENUS.forEach(menu => {
            const li = document.createElement("li");
            li.className = "nav-item";
            li.innerHTML = buildNavLinkHTML(menu);
            navLinks.appendChild(li);
        });
    });

    // Fill mobile nav — same links, closes mobile menu on click
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
        if (!menu) { console.error("Menu not found:", menuId); return; }

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

    document.getElementById("overlay").addEventListener("click", closeDropdown);
    document.addEventListener("keydown", e => { if (e.key === "Escape") closeDropdown(); });
}

// ══════════════════════════════════════
//  HAMBURGER MENU (mobile/tablet)
// ══════════════════════════════════════
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
            // Close the dropdown if it's open
            if (typeof closeDropdown === "function") closeDropdown();
        }
    });

    // Close mobile menu on outside click
    document.addEventListener("click", e => {
        if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
            closeMobileMenu();
        }
    });

    // Close on Escape
    document.addEventListener("keydown", e => {
        if (e.key === "Escape") closeMobileMenu();
    });

    // Close mobile menu when viewport grows past tablet breakpoint
    window.addEventListener("resize", () => {
        if (window.innerWidth > 1024) closeMobileMenu();
    });
}

// ══════════════════════════════════════
//  INIT
// ══════════════════════════════════════
async function init() {
    showLoader();
    try {
        const { heroData, logoData, menuData, whyUsData, whoWeAreData, lessComplexityData } = await fetchAllData();
        renderHeroAndLogo(heroData, logoData);
        initNav(menuData);
        renderWhyUs(whyUsData);
        renderWhoWeAre(whoWeAreData);
        renderLessComplexity(lessComplexityData);
    } catch (err) {
        console.error("Strapi fetch failed, using local data:", err);
        renderHeroAndLogo(null, null);
        renderWhyUs(null);
        renderWhoWeAre(null);
        renderLessComplexity(null);
    } finally {
        hideLoader();
    }
    initHamburger();
}

init();