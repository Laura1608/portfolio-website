function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}

document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.contact-form');
    const submitButton = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
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
            showToast('Please fill in all fields');
            submitButton.disabled = false;
            submitButton.textContent = originalText;
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            showToast('Please enter a valid email address');
            submitButton.disabled = false;
            submitButton.textContent = originalText;
            return;
        }

        // Send email using SMTP.js
        Email.send({
            Host: "s1.maildns.net",
            Port: 465,
            Username: "oxqmgbnb",
            Password: "v40zxQ8*CF2D;j",
            To: 'lauraottosolutions@gmail.com',
            From: "oxqmgbnb@s1.maildns.net", // Use your SMTP email as From address
            ReplyTo: formData.email, // Set reply-to as the user's email
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
                showToast('Thank you! Your message has been sent.');
                form.reset();
            } else {
                throw new Error('Email not sent: ' + message);
            }
        })
        .catch(err => {
            console.error('Error sending email:', err);
            showToast('Something went wrong. Please email me directly at lauraottosolutions@gmail.com');
        })
        .finally(() => {
            submitButton.disabled = false;
            submitButton.textContent = originalText;
        });
    });
});