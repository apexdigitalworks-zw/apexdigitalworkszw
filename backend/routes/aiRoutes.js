const express = require("express");
const router = express.Router();
const { chat, generate } = require("../controllers/aiController");

router.post("/chat", chat);
router.post("/generate-content", generate);

module.exports = router;
