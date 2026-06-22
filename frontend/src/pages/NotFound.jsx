import React from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";

export default function NotFound() {
  return (
    <>
      <SEO title="Page Not Found" description="The page you're looking for doesn't exist." />
      <div className="container section empty-state">
        <div className="icon">🧭</div>
        <h1>404 — Page Not Found</h1>
        <p className="text-muted">The page you're looking for doesn't exist or may have moved.</p>
        <Link to="/" className="btn btn-primary">
          Back to Home
        </Link>
      </div>
    </>
  );
}
