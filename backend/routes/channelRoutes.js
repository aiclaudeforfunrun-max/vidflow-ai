const express = require("express");
const router = express.Router();
const { askGemini } = require("../utils/gemini");

router.post("/", async (req, res) => {
  try {
    const { channelUrl } = req.body;
    if (!channelUrl) return res.status(400).json({ error: "Channel URL is required" });

    const prompt = `You are a YouTube Channel Analyzer like VidIQ.

Analyze this YouTube channel: ${channelUrl}

Respond ONLY in valid JSON format, no extra text:
{
  "channel_name": "channel name here",
  "niche": "channel niche here",
  "overall_score": 75,
  "status": "Growing",
  "health": {
    "upload_consistency": { "score": 80, "label": "Good", "detail": "Uploads regularly every week" },
    "seo_optimization": { "score": 60, "label": "Average", "detail": "Titles need improvement" },
    "thumbnail_quality": { "score": 70, "label": "Good", "detail": "Thumbnails are eye-catching" },
    "engagement_rate": { "score": 55, "label": "Low", "detail": "Comments and likes need improvement" },
    "content_quality": { "score": 85, "label": "Excellent", "detail": "High quality videos" }
  },
  "problems": [
    { "title": "problem title", "detail": "detailed explanation", "severity": "High" },
    { "title": "problem title", "detail": "detailed explanation", "severity": "Medium" },
    { "title": "problem title", "detail": "detailed explanation", "severity": "Low" }
  ],
  "fixes": [
    { "title": "fix title", "detail": "how to fix it step by step", "impact": "High" },
    { "title": "fix title", "detail": "how to fix it step by step", "impact": "Medium" },
    { "title": "fix title", "detail": "how to fix it step by step", "impact": "High" }
  ],
  "growth_verdict": "This channel is growing slowly. Main issue is inconsistent uploads and poor SEO.",
  "potential": "High"
}`;

    const result = await askGemini(prompt);
    const jsonMatch = result.match(/\{[\s\S]*\}/);
    if (!jsonMatch) return res.status(500).json({ error: "Failed to analyze channel" });
    const parsed = JSON.parse(jsonMatch[0]);
    res.json({ success: true, data: parsed });
  } catch (err) {
    console.error("Channel error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;