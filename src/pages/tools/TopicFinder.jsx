import { useState } from "react";
import { ArrowLeft, Wand2, Copy, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";

const niches = [
  "Finance & Money", "Tech & Gadgets", "Health & Fitness",
  "Gaming", "Education", "Travel", "Food & Cooking",
  "Beauty & Fashion", "Motivation", "Business",
  "Crypto", "AI & Technology", "Cars", "Real Estate",
  "Sports", "Entertainment", "News", "DIY & Crafts",
];

const platforms = [
  "YouTube Long Form", "YouTube Shorts",
  "Both Long & Shorts", "YouTube + TikTok",
];

const languages = [
  "English", "Urdu", "Hindi", "Arabic",
  "Spanish", "French", "Turkish", "Indonesian",
];

export default function TopicFinder() {
  const navigate = useNavigate();
  const [niche, setNiche]       = useState("");
  const [selected, setSelected] = useState("");
  const [platform, setPlatform] = useState("YouTube Long Form");
  const [language, setLanguage] = useState("English");
  const [loading, setLoading]   = useState(false);
  const [result, setResult]     = useState("");
  const [copied, setCopied]     = useState(false);
  const [error, setError]       = useState("");

  async function findTopics() {
    const nicheToUse = niche.trim() || selected;
    if (!nicheToUse) return;
    setLoading(true);
    setResult("");
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/topic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ niche: nicheToUse, platform, language }),
      });
      const data = await res.json();
      if (data.success) setResult(data.result);
      else setError(data.error || "Something went wrong");
    } catch (err) {
      setError("Cannot connect to server. Make sure backend is running.");
    }
    setLoading(false);
  }

  function copyResult() {
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
          <div className="toolPageIcon" style={{ fontSize: "24px", background: "#2e1000" }}>
            🔥
          </div>
          <div>
            <div className="toolPageTitle">Topic Finder</div>
            <div className="toolPageSubtitle">
              Find viral, evergreen & untapped YouTube topics for any niche
            </div>
          </div>
        </div>

        <div className="swLayout">
          <div className="swLeft">
            <div className="swCard">
              <div className="swCardTitle">🔥 Topic Research</div>

              <div className="swField">
                <label className="swLabel">Your Niche</label>
                <input
                  className="swInput"
                  placeholder="e.g. Pakistani street food, Urdu tech reviews..."
                  value={niche}
                  onChange={(e) => { setNiche(e.target.value); setSelected(""); }}
                />
              </div>

              <div className="naOrDivider">
                <span>or choose popular niche</span>
              </div>

              <div className="swField">
                <div className="swOptions">
                  {niches.map((n) => (
                    <button
                      key={n}
                      className={`swOption ${selected === n ? "swOptionActive" : ""}`}
                      onClick={() => { setSelected(n); setNiche(""); }}
                    >{n}</button>
                  ))}
                </div>
              </div>

              <div className="swField">
                <label className="swLabel">Platform</label>
                <div className="swOptions">
                  {platforms.map((p) => (
                    <button
                      key={p}
                      className={`swOption ${platform === p ? "swOptionActive" : ""}`}
                      onClick={() => setPlatform(p)}
                    >{p}</button>
                  ))}
                </div>
              </div>

              <div className="swField">
                <label className="swLabel">Language</label>
                <div className="swOptions">
                  {languages.map((l) => (
                    <button
                      key={l}
                      className={`swOption ${language === l ? "swOptionActive" : ""}`}
                      onClick={() => setLanguage(l)}
                    >{l}</button>
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
                onClick={findTopics}
                disabled={loading || (!niche.trim() && !selected)}
              >
                {loading
                  ? <><RefreshCw size={15} className="swSpinner" /> Finding Topics...</>
                  : <><Wand2 size={15} /> Find Viral Topics 🔥</>
                }
              </button>
            </div>

            <div className="swTipsCard">
              <div className="swTipsTitle">💡 Pro Tips</div>
              <ul className="swTipsList">
                <li>Be specific — "Urdu cooking" beats "cooking"</li>
                <li>Run every week for fresh trending topics</li>
                <li>Focus on Untapped topics for fast growth</li>
                <li>Make Shorts + Long form on same topic</li>
                <li>Post trending topics within 24-48 hours</li>
              </ul>
            </div>
          </div>

          <div className="swOutputCard">
            <div className="swOutputHeader">
              <div className="swOutputTitle">
                {result ? "✅ Topics Found!" : "🔥 Topics will appear here"}
              </div>
              {result && (
                <div className="swOutputActions">
                  <button className="swActionBtn" onClick={copyResult}>
                    <Copy size={13} /> {copied ? "Copied!" : "Copy All"}
                  </button>
                  <button className="swActionBtn" onClick={findTopics}>
                    <RefreshCw size={13} /> Refresh
                  </button>
                </div>
              )}
            </div>

            {loading ? (
              <div className="swLoadingState">
                <div className="swLoadingDots"><span /><span /><span /></div>
                <p>Finding viral topics for you...</p>
              </div>
            ) : result ? (
              <div className="swScriptOutput">
                {result.split("\n").map((line, i) => (
                  <p key={i} className={
                    line.startsWith("🔥") || line.startsWith("💡") ||
                    line.startsWith("⚡") || line.startsWith("📱") ||
                    line.startsWith("🎯") || line.startsWith("📊")
                      ? "swScriptSection" : "swScriptLine"
                  }>{line}</p>
                ))}
              </div>
            ) : (
              <div className="swEmptyState">
                <div className="swEmptyIcon">🔥</div>
                <p>Select your niche on the left</p>
                <p>and click <strong>Find Viral Topics</strong></p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}