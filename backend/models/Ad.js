const mongoose = require("mongoose");

const adSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    type: {
      type: String,
      enum: ["banner", "google_ads", "sidebar", "popup"],
      default: "banner",
    },
    imageUrl: { type: String, default: "" },
    targetUrl: { type: String, default: "" },
    placement: {
      type: String,
      enum: ["home_hero", "home_footer", "services_top", "sidebar", "global"],
      default: "global",
    },
    isActive: { type: Boolean, default: true },
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date, default: null },
    impressions: { type: Number, default: 0 },
    clicks: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Ad", adSchema);
