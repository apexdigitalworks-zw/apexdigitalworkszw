const express = require("express");
const router = express.Router();
const { trackVisit, trackEvent, getDashboardStats } = require("../controllers/analyticsController");
const { protect, adminOnly } = require("../middleware/auth");

router.post("/visit", trackVisit);
router.post("/event", trackEvent);
router.get("/dashboard", protect, adminOnly, getDashboardStats);

module.exports = router;
