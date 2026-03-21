// ══════════════════════════════════════════════════════════
//  contentService.js
//  All page-level data fetchers.
//  Each function maps to exactly one Strapi endpoint.
//  Usage: import { getHomepage, getTestimonials, ... } from './contentService.js'
// ══════════════════════════════════════════════════════════

import { fetchAPI } from "./strapiClient.js";

// ──────────────────────────────────────────────────────────
//  SINGLE TYPES
// ──────────────────────────────────────────────────────────

/** Hero section text fields */
export function getHeroSection() {
    return fetchAPI("/api/hero-section");
}

/** Main logo media */
export function getMainLogo() {
    return fetchAPI("/api/main-logo?populate=*");
}

/**
 * Navigation with nested menus → sections → items
 * Matches the existing nav render engine in main.js exactly.
 */
export function getNavigation() {
    return fetchAPI(
        "/api/navigation?populate[menus][populate][sections][populate]=items&populate[menus][populate]=items"
    );
}

/** Why Choose Us section with feature cards */
export function getWhyUs() {
    return fetchAPI("/api/why-us-section?populate=cards");
}

/** Who We Are section with feature buttons */
export function getWhoWeAre() {
    return fetchAPI("/api/who-we-are-section?populate=featureCards");
}

/** Less Cloud Complexity text section */
export function getLessComplexity() {
    return fetchAPI("/api/less-complexity-section");
}

/**
 * Global single type — contact info + footer data
 * Uses explicit deep populate to avoid over-fetching.
 */
export function getGlobal() {
    return fetchAPI(
        "/api/global" +
        "?populate[contactInfo]=*" +
        "&populate[footer][populate]=*"
    );
}

// ──────────────────────────────────────────────────────────
//  COLLECTION TYPES
// ──────────────────────────────────────────────────────────

/**
 * All published testimonials with optional avatar.
 * Returns newest-first by default.
 */
export function getTestimonials() {
    return fetchAPI("/api/testimonials?populate=avatar&sort=createdAt:desc");
}

/**
 * All FAQ items, ordered by the `order` integer field.
 */
export function getFaqItems() {
    return fetchAPI("/api/faq-items?sort=order:asc");
}

/**
 * All Cloud Service cards.
 * Sorted by `position` field so left-top → right-bot ordering is preserved.
 */
export function getCloudServices() {
    return fetchAPI("/api/cloud-services?sort=createdAt:asc");
}

// ──────────────────────────────────────────────────────────
//  DEDICATED SERVER PAGE (Single Type — full page data)
// ──────────────────────────────────────────────────────────

/**
 * Fetches the entire Dedicated Server page content in a single API call.
 * Uses explicit deep populate for all nested components.
 */
export function getDedicatedServerPage() {
    return fetchAPI(
        "/api/dedicated-server-page" +
        "?populate[seo]=*" +
        "&populate[hero][populate][ctaPrimary]=*" +
        "&populate[hero][populate][ctaSecondary]=*" +
        "&populate[hero][populate][serverRack]=*" +
        "&populate[featureHighlights]=*" +
        "&populate[pricingPlans][populate]=features" +
        "&populate[pillars]=*" +
        "&populate[ctaBand1][populate][ctaPrimary]=*" +
        "&populate[ctaBand1][populate][ctaSecondary]=*" +
        "&populate[shieldVisual]=*" +
        "&populate[securityCards]=*" +
        "&populate[serviceButtons]=*" +
        "&populate[comparisonRows]=*" +
        "&populate[performanceChecklist]=*" +
        "&populate[performanceCtaPrimary]=*" +
        "&populate[performanceCtaSecondary]=*" +
        "&populate[performanceStats]=*" +
        "&populate[locationPins]=*" +
        "&populate[locationTags]=*" +
        "&populate[whenCards]=*" +
        "&populate[useCaseCards]=*" +
        "&populate[testimonials]=*" +
        "&populate[faqs]=*" +
        "&populate[ctaBand2][populate][ctaPrimary]=*" +
        "&populate[ctaBand2][populate][ctaSecondary]=*" +
        "&populate[footer][populate][address]=*" +
        "&populate[footer][populate][socialLinks]=*" +
        "&populate[footer][populate][linkGroups][populate]=links"
    );
}

