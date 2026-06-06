import { Search, Bell, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const themes = [
  { name: "purple", color: "#7c3aed" },
  { name: "blue",   color: "#2563eb" },
  { name: "green",  color: "#059669" },
  { name: "red",    color: "#dc2626" },
  { name: "orange", color: "#ea580c" },
  { name: "pink",   color: "#db2777" },
  { name: "silver", color: "#475569" },
];

const allTools = [
  { name: "Script Writer",    path: "/script-writer",    emoji: "📝", desc: "AI YouTube scripts in 80+ languages" },
  { name: "SEO Generator",   path: "/seo-generator",    emoji: "🔍", desc: "Titles, descriptions, hashtags & tags" },
  { name: "Content Finder",  path: "/content-finder",   emoji: "💡", desc: "Find $1000+/month channels & topics" },
  { name: "Channel Analyzer",path: "/channel-analyzer", emoji: "📊", desc: "Analyze any YouTube channel" },
  { name: "Thumbnail AI",    path: "/thumbnail-ai",     emoji: "🎨", desc: "High CTR thumbnail concepts" },
  { name: "Topic Finder",    path: "/topic-finder",     emoji: "🔥", desc: "Viral & untapped YouTube topics" },
  { name: "Niche Analyzer",  path: "/niche-analyzer",   emoji: "💰", desc: "RPM data & earning potential" },
  { name: "Pricing",         path: "/pricing",          emoji: "⚡", desc: "View plans & upgrade" },
  { name: "Settings",        path: "/settings",         emoji: "⚙️", desc: "Manage your account" },
  { name: "History",         path: "/history",          emoji: "🕐", desc: "Your recent generations" },
  { name: "Favorites",       path: "/favorites",        emoji: "⭐", desc: "Your saved results" },
];

const notifications = [
  { id: 1, emoji: "🚀", title: "Welcome to VidFlow AI!", desc: "Start with Script Writer to generate your first script.", time: "Just now", unread: true },
  { id: 2, emoji: "🔥", title: "New Tool Coming Soon", desc: "AI Voice tool with 80+ voices is almost ready!", time: "1 day ago", unread: true },
  { id: 3, emoji: "💡", title: "Pro Tip", desc: "Use Content Finder to find $1000+/month niches.", time: "2 days ago", unread: false },
  { id: 4, emoji: "⚡", title: "Upgrade to Pro", desc: "Get unlimited generations for just $9/month.", time: "3 days ago", unread: false },
];

function hexToRgb(hex) {
  const h = hex.replace("#", "");
  return `${parseInt(h.substring(0,2),16)},${parseInt(h.substring(2,4),16)},${parseInt(h.substring(4,6),16)}`;
}

function lighten(hex, amt) {
  const h = hex.replace("#", "");
  const r = Math.min(255, parseInt(h.substring(0,2),16) + amt);
  const g = Math.min(255, parseInt(h.substring(2,4),16) + amt);
  const b = Math.min(255, parseInt(h.substring(4,6),16) + amt);
  return `rgb(${r},${g},${b})`;
}

function applyTheme(name) {
  const t = themes.find((t) => t.name === name);
  if (!t) return;
  const c = t.color;
  const rgb = hexToRgb(c);
  const s = document.documentElement.style;
  s.setProperty("--accent",               c);
  s.setProperty("--accent-bright",        lighten(c, 28));
  s.setProperty("--accent-light",         lighten(c, 55));
  s.setProperty("--accent-pale",          lighten(c, 85));
  s.setProperty("--accent-10",            `rgba(${rgb},0.10)`);
  s.setProperty("--accent-15",            `rgba(${rgb},0.15)`);
  s.setProperty("--accent-20",            `rgba(${rgb},0.20)`);
  s.setProperty("--accent-glow",          `rgba(${rgb},0.18)`);
  s.setProperty("--border-accent",        `rgba(${rgb},0.35)`);
  s.setProperty("--border-accent-bright", `rgba(${rgb},0.55)`);
}

export default function Topbar() {
  const navigate = useNavigate();
  const [showThemes, setShowThemes]   = useState(false);
  const [showNotifs, setShowNotifs]   = useState(false);
  const [activeTheme, setActiveTheme] = useState("purple");
  const [notifList, setNotifList]     = useState(notifications);
  const [query, setQuery]             = useState("");
  const [showSearch, setShowSearch]   = useState(false);
  const themeRef  = useRef(null);
  const notifRef  = useRef(null);
  const searchRef = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem("vidflow-theme") || "purple";
    setActiveTheme(saved);
    applyTheme(saved);
  }, []);

  useEffect(() => {
    function handleClick(e) {
      if (themeRef.current  && !themeRef.current.contains(e.target))  setShowThemes(false);
      if (notifRef.current  && !notifRef.current.contains(e.target))  setShowNotifs(false);
      if (searchRef.current && !searchRef.current.contains(e.target)) setShowSearch(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Ctrl+K shortcut
  useEffect(() => {
    function handleKey(e) {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setShowSearch(true);
        setTimeout(() => document.getElementById("searchInput")?.focus(), 100);
      }
      if (e.key === "Escape") setShowSearch(false);
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  const filtered = query.trim()
    ? allTools.filter((t) =>
        t.name.toLowerCase().includes(query.toLowerCase()) ||
        t.desc.toLowerCase().includes(query.toLowerCase())
      )
    : allTools;

  function handleTheme(name) {
    setActiveTheme(name);
    localStorage.setItem("vidflow-theme", name);
    applyTheme(name);
    setShowThemes(false);
  }

  function markAllRead() {
    setNotifList(notifList.map((n) => ({ ...n, unread: false })));
  }

  function goToTool(path) {
    navigate(path);
    setQuery("");
    setShowSearch(false);
  }

  const unreadCount = notifList.filter((n) => n.unread).length;

  return (
    <div className="topbarWrap">
      <div className="topbar">

        {/* Search */}
        <div
          className="searchBox"
          ref={searchRef}
          style={{ position: "relative" }}
        >
          <div className="searchIcon"><Search size={16} /></div>
          <input
            id="searchInput"
            type="text"
            placeholder="Search tools, scripts, ideas..."
            className="searchInput"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setShowSearch(true); }}
            onFocus={() => setShowSearch(true)}
          />
          {query && (
            <button
              style={{ background:"none", border:"none", color:"var(--text-dim)", cursor:"pointer", display:"flex" }}
              onClick={() => { setQuery(""); setShowSearch(false); }}
            >
              <X size={14} />
            </button>
          )}
          <div className="shortcutKey">Ctrl + K</div>

          {/* Search Results Dropdown */}
          {showSearch && (
            <div className="searchDropdown">
              <div className="searchDropdownLabel">
                {query ? `Results for "${query}"` : "All Tools"}
              </div>
              {filtered.length === 0 ? (
                <div className="searchNoResult">No tools found</div>
              ) : (
                filtered.map((tool) => (
                  <div
                    key={tool.path}
                    className="searchResultItem"
                    onClick={() => goToTool(tool.path)}
                  >
                    <span className="searchResultEmoji">{tool.emoji}</span>
                    <div>
                      <div className="searchResultName">{tool.name}</div>
                      <div className="searchResultDesc">{tool.desc}</div>
                    </div>
                    <span className="searchResultArrow">→</span>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Right */}
        <div className="topbarRight">

          {/* Theme */}
          <div style={{ position:"relative" }} ref={themeRef}>
            <button
              className="iconBtn"
              onClick={() => { setShowThemes(!showThemes); setShowNotifs(false); setShowSearch(false); }}
            >
              🎨
            </button>
            {showThemes && (
              <div className="themeDropdown">
                <div className="themeDropdownTitle">Choose Theme</div>
                <div className="themeDropdownGrid">
                  {themes.map((t) => (
                    <button
                      key={t.name}
                      className={`themeCircle ${activeTheme === t.name ? "themeCircleActive" : ""}`}
                      style={{ background: t.color }}
                      onClick={() => handleTheme(t.name)}
                      title={t.name}
                    >
                      {activeTheme === t.name && <span>✓</span>}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Notifications */}
          <div style={{ position:"relative" }} ref={notifRef}>
            <button
              className="iconBtn"
              onClick={() => { setShowNotifs(!showNotifs); setShowThemes(false); setShowSearch(false); }}
              style={{ position:"relative" }}
            >
              <Bell size={18} />
              {unreadCount > 0 && (
                <span style={{
                  position:"absolute", top:"8px", right:"8px",
                  width:"8px", height:"8px", borderRadius:"50%",
                  background:"#ef4444", border:"2px solid var(--bg-root)",
                }} />
              )}
            </button>

            {showNotifs && (
              <div className="notifDropdown">
                <div className="notifHeader">
                  <div className="notifTitle">
                    🔔 Notifications
                    {unreadCount > 0 && <span className="notifBadge">{unreadCount}</span>}
                  </div>
                  <button className="notifMarkAll" onClick={markAllRead}>Mark all read</button>
                </div>
                <div className="notifList">
                  {notifList.map((n) => (
                    <div key={n.id} className={`notifItem ${n.unread ? "notifItemUnread" : ""}`}>
                      <div className="notifEmoji">{n.emoji}</div>
                      <div className="notifContent">
                        <div className="notifItemTitle">{n.title}</div>
                        <div className="notifItemDesc">{n.desc}</div>
                        <div className="notifTime">{n.time}</div>
                      </div>
                      {n.unread && <div className="notifDot" />}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Upgrade */}
          <button className="upgradePill" onClick={() => navigate("/pricing")}>
            ⚡ Upgrade Plan
          </button>

          {/* Logout */}
          <button
            className="logoutBtn"
            onClick={() => {
              localStorage.removeItem("vidflow-user");
              navigate("/login");
            }}
          >
            🚪 Logout
          </button>

        </div>
      </div>
    </div>
  );
}