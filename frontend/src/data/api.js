import { API_BASE_URL } from "../data/constants";

async function request(path, options = {}) {
const { headers, ...rest } = options;

// 🔥 GET TOKEN
const token = localStorage.getItem("token");

const res = await fetch(`${API_BASE_URL}${path}`, {
...rest,
headers: {
"Content-Type": "application/json",
...(token ? { Authorization: `Bearer ${token}` } : {}), // ✅ FIX
...(headers || {}),
},
});

const data = await res.json().catch(() => ({}));

if (!res.ok) {
throw new Error(data.message || "Something went wrong. Please try again.");
}

return data;
}

export const api = {
get: (path, headers) => request(path, { method: "GET", headers }),
post: (path, body, headers) =>
request(path, {
method: "POST",
body: JSON.stringify(body),
headers,
}),
put: (path, body, headers) =>
request(path, {
method: "PUT",
body: JSON.stringify(body),
headers,
}),
};

// 🔥 FIX ANALYTICS TOO
export function trackEvent(eventType, label = "", meta = {}) {
try {
const token = localStorage.getItem("token");

```
fetch(`${API_BASE_URL}/analytics/event`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  },
  body: JSON.stringify({
    eventType,
    label,
    path: window.location.pathname,
    meta,
  }),
}).catch(() => {});
```

} catch {
// ignore errors
}
}
