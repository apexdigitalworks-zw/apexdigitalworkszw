import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import SEO from "../components/SEO";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { api, trackEvent } from "../data/api";

export default function Checkout() {
  const { items, totalPrice, clearCart } = useCart();
  const { user, token } = useAuth();
  const navigate = useNavigate();

  const [guestName, setGuestName] = useState(user?.fullName || "");
  const [guestEmail, setGuestEmail] = useState(user?.email || "");
  const [guestPhone, setGuestPhone] = useState(user?.phone || "");
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  if (items.length === 0) {
    return <Navigate to="/cart" replace />;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    trackEvent("checkout_started");

    try {
      const payload = {
        items: items.map((i) => ({
          category: i.category,
          service: i.service,
          quantity: i.quantity,
          notes: i.notes,
        })),
      };

      if (!user) {
        payload.guestName = guestName;
        payload.guestEmail = guestEmail;
        payload.guestPhone = guestPhone;
      }

      const headers = user && token ? { Authorization: `Bearer ${token}` } : {};
      const data = await api.post("/orders", payload, headers);

      trackEvent("checkout_completed", data.order.orderNumber);
      clearCart();
      navigate(`/order-confirmation/${data.order.orderNumber}`, {
        state: { order: data.order, whatsappLink: data.whatsappLink },
      });
    } catch (err) {
      setError(err.message || "Something went wrong while placing your order.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <SEO title="Checkout" description="Complete your order with APEXDIGITALWORKSZW." />
      <section className="section">
        <div className="container">
          <h1>Checkout</h1>
          <div className="grid" style={{ gridTemplateColumns: "1.3fr 1fr", gap: "2.5rem", alignItems: "flex-start" }}>
            <div className="card">
              {error && <div className="alert alert-error">{error}</div>}

              {user ? (
                <div className="alert alert-success">
                  Checking out as <strong>{user.fullName}</strong> ({user.email})
                </div>
              ) : (
                <>
                  <h3>Your Details</h3>
                  <p className="text-muted" style={{ fontSize: "0.88rem" }}>
                    Check out as a guest, or <Link to="/login" state={{ from: "/checkout" }}>log in</Link> for order tracking in your dashboard.
                  </p>
                </>
              )}

              <form onSubmit={handleSubmit}>
                {!user && (
                  <>
                    <div className="field">
                      <label htmlFor="guestName">Full Name</label>
                      <input id="guestName" required value={guestName} onChange={(e) => setGuestName(e.target.value)} placeholder="Your full name" />
                    </div>
                    <div className="field">
                      <label htmlFor="guestEmail">Email Address</label>
                      <input id="guestEmail" type="email" required value={guestEmail} onChange={(e) => setGuestEmail(e.target.value)} placeholder="you@email.com" />
                    </div>
                    <div className="field">
                      <label htmlFor="guestPhone">Phone Number (for WhatsApp follow-up)</label>
                      <input id="guestPhone" value={guestPhone} onChange={(e) => setGuestPhone(e.target.value)} placeholder="+263 7XX XXX XXX" />
                    </div>
                  </>
                )}

                <div className="alert alert-success" style={{ marginTop: "1rem" }}>
                  After placing your order, you'll get an order number and a direct WhatsApp link
                  to confirm details with our team.
                </div>

                <button type="submit" className="btn btn-primary btn-block" disabled={submitting}>
                  {submitting ? "Placing order..." : `Place Order — $${totalPrice}`}
                </button>
              </form>
            </div>

            <div className="cart-summary">
              <h3>Order Summary</h3>
              {items.map((item) => (
                <div className="cart-summary-row" key={`${item.category}-${item.service}`}>
                  <span>{item.service} x{item.quantity}</span>
                  <span>${item.price * item.quantity}</span>
                </div>
              ))}
              <div className="cart-summary-row total">
                <span>Estimated Total</span>
                <span>${totalPrice}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
