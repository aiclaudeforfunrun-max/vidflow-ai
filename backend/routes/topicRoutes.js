const express = require("express");
const router = express.Router();
const { askGemini } = require("../utils/gemini");

router.post("/", async (req, res) => {
  try {
    const { niche, goal } = req.body;
    if (!niche) return res.status(400).json({ error: "Niche is required" });

    const prompt = `You are a YouTube Content Research Expert.

Find YouTube content opportunities for:
Niche: ${niche}
Goal: ${goal || "$1000/month"}

Respond ONLY in valid JSON, no extra text before or after:
{
  "viral_topics": [
    {"title": "title here", "reason": "why trending", "views": "500K+", "competition": "Low", "potential": "High"},
    {"title": "title here", "reason": "why trending", "views": "1M+", "competition": "Medium", "potential": "High"},
    {"title": "title here", "reason": "why trending", "views": "200K+", "competition": "Low", "potential": "Medium"},
    {"title": "title here", "reason": "why trending", "views": "500K+", "competition": "Low", "potential": "High"},
    {"title": "title here", "reason": "why trending", "views": "300K+", "competition": "Medium", "potential": "High"}
  ],
  "evergreen_topics": [
    {"title": "title here", "reason": "why evergreen", "monthly_searches": "50K+", "earning": "$200-500/month"},
    {"title": "title here", "reason": "why evergreen", "monthly_searches": "30K+", "earning": "$100-300/month"},
    {"title": "title here", "reason": "why evergreen", "monthly_searches": "80K+", "earning": "$300-700/month"},
    {"title": "title here", "reason": "why evergreen", "monthly_searches": "20K+", "earning": "$100-200/month"},
    {"title": "title here", "reason": "why evergreen", "monthly_searches": "60K+", "earning": "$200-400/month"}
  ],
  "untapped_topics": [
    {"title": "title here", "reason": "why untapped", "advantage": "first mover"},
    {"title": "title here", "reason": "why untapped", "advantage": "low competition"},
    {"title": "title here", "reason": "why untapped", "advantage": "high demand"}
  ],
  "shorts_ideas": [
    {"title": "short title here", "hook": "first 3 seconds hook text here", "views": "1M+"},
    {"title": "short title here", "hook": "first 3 seconds hook text here", "views": "500K+"},
    {"title": "short title here", "hook": "first 3 seconds hook text here", "views": "2M+"},
    {"title": "short title here", "hook": "first 3 seconds hook text here", "views": "1M+"}
  ],
  "keywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5", "keyword6", "keyword7", "keyword8", "keyword9", "keyword10"]
}

Replace all placeholder text with real content about: ${niche}`;

    const result = await askGemini(prompt);

    const jsonMatch = result.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return res.status(500).json({ error: "Failed to parse results" });
    }

    const parsed = JSON.parse(jsonMatch[0]);
    res.json({ success: true, data: parsed });

  } catch (err) {
    console.error("Topic error:", err.message);
    res.status(500).json({ error: "Failed to find topics" });
  }
});

module.exports = router;