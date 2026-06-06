const express = require("express");
const router = express.Router();
const { askGemini } = require("../utils/gemini");

router.post("/", async (req, res) => {
  try {
    const { niche, region } = req.body;
    if (!niche) return res.status(400).json({ error: "Niche is required" });

    const prompt = `You are a YouTube Niche Expert. Analyze this niche briefly.

Niche: ${niche}
Region: ${region || "Global"}

Write analysis in this format:

💰 EARNING POTENTIAL
New channel: $50-200/month
Growing channel: $200-800/month
Established: $800-3000/month

📊 RPM DATA
Average RPM: $2-5
Best months: Oct-Dec
Best countries: USA, UK, Canada

⚔ COMPETITION
Level: Medium
How to stand out: unique angle

🎯 CONTENT STRATEGY
Upload: 3x per week
Length: 8-15 minutes
Best days: Tue, Thu, Sat

🔑 TOP KEYWORDS
List 5 keywords

🏆 SUCCESSFUL CHANNELS
3 channel examples

🚀 ACTION STEPS
3 steps to start today`;

    const result = await askGemini(prompt);
    res.json({ success: true, result });
  } catch (err) {
    console.error("Niche error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;