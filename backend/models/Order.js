const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const orderItemSchema = new mongoose.Schema(
  {
    category: { type: String, required: true },
    service: { type: String, required: true },
    price: { type: Number, required: true, default: 0 },
    quantity: { type: Number, required: true, default: 1, min: 1 },
    notes: { type: String, default: "" },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      unique: true,
      default: () => `APEX-${uuidv4().split("-")[0].toUpperCase()}`,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false, // allow guest checkout
    },
    guestName: { type: String, default: "" },
    guestEmail: { type: String, default: "" },
    guestPhone: { type: String, default: "" },
    items: {
      type: [orderItemSchema],
      validate: (v) => Array.isArray(v) && v.length > 0,
    },
    totalEstimate: {
      type: Number,
      required: true,
      default: 0,
    },
    status: {
      type: String,
      enum: [
        "pending",
        "contacted_on_whatsapp",
        "in_progress",
        "completed",
        "cancelled",
      ],
      default: "pending",
    },
    whatsappLink: {
      type: String,
      default: "",
    },
    whatsappMessageSent: {
      type: Boolean,
      default: false,
    },
    emailSent: {
      type: Boolean,
      default: false,
    },
    source: {
      type: String,
      enum: ["website", "whatsapp", "facebook", "referral", "other"],
      default: "website",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
