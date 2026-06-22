import React from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import AdBanner from "../components/AdBanner";
import { SERVICE_CATEGORIES } from "../data/services";

export default function Services() {
  return (
    <>
      <SEO
        title="Services"
        description="Explore APEXDIGITALWORKSZW's full range of services: graphic design, website development, digital marketing, Microsoft Suite services, online essentials, and tech installations."
      />

      <section className="section section-tight" style={{ background: "var(--color-mist)" }}>
        <div className="container">
          <span className="eyebrow">Our Services</span>
          <h1 style={{ maxWidth: 700 }}>Everything your business needs, organized into six categories.</h1>
          <p className="text-muted" style={{ maxWidth: 600 }}>
            Pick a category to see all available services, prices, and add exactly what you need
            straight to your cart.
          </p>
        </div>
      </section>

      <AdBanner placement="services_top" />

      <section className="section">
        <div className="container">
          <div className="grid grid-3">
            {SERVICE_CATEGORIES.map((cat) => (
              <Link key={cat.slug} to={`/services/${cat.slug}`} className="card category-card">
                <span className="service-overview-icon">{cat.icon}</span>
                <h3>{cat.name}</h3>
                <p className="text-muted" style={{ fontSize: "0.9rem", marginBottom: 0 }}>
                  {cat.description}
                </p>
                <ul className="service-list-preview">
                  {cat.services.slice(0, 3).map((s) => (
                    <li key={s.name}>{s.name}</li>
                  ))}
                  <li>+{cat.services.length - 3} more</li>
                </ul>
                <span className="count">View all {cat.services.length} services →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
