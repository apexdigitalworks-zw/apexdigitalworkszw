import { useEffect } from "react";

/**
 * Lightweight SEO helper — updates document title and meta description
 * per page without needing a heavier library like react-helmet.
 */
export default function SEO({ title, description }) {
  useEffect(() => {
    if (title) {
      document.title = `${title} | APEXDIGITALWORKSZW`;
    }
    if (description) {
      let tag = document.querySelector('meta[name="description"]');
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("name", "description");
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", description);
    }
  }, [title, description]);

  return null;
}
