import React, { useState, useEffect } from "react";
import SEO from "../components/SEO";
import { useAuth } from "../context/AuthContext";
import { api } from "../data/api";

const STATUS_LABELS = {
  pending: "Pending Review",
  contacted_on_whatsapp: "Contacted on WhatsApp",
  in_progress: "In Progress",
  completed: "Completed",
  cancelled: "Cancelled",
};

export default function Dashboard() {
  const { user, token, updateProfile } = useAuth();
  const [tab, setTab] = useState("orders");
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  const [profileForm, setProfileForm] = useState({
    fullName: user?.fullName || "",
    phone: user?.phone || "",
    company: user?.company || "",
    address: user?.address || "",
  });
  const [profileStatus, setProfileStatus] = useState(null);

  useEffect(() => {
    async function loadOrders() {
      try {
        const data = await api.get("/orders/my", { Authorization: `Bearer ${token}` });
        setOrders(data.orders);
      } catch (err) {
        // silently ignore — dashboard still usable
      } finally {
        setLoadingOrders(false);
      }
    }
    loadOrders();
  }, [token]);

  async function handleProfileSubmit(e) {
    e.preventDefault();
    setProfileStatus(null);
    try {
      await updateProfile(profileForm);
      setProfileStatus({ type: "success", message: "Profile updated successfully." });
    } catch (err) {
      setProfileStatus({ type: "error", message: err.message });
    }
  }

  return (
    <>
      <SEO title="My Dashboard" description="Manage your APEXDIGITALWORKSZW account and view your order history." />
      <section className="section">
        <div className="container">
          <span className="eyebrow">My Account</span>
          <h1>Welcome back, {user?.fullName.split(" ")[0]}!</h1>

          <div className="dashboard-tabs">
            <button className={`dashboard-tab${tab === "orders" ? " active" : ""}`} onClick={() => setTab("orders")}>
              My Orders
            </button>
            <button className={`dashboard-tab${tab === "profile" ? " active" : ""}`} onClick={() => setTab("profile")}>
              Profile Settings
            </button>
          </div>

          {tab === "orders" && (
            <div className="card">
              <h3>Order History</h3>
              {loadingOrders && <p className="text-muted">Loading your orders...</p>}
              {!loadingOrders && orders.length === 0 && (
                <p className="text-muted">You haven't placed any orders yet.</p>
              )}
              {orders.map((order) => (
                <div className="order-list-item" key={order._id}>
                  <div>
                    <strong>{order.orderNumber}</strong>
                    <br />
                    <span className="text-muted" style={{ fontSize: "0.82rem" }}>
                      {order.items.length} item(s) · ${order.totalEstimate} · {new Date(order.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
                    <span className="badge">{STATUS_LABELS[order.status]}</span>
                    {order.whatsappLink && (
                      <a href={order.whatsappLink} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp btn-sm">
                        WhatsApp
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === "profile" && (
            <div className="card" style={{ maxWidth: 540 }}>
              <h3>Profile Settings</h3>
              {profileStatus && <div className={`alert alert-${profileStatus.type}`}>{profileStatus.message}</div>}
              <form onSubmit={handleProfileSubmit}>
                <div className="field">
                  <label>Full Name</label>
                  <input
                    value={profileForm.fullName}
                    onChange={(e) => setProfileForm((f) => ({ ...f, fullName: e.target.value }))}
                  />
                </div>
                <div className="field">
                  <label>Email Address</label>
                  <input value={user?.email} disabled style={{ background: "var(--color-mist)", color: "var(--color-text-muted)" }} />
                  <p className="helper-text">Email cannot be changed. Contact support if you need to update it.</p>
                </div>
                <div className="field">
                  <label>Phone Number</label>
                  <input
                    value={profileForm.phone}
                    onChange={(e) => setProfileForm((f) => ({ ...f, phone: e.target.value }))}
                    placeholder="+263 7XX XXX XXX"
                  />
                </div>
                <div className="field">
                  <label>Company</label>
                  <input
                    value={profileForm.company}
                    onChange={(e) => setProfileForm((f) => ({ ...f, company: e.target.value }))}
                  />
                </div>
                <div className="field">
                  <label>Address</label>
                  <input
                    value={profileForm.address}
                    onChange={(e) => setProfileForm((f) => ({ ...f, address: e.target.value }))}
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
              </form>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
