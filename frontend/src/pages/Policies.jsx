import React from "react";
import SEO from "../components/SEO";
import { COMPANY } from "../data/constants";

export default function Policies() {
  return (
    <>
      <SEO
        title="Policies"
        description="Read APEXDIGITALWORKSZW's Terms of Service, Privacy Policy, and Refund Policy."
      />

      <section className="section section-tight" style={{ background: "var(--color-mist)" }}>
        <div className="container">
          <span className="eyebrow">Legal</span>
          <h1>Our Policies</h1>
          <p className="text-muted">
            Please read these policies carefully before using our website or services.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: 820 }}>
          <nav className="policy-nav">
            <a href="#terms" className="category-pill">Terms of Service</a>
            <a href="#privacy" className="category-pill">Privacy Policy</a>
            <a href="#refund" className="category-pill">Refund Policy</a>
          </nav>

          {/* ===== Terms of Service ===== */}
          <div id="terms" className="policy-section">
            <span className="badge">Terms of Service</span>
            <h2>Terms of Service</h2>
            <p className="policy-updated">Last updated: June 2026</p>
            <p>
              These Terms of Service ("Terms") govern your use of the APEXDIGITALWORKSZW website
              and services. By accessing our website, placing an order, or engaging our services,
              you agree to be bound by these Terms.
            </p>

            <h3>1. Services</h3>
            <p>
              APEXDIGITALWORKSZW provides graphic design, website development, digital marketing,
              Microsoft Suite services, online business essentials, and tech installation services.
              Service scope, pricing, and timelines are agreed upon per project and may be adjusted
              based on specific client requirements.
            </p>

            <h3>2. Orders & Communication</h3>
            <ol>
              <li>All orders placed via the website generate an order number and are followed up via WhatsApp or email to confirm final scope and pricing.</li>
              <li>Listed prices are starting estimates. Final pricing is confirmed after project scope is discussed.</li>
              <li>Clients are responsible for providing accurate information and timely feedback during the project lifecycle.</li>
            </ol>

            <h3>3. Payment</h3>
            <p>
              Payment terms (deposits, milestones, or full payment) will be communicated and agreed
              upon before work begins, unless otherwise stated. Work may be paused if agreed payment
              terms are not met.
            </p>

            <h3>4. Intellectual Property</h3>
            <p>
              Upon full payment, clients receive rights to the final deliverables as agreed in their
              project scope. APEXDIGITALWORKSZW reserves the right to showcase completed work in its
              portfolio unless the client requests confidentiality in writing.
            </p>

            <h3>5. Limitation of Liability</h3>
            <p>
              APEXDIGITALWORKSZW will perform services with reasonable skill and care but is not
              liable for indirect, incidental, or consequential damages arising from the use of our
              services, including third-party platform changes (e.g. hosting providers, social
              media platforms, or payment gateways) outside our control.
            </p>

            <h3>6. Changes to These Terms</h3>
            <p>
              We may update these Terms from time to time. Continued use of our website or services
              after changes are posted constitutes acceptance of the revised Terms.
            </p>
          </div>

          {/* ===== Privacy Policy ===== */}
          <div id="privacy" className="policy-section">
            <span className="badge">Privacy Policy</span>
            <h2>Privacy Policy</h2>
            <p className="policy-updated">Last updated: June 2026</p>
            <p>
              Your privacy matters to us. This policy explains what information we collect, how we
              use it, and the choices you have.
            </p>

            <h3>1. Information We Collect</h3>
            <ul>
              <li>Account information: name, email, phone number, and company name when you register or place an order.</li>
              <li>Order details: services selected, project notes, and order history.</li>
              <li>Usage data: pages visited, device type, and engagement events, used to improve our website.</li>
              <li>Communications: messages sent via our contact form, feedback form, or AI chat assistant.</li>
            </ul>

            <h3>2. How We Use Your Information</h3>
            <ul>
              <li>To process and fulfill orders, and to communicate with you about your project via email or WhatsApp.</li>
              <li>To respond to inquiries, feedback, and support requests.</li>
              <li>To send newsletters and promotional updates, which you may unsubscribe from at any time.</li>
              <li>To analyze website performance and improve our services through aggregated, anonymized analytics.</li>
            </ul>

            <h3>3. Data Sharing</h3>
            <p>
              We do not sell your personal information. We only share data with trusted service
              providers (such as our email or hosting providers) strictly to operate our services,
              and only to the extent necessary.
            </p>

            <h3>4. Data Security</h3>
            <p>
              We apply reasonable technical safeguards — including password hashing and secure
              authentication — to protect your data. However, no method of transmission over the
              internet is 100% secure.
            </p>

            <h3>5. Your Rights</h3>
            <p>
              You may request access to, correction of, or deletion of your personal data at any
              time by contacting us at {COMPANY.email}.
            </p>
          </div>

          {/* ===== Refund Policy ===== */}
          <div id="refund" className="policy-section">
            <span className="badge">Refund Policy</span>
            <h2>Refund Policy</h2>
            <p className="policy-updated">Last updated: June 2026</p>
            <p>
              We aim for client satisfaction on every project. Because our services involve custom
              creative, technical, and on-site work, refund eligibility depends on the type of
              service and stage of work.
            </p>

            <h3>1. Before Work Begins</h3>
            <p>
              If you cancel a project before any work has started, you are eligible for a full
              refund of any deposit paid, minus any non-recoverable third-party costs already
              incurred (e.g. domain registration, software licenses).
            </p>

            <h3>2. During Active Work</h3>
            <p>
              If a project is cancelled after work has begun, you will be refunded for any unstarted
              portion of the agreed scope. Payment for completed milestones or delivered work is
              non-refundable.
            </p>

            <h3>3. Digital Products & Completed Work</h3>
            <p>
              Once a digital deliverable (e.g. a logo, completed website, or marketing campaign) has
              been delivered and approved by the client, it is considered final and is not eligible
              for a refund. Revisions within the agreed scope are provided at no extra cost.
            </p>

            <h3>4. Tech Installations</h3>
            <p>
              For on-site installation services (CCTV, Starlink, networking, etc.), refunds for
              completed installations are not available; however, we offer a service warranty period
              to address any installation-related issues at no extra charge.
            </p>

            <h3>5. Requesting a Refund</h3>
            <p>
              To request a refund, please contact us at {COMPANY.email} or via WhatsApp with your
              order number. Approved refunds are processed within 7–14 business days.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
