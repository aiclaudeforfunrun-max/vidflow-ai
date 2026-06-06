import { useState } from "react";
import { ArrowLeft, Wand2, Copy, Download, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";

const languages = [
  "English", "Urdu", "Hindi", "Arabic", "Spanish",
  "French", "Portuguese", "Bengali", "Turkish", "Indonesian",
  "Malay", "Persian (Farsi)", "Russian", "German", "Italian",
  "Punjabi", "Swahili", "Tagalog", "Thai", "Vietnamese",
  "Chinese (Simplified)", "Japanese", "Korean", "Dutch", "Swedish",
];

const urduFontLangs = ["Urdu", "Arabic", "Persian (Farsi)", "Punjabi"];

const lengths = [
  "Short (2-3 min)",
  "Medium (5-8 min)",
  "Long (10-15 min)",
  "Extended (20+ min)",
];

const styles = [
  "Informative", "Entertaining", "Educational",
  "Motivational", "Storytelling", "Review",
];

function cleanScript(text) {
  return text
    .replace(/\*\*/g, "")
    .replace(/\*/g, "")
    .replace(/#{1,6}\s*/g, "")
    .replace(/^(hook|intro|introduction|main content|main|content|outro|conclusion|cta|call to action|section \d+|part \d+)\s*[:：\-]?\s*/gim, "")
    .replace(/^(ہک|تعارف|مرکزی مواد|اختتام|کال ٹو ایکشن)\s*[:：\-]?\s*/gim, "")
    .replace(/^\(.*?\)\s*/gm, "")
    .replace(/^\[.*?\]\s*/gm, "")
    .replace(/^---+$/gm, "")
    .replace(/^\s*[\-•]\s/gm, "")
    .replace(/^\d+:\d+\s*[-–]\s*\d+:\d+.*$/gm, "")
    .replace(/^(host|voiceover|speaker|narrator|انسان|میزبان)\s*[:：(].*$/gim, "")
    .replace(/^(youtube script|language|topic|length|style|timing|عنوان|ٹائمنگ|زبان|انداز|visual).*$/gim, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export default function ScriptWriter() {
  const navigate = useNavigate();
  const [topic, setTopic]       = useState("");
  const [language, setLanguage] = useState("English");
  const [length, setLength]     = useState("Medium (5-8 min)");
  const [style, setStyle]       = useState("Informative");
  const [loading, setLoading]   = useState(false);
  const [script, setScript]     = useState("");
  const [copied, setCopied]     = useState(false);
  const [error, setError]       = useState("");

  const isRTL = urduFontLangs.includes(language);

  async function generateScript() {
    if (!topic.trim()) return;
    setLoading(true);
    setScript("");
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/script", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, language, length, style }),
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
    a.download = `${topic.slice(0, 30)}_script.txt`;
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
          <div className="toolPageIcon" style={{ fontSize: "24px", background: "#1e1060" }}>
            📝
          </div>
          <div>
            <div className="toolPageTitle">Script Writer</div>
            <div className="toolPageSubtitle">
              AI-powered YouTube scripts in 25+ languages
            </div>
          </div>
        </div>

        <div className="swLayout">

          {/* LEFT */}
          <div className="swLeft">
            <div className="swCard">
              <div className="swCardTitle">📋 Script Details</div>

              <div className="swField">
                <label className="swLabel">Video Topic *</label>
                <input
                  className="swInput"
                  placeholder="e.g. How to earn money online in Pakistan"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && generateScript()}
                  style={isRTL ? {
                    direction: "rtl",
                    textAlign: "right",
                    fontFamily: "'Noto Nastaliq Urdu', serif",
                    fontSize: "16px",
                    lineHeight: "2",
                  } : {}}
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

              {isRTL && (
                <div style={{
                  background: "rgba(124,58,237,0.10)",
                  border: "1px solid rgba(124,58,237,0.30)",
                  borderRadius: "10px",
                  padding: "10px 14px",
                  fontSize: "13px",
                  color: "var(--accent-light)",
                  marginBottom: "12px",
                  direction: "rtl",
                  textAlign: "right",
                  fontFamily: "'Noto Nastaliq Urdu', serif",
                  lineHeight: "2",
                }}>
                  ✨ اسکرپٹ نستعلیق فونٹ میں دکھایا جائے گا
                </div>
              )}

              <div className="swField">
                <label className="swLabel">Script Length</label>
                <div className="swOptions">
                  {lengths.map((l) => (
                    <button
                      key={l}
                      className={`swOption ${length === l ? "swOptionActive" : ""}`}
                      onClick={() => setLength(l)}
                    >{l}</button>
                  ))}
                </div>
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
                onClick={generateScript}
                disabled={loading || !topic.trim()}
              >
                {loading
                  ? <><RefreshCw size={15} className="swSpinner" /> Generating...</>
                  : <><Wand2 size={15} /> Generate Script ✨</>
                }
              </button>
            </div>

            <div className="swTipsCard">
              <div className="swTipsTitle">💡 Pro Tips</div>
              <ul className="swTipsList">
                <li>Be specific with your topic for best results</li>
                <li>Urdu & Arabic scripts use Nastaliq font</li>
                <li>Storytelling style gets highest retention</li>
                <li>Long scripts work best for tutorials</li>
                <li>Press Enter to generate quickly</li>
              </ul>
            </div>
          </div>

          {/* RIGHT */}
          <div className="swOutputCard">
            <div className="swOutputHeader">
              <div className="swOutputTitle">
                {script
                  ? isRTL ? "✅ اسکرپٹ تیار ہے" : "✅ Your Script is Ready"
                  : isRTL ? "📄 اسکرپٹ یہاں آئے گا" : "📄 Script will appear here"
                }
              </div>
              {script && (
                <div className="swOutputActions">
                  <button className="swActionBtn" onClick={copyScript}>
                    <Copy size={13} />
                    {copied ? "Copied!" : "Copy"}
                  </button>
                  <button className="swActionBtn" onClick={downloadScript}>
                    <Download size={13} /> Download
                  </button>
                  <button className="swActionBtn" onClick={generateScript}>
                    <RefreshCw size={13} /> Regenerate
                  </button>
                </div>
              )}
            </div>

            {loading ? (
              <div className="swLoadingState">
                <div className="swLoadingDots">
                  <span /><span /><span />
                </div>
                <p>
                  {isRTL
                    ? `${language} میں اسکرپٹ لکھا جا رہا ہے...`
                    : `Writing your ${language} script...`
                  }
                </p>
              </div>
            ) : script ? (
              <div
                className="swScriptOutput"
                style={isRTL ? {
                  fontFamily: "'Noto Nastaliq Urdu', serif",
                  direction: "rtl",
                  textAlign: "right",
                  fontSize: "18px",
                  lineHeight: "3",
                } : {}}
              >
                {script.split("\n").filter(line => line.trim() !== "").map((line, i) => (
                  <p
                    key={i}
                    style={{
                      marginBottom: isRTL ? "16px" : "10px",
                      color: "var(--text-secondary)",
                      fontSize: isRTL ? "18px" : "14px",
                      lineHeight: isRTL ? "3.2" : "1.8",
                      fontFamily: isRTL ? "'Noto Nastaliq Urdu', serif" : "inherit",
                    }}
                  >
                    {line}
                  </p>
                ))}
              </div>
            ) : (
              <div className="swEmptyState">
                <div className="swEmptyIcon">📝</div>
                <p>
                  {isRTL
                    ? "بائیں طرف تفصیل بھریں"
                    : "Fill in the details on the left"
                  }
                </p>
                <p>
                  {isRTL
                    ? <strong>اسکرپٹ بنائیں بٹن دبائیں</strong>
                    : <><strong>Generate Script</strong> to get started</>
                  }
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}