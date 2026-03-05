document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    const submitButton = form.querySelector('button[type="submit"]');
    let currentMessage = null;

    function showMessage(message, isError = false) {
        if (currentMessage) currentMessage.remove();
        const div = document.createElement('div');
        div.className = `form-message ${isError ? 'error' : 'success'}`;
        div.textContent = message;
        form.appendChild(div);
        currentMessage = div;
    }

    // Handle form submission
    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        const formData = {
            name: form.querySelector('input[name="name"]').value.trim(),
            email: form.querySelector('input[name="email"]').value.trim(),
            message: form.querySelector('textarea[name="message"]').value.trim(),
            consent_timestamp: new Date().toISOString()
        };

        if (!formData.name || !formData.email || !formData.message) {
            showMessage('Please fill in all fields', true);
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            showMessage('Please enter a valid email address.', true);
            return;
        }

        submitButton.disabled = true;
        submitButton.textContent = 'Sending…';

        const controller = new AbortController();
        const timeoutId = setTimeout(() => {
            controller.abort();
            showMessage('This is taking longer than expected. Please try again.', true);
        }, 10000);

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
                signal: controller.signal,
            });
            clearTimeout(timeoutId);
            const result = await response.json();

            if (result.success) {
                form.reset();
                showMessage('Thank you for your message! I\'ll get back to you soon.');
            } else {
                throw new Error(result.error || 'Failed to send message');
            }
        } catch (error) {
            clearTimeout(timeoutId);
            if (error.name === 'AbortError') return;
            showMessage('Something went wrong. Please contact me directly at lauraottosolutions@gmail.com', true);
        } finally {
            if (!submitButton.disabled) return; // Don't reset if already reset by timeout
            submitButton.disabled = false;
            submitButton.textContent = 'Send Message';
        }
    });
});
