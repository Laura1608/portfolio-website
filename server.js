const express = require('express');
const path = require('path');
const brevo = require('@getbrevo/brevo');
const { google } = require('googleapis');
const app = express();

// Google Sheets config for AI Masterclass waitlist
const SHEET_ID = '1ZUH0W_WmTxSDAOVh-gGHkQyYnkY4oxIiqEzhkG6g0FI';
const SHEET_NAME = 'Sheet1';
const COLUMNS = ['email', 'date'];
const GOOGLE_CREDENTIALS_ENV = 'GOOGLE_CREDENTIALS_JSON';

// Configure Brevo API client
const defaultClient = brevo.ApiClient.instance;
defaultClient.authentications['api-key'].apiKey = process.env.BREVO_API_KEY;
const apiInstance = new brevo.TransactionalEmailsApi();

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(__dirname));

// Email sending setup (Brevo)
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

// --- Google Sheets helpers for AI Masterclass waitlist ---

const getGoogleCredentials = () => {
    const json = process.env[GOOGLE_CREDENTIALS_ENV];
    if (!json) {
        console.error(`Environment variable ${GOOGLE_CREDENTIALS_ENV} is not set.`);
        return null;
    }
    try {
        return JSON.parse(json);
    } catch (err) {
        console.error('Error parsing Google credentials JSON:', err.message);
        return null;
    }
};

const getSheetsClient = async () => {
    const creds = getGoogleCredentials();
    if (!creds) {
        throw new Error('Google credentials not configured');
    }

    const auth = new google.auth.GoogleAuth({
        credentials: creds,
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const authClient = await auth.getClient();
    return google.sheets({ version: 'v4', auth: authClient });
};

const saveEmailToSheets = async (emailRaw) => {
    if (!emailRaw || !emailRaw.trim()) {
        console.error('Invalid email');
        return false;
    }

    const email = emailRaw.trim().toLowerCase();
    const sheets = await getSheetsClient();
    const now = new Date().toISOString().replace('T', ' ').substring(0, 19);

    // Get existing data
    const getRes = await sheets.spreadsheets.values.get({
        spreadsheetId: SHEET_ID,
        range: `${SHEET_NAME}!A:B`,
    });

    const rows = getRes.data.values || [];

    // If sheet is empty, add headers and first row
    if (!rows.length) {
        await sheets.spreadsheets.values.update({
            spreadsheetId: SHEET_ID,
            range: `${SHEET_NAME}!A1:B1`,
            valueInputOption: 'RAW',
            requestBody: { values: [COLUMNS] },
        });
        await sheets.spreadsheets.values.append({
            spreadsheetId: SHEET_ID,
            range: `${SHEET_NAME}!A:B`,
            valueInputOption: 'USER_ENTERED',
            requestBody: { values: [[email, now]] },
        });
        return true;
    }

    // Ensure header row matches (optional, but keeps things tidy)
    const header = rows[0] || [];
    if (header.join(',') !== COLUMNS.join(',')) {
        await sheets.spreadsheets.values.update({
            spreadsheetId: SHEET_ID,
            range: `${SHEET_NAME}!A1:B1`,
            valueInputOption: 'RAW',
            requestBody: { values: [COLUMNS] },
        });
    }

    // Check for duplicate email
    const existingEmails = rows
        .slice(1)
        .map((r) => (r[0] || '').toString().toLowerCase());

    if (existingEmails.includes(email)) {
        return true;
    }

    // Append new email row
    await sheets.spreadsheets.values.append({
        spreadsheetId: SHEET_ID,
        range: `${SHEET_NAME}!A:B`,
        valueInputOption: 'USER_ENTERED',
        requestBody: { values: [[email, now]] },
    });

    return true;
};

// Waitlist signup endpoint for AI Masterclass (single-service setup)
app.post('/ai-masterclass/api/subscribe', async (req, res) => {
    try {
        const { email } = req.body || {};

        if (!email || !email.trim()) {
            return res.status(400).json({
                success: false,
                error: 'Email is required',
            });
        }

        const ok = await saveEmailToSheets(email);

        if (!ok) {
            return res.status(500).json({
                success: false,
                error: 'Failed to save email. Please try again later.',
            });
        }

        return res.json({
            success: true,
            message: 'Email saved successfully',
        });
    } catch (err) {
        console.error('AI Masterclass waitlist error:', err.message);
        return res.status(500).json({
            success: false,
            error: 'Server error while saving to waitlist. Please try again later.',
        });
    }
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
    const { name, email, message, consent_timestamp } = req.body;

    // Input validation
    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Please fill in all fields' });
    }

    // Consent timestamp: fall back to server time if client didn't send one
    const consentTs = consent_timestamp || new Date().toISOString();

    // Server-side consent log (Railway retains logs 90 days)
    console.log(`[CONSENT] name=${name} email=${email} consent_timestamp=${consentTs}`);

    const htmlContent = `<h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <h4>Message:</h4>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>

    const textContent = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n\n---\nConsent recorded: ${consentTs} (GDPR Art. 7(1) — Privacy Policy accepted at form submission)`;

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

// Legal pages (explicit routes ensure they are always served from project)
app.get('/legal/privacy.html', (req, res) => res.sendFile(path.join(__dirname, 'legal', 'privacy.html')));
app.get('/legal/terms.html', (req, res) => res.sendFile(path.join(__dirname, 'legal', 'terms.html')));
app.get('/legal/vulnerability-disclosure.html', (req, res) => res.sendFile(path.join(__dirname, 'legal', 'vulnerability-disclosure.html')));

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