import React from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { items, removeItem, updateQuantity, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <>
        <SEO title="Your Cart" description="View and manage the services in your APEXDIGITALWORKSZW cart." />
        <div className="container section">
          <div className="empty-state">
            <div className="icon">🛒</div>
            <h2>Your cart is empty</h2>
            <p className="text-muted">Browse our services and add what you need to get started.</p>
            <Link to="/services" className="btn btn-primary">
              Explore Services
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SEO title="Your Cart" description="View and manage the services in your APEXDIGITALWORKSZW cart." />
      <section className="section">
        <div className="container">
          <h1>Your Cart</h1>
          <div className="grid" style={{ gridTemplateColumns: "2fr 1fr", gap: "2.5rem", alignItems: "flex-start" }}>
            <div className="card">
              <table className="cart-table">
                <thead>
                  <tr>
                    <th>Service</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Subtotal</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={`${item.category}-${item.service}`}>
                      <td>
                        <strong>{item.service}</strong>
                        <br />
                        <span className="text-muted" style={{ fontSize: "0.8rem" }}>{item.category}</span>
                      </td>
                      <td>${item.price}</td>
                      <td>
                        <div className="cart-qty-control">
                          <button onClick={() => updateQuantity(item.category, item.service, item.quantity - 1)} aria-label="Decrease quantity">−</button>
                          <span>{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.category, item.service, item.quantity + 1)} aria-label="Increase quantity">+</button>
                        </div>
                      </td>
                      <td>${item.price * item.quantity}</td>
                      <td>
                        <button className="cart-remove" onClick={() => removeItem(item.category, item.service)}>
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="cart-summary">
              <h3>Order Summary</h3>
              <div className="cart-summary-row">
                <span>Items ({items.reduce((s, i) => s + i.quantity, 0)})</span>
                <span>${totalPrice}</span>
              </div>
              <div className="cart-summary-row total">
                <span>Estimated Total</span>
                <span>${totalPrice}</span>
              </div>
              <p className="helper-text">
                Final pricing will be confirmed with our team based on your project scope.
              </p>
              <Link to="/checkout" className="btn btn-primary btn-block" style={{ marginTop: "1rem" }}>
                Proceed to Checkout
              </Link>
              <Link to="/services" className="btn btn-outline btn-block" style={{ marginTop: "0.6rem" }}>
                Add More Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
