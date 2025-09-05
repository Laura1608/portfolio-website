document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.contact-form');
    const submitButton = form.querySelector('button[type="submit"]');
    let currentMessage = null;

    function showMessage(message, isError = false) {
        // Remove any existing message
        if (currentMessage) {
            currentMessage.remove();
        }

        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message ${isError ? 'error' : 'success'}`;
        messageDiv.textContent = message;
        
        // Insert message at the end of the form
        form.appendChild(messageDiv);
        currentMessage = messageDiv;
    }

    // Handle form submission
    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        const formData = {
            name: form.querySelector('input[name="name"]').value,
            email: form.querySelector('input[name="email"]').value,
            message: form.querySelector('textarea[name="message"]').value
        };

        if (!formData.name || !formData.email || !formData.message) {
            showMessage('Please fill in all fields', true);
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            showMessage('Please enter a valid email address', true);
            return;
        }

        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (result.success) {
                form.reset();
                showMessage('Thank you for your message! I\'ll get back to you soon.');
            } else {
                throw new Error(result.error || 'Failed to send message');
            }
        } catch (error) {
            showMessage(`Something went wrong. Please email me directly at lauraottosolutions@gmail.com (${error.message})`, true);
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = 'Send Message';
        }
    });
});