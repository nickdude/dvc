const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

async function sendMail(to, subject, html) {
    const mailOptions = {
        from: `"DVCards" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        html,
    };
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response || info);
    return info;
}

module.exports = { sendMail };
