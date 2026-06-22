# APEXDIGITALWORKSZW — Full-Stack Website

A complete full-stack web application for **APEXDIGITALWORKSZW**, a Zimbabwean digital agency
offering graphic design, website development, digital marketing, Microsoft Suite services,
online business essentials, and tech installations.

This project contains two independent applications:

```
apexdigitalworkszw/
├── frontend/   → React (Vite) website — pages, cart, dashboard, AI chatbot UI
├── backend/    → Node.js + Express + MongoDB API — auth, orders, email, analytics, AI
└── README.md   → you are here
```

---

## 1. What's Included

### Front-End (React + Vite)
- Fully responsive design (mobile + desktop), brand colors (white, royal blue, warm accent)
- Pages: Home, About Us, Services (+ 6 category pages with 10 services each), Policies
  (Terms / Privacy / Refund), Projects, Contact, Login/Register, Cart, Checkout, Order
  Confirmation, Order Tracking, User Dashboard, Admin Dashboard
- Cart & checkout flow with guest or logged-in checkout
- Every order generates a WhatsApp deep-link pre-filled with order details
- Floating WhatsApp button + AI chatbot widget on every page
- SEO meta tags, Open Graph tags, sitemap.xml, robots.txt, structured data (JSON-LD)
- Newsletter signup, contact form, feedback form

### Back-End (Node.js + Express + MongoDB)
- JWT-based authentication (register/login/profile/change password)
- Cart/checkout API with service catalog validation and pricing
- WhatsApp order-tracking link generation
- Transactional email via Nodemailer (order confirmations, contact form, feedback) — sends
  directly to **apexdigitalworkszw@gmail.com**
- Live analytics tracking (page visits, engagement events) + an aggregated dashboard endpoint
- Ad management API (CRUD + impression/click tracking) for banner/Google Ads style placements
- AI chatbot endpoint + AI content generator endpoint (works out of the box with a rule-based
  fallback; can be upgraded to a real AI model by adding an API key)
- MongoDB models for Users, Orders, Feedback, Newsletter subscribers, Analytics, Ads, Chat sessions

---

## 2. Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
- A MongoDB database — either:
  - [MongoDB Atlas](https://www.mongodb.com/atlas) (free tier is enough to start), or
  - A local MongoDB install (`mongodb://localhost:27017`)
- A Gmail account with an **App Password** for sending email (recommended over your normal
  password). Generate one at https://myaccount.google.com/apppasswords once 2-Step Verification
  is enabled on the Gmail account.

---

## 3. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
```

Open `.env` and fill in your real values:

```
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=a-long-random-secret-string
SMTP_USER=apexdigitalworkszw@gmail.com
SMTP_PASS=your-gmail-app-password
```

Then seed an initial admin account and sample ads:

```bash
npm run seed
```

This creates an admin login:
- **Email:** admin@apexdigitalworkszw.com
- **Password:** ChangeMe123!

⚠️ **Log in and change this password immediately after first use.**

Start the backend:

```bash
npm run dev     # development (auto-restarts on changes)
# or
npm start       # production
```

The API will run at `http://localhost:5000` by default. Test it's alive:

```bash
curl http://localhost:5000/api/health
```

---

## 4. Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
```

By default `.env` points the frontend at `http://localhost:5000/api`. Update
`VITE_API_BASE_URL` if your backend runs elsewhere (e.g. your deployed API URL).

Start the frontend:

```bash
npm run dev
```

Visit `http://localhost:5173` in your browser.

To build for production:

```bash
npm run build
```

This outputs a static `dist/` folder ready to deploy to any static host (Netlify, Vercel,
GitHub Pages, S3, etc.) or to be served by the backend/Nginx.

---

## 5. Deployment Notes

### Backend
Deploy `backend/` to any Node-friendly host: Render, Railway, Heroku, a VPS, etc.
- Set all variables from `.env.example` in your host's environment variable settings
- Make sure `CLIENT_URL` matches your deployed frontend's URL (for CORS)
- Use MongoDB Atlas for a managed, production-ready database

### Frontend
Deploy the built `frontend/dist/` folder to any static host: Netlify, Vercel, Cloudflare
Pages, GitHub Pages, or your own Nginx/Apache server.
- Set `VITE_API_BASE_URL` to your deployed backend's public API URL **before** running
  `npm run build` (Vite bakes env vars in at build time)

### Domain & Email
- Point your domain's DNS to your hosting provider
- Update the `og:url`, `canonical`, and `sitemap.xml` URLs in `frontend/index.html` /
  `frontend/public/sitemap.xml` to match your real domain once live

---

## 6. Updating Company Info, Prices & Services

- **Company details** (email, WhatsApp number, Facebook link): edit
  `frontend/src/data/constants.js` and the equivalent variables in `backend/.env`
- **Services & prices**: edit `frontend/src/data/services.js` (frontend display) and
  `backend/config/services.js` (backend pricing/validation) — keep both in sync
- **Brand colors/fonts**: edit the CSS variables at the top of `frontend/src/styles/global.css`

---

## 7. AI Features

The AI chatbot and content generator work immediately with **no API key required** — they use
a built-in rule-based responder tuned to APEXDIGITALWORKSZW's services and FAQs.

To connect a real AI model instead, set in `backend/.env`:

```
AI_PROVIDER=anthropic
AI_API_KEY=your-api-key-here
AI_MODEL=claude-sonnet-4-6
```

The code in `backend/utils/ai.js` will automatically switch to calling the live model and falls
back to the rule-based responder if the request ever fails.

---

## 8. Default Admin Access

After running `npm run seed` in the backend:

| Field    | Value                          |
|----------|--------------------------------|
| Email    | admin@apexdigitalworkszw.com   |
| Password | ChangeMe123!                   |

Log in at `/login` on the frontend, then visit `/admin` for the live analytics dashboard, order
management, ad management, AI content generator, and feedback/newsletter views.

---

## 9. Support

Questions about this codebase can be directed to the developer who built it for you. For
APEXDIGITALWORKSZW business inquiries, customers should use:

- Email: apexdigitalworkszw@gmail.com
- WhatsApp: https://wa.me/263781909006
- Facebook: https://www.facebook.com/apexdigitalworkzw
