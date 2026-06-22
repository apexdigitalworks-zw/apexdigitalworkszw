require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");

const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middleware/errorHandler");

const authRoutes = require("./routes/authRoutes");
const servicesRoutes = require("./routes/servicesRoutes");
const ordersRoutes = require("./routes/ordersRoutes");
const contactRoutes = require("./routes/contactRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const adsRoutes = require("./routes/adsRoutes");
const aiRoutes = require("./routes/aiRoutes");

const app = express();

// --- Security & infra middleware ---
app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    credentials: true,
  })
);
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

// Basic rate limiting to protect auth & AI endpoints from abuse
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use("/api/", apiLimiter);

// --- Health check ---
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", service: "APEXDIGITALWORKSZW API", time: new Date().toISOString() });
});

// --- Routes ---
app.use("/api/auth", authRoutes);
app.use("/api/services", servicesRoutes);
app.use("/api/orders", ordersRoutes);
app.use("/api", contactRoutes); // /api/contact, /api/feedback, /api/newsletter/*
app.use("/api/analytics", analyticsRoutes);
app.use("/api/ads", adsRoutes);
app.use("/api/ai", aiRoutes);

// --- Error handling ---
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 APEXDIGITALWORKSZW API running on port ${PORT} [${process.env.NODE_ENV || "development"}]`);
  });
});

module.exports = app;
