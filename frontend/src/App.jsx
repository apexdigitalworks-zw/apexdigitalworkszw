import React from "react";
import { Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";


import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import ChatbotWidget from "./components/ChatbotWidget";
import PageVisitTracker from "./components/PageVisitTracker";
import { ProtectedRoute, AdminRoute } from "./components/ProtectedRoute";

import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import ServiceCategory from "./pages/ServiceCategory";
import Policies from "./pages/Policies";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import TrackOrder from "./pages/TrackOrder";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";

export default function App() {
return (
<> <PageVisitTracker /> <a href="#main-content" className="skip-link">Skip to main content</a> <Navbar /> <main id="main-content"> <Routes>
<Route path="/" element={<Home />} />
<Route path="/about" element={<About />} />
<Route path="/services" element={<Services />} />
<Route path="/services/:slug" element={<ServiceCategory />} />
<Route path="/policies" element={<Policies />} />
<Route path="/projects" element={<Projects />} />
<Route path="/contact" element={<Contact />} />
<Route path="/login" element={<Login />} />
<Route path="/register" element={<Register />} />
<Route path="/cart" element={<Cart />} />
<Route path="/checkout" element={<Checkout />} />
<Route path="/order-confirmation/:id" element={<OrderConfirmation />} />
<Route path="/track-order" element={<TrackOrder />} />
<Route
path="/dashboard"
element={ <ProtectedRoute> <Dashboard /> </ProtectedRoute>
}
/>
<Route
path="/admin"
element={ <AdminRoute> <AdminDashboard /> </AdminRoute>
}
/>
<Route path="*" element={<NotFound />} /> </Routes> </main> <Footer /> <WhatsAppButton /> <ChatbotWidget />

```
  <Analytics /> {/* ✅ ADD THIS AT THE VERY BOTTOM */}
</>
```

);
}

