import React from "react";
import { buildWhatsappLink } from "../data/constants";
import { trackEvent } from "../data/api";

export default function WhatsAppButton() {
  return (
    <a
      href={buildWhatsappLink("Hello APEXDIGITALWORKSZW! I'd like to chat about your services.")}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
      onClick={() => trackEvent("whatsapp_click", "floating_button")}
      aria-label="Chat with us on WhatsApp"
    >
      <span className="icon">✆</span>
      <span className="label">Chat on WhatsApp</span>
    </a>
  );
}
