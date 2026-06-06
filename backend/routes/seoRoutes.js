const express = require("express");
const router = express.Router();
const { askGemini } = require("../utils/gemini");

router.post("/", async (req, res) => {
  try {
    const { topic, language, videoType } = req.body;
    if (!topic) return res.status(400).json({ error: "Topic is required" });

    const prompt = `You are the world's best YouTube SEO Expert like VidIQ and TubeBuddy combined.

Topic: ${topic}
Language: ${language || "English"}
Video Type: ${videoType || "Story"}

Generate EXACTLY in this format:

🎯 TITLES (5 options)
Write 5 powerful story-driven titles. Each title MUST be between 70-100 characters long. Make them emotional, suspenseful and curiosity-driven like a story unfolding. Use numbers, power words, cliffhangers. Examples style: "اسے عمر قید کی سزا سنائی گئی — پھر اس نے جیل توڑ دی اور سب کو حیران کر دیا" or "He Was Sentenced To Life In Prison — Then He Did Something Nobody Expected"
1.
2.
3.
4.
5.

📝 DESCRIPTION
Write YouTube description following YouTube policies strictly:
Line 1-2: Powerful story hook that makes viewer want to watch (include main keyword)
Line 3 onwards: 200 word natural story summary with keywords naturally placed
Then add timestamps:
00:00 Introduction
00:30 Story Begins
Then: "Subscribe for more amazing stories"
"Turn on notifications so you never miss a video"
No spam, no misleading claims, YouTube community guidelines compliant

#️⃣ HASHTAGS (exactly 5 only)
Only 5 hashtags, most relevant, trending
Format: #tag1 #tag2 #tag3 #tag4 #tag5

🏷️ TAGS
Comma separated tags. Every single tag must be under 30 characters. No exceptions.
Format: tag1, tag2, tag3, tag4`;

    const result = await askGemini(prompt);

    const cleaned = result
      .replace(/\*\*/g, "")
      .replace(/\*/g, "")
      .replace(/#{1,6}\s(?!️⃣)/g, "")
      .trim();

    res.json({ success: true, result: cleaned });
  } catch (err) {
    console.error("SEO error:", err.message);
    res.status(500).json({ error: "Failed to generate SEO" });
  }
});

module.exports = router;