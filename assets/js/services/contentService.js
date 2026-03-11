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
    const requests = [
        getHeroSection(),
        getMainLogo(),
        getNavigation(),
        getWhyUs(),
        getWhoWeAre(),
        // getLessComplexity(),
        getGlobal(),
        getTestimonials(),
        getFaqItems(),
        getCloudServices(),
    ];

    const settled = await Promise.allSettled(requests);
    settled.forEach((result, index) => {
        if (result.status === "rejected") {
            console.warn(`[contentService] Request ${index} failed:`, result.reason?.message ?? result.reason);
        }
    });
    const pick = index => (settled[index]?.status === "fulfilled" ? settled[index].value : null);

    return {
        heroData: pick(0),
        logoData: pick(1),
        menuData: pick(2),
        whyUsData: pick(3),
        // whoWeAreData: pick(4),
        // lessComplexityData,
        globalData: pick(5),
        testimonialData: pick(6),
        faqData: pick(7),
        cloudServicesData: pick(8),
    };
}
