import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SEO from "../components/SEO";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const [form, setForm] = useState({ fullName: "", email: "", phone: "", company: "", password: "" });
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await register(form);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <SEO title="Sign Up" description="Create your APEXDIGITALWORKSZW account to order services and track your projects." />
      <div className="auth-wrapper">
        <div className="auth-card">
          <span className="eyebrow">Join Us</span>
          <h1>Create your account</h1>
          {error && <div className="alert alert-error">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="fullName">Full Name</label>
              <input id="fullName" name="fullName" required value={form.fullName} onChange={handleChange} placeholder="Your full name" />
            </div>
            <div className="field">
              <label htmlFor="email">Email Address</label>
              <input id="email" type="email" name="email" required value={form.email} onChange={handleChange} placeholder="you@email.com" />
            </div>
            <div className="field">
              <label htmlFor="phone">Phone Number</label>
              <input id="phone" name="phone" value={form.phone} onChange={handleChange} placeholder="+263 7XX XXX XXX" />
            </div>
            <div className="field">
              <label htmlFor="company">Company (optional)</label>
              <input id="company" name="company" value={form.company} onChange={handleChange} placeholder="Your business name" />
            </div>
            <div className="field">
              <label htmlFor="password">Password</label>
              <input id="password" type="password" name="password" required minLength={6} value={form.password} onChange={handleChange} placeholder="At least 6 characters" />
            </div>
            <button type="submit" className="btn btn-primary btn-block" disabled={submitting}>
              {submitting ? "Creating account..." : "Sign Up"}
            </button>
          </form>
          <p className="auth-switch">
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </div>
      </div>
    </>
  );
}
