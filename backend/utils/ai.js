// AI helper for the chatbot and content generator.
//
// If AI_PROVIDER and AI_API_KEY are set in .env, this module calls a real
// AI model (Anthropic-compatible /v1/messages endpoint). Otherwise it falls
// back to a rule-based responder so the chatbot and content generator still
// work out of the box with zero configuration.

const { SERVICE_CATEGORIES } = require("../config/services");

const COMPANY_FACTS = `
APEXDIGITALWORKSZW is a Zimbabwe-based digital agency offering:
1. Graphic Designing 2. Website Development 3. Digital Marketing
4. Microsoft Suite Services 5. Online Essentials 6. Tech Installations
Contact email: ${process.env.COMPANY_EMAIL || "apexdigitalworkszw@gmail.com"}
WhatsApp: https://wa.me/${process.env.COMPANY_WHATSAPP || "263781909006"}
Facebook: ${process.env.COMPANY_FACEBOOK || "https://www.facebook.com/apexdigitalworkzw"}
`;

async function callExternalAI(prompt, systemPrompt) {
  if (!process.env.AI_API_KEY || process.env.AI_PROVIDER === "none") {
    return null; // signal caller to use fallback
  }

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.AI_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: process.env.AI_MODEL || "claude-sonnet-4-6",
        max_tokens: 600,
        system: systemPrompt,
        messages: [{ role: "user", content: prompt }],
      }),
    });
    const data = await response.json();
    const textBlock = (data.content || []).find((b) => b.type === "text");
    return textBlock ? textBlock.text : null;
  } catch (err) {
    console.error("[AI] External provider call failed:", err.message);
    return null;
  }
}

/**
 * Rule-based fallback chatbot. Keyword-matches the user's message against
 * common customer questions so the bot is genuinely useful even with no
 * AI API key configured.
 */
function fallbackChatbotReply(message) {
  const msg = message.toLowerCase();

  const findCategory = SERVICE_CATEGORIES.find((cat) =>
    msg.includes(cat.name.toLowerCase().split(" ")[0])
  );

  if (msg.includes("price") || msg.includes("cost") || msg.includes("how much")) {
    return "Pricing depends on the specific service and scope of your project. You can view starting prices on our Services page, add what you need to your cart, and checkout to get an instant estimate — or chat with us directly on WhatsApp for a custom quote.";
  }

  if (msg.includes("whatsapp") || msg.includes("contact") || msg.includes("call")) {
    return `You can reach our team directly on WhatsApp: https://wa.me/${process.env.COMPANY_WHATSAPP || "263781909006"} or by email at ${process.env.COMPANY_EMAIL || "apexdigitalworkszw@gmail.com"}.`;
  }

  if (msg.includes("hello") || msg.includes("hi") || msg.includes("hey")) {
    return "Hello! Welcome to APEXDIGITALWORKSZW 👋 I can help you learn about our services — Graphic Design, Web Development, Digital Marketing, Microsoft Suite, Online Essentials, and Tech Installations. What are you looking for today?";
  }

  if (findCategory) {
    const list = findCategory.services.map((s) => s.name).join(", ");
    return `Great choice! Our ${findCategory.name} category includes: ${list}. Would you like to add any of these to your cart, or get a custom quote via WhatsApp?`;
  }

  if (msg.includes("website") || msg.includes("web")) {
    return "We build portfolio sites, e-commerce stores, corporate websites, blogs, landing pages, WordPress sites, and custom web apps — all responsive and SEO optimized. Want to see our Website Development packages?";
  }

  if (msg.includes("logo") || msg.includes("design") || msg.includes("brand")) {
    return "Our Graphic Designing team handles logos, business cards, flyers, brochures, social media graphics, brand kits, and more. Check out the Services page to add one to your cart!";
  }

  if (msg.includes("marketing") || msg.includes("ads") || msg.includes("seo")) {
    return "Our Digital Marketing services cover social media marketing, Google & Facebook Ads, email marketing, content marketing, influencer marketing, and SEO campaigns to help you grow online.";
  }

  if (msg.includes("cctv") || msg.includes("starlink") || msg.includes("wifi") || msg.includes("install")) {
    return "Our Tech Installations team handles CCTV, Starlink activation, Wi-Fi & network setup, smart home systems, biometric access, and more — on-site installation across Zimbabwe.";
  }

  if (msg.includes("order") || msg.includes("track")) {
    return "Every order gets a unique Order Number and is linked straight to a WhatsApp chat with our team so you can track progress in real time. You can also log in to your account to see your order history.";
  }

  return "Thanks for reaching out! I can tell you about our services, pricing, or help you place an order. You can also chat with a real team member anytime on WhatsApp for a fast response.";
}

