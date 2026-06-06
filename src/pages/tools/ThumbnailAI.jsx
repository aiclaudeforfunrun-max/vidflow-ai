import { useState } from "react";
import { ArrowLeft, Wand2, Copy, RefreshCw, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";

const niches = [
  "Finance & Money", "Tech & Gadgets", "Gaming",
  "Education", "Motivation", "Food & Cooking",
  "Travel", "Health & Fitness", "Business & Startup",
  "Movie Review", "Drama Explain", "News & Politics",
  "Sports", "Crypto & NFT", "AI & Technology",
  "Relationship", "Islamic Content", "Comedy",
  "Horror Story", "True Crime",
];

const freeTools = [
  { name: "Bing Image Creator", desc: "100% Free — Best for beginners", url: "https://www.bing.com/images/create", color: "#00b4d8", emoji: "✨", recommended: true },
  { name: "Adobe Firefly", desc: "Free AI image generator", url: "https://firefly.adobe.com", color: "#ff6b35", emoji: "🔥", recommended: true },
  { name: "Microsoft Designer", desc: "Free — DALL-E 3 powered", url: "https://designer.microsoft.com", color: "#0078d4", emoji: "💎", recommended: false },
  { name: "Google ImageFX", desc: "Free AI by Google", url: "https://aitestkitchen.withgoogle.com/tools/image-fx", color: "#4285f4", emoji: "🌟", recommended: false },
  { name: "Ideogram", desc: "Free — Great for text in image", url: "https://ideogram.ai", color: "#f59e0b", emoji: "💡", recommended: false },
  { name: "Midjourney", desc: "Best quality AI images", url: "https://www.midjourney.com", color: "#7c3aed", emoji: "🤖", recommended: false },
  { name: "Canva", desc: "Free — Add text & edit image", url: "https://www.canva.com/create/youtube-thumbnails/", color: "#00c4cc", emoji: "🎨", recommended: false },
  { name: "Google Veo", desc: "AI video generation", url: "https://deepmind.google/technologies/veo/", color: "#34a853", emoji: "🎬", recommended: false },
];

export default function ThumbnailAI() {
  const navigate = useNavigate();
  const [topic, setTopic]     = useState("");
  const [niche, setNiche]     = useState("Finance & Money");
  const [loading, setLoading] = useState(false);
  const [result, setResult]   = useState("");
  const [copied, setCopied]   = useState(false);
  const [error, setError]     = useState("");

  async function generateThumbnail() {
    if (!topic.trim()) return;
    setLoading(true);
    setResult("");
    setError("");
    try {
      const res = await fetch("https://vidflow-ai-production.up.railway.app/api/thumbnail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, niche }),
      });
      const data = await res.json();
      if (data.success) setResult(data.result);
      else setError(data.error || "Something went wrong");
    } catch (err) {
      setError("Cannot connect to server. Make sure backend is running.");
    }
    setLoading(false);
  }

  function copyPrompt() {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="dashboard">
      <Sidebar />
      <main className="main">
        <Topbar />

        <button className="swBackBtn" onClick={() => navigate("/")}>
          <ArrowLeft size={15} /> Dashboard
        </button>

        <div className="toolPageHeader">
          <div className="toolPageIcon" style={{ fontSize: "24px", background: "#2e1800" }}>
            🎨
          </div>
          <div>
            <div className="toolPageTitle">Thumbnail AI</div>
            <div className="toolPageSubtitle">
              Generate master prompt → Copy → Paste in any AI tool → Done!
            </div>
          </div>
        </div>

        <div className="swLayout">

          {/* LEFT */}
          <div className="swLeft">
            <div className="swCard">
              <div className="swCardTitle">🎨 Thumbnail Details</div>

              <div className="swField">
                <label className="swLabel">Video Topic *</label>
                <input
                  className="swInput"
                  placeholder="e.g. How to earn $1000 online in Pakistan"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && generateThumbnail()}
                />
              </div>

              <div className="swField">
                <label className="swLabel">Select Your Niche</label>
                <div className="swOptions">
                  {niches.map((n) => (
                    <button
                      key={n}
                      className={`swOption ${niche === n ? "swOptionActive" : ""}`}
                      onClick={() => setNiche(n)}
                    >{n}</button>
                  ))}
                </div>
              </div>

              {error && (
                <div style={{
                  background: "rgba(239,68,68,0.10)",
                  border: "1px solid rgba(239,68,68,0.30)",
                  color: "#ef4444", padding: "10px 14px",
                  borderRadius: "10px", fontSize: "13px", marginBottom: "12px",
                }}>❌ {error}</div>
              )}

              <button
                className="swGenerateBtn"
                onClick={generateThumbnail}
                disabled={loading || !topic.trim()}
              >
                {loading
                  ? <><RefreshCw size={15} className="swSpinner" /> Generating...</>
                  : <><Wand2 size={15} /> Generate Master Prompt 🎨</>
                }
              </button>
            </div>

            {/* Step 2 — Free Tools */}
            <div className="swCard">
              <div className="swCardTitle">
                🚀 Step 2 — Paste Prompt Here
              </div>
              <p style={{ fontSize: "12px", color: "var(--text-muted)", marginBottom: "14px", lineHeight: 1.6 }}>
                Copy the prompt → Open any tool below → Paste → Generate!
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {freeTools.map((tool) => (
                  <button
                    key={tool.name}
                    onClick={() => window.open(tool.url, "_blank")}
                    style={{
                      display: "flex", alignItems: "center",
                      justifyContent: "space-between",
                      padding: "10px 14px", borderRadius: "10px",
                      background: `${tool.color}15`,
                      border: `1px solid ${tool.color}${tool.recommended ? "80" : "40"}`,
                      color: tool.color, cursor: "pointer",
                      fontSize: "12.5px", fontWeight: 600,
                      position: "relative",
                    }}
                  >
                    <span>
                      {tool.emoji} {tool.name}
                      {tool.recommended && (
                        <span style={{
                          marginLeft: "8px", fontSize: "10px",
                          background: tool.color, color: "#fff",
                          padding: "2px 7px", borderRadius: "99px",
                        }}>
                          ⭐ Best
                        </span>
                      )}
                      <span style={{ display: "block", fontSize: "11px", opacity: 0.7, fontWeight: 400 }}>
                        {tool.desc}
                      </span>
                    </span>
                    <ExternalLink size={13} style={{ flexShrink: 0 }} />
                  </button>
                ))}
              </div>
            </div>

            <div className="swTipsCard">
              <div className="swTipsTitle">💡 3 Easy Steps</div>
              <ul className="swTipsList">
                <li><strong>Step 1:</strong> Enter topic → Select niche → Generate</li>
                <li><strong>Step 2:</strong> Click "Copy Prompt" button</li>
                <li><strong>Step 3:</strong> Open Bing Image Creator → Paste → Done! ✅</li>
              </ul>
            </div>
          </div>

          {/* RIGHT */}
          <div className="swOutputCard">
            <div style={{ marginBottom: "16px" }}>
              <div className="swOutputTitle" style={{ marginBottom: "6px" }}>
                {result ? "✅ Master Prompt Ready — Copy & Paste!" : "🎨 Your prompt will appear here"}
              </div>
              {result && (
                <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                  Copy this prompt → Paste in any AI tool below → Get your thumbnail!
                </p>
              )}
            </div>

            {loading ? (
              <div className="swLoadingState">
                <div className="swLoadingDots"><span /><span /><span /></div>
                <p>Creating your master prompt...</p>
              </div>
            ) : result ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

                {/* Prompt Box */}
                <div style={{
                  background: "#060d1a",
                  border: "1px solid var(--border-accent)",
                  borderRadius: "14px",
                  padding: "20px",
                  fontSize: "14px",
                  color: "var(--text-secondary)",
                  lineHeight: 1.8,
                  fontFamily: "monospace",
                }}>
                  {result}
                </div>

                {/* BIG Copy Button */}
                <button
                  className="swGenerateBtn"
                  onClick={copyPrompt}
                  style={{
                    background: copied
                      ? "linear-gradient(90deg, #10b981, #059669)"
                      : "linear-gradient(90deg, var(--accent), var(--accent-bright))",
                  }}
                >
                  <Copy size={18} />
                  {copied ? "✅ Copied! Now paste in any AI tool" : "📋 Copy Master Prompt"}
                </button>

                {/* Regenerate */}
                <button
                  className="swActionBtn"
                  onClick={generateThumbnail}
                  style={{ justifyContent: "center", padding: "10px" }}
                >
                  <RefreshCw size={14} /> Generate Different Prompt
                </button>

                {/* Quick paste tools */}
                <div style={{
                  padding: "16px",
                  background: "var(--accent-10)",
                  border: "1px solid var(--border-accent)",
                  borderRadius: "12px",
                }}>
                  <p style={{
                    fontSize: "12px", color: "var(--accent-light)",
                    fontWeight: 700, marginBottom: "10px",
                  }}>
                    🚀 Paste prompt in these free tools:
                  </p>
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: "8px",
                  }}>
                    {freeTools.slice(0, 6).map((tool) => (
                      <button
                        key={tool.name}
                        onClick={() => window.open(tool.url, "_blank")}
                        style={{
                          display: "flex", alignItems: "center",
                          gap: "6px", padding: "9px 12px",
                          borderRadius: "9px",
                          background: `${tool.color}15`,
                          border: `1px solid ${tool.color}40`,
                          color: tool.color, cursor: "pointer",
                          fontSize: "12px", fontWeight: 600,
                        }}
                      >
                        {tool.emoji} {tool.name}
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            ) : (
              <div className="swEmptyState">
                <div className="swEmptyIcon">🎨</div>
                <p>Enter your video topic</p>
                <p>Select your niche</p>
                <p>Click <strong>Generate Master Prompt</strong></p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}