// ──────────────────────────────────────────────────────────
//  ZIMBRA HOSTING PAGE (Single Type — full page data)
// ──────────────────────────────────────────────────────────

/**
 * Fetches the entire Zimbra Hosting page content in a single API call.
 * Uses explicit deep populate for all nested components.
 */
export function getZimbraHostingPage() {
    return fetchAPI(
        "/api/zimbra-hosting-page" +
        "?populate[seo]=*" +
        "&populate[heroCtaPrimary]=*" +
        "&populate[heroCtaSecondary]=*" +
        "&populate[pillars]=*" +
        "&populate[featureBadges]=*" +
        "&populate[whyCards]=*" +
        "&populate[ctaBand1][populate][ctaPrimary]=*" +
        "&populate[ctaBand1][populate][ctaSecondary]=*" +
        "&populate[migrationSteps]=*" +
        "&populate[comparisonRows]=*" +
        "&populate[faqs]=*" +
        "&populate[ctaBand2][populate][ctaPrimary]=*" +
        "&populate[ctaBand2][populate][ctaSecondary]=*" +
        "&populate[footer][populate][address]=*" +
        "&populate[footer][populate][socialLinks]=*" +
        "&populate[footer][populate][linkGroups][populate]=links"
    );
}

// ──────────────────────────────────────────────────────────
//  VPS HOSTING PAGE (Single Type — full page data)
// ──────────────────────────────────────────────────────────

/**
 * Fetches the entire VPS Hosting page content in a single API call.
 * Uses explicit deep populate for all nested components.
 */
export function getVpsHostingPage() {
    return fetchAPI(
        "/api/vps-hosting-page" +
        "?populate[seo]=*" +
        "&populate[heroCtaPrimary]=*" +
        "&populate[heroCtaSecondary]=*" +
        "&populate[pillars]=*" +
        "&populate[infraCards]=*" +
        "&populate[pricingPlans][populate]=features" +
        "&populate[vpsTypes]=*" +
        "&populate[speedStats]=*" +
        "&populate[speedFeatures]=*" +
        "&populate[mgmtCards]=*" +
        "&populate[ctaBand1][populate][ctaPrimary]=*" +
        "&populate[ctaBand1][populate][ctaSecondary]=*" +
        "&populate[diffCards]=*" +
        "&populate[globalCtaPrimary]=*" +
        "&populate[globalCtaSecondary]=*" +
        "&populate[locations]=*" +
        "&populate[useCases]=*" +
        "&populate[controlPanels]=*" +
        "&populate[ctaBand2][populate][ctaPrimary]=*" +
        "&populate[ctaBand2][populate][ctaSecondary]=*"
    );
}

// ──────────────────────────────────────────────────────────
//  CLOUD HOSTING PAGE (Single Type — full page data)
// ──────────────────────────────────────────────────────────

/**
 * Fetches the entire Cloud Hosting page content in a single API call.
 * Uses explicit deep populate for all nested components.
 */
export function getCloudHostingPage() {
    return fetchAPI(
        "/api/cloud-hosting-page" +
        "?populate[seo]=*" +
        "&populate[heroCtaPrimary]=*" +
        "&populate[heroCtaSecondary]=*" +
        "&populate[pillars]=*" +
        "&populate[pricingPlans][populate]=features" +
        "&populate[powerFeatures]=*" +
        "&populate[ctaBand1][populate][ctaPrimary]=*" +
        "&populate[ctaBand1][populate][ctaSecondary]=*" +
        "&populate[frameworks]=*" +
        "&populate[choiceCards]=*" +
        "&populate[portalSteps]=*" +
        "&populate[whyReasons]=*" +
        "&populate[useCases]=*" +
        "&populate[workloadFeatures]=*" +
        "&populate[workloadStats]=*" +
        "&populate[dashboardFeatures]=*" +
        "&populate[ctaBand2][populate][ctaPrimary]=*" +
        "&populate[ctaBand2][populate][ctaSecondary]=*" +
        "&populate[ctaBand3][populate][ctaPrimary]=*" +
        "&populate[ctaBand3][populate][ctaSecondary]=*"
    );
}

