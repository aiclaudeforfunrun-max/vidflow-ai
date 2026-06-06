import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

export default function History() {
  return (
    <div className="dashboard">
      <Sidebar />
      <main className="main">
        <Topbar />
        <div className="toolPageHeader">
          <div className="toolPageIcon" style={{ background: "#1e1060", fontSize: "24px" }}>🕐</div>
          <div>
            <div className="toolPageTitle">History</div>
            <div className="toolPageSubtitle">Your recent AI generations</div>
          </div>
        </div>
        <div className="toolPageBody">
          <div className="swEmptyIcon">🕐</div>
          <p>No history yet</p>
          <p><strong>Start using tools</strong> to see your generation history here</p>
        </div>
      </main>
    </div>
  );
}