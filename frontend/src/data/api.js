import { API_BASE_URL } from "../data/constants";

async function request(path, options = {}) {
  const { headers, ...rest } = options;
  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...rest,
    headers: { "Content-Type": "application/json", ...(headers || {}) },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || "Something went wrong. Please try again.");
  }
  return data;
}

export const api = {
  get: (path, headers) => request(path, { method: "GET", headers }),
  post: (path, body, headers) => request(path, { method: "POST", body: JSON.stringify(body), headers }),
  put: (path, body, headers) => request(path, { method: "PUT", body: JSON.stringify(body), headers }),
};

// Fire-and-forget helper for analytics so it never blocks the UI or throws to the user.
export function trackEvent(eventType, label = "", meta = {}) {
  try {
    fetch(`${API_BASE_URL}/analytics/event`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ eventType, label, path: window.location.pathname, meta }),
    }).catch(() => {});
  } catch {
    // swallow — analytics should never break the app
  }
}
