import React from "react";
import SEO from "../components/SEO";

const VALUES = [
  { icon: "🎯", title: "Quality First", text: "We never ship work we wouldn't be proud to put our name on." },
  { icon: "🔍", title: "Transparency", text: "Clear pricing, clear timelines, and honest communication — always." },
  { icon: "🚀", title: "Growth-Driven", text: "Every project is measured by the real impact it has on your business." },
  { icon: "🌍", title: "Community Minded", text: "Proudly Zimbabwean, building solutions that empower local businesses." },
];

export default function About() {
  return (
    <>
      <SEO
        title="About Us"
        description="Learn about APEXDIGITALWORKSZW's mission, vision, and the team behind Zimbabwe's all-in-one digital agency."
      />

      <section className="section section-tight" style={{ background: "var(--color-mist)" }}>
        <div className="container">
          <span className="eyebrow">About APEXDIGITALWORKSZW</span>
          <h1 style={{ maxWidth: 700 }}>
            We're a team of designers, developers, marketers, and technicians — united by one goal.
          </h1>
          <p className="text-muted" style={{ maxWidth: 640, fontSize: "1.05rem" }}>
            APEXDIGITALWORKSZW was founded to give individuals and businesses in Zimbabwe access to
            world-class digital and technical services — without needing to coordinate five
            different vendors. From your first logo to your CCTV installation, we handle it all.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid grid-2" style={{ gap: "2rem" }}>
            <div className="card">
              <span className="eyebrow">Our Mission</span>
              <h2>Empowering businesses through accessible, end-to-end digital solutions.</h2>
              <p className="text-muted">
                We exist to remove the friction between a great idea and a working digital
                presence. Whether you're a startup needing your first website or an established
                company upgrading your security systems, our mission is to make professional,
                reliable service accessible and affordable.
              </p>
            </div>
            <div className="card">
              <span className="eyebrow">Our Vision</span>
              <h2>To be Zimbabwe's most trusted all-in-one digital and technical services brand.</h2>
              <p className="text-muted">
                We envision a future where every business — regardless of size — has the tools,
                technology, and online presence to compete confidently in a digital-first world,
                with APEXDIGITALWORKSZW as their trusted partner every step of the way.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-muted">
        <div className="container">
          <div className="section-header center">
            <span className="eyebrow">What Drives Us</span>
            <h2>Our Core Values</h2>
          </div>
          <div className="grid grid-4">
            {VALUES.map((v) => (
              <div className="card" key={v.title} style={{ textAlign: "center" }}>
                <div style={{ fontSize: "2rem", marginBottom: "0.6rem" }}>{v.icon}</div>
                <h3 style={{ fontSize: "1rem" }}>{v.title}</h3>
                <p className="text-muted" style={{ fontSize: "0.88rem", marginBottom: 0 }}>
                  {v.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
