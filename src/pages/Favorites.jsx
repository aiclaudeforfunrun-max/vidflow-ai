import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

export default function Favorites() {
  return (
    <div className="dashboard">
      <Sidebar />
      <main className="main">
        <Topbar />
        <div className="toolPageHeader">
          <div className="toolPageIcon" style={{ background: "#2e1800", fontSize: "24px" }}>⭐</div>
          <div>
            <div className="toolPageTitle">Favorites</div>
            <div className="toolPageSubtitle">Your saved scripts & SEO packages</div>
          </div>
        </div>
        <div className="toolPageBody">
          <div className="swEmptyIcon">⭐</div>
          <p>No favorites yet</p>
          <p><strong>Save your best results</strong> to access them quickly here</p>
        </div>
      </main>
    </div>
  );
}