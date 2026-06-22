// Central company info — change once here and it updates everywhere.
export const COMPANY = {
  name: "APEXDIGITALWORKSZW",
  tagline: "Digital Solutions That Work.",
  email: "apexdigitalworkszw@gmail.com",
  facebook: "https://www.facebook.com/apexdigitalworkzw",
  whatsappNumber: "263781909006",
  whatsappLink: "https://wa.me/263781909006",
  address: "Harare, Zimbabwe",
};

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export function buildWhatsappLink(message) {
  const text = encodeURIComponent(message || "Hello APEXDIGITALWORKSZW! I'd like to find out more about your services.");
  return `${COMPANY.whatsappLink}?text=${text}`;
}
