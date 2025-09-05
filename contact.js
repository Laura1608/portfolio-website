document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.contact-form');
    const submitButton = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        console.log('Form submitted');
        
        // Disable submit button and show loading state
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
            alert('Please fill in all fields');
            submitButton.disabled = false;
            submitButton.textContent = originalText;
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            alert('Please enter a valid email address');
            submitButton.disabled = false;
            submitButton.textContent = originalText;
            return;
        }

        // Send email using SMTP.js
        Email.send({
            Host: "s1.maildns.net",
            Username: "oxqmgbnb",
            Password: "v40zxQ8*CF2D;j",
            To: 'lauraottosolutions@gmail.com',
            From: `${formData.email}`,
            Subject: `Contact from Portfolio: ${formData.name}`,
            Body: `
                <h3>New Contact Form Submission</h3>
                <p><strong>Name:</strong> ${formData.name}</p>
                <p><strong>Email:</strong> ${formData.email}</p>
                <p><strong>Message:</strong><br>${formData.message}</p>
            `
        })
        .then(message => {
            console.log('Email status:', message);
            if (message === 'OK') {
                alert('Thank you! Your message has been sent.');
                form.reset();
            } else {
                throw new Error('Email not sent: ' + message);
            }
        })
        .catch(err => {
            console.error('Error sending email:', err);
            alert('Sorry, there was an error sending your message. Please email me directly at lauraottosolutions@gmail.com');
        })
        .finally(() => {
            submitButton.disabled = false;
            submitButton.textContent = originalText;
        });
    });
});