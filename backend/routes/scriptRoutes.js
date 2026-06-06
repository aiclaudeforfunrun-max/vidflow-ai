const express = require("express");
const router = express.Router();
const { askGemini } = require("../utils/gemini");

router.post("/", async (req, res) => {
  try {
    const { topic, language, length, style } = req.body;
    if (!topic) return res.status(400).json({ error: "Topic is required" });

    const prompt = `Write a YouTube video script in ${language || "English"}.

Topic: ${topic}
Style: ${style || "Informative"}
Length: ${length || "Medium (5-8 min)"}

VERY IMPORTANT RULES:
- Write ONLY the words the YouTuber will speak out loud
- Do NOT write any section names (no Hook, no Intro, no Main, no Outro, no CTA)
- Do NOT write any headings or labels
- Do NOT write stage directions like (Visual:) or [Music] or (0:00-0:30)
- Do NOT write Host: or Voiceover: or Speaker:
- Do NOT use asterisks, hashtags, dashes, bullets
- Do NOT write video title, language, topic label at the top
- Just write the pure spoken script from first word to last word
- Write naturally like a real YouTuber speaks
- Start with a powerful hook sentence immediately
- End with a natural goodbye`;

    const result = await askGemini(prompt);

    const cleaned = result
      .replace(/\*\*/g, "")
      .replace(/\*/g, "")
      .replace(/#{1,6}\s*/g, "")
      .replace(/^(hook|intro|introduction|main content|main|content|outro|conclusion|cta|call to action|section \d+|part \d+)\s*[:：\-]?\s*/gim, "")
      .replace(/^(ہک|تعارف|مرکزی مواد|اختتام|کال ٹو ایکشن)\s*[:：\-]?\s*/gim, "")
      .replace(/^\(.*?\)\s*/gm, "")
      .replace(/^\[.*?\]\s*/gm, "")
      .replace(/^---+$/gm, "")
      .replace(/^\s*[\-•]\s/gm, "")
      .replace(/^\d+:\d+\s*[-–]\s*\d+:\d+.*$/gm, "")
      .replace(/^(host|voiceover|speaker|narrator|انسان|میزبان)\s*[:：(].*$/gim, "")
      .replace(/^(youtube script|language|topic|length|style|timing|عنوان|ٹائمنگ|زبان|انداز|visual).*$/gim, "")
      .replace(/\n{3,}/g, "\n\n")
      .trim();

    res.json({ success: true, result: cleaned });
  } catch (err) {
    console.error("Script error:", err.message);
    res.status(500).json({ error: "Failed to generate script" });
  }
});

module.exports = router;