require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const planRoutes = require("./routes/planRoutes");
const cardDesignRoutes = require("./routes/cardDesignRoutes");
const cardRoutes = require("./routes/cardRoutes");
const cardTemplateRoutes = require("./routes/cardTemplateRoutes");
const profileRoutes = require("./routes/profileRoutes");
const userPlanRoutes = require("./routes/userPlanRoutes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();
connectDB();

app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
// Increase payload size limit to handle base64 images
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// routes
app.use("/api/auth", authRoutes);
app.use("/api/plans", planRoutes);
app.use("/api/card-design", cardDesignRoutes);
app.use("/api/cards", cardRoutes);
app.use("/api/card-templates", cardTemplateRoutes);
app.use("/api/profiles", profileRoutes);
app.use("/api/user-plans", userPlanRoutes);

app.get("/api/test", (req, res) => {
    res.json({
        success: true,
        message: "✅ API working successfully!",
        serverTime: new Date(),
    });
});

// error handler (last)
app.use(errorHandler);

const PORT = process.env.PORT || 4000;

// Verify email configuration on startup
const { verifyTransporter } = require("./services/mailServiceEnhanced");

app.listen(PORT, async () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);

    // Verify email configuration
    console.log('📧 Verifying email configuration...');
    const emailReady = await verifyTransporter();

    if (emailReady) {
        console.log('✅ Email service is ready');
    } else {
        console.log('⚠️  Email service verification failed - check your .env configuration');
        console.log('💡 Run "node testEmail.js" to test email configuration');
    }
});
