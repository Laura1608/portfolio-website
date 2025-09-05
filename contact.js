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
        
        // Insert message right after the submit button
        submitButton.parentNode.insertBefore(messageDiv, submitButton.nextSibling);
        currentMessage = messageDiv;
    }

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        submitButton.disabled = true;
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        
        // Get form data
        const formData = {
            name: form.querySelector('input[name="name"]').value,
            email: form.querySelector('input[name="email"]').value,
            message: form.querySelector('textarea[name="message"]').value
        };

        // Basic validation
        if (!formData.name || !formData.email || !formData.message) {
            showMessage('Please fill in all fields');
            submitButton.disabled = false;
            submitButton.textContent = originalText;
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            showMessage('Please enter a valid email address');
            submitButton.disabled = false;
            submitButton.textContent = originalText;
            return;
        }

        try {
            const response = await Email.send({
                Host: "s1.maildns.net",
                Port: 465,
                Username: "oxqmgbnb",
                Password: "v40zxQ8*CF2D;j",
                To: "lauraottosolutions@gmail.com",
                From: "oxqmgbnb@s1.maildns.net",
                ReplyTo: formData.email,
                Subject: `Contact message Portfolio Website`,
                Body: `
                    <h3>Contact Form Message</h3>
                    <p><strong>From:</strong> ${formData.name} (${formData.email})</p>
                    <p><strong>Message:</strong><br>${formData.message}</p>
                `
            });

            if (response === 'OK') {
                form.reset();
                showMessage('Message sent successfully');
            } else {
                throw new Error(response);
            }
        } catch (err) {
            showMessage('Something went wrong. Please email me directly at lauraottosolutions@gmail.com');
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = originalText;
        }
    });
});