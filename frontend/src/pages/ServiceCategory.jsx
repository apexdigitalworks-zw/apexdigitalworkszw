import React, { useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import SEO from "../components/SEO";
import { SERVICE_CATEGORIES } from "../data/services";
import { useCart } from "../context/CartContext";
import { trackEvent } from "../data/api";

export default function ServiceCategory() {
  const { slug } = useParams();
  const category = SERVICE_CATEGORIES.find((c) => c.slug === slug);
  const { addItem, items } = useCart();
  const [justAdded, setJustAdded] = useState(null);

  if (!category) return <Navigate to="/services" replace />;

  function handleAdd(service) {
    addItem(category.name, service.name, service.price);
    trackEvent("add_to_cart", `${category.name}: ${service.name}`);
    setJustAdded(service.name);
    setTimeout(() => setJustAdded(null), 1500);
  }

  function isInCart(serviceName) {
    return items.some((i) => i.category === category.name && i.service === serviceName);
  }

  return (
    <>
      <SEO
        title={category.name}
        description={`${category.description} View all ${category.services.length} ${category.name} services offered by APEXDIGITALWORKSZW.`}
      />

      <section className="service-detail-header">
        <div className="container">
          <Link to="/services" style={{ color: "#DCE3F7", fontSize: "0.85rem" }}>
            ← Back to Services
          </Link>
          <h1 style={{ marginTop: "0.8rem" }}>
            <span style={{ marginRight: "0.5rem" }}>{category.icon}</span>
            {category.name}
          </h1>
          <p style={{ maxWidth: 600 }}>{category.description}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="category-pills">
            {SERVICE_CATEGORIES.map((c) => (
              <Link
                key={c.slug}
                to={`/services/${c.slug}`}
                className={`category-pill${c.slug === slug ? " active" : ""}`}
              >
                {c.icon} {c.name}
              </Link>
            ))}
          </div>

          <div className="card">
            {category.services.map((service) => (
              <div className="service-row" key={service.name}>
                <div className="service-row-info">
                  <h4>{service.name}</h4>
                  <span className="text-muted" style={{ fontSize: "0.82rem" }}>
                    Starting price
                  </span>
                </div>
                <div className="service-row-actions">
                  <span className="service-row-price">${service.price}</span>
                  <button
                    className={`add-to-cart-btn${justAdded === service.name ? " added" : ""}`}
                    onClick={() => handleAdd(service)}
                  >
                    {justAdded === service.name
                      ? "Added ✓"
                      : isInCart(service.name)
                      ? "Add Another"
                      : "Add to Cart"}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <p className="text-muted" style={{ marginTop: "1.5rem", fontSize: "0.85rem" }}>
            Prices shown are starting estimates and may vary based on project scope. You'll be able
            to add notes and confirm final details with our team via WhatsApp after checkout.
          </p>
        </div>
      </section>
    </>
  );
}
