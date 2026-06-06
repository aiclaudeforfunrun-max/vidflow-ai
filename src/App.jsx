import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

// Main Pages
import Dashboard from "./pages/Dashboard";
import Pricing   from "./pages/Pricing";
import Login     from "./pages/Login";
import History   from "./pages/History";
import Favorites from "./pages/Favorites";
import Settings  from "./pages/Settings";
import Profile   from "./pages/Profile";
import Admin     from "./pages/Admin";

// Active Tools
import ScriptWriter    from "./pages/tools/ScriptWriter";
import SEOGenerator    from "./pages/tools/SEOGenerator";
import ContentFinder   from "./pages/tools/ContentFinder";
import ChannelAnalyzer from "./pages/tools/ChannelAnalyzer";
import ThumbnailAI     from "./pages/tools/ThumbnailAI";
import NicheAnalyzer   from "./pages/tools/NicheAnalyzer";
import AutoShortsMaker from "./pages/tools/AutoShortsMaker";
import AIVoice         from "./pages/tools/AIVoice";

// Upcoming Tools
import AudioNoiseRemover  from "./pages/tools/AudioNoiseRemover";
import TextToImage        from "./pages/tools/TextToImage";
import TextToVideo        from "./pages/tools/TextToVideo";
import AudioToScript      from "./pages/tools/AudioToScript";
import VideoToScript      from "./pages/tools/VideoToScript";
import AICaptionGenerator from "./pages/tools/AICaptionGenerator";
import AISubtitleTool     from "./pages/tools/AISubtitleTool";
import PictureUpscaler    from "./pages/tools/PictureUpscaler";
import AutoVideoEditing   from "./pages/tools/AutoVideoEditing";
import TopicFinder        from "./pages/tools/TopicFinder";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main */}
        <Route path="/"          element={<Dashboard />} />
        <Route path="/pricing"   element={<Pricing />} />
        <Route path="/login"     element={<Login />} />
        <Route path="/history"   element={<History />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/settings"  element={<Settings />} />
        <Route path="/profile"   element={<Profile />} />
        <Route path="/admin"     element={<Admin />} />

        {/* Active Tools */}
        <Route path="/script-writer"     element={<ScriptWriter />} />
        <Route path="/seo-generator"     element={<SEOGenerator />} />
        <Route path="/content-finder"    element={<ContentFinder />} />
        <Route path="/channel-analyzer"  element={<ChannelAnalyzer />} />
        <Route path="/thumbnail-ai"      element={<ThumbnailAI />} />
        <Route path="/niche-analyzer"    element={<NicheAnalyzer />} />
        <Route path="/auto-shorts-maker" element={<AutoShortsMaker />} />
        <Route path="/ai-voice"          element={<AIVoice />} />

        {/* Upcoming Tools */}
        <Route path="/audio-noise-remover"  element={<AudioNoiseRemover />} />
        <Route path="/text-to-image"        element={<TextToImage />} />
        <Route path="/text-to-video"        element={<TextToVideo />} />
        <Route path="/audio-to-script"      element={<AudioToScript />} />
        <Route path="/video-to-script"      element={<VideoToScript />} />
        <Route path="/ai-caption-generator" element={<AICaptionGenerator />} />
        <Route path="/ai-subtitle-tool"     element={<AISubtitleTool />} />
        <Route path="/picture-upscaler"     element={<PictureUpscaler />} />
        <Route path="/auto-video-editing"   element={<AutoVideoEditing />} />
        <Route path="/topic-finder"         element={<TopicFinder />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;