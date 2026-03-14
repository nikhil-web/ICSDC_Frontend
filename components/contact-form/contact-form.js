// ══════════════════════════════════════════════════════════
//  contact-form.js — Contact form initialization
//  Handles validation, submission to Strapi, success state.
// ══════════════════════════════════════════════════════════

/**
 * initContactForm()
 * Attaches submit handler to #contact-form.
 * Posts to Strapi contact-submissions endpoint.
 */
export function initContactForm() {
    const form = document.getElementById('contact-form');
    const success = document.getElementById('contact-success');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = form.querySelector('.contact-submit');
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending\u2026';
        }

        const formData = new FormData(form);
        const payload = {
            name: formData.get('name'),
            email: formData.get('email'),
            website: formData.get('website'),
            message: formData.get('message'),
        };

        try {
            // Import postAPI dynamically to avoid hard dependency
            const { postAPI } = await import('../../assets/js/services/strapiClient.js');
            await postAPI('/api/contact-submissions', payload);
        } catch (err) {
            console.warn('[contact-form] Submission error (form still shows success):', err);
        }

        // Show success state regardless (matches original behavior)
        if (success) success.classList.add('contact-success-visible');
        form.style.display = 'none';

        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Submit';
        }
    });
}
