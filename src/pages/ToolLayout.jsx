import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

export default function ToolLayout({ emoji, title, subtitle, iconBg }) {
  const navigate = useNavigate();

  return (
    <div className="dashboard">
      <Sidebar />
      <main className="main">
        <Topbar />

        <button className="swBackBtn" onClick={() => navigate("/")}>
          <ArrowLeft size={15} /> Dashboard
        </button>

        <div className="toolPageHeader">
          <div className="toolPageIcon" style={{ fontSize: "24px", background: iconBg || "#1e1060" }}>
            {emoji}
          </div>
          <div>
            <div className="toolPageTitle">{title}</div>
            <div className="toolPageSubtitle">{subtitle}</div>
          </div>
        </div>

        <div className="toolPageBody">
          <div className="comingSoonBadge">🔮 Coming Soon</div>
          <div style={{ fontSize: "48px", margin: "16px 0" }}>{emoji}</div>
          <p style={{ fontSize: "16px", fontWeight: 700, color: "var(--text-secondary)", marginBottom: "8px" }}>
            {title} is Under Development
          </p>
          <p style={{ fontSize: "14px", color: "var(--text-muted)", maxWidth: "400px", textAlign: "center", lineHeight: 1.7 }}>
            We are working hard to bring you this amazing tool.
            Subscribe to our newsletter to get notified when it launches!
          </p>

          <div style={{
            display: "flex",
            gap: "10px",
            marginTop: "24px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}>
            <button
              className="swGenerateBtn"
              style={{ width: "fit-content", padding: "12px 28px" }}
              onClick={() => navigate("/")}
            >
              ← Back to Dashboard
            </button>
            <button
              className="swGenerateBtn"
              style={{
                width: "fit-content",
                padding: "12px 28px",
                background: "var(--accent-10)",
                border: "1px solid var(--border-accent)",
                color: "var(--accent-light)",
              }}
              onClick={() => navigate("/pricing")}
            >
              ⚡ Upgrade Plan
            </button>
          </div>
        </div>

      </main>
    </div>
  );
}