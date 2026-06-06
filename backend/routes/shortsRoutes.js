const express = require("express");
const router = express.Router();
const { askGemini } = require("../utils/gemini");

router.post("/", async (req, res) => {
  try {
    const { topic, language, style } = req.body;
    if (!topic) return res.status(400).json({ error: "Topic is required" });

    const prompt = `You are a viral YouTube Shorts script writer. Your scripts get millions of views.

Write a YouTube Shorts script for:
Topic: "${topic}"
Language: ${language || "English"}
Style: ${style || "Entertaining"}

RULES:
- Maximum 60 seconds when read aloud
- Start with a HOOK that stops scrolling in 1 second
- Write ONLY the words to be spoken
- No labels, no headings, no directions
- Short punchy sentences — max 10 words per sentence
- Build tension or curiosity throughout
- End with a surprising fact, cliffhanger or call to action
- Sound like a real human speaking, not a robot
- Use power words: "shocking", "nobody tells you", "secret", "what if"

Write the script now:`;

    const result = await askGemini(prompt);

    const cleaned = result
      .replace(/\*\*/g, "")
      .replace(/\*/g, "")
      .replace(/#{1,6}\s*/g, "")
      .replace(/^(hook|intro|main|outro|cta|script|section)\s*[:：\-]?\s*/gim, "")
      .replace(/^\(.*?\)\s*/gm, "")
      .replace(/^\[.*?\]\s*/gm, "")
      .replace(/^---+$/gm, "")
      .replace(/\n{3,}/g, "\n\n")
      .trim();

    res.json({ success: true, result: cleaned });
  } catch (err) {
    console.error("Shorts error:", err.message);
    res.status(500).json({ error: "Failed to generate script" });
  }
});

module.exports = router;