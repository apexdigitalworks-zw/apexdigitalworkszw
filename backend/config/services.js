// Central catalog of all services offered by APEXDIGITALWORKSZW.
// This file is the single source of truth on the backend for service
// validation (cart/checkout) and is mirrored on the frontend in
// frontend/src/data/services.js for rendering.

const SERVICE_CATEGORIES = [
  {
    slug: "graphic-designing",
    name: "Graphic Designing",
    icon: "palette",
    description:
      "Eye-catching visual designs that build a memorable brand identity.",
    services: [
      { name: "Logo Design", price: 25 },
      { name: "Business Card Design", price: 10 },
      { name: "Flyer & Poster Design", price: 15 },
      { name: "Brochure Design", price: 20 },
      { name: "Social Media Graphics", price: 12 },
      { name: "Infographics", price: 18 },
      { name: "Packaging Design", price: 30 },
      { name: "Banner Ads", price: 15 },
      { name: "Brand Identity Kits", price: 60 },
      { name: "Custom Illustrations", price: 35 },
    ],
  },
  {
    slug: "website-development",
    name: "Website Development",
    icon: "code",
    description:
      "Modern, fast, and responsive websites built to convert visitors into clients.",
    services: [
      { name: "Portfolio Websites", price: 80 },
      { name: "E-commerce Websites", price: 250 },
      { name: "Corporate Websites", price: 200 },
      { name: "Blog Development", price: 90 },
      { name: "Landing Pages", price: 60 },
      { name: "WordPress Development", price: 120 },
      { name: "Custom Web Applications", price: 350 },
      { name: "Website Maintenance", price: 40 },
      { name: "SEO Optimization", price: 70 },
      { name: "Hosting Setup", price: 25 },
    ],
  },
  {
    slug: "digital-marketing",
    name: "Digital Marketing",
    icon: "megaphone",
    description:
      "Grow your audience and sales with data-driven marketing campaigns.",
    services: [
      { name: "Social Media Marketing", price: 80 },
      { name: "Google Ads Campaigns", price: 100 },
      { name: "Facebook Ads", price: 70 },
      { name: "Instagram Promotions", price: 60 },
      { name: "Email Marketing", price: 50 },
      { name: "Content Marketing", price: 65 },
      { name: "Influencer Marketing", price: 90 },
      { name: "Video Marketing", price: 85 },
      { name: "Analytics & Reporting", price: 40 },
      { name: "SEO Campaigns", price: 95 },
    ],
  },
  {
    slug: "microsoft-suite-services",
    name: "Microsoft Suite Services",
    icon: "file-text",
    description:
      "Professional document, spreadsheet, and productivity support for individuals and teams.",
    services: [
      { name: "Word Document Formatting", price: 10 },
      { name: "Excel Data Analysis", price: 25 },
      { name: "PowerPoint Presentations", price: 20 },
      { name: "Access Database Setup", price: 35 },
      { name: "Outlook Email Management", price: 15 },
      { name: "OneNote Organization", price: 10 },
      { name: "SharePoint Setup", price: 45 },
      { name: "Teams Collaboration Setup", price: 30 },
      { name: "Office Training", price: 40 },
      { name: "Template Creation", price: 15 },
    ],
  },
  {
    slug: "online-essentials",
    name: "Online Essentials",
    icon: "globe",
    description:
      "Everything you need to get your business legally and digitally set up online.",
    services: [
      { name: "Company Registration", price: 60 },
      { name: "Google Business Setup", price: 20 },
      { name: "Tax Clearance Setup", price: 40 },
      { name: "Return Management", price: 30 },
      { name: "Social Media Platforms Setup", price: 25 },
      { name: "Domain Registration", price: 15 },
      { name: "Business Email Setup", price: 20 },
      { name: "SSL Certificate Setup", price: 15 },
      { name: "Online Payment Integration", price: 50 },
      { name: "Cloud Storage Setup", price: 20 },
    ],
  },
  {
    slug: "tech-installations",
    name: "Tech Installations",
    icon: "settings",
    description:
      "On-site technical installations to keep your home or business connected and secure.",
    services: [
      { name: "CCTV Installations", price: 150 },
      { name: "Starlink Activations", price: 100 },
      { name: "Wi-Fi Setup", price: 40 },
      { name: "Router Configuration", price: 25 },
      { name: "Smart Home Setup", price: 120 },
      { name: "Network Cabling", price: 80 },
      { name: "Biometric Access Systems", price: 180 },
      { name: "Satellite TV Setup", price: 70 },
      { name: "VoIP Phone Setup", price: 60 },
      { name: "Server Installations", price: 220 },
    ],
  },
];

module.exports = { SERVICE_CATEGORIES };
