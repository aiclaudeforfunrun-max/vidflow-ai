import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const tools = [
  {
    emoji: "📝",
    title: "Script Writer",
    desc: "AI scripts in 25+ languages",
    badge: "Most Popular",
    path: "/script-writer",
    color: "#7c3aed",
  },
  {
    emoji: "🔍",
    title: "SEO Generator",
    desc: "Titles, tags & descriptions",
    badge: "VidIQ Level",
    path: "/seo-generator",
    color: "#6366f1",
  },
  {
    emoji: "💡",
    title: "Content Finder",
    desc: "Viral & untapped topics",
    badge: "Trending",
    path: "/content-finder",
    color: "#84cc16",
  },
  {
    emoji: "📊",
    title: "Channel Analyzer",
    desc: "Health scores & fixes",
    badge: "VidIQ Style",
    path: "/channel-analyzer",
    color: "#06b6d4",
  },
  {
    emoji: "🎨",
    title: "Thumbnail AI",
    desc: "High CTR concepts & prompts",
    badge: "Pro",
    path: "/thumbnail-ai",
    color: "#f59e0b",
  },
  {
    emoji: "📱",
    title: "Shorts Script",
    desc: "Viral 60-sec scripts",
    badge: "New ✨",
    path: "/auto-shorts-maker",
    color: "#06b6d4",
  },
  {
    emoji: "💰",
    title: "Niche Analyzer",
    desc: "RPM & earning potential",
    badge: "Free",
    path: "/niche-analyzer",
    color: "#22c55e",
  },
  {
    emoji: "🎙️",
    title: "AI Voice",
    desc: "Text to Speech — 80+ voices",
    badge: "Unlimited ✨",
    path: "/ai-voice",
    color: "#10b981",
  },
];

export default function Hero() {
  const navigate              = useNavigate();
  const [current, setCurrent] = useState(0);
  const currentRef            = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      currentRef.current = (currentRef.current + 1) % tools.length;
      setCurrent(currentRef.current);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const tool = tools[current];

  return (
    <section className="heroSection">
      <div className="heroGlow" />
      <div className="heroGlow2" />

      <div className="heroLayout">
        {/* Left */}
        <div className="heroLeft">
          <div className="heroBadge">
            <div className="heroBadgeDot" />
            AI-Powered YouTube Automation
          </div>

          <h1>
            Welcome to <span>VidFlow AI</span> 🚀
          </h1>

          <p>
            AI-powered tools to automate and grow your YouTube channel.
            Generate scripts, thumbnails, SEO content and viral ideas — all in one place.
          </p>

          <div className="heroStats">
            <div>
              <div className="heroStatVal">8</div>
              <div className="heroStatLbl">Active Tools</div>
            </div>
            <div>
              <div className="heroStatVal">25+</div>
              <div className="heroStatLbl">Languages</div>
            </div>
            <div>
              <div className="heroStatVal">100%</div>
              <div className="heroStatLbl">Free AI</div>
            </div>
            <div>
              <div className="heroStatVal">∞</div>
              <div className="heroStatLbl">Unlimited</div>
            </div>
          </div>
        </div>

        {/* Right — Animated Tool Card */}
        <div className="heroRight">
          <div
            className="heroAnimCard"
            style={{
              borderColor: tool.color + "50",
              background: tool.color + "10",
              cursor: "pointer",
            }}
            onClick={() => navigate(tool.path)}
          >
            <div
              className="heroAnimCardIcon"
              style={{ background: tool.color + "20", fontSize: "28px" }}
            >
              {tool.emoji}
            </div>
            <div className="heroAnimCardTitle" style={{ color: tool.color }}>
              {tool.title}
            </div>
            <div className="heroAnimCardDesc">{tool.desc}</div>
            <div
              className="heroAnimCardBadge"
              style={{
                background: tool.color + "20",
                color: tool.color,
                border: `1px solid ${tool.color}40`,
              }}
            >
              ✦ {tool.badge}
            </div>
          </div>

          {/* Mini chips */}
          <div className="heroMiniRow">
            {tools.map((t, i) => (
              <div
                key={t.path}
                className="heroMiniChip"
                style={{
                  borderColor: current === i ? t.color + "80" : "var(--border-subtle)",
                  background: current === i ? t.color + "15" : "var(--bg-card)",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setCurrent(i);
                  currentRef.current = i;
                  navigate(t.path);
                }}
              >
                <span>{t.emoji}</span>
                <span
                  className="heroMiniChipText"
                  style={{ color: current === i ? t.color : "var(--text-muted)" }}
                >
                  {t.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}