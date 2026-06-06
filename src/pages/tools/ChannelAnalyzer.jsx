import { useState } from "react";
import { ArrowLeft, Wand2, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";

const severityColor = {
  "High":   { bg: "rgba(239,68,68,0.12)",  color: "#ef4444", border: "rgba(239,68,68,0.30)"  },
  "Medium": { bg: "rgba(245,158,11,0.12)", color: "#f59e0b", border: "rgba(245,158,11,0.30)" },
  "Low":    { bg: "rgba(16,185,129,0.12)", color: "#10b981", border: "rgba(16,185,129,0.30)" },
};

const impactColor = {
  "High":   { bg: "rgba(124,58,237,0.12)", color: "#9b5cff", border: "rgba(124,58,237,0.30)" },
  "Medium": { bg: "rgba(245,158,11,0.12)", color: "#f59e0b", border: "rgba(245,158,11,0.30)" },
  "Low":    { bg: "rgba(16,185,129,0.12)", color: "#10b981", border: "rgba(16,185,129,0.30)" },
};

const scoreColor = (score) => {
  if (score >= 80) return "#10b981";
  if (score >= 60) return "#f59e0b";
  return "#ef4444";
};

const scoreLabel = (score) => {
  if (score >= 80) return "Excellent";
  if (score >= 60) return "Good";
  if (score >= 40) return "Average";
  return "Poor";
};

function ScoreBar({ label, score, detail }) {
  const color  = scoreColor(score);
  const label2 = scoreLabel(score);
  return (
    <div style={{
      background: "var(--bg-card)",
      border: `1px solid ${color}30`,
      borderRadius: "14px",
      padding: "16px 18px",
      marginBottom: "10px",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
        <span style={{ fontSize: "13.5px", fontWeight: 700, color: "var(--text-primary)" }}>{label}</span>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{
            fontSize: "11px", fontWeight: 700, padding: "3px 10px",
            borderRadius: "99px", background: `${color}18`,
            color, border: `1px solid ${color}40`,
          }}>{label2}</span>
          <span style={{ fontSize: "18px", fontWeight: 900, color }}>
            {score}<span style={{ fontSize: "11px", color: "var(--text-muted)" }}>/100</span>
          </span>
        </div>
      </div>
      <div style={{
        width: "100%", height: "10px", borderRadius: "99px",
        background: "rgba(255,255,255,0.06)", overflow: "hidden",
      }}>
        <div style={{
          width: `${score}%`, height: "100%", borderRadius: "99px",
          background: `linear-gradient(90deg, ${color}99, ${color})`,
          transition: "width 1.2s ease",
          boxShadow: `0 0 8px ${color}60`,
        }} />
      </div>
      <p style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "8px", lineHeight: 1.6 }}>
        {detail}
      </p>
    </div>
  );
}

