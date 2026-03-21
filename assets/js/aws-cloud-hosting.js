import { populateSEO, populateHero, populateIconCards, populateSectionHeader, populateCtaBand, populateWhenCards, populateComparisonTable, hidePageLoader, markActiveNavLink, setText, setHTML } from './utils/cms-helpers.js';
import { getAwsCloudHostingPage } from './services/contentService.js';

(async function () {
    'use strict';
    markActiveNavLink();
    try {
        var res = await getAwsCloudHostingPage();
        var page = res.data;

        populateSEO(page.seo);

        populateHero(document.querySelector('.hero-section'), {
            eyebrow: page.heroEyebrow,
            title: page.heroTitle,
            subtitle: page.heroSubtitle,
            description: page.heroDescription,
            ctaPrimary: page.heroCtaPrimary,
            ctaSecondary: page.heroCtaSecondary
        });

        populateIconCards('.why-grid', page.pillars, 'why-card');

        // About / Who We Are
        populateSectionHeader('#who-we-are', page.aboutLabel, page.aboutTitle, null);
        if (page.aboutDescription) {
            setHTML(document.getElementById('who-we-are'), '.who-we-are-paragraph', page.aboutDescription);
        }
        if (page.aboutImage) {
            var img = document.querySelector('#who-we-are .who-we-are-image img');
            if (img) img.src = page.aboutImage;
        }
        populateWhenCards('#who-we-are .cloud-numbered-grid', page.aboutItems);

        populateSectionHeader('#strengths', page.strengthsLabel, page.strengthsTitle, page.strengthsSubtitle);
        populateIconCards('.cloud-power-grid', page.strengths, 'cloud-power-card');

        populateSectionHeader('#services', page.servicesLabel, page.servicesTitle, page.servicesSubtitle);
        populateIconCards('.cloud-use-grid', page.services, 'cloud-use-card');

        populateCtaBand('.cloud-cta-band:not(.cloud-cta-dark)', page.ctaBand1);

        populateSectionHeader('#comparison', page.comparisonLabel, page.comparisonTitle, page.comparisonSubtitle);
        populateComparisonTable('.aws-compare', page.comparisonColumns, page.comparisonRows);

        populateCtaBand('.cloud-cta-dark', page.ctaBand2);
    } catch (err) {
        console.error('[aws-cloud-hosting] CMS load failed:', err);
    } finally {
        hidePageLoader();
    }
})();
