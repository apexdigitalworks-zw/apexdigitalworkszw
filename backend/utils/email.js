const nodemailer = require("nodemailer");

let transporter = null;

function getTransporter() {
  if (transporter) return transporter;

  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.warn(
      "[Email] SMTP_USER / SMTP_PASS not set. Emails will be logged to console instead of sent."
    );
    return null;
  }

  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  return transporter;
}

/**
 * Sends an email. Falls back to console logging if SMTP is not configured,
 * so the rest of the app (orders, contact form, etc.) still works in dev.
 */
async function sendEmail({ to, subject, html, text, replyTo }) {
  const t = getTransporter();
  const companyEmail = process.env.COMPANY_EMAIL || "apexdigitalworkszw@gmail.com";

  if (!t) {
    console.log("=== [Email Fallback - not actually sent] ===");
    console.log("To:", to);
    console.log("Subject:", subject);
    console.log("Body:", text || html);
    console.log("=============================================");
    return { success: true, simulated: true };
  }

  try {
    const info = await t.sendMail({
      from: `"APEXDIGITALWORKSZW Website" <${process.env.SMTP_USER}>`,
      to: to || companyEmail,
      replyTo: replyTo || companyEmail,
      subject,
      text,
      html,
    });
    return { success: true, messageId: info.messageId };
  } catch (err) {
    console.error("[Email] Failed to send:", err.message);
    return { success: false, error: err.message };
  }
}

module.exports = { sendEmail };