// ──────────────────────────────────────────────────────────
//  SHARED HOSTING PAGE (Single Type — full page data)
// ──────────────────────────────────────────────────────────

/**
 * Fetches the entire Shared Hosting page content in a single API call.
 * Uses explicit deep populate for all nested components.
 */
export function getSharedHostingPage() {
    return fetchAPI(
        "/api/shared-hosting-page" +
        "?populate[seo]=*" +
        "&populate[heroCtaPrimary]=*" +
        "&populate[heroCtaSecondary]=*" +
        "&populate[pillars]=*" +
        "&populate[aboutItems]=*" +
        "&populate[features]=*" +
        "&populate[whyReasons]=*" +
        "&populate[techCards]=*" +
        "&populate[ctaBand1][populate][ctaPrimary]=*" +
        "&populate[ctaBand1][populate][ctaSecondary]=*" +
        "&populate[ctaBand2][populate][ctaPrimary]=*" +
        "&populate[ctaBand2][populate][ctaSecondary]=*"
    );
}

// ──────────────────────────────────────────────────────────
//  EMAIL HOSTING PAGE (Single Type — full page data)
// ──────────────────────────────────────────────────────────

/**
 * Fetches the entire Email Hosting page content in a single API call.
 * Uses explicit deep populate for all nested components.
 */
export function getEmailHostingPage() {
    return fetchAPI(
        "/api/email-hosting-page" +
        "?populate[seo]=*" +
        "&populate[heroCtaPrimary]=*" +
        "&populate[heroCtaSecondary]=*" +
        "&populate[pillars]=*" +
        "&populate[features]=*" +
        "&populate[solutions]=*" +
        "&populate[useCases]=*" +
        "&populate[ctaBand1][populate][ctaPrimary]=*" +
        "&populate[ctaBand1][populate][ctaSecondary]=*" +
        "&populate[ctaBand2][populate][ctaPrimary]=*" +
        "&populate[ctaBand2][populate][ctaSecondary]=*"
    );
}

// ──────────────────────────────────────────────────────────
//  DOMAIN REGISTRATION PAGE (Single Type — full page data)
// ──────────────────────────────────────────────────────────

/**
 * Fetches the entire Domain Registration page content in a single API call.
 * Uses explicit deep populate for all nested components.
 */
export function getDomainRegistrationPage() {
    return fetchAPI(
        "/api/domain-registration-page" +
        "?populate[seo]=*" +
        "&populate[heroCtaPrimary]=*" +
        "&populate[heroCtaSecondary]=*" +
        "&populate[pillars]=*" +
        "&populate[tldCards]=*" +
        "&populate[features]=*" +
        "&populate[ctaBand1][populate][ctaPrimary]=*" +
        "&populate[ctaBand1][populate][ctaSecondary]=*" +
        "&populate[whyCards]=*" +
        "&populate[tips]=*" +
        "&populate[ctaBand2][populate][ctaPrimary]=*" +
        "&populate[ctaBand2][populate][ctaSecondary]=*"
    );
}

// ──────────────────────────────────────────────────────────
//  ACRONIS BACKUP PAGE (Single Type — full page data)
// ──────────────────────────────────────────────────────────

/**
 * Fetches the entire Acronis Backup page content in a single API call.
 * Uses explicit deep populate for all nested components.
 */
