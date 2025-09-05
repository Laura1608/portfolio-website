document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.contact-form');
    const submitButton = form.querySelector('button[type="submit"]');

    function showMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'form-message';
        messageDiv.textContent = message;
        form.appendChild(messageDiv);
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
                Username: "oxqmgbnb",
                Password: "v40zxQ8*CF2D;j",
                Port: 465,
                To: 'lauraottosolutions@gmail.com',
                From: "oxqmgbnb@s1.maildns.net",
                Subject: `Portfolio Contact: ${formData.name}`,
                Body: `
                    <h3>New Contact Form Submission</h3>
                    <p><strong>Name:</strong> ${formData.name}</p>
                    <p><strong>Email:</strong> ${formData.email}</p>
                    <p><strong>Message:</strong><br>${formData.message}</p>
                `
            });

            if (response !== 'OK') {
                throw new Error('Email not sent: ' + response);
            }
        } catch (err) {
            showMessage('Something went wrong. Please email me directly at lauraottosolutions@gmail.com');
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = originalText;
        }
    });
});