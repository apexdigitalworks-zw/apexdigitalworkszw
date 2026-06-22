import React, { useState, useRef, useEffect } from "react";
import { api, trackEvent } from "../data/api";
import { buildWhatsappLink } from "../data/constants";

const WELCOME_MESSAGE = {
  sender: "bot",
  text:
    "Hi there! 👋 I'm the APEXDIGITALWORKSZW assistant. Ask me about our services, pricing, or how to place an order!",
};

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, sending]);

  function toggleOpen() {
    const next = !open;
    setOpen(next);
    if (next) trackEvent("chatbot_opened");
  }

  async function handleSend(e) {
    e.preventDefault();
    const text = input.trim();
    if (!text || sending) return;

    setMessages((prev) => [...prev, { sender: "user", text }]);
    setInput("");
    setSending(true);
    trackEvent("chatbot_message", text.slice(0, 60));

    try {
      const data = await api.post("/ai/chat", { message: text, sessionId });
      setSessionId(data.sessionId);
      setMessages((prev) => [...prev, { sender: "bot", text: data.reply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text:
            "Sorry, I'm having trouble connecting right now. You can reach our team directly on WhatsApp instead.",
        },
      ]);
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      <button
        className="chatbot-toggle"
        onClick={toggleOpen}
        aria-label={open ? "Close chat assistant" : "Open chat assistant"}
      >
        {open ? "✕" : "💬"}
      </button>

      {open && (
        <div className="chatbot-window" role="dialog" aria-label="AI Chat Assistant">
          <div className="chatbot-header">
            <div>
              <h4>APEX Assistant</h4>
              <p>Usually replies instantly</p>
            </div>
            <button className="chatbot-close" onClick={toggleOpen} aria-label="Close chat">
              ✕
            </button>
          </div>

          <div className="chatbot-messages" ref={scrollRef}>
            {messages.map((m, idx) => (
              <div key={idx} className={`chatbot-msg ${m.sender}`}>
                {m.text}
              </div>
            ))}
            {sending && (
              <div className="chatbot-msg bot chatbot-typing">
                <span></span><span></span><span></span>
              </div>
            )}
            {messages.length > 2 && (
              <a
                href={buildWhatsappLink("Hi! I was chatting with your website assistant and would like to speak with a real person.")}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: "0.78rem", textAlign: "center", color: "var(--color-royal)" }}
              >
                Prefer a human? Continue on WhatsApp →
              </a>
            )}
          </div>

          <form className="chatbot-input-row" onSubmit={handleSend}>
            <input
              type="text"
              placeholder="Type your question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              aria-label="Type your message"
            />
            <button type="submit" className="chatbot-send" aria-label="Send message" disabled={sending}>
              ➤
            </button>
          </form>
        </div>
      )}
    </>
  );
}
