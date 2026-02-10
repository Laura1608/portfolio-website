const express = require('express');
const path = require('path');
const http = require('http');
const brevo = require('@getbrevo/brevo');
const app = express();

// Flask waitlist app (run from ai-masterclass folder: python app.py)
const WAITLIST_APP_PORT = process.env.WAITLIST_APP_PORT || 5000;
const WAITLIST_APP_HOST = 'localhost';

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

// Proxy waitlist signup to Flask app in ai-masterclass (when running)
app.post('/ai-masterclass/api/subscribe', (req, res) => {
    const body = JSON.stringify(req.body || {});
    const options = {
        hostname: WAITLIST_APP_HOST,
        port: WAITLIST_APP_PORT,
        path: '/api/subscribe',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(body),
        },
    };
    const proxyReq = http.request(options, (proxyRes) => {
        let data = '';
        proxyRes.on('data', (chunk) => { data += chunk; });
        proxyRes.on('end', () => {
            res.status(proxyRes.statusCode).set(proxyRes.headers).send(data || undefined);
        });
    });
    proxyReq.on('error', (err) => {
        console.error('Waitlist proxy error:', err.message);
        res.status(502).json({ success: false, error: 'Waitlist service unavailable. Please try again later.' });
    });
    proxyReq.write(body);
    proxyReq.end();
});

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

// AI Masterclass page
app.get('/masterclass-ai', (req, res) => {
    res.sendFile(path.join(__dirname, 'masterclass-ai.html'));
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