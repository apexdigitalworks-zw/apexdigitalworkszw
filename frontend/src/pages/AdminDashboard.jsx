import React, { useState, useEffect, useCallback } from "react";
import SEO from "../components/SEO";
import { useAuth } from "../context/AuthContext";
import { api } from "../data/api";

const TABS = [
  { key: "overview", label: "Live Overview" },
  { key: "orders", label: "Orders" },
  { key: "ads", label: "Ad Management" },
  { key: "content", label: "AI Content Generator" },
  { key: "feedback", label: "Feedback & Subscribers" },
];

export default function AdminDashboard() {
  const { token } = useAuth();
  const [tab, setTab] = useState("overview");

  return (
    <>
      <SEO title="Admin Dashboard" description="APEXDIGITALWORKSZW admin dashboard for analytics, orders, and content management." />
      <section className="section">
        <div className="container">
          <span className="eyebrow">Admin</span>
          <h1>Admin Dashboard</h1>

          <div className="dashboard-tabs">
            {TABS.map((t) => (
              <button
                key={t.key}
                className={`dashboard-tab${tab === t.key ? " active" : ""}`}
                onClick={() => setTab(t.key)}
              >
                {t.label}
              </button>
            ))}
          </div>

          {tab === "overview" && <OverviewTab token={token} />}
          {tab === "orders" && <OrdersTab token={token} />}
          {tab === "ads" && <AdsTab token={token} />}
          {tab === "content" && <ContentGeneratorTab />}
          {tab === "feedback" && <FeedbackTab token={token} />}
        </div>
      </section>
    </>
  );
}

