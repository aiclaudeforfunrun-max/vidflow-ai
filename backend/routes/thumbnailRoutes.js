const express = require("express");
const router = express.Router();
const { askGemini } = require("../utils/gemini");

router.post("/", async (req, res) => {
  try {
    const { topic, niche } = req.body;
    if (!topic) return res.status(400).json({ error: "Topic is required" });

    const prompt = `You are the world's best YouTube thumbnail image prompt writer. You write prompts like top AI artists on Midjourney and DALL-E.

Write ONE single perfect image generation prompt for this YouTube video thumbnail:
Topic: "${topic}"
Niche: ${niche || "General"}

STRICT RULES:
- Write ONLY the image prompt — nothing else
- No headings, no sections, no explanations
- No labels like "Prompt:" or "Image:" 
- No markdown, no bullets, no dashes
- No text or words inside the image
- Start directly with the scene description
- Maximum 120 words
- Include: main subject, background, lighting, colors, mood, camera angle, style
- Make it cinematic, dramatic and high CTR
- End with: photorealistic, 8k, sharp focus, vibrant colors, 16:9 aspect ratio

Write the prompt now, starting directly with the scene:`;

    const result = await askGemini(prompt);

    // Clean any unwanted text
    const cleaned = result
      .replace(/^(prompt:|image prompt:|here'?s?.*?:)/gi, "")
      .replace(/```/g, "")
      .replace(/\*\*/g, "")
      .replace(/#{1,6}\s/g, "")
      .trim();

    res.json({ success: true, result: cleaned });
  } catch (err) {
    console.error("Thumbnail error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;