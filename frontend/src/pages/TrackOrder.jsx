import React, { useState } from "react";
import SEO from "../components/SEO";
import { api } from "../data/api";

const STATUS_LABELS = {
  pending: "Pending Review",
  contacted_on_whatsapp: "Contacted on WhatsApp",
  in_progress: "In Progress",
  completed: "Completed",
  cancelled: "Cancelled",
};

const STATUS_COLORS = {
  pending: "#FFB648",
  contacted_on_whatsapp: "#5B7FFF",
  in_progress: "#2541B2",
  completed: "#1FA37D",
  cancelled: "#E2483D",
};

export default function TrackOrder() {
  const [orderNumber, setOrderNumber] = useState("");
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSearch(e) {
    e.preventDefault();
    setError(null);
    setOrder(null);
    setLoading(true);
    try {
      const data = await api.get(`/orders/${encodeURIComponent(orderNumber.trim())}`);
      setOrder(data.order);
    } catch (err) {
      setError("We couldn't find an order with that number. Please double-check and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <SEO title="Track Your Order" description="Track the status of your APEXDIGITALWORKSZW order using your order number." />
      <section className="section">
        <div className="container" style={{ maxWidth: 640 }}>
          <span className="eyebrow">Order Tracking</span>
          <h1>Track your order</h1>
          <p className="text-muted">Enter your order number (e.g. APEX-A1B2C3D4) to see its current status.</p>

          <form onSubmit={handleSearch} style={{ display: "flex", gap: "0.6rem", marginTop: "1.5rem" }}>
            <div className="field" style={{ flex: 1, marginBottom: 0 }}>
              <input
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                placeholder="APEX-XXXXXXXX"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? "Searching..." : "Track"}
            </button>
          </form>

          {error && <div className="alert alert-error" style={{ marginTop: "1.2rem" }}>{error}</div>}

          {order && (
            <div className="card" style={{ marginTop: "1.5rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                <h3 style={{ margin: 0 }}>{order.orderNumber}</h3>
                <span
                  className="badge"
                  style={{ background: STATUS_COLORS[order.status] + "22", color: STATUS_COLORS[order.status] }}
                >
                  {STATUS_LABELS[order.status]}
                </span>
              </div>
              <p className="text-muted" style={{ fontSize: "0.88rem" }}>
                Placed on {new Date(order.createdAt).toLocaleDateString()}
              </p>
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
              {order.whatsappLink && (
                <a href={order.whatsappLink} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp btn-block" style={{ marginTop: "1rem" }}>
                  Continue on WhatsApp
                </a>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
