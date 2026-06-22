const Feedback = require("../models/Feedback");
const Newsletter = require("../models/Newsletter");
const { sendEmail } = require("../utils/email");

// POST /api/contact  (general contact form -> emails the company directly)
async function sendContactMessage(req, res, next) {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ message: "Name, email, and message are required" });
    }

    const companyEmail = process.env.COMPANY_EMAIL || "apexdigitalworkszw@gmail.com";

    await sendEmail({
      to: companyEmail,
      replyTo: email,
      subject: `Website Contact Form: ${subject || "New Message"}`,
      html: `<p><strong>From:</strong> ${name} (${email})</p><p>${message.replace(/\n/g, "<br/>")}</p>`,
      text: `From: ${name} (${email})\n\n${message}`,
    });

    res.status(200).json({ message: "Your message has been sent. We'll get back to you shortly!" });
  } catch (err) {
    next(err);
  }
}

// POST /api/feedback
async function submitFeedback(req, res, next) {
  try {
    const { name, email, subject, message, rating } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ message: "Name, email, and message are required" });
    }

    const feedback = await Feedback.create({ name, email, subject, message, rating });

    sendEmail({
      to: process.env.COMPANY_EMAIL || "apexdigitalworkszw@gmail.com",
      replyTo: email,
      subject: `New Feedback Received${rating ? ` (${rating}/5)` : ""}`,
      html: `<p><strong>From:</strong> ${name} (${email})</p><p>${message.replace(/\n/g, "<br/>")}</p>`,
      text: `From: ${name} (${email})\n\n${message}`,
    }).catch((e) => console.error("Feedback email failed:", e.message));

    res.status(201).json({ message: "Thank you for your feedback!", feedback });
  } catch (err) {
    next(err);
  }
}

// GET /api/feedback  (admin)
async function getAllFeedback(req, res, next) {
  try {
    const feedback = await Feedback.find().sort({ createdAt: -1 });
    res.json({ feedback });
  } catch (err) {
    next(err);
  }
}

// POST /api/newsletter/subscribe
async function subscribeNewsletter(req, res, next) {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const existing = await Newsletter.findOne({ email: email.toLowerCase() });
    if (existing) {
      if (!existing.isActive) {
        existing.isActive = true;
        await existing.save();
      }
      return res.status(200).json({ message: "You're already subscribed!" });
    }

    await Newsletter.create({ email });
    res.status(201).json({ message: "Subscribed successfully! Thanks for joining." });
  } catch (err) {
    next(err);
  }
}

// POST /api/newsletter/unsubscribe
async function unsubscribeNewsletter(req, res, next) {
  try {
    const { email } = req.body;
    await Newsletter.findOneAndUpdate({ email: email?.toLowerCase() }, { isActive: false });
    res.json({ message: "You have been unsubscribed." });
  } catch (err) {
    next(err);
  }
}

// GET /api/newsletter  (admin)
async function getAllSubscribers(req, res, next) {
  try {
    const subscribers = await Newsletter.find().sort({ createdAt: -1 });
    res.json({ subscribers });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  sendContactMessage,
  submitFeedback,
  getAllFeedback,
  subscribeNewsletter,
  unsubscribeNewsletter,
  getAllSubscribers,
};
