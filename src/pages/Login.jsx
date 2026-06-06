import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, User, Zap } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin]     = useState(true);
  const [showPass, setShowPass]   = useState(false);
  const [loading, setLoading]     = useState(false);
  const [email, setEmail]         = useState("");
  const [password, setPassword]   = useState("");
  const [name, setName]           = useState("");
  const [error, setError]         = useState("");

  async function handleSubmit() {
    if (!email || !password) {
      setError("Please fill all fields");
      return;
    }
    if (!isLogin && !name) {
      setError("Please enter your name");
      return;
    }
    setLoading(true);
    setError("");

    // Simulate auth — replace with real backend later
    setTimeout(() => {
      localStorage.setItem("vidflow-user", JSON.stringify({
        name: name || email.split("@")[0],
        email,
        plan: "free",
      }));
      setLoading(false);
      navigate("/");
    }, 1500);
  }

  return (
    <div className="authPage">

      {/* Left side — branding */}
      <div className="authLeft">
        <div className="authLeftContent">

          {/* Logo */}
          <div className="authLogo">
            <div className="authLogoIcon">▶</div>
            <div className="authLogoText">VidFlow <span>AI</span></div>
          </div>

          <h1 className="authLeftTitle">
            Grow Your YouTube Channel with <span>AI Power</span>
          </h1>

          <p className="authLeftDesc">
            Join thousands of YouTubers using VidFlow AI to automate
            scripts, SEO, thumbnails and content strategy.
          </p>

          {/* Features */}
          <div className="authFeatures">
            {[
              { emoji: "📝", text: "AI Script Writer in 80+ languages" },
              { emoji: "🔍", text: "Complete YouTube SEO package" },
              { emoji: "💡", text: "Find $1000+/month niches" },
              { emoji: "📊", text: "Channel analysis & growth roadmap" },
              { emoji: "🎨", text: "High CTR thumbnail concepts" },
              { emoji: "💰", text: "RPM data & earning potential" },
            ].map(({ emoji, text }) => (
              <div key={text} className="authFeatureItem">
                <span className="authFeatureEmoji">{emoji}</span>
                <span>{text}</span>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="authStats">
            <div className="authStat">
              <div className="authStatVal">7</div>
              <div className="authStatLbl">AI Tools</div>
            </div>
            <div className="authStat">
              <div className="authStatVal">80+</div>
              <div className="authStatLbl">Languages</div>
            </div>
            <div className="authStat">
              <div className="authStatVal">Free</div>
              <div className="authStatLbl">To Start</div>
            </div>
          </div>

        </div>
      </div>

      {/* Right side — form */}
      <div className="authRight">
        <div className="authForm">

          {/* Header */}
          <div className="authFormHeader">
            <h2 className="authFormTitle">
              {isLogin ? "Welcome Back! 👋" : "Get Started Free 🚀"}
            </h2>
            <p className="authFormSubtitle">
              {isLogin
                ? "Sign in to your VidFlow AI account"
                : "Create your free account — no credit card needed"}
            </p>
          </div>

          {/* Toggle */}
          <div className="authToggle">
            <button
              className={`authToggleBtn ${isLogin ? "authToggleActive" : ""}`}
              onClick={() => { setIsLogin(true); setError(""); }}
            >
              Sign In
            </button>
            <button
              className={`authToggleBtn ${!isLogin ? "authToggleActive" : ""}`}
              onClick={() => { setIsLogin(false); setError(""); }}
            >
              Sign Up
            </button>
          </div>

          {/* Name field — signup only */}
          {!isLogin && (
            <div className="authField">
              <label className="authLabel">Full Name</label>
              <div className="authInputWrap">
                <User size={16} className="authInputIcon" />
                <input
                  className="authInput"
                  type="text"
                  placeholder="Your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
          )}

          {/* Email */}
          <div className="authField">
            <label className="authLabel">Email Address</label>
            <div className="authInputWrap">
              <Mail size={16} className="authInputIcon" />
              <input
                className="authInput"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Password */}
          <div className="authField">
            <label className="authLabel">Password</label>
            <div className="authInputWrap">
              <Lock size={16} className="authInputIcon" />
              <input
                className="authInput"
                type={showPass ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              />
              <button
                className="authEyeBtn"
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          {/* Forgot password */}
          {isLogin && (
            <div style={{ textAlign: "right", marginTop: "-8px", marginBottom: "16px" }}>
              <span style={{
                fontSize: "12px",
                color: "var(--accent-light)",
                cursor: "pointer",
              }}>
                Forgot password?
              </span>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="authError">{error}</div>
          )}

          {/* Submit */}
          <button
            className="authSubmitBtn"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <span className="authLoading">
                <span /><span /><span />
              </span>
            ) : (
              <>
                <Zap size={16} />
                {isLogin ? "Sign In to VidFlow AI" : "Create Free Account"}
              </>
            )}
          </button>

          {/* Divider */}
          <div className="authDivider">
            <span>or continue with</span>
          </div>

          {/* Google */}
          <button
            className="authGoogleBtn"
            onClick={() => handleSubmit()}
          >
            <span style={{ fontSize: "18px" }}>🌐</span>
            Continue with Google
          </button>

          {/* Switch */}
          <p className="authSwitch">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <span
              className="authSwitchLink"
              onClick={() => { setIsLogin(!isLogin); setError(""); }}
            >
              {isLogin ? "Sign Up Free" : "Sign In"}
            </span>
          </p>

          {/* Terms */}
          {!isLogin && (
            <p className="authTerms">
              By signing up you agree to our{" "}
              <span style={{ color: "var(--accent-light)", cursor: "pointer" }}>
                Terms of Service
              </span>{" "}
              and{" "}
              <span style={{ color: "var(--accent-light)", cursor: "pointer" }}>
                Privacy Policy
              </span>
            </p>
          )}

        </div>
      </div>

    </div>
  );
}