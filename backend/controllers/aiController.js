const { v4: uuidv4 } = require("uuid");
const ChatSession = require("../models/ChatSession");
const { getChatbotReply, generateContent } = require("../utils/ai");

// POST /api/ai/chat
async function chat(req, res, next) {
  try {
    const { message, sessionId } = req.body;
    if (!message || !message.trim()) {
      return res.status(400).json({ message: "Message cannot be empty" });
    }

    const sid = sessionId || uuidv4();
    let session = await ChatSession.findOne({ sessionId: sid });
    if (!session) {
      session = await ChatSession.create({
        sessionId: sid,
        user: req.user ? req.user._id : null,
        messages: [],
      });
    }

    session.messages.push({ sender: "user", text: message });

    const reply = await getChatbotReply(message, session.messages);
    session.messages.push({ sender: "bot", text: reply });
    await session.save();

    res.json({ sessionId: sid, reply });
  } catch (err) {
    next(err);
  }
}

// POST /api/ai/generate-content
async function generate(req, res, next) {
  try {
    const { topic, type } = req.body;
    if (!topic || !topic.trim()) {
      return res.status(400).json({ message: "Topic is required" });
    }

    const result = await generateContent(topic, type || "blog-post");
    res.json(result);
  } catch (err) {
    next(err);
  }
}

module.exports = { chat, generate };
