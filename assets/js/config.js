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
