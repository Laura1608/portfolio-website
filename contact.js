document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.contact-form');
    const submitButton = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Disable submit button
        submitButton.disabled = true;
        
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
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            alert('Please enter a valid email address');
            submitButton.disabled = false;
            return;
        }

        // Send email using Gmail SMTP
        Email.send({
            SecureToken: "fotc ozck lmlw lfdx", // Your secure token
            To: 'lauraottosolutions@gmail.com',
            From: 'lauraottosolutions@gmail.com',
            Subject: `New Contact Form Message from ${formData.name}`,
            Body: `
                Name: ${formData.name}<br>
                Email: ${formData.email}<br>
                Message: ${formData.message}
            `
        }).then(function(response) {
            if (response === 'OK') {
                alert('Thank you! Your message has been sent.');
                form.reset();
            } else {
                alert('Sorry, there was an error sending your message. Please try again.');
            }
        }).catch(function(error) {
            console.error('Error:', error);
            alert('Sorry, there was an error sending your message. Please try again.');
        }).finally(function() {
            submitButton.disabled = false;
        });
    });
});