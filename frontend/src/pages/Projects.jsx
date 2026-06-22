import React from "react";
import SEO from "../components/SEO";
import { buildWhatsappLink } from "../data/constants";

const PROJECTS = [
  { icon: "🏪", tag: "Website Development", title: "Local Retail E-commerce Store", text: "A full online store with payment integration and inventory management for a Harare-based retailer." },
  { icon: "🎨", tag: "Graphic Designing", title: "Brand Identity Kit for a Startup", text: "Complete brand kit including logo, business cards, and social media templates for a new fintech startup." },
  { icon: "📣", tag: "Digital Marketing", title: "Social Media Growth Campaign", text: "Grew a local business's Instagram following by 4x in three months through targeted content and ads." },
  { icon: "🛰️", tag: "Tech Installations", title: "Starlink & Network Setup for an Office", text: "End-to-end Starlink activation and office-wide network cabling for a growing logistics company." },
  { icon: "📊", tag: "Microsoft Suite Services", title: "Financial Reporting Templates", text: "Built reusable Excel dashboards and PowerPoint templates for a client's monthly reporting cycle." },
  { icon: "🌐", tag: "Online Essentials", title: "Business Registration & Online Setup", text: "Helped a new SME register their company, set up Google Business, domain, and business email." },
];

export default function Projects() {
  return (
    <>
      <SEO
        title="Projects"
        description="See examples of APEXDIGITALWORKSZW's work across web development, graphic design, digital marketing, and tech installations."
      />

      <section className="section section-tight" style={{ background: "var(--color-mist)" }}>
        <div className="container">
          <span className="eyebrow">Our Work</span>
          <h1 style={{ maxWidth: 700 }}>A glimpse into projects we're proud of.</h1>
          <p className="text-muted" style={{ maxWidth: 600 }}>
            These are representative examples of the kind of work we do across our service
            categories. Want to see something specific? Ask us on WhatsApp.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid grid-3">
            {PROJECTS.map((p) => (
              <div className="card project-card" key={p.title}>
                <div className="project-thumb">{p.icon}</div>
                <div className="project-body">
                  <span className="project-tag">{p.tag}</span>
                  <h3 style={{ fontSize: "1.05rem" }}>{p.title}</h3>
                  <p className="text-muted" style={{ fontSize: "0.88rem", marginBottom: 0 }}>
                    {p.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="cta-banner" style={{ marginTop: "3rem" }}>
            <h2>Have a project in mind?</h2>
            <p>Let's discuss your idea and turn it into a real, working solution.</p>
            <div className="cta-banner-actions">
              <a href={buildWhatsappLink("Hi! I have a project idea I'd like to discuss.")} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
                Discuss Your Project
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