export default function ChannelAnalyzer() {
  const navigate = useNavigate();
  const [channelUrl, setChannelUrl] = useState("");
  const [loading, setLoading]       = useState(false);
  const [data, setData]             = useState(null);
  const [error, setError]           = useState("");
  const [activeTab, setActiveTab]   = useState("health");

  async function analyzeChannel() {
    if (!channelUrl.trim()) return;
    setLoading(true);
    setData(null);
    setError("");
    try {
      const res = await fetch("http://localhost:5000/api/channel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ channelUrl }),
      });
      const result = await res.json();
      if (result.success) {
        setData(result.data);
        setActiveTab("health");
      } else {
        setError(result.error || "Something went wrong");
      }
    } catch (err) {
      setError("Cannot connect to server. Make sure backend is running.");
    }
    setLoading(false);
  }

  const tabs = [
    { key: "health",   label: "📊 Health"  },
    { key: "problems", label: "❌ Problems" },
    { key: "fixes",    label: "✅ Fixes"    },
  ];

  return (
    <div className="dashboard">
      <Sidebar />
      <main className="main">
        <Topbar />

        <button className="swBackBtn" onClick={() => navigate("/")}>
          <ArrowLeft size={15} /> Dashboard
        </button>

        <div className="toolPageHeader">
          <div className="toolPageIcon" style={{ fontSize: "24px", background: "#002535" }}>
            📊
          </div>
          <div>
            <div className="toolPageTitle">Channel Analyzer</div>
            <div className="toolPageSubtitle">
              Paste YouTube channel link — get full VidIQ style analysis
            </div>
          </div>
        </div>

        <div className="swLayout">

          {/* LEFT */}
          <div className="swLeft">
            <div className="swCard">
              <div className="swCardTitle">📊 Channel URL</div>

              <div className="swField">
                <label className="swLabel">YouTube Channel Link *</label>
                <input
                  className="swInput"
                  placeholder="https://youtube.com/@channelname"
                  value={channelUrl}
                  onChange={(e) => setChannelUrl(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && analyzeChannel()}
                />
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
                onClick={analyzeChannel}
                disabled={loading || !channelUrl.trim()}
              >
                {loading
                  ? <><RefreshCw size={15} className="swSpinner" /> Analyzing...</>
                  : <><Wand2 size={15} /> Analyze Channel 📊</>
                }
              </button>
            </div>

            {/* Overall Score Card */}
            {data && (
              <div style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border-accent)",
                borderRadius: "20px", padding: "24px",
                textAlign: "center",
              }}>
                {/* Score Circle */}
                <div style={{ position: "relative", width: "120px", height: "120px", margin: "0 auto 16px" }}>
                  <svg width="120" height="120" style={{ transform: "rotate(-90deg)" }}>
                    <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="10" />
                    <circle
                      cx="60" cy="60" r="50" fill="none"
                      stroke={scoreColor(data.overall_score)}
                      strokeWidth="10"
                      strokeDasharray={`${2 * Math.PI * 50}`}
                      strokeDashoffset={`${2 * Math.PI * 50 * (1 - data.overall_score / 100)}`}
                      strokeLinecap="round"
                      style={{ transition: "stroke-dashoffset 1.5s ease", filter: `drop-shadow(0 0 6px ${scoreColor(data.overall_score)})` }}
                    />
                  </svg>
                  <div style={{
                    position: "absolute", top: "50%", left: "50%",
                    transform: "translate(-50%, -50%)",
                    display: "flex", flexDirection: "column", alignItems: "center",
                  }}>
                    <span style={{ fontSize: "24px", fontWeight: 900, color: scoreColor(data.overall_score), lineHeight: 1 }}>
                      {data.overall_score}
                    </span>
                    <span style={{ fontSize: "10px", color: "var(--text-muted)", fontWeight: 600 }}>/100</span>
                  </div>
                </div>

                <p style={{ fontSize: "17px", fontWeight: 800, color: "var(--text-primary)", marginBottom: "4px" }}>
                  {data.channel_name}
                </p>
                <p style={{ fontSize: "12px", color: "var(--text-muted)", marginBottom: "14px" }}>
                  {data.niche}
                </p>

                <div style={{ display: "flex", justifyContent: "center", gap: "8px", flexWrap: "wrap", marginBottom: "16px" }}>
                  <span style={{
                    fontSize: "12px", fontWeight: 700, padding: "5px 14px", borderRadius: "99px",
                    background: data.status === "Growing" ? "rgba(16,185,129,0.12)" : "rgba(245,158,11,0.12)",
                    color: data.status === "Growing" ? "#10b981" : "#f59e0b",
                    border: `1px solid ${data.status === "Growing" ? "rgba(16,185,129,0.30)" : "rgba(245,158,11,0.30)"}`,
                  }}>
                    {data.status === "Growing" ? "📈" : "📉"} {data.status}
                  </span>
                  <span style={{
                    fontSize: "12px", fontWeight: 700, padding: "5px 14px", borderRadius: "99px",
                    background: "rgba(124,58,237,0.12)", color: "var(--accent-light)",
                    border: "1px solid rgba(124,58,237,0.30)",
                  }}>
                    🚀 {data.potential} Potential
                  </span>
                </div>

                <div style={{
                  padding: "12px 14px",
                  background: "var(--accent-10)",
                  border: "1px solid var(--border-accent)",
                  borderRadius: "12px",
                  fontSize: "12.5px", color: "var(--text-secondary)",
                  lineHeight: 1.7, textAlign: "left",
                }}>
                  💬 {data.growth_verdict}
                </div>
              </div>
            )}

            <div className="swTipsCard">
              <div className="swTipsTitle">💡 Pro Tips</div>
              <ul className="swTipsList">
                <li>Paste full YouTube channel URL</li>
                <li>Check Health tab for detailed scores</li>
                <li>Fix High severity problems first</li>
                <li>Apply fixes one by one for best results</li>
                <li>Re-analyze after 30 days to track progress</li>
              </ul>
            </div>
          </div>

          {/* RIGHT */}
          <div className="swOutputCard">

            {!data && !loading && (
              <div className="swEmptyState">
                <div className="swEmptyIcon">📊</div>
                <p>Paste your YouTube channel URL</p>
                <p>and click <strong>Analyze Channel</strong></p>
              </div>
            )}

            {loading && (
              <div className="swLoadingState">
                <div className="swLoadingDots"><span /><span /><span /></div>
                <p>Analyzing your channel...</p>
                <p style={{ fontSize: "12px", color: "#4a5568" }}>This may take 10-20 seconds</p>
              </div>
            )}

            {data && (
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

                {/* Tabs */}
                <div style={{
                  display: "flex", gap: "7px",
                  borderBottom: "1px solid var(--border-subtle)",
                  paddingBottom: "12px",
                }}>
                  {tabs.map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => setActiveTab(tab.key)}
                      style={{
                        padding: "8px 20px", borderRadius: "99px",
                        border: "1px solid",
                        borderColor: activeTab === tab.key ? "var(--border-accent-bright)" : "var(--border-soft)",
                        background: activeTab === tab.key ? "var(--accent-15)" : "transparent",
                        color: activeTab === tab.key ? "var(--accent-light)" : "var(--text-muted)",
                        fontSize: "13px", fontWeight: 600, cursor: "pointer",
                        transition: "all 0.2s",
                      }}
                    >{tab.label}</button>
                  ))}
                </div>

                {/* Health Tab */}
                {activeTab === "health" && data.health && (
                  <div>
                    <p style={{ fontSize: "12px", color: "var(--text-muted)", marginBottom: "14px" }}>
                      📊 Detailed channel health scores — powered by AI analysis
                    </p>
                    <ScoreBar label="📅 Upload Consistency" score={data.health.upload_consistency?.score || 0} detail={data.health.upload_consistency?.detail || ""} />
                    <ScoreBar label="🔍 SEO Optimization"   score={data.health.seo_optimization?.score  || 0} detail={data.health.seo_optimization?.detail  || ""} />
                    <ScoreBar label="🎨 Thumbnail Quality"  score={data.health.thumbnail_quality?.score || 0} detail={data.health.thumbnail_quality?.detail || ""} />
                    <ScoreBar label="💬 Engagement Rate"    score={data.health.engagement_rate?.score   || 0} detail={data.health.engagement_rate?.detail   || ""} />
                    <ScoreBar label="🎬 Content Quality"    score={data.health.content_quality?.score   || 0} detail={data.health.content_quality?.detail   || ""} />
                  </div>
                )}

                {/* Problems Tab */}
                {activeTab === "problems" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                      ❌ Issues hurting your channel growth — fix these first!
                    </p>
                    {data.problems?.map((problem, i) => {
                      const sev = severityColor[problem.severity] || severityColor["Medium"];
                      return (
                        <div key={i} style={{
                          background: "var(--bg-card)",
                          border: `1px solid ${sev.border}`,
                          borderRadius: "14px", padding: "18px",
                        }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                            <p style={{ fontSize: "14px", fontWeight: 700, color: "var(--text-primary)" }}>
                              ❌ {problem.title}
                            </p>
                            <span style={{
                              fontSize: "11px", fontWeight: 700, padding: "4px 12px",
                              borderRadius: "99px", background: sev.bg,
                              color: sev.color, border: `1px solid ${sev.border}`,
                              whiteSpace: "nowrap", flexShrink: 0,
                            }}>
                              {problem.severity === "High" ? "🔴" : problem.severity === "Medium" ? "🟡" : "🟢"} {problem.severity} Priority
                            </span>
                          </div>
                          <p style={{ fontSize: "13px", color: "var(--text-muted)", lineHeight: 1.7 }}>
                            {problem.detail}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Fixes Tab */}
                {activeTab === "fixes" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                      ✅ Apply these fixes to grow your channel faster!
                    </p>
                    {data.fixes?.map((fix, i) => {
                      const imp = impactColor[fix.impact] || impactColor["Medium"];
                      return (
                        <div key={i} style={{
                          background: "var(--bg-card)",
                          border: "1px solid rgba(16,185,129,0.25)",
                          borderRadius: "14px", padding: "18px",
                        }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                            <p style={{ fontSize: "14px", fontWeight: 700, color: "var(--text-primary)" }}>
                              ✅ {fix.title}
                            </p>
                            <span style={{
                              fontSize: "11px", fontWeight: 700, padding: "4px 12px",
                              borderRadius: "99px", background: imp.bg,
                              color: imp.color, border: `1px solid ${imp.border}`,
                              whiteSpace: "nowrap", flexShrink: 0,
                            }}>
                              ⚡ {fix.impact} Impact
                            </span>
                          </div>
                          <p style={{ fontSize: "13px", color: "var(--text-muted)", lineHeight: 1.7 }}>
                            {fix.detail}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Re-analyze */}
                <button
                  className="swActionBtn"
                  onClick={analyzeChannel}
                  style={{ justifyContent: "center", padding: "10px", marginTop: "4px" }}
                >
                  <RefreshCw size={14} /> Re-analyze Channel
                </button>

              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}