import React, { useState } from "react";
import SEO from "../components/SEO";
import { COMPANY, buildWhatsappLink } from "../data/constants";
import { api } from "../data/api";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setStatus(null);
    try {
      await api.post("/contact", form);
      setStatus({ type: "success", message: "Your message has been sent. We'll get back to you shortly!" });
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setStatus({ type: "error", message: err.message || "Something went wrong. Please try again." });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <SEO
        title="Contact Us"
        description="Get in touch with APEXDIGITALWORKSZW via email, WhatsApp, or our contact form."
      />

      <section className="section section-tight" style={{ background: "var(--color-mist)" }}>
        <div className="container">
          <span className="eyebrow">Get In Touch</span>
          <h1>We'd love to hear from you.</h1>
          <p className="text-muted" style={{ maxWidth: 600 }}>
            Have a question, a project idea, or need a quote? Reach out — we respond fast.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid grid-2" style={{ gap: "2.5rem", alignItems: "flex-start" }}>
            <div className="card">
              <h3>Send us a message</h3>
              {status && (
                <div className={`alert alert-${status.type}`}>{status.message}</div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="field">
                  <label htmlFor="name">Full Name</label>
                  <input id="name" name="name" required value={form.name} onChange={handleChange} placeholder="Your name" />
                </div>
                <div className="field">
                  <label htmlFor="email">Email Address</label>
                  <input id="email" type="email" name="email" required value={form.email} onChange={handleChange} placeholder="you@email.com" />
                </div>
                <div className="field">
                  <label htmlFor="subject">Subject</label>
                  <input id="subject" name="subject" value={form.subject} onChange={handleChange} placeholder="What's this about?" />
                </div>
                <div className="field">
                  <label htmlFor="message">Message</label>
                  <textarea id="message" name="message" required value={form.message} onChange={handleChange} placeholder="Tell us more..." />
                </div>
                <button type="submit" className="btn btn-primary btn-block" disabled={submitting}>
                  {submitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>

            <div>
              <div className="card" style={{ marginBottom: "1.2rem" }}>
                <h3>Contact Details</h3>
                <div className="footer-contact-item" style={{ color: "var(--color-text)" }}>
                  <span>✉</span>
                  <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
                </div>
                <div className="footer-contact-item" style={{ color: "var(--color-text)" }}>
                  <span>✆</span>
                  <a href={buildWhatsappLink()} target="_blank" rel="noopener noreferrer">
                    Chat on WhatsApp
                  </a>
                </div>
                <div className="footer-contact-item" style={{ color: "var(--color-text)" }}>
                  <span>f</span>
                  <a href={COMPANY.facebook} target="_blank" rel="noopener noreferrer">
                    Facebook Page
                  </a>
                </div>
                <div className="footer-contact-item" style={{ color: "var(--color-text)" }}>
                  <span>📍</span>
                  <span>{COMPANY.address}</span>
                </div>
              </div>

              <div className="card" style={{ background: "var(--color-navy)", color: "white" }}>
                <h3 style={{ color: "white" }}>Prefer to chat directly?</h3>
                <p style={{ color: "#C9D2EE", fontSize: "0.9rem" }}>
                  Most clients get a faster response by messaging us directly on WhatsApp.
                </p>
                <a href={buildWhatsappLink()} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp btn-block">
                  Message Us Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
