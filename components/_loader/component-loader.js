// ══════════════════════════════════════════════════════════
//  component-loader.js — Central Component Orchestrator
//  Fetches static HTML partials and injects them into the DOM
//  before any page-specific JS runs.
// ══════════════════════════════════════════════════════════

// Using .tpl extension to prevent dev servers (live-server) from
// injecting reload scripts into HTML partials.
const STATIC_COMPONENTS = {
    'page-loader': 'components/page-loader/page-loader.tpl',
    'dropdown': 'components/dropdown/dropdown.tpl',
    'navbar': 'components/navbar/navbar.tpl',
    'footer': 'components/footer/footer.tpl',
    'contact-form': 'components/contact-form/contact-form.tpl',
};

/**
 * loadStaticComponents()
 * Finds all [data-component] placeholders in the DOM,
 * fetches their HTML partials, and replaces the placeholders.
 * Dispatches 'components-ready' event when done.
 */
export async function loadStaticComponents() {
    const targets = document.querySelectorAll('[data-component]');
    const fetches = [...targets].map(async (el) => {
        const name = el.dataset.component;
        const url = STATIC_COMPONENTS[name];
        if (!url) {
            console.warn(`[component-loader] Unknown component: "${name}"`);
            return;
        }
        try {
            const res = await fetch(url);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const html = await res.text();
            const template = document.createElement('template');
            template.innerHTML = html.trim();
            el.replaceWith(template.content);
        } catch (err) {
            console.error(`[component-loader] Failed to load "${name}":`, err);
        }
    });

    await Promise.all(fetches);
    document.dispatchEvent(new Event('components-ready'));
}
