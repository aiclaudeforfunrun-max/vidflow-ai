import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

const ADMIN_EMAIL = "waseeqasimkhan104@gmail.com"; // apna email yahan likho

export default function Admin() {
  const navigate = useNavigate();
  const [users, setUsers]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch]   = useState("");
  const [error, setError]     = useState("");
  const [msg, setMsg]         = useState("");

  // Check admin
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("vidflow-user") || "{}");
    if (user?.email !== ADMIN_EMAIL) {
      navigate("/");
      return;
    }
    fetchUsers();
  }, []);

  async function fetchUsers() {
    setLoading(true);
    try {
      const res  = await fetch("https://vidflow-ai-production.up.railway.app/api/admin/users");
      const data = await res.json();
      if (data.success) setUsers(data.users);
    } catch (err) {
      setError("Cannot connect to server.");
    }
    setLoading(false);
  }

  async function toggleBlock(id) {
    try {
      const res  = await fetch(`https://vidflow-ai-production.up.railway.app/api/admin/users/${id}/block`, { method: "PUT" });
      const data = await res.json();
      if (data.success) {
        setMsg(data.message);
        fetchUsers();
        setTimeout(() => setMsg(""), 3000);
      }
    } catch (err) {
      setError("Failed to update user.");
    }
  }

  async function changePlan(id, plan) {
    try {
      const res  = await fetch(`https://vidflow-ai-production.up.railway.app/api/admin/users/${id}/plan`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      });
      const data = await res.json();
      if (data.success) {
        setMsg("Plan updated!");
        fetchUsers();
        setTimeout(() => setMsg(""), 3000);
      }
    } catch (err) {
      setError("Failed to update plan.");
    }
  }

  async function deleteUser(id) {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      const res  = await fetch(`https://vidflow-ai-production.up.railway.app/api/admin/users/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setMsg("User deleted!");
        fetchUsers();
        setTimeout(() => setMsg(""), 3000);
      }
    } catch (err) {
      setError("Failed to delete user.");
    }
  }

  const filtered = users.filter((u) =>
    u.username?.toLowerCase().includes(search.toLowerCase()) ||
    u.email?.toLowerCase().includes(search.toLowerCase())
  );

  const planColor = {
    free:   { bg: "rgba(100,100,100,0.15)", color: "#9ca3af", border: "rgba(100,100,100,0.30)" },
    pro:    { bg: "rgba(124,58,237,0.15)",  color: "#9b5cff", border: "rgba(124,58,237,0.30)" },
    agency: { bg: "rgba(245,158,11,0.15)",  color: "#f59e0b", border: "rgba(245,158,11,0.30)" },
  };

  return (
    <div className="dashboard">
      <Sidebar />
      <main className="main">
        <Topbar />

        {/* Header */}
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "24px", fontWeight: 800, color: "var(--text-primary)", marginBottom: "6px" }}>
            🛡️ Admin Panel
          </h1>
          <p style={{ fontSize: "14px", color: "var(--text-muted)" }}>
            Manage all VidFlow AI users
          </p>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px", marginBottom: "24px" }}>
          {[
            { label: "Total Users",   value: users.length,                                    color: "#7c3aed", emoji: "👥" },
            { label: "Pro Users",     value: users.filter(u => u.plan === "pro").length,      color: "#9b5cff", emoji: "⚡" },
            { label: "Agency Users",  value: users.filter(u => u.plan === "agency").length,   color: "#f59e0b", emoji: "🏢" },
            { label: "Blocked Users", value: users.filter(u => u.isBlocked).length,           color: "#ef4444", emoji: "🚫" },
          ].map(({ label, value, color, emoji }) => (
            <div key={label} style={{
              background: "var(--bg-card)",
              border: `1px solid ${color}30`,
              borderRadius: "16px", padding: "20px",
              textAlign: "center",
            }}>
              <div style={{ fontSize: "28px", marginBottom: "8px" }}>{emoji}</div>
              <div style={{ fontSize: "28px", fontWeight: 900, color }}>{value}</div>
              <div style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "4px" }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Messages */}
        {msg && (
          <div style={{
            background: "rgba(16,185,129,0.10)", border: "1px solid rgba(16,185,129,0.30)",
            color: "#10b981", padding: "12px 16px", borderRadius: "10px", marginBottom: "16px",
            fontSize: "13px",
          }}>✅ {msg}</div>
        )}
        {error && (
          <div style={{
            background: "rgba(239,68,68,0.10)", border: "1px solid rgba(239,68,68,0.30)",
            color: "#ef4444", padding: "12px 16px", borderRadius: "10px", marginBottom: "16px",
            fontSize: "13px",
          }}>❌ {error}</div>
        )}

        {/* Search */}
        <div style={{
          background: "var(--bg-card)", border: "1px solid var(--border-soft)",
          borderRadius: "12px", padding: "0 16px",
          display: "flex", alignItems: "center", gap: "10px",
          marginBottom: "16px", height: "46px",
        }}>
          <span style={{ color: "var(--text-dim)" }}>🔍</span>
          <input
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              flex: 1, background: "none", border: "none",
              outline: "none", color: "var(--text-primary)", fontSize: "14px",
            }}
          />
          <span style={{ fontSize: "12px", color: "var(--text-dim)" }}>
            {filtered.length} users
          </span>
        </div>

        {/* Users Table */}
        <div style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border-soft)",
          borderRadius: "16px", overflow: "hidden",
        }}>
          {/* Table Header */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "2fr 2fr 1fr 1fr 1fr 1.5fr",
            padding: "14px 20px",
            background: "rgba(255,255,255,0.03)",
            borderBottom: "1px solid var(--border-subtle)",
            fontSize: "11px", fontWeight: 700,
            color: "var(--text-muted)", letterSpacing: "0.8px",
          }}>
            <span>USERNAME</span>
            <span>EMAIL</span>
            <span>PLAN</span>
            <span>STATUS</span>
            <span>JOINED</span>
            <span>ACTIONS</span>
          </div>

          {/* Users */}
          {loading ? (
            <div style={{ padding: "40px", textAlign: "center", color: "var(--text-muted)" }}>
              Loading users...
            </div>
          ) : filtered.length === 0 ? (
            <div style={{ padding: "40px", textAlign: "center", color: "var(--text-muted)" }}>
              No users found
            </div>
          ) : (
            filtered.map((user, i) => {
              const pc = planColor[user.plan] || planColor.free;
              return (
                <div
                  key={user._id}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "2fr 2fr 1fr 1fr 1fr 1.5fr",
                    padding: "14px 20px",
                    borderBottom: i < filtered.length - 1 ? "1px solid var(--border-subtle)" : "none",
                    alignItems: "center",
                    opacity: user.isBlocked ? 0.6 : 1,
                    transition: "all 0.2s",
                  }}
                >
                  {/* Username */}
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div style={{
                      width: "34px", height: "34px", borderRadius: "50%",
                      background: `hsl(${i * 40}, 60%, 40%)`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "14px", fontWeight: 700, color: "#fff", flexShrink: 0,
                    }}>
                      {(user.username || user.email)[0].toUpperCase()}
                    </div>
                    <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-primary)" }}>
                      {user.username || "—"}
                    </span>
                  </div>

                  {/* Email */}
                  <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                    {user.email}
                  </span>

                  {/* Plan */}
                  <select
                    value={user.plan}
                    onChange={(e) => changePlan(user._id, e.target.value)}
                    style={{
                      background: pc.bg, border: `1px solid ${pc.border}`,
                      color: pc.color, borderRadius: "8px",
                      padding: "4px 8px", fontSize: "12px", fontWeight: 700,
                      cursor: "pointer", outline: "none",
                    }}
                  >
                    <option value="free">Free</option>
                    <option value="pro">Pro</option>
                    <option value="agency">Agency</option>
                  </select>

                  {/* Status */}
                  <span style={{
                    fontSize: "11px", fontWeight: 700, padding: "4px 10px",
                    borderRadius: "99px", width: "fit-content",
                    background: user.isBlocked ? "rgba(239,68,68,0.12)" : "rgba(16,185,129,0.12)",
                    color: user.isBlocked ? "#ef4444" : "#10b981",
                    border: `1px solid ${user.isBlocked ? "rgba(239,68,68,0.30)" : "rgba(16,185,129,0.30)"}`,
                  }}>
                    {user.isBlocked ? "🚫 Blocked" : "✅ Active"}
                  </span>

                  {/* Joined */}
                  <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                    {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "—"}
                  </span>

                  {/* Actions */}
                  <div style={{ display: "flex", gap: "6px" }}>
                    <button
                      onClick={() => toggleBlock(user._id)}
                      style={{
                        padding: "6px 12px", borderRadius: "8px", cursor: "pointer",
                        fontSize: "11px", fontWeight: 700, border: "1px solid",
                        background: user.isBlocked ? "rgba(16,185,129,0.10)" : "rgba(239,68,68,0.10)",
                        borderColor: user.isBlocked ? "rgba(16,185,129,0.30)" : "rgba(239,68,68,0.30)",
                        color: user.isBlocked ? "#10b981" : "#ef4444",
                      }}
                    >
                      {user.isBlocked ? "Unblock" : "Block"}
                    </button>
                    <button
                      onClick={() => deleteUser(user._id)}
                      style={{
                        padding: "6px 12px", borderRadius: "8px", cursor: "pointer",
                        fontSize: "11px", fontWeight: 700,
                        background: "rgba(239,68,68,0.10)",
                        border: "1px solid rgba(239,68,68,0.30)",
                        color: "#ef4444",
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Refresh */}
        <button
          onClick={fetchUsers}
          style={{
            marginTop: "16px", padding: "10px 20px",
            background: "var(--accent-10)", border: "1px solid var(--border-accent)",
            color: "var(--accent-light)", borderRadius: "10px",
            fontSize: "13px", fontWeight: 600, cursor: "pointer",
          }}
        >
          🔄 Refresh Users
        </button>

      </main>
    </div>
  );
}