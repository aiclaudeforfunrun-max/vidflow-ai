const upcoming = [
  { emoji: "🔥", title: "Topic Finder",          bg: "#2e1000" },
  { emoji: "🎵", title: "Audio Noise Remover",   bg: "#2e0a1a" },
  { emoji: "🖼️", title: "Text To Image",          bg: "#1a0a2e" },
  { emoji: "🎬", title: "Text To Video",          bg: "#1a0a2e" },
  { emoji: "🎧", title: "Audio To Script",        bg: "#0a2818" },
  { emoji: "📹", title: "Video To Script",        bg: "#0a1a2e" },
  { emoji: "💬", title: "AI Caption Generator",  bg: "#1a0a1a" },
  { emoji: "📄", title: "AI Subtitle Tool",       bg: "#1a1a0a" },
  { emoji: "🖼️", title: "Picture Upscaler",       bg: "#2e1a0a" },
  { emoji: "✂️", title: "Auto Video Editing",     bg: "#2e0a0a" },
  { emoji: "📺", title: "Channel Buy & Sell",     bg: "#0a1a0a" },
  { emoji: "🎓", title: "YouTube Course",         bg: "#1a0a10" },
  { emoji: "🔗", title: "Viral Hooks Generator",  bg: "#2e1500" },
  { emoji: "📱", title: "Shorts Automation",      bg: "#001a2e" },
];

export default function UpcomingTools() {
  return (
    <section className="section">
      <div className="sectionHeader">
        <h2>🔮 Upcoming Tools</h2>
      </div>

      <div className="upcomingGrid">
        {upcoming.map(({ emoji, title, bg }) => (
          <div
            className="upcomingCard"
            key={title}
            style={{ cursor: "default" }}
          >
            <div className="upcomingLeft">
              <div
                className="upcomingIcon"
                style={{ background: bg, fontSize: "18px" }}
              >
                {emoji}
              </div>
              <span>{title}</span>
            </div>
            <div className="badge">Soon</div>
          </div>
        ))}
      </div>
    </section>
  );
}