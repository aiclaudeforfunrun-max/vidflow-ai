import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

export default function Profile() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("vidflow-user") || "{}");
  const name = user.name || "VidFlow Creator";
  const initial = name[0].toUpperCase();

  return (
    <div className="dashboard">
      <Sidebar />
      <main className="main">
        <Topbar />

        <div className="toolPageHeader">
          <div className="toolPageIcon" style={{ background: "#1e1060", fontSize: "24px" }}>👤</div>
          <div>
            <div className="toolPageTitle">My Profile</div>
            <div className="toolPageSubtitle">Your VidFlow AI account</div>
          </div>
        </div>

        <div style={{ maxWidth: "500px" }}>
          <div className="swCard">

            {/* Avatar */}
            <div style={{ display:"flex", alignItems:"center", gap:"16px", marginBottom:"24px" }}>
              <div style={{
                width:"64px", height:"64px", borderRadius:"50%",
                background:"linear-gradient(135deg, var(--accent), var(--accent-bright))",
                display:"flex", alignItems:"center", justifyContent:"center",
                fontSize:"24px", fontWeight:800, color:"#fff",
                boxShadow:"0 0 0 3px var(--accent-20)",
              }}>
                {initial}
              </div>
              <div>
                <div style={{ fontSize:"18px", fontWeight:700 }}>{name}</div>
                <div style={{ fontSize:"13px", color:"var(--text-muted)" }}>
                  {user.email || "No email set"}
                </div>
                <div style={{
                  display:"inline-flex", alignItems:"center", gap:"5px",
                  background:"rgba(16,185,129,0.12)",
                  border:"1px solid rgba(16,185,129,0.30)",
                  color:"#10b981", padding:"2px 10px", borderRadius:"99px",
                  fontSize:"11px", fontWeight:700, marginTop:"4px",
                }}>
                  🆓 Free Plan
                </div>
              </div>
            </div>

            {/* Stats */}
            <div style={{
              display:"grid", gridTemplateColumns:"repeat(3,1fr)",
              gap:"12px", marginBottom:"20px",
            }}>
              {[
                { val: "0",  lbl: "Scripts" },
                { val: "0",  lbl: "SEO Packs" },
                { val: "10", lbl: "Credits Left" },
              ].map(({ val, lbl }) => (
                <div key={lbl} style={{
                  background:"var(--accent-10)",
                  border:"1px solid var(--border-accent)",
                  borderRadius:"var(--r-lg)", padding:"14px", textAlign:"center",
                }}>
                  <div style={{ fontSize:"22px", fontWeight:800 }}>{val}</div>
                  <div style={{ fontSize:"11px", color:"var(--text-muted)", marginTop:"2px" }}>{lbl}</div>
                </div>
              ))}
            </div>

            <button
              className="swGenerateBtn"
              onClick={() => navigate("/pricing")}
            >
              ⚡ Upgrade to Pro — $9/month
            </button>

          </div>
        </div>
      </main>
    </div>
  );
}