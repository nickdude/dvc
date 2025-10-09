// Test email configuration
require('dotenv').config();
const { sendMail, verifyTransporter, emailTemplates } = require('./services/mailServiceEnhanced');

async function testEmailConfiguration() {
    console.log('🧪 Testing Email Configuration...\n');

    // Check environment variables
    console.log('📋 Environment Variables:');
    console.log(`EMAIL_USER: ${process.env.EMAIL_USER}`);
    console.log(`EMAIL_HOST: ${process.env.EMAIL_HOST}`);
    console.log(`EMAIL_PORT: ${process.env.EMAIL_PORT}`);
    console.log(`EMAIL_SERVICE: ${process.env.EMAIL_SERVICE}`);
    console.log(`EMAIL_FROM: ${process.env.EMAIL_FROM}`);
    console.log('');

    // Verify transporter
    console.log('🔍 Verifying Email Transporter...');
    const isVerified = await verifyTransporter();

    if (!isVerified) {
        console.log('❌ Email configuration verification failed!');
        console.log('\n🔧 Troubleshooting Tips:');
        console.log('1. Make sure you\'re using Gmail App Password, not regular password');
        console.log('2. Enable 2-factor authentication on Gmail');
        console.log('3. Generate App Password: https://myaccount.google.com/apppasswords');
        console.log('4. Check if "Less secure app access" is enabled (not recommended)');
        return;
    }

    // Test sending email
    try {
        console.log('\n📤 Sending test email...');

        const testEmail = {
            to: process.env.EMAIL_USER, // Send to yourself for testing
            subject: 'DVCards Email Configuration Test',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #3b82f6;">Email Configuration Test</h2>
                    <p>✅ Your email configuration is working correctly!</p>
                    <p>This is a test email sent from your DVCards platform.</p>
                    <hr>
                    <p><strong>Configuration Details:</strong></p>
                    <ul>
                        <li>Email Host: ${process.env.EMAIL_HOST}</li>
                        <li>Email Port: ${process.env.EMAIL_PORT}</li>
                        <li>Email User: ${process.env.EMAIL_USER}</li>
                        <li>Service: ${process.env.EMAIL_SERVICE || 'SMTP'}</li>
                    </ul>
                    <p>Sent at: ${new Date().toLocaleString()}</p>
                </div>
            `
        };

        const result = await sendMail(testEmail.to, testEmail.subject, testEmail.html);

        if (result.success) {
            console.log('✅ Test email sent successfully!');
            console.log(`📧 Check your inbox: ${process.env.EMAIL_USER}`);
            console.log(`📧 Message ID: ${result.messageId}`);
        }
    } catch (error) {
        console.error('❌ Failed to send test email:', error.message);

        console.log('\n🔧 Common Solutions:');
        console.log('1. Verify Gmail App Password is correct');
        console.log('2. Check internet connection');
        console.log('3. Verify EMAIL_USER is correct');
        console.log('4. Try generating a new App Password');
    }
}

// Run the test
if (require.main === module) {
    testEmailConfiguration()
        .then(() => {
            console.log('\n🏁 Email configuration test completed.');
            process.exit(0);
        })
        .catch((error) => {
            console.error('❌ Test failed:', error);
            process.exit(1);
        });
}

module.exports = { testEmailConfiguration };