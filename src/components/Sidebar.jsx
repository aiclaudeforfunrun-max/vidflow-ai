import { useNavigate, useLocation } from "react-router-dom";

const ADMIN_EMAIL = "waseeqasimkhan104@gmail.com";

const menuItems = [
  { label: "Dashboard",        path: "/",                  icon: "⊞"  },
  { type: "divider" },
  { type: "label", text: "TOOLS" },
  { label: "Script Writer",    path: "/script-writer",     icon: "📝" },
  { label: "SEO Generator",    path: "/seo-generator",     icon: "🔍" },
  { label: "Content Finder",   path: "/content-finder",    icon: "💡" },
  { label: "Channel Analyzer", path: "/channel-analyzer",  icon: "📊" },
  { label: "Thumbnail AI",     path: "/thumbnail-ai",      icon: "🎨" },
  { label: "Niche Analyzer",   path: "/niche-analyzer",    icon: "💰" },
  { label: "Shorts Script",    path: "/auto-shorts-maker", icon: "📱" },
  { label: "AI Voice",         path: "/ai-voice",          icon: "🎙️" },
  { type: "divider" },
  { type: "label", text: "GENERAL" },
  { label: "History",          path: "/history",           icon: "🕐" },
  { label: "Favorites",        path: "/favorites",         icon: "⭐" },
  { label: "Settings",         path: "/settings",          icon: "⚙️" },
  { label: "Profile",          path: "/profile",           icon: "👤" },
  { label: "Pricing",          path: "/pricing",           icon: "⚡" },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const user     = JSON.parse(localStorage.getItem("vidflow-user") || "{}");
  const initial  = (user?.username || user?.email || "V")[0].toUpperCase();
  const username = user?.username || user?.email || "VidFlow Creator";
  const isAdmin  = user?.email === ADMIN_EMAIL;

  return (
    <aside className="sidebar">

      {/* Logo */}
      <div className="logoWrap">
        <div className="logoIcon">V</div>
        <div className="logo">VidFlow <span>AI</span></div>
        <div className="logoBadge">PRO</div>
      </div>

      {/* Nav */}
      <nav className="sidebarNav">
        <div className="menu">
          {menuItems.map((item, i) => {
            if (item.type === "divider") return <div key={i} className="menuDivider" />;
            if (item.type === "label")   return <div key={i} className="menuLabel">{item.text}</div>;

            const isActive = item.path === "/"
              ? location.pathname === "/"
              : location.pathname.startsWith(item.path);

            return (
              <button
                key={item.path}
                className={`menuItem ${isActive ? "active" : ""}`}
                onClick={() => navigate(item.path)}
                style={{
                  background: "none", border: "none",
                  width: "100%", textAlign: "left", cursor: "pointer",
                }}
              >
                <span style={{ fontSize: "16px" }}>{item.icon}</span>
                {item.label}
              </button>
            );
          })}

          {/* Admin Only */}
          {isAdmin && (
            <>
              <div className="menuDivider" />
              <div className="menuLabel">ADMIN</div>
              <button
                className={`menuItem ${location.pathname === "/admin" ? "active" : ""}`}
                onClick={() => navigate("/admin")}
                style={{
                  background: "none", border: "none",
                  width: "100%", textAlign: "left", cursor: "pointer",
                }}
              >
                <span style={{ fontSize: "16px" }}>🛡️</span>
                Admin Panel
              </button>
            </>
          )}
        </div>
      </nav>

      {/* Profile */}
      <div className="profileCard">
        <div
          className="profileCardInner"
          onClick={() => navigate("/profile")}
          style={{ cursor: "pointer" }}
        >
          <div className="profileLeft">
            <div className="profileAvatar">{initial}</div>
            <div style={{ overflow: "hidden" }}>
              <div className="profileName" style={{
                fontSize: "11.5px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                maxWidth: "120px",
              }}>
                {username}
              </div>
              <div className="profilePlan">
                <div className="profilePlanDot" />
                {isAdmin ? "Admin 🛡️" : "Free Plan"}
              </div>
            </div>
          </div>
        </div>
      </div>

    </aside>
  );
}