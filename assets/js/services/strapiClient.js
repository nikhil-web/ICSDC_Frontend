// ══════════════════════════════════════════════════════════
//  strapiClient.js
//  Central API client for Strapi v5
//  Usage: import { fetchAPI, uploadURL } from './strapiClient.js'
// ══════════════════════════════════════════════════════════

// ── Config ───────────────────────────────────────────────
// In production: replace with environment variable injection
// e.g.  const BASE_URL = process.env.STRAPI_URL
const BASE_URL = (typeof STRAPI_URL !== "undefined" ? STRAPI_URL : "http://localhost:1337");
const API_TOKEN = (typeof TOKEN !== "undefined" ? TOKEN : "");
const REQUEST_TIMEOUT_MS = 8000;

const DEFAULT_HEADERS = {
    "Content-Type": "application/json",
    ...(API_TOKEN ? { Authorization: `Bearer ${API_TOKEN}` } : {}),
};

// ── Core fetch helper ─────────────────────────────────────
/**
 * fetchAPI(path)
 * @param {string} path  — e.g. "/api/testimonials?populate=avatar"
 * @returns {Promise<object>}  parsed Strapi JSON response
 * @throws  on non-2xx HTTP status
 */
export async function fetchAPI(path) {
    const url = `${BASE_URL}${path}`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    let response;
    try {
        response = await fetch(url, {
            headers: DEFAULT_HEADERS,
            signal: controller.signal,
        });
    } catch (networkErr) {
        const reason = networkErr?.name === "AbortError"
            ? `Request timed out after ${REQUEST_TIMEOUT_MS}ms`
            : networkErr.message;
        throw new Error(`[strapiClient] Network error fetching "${path}": ${reason}`);
    } finally {
        clearTimeout(timeoutId);
    }

    if (!response.ok) {
        throw new Error(
            `[strapiClient] HTTP ${response.status} on "${path}" — ${response.statusText}`
        );
    }

    let json;
    try {
        json = await response.json();
    } catch (parseErr) {
        throw new Error(`[strapiClient] Failed to parse JSON from "${path}": ${parseErr.message}`);
    }

    return json;
}

// ── Media URL helper ──────────────────────────────────────
/**
 * uploadURL(mediaObj, format?)
 * Converts a Strapi media object to an absolute URL.
 *
 * @param {object|null}  mediaObj  — the Strapi media response object
 * @param {string}       format    — preferred format key: "thumbnail"|"small"|"medium"|"large"
 * @returns {string}  absolute URL, or "" if media is null/undefined
 *
 * @example
 *   const src = uploadURL(data.avatar, "medium");
 *   img.src = src || "./assets/images/placeholder.png";
 */
export function uploadURL(mediaObj, format = "medium") {
    if (!mediaObj) return "";
    const url =
        mediaObj?.formats?.[format]?.url
        ?? mediaObj?.formats?.small?.url
        ?? mediaObj?.url
        ?? "";
    return url.startsWith("http") ? url : `${BASE_URL}${url}`;
}

// ── POST helper (contact form → Strapi) ───────────────────
/**
 * postAPI(path, payload)
 * @param {string} path     — e.g. "/api/contact-submissions"
 * @param {object} payload  — data to POST
 * @returns {Promise<object>}
 */
export async function postAPI(path, payload) {
    const url = `${BASE_URL}${path}`;
    const response = await fetch(url, {
        method: "POST",
        headers: DEFAULT_HEADERS,
        body: JSON.stringify({ data: payload }),
    });
    if (!response.ok) {
        throw new Error(`[strapiClient] POST failed on "${path}" — HTTP ${response.status}`);
    }
    return response.json();
}
