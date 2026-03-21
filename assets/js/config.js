<<<<<<< HEAD
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
=======
(function (global) {
  'use strict';

  function getEnvStrapiUrl() {
    try {
      if (typeof process !== 'undefined' && process && process.env && process.env.STRAPI_URL) {
        return process.env.STRAPI_URL;
      }
    } catch (_) {}
    return '';
  }

  function resolveStrapiUrl() {
    return global.STRAPI_URL || getEnvStrapiUrl() || 'http://localhost:1337';
  }

  global.getStrapiUrl = resolveStrapiUrl;
})(window);
>>>>>>> pre-develop
