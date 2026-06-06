const fetch = (...args) =>
  import("node-fetch").then(({ default: f }) => f(...args));

async function askGemini(prompt) {
  const models = [
    "qwen/qwen3-14b:free",
    "meta-llama/llama-3.3-70b-instruct:free",
    "meta-llama/llama-3.2-3b-instruct:free",
    "liquid/lfm-2.5-1.2b-instruct:free",
  ];

  for (const model of models) {
    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:5173",
          "X-Title": "VidFlow AI",
        },
        body: JSON.stringify({
          model,
          messages: [{ role: "user", content: prompt }],
          max_tokens: 1200,
        }),
      });

      const data = await response.json();
      if (data.error) { console.log(`❌ ${model}:`, data.error.message); continue; }
      if (data.choices?.[0]?.message?.content) {
        console.log(`✅ ${model}`);
        return data.choices[0].message.content;
      }
    } catch (err) {
      console.log(`❌ ${model}:`, err.message);
      continue;
    }
  }
  throw new Error("Please try again.");
}

module.exports = { askGemini };