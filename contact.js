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
            const controller = new AbortController();
            const timeoutId = setTimeout(() => {
                controller.abort();
                showMessage('The message is taking longer than expected to send. Please try again.', true);
            }, 10000); // 10 seconds timeout

            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
                signal: controller.signal
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
            console.error('Error details:', {
                name: error.name,
                message: error.message,
                stack: error.stack
            });
            
            if (error.name === 'AbortError') {
                // Timeout was already handled in the abort callback
                return;
            }
            showMessage(`Something went wrong. Please email me directly at lauraottosolutions@gmail.com (${error.message})`, true);
        } finally {
            if (!submitButton.disabled) return; // Don't reset if already reset by timeout
            submitButton.disabled = false;
            submitButton.textContent = 'Send Message';
        }
    });
});