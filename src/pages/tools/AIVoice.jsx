import { useState, useEffect } from "react";
import { ArrowLeft, Play, Pause, Square, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";

const languages = [
  { label: "English (US)",  lang: "en-US" },
  { label: "English (UK)",  lang: "en-GB" },
  { label: "Hindi",         lang: "hi-IN" },
  { label: "Urdu",          lang: "ur-PK" },
  { label: "Arabic",        lang: "ar-SA" },
  { label: "Spanish",       lang: "es-ES" },
  { label: "French",        lang: "fr-FR" },
  { label: "German",        lang: "de-DE" },
  { label: "Portuguese",    lang: "pt-BR" },
  { label: "Turkish",       lang: "tr-TR" },
  { label: "Indonesian",    lang: "id-ID" },
  { label: "Russian",       lang: "ru-RU" },
];

const freeTTSSites = [
  {
    name: "ElevenLabs",
    desc: "Best AI voices — 10,000 chars free/month",
    url: "https://elevenlabs.io/text-to-speech",
    color: "#f59e0b",
    emoji: "⭐",
    recommended: true,
  },
  {
    name: "Murf AI",
    desc: "Professional voices — free tier available",
    url: "https://murf.ai",
    color: "#7c3aed",
    emoji: "🎙️",
    recommended: true,
  },
  {
    name: "TTSMaker",
    desc: "100% free — unlimited — download MP3",
    url: "https://ttsmaker.com",
    color: "#10b981",
    emoji: "✅",
    recommended: true,
  },
  {
    name: "NaturalReaders",
    desc: "Free online TTS with download",
    url: "https://www.naturalreaders.com/online",
    color: "#06b6d4",
    emoji: "🔊",
    recommended: false,
  },
  {
    name: "Speechify",
    desc: "Free TTS with natural voices",
    url: "https://speechify.com/text-to-speech-online",
    color: "#6366f1",
    emoji: "🗣️",
    recommended: false,
  },
  {
    name: "VoiceGenerator.io",
    desc: "Free AI voice generator — MP3 download",
    url: "https://voicegenerator.io",
    color: "#ef4444",
    emoji: "🎵",
    recommended: false,
  },
  {
    name: "Microsoft Azure TTS",
    desc: "Neural voices — free 500K chars/month",
    url: "https://azure.microsoft.com/en-us/products/ai-services/text-to-speech",
    color: "#0078d4",
    emoji: "💎",
    recommended: false,
  },
  {
    name: "Play.ht",
    desc: "AI voices with free tier",
    url: "https://play.ht",
    color: "#f97316",
    emoji: "▶️",
    recommended: false,
  },
];

export default function AIVoice() {
  const navigate = useNavigate();
  const [text, setText]           = useState("");
  const [language, setLanguage]   = useState("en-US");
  const [rate, setRate]           = useState(1);
  const [pitch, setPitch]         = useState(1);
  const [voices, setVoices]       = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [speaking, setSpeaking]   = useState(false);
  const [paused, setPaused]       = useState(false);
  const [supported, setSupported] = useState(true);
  const [copied, setCopied]       = useState(false);

  useEffect(() => {
    if (!window.speechSynthesis) { setSupported(false); return; }
    function loadVoices() {
      const v = window.speechSynthesis.getVoices();
      setVoices(v);
      if (v.length > 0) setSelectedVoice(v[0].name);
    }
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  const filteredVoices = voices.filter((v) =>
    v.lang.startsWith(language.split("-")[0])
  );

  function speak() {
    if (!text.trim()) return;
    window.speechSynthesis.cancel();
    const utter    = new SpeechSynthesisUtterance(text);
    utter.lang     = language;
    utter.rate     = rate;
    utter.pitch    = pitch;
    const voice    = voices.find((v) => v.name === selectedVoice) || filteredVoices[0] || voices[0];
    if (voice) utter.voice = voice;
    utter.onstart  = () => { setSpeaking(true); setPaused(false); };
    utter.onend    = () => { setSpeaking(false); setPaused(false); };
    utter.onerror  = () => { setSpeaking(false); setPaused(false); };
    window.speechSynthesis.speak(utter);
  }

  function pauseSpeak() {
    if (speaking && !paused) { window.speechSynthesis.pause(); setPaused(true); }
    else if (paused) { window.speechSynthesis.resume(); setPaused(false); }
  }

  function stopSpeak() {
    window.speechSynthesis.cancel();
    setSpeaking(false);
    setPaused(false);
  }

  function copyText() {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const estTime   = Math.ceil((wordCount / 150) * (1 / rate));

  return (
    <div className="dashboard">
      <Sidebar />
      <main className="main">
        <Topbar />

        <button className="swBackBtn" onClick={() => navigate("/")}>
          <ArrowLeft size={15} /> Dashboard
        </button>

        <div className="toolPageHeader">
          <div className="toolPageIcon" style={{ fontSize: "24px", background: "#0a3628" }}>
            🎙️
          </div>
          <div>
            <div className="toolPageTitle">AI Voice</div>
            <div className="toolPageSubtitle">
              Preview voice here → Copy text → Download MP3 from free tools below
            </div>
          </div>
        </div>

        <div className="swLayout">

          {/* LEFT */}
          <div className="swLeft">
            <div className="swCard">
              <div className="swCardTitle">🎙️ Voice Preview Settings</div>

              <div className="swField">
                <label className="swLabel">Language</label>
                <select
                  className="swSelect"
                  value={language}
                  onChange={(e) => { setLanguage(e.target.value); setSelectedVoice(null); }}
                >
                  {languages.map((l) => (
                    <option key={l.lang} value={l.lang}>{l.label}</option>
                  ))}
                </select>
              </div>

              {filteredVoices.length > 0 && (
                <div className="swField">
                  <label className="swLabel">Voice</label>
                  <select
                    className="swSelect"
                    value={selectedVoice || ""}
                    onChange={(e) => setSelectedVoice(e.target.value)}
                  >
                    {filteredVoices.map((v) => (
                      <option key={v.name} value={v.name}>
                        {v.name} {v.localService ? "⚡" : "🌐"}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="swField">
                <label className="swLabel">Speed — {rate}x</label>
                <input
                  type="range" min="0.5" max="2" step="0.1"
                  value={rate}
                  onChange={(e) => setRate(parseFloat(e.target.value))}
                  style={{ width: "100%", accentColor: "var(--accent)" }}
                />
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "var(--text-dim)", marginTop: "4px" }}>
                  <span>Slow</span><span>Normal</span><span>Fast</span>
                </div>
              </div>

              <div className="swField">
                <label className="swLabel">Pitch — {pitch}</label>
                <input
                  type="range" min="0" max="2" step="0.1"
                  value={pitch}
                  onChange={(e) => setPitch(parseFloat(e.target.value))}
                  style={{ width: "100%", accentColor: "var(--accent)" }}
                />
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "var(--text-dim)", marginTop: "4px" }}>
                  <span>Low</span><span>Normal</span><span>High</span>
                </div>
              </div>
            </div>

            {/* Free TTS Sites */}
            <div className="swCard">
              <div className="swCardTitle">🚀 Download MP3 — Free Tools</div>
              <p style={{ fontSize: "12px", color: "var(--text-muted)", marginBottom: "14px", lineHeight: 1.6 }}>
                Copy your text → Open any tool → Paste → Download MP3!
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {freeTTSSites.map((site) => (
                  <button
                    key={site.name}
                    onClick={() => window.open(site.url, "_blank")}
                    style={{
                      display: "flex", alignItems: "center",
                      justifyContent: "space-between",
                      padding: "10px 14px", borderRadius: "10px",
                      background: `${site.color}15`,
                      border: `1px solid ${site.color}${site.recommended ? "60" : "30"}`,
                      color: site.color, cursor: "pointer",
                      fontSize: "12.5px", fontWeight: 600,
                      textAlign: "left",
                    }}
                  >
                    <span>
                      {site.emoji} {site.name}
                      {site.recommended && (
                        <span style={{
                          marginLeft: "6px", fontSize: "10px",
                          background: site.color, color: "#fff",
                          padding: "2px 7px", borderRadius: "99px",
                        }}>Best</span>
                      )}
                      <span style={{ display: "block", fontSize: "11px", opacity: 0.7, fontWeight: 400 }}>
                        {site.desc}
                      </span>
                    </span>
                    <ExternalLink size={13} style={{ flexShrink: 0 }} />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="swOutputCard">
            <div className="swOutputHeader">
              <div className="swOutputTitle">🎙️ Your Script</div>
              {text && (
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                    {wordCount} words • ~{estTime} min
                  </span>
                  <button className="swActionBtn" onClick={copyText}>
                    {copied ? "✅ Copied!" : "📋 Copy Text"}
                  </button>
                </div>
              )}
            </div>

            {/* Text Area */}
            <textarea
              placeholder="Paste your YouTube script here to preview voice..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              style={{
                width: "100%", minHeight: "260px",
                background: "#060d1a",
                border: "1px solid var(--border-soft)",
                borderRadius: "14px", padding: "16px",
                color: "var(--text-primary)", fontSize: "14px",
                lineHeight: "1.8", resize: "vertical",
                outline: "none", fontFamily: "inherit",
                marginBottom: "16px",
              }}
              onFocus={(e) => e.target.style.borderColor = "var(--border-accent)"}
              onBlur={(e) => e.target.style.borderColor = "var(--border-soft)"}
            />

            {/* Play Controls */}
            <div style={{ display: "flex", gap: "10px", marginBottom: "16px" }}>
              <button
                onClick={speak}
                disabled={!text.trim() || !supported}
                style={{
                  flex: 1, display: "flex", alignItems: "center",
                  justifyContent: "center", gap: "8px",
                  padding: "14px", borderRadius: "12px",
                  background: speaking
                    ? "linear-gradient(90deg, #10b981, #059669)"
                    : "linear-gradient(90deg, var(--accent), var(--accent-bright))",
                  color: "#fff", border: "none", cursor: "pointer",
                  fontSize: "14px", fontWeight: 700,
                  opacity: !text.trim() || !supported ? 0.5 : 1,
                }}
              >
                <Play size={16} />
                {speaking ? "Playing..." : "▶ Preview Voice"}
              </button>

              <button
                onClick={pauseSpeak}
                disabled={!speaking}
                style={{
                  padding: "14px 18px", borderRadius: "12px",
                  background: paused ? "rgba(245,158,11,0.15)" : "var(--bg-card)",
                  border: `1px solid ${paused ? "rgba(245,158,11,0.40)" : "var(--border-soft)"}`,
                  color: paused ? "#f59e0b" : "var(--text-muted)",
                  cursor: "pointer", display: "flex", alignItems: "center", gap: "6px",
                  fontSize: "13px", fontWeight: 600,
                  opacity: !speaking ? 0.5 : 1,
                }}
              >
                <Pause size={15} />
                {paused ? "Resume" : "Pause"}
              </button>

              <button
                onClick={stopSpeak}
                disabled={!speaking && !paused}
                style={{
                  padding: "14px 18px", borderRadius: "12px",
                  background: "rgba(239,68,68,0.10)",
                  border: "1px solid rgba(239,68,68,0.30)",
                  color: "#ef4444", cursor: "pointer",
                  display: "flex", alignItems: "center", gap: "6px",
                  fontSize: "13px", fontWeight: 600,
                  opacity: !speaking && !paused ? 0.5 : 1,
                }}
              >
                <Square size={15} />
                Stop
              </button>
            </div>

            {/* Status */}
            {speaking && (
              <div style={{
                marginBottom: "16px", padding: "12px 16px",
                background: "rgba(16,185,129,0.10)",
                border: "1px solid rgba(16,185,129,0.30)",
                borderRadius: "10px", fontSize: "13px",
                color: "#10b981", display: "flex", alignItems: "center", gap: "8px",
              }}>
                <div style={{
                  width: "8px", height: "8px", borderRadius: "50%",
                  background: "#10b981", animation: "blink 1s infinite",
                }} />
                {paused ? "⏸ Paused" : "🎙️ Speaking..."}
              </div>
            )}

            {/* How to use */}
            <div style={{
              padding: "16px",
              background: "var(--accent-10)",
              border: "1px solid var(--border-accent)",
              borderRadius: "12px",
            }}>
              <p style={{ fontSize: "12px", fontWeight: 700, color: "var(--accent-light)", marginBottom: "10px" }}>
                🎬 How to get MP3 voice for your video:
              </p>
              {[
                "1. Paste your script above",
                "2. Click Preview Voice to hear it",
                "3. Click 📋 Copy Text button",
                "4. Open TTSMaker or ElevenLabs below",
                "5. Paste text → Select voice → Download MP3",
                "6. Use MP3 in your video editing software",
              ].map((step, i) => (
                <p key={i} style={{ fontSize: "12px", color: "var(--text-muted)", lineHeight: 1.8 }}>
                  {step}
                </p>
              ))}
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}