import { useState } from "react";
import { ArrowLeft, Wand2, Copy, Download, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";

const languages = [
  "English", "Urdu", "Hindi", "Arabic", "Spanish",
  "French", "Portuguese", "Bengali", "Turkish", "Indonesian",
];

const videoTypes = [
  "Tutorial", "Vlog", "Review", "News",
  "Entertainment", "Education", "Motivation", "Gaming",
];

export default function SEOGenerator() {
  const navigate = useNavigate();
  const [topic, setTopic]         = useState("");
  const [script, setScript]       = useState("");
  const [language, setLanguage]   = useState("English");
  const [videoType, setVideoType] = useState("Tutorial");
  const [loading, setLoading]     = useState(false);
  const [result, setResult]       = useState("");
  const [copied, setCopied]       = useState(false);
  const [error, setError]         = useState("");

  async function generateSEO() {
    if (!topic.trim()) return;
    setLoading(true);
    setResult("");
    setError("");

    try {
      const res = await fetch("https://vidflow-ai-production.up.railway.app/api/seo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, script, language, videoType }),
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

  function downloadResult() {
    const blob = new Blob([result], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${topic.slice(0, 30)}_SEO.txt`;
    a.click();
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
          <div className="toolPageIcon" style={{ fontSize: "24px", background: "#0f1e5e" }}>
            🔍
          </div>
          <div>
            <div className="toolPageTitle">SEO Generator</div>
            <div className="toolPageSubtitle">
              VidIQ level YouTube SEO — titles, description, hashtags & tags
            </div>
          </div>
        </div>

        <div className="swLayout">
          <div className="swLeft">
            <div className="swCard">
              <div className="swCardTitle">🔍 SEO Details</div>

              <div className="swField">
                <label className="swLabel">Video Topic *</label>
                <input
                  className="swInput"
                  placeholder="e.g. How to make money online in Pakistan 2025"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && generateSEO()}
                />
              </div>

              <div className="swField">
                <label className="swLabel">Paste Script (Optional)</label>
                <textarea
                  className="swInput"
                  style={{ height: "80px", resize: "none", paddingTop: "10px" }}
                  placeholder="Paste your script here for better SEO results..."
                  value={script}
                  onChange={(e) => setScript(e.target.value)}
                />
              </div>

              <div className="swField">
                <label className="swLabel">Language</label>
                <select
                  className="swSelect"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                >
                  {languages.map((l) => (
                    <option key={l} value={l}>{l}</option>
                  ))}
                </select>
              </div>

              <div className="swField">
                <label className="swLabel">Video Type</label>
                <div className="swOptions">
                  {videoTypes.map((t) => (
                    <button
                      key={t}
                      className={`swOption ${videoType === t ? "swOptionActive" : ""}`}
                      onClick={() => setVideoType(t)}
                    >{t}</button>
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
                onClick={generateSEO}
                disabled={loading || !topic.trim()}
              >
                {loading
                  ? <><RefreshCw size={15} className="swSpinner" /> Generating SEO...</>
                  : <><Wand2 size={15} /> Generate SEO Package ✨</>
                }
              </button>
            </div>

            <div className="swTipsCard">
              <div className="swTipsTitle">💡 Pro Tips</div>
              <ul className="swTipsList">
                <li>Paste your script for 3x better SEO</li>
                <li>Use exact topic people search on YouTube</li>
                <li>Include year in topic for trending results</li>
                <li>Choose correct video type for best tags</li>
                <li>Use all 30 hashtags for maximum reach</li>
              </ul>
            </div>
          </div>

          <div className="swOutputCard">
            <div className="swOutputHeader">
              <div className="swOutputTitle">
                {result ? "✅ SEO Package Ready" : "📊 SEO will appear here"}
              </div>
              {result && (
                <div className="swOutputActions">
                  <button className="swActionBtn" onClick={copyResult}>
                    <Copy size={13} /> {copied ? "Copied!" : "Copy All"}
                  </button>
                  <button className="swActionBtn" onClick={downloadResult}>
                    <Download size={13} /> Download
                  </button>
                  <button className="swActionBtn" onClick={generateSEO}>
                    <RefreshCw size={13} /> Regenerate
                  </button>
                </div>
              )}
            </div>

            {loading ? (
              <div className="swLoadingState">
                <div className="swLoadingDots"><span /><span /><span /></div>
                <p>Generating your SEO package...</p>
              </div>
            ) : result ? (
              <div className="swScriptOutput">
                {result.split("\n").map((line, i) => (
                  <p key={i} className={
                    line.startsWith("🎯") || line.startsWith("📝") ||
                    line.startsWith("#️⃣") || line.startsWith("🏷️") ||
                    line.startsWith("📊")
                      ? "swScriptSection" : "swScriptLine"
                  }>{line}</p>
                ))}
              </div>
            ) : (
              <div className="swEmptyState">
                <div className="swEmptyIcon">🔍</div>
                <p>Enter your video topic on the left</p>
                <p>and click <strong>Generate SEO Package</strong></p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}