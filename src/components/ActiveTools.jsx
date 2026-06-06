import { useNavigate } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const tools = [
  {
    title: "Script Writer",
    desc: "AI-powered YouTube scripts in 25+ languages with hooks & CTAs.",
    emoji: "📝",
    path: "/script-writer",
    iconBg: "#1e1060",
    badgeBg: "rgba(124,58,237,0.20)",
    badgeBorder: "rgba(124,58,237,0.45)",
    badgeColor: "#b987ff",
  },
  {
    title: "SEO Generator",
    desc: "Complete YouTube SEO — titles, descriptions, hashtags & tags.",
    emoji: "🔍",
    path: "/seo-generator",
    iconBg: "#0f1e5e",
    badgeBg: "rgba(99,102,241,0.18)",
    badgeBorder: "rgba(99,102,241,0.42)",
    badgeColor: "#a5b4fc",
  },
  {
    title: "Content Finder",
    desc: "Find viral, evergreen & untapped YouTube topics with links.",
    emoji: "💡",
    path: "/content-finder",
    iconBg: "#1a2a00",
    badgeBg: "rgba(132,204,22,0.15)",
    badgeBorder: "rgba(132,204,22,0.38)",
    badgeColor: "#a3e635",
  },
  {
    title: "Channel Analyzer",
    desc: "Paste any YouTube channel — get health scores, problems & fixes.",
    emoji: "📊",
    path: "/channel-analyzer",
    iconBg: "#002535",
    badgeBg: "rgba(6,182,212,0.15)",
    badgeBorder: "rgba(6,182,212,0.38)",
    badgeColor: "#22d3ee",
  },
  {
    title: "Thumbnail AI",
    desc: "Professional thumbnail concepts & AI prompts for max CTR.",
    emoji: "🎨",
    path: "/thumbnail-ai",
    iconBg: "#2e1800",
    badgeBg: "rgba(245,158,11,0.18)",
    badgeBorder: "rgba(245,158,11,0.42)",
    badgeColor: "#fbbf24",
  },
  {
    title: "Niche Analyzer",
    desc: "RPM data, earning potential & growth blueprint for any niche.",
    emoji: "💰",
    path: "/niche-analyzer",
    iconBg: "#1a2e0a",
    badgeBg: "rgba(34,197,94,0.15)",
    badgeBorder: "rgba(34,197,94,0.38)",
    badgeColor: "#4ade80",
  },
  {
    title: "Shorts Script Writer",
    desc: "Viral 60-second YouTube Shorts scripts in multiple languages.",
    emoji: "📱",
    path: "/auto-shorts-maker",
    iconBg: "#0a2e2e",
    badgeBg: "rgba(6,182,212,0.15)",
    badgeBorder: "rgba(6,182,212,0.38)",
    badgeColor: "#22d3ee",
  },
  {
    title: "AI Voice",
    desc: "Text to Speech — 80+ voices, unlimited use, 100% free.",
    emoji: "🎙️",
    path: "/ai-voice",
    iconBg: "#0a3628",
    badgeBg: "rgba(16,185,129,0.15)",
    badgeBorder: "rgba(16,185,129,0.38)",
    badgeColor: "#4ade80",
  },
];

export default function ActiveTools() {
  const navigate = useNavigate();

  return (
    <section className="activeToolsSection">
      <div className="sectionHeader">
        <h2>🚀 Active Tools</h2>
      </div>

      <div className="activeToolsGrid">
        {tools.map((tool) => (
          <div
            className="toolCard"
            key={tool.path}
            onClick={() => navigate(tool.path)}
          >
            <div className="toolCardHeader">
              <div className="toolCardEmoji" style={{ background: tool.iconBg }}>
                {tool.emoji}
              </div>
              <button
                className="toolCardArrow"
                onClick={(e) => { e.stopPropagation(); navigate(tool.path); }}
              >
                <ArrowUpRight size={15} />
              </button>
            </div>
            <div className="toolCardTitle">{tool.title}</div>
            <div className="toolCardDesc">{tool.desc}</div>
            <div
              className="toolActiveBadge"
              style={{
                background: tool.badgeBg,
                border: "1px solid " + tool.badgeBorder,
                color: tool.badgeColor,
              }}
            >
              ✦ Active
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}