document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.contact-form');
    const submitButton = form.querySelector('button[type="submit"]');
    let currentMessage = null;

    function showMessage(message) {
        // Remove any existing message
        if (currentMessage) {
            currentMessage.remove();
        }

        const messageDiv = document.createElement('div');
        messageDiv.className = 'form-message';
        messageDiv.textContent = message;
        
        // Insert message at the end of the form
        form.appendChild(messageDiv);
        currentMessage = messageDiv;
    }

    // Simple form submission to formsubmit.co service
    form.setAttribute('action', 'https://formsubmit.co/lauraottosolutions@gmail.com');
    form.setAttribute('method', 'POST');

    // Add hidden fields for formsubmit.co configuration
    const hiddenFields = {
        '_subject': 'Contact message Portfolio Website',
        '_template': 'box',
        '_captcha': 'false',
        '_autoresponse': 'Thank you for your message! I\'ll get back to you soon.',
        '_next': window.location.href + '?message=success'
    };

    Object.entries(hiddenFields).forEach(([key, value]) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = value;
        form.appendChild(input);
    });

    // Check for success message in URL
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('message') === 'success') {
        showMessage('Thank you for your message! I\'ll get back to you soon.');
        // Remove the success parameter from URL
        window.history.replaceState({}, '', window.location.pathname);
    }

    // Handle form submission
    form.addEventListener('submit', function(e) {
        const formData = {
            name: form.querySelector('input[name="name"]').value,
            email: form.querySelector('input[name="email"]').value,
            message: form.querySelector('textarea[name="message"]').value
        };

        if (!formData.name || !formData.email || !formData.message) {
            e.preventDefault();
            showMessage('Please fill in all fields');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            e.preventDefault();
            showMessage('Please enter a valid email address');
            return;
        }

        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
    });
});