export function getAcronisBackupPage() {
    return fetchAPI(
        "/api/acronis-backup-page" +
        "?populate[seo]=*" +
        "&populate[heroCtaPrimary]=*" +
        "&populate[heroCtaSecondary]=*" +
        "&populate[heroStats]=*" +
        "&populate[pillars]=*" +
        "&populate[pricingCtaPrimary]=*" +
        "&populate[pricingCtaSecondary]=*" +
        "&populate[features]=*" +
        "&populate[ctaBand1][populate][ctaPrimary]=*" +
        "&populate[ctaBand1][populate][ctaSecondary]=*" +
        "&populate[whyCards]=*" +
        "&populate[ctaBand2][populate][ctaPrimary]=*" +
        "&populate[ctaBand2][populate][ctaSecondary]=*"
    );
}

// ──────────────────────────────────────────────────────────
//  AWS CLOUD HOSTING PAGE (Single Type — full page data)
// ──────────────────────────────────────────────────────────

/**
 * Fetches the entire AWS Cloud Hosting page content in a single API call.
 * Uses explicit deep populate for all nested components.
 */
export function getAwsCloudHostingPage() {
    return fetchAPI(
        "/api/aws-cloud-hosting-page" +
        "?populate[seo]=*" +
        "&populate[heroCtaPrimary]=*" +
        "&populate[heroCtaSecondary]=*" +
        "&populate[pillars]=*" +
        "&populate[aboutItems]=*" +
        "&populate[strengths]=*" +
        "&populate[services]=*" +
        "&populate[ctaBand1][populate][ctaPrimary]=*" +
        "&populate[ctaBand1][populate][ctaSecondary]=*" +
        "&populate[comparisonRows]=*" +
        "&populate[ctaBand2][populate][ctaPrimary]=*" +
        "&populate[ctaBand2][populate][ctaSecondary]=*"
    );
}

// ──────────────────────────────────────────────────────────
//  AZURE CLOUD HOSTING PAGE (Single Type — full page data)
// ──────────────────────────────────────────────────────────

/**
 * Fetches the entire Azure Cloud Hosting page content in a single API call.
 * Uses explicit deep populate for all nested components.
 */
export function getAzureCloudHostingPage() {
    return fetchAPI(
        "/api/azure-cloud-hosting-page" +
        "?populate[seo]=*" +
        "&populate[pillars]=*" +
        "&populate[advantages]=*" +
        "&populate[comparisonRows]=*" +
        "&populate[whyCards]=*" +
        "&populate[processSteps]=*" +
        "&populate[techBadges]=*" +
        "&populate[securityFeatures]=*" +
        "&populate[pricingCtaPrimary]=*" +
        "&populate[ctaBand1][populate][ctaPrimary]=*" +
        "&populate[ctaBand1][populate][ctaSecondary]=*"
    );
}

// ──────────────────────────────────────────────────────────
//  WINDOWS CLOUD HOSTING PAGE (Single Type — full page data)
// ──────────────────────────────────────────────────────────

/**
 * Fetches the entire Windows Cloud Hosting page content in a single API call.
 * Uses explicit deep populate for all nested components.
 */
export function getWindowsCloudHostingPage() {
    return fetchAPI(
        "/api/windows-cloud-hosting-page" +
        "?populate[seo]=*" +
        "&populate[heroCtaPrimary]=*" +
        "&populate[heroCtaSecondary]=*" +
        "&populate[pillars]=*" +
        "&populate[features]=*" +
        "&populate[whyCards]=*" +
        "&populate[useCaseItems]=*" +
        "&populate[appCards]=*" +
        "&populate[ctaBand1][populate][ctaPrimary]=*" +
        "&populate[ctaBand1][populate][ctaSecondary]=*" +
        "&populate[ctaBand2][populate][ctaPrimary]=*" +
        "&populate[ctaBand2][populate][ctaSecondary]=*"
    );
}

// ──────────────────────────────────────────────────────────
//  WINDOWS DEDICATED SERVER PAGE (Single Type — full page data)
// ──────────────────────────────────────────────────────────

/**
 * Fetches the entire Windows Dedicated Server page content in a single API call.
 * Uses explicit deep populate for all nested components.
 */
