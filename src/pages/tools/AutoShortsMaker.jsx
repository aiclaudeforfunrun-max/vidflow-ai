import { useState } from "react";
import { ArrowLeft, Wand2, Copy, Download, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";

const languages = [
  "English", "Hindi", "Spanish", "French",
  "Portuguese", "Bengali", "Turkish", "Indonesian",
  "German", "Italian", "Russian",
];

const styles = [
  "Entertaining", "Educational", "Motivational",
  "Storytelling", "Shocking Facts", "Comedy",
  "Horror", "True Crime", "Islamic",
];

function cleanScript(text) {
  return text
    .replace(/\*\*/g, "")
    .replace(/\*/g, "")
    .replace(/#{1,6}\s*/g, "")
    .replace(/^(hook|intro|main|outro|cta|section|part)\s*[:：\-]?\s*/gim, "")
    .replace(/^\(.*?\)\s*/gm, "")
    .replace(/^\[.*?\]\s*/gm, "")
    .replace(/^---+$/gm, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export default function AutoShortsMaker() {
  const navigate = useNavigate();
  const [topic, setTopic]       = useState("");
  const [language, setLanguage] = useState("English");
  const [style, setStyle]       = useState("Entertaining");
  const [loading, setLoading]   = useState(false);
  const [script, setScript]     = useState("");
  const [copied, setCopied]     = useState(false);
  const [error, setError]       = useState("");

  async function generateShorts() {
    if (!topic.trim()) return;
    setLoading(true);
    setScript("");
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/shorts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, language, style }),
      });
      const data = await res.json();
      if (data.success) setScript(cleanScript(data.result));
      else setError(data.error || "Something went wrong");
    } catch (err) {
      setError("Cannot connect to server. Make sure backend is running.");
    }
    setLoading(false);
  }

  function copyScript() {
    navigator.clipboard.writeText(script);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function downloadScript() {
    const blob = new Blob([script], { type: "text/plain;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${topic.slice(0, 30)}_shorts_script.txt`;
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
          <div className="toolPageIcon" style={{ fontSize: "24px", background: "#0a2e2e" }}>
            📱
          </div>
          <div>
            <div className="toolPageTitle">Shorts Script Writer</div>
            <div className="toolPageSubtitle">
              Viral 60-second YouTube Shorts scripts
            </div>
          </div>
        </div>

        <div className="swLayout">

          {/* LEFT */}
          <div className="swLeft">
            <div className="swCard">
              <div className="swCardTitle">📱 Shorts Details</div>

              <div className="swField">
                <label className="swLabel">Video Topic *</label>
                <input
                  className="swInput"
                  placeholder="e.g. 3 habits that changed my life"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && generateShorts()}
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
                <label className="swLabel">Video Style</label>
                <div className="swOptions">
                  {styles.map((s) => (
                    <button
                      key={s}
                      className={`swOption ${style === s ? "swOptionActive" : ""}`}
                      onClick={() => setStyle(s)}
                    >{s}</button>
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
                onClick={generateShorts}
                disabled={loading || !topic.trim()}
              >
                {loading
                  ? <><RefreshCw size={15} className="swSpinner" /> Generating...</>
                  : <><Wand2 size={15} /> Generate Shorts Script 📱</>
                }
              </button>
            </div>

            <div style={{
              background: "rgba(10,46,46,0.50)",
              border: "1px solid rgba(6,182,212,0.25)",
              borderRadius: "14px", padding: "16px",
            }}>
              <div style={{ fontSize: "12px", fontWeight: 700, color: "#22d3ee", marginBottom: "10px" }}>
                📱 Shorts Tips
              </div>
              <ul className="swTipsList">
                <li>Hook must grab attention in 3 seconds</li>
                <li>Keep script under 60 seconds</li>
                <li>Shocking Facts style gets most views</li>
                <li>End with cliffhanger for more saves</li>
                <li>Post daily Shorts for fastest growth</li>
              </ul>
            </div>
          </div>

          {/* RIGHT */}
          <div className="swOutputCard">
            <div className="swOutputHeader">
              <div className="swOutputTitle">
                {script ? "✅ Shorts Script Ready!" : "📱 Script will appear here"}
              </div>
              {script && (
                <div className="swOutputActions">
                  <button className="swActionBtn" onClick={copyScript}>
                    <Copy size={13} /> {copied ? "Copied!" : "Copy"}
                  </button>
                  <button className="swActionBtn" onClick={downloadScript}>
                    <Download size={13} /> Download
                  </button>
                  <button className="swActionBtn" onClick={generateShorts}>
                    <RefreshCw size={13} /> Regenerate
                  </button>
                </div>
              )}
            </div>

            {loading ? (
              <div className="swLoadingState">
                <div className="swLoadingDots"><span /><span /><span /></div>
                <p>Writing viral shorts script...</p>
              </div>
            ) : script ? (
              <div>
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: "8px",
                  background: "rgba(6,182,212,0.12)",
                  border: "1px solid rgba(6,182,212,0.30)",
                  color: "#22d3ee", padding: "6px 14px",
                  borderRadius: "99px", fontSize: "12px",
                  fontWeight: 700, marginBottom: "16px",
                }}>
                  ⏱ ~60 seconds script
                </div>

                <div className="swScriptOutput">
                  {script.split("\n").filter(line => line.trim() !== "").map((line, i) => (
                    <p key={i} style={{
                      marginBottom: "10px",
                      color: "var(--text-secondary)",
                      fontSize: "14px",
                      lineHeight: "1.8",
                    }}>
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            ) : (
              <div className="swEmptyState">
                <div className="swEmptyIcon">📱</div>
                <p>Enter your topic on the left</p>
                <p>and click <strong>Generate Shorts Script</strong></p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}