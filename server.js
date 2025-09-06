const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(__dirname));

// Email transporter setup
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    pool: true,
    maxConnections: 3,
    maxMessages: 100,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
    const { name, email, message } = req.body;

    // Input validation
    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Please fill in all fields' });
    }

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        replyTo: email,
        subject: `Portfolio Contact: ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        html: `<h3>New Contact Form Submission</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <h4>Message:</h4>
            <p>${message.replace(/\n/g, '<br>')}</p>`
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        res.json({ success: true });
    } catch (error) {
        console.error('Detailed email error:', {
            code: error.code,
            command: error.command,
            response: error.response,
            responseCode: error.responseCode,
            message: error.message
        });
        res.status(500).json({ error: 'Failed to send email. Please try again.' });
    }
});

// Main route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle 404
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});