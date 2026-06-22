import React from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import AdBanner from "../components/AdBanner";
import { SERVICE_CATEGORIES } from "../data/services";
import { buildWhatsappLink } from "../data/constants";
import { trackEvent } from "../data/api";

const FEATURES = [
  {
    icon: "⚡",
    title: "Fast Turnaround",
    text: "From a logo to a full website, we deliver quality work on time, every time.",
  },
  {
    icon: "🤝",
    title: "All-in-One Partner",
    text: "Design, development, marketing, and tech installs — one team, one point of contact.",
  },
  {
    icon: "📍",
    title: "Locally Rooted",
    text: "Based in Zimbabwe, we understand the local market and deliver globally competitive work.",
  },
  {
    icon: "💬",
    title: "Real Conversations",
    text: "Every order connects straight to WhatsApp, so you're always talking to a real person.",
  },
];

export default function Home() {
  return (
    <>
      <SEO
        title="Home"
        description="APEXDIGITALWORKSZW offers graphic design, website development, digital marketing, Microsoft Suite services, online business essentials, and tech installations across Zimbabwe."
      />

      {/* ===== Hero ===== */}
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <span className="hero-eyebrow">Zimbabwe's All-in-One Digital Partner</span>
            <h1>
              Digital Solutions
              <span className="line2">That Work.</span>
            </h1>
            <p className="lead">
              From striking logos to full websites, marketing campaigns, and on-site tech
              installations — APEXDIGITALWORKSZW brings your ideas to life, end to end.
            </p>
            <div className="hero-ctas">
              <Link to="/services" className="btn btn-accent">
                Explore Services
              </Link>
              <a
                href={buildWhatsappLink("Hi APEXDIGITALWORKSZW! I'd like to get a quote for a project.")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp"
                onClick={() => trackEvent("cta_click", "hero_whatsapp")}
              >
                Get a Free Quote on WhatsApp
              </a>
            </div>
            <div className="hero-stats">
              <div className="hero-stat">
                <strong>6</strong>
                <span>Service Categories</span>
              </div>
              <div className="hero-stat">
                <strong>60+</strong>
                <span>Services Offered</span>
              </div>
              <div className="hero-stat">
                <strong>100%</strong>
                <span>Client-Focused</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hex-cluster">
              <div className="hex-tile">
                <span className="hex-icon">🎨</span>
                <span className="hex-label">Graphic Design</span>
              </div>
              <div className="hex-tile offset">
                <span className="hex-icon">💻</span>
                <span className="hex-label">Web Dev</span>
              </div>
              <div className="hex-tile">
                <span className="hex-icon">📣</span>
                <span className="hex-label">Marketing</span>
              </div>
              <div className="hex-tile offset">
                <span className="hex-icon">📊</span>
                <span className="hex-label">MS Suite</span>
              </div>
              <div className="hex-tile">
                <span className="hex-icon">🌐</span>
                <span className="hex-label">Online Setup</span>
              </div>
              <div className="hex-tile offset">
                <span className="hex-icon">🛠️</span>
                <span className="hex-label">Installations</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AdBanner placement="home_hero" />

      {/* ===== Services Overview ===== */}
      <section className="section">
        <div className="container">
          <div className="section-header center">
            <span className="eyebrow">What We Do</span>
            <h2>Six categories. One reliable team.</h2>
            <p className="text-muted">
              Whatever stage your business is at, we have a service to match — and we're happy to
              bundle several into one project.
            </p>
          </div>

          <div className="grid grid-3">
            {SERVICE_CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                to={`/services/${cat.slug}`}
                className="card service-overview-card"
                onClick={() => trackEvent("service_view", cat.name)}
              >
                <span className="service-overview-icon">{cat.icon}</span>
                <h3>{cat.name}</h3>
                <p className="text-muted" style={{ fontSize: "0.9rem" }}>{cat.description}</p>
                <span className="count">{cat.services.length} services →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Why Choose Us ===== */}
      <section className="section section-muted">
        <div className="container">
          <div className="grid grid-2" style={{ alignItems: "center", gap: "3rem" }}>
            <div>
              <span className="eyebrow">Why APEXDIGITALWORKSZW</span>
              <h2>Built for businesses that want results, not just deliverables.</h2>
              <p className="text-muted">
                We combine creative design, solid engineering, and hands-on tech support so you
                never have to juggle multiple vendors again.
              </p>
            </div>
            <div className="grid" style={{ gap: "1.4rem" }}>
              {FEATURES.map((f) => (
                <div className="feature-row" key={f.title}>
                  <span className="feature-icon">{f.icon}</span>
                  <div>
                    <h3 style={{ marginBottom: "0.2rem", fontSize: "1.05rem" }}>{f.title}</h3>
                    <p className="text-muted" style={{ fontSize: "0.9rem", marginBottom: 0 }}>
                      {f.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA Banner ===== */}
      <section className="section">
        <div className="container">
          <div className="cta-banner">
            <h2>Ready to start your next project?</h2>
            <p>
              Tell us what you need and we'll get back to you with a clear plan and quote — usually
              within the hour.
            </p>
            <div className="cta-banner-actions">
              <Link to="/contact" className="btn btn-white">
                Contact Us
              </Link>
              <a
                href={buildWhatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp"
                onClick={() => trackEvent("cta_click", "bottom_banner_whatsapp")}
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
