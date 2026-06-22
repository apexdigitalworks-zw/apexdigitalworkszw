import React, { useState } from "react";
import { Link } from "react-router-dom";
import { COMPANY, buildWhatsappLink } from "../data/constants";
import { api, trackEvent } from "../data/api";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null); // 'success' | 'error' | null

  async function handleSubscribe(e) {
    e.preventDefault();
    if (!email.trim()) return;
    try {
      await api.post("/newsletter/subscribe", { email });
      setStatus("success");
      trackEvent("newsletter_signup", email);
      setEmail("");
    } catch (err) {
      setStatus("error");
    }
  }

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-brand">
              <span className="footer-brand-mark">A</span>
              <span className="footer-brand-text">{COMPANY.name}</span>
            </div>
            <p style={{ fontSize: "0.9rem", maxWidth: "280px" }}>
              Digital solutions that work — graphic design, web development, marketing, and tech
              installations all under one roof.
            </p>
            <div className="footer-social">
              <a
                href={COMPANY.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                f
              </a>
              <a
                href={buildWhatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                onClick={() => trackEvent("whatsapp_click", "footer")}
              >
                ✆
              </a>
              <a href={`mailto:${COMPANY.email}`} aria-label="Email">
                ✉
              </a>
            </div>
          </div>

          <div>
            <h4>Company</h4>
            <ul className="footer-links">
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/projects">Projects</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4>Legal</h4>
            <ul className="footer-links">
              <li><Link to="/policies#terms">Terms of Service</Link></li>
              <li><Link to="/policies#privacy">Privacy Policy</Link></li>
              <li><Link to="/policies#refund">Refund Policy</Link></li>
            </ul>
          </div>

          <div>
            <h4>Stay Updated</h4>
            <p style={{ fontSize: "0.85rem" }}>
              Get tips, offers, and updates from APEXDIGITALWORKSZW straight to your inbox.
            </p>
            <form className="footer-newsletter" onSubmit={handleSubscribe}>
              <div className="field" style={{ marginBottom: "0.6rem" }}>
                <input
                  type="email"
                  required
                  placeholder="you@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-label="Email address for newsletter"
                />
              </div>
              <button type="submit" className="btn btn-accent btn-sm btn-block">
                Subscribe
              </button>
              {status === "success" && (
                <p style={{ fontSize: "0.78rem", color: "#9CE8C8", marginTop: "0.5rem" }}>
                  You're subscribed! Welcome aboard.
                </p>
              )}
              {status === "error" && (
                <p style={{ fontSize: "0.78rem", color: "#F6A39C", marginTop: "0.5rem" }}>
                  Something went wrong. Please try again.
                </p>
              )}
            </form>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} {COMPANY.name}. All rights reserved.</span>
          <span>
            {COMPANY.email} · <Link to="/policies">Policies</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
