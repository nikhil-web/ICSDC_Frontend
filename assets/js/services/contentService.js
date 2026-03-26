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

/**
 * Navigation with nested menus → sections → items
 * Matches the existing nav render engine in main.js exactly.
 */
export function getNavigation() {
    return fetchAPI(
        "/api/navigation?" +
        "&populate[navLogo][populate]=*" +
        "&populate[LoginButton][populate]=*" +
        "&populate[menus][populate][sections][populate]=items&populate[menus][populate]=items"
    );
}

export function getFooter() {
    return fetchAPI(
        "/api/footer?" +
        "populate[commonFooter][populate][socialLinks]=*" +
        "&populate[commonFooter][populate][linkGroups][populate][links]=*" +
        "&populate[commonFooter][populate][logo]=true"
    );
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
        "&populate[ctaBand2][populate][ctaPrimary]=*" +
        "&populate[ctaBand2][populate][ctaSecondary]=*" +
        "&populate[faq][populate]=*" +
        "&populate[testimonials][populate]=*"
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
        "&populate[ctaBand2][populate][ctaPrimary]=*" +
        "&populate[ctaBand2][populate][ctaSecondary]=*" +
        "&populate[faq][populate]=*" +
        "&populate[testimonials][populate]=*"
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
        "&populate[testimonials]=*" +
        "&populate[faqs]=*" +
        "&populate[ctaBand2][populate][ctaPrimary]=*" +
        "&populate[ctaBand2][populate][ctaSecondary]=*" +
        "&populate[faq][populate]=*" +
        "&populate[testimonials][populate]=*"
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
        "&populate[ctaBand3][populate][ctaSecondary]=*" +
        "&populate[faq][populate]=*" +
        "&populate[testimonials][populate]=*"
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
        "&populate[testimonials]=*" +
        "&populate[faqs]=*" +
        "&populate[ctaBand1][populate][ctaPrimary]=*" +
        "&populate[ctaBand1][populate][ctaSecondary]=*" +
        "&populate[ctaBand2][populate][ctaPrimary]=*" +
        "&populate[ctaBand2][populate][ctaSecondary]=*" +
        "&populate[faq][populate]=*" +
        "&populate[testimonials][populate]=*"
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
        "&populate[ctaBand2][populate][ctaSecondary]=*" +
        "&populate[faq][populate]=*" +
        "&populate[testimonials][populate]=*"
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
        "&populate[ctaBand2][populate][ctaSecondary]=*" +
        "&populate[faq][populate]=*" +
        "&populate[testimonials][populate]=*"
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
        "&populate[ctaBand2][populate][ctaSecondary]=*" +
        "&populate[faq][populate]=*" +
        "&populate[testimonials][populate]=*"
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
        "&populate[ctaBand2][populate][ctaSecondary]=*" +
        "&populate[faq][populate]=*" +
        "&populate[testimonials][populate]=*"
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
        "&populate[ctaBand1][populate][ctaSecondary]=*" +
        "&populate[faq][populate]=*" +
        "&populate[testimonials][populate]=*"
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
        "&populate[testimonials]=*" +
        "&populate[faqs]=*" +
        "&populate[ctaBand1][populate][ctaPrimary]=*" +
        "&populate[ctaBand1][populate][ctaSecondary]=*" +
        "&populate[ctaBand2][populate][ctaPrimary]=*" +
        "&populate[ctaBand2][populate][ctaSecondary]=*" +
        "&populate[faq][populate]=*" +
        "&populate[testimonials][populate]=*"
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
        "&populate[testimonials]=*" +
        "&populate[faqs]=*" +
        "&populate[ctaBand2][populate][ctaPrimary]=*" +
        "&populate[ctaBand2][populate][ctaSecondary]=*" +
        "&populate[faq][populate]=*" +
        "&populate[testimonials][populate]=*"
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
        "&populate[testimonials]=*" +
        "&populate[faqs]=*" +
        "&populate[ctaBand1][populate][ctaPrimary]=*" +
        "&populate[ctaBand1][populate][ctaSecondary]=*" +
        "&populate[ctaBand2][populate][ctaPrimary]=*" +
        "&populate[ctaBand2][populate][ctaSecondary]=*" +
        "&populate[faq][populate]=*" +
        "&populate[testimonials][populate]=*"
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
        "&populate[testimonials]=*" +
        "&populate[faqs]=*" +
        "&populate[ctaBand1][populate][ctaPrimary]=*" +
        "&populate[ctaBand1][populate][ctaSecondary]=*" +
        "&populate[faq][populate]=*" +
        "&populate[testimonials][populate]=*"
    );
}

// ──────────────────────────────────────────────────────────
//  HOMEPAGE (Single Type — full page data)
// ──────────────────────────────────────────────────────────

/**
 * Fetches the entire Homepage content in a single API call.
 * Uses explicit deep populate matching the actual home-page schema.
 *
 * Field names match src/api/home-page/content-types/home-page/schema.json
 * Component schemas verified from /src/components/**
 */
export function getHomepagePage() {
    return fetchAPI(
        "/api/home-page" +
        "?populate[SEO]=*" +
        "&populate[CallToActionPrimary]=*" +
        "&populate[callToActionSecondary]=*" +
        "&populate[whyChooseUs]=*" +
        "&populate[whoWeAre][populate][featureCards]=*" +
        "&populate[LessCloudComplexity][populate][image]=true" +
        "&populate[CloudSolutionsEngineered]=*" +
        "&populate[IndustryLeadingExcellenceValidated][populate][image]=true" +
        "&populate[BeyondBestPracticeOurISOStandards][populate][image]=true" +
        "&populate[BestCloudServices][populate][featureCards]=*" +
        "&populate[Footer][populate][socialLinks]=*" +
        "&populate[Footer][populate][linkGroups][populate][links]=*" +
        "&populate[Footer][populate][logo]=true" +
        "&populate[faq][populate]=*" +
        "&populate[testimonials][populate]=*"
    );
}

// ──────────────────────────────────────────────────────────
//  AGGREGATE FETCH
//  Fetches all page data in parallel — call once on page load.
// ──────────────────────────────────────────────────────────