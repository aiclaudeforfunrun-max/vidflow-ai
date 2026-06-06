import { useState } from "react";
import { ArrowLeft, Wand2, RefreshCw, Copy, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";

const regions = [
  "Global", "USA", "UK", "Pakistan", "India",
  "Middle East", "Canada", "Australia", "Europe",
];

export default function NicheAnalyzer() {
  const navigate = useNavigate();
  const [niche, setNiche]     = useState("");
  const [region, setRegion]   = useState("Global");
  const [loading, setLoading] = useState(false);
  const [result, setResult]   = useState("");
  const [copied, setCopied]   = useState(false);
  const [error, setError]     = useState("");

  async function analyzeNiche() {
    if (!niche.trim()) return;
    setLoading(true);
    setResult("");
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/niche", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ niche: niche.trim(), region }),
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
    const blob = new Blob([result], { type: "text/plain;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${niche}_niche_analysis.txt`;
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
          <div className="toolPageIcon" style={{ fontSize: "24px", background: "#1a2e0a" }}>
            💰
          </div>
          <div>
            <div className="toolPageTitle">Niche Analyzer</div>
            <div className="toolPageSubtitle">
              RPM data, earning potential & growth blueprint for any niche
            </div>
          </div>
        </div>

        <div className="swLayout">

          {/* LEFT */}
          <div className="swLeft">
            <div className="swCard">
              <div className="swCardTitle">🎯 Enter Your Niche</div>

              <div className="swField">
                <label className="swLabel">Your Niche *</label>
                <input
                  className="swInput"
                  placeholder="e.g. Movie Explanation, Finance, Pakistani Cooking..."
                  value={niche}
                  onChange={(e) => setNiche(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && analyzeNiche()}
                />
              </div>

              <div className="swField">
                <label className="swLabel">Target Region</label>
                <select
                  className="swSelect"
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                >
                  {regions.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
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
                onClick={analyzeNiche}
                disabled={loading || !niche.trim()}
              >
                {loading
                  ? <><RefreshCw size={15} className="swSpinner" /> Analyzing...</>
                  : <><Wand2 size={15} /> Analyze Niche 💰</>
                }
              </button>
            </div>

            <div className="swTipsCard">
              <div className="swTipsTitle">💡 Pro Tips</div>
              <ul className="swTipsList">
                <li>Movie Explanation has highest RPM in Pakistan</li>
                <li>Target USA audience for maximum earnings</li>
                <li>Finance niche has $8-15 RPM globally</li>
                <li>Start with low competition sub-niches</li>
                <li>Press Enter to analyze quickly</li>
              </ul>
            </div>
          </div>

          {/* RIGHT */}
          <div className="swOutputCard">
            <div className="swOutputHeader">
              <div className="swOutputTitle">
                {result ? "✅ Niche Analysis Ready" : "📊 Analysis will appear here"}
              </div>
              {result && (
                <div className="swOutputActions">
                  <button className="swActionBtn" onClick={copyResult}>
                    <Copy size={13} /> {copied ? "Copied!" : "Copy"}
                  </button>
                  <button className="swActionBtn" onClick={downloadResult}>
                    <Download size={13} /> Download
                  </button>
                  <button className="swActionBtn" onClick={analyzeNiche}>
                    <RefreshCw size={13} /> Re-analyze
                  </button>
                </div>
              )}
            </div>

            {loading ? (
              <div className="swLoadingState">
                <div className="swLoadingDots"><span /><span /><span /></div>
                <p>Analyzing niche data...</p>
                <p style={{ fontSize: "12px", color: "#4a5568" }}>
                  This may take 10-20 seconds
                </p>
              </div>
            ) : result ? (
              <div className="swScriptOutput">
                {result.split("\n").map((line, i) => (
                  <p
                    key={i}
                    className={
                      line.startsWith("💰") || line.startsWith("📊") ||
                      line.startsWith("⚔") || line.startsWith("🎯") ||
                      line.startsWith("🔑") || line.startsWith("🏆") ||
                      line.startsWith("🚀") || line.startsWith("📈")
                        ? "swScriptSection" : "swScriptLine"
                    }
                  >
                    {line}
                  </p>
                ))}
              </div>
            ) : (
              <div className="swEmptyState">
                <div className="swEmptyIcon">💰</div>
                <p>Type your niche above</p>
                <p>and click <strong>Analyze Niche</strong></p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}