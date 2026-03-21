(function (globalScope) {
    'use strict';

    function resolveStrapiBaseUrl() {
        const winUrl = globalScope?.STRAPI_URL;
        if (typeof winUrl === 'string' && winUrl.trim()) return winUrl.trim();

        const envUrl =
            typeof process !== 'undefined' && process?.env && typeof process.env.STRAPI_URL === 'string'
                ? process.env.STRAPI_URL
                : '';
        if (envUrl && envUrl.trim()) return envUrl.trim();

        return 'http://localhost:1337';
    }

    globalScope.resolveStrapiBaseUrl = resolveStrapiBaseUrl;
})(typeof window !== 'undefined' ? window : globalThis);
