import { useState } from "react";
import { ArrowLeft, Wand2, RefreshCw, Play, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";

const goals = ["$500/month", "$1000/month", "$2000/month", "$5000/month"];

const competitionColor = {
  "Low":    { bg: "rgba(16,185,129,0.12)",  color: "#10b981", border: "rgba(16,185,129,0.25)" },
  "Medium": { bg: "rgba(245,158,11,0.12)",  color: "#f59e0b", border: "rgba(245,158,11,0.25)" },
  "High":   { bg: "rgba(239,68,68,0.12)",   color: "#ef4444", border: "rgba(239,68,68,0.25)" },
};

function Badge({ children, bg, color, border }) {
  return (
    <span style={{
      fontSize: "11px", fontWeight: 700, padding: "3px 10px",
      borderRadius: "99px", background: bg, color,
      border: `1px solid ${border}`, whiteSpace: "nowrap",
    }}>{children}</span>
  );
}

function TopicCard({ topic, type, onYoutube, onGoogle }) {
  const comp = competitionColor[topic.competition] || competitionColor["Medium"];
  return (
    <div style={{
      background: "var(--bg-card)",
      border: `1px solid ${type === "untapped" ? "rgba(124,58,237,0.30)" : "var(--border-soft)"}`,
      borderRadius: "16px", padding: "18px",
      transition: "all 0.2s ease",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px", marginBottom: "10px" }}>
        <p style={{ fontSize: "14.5px", fontWeight: 700, color: "var(--text-primary)", flex: 1, lineHeight: 1.5 }}>
          {type === "untapped" && "⚡ "}
          {type === "evergreen" && "💡 "}
          {type === "viral" && "🔥 "}
          {topic.title}
        </p>
        <div style={{ display: "flex", gap: "6px", flexShrink: 0 }}>
          <button
            onClick={() => onYoutube(topic.title)}
            title="Search on YouTube"
            style={{
              width: "34px", height: "34px", borderRadius: "10px",
              background: "rgba(255,0,0,0.10)",
              border: "1px solid rgba(255,0,0,0.25)",
              color: "#ff4444", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          ><Play size={15} /></button>
          <button
            onClick={() => onGoogle(topic.title)}
            title="Search on Google"
            style={{
              width: "34px", height: "34px", borderRadius: "10px",
              background: "rgba(66,133,244,0.10)",
              border: "1px solid rgba(66,133,244,0.25)",
              color: "#4285f4", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          ><Globe size={15} /></button>
        </div>
      </div>

      <p style={{ fontSize: "12.5px", color: "var(--text-muted)", marginBottom: "12px", lineHeight: 1.6 }}>
        {topic.reason}
      </p>

      <div style={{ display: "flex", gap: "7px", flexWrap: "wrap" }}>
        {topic.views && (
          <Badge bg="rgba(16,185,129,0.12)" color="#10b981" border="rgba(16,185,129,0.25)">
            👁 {topic.views}
          </Badge>
        )}
        {topic.competition && (
          <Badge bg={comp.bg} color={comp.color} border={comp.border}>
            ⚔ {topic.competition} Competition
          </Badge>
        )}
        {topic.potential && (
          <Badge bg="rgba(124,58,237,0.12)" color="var(--accent-light)" border="rgba(124,58,237,0.25)">
            🚀 {topic.potential} Potential
          </Badge>
        )}
        {topic.monthly_searches && (
          <Badge bg="rgba(16,185,129,0.12)" color="#10b981" border="rgba(16,185,129,0.25)">
            🔍 {topic.monthly_searches}/month
          </Badge>
        )}
        {topic.earning && (
          <Badge bg="rgba(245,158,11,0.12)" color="#f59e0b" border="rgba(245,158,11,0.25)">
            💰 {topic.earning}
          </Badge>
        )}
        {topic.advantage && (
          <Badge bg="rgba(124,58,237,0.12)" color="var(--accent-light)" border="rgba(124,58,237,0.25)">
            🏆 {topic.advantage}
          </Badge>
        )}
      </div>
    </div>
  );
}

export default function ContentFinder() {
  const navigate = useNavigate();
  const [niche, setNiche]         = useState("");
  const [goal, setGoal]           = useState("$1000/month");
  const [loading, setLoading]     = useState(false);
  const [data, setData]           = useState(null);
  const [error, setError]         = useState("");
  const [activeTab, setActiveTab] = useState("viral");

  async function findContent() {
    if (!niche.trim()) return;
    setLoading(true);
    setData(null);
    setError("");
    try {
      const res = await fetch("https://vidflow-ai-production.up.railway.app/api/topic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ niche, goal }),
      });
      const result = await res.json();
      if (result.success) {
        setData(result.data);
        setActiveTab("viral");
      } else {
        setError(result.error || "Something went wrong");
      }
    } catch (err) {
      setError("Cannot connect to server. Make sure backend is running.");
    }
    setLoading(false);
  }

  function searchYoutube(title) {
    window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(title)}`, "_blank");
  }

  function searchGoogle(title) {
    window.open(`https://www.google.com/search?q=${encodeURIComponent(title)}`, "_blank");
  }

  const tabs = [
    { key: "viral",     label: "🔥 Viral",    count: data?.viral_topics?.length     || 0 },
    { key: "evergreen", label: "💡 Evergreen", count: data?.evergreen_topics?.length || 0 },
    { key: "untapped",  label: "⚡ Untapped",  count: data?.untapped_topics?.length  || 0 },
    { key: "shorts",    label: "📱 Shorts",    count: data?.shorts_ideas?.length     || 0 },
    { key: "keywords",  label: "🔑 Keywords",  count: data?.keywords?.length         || 0 },
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
          <div className="toolPageIcon" style={{ fontSize: "24px", background: "#1a2a00" }}>
            💡
          </div>
          <div>
            <div className="toolPageTitle">Content Finder</div>
            <div className="toolPageSubtitle">
              Find viral topics, evergreen ideas & untapped niches
            </div>
          </div>
        </div>

        <div className="swLayout">

          {/* LEFT */}
          <div className="swLeft">
            <div className="swCard">
              <div className="swCardTitle">💡 Research Details</div>

              <div className="swField">
                <label className="swLabel">Your Niche / Topic *</label>
                <input
                  className="swInput"
                  placeholder="e.g. Movie Explanation, Cooking, Tech Reviews..."
                  value={niche}
                  onChange={(e) => setNiche(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && findContent()}
                />
              </div>

              <div className="swField">
                <label className="swLabel">Income Goal</label>
                <div className="swOptions">
                  {goals.map((g) => (
                    <button
                      key={g}
                      className={`swOption ${goal === g ? "swOptionActive" : ""}`}
                      onClick={() => setGoal(g)}
                    >{g}</button>
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
                onClick={findContent}
                disabled={loading || !niche.trim()}
              >
                {loading
                  ? <><RefreshCw size={15} className="swSpinner" /> Finding...</>
                  : <><Wand2 size={15} /> Find Content Ideas 💡</>
                }
              </button>
            </div>

            <div className="swTipsCard">
              <div className="swTipsTitle">💡 Pro Tips</div>
              <ul className="swTipsList">
                <li>Click 🔴 to check YouTube competition</li>
                <li>Click 🔵 to Google search the topic</li>
                <li>Low competition = fastest channel growth</li>
                <li>Untapped = first mover advantage</li>
                <li>Post trending topics within 48 hours</li>
              </ul>
            </div>
          </div>

          {/* RIGHT */}
          <div className="swOutputCard">

            {!data && !loading && (
              <div className="swEmptyState">
                <div className="swEmptyIcon">💡</div>
                <p>Type your niche or topic above</p>
                <p>and click <strong>Find Content Ideas</strong></p>
              </div>
            )}

            {loading && (
              <div className="swLoadingState">
                <div className="swLoadingDots"><span /><span /><span /></div>
                <p>Finding best content opportunities...</p>
              </div>
            )}

            {data && (
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

                {/* Tabs */}
                <div style={{
                  display: "flex", gap: "7px", flexWrap: "wrap",
                  borderBottom: "1px solid var(--border-subtle)",
                  paddingBottom: "12px",
                }}>
                  {tabs.map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => setActiveTab(tab.key)}
                      style={{
                        padding: "7px 14px", borderRadius: "99px",
                        border: "1px solid",
                        borderColor: activeTab === tab.key ? "var(--border-accent-bright)" : "var(--border-soft)",
                        background: activeTab === tab.key ? "var(--accent-15)" : "transparent",
                        color: activeTab === tab.key ? "var(--accent-light)" : "var(--text-muted)",
                        fontSize: "12.5px", fontWeight: 600, cursor: "pointer",
                        transition: "all 0.2s",
                      }}
                    >
                      {tab.label} ({tab.count})
                    </button>
                  ))}
                </div>

                {/* Viral */}
                {activeTab === "viral" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                      🔥 Trending right now — post within 48 hours!
                    </p>
                    {data.viral_topics?.length > 0
                      ? data.viral_topics.map((topic, i) => (
                          <TopicCard key={i} topic={topic} type="viral" onYoutube={searchYoutube} onGoogle={searchGoogle} />
                        ))
                      : <p style={{ color: "var(--text-muted)", fontSize: "13px" }}>No results. Try regenerating.</p>
                    }
                  </div>
                )}

                {/* Evergreen */}
                {activeTab === "evergreen" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                      💡 Always getting views — perfect for passive income!
                    </p>
                    {data.evergreen_topics?.length > 0
                      ? data.evergreen_topics.map((topic, i) => (
                          <TopicCard key={i} topic={topic} type="evergreen" onYoutube={searchYoutube} onGoogle={searchGoogle} />
                        ))
                      : <p style={{ color: "var(--text-muted)", fontSize: "13px" }}>No results. Try regenerating.</p>
                    }
                  </div>
                )}

                {/* Untapped */}
                {activeTab === "untapped" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                      ⚡ Low competition, high reward — make these NOW!
                    </p>
                    {data.untapped_topics?.length > 0
                      ? data.untapped_topics.map((topic, i) => (
                          <TopicCard key={i} topic={topic} type="untapped" onYoutube={searchYoutube} onGoogle={searchGoogle} />
                        ))
                      : <p style={{ color: "var(--text-muted)", fontSize: "13px" }}>No results. Try regenerating.</p>
                    }
                  </div>
                )}

                {/* Shorts */}
                {activeTab === "shorts" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                      📱 Viral Shorts ideas — fastest way to grow!
                    </p>
                    {data.shorts_ideas?.length > 0
                      ? data.shorts_ideas.map((short, i) => (
                          <div key={i} style={{
                            background: "var(--bg-card)",
                            border: "1px solid var(--border-soft)",
                            borderRadius: "16px", padding: "18px",
                          }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "10px", marginBottom: "10px" }}>
                              <p style={{ fontSize: "14.5px", fontWeight: 700, color: "var(--text-primary)", flex: 1, lineHeight: 1.5 }}>
                                📱 {short.title}
                              </p>
                              <button
                                onClick={() => searchYoutube(short.title + " shorts")}
                                style={{
                                  width: "34px", height: "34px", borderRadius: "10px",
                                  background: "rgba(255,0,0,0.10)",
                                  border: "1px solid rgba(255,0,0,0.25)",
                                  color: "#ff4444", cursor: "pointer",
                                  display: "flex", alignItems: "center", justifyContent: "center",
                                }}
                              ><Play size={15} /></button>
                            </div>
                            <div style={{
                              background: "var(--accent-10)",
                              border: "1px solid var(--border-accent)",
                              borderRadius: "10px", padding: "10px 14px", marginBottom: "10px",
                            }}>
                              <p style={{ fontSize: "11px", color: "var(--accent-light)", fontWeight: 700, marginBottom: "4px" }}>
                                🎯 HOOK (First 3 seconds):
                              </p>
                              <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6, fontStyle: "italic" }}>
                                "{short.hook}"
                              </p>
                            </div>
                            <Badge bg="rgba(16,185,129,0.12)" color="#10b981" border="rgba(16,185,129,0.25)">
                              👁 {short.views} views potential
                            </Badge>
                          </div>
                        ))
                      : <p style={{ color: "var(--text-muted)", fontSize: "13px" }}>No shorts found. Try regenerating.</p>
                    }
                  </div>
                )}

                {/* Keywords */}
                {activeTab === "keywords" && (
                  <div>
                    <p style={{ fontSize: "12px", color: "var(--text-muted)", marginBottom: "14px" }}>
                      🔑 Top keywords — use in titles & descriptions for SEO!
                    </p>
                    {data.keywords?.length > 0
                      ? (
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                          {data.keywords.map((kw, i) => (
                            <button
                              key={i}
                              onClick={() => searchYoutube(kw)}
                              style={{
                                padding: "9px 16px", borderRadius: "99px",
                                background: "var(--accent-10)",
                                border: "1px solid var(--border-accent)",
                                color: "var(--accent-light)",
                                fontSize: "13px", fontWeight: 600, cursor: "pointer",
                                display: "flex", alignItems: "center", gap: "6px",
                                transition: "all 0.2s",
                              }}
                            >
                              🔑 {kw} <Play size={12} />
                            </button>
                          ))}
                        </div>
                      )
                      : <p style={{ color: "var(--text-muted)", fontSize: "13px" }}>No keywords found. Try regenerating.</p>
                    }
                  </div>
                )}

                {/* Refresh */}
                <button
                  className="swActionBtn"
                  onClick={findContent}
                  style={{ justifyContent: "center", padding: "10px", marginTop: "4px" }}
                >
                  <RefreshCw size={14} /> Refresh All Results
                </button>

              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}