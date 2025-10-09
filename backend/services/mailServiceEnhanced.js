const nodemailer = require("nodemailer");

// Create transporter with comprehensive configuration
const createTransporter = () => {
    const config = {
        host: process.env.EMAIL_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.EMAIL_PORT) || 587,
        secure: process.env.EMAIL_SECURE === 'true' || false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
        // Additional options for Gmail₹
        ...(process.env.EMAIL_SERVICE === 'gmail' && {
            service: 'gmail',
        }),
    };

    return nodemailer.createTransport(config);
};

const transporter = createTransporter();

// Verify transporter configuration
const verifyTransporter = async () => {
    try {
        await transporter.verify();
        console.log('✅ Email transporter is ready to send emails');
        return true;
    } catch (error) {
        console.error('❌ Email transporter verification failed:', error.message);
        return false;
    }
};

async function sendMail(to, subject, html, options = {}) {
    try {
        const mailOptions = {
            from: process.env.EMAIL_FROM || `"DVCards" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            html,
            ...options // Allow additional options like attachments, cc, bcc
        };

        console.log(`📧 Sending email to: ${to} with subject: "${subject}"`);

        const info = await transporter.sendMail(mailOptions);
        console.log('✅ Email sent successfully:', info.messageId);
        return {
            success: true,
            messageId: info.messageId,
            response: info.response
        };
    } catch (error) {
        console.error('❌ Email send error:', error);
        throw new Error(`Failed to send email: ${error.message}`);
    }
}

// Email templates
const emailTemplates = {
    // Welcome email template
    welcomeEmail: (name, cardUrl) => ({
        subject: 'Welcome to DVCards - Your Digital Business Card Platform',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #3b82f6;">Welcome to DVCards, ${name}!</h2>
                <p>Thank you for joining our digital business card platform.</p>
                <p>You can now create and share your professional digital business cards.</p>
                ${cardUrl ? `<p><a href="${cardUrl}" style="background: #3b82f6; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">View Your Card</a></p>` : ''}
                <p>Best regards,<br>DVCards Team</p>
            </div>
        `
    }),

    // Password reset email template
    passwordResetEmail: (name, resetUrl) => ({
        subject: 'Reset Your DVCards Password',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #3b82f6;">Password Reset Request</h2>
                <p>Hello ${name},</p>
                <p>We received a request to reset your password for your DVCards account.</p>
                <p><a href="${resetUrl}" style="background: #3b82f6; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reset Your Password</a></p>
                <p>This link will expire in 1 hour for security reasons.</p>
                <p>If you didn't request this password reset, please ignore this email.</p>
                <p>Best regards,<br>DVCards Team</p>
            </div>
        `
    }),

    // Email verification template
    verifyEmail: (name, verificationUrl) => ({
        subject: 'Verify Your DVCards Email Address',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #3b82f6;">Verify Your Email Address</h2>
                <p>Hello ${name},</p>
                <p>Please click the button below to verify your email address and activate your DVCards account.</p>
                <p><a href="${verificationUrl}" style="background: #3b82f6; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Verify Email</a></p>
                <p>If you didn't create an account with DVCards, please ignore this email.</p>
                <p>Best regards,<br>DVCards Team</p>
            </div>
        `
    })
};

module.exports = {
    sendMail,
    verifyTransporter,
    emailTemplates
};