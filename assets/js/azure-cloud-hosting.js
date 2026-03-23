import { populateSEO, populateHero, populateIconCards, populateSectionHeader, populateCtaBand, populateWhenCards, populateComparisonTable, populateTechBadges, hidePageLoader, markActiveNavLink, setText, setHTML } from './utils/cms-helpers.js';
import { getAzureCloudHostingPage } from './services/contentService.js';

(async function () {
    'use strict';
    markActiveNavLink();
    try {
        var res = await getAzureCloudHostingPage();
        var page = res.data;

        populateSEO(page.seo);

        // Azure hero has form title/subtitle instead of standard CTAs
        var heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            setText(heroSection, '.hero-title', page.heroTitle);
            setHTML(heroSection, '.hero-desc', page.heroDescription);
            setText(heroSection, '.azure-form-title', page.heroFormTitle);
            setText(heroSection, '.azure-form-subtitle', page.heroFormSubtitle);
        }

        populateIconCards('.why-grid', page.pillars, 'why-card');

        // About
        if (page.aboutTitle) {
            var aboutSection = document.querySelector('.azure-who-section');
            if (aboutSection) {
                setText(aboutSection, '.title', page.aboutTitle);
                setHTML(aboutSection, 'p', page.aboutDescription);
                if (page.aboutImage) {
                    var img = aboutSection.querySelector('img');
                    if (img) img.src = page.aboutImage;
                }
            }
        }

        populateSectionHeader('#advantages', page.advantagesLabel, page.advantagesTitle, page.advantagesSubtitle);
        populateIconCards('.azure-advantages-grid', page.advantages, 'cloud-power-card');

        populateSectionHeader('#comparison', page.comparisonLabel, page.comparisonTitle, page.comparisonSubtitle);
        populateComparisonTable('.azure-compare', page.comparisonColumns, page.comparisonRows);

        populateSectionHeader('#why-different', page.whyLabel, page.whyTitle, page.whySubtitle);
        populateIconCards('.azure-why-grid', page.whyCards, 'cloud-power-card');

        populateSectionHeader('#process', page.processLabel, page.processTitle, page.processSubtitle);
        populateWhenCards('.azure-process-grid', page.processSteps);

        populateSectionHeader('#tech-stack', page.techLabel, page.techTitle, page.techSubtitle);
        populateTechBadges('.azure-stack-grid', page.techBadges);

        populateSectionHeader('#security', page.securityLabel, page.securityTitle, null);
        if (page.securityDescription) {
            setHTML(document.getElementById('security'), 'p.subtitle', page.securityDescription);
        }
        populateIconCards('.azure-security-grid', page.securityFeatures, 'cloud-power-card');

        // Pricing callout
        if (page.pricingTitle) {
            var pricingEl = document.querySelector('.azure-pricing-callout');
            if (pricingEl) {
                setText(pricingEl, '.title, h2', page.pricingTitle);
                setHTML(pricingEl, 'p', page.pricingDescription);
            }
        }

        populateCtaBand('.azure-cta-band, .cloud-cta-band', page.ctaBand1);
    } catch (err) {
        console.error('[azure-cloud-hosting] CMS load failed:', err);
    }
    hidePageLoader();
})();