async function getChatbotReply(message, history = []) {
  const systemPrompt = `You are the friendly, helpful AI customer service assistant for APEXDIGITALWORKSZW, a Zimbabwean digital agency. Be concise (2-4 sentences), warm, and professional. Use these facts about the company:\n${COMPANY_FACTS}\nIf you don't know specific pricing, suggest the customer check the Services page or contact via WhatsApp for a custom quote. Never invent information not provided here.`;

  const aiReply = await callExternalAI(message, systemPrompt);
  if (aiReply) return aiReply;

  return fallbackChatbotReply(message);
}

/**
 * Rule-based fallback content generator for blog posts / project ideas.
 */
function fallbackContentGenerator(topic, type) {
  const cleanTopic = topic.trim();

  if (type === "project-idea") {
    return {
      title: `Project Spotlight: ${cleanTopic}`,
      content:
        `Looking to bring "${cleanTopic}" to life? Here's how APEXDIGITALWORKSZW would approach it:\n\n` +
        `1. Discovery — We start by understanding your goals, audience, and brand for "${cleanTopic}".\n` +
        `2. Design — Our graphic design team creates visual concepts aligned with your brand identity.\n` +
        `3. Build — Depending on scope, our web development or tech installation team builds the solution.\n` +
        `4. Launch & Promote — We use digital marketing and SEO to get "${cleanTopic}" in front of the right audience.\n` +
        `5. Support — Ongoing maintenance and analytics keep everything running smoothly.\n\n` +
        `Ready to get started? Reach out on WhatsApp or browse our Services page to build your custom package.`,
    };
  }

  // default: blog-post
  return {
    title: `${cleanTopic}: What Every Small Business in Zimbabwe Should Know`,
    content:
      `In today's competitive market, "${cleanTopic}" is more important than ever for businesses across Zimbabwe looking to stand out online.\n\n` +
      `At APEXDIGITALWORKSZW, we've seen firsthand how the right strategy around "${cleanTopic}" can transform a small business into a recognizable brand. Whether it's through stronger visual identity, a faster website, smarter digital marketing, or reliable tech infrastructure, the fundamentals remain the same: know your audience, stay consistent, and invest in quality.\n\n` +
      `Here are a few practical steps to get started with "${cleanTopic}":\n` +
      `- Audit what you currently have and identify gaps\n` +
      `- Set clear, measurable goals\n` +
      `- Partner with a team that understands both the technical and creative sides\n` +
      `- Track performance and adjust your approach regularly\n\n` +
      `Want help putting this into action? The APEXDIGITALWORKSZW team offers end-to-end support, from design to development to marketing. Get in touch via WhatsApp or email to discuss your next project.`,
  };
}

async function generateContent(topic, type = "blog-post") {
  const systemPrompt = `You are a marketing copywriter for APEXDIGITALWORKSZW, a Zimbabwean digital agency offering graphic design, web development, digital marketing, Microsoft Suite services, online business essentials, and tech installations. Write a ${type === "project-idea" ? "short project idea brief" : "blog post"} about the given topic. Keep it practical, locally relevant to Zimbabwe/Southern Africa where appropriate, and naturally mention how APEXDIGITALWORKSZW's services could help. Return plain text only, no markdown headers.`;

  const aiReply = await callExternalAI(topic, systemPrompt);
  if (aiReply) {
    return { title: topic, content: aiReply };
  }

  return fallbackContentGenerator(topic, type);
}

module.exports = { getChatbotReply, generateContent };
