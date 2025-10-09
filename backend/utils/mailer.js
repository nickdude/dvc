// utils/mailer.js
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // use Gmail App Password
    },
});

async function sendMail(to, subject, html) {
    const mailOptions = {
        from: `"DVCards" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        html,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent:", info.response);
        return info;
    } catch (err) {
        console.error("Email send error:", err);
        throw new Error("Failed to send email");
    }
}

module.exports = { sendMail };
