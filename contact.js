function showToast(message, isError = false) {
    console.log('Showing toast:', message);
    const toast = document.createElement('div');
    toast.className = 'toast' + (isError ? ' toast-error' : '');
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('Contact form initialized');
    const form = document.querySelector('.contact-form');
    const submitButton = form.querySelector('button[type="submit"]');

    if (!window.Email) {
        console.error('SMTP.js not loaded properly');
        return;
    }

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        console.log('Form submission started');
        
        submitButton.disabled = true;
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        
        // Get form data
        const formData = {
            name: form.querySelector('input[name="name"]').value,
            email: form.querySelector('input[name="email"]').value,
            message: form.querySelector('textarea[name="message"]').value
        };

        console.log('Form data collected:', { ...formData, message: 'truncated' });

        if (!formData.name || !formData.email || !formData.message) {
            console.log('Validation failed: Missing fields');
            showToast('Please fill in all fields', true);
            submitButton.disabled = false;
            submitButton.textContent = originalText;
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            console.log('Validation failed: Invalid email format');
            showToast('Please enter a valid email address', true);
            submitButton.disabled = false;
            submitButton.textContent = originalText;
            return;
        }

        try {
            console.log('Attempting to send email...');
            const emailConfig = {
                SecureToken: "2c83e749-1f28-4d11-a7c1-e0b2d8f7c4a9", // Using secure token instead of credentials
                To: 'lauraottosolutions@gmail.com',
                From: "lauraottosolutions@gmail.com",
                Subject: `Portfolio Contact: ${formData.name}`,
                Body: `
                    <h3>New Contact Form Submission</h3>
                    <p><strong>Name:</strong> ${formData.name}</p>
                    <p><strong>Email:</strong> ${formData.email}</p>
                    <p><strong>Message:</strong><br>${formData.message}</p>
                `
            };
            console.log('Email configuration:', { ...emailConfig, SecureToken: '[hidden]' });

            const response = await Email.send(emailConfig);
            console.log('Email response:', response);

            if (response === 'OK') {
                console.log('Email sent successfully');
                showToast('Thank you! Your message has been sent.');
                form.reset();
            } else {
                throw new Error('Unexpected response: ' + response);
            }
        } catch (err) {
            console.error('Detailed error:', {
                message: err.message,
                stack: err.stack,
                name: err.name
            });
            showToast('Something went wrong. Please email me directly at lauraottosolutions@gmail.com', true);
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = originalText;
        }
    });
});