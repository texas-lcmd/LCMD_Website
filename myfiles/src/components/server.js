const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Email configuration
const transporter = nodemailer.createTransport({
    service: 'gmail', // or your email service
    auth: {
        user: 'texas.lcmd@gmail.com', // your email
        pass: 'L0nghorns2420!', // your email password or app password
    },
});

// Route to handle form submission
app.post('/send-email', (req, res) => {
    const email = req.body.email;

    const mailOptions = {
        from: 'texas.lcmd@gmail.com',
        to: 'texas.lcmd@gmail.com',
        subject: 'New Subscription',
        text: `New subscriber: ${email}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            return res.status(500).send('Error sending email');
        }
        res.status(200).send('Subscription successful!');
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
