const mongoose = require("mongoose");

const pageVisitSchema = new mongoose.Schema(
  {
    path: { type: String, required: true },
    referrer: { type: String, default: "" },
    userAgent: { type: String, default: "" },
    sessionId: { type: String, default: "" },
    country: { type: String, default: "" },
    device: {
      type: String,
      enum: ["mobile", "tablet", "desktop", "unknown"],
      default: "unknown",
    },
    isUniqueVisitor: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const eventSchema = new mongoose.Schema(
  {
    eventType: {
      type: String,
      required: true,
      enum: [
        "cta_click",
        "whatsapp_click",
        "service_view",
        "add_to_cart",
        "checkout_started",
        "checkout_completed",
        "chatbot_opened",
        "chatbot_message",
        "newsletter_signup",
        "feedback_submitted",
        "ad_impression",
        "ad_click",
        "other",
      ],
    },
    label: { type: String, default: "" },
    path: { type: String, default: "" },
    sessionId: { type: String, default: "" },
    meta: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
);

module.exports = {
  PageVisit: mongoose.model("PageVisit", pageVisitSchema),
  AnalyticsEvent: mongoose.model("AnalyticsEvent", eventSchema),
};
