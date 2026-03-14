<!-- CONTACT SECTION -->
<section class="contact-section" aria-labelledby="contact-heading">
    <div class="contact-container">

        <!-- Left: info -->
        <div class="contact-left">
            <h2 id="contact-heading" class="contact-title">Get In Touch...</h2>
            <p class="contact-subtitle">
                Get the best price &amp; premium cloud services. Share your details and requirements,
                and our team will get in touch with you shortly.
            </p>

            <div class="contact-cards">
                <div class="contact-info-card">
                    <h3 class="contact-card-title">Email Address</h3>
                    <hr class="contact-card-divider">
                    <p class="contact-card-detail">help@info.com</p>
                    <p class="contact-card-meta">
                        Assistance hours:<br>
                        Monday &ndash; Friday 6 am to 8 pm EST
                    </p>
                </div>
                <div class="contact-info-card">
                    <h3 class="contact-card-title">Phone Number</h3>
                    <hr class="contact-card-divider">
                    <p class="contact-card-detail">+91 98109 58857</p>
                    <p class="contact-card-meta">
                        Assistance hours:<br>
                        Monday &ndash; Friday 6 am to 8 pm EST
                    </p>
                </div>
            </div>
        </div>

        <!-- Right: form -->
        <div class="contact-form-col">

            <!-- Success message (hidden until form submitted) -->
            <div class="contact-success" id="contact-success" role="alert">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
                    <circle cx="24" cy="24" r="24" fill="#1a56db" />
                    <path d="M14 24L21 31L34 18" stroke="white" stroke-width="2.5" stroke-linecap="round"
                        stroke-linejoin="round" />
                </svg>
                <h3>Message Sent!</h3>
                <p>Thank you for reaching out. Our team will contact you within 24 hours.</p>
            </div>

            <form id="contact-form" class="contact-form" novalidate>

                <div class="contact-field">
                    <input type="text" id="contact-name" name="name" placeholder=" " required class="contact-input"
                        aria-required="true">
                    <label for="contact-name" class="contact-label">
                        Name <span class="contact-required" aria-hidden="true">*</span>
                    </label>
                </div>

                <div class="contact-field">
                    <input type="email" id="contact-email" name="email" placeholder=" " required
                        class="contact-input" aria-required="true">
                    <label for="contact-email" class="contact-label">
                        Email <span class="contact-required" aria-hidden="true">*</span>
                    </label>
                </div>

                <div class="contact-field">
                    <input type="url" id="contact-website" name="website" placeholder=" " class="contact-input">
                    <label for="contact-website" class="contact-label">
                        Website <span class="contact-required" aria-hidden="true">*</span>
                    </label>
                </div>

                <div class="contact-field">
                    <textarea id="contact-message" name="message" placeholder=" " rows="5"
                        class="contact-input contact-textarea"></textarea>
                    <label for="contact-message" class="contact-label">Message</label>
                </div>

                <button type="submit" class="contact-submit">Submit</button>

            </form>
        </div>

    </div>
</section>
