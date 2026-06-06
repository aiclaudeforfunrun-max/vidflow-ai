import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

export default function Settings() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("vidflow-user") || "{}");
  const [name, setName]   = useState(user.name || "VidFlow Creator");
  const [email, setEmail] = useState(user.email || "");
  const [saved, setSaved] = useState(false);

  function saveSettings() {
    localStorage.setItem("vidflow-user", JSON.stringify({ ...user, name, email }));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="dashboard">
      <Sidebar />
      <main className="main">
        <Topbar />

        <div className="toolPageHeader">
          <div className="toolPageIcon" style={{ background: "#002535", fontSize: "24px" }}>⚙️</div>
          <div>
            <div className="toolPageTitle">Settings</div>
            <div className="toolPageSubtitle">Manage your account & preferences</div>
          </div>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"20px", maxWidth:"800px" }}>

          <div className="swCard" style={{ gridColumn:"1 / -1" }}>
            <div className="swCardTitle">👤 Profile Settings</div>
            <div className="swField">
              <label className="swLabel">Display Name</label>
              <input
                className="swInput"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
              />
            </div>
            <div className="swField">
              <label className="swLabel">Email Address</label>
              <input
                className="swInput"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                type="email"
              />
            </div>
            <button className="swGenerateBtn" onClick={saveSettings}>
              {saved ? "✅ Saved!" : "💾 Save Settings"}
            </button>
          </div>

          <div className="swCard">
            <div className="swCardTitle">💳 Current Plan</div>
            <div style={{ display:"flex", alignItems:"center", gap:"12px", marginBottom:"16px" }}>
              <div style={{ fontSize:"32px" }}>🆓</div>
              <div>
                <div style={{ fontSize:"18px", fontWeight:800, color:"#10b981" }}>Free Plan</div>
                <div style={{ fontSize:"12px", color:"var(--text-muted)" }}>10 generations/month</div>
              </div>
            </div>
            <button className="swGenerateBtn" onClick={() => navigate("/pricing")}>
              ⚡ Upgrade to Pro
            </button>
          </div>

          <div className="swCard">
            <div className="swCardTitle">⚠️ Account</div>
            <div style={{ display:"flex", flexDirection:"column", gap:"10px" }}>
              <button
                className="logoutBtn"
                style={{ width:"100%", justifyContent:"center", padding:"12px" }}
                onClick={() => {
                  localStorage.removeItem("vidflow-user");
                  navigate("/login");
                }}
              >
                🚪 Logout
              </button>
              <button
                style={{
                  width:"100%", padding:"12px",
                  border:"1px solid rgba(239,68,68,0.20)",
                  background:"transparent", color:"var(--text-dim)",
                  borderRadius:"var(--r-md)", cursor:"pointer", fontSize:"13px",
                }}
              >
                🗑️ Delete Account
              </button>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}