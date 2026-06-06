import "./../App.css";

export default function Home() {
  return (
    <div className="homePage">

      {/* SIDEBAR */}
      <div className="sidebar">

        <div className="logo">
          VidFlow <span>AI</span>
        </div>

        <div className="menu">

          <div className="menuItem active">
            🏠 Dashboard
          </div>

          <div className="menuItem">
            🔥 Topic Finder
          </div>

          <div className="menuItem">
            ✍️ Script Writer
          </div>

          <div className="menuItem">
            📈 SEO Generator
          </div>

          <div className="menuItem">
            🖼️ Thumbnail AI
          </div>

          <div className="menuItem">
            🎤 AI Voice
          </div>

        </div>

      </div>

      {/* MAIN */}
      <div className="mainContent">

        {/* TOPBAR */}
        <div className="topbar">

          <input
            type="text"
            placeholder="Search anything..."
            className="searchBar"
          />

          <button className="logoutBtn">
            Logout
          </button>

        </div>

        {/* HERO */}
        <div className="hero">

          <h1>
            Welcome to <span>VidFlow AI 🚀</span>
          </h1>

          <p>
            AI-powered tools to automate and grow your YouTube channel.
          </p>

        </div>

        {/* ACTIVE TOOLS */}
        <div className="section">

          <div className="sectionTitle">
            🚀 Active Tools
          </div>

          <div className="toolGrid">

            {/* TOOL 1 */}
            <div className="toolCard">

              <div className="toolIcon">
                📝
              </div>

              <div className="toolContent">
                <h3>Script Writer</h3>
                <p>Generate viral scripts instantly.</p>
              </div>

              <button className="arrowBtn">
                →
              </button>

            </div>

            {/* TOOL 2 */}
            <div className="toolCard">

              <div className="toolIcon">
                🎤
              </div>

              <div className="toolContent">
                <h3>AI Voice</h3>
                <p>Realistic AI voice generation.</p>
              </div>

              <button className="arrowBtn">
                →
              </button>

            </div>

            {/* TOOL 3 */}
            <div className="toolCard">

              <div className="toolIcon">
                🖼️
              </div>

              <div className="toolContent">
                <h3>Thumbnail AI</h3>
                <p>Create high CTR thumbnails.</p>
              </div>

              <button className="arrowBtn">
                →
              </button>

            </div>

            {/* TOOL 4 */}
            <div className="toolCard">

              <div className="toolIcon">
                📈
              </div>

              <div className="toolContent">
                <h3>SEO Generator</h3>
                <p>Generate SEO optimized content.</p>
              </div>

              <button className="arrowBtn">
                →
              </button>

            </div>

            {/* TOOL 5 */}
            <div className="toolCard">

              <div className="toolIcon">
                🔥
              </div>

              <div className="toolContent">
                <h3>Content Finder</h3>
                <p>Discover trending content ideas.</p>
              </div>

              <button className="arrowBtn">
                →
              </button>

            </div>

            {/* TOOL 6 */}
            <div className="toolCard">

              <div className="toolIcon">
                📊
              </div>

              <div className="toolContent">
                <h3>Channel Analyzer</h3>
                <p>Analyze competitors channels.</p>
              </div>

              <button className="arrowBtn">
                →
              </button>

            </div>

          </div>

        </div>

        {/* UPCOMING */}
        <div className="section">

          <div className="sectionTitle">
            ✨ Upcoming Tools
          </div>

          <div className="upcomingGrid">

            <div className="upcomingCard">Text To Video</div>
            <div className="upcomingCard">Audio To Script</div>
            <div className="upcomingCard">Video To Script</div>
            <div className="upcomingCard">Picture Upscaler</div>
            <div className="upcomingCard">AI Caption Generator</div>
            <div className="upcomingCard">AI Subtitle Tool</div>

          </div>

        </div>

      </div>

    </div>
  );
}