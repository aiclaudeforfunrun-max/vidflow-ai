import { Video, PenLine, Lightbulb, Image } from "lucide-react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import Hero from "../components/Hero";
import ActiveTools from "../components/ActiveTools";
import UpcomingTools from "../components/UpcomingTools";

const stats = [
  {
    title: "Videos Generated",
    value: "0",
    icon: Video,
    change: "+0%",
    iconBg: "rgba(124,58,237,0.15)",
    iconColor: "#9b5cff",
  },
  {
    title: "Scripts Written",
    value: "0",
    icon: PenLine,
    change: "+0%",
    iconBg: "rgba(37,99,235,0.15)",
    iconColor: "#60a5fa",
  },
  {
    title: "Ideas Found",
    value: "0",
    icon: Lightbulb,
    change: "+0%",
    iconBg: "rgba(6,182,212,0.15)",
    iconColor: "#22d3ee",
  },
  {
    title: "Thumbnails Created",
    value: "0",
    icon: Image,
    change: "+0%",
    iconBg: "rgba(16,185,129,0.15)",
    iconColor: "#34d399",
  },
];

export default function Dashboard() {
  return (
    <div className="dashboard">

      <Sidebar />

      <main className="main">

        <Topbar />

        <Hero />

        <ActiveTools />

        <UpcomingTools />

        {/* Stats — Upcoming ke neeche */}
        <div className="statsGrid">
          {stats.map(({ title, value, icon: Icon, change, iconBg, iconColor }) => (
            <div className="statCard" key={title}>
              <div className="statTop">
                <div className="statIcon" style={{ background: iconBg }}>
                  <Icon size={18} color={iconColor} />
                </div>
                <div className="statChange">{change}</div>
              </div>
              <div className="statTitle">{title}</div>
              <div className="statValue">{value}</div>
            </div>
          ))}
        </div>

      </main>
    </div>
  );
}