export function getWindowsDedicatedServerPage() {
    return fetchAPI(
        "/api/windows-dedicated-server-page" +
        "?populate[seo]=*" +
        "&populate[heroCtaPrimary]=*" +
        "&populate[heroCtaSecondary]=*" +
        "&populate[pillars]=*" +
        "&populate[pricingCtaPrimary]=*" +
        "&populate[pricingCtaSecondary]=*" +
        "&populate[aboutItems]=*" +
        "&populate[features]=*" +
        "&populate[comparisonRows]=*" +
        "&populate[ctaBand1][populate][ctaPrimary]=*" +
        "&populate[ctaBand1][populate][ctaSecondary]=*" +
        "&populate[whyCards]=*" +
        "&populate[readyCards]=*" +
        "&populate[useCases]=*" +
        "&populate[ctaBand2][populate][ctaPrimary]=*" +
        "&populate[ctaBand2][populate][ctaSecondary]=*"
    );
}

// ──────────────────────────────────────────────────────────
//  WINDOWS VPS HOSTING PAGE (Single Type — full page data)
// ──────────────────────────────────────────────────────────

/**
 * Fetches the entire Windows VPS Hosting page content in a single API call.
 * Uses explicit deep populate for all nested components.
 */
export function getWindowsVpsHostingPage() {
    return fetchAPI(
        "/api/windows-vps-hosting-page" +
        "?populate[seo]=*" +
        "&populate[heroCtaPrimary]=*" +
        "&populate[heroCtaSecondary]=*" +
        "&populate[pillars]=*" +
        "&populate[features]=*" +
        "&populate[securityCards]=*" +
        "&populate[useCases]=*" +
        "&populate[ctaBand1][populate][ctaPrimary]=*" +
        "&populate[ctaBand1][populate][ctaSecondary]=*" +
        "&populate[ctaBand2][populate][ctaPrimary]=*" +
        "&populate[ctaBand2][populate][ctaSecondary]=*"
    );
}

// ──────────────────────────────────────────────────────────
//  LINUX DEDICATED SERVER PAGE (Single Type — full page data)
// ──────────────────────────────────────────────────────────

/**
 * Fetches the entire Linux Dedicated Server page content in a single API call.
 * Uses explicit deep populate for all nested components.
 */
export function getLinuxDedicatedServerPage() {
    return fetchAPI(
        "/api/linux-dedicated-server-page" +
        "?populate[seo]=*" +
        "&populate[heroCtaPrimary]=*" +
        "&populate[heroCtaSecondary]=*" +
        "&populate[pillars]=*" +
        "&populate[pricingPlans][populate]=features" +
        "&populate[whyCards]=*" +
        "&populate[comparisonRows]=*" +
        "&populate[specsItems]=*" +
        "&populate[supportCards]=*" +
        "&populate[innovationCards]=*" +
        "&populate[useCases]=*" +
        "&populate[ctaBand1][populate][ctaPrimary]=*" +
        "&populate[ctaBand1][populate][ctaSecondary]=*"
    );
}


// ──────────────────────────────────────────────────────────
//  AGGREGATE FETCH
//  Fetches all page data in parallel — call once on page load.
// ──────────────────────────────────────────────────────────

/**
 * fetchAllPageData()
 * Fires all Strapi requests simultaneously.
 * Returns a named object for easy destructuring.
 *
 * @example
 *   const { heroData, testimonialData, faqData, ... } = await fetchAllPageData();
 */
export async function fetchAllPageData() {
    const [
        heroData,
        logoData,
        menuData,
        whyUsData,
        globalData,
        testimonialData,
        faqData,
        cloudServicesData,
    ] = await Promise.all([
        getHeroSection(),
        getMainLogo(),
        getNavigation(),
        getWhyUs(),
        getGlobal(),
        getTestimonials(),
        getFaqItems(),
        getCloudServices(),
    ]);

    return {
        heroData,
        logoData,
        menuData,
        whyUsData,
        globalData,
        testimonialData,
        faqData,
        cloudServicesData,
    };
}
