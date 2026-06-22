const express = require("express");
const router = express.Router();
const {
  sendContactMessage,
  submitFeedback,
  getAllFeedback,
  subscribeNewsletter,
  unsubscribeNewsletter,
  getAllSubscribers,
} = require("../controllers/contactController");
const { protect, adminOnly } = require("../middleware/auth");

router.post("/contact", sendContactMessage);

router.post("/feedback", submitFeedback);
router.get("/feedback/admin/all", protect, adminOnly, getAllFeedback);

router.post("/newsletter/subscribe", subscribeNewsletter);
router.post("/newsletter/unsubscribe", unsubscribeNewsletter);
router.get("/newsletter/admin/all", protect, adminOnly, getAllSubscribers);

module.exports = router;
