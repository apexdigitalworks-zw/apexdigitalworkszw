import React from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import SEO from "../components/SEO";
import { trackEvent } from "../data/api";

export default function OrderConfirmation() {
  const { id } = useParams();
  const location = useLocation();
  const { order, whatsappLink } = location.state || {};

  return (
    <>
      <SEO title="Order Confirmed" description="Your order with APEXDIGITALWORKSZW has been received." />
      <section className="section">
        <div className="container" style={{ maxWidth: 640, textAlign: "center" }}>
          <div style={{ fontSize: "3rem" }}>✅</div>
          <h1>Thank you! Your order has been received.</h1>
          <p className="text-muted">
            We've sent a confirmation to your email. The fastest way to finalize details is to
            continue the conversation with us on WhatsApp.
          </p>

          <div className="order-number-badge">Order #{id}</div>

          {order && (
            <div className="order-summary-box" style={{ textAlign: "left" }}>
              <h3>Order Summary</h3>
              {order.items.map((item) => (
                <div className="cart-summary-row" key={`${item.category}-${item.service}`}>
                  <span>{item.service} x{item.quantity}</span>
                  <span>${item.price * item.quantity}</span>
                </div>
              ))}
              <div className="cart-summary-row total">
                <span>Estimated Total</span>
                <span>${order.totalEstimate}</span>
              </div>
            </div>
          )}

          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", marginTop: "1.5rem" }}>
            {whatsappLink && (
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp"
                onClick={() => trackEvent("whatsapp_click", "order_confirmation")}
              >
                Continue on WhatsApp
              </a>
            )}
            <Link to="/track-order" className="btn btn-outline">
              Track This Order
            </Link>
            <Link to="/" className="btn btn-primary">
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
