import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { API_BASE_URL } from "../data/constants";

function getOrCreateSessionId() {
  let sid = sessionStorage.getItem("apex_session_id");
  if (!sid) {
    sid = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    sessionStorage.setItem("apex_session_id", sid);
  }
  return sid;
}

function isFirstVisitThisSession() {
  const seen = sessionStorage.getItem("apex_session_seen");
  if (!seen) {
    sessionStorage.setItem("apex_session_seen", "true");
    return true;
  }
  return false;
}

/**
 * Silently logs a page visit on every route change for the live tracking
 * dashboard. Fails silently if the backend is unreachable.
 */
export default function PageVisitTracker() {
  const location = useLocation();

  useEffect(() => {
    const sessionId = getOrCreateSessionId();
    const isUniqueVisitor = isFirstVisitThisSession();

    fetch(`${API_BASE_URL}/analytics/visit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        path: location.pathname,
        referrer: document.referrer,
        sessionId,
        isUniqueVisitor,
      }),
    }).catch(() => {});
  }, [location.pathname]);

  return null;
}