// ===================== Live Overview =====================
function OverviewTab({ token }) {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    try {
      const data = await api.get("/analytics/dashboard", { Authorization: `Bearer ${token}` });
      setStats(data);
    } catch (err) {
      setError(err.message);
    }
  }, [token]);

  useEffect(() => {
    load();
    const interval = setInterval(load, 30000); // refresh every 30s for "live" feel
    return () => clearInterval(interval);
  }, [load]);

  if (error) return <div className="alert alert-error">{error}</div>;
  if (!stats) return <p className="text-muted">Loading live stats...</p>;

  return (
    <div>
      <div className="grid grid-4">
        <div className="card stat-card">
          <span className="value">{stats.visits.last24h}</span>
          <span className="label">Visits (Last 24h)</span>
        </div>
        <div className="card stat-card">
          <span className="value">{stats.visits.last7d}</span>
          <span className="label">Visits (Last 7 days)</span>
        </div>
        <div className="card stat-card">
          <span className="value">{stats.visits.uniqueVisitors30d}</span>
          <span className="label">Unique Visitors (30d)</span>
        </div>
        <div className="card stat-card">
          <span className="value">${stats.revenueEstimate}</span>
          <span className="label">Revenue Estimate (Active Orders)</span>
        </div>
        <div className="card stat-card">
          <span className="value">{stats.orders.total}</span>
          <span className="label">Total Orders</span>
        </div>
        <div className="card stat-card">
          <span className="value">{stats.orders.pending}</span>
          <span className="label">Pending Orders</span>
        </div>
        <div className="card stat-card">
          <span className="value">{stats.users.total}</span>
          <span className="label">Registered Users</span>
        </div>
        <div className="card stat-card">
          <span className="value">{stats.newsletter.activeSubscribers}</span>
          <span className="label">Newsletter Subscribers</span>
        </div>
      </div>

      <div className="grid grid-2" style={{ marginTop: "1.5rem" }}>
        <div className="card">
          <h3>Top Pages</h3>
          <table className="table-simple">
            <thead><tr><th>Path</th><th>Views</th></tr></thead>
            <tbody>
              {stats.topPages.map((p) => (
                <tr key={p._id}><td>{p._id}</td><td>{p.count}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="card">
          <h3>Engagement Events</h3>
          <table className="table-simple">
            <thead><tr><th>Event</th><th>Count</th></tr></thead>
            <tbody>
              {stats.eventCounts.map((e) => (
                <tr key={e._id}><td>{e._id}</td><td>{e.count}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <p className="helper-text">Auto-refreshes every 30 seconds.</p>
    </div>
  );
}

// ===================== Orders =====================
function OrdersTab({ token }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      const data = await api.get("/orders/admin/all", { Authorization: `Bearer ${token}` });
      setOrders(data.orders);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => { load(); }, [load]);

  async function updateStatus(orderId, status) {
    await api.put(`/orders/${orderId}/status`, { status }, { Authorization: `Bearer ${token}` });
    load();
  }

  if (loading) return <p className="text-muted">Loading orders...</p>;

  return (
    <div className="card">
      <h3>All Orders ({orders.length})</h3>
      <table className="table-simple">
        <thead>
          <tr><th>Order #</th><th>Customer</th><th>Total</th><th>Status</th><th>Update</th></tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o._id}>
              <td>{o.orderNumber}</td>
              <td>{o.guestName} <br /><span className="text-muted">{o.guestEmail}</span></td>
              <td>${o.totalEstimate}</td>
              <td><span className="badge">{o.status}</span></td>
              <td>
                <select
                  defaultValue={o.status}
                  onChange={(e) => updateStatus(o._id, e.target.value)}
                  style={{ padding: "0.4rem", borderRadius: "6px", border: "1px solid var(--color-border)" }}
                >
                  <option value="pending">Pending</option>
                  <option value="contacted_on_whatsapp">Contacted on WhatsApp</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ===================== Ad Management =====================
function AdsTab({ token }) {
  const [ads, setAds] = useState([]);
  const [form, setForm] = useState({ title: "", type: "banner", placement: "home_hero", targetUrl: "" });
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      const data = await api.get("/ads/admin/all", { Authorization: `Bearer ${token}` });
      setAds(data.ads);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => { load(); }, [load]);

  async function handleCreate(e) {
    e.preventDefault();
    await api.post("/ads", form, { Authorization: `Bearer ${token}` });
    setForm({ title: "", type: "banner", placement: "home_hero", targetUrl: "" });
    load();
  }

  async function toggleActive(ad) {
    await api.put(`/ads/${ad._id}`, { isActive: !ad.isActive }, { Authorization: `Bearer ${token}` });
    load();
  }

  return (
    <div className="grid grid-2" style={{ gap: "2rem", alignItems: "flex-start" }}>
      <div className="card">
        <h3>Create New Ad</h3>
        <form onSubmit={handleCreate}>
          <div className="field">
            <label>Title</label>
            <input required value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} />
          </div>
          <div className="field">
            <label>Type</label>
            <select value={form.type} onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}>
              <option value="banner">Banner</option>
              <option value="google_ads">Google Ads</option>
              <option value="sidebar">Sidebar</option>
              <option value="popup">Popup</option>
            </select>
          </div>
          <div className="field">
            <label>Placement</label>
            <select value={form.placement} onChange={(e) => setForm((f) => ({ ...f, placement: e.target.value }))}>
              <option value="home_hero">Home Hero</option>
              <option value="home_footer">Home Footer</option>
              <option value="services_top">Services Top</option>
              <option value="sidebar">Sidebar</option>
              <option value="global">Global</option>
            </select>
          </div>
          <div className="field">
            <label>Target URL</label>
            <input value={form.targetUrl} onChange={(e) => setForm((f) => ({ ...f, targetUrl: e.target.value }))} placeholder="/services/website-development" />
          </div>
          <button type="submit" className="btn btn-primary btn-block">Create Ad</button>
        </form>
      </div>

      <div className="card">
        <h3>Active Ads ({ads.length})</h3>
        {loading && <p className="text-muted">Loading...</p>}
        {ads.map((ad) => (
          <div className="order-list-item" key={ad._id}>
            <div>
              <strong>{ad.title}</strong>
              <br />
              <span className="text-muted" style={{ fontSize: "0.8rem" }}>
                {ad.placement} · {ad.impressions} impressions · {ad.clicks} clicks
              </span>
            </div>
            <button className="btn btn-sm btn-outline" onClick={() => toggleActive(ad)}>
              {ad.isActive ? "Deactivate" : "Activate"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ===================== AI Content Generator =====================
function ContentGeneratorTab() {
  const [topic, setTopic] = useState("");
  const [type, setType] = useState("blog-post");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleGenerate(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await api.post("/ai/generate-content", { topic, type });
      setResult(data);
    } catch (err) {
      setResult({ title: "Error", content: err.message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid grid-2" style={{ gap: "2rem", alignItems: "flex-start" }}>
      <div className="card">
        <h3>AI Content Generator</h3>
        <p className="text-muted" style={{ fontSize: "0.88rem" }}>
          Generate blog post drafts or project idea briefs to speed up your content marketing.
        </p>
        <form onSubmit={handleGenerate}>
          <div className="field">
            <label>Topic</label>
            <input required value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="e.g. Why every small business needs a website" />
          </div>
          <div className="field">
            <label>Content Type</label>
            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="blog-post">Blog Post</option>
              <option value="project-idea">Project Idea</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
            {loading ? "Generating..." : "Generate Content"}
          </button>
        </form>
      </div>

      <div className="card">
        <h3>Generated Content</h3>
        {!result && <p className="text-muted">Your generated content will appear here.</p>}
        {result && (
          <>
            <h4>{result.title}</h4>
            <p style={{ whiteSpace: "pre-line", fontSize: "0.9rem" }}>{result.content}</p>
          </>
        )}
      </div>
    </div>
  );
}

// ===================== Feedback & Newsletter =====================
function FeedbackTab({ token }) {
  const [feedback, setFeedback] = useState([]);
  const [subscribers, setSubscribers] = useState([]);

  useEffect(() => {
    api.get("/feedback/admin/all", { Authorization: `Bearer ${token}` }).then((d) => setFeedback(d.feedback)).catch(() => {});
    api.get("/newsletter/admin/all", { Authorization: `Bearer ${token}` }).then((d) => setSubscribers(d.subscribers)).catch(() => {});
  }, [token]);

  return (
    <div className="grid grid-2" style={{ gap: "2rem", alignItems: "flex-start" }}>
      <div className="card">
        <h3>Customer Feedback ({feedback.length})</h3>
        {feedback.map((f) => (
          <div className="order-list-item" key={f._id} style={{ display: "block" }}>
            <strong>{f.name}</strong> {f.rating && <span className="badge">{f.rating}/5</span>}
            <p className="text-muted" style={{ fontSize: "0.85rem", margin: "0.3rem 0 0" }}>{f.message}</p>
          </div>
        ))}
        {feedback.length === 0 && <p className="text-muted">No feedback yet.</p>}
      </div>

      <div className="card">
        <h3>Newsletter Subscribers ({subscribers.filter((s) => s.isActive).length})</h3>
        <table className="table-simple">
          <thead><tr><th>Email</th><th>Status</th></tr></thead>
          <tbody>
            {subscribers.map((s) => (
              <tr key={s._id}>
                <td>{s.email}</td>
                <td><span className="badge">{s.isActive ? "Active" : "Unsubscribed"}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
        {subscribers.length === 0 && <p className="text-muted">No subscribers yet.</p>}
      </div>
    </div>
  );
}
