const express = require('express');
const path = require('path');
const brevo = require('@getbrevo/brevo');
const app = express();

// Configure Brevo API client
const defaultClient = brevo.ApiClient.instance;
defaultClient.authentications['api-key'].apiKey = process.env.BREVO_API_KEY;
const apiInstance = new brevo.TransactionalEmailsApi();

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(__dirname));

// Email sending setup
const sendEmail = async (to, subject, textContent, htmlContent) => {
    const sendSmtpEmail = new brevo.SendSmtpEmail();
    sendSmtpEmail.sender = { email: process.env.ADMIN_EMAIL, name: 'Laura Otto Portfolio' };
    sendSmtpEmail.to = [{ email: to }];
    sendSmtpEmail.subject = subject;
    sendSmtpEmail.htmlContent = htmlContent;
    sendSmtpEmail.textContent = textContent;
    
    try {
        const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
        console.log('Email sent successfully. MessageId:', data.messageId);
        return true;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
};

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
    const { name, email, message } = req.body;

    // Input validation
    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Please fill in all fields' });
    }

    const htmlContent = `<h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <h4>Message:</h4>
        <p>${message.replace(/\n/g, '<br>')}</p>`;
    
    const textContent = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;

    try {
        await sendEmail(
            process.env.ADMIN_EMAIL, 
            `Portfolio Contact: ${name}`,
            textContent,
            htmlContent
        );
        res.json({ success: true });
    } catch (error) {
        console.error('Failed to send email:', error);
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

//To start the server:
//Open terminal/command prompt in your project directory
//Run: node server.js
//You should see: Server running on port 3000
//Open browser and go to: http://localhost:3000/index.html