import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../data/constants";

/**
 * Renders the first active ad for a given placement (e.g. "home_hero",
 * "services_top"). Silently renders nothing if no ad is configured or the
 * API is unreachable, so it never breaks the page.
 */
export default function AdBanner({ placement }) {
  const [ad, setAd] = useState(null);

  useEffect(() => {
    let cancelled = false;
    fetch(`${API_BASE_URL}/ads?placement=${encodeURIComponent(placement)}`)
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled && data.ads && data.ads.length > 0) {
          setAd(data.ads[0]);
          fetch(`${API_BASE_URL}/ads/${data.ads[0]._id}/impression`, { method: "POST" }).catch(() => {});
        }
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [placement]);

  if (!ad) return null;

  function handleClick() {
    fetch(`${API_BASE_URL}/ads/${ad._id}/click`, { method: "POST" }).catch(() => {});
  }

  const isInternal = ad.targetUrl && ad.targetUrl.startsWith("/");

  return (
    <div className="container">
      <div className="ad-banner">
        <div>
          <span className="ad-label">Sponsored</span>
          <span className="ad-title">{ad.title}</span>
        </div>
        {ad.targetUrl && (
          isInternal ? (
            <Link to={ad.targetUrl} className="btn btn-accent btn-sm" onClick={handleClick}>
              Learn More
            </Link>
          ) : (
            <a href={ad.targetUrl} target="_blank" rel="noopener noreferrer" className="btn btn-accent btn-sm" onClick={handleClick}>
              Learn More
            </a>
          )
        )}
      </div>
    </div>
  );
}
