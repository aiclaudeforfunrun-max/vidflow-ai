import { useNavigate } from "react-router-dom";
import { Check, Zap, Crown, Gift } from "lucide-react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

const plans = [
  {
    name: "Free",
    emoji: "🆓",
    price: "0",
    period: "forever",
    desc: "Perfect to get started and explore VidFlow AI",
    color: "#10b981",
    bg: "rgba(16,185,129,0.08)",
    border: "rgba(16,185,129,0.25)",
    btnBg: "rgba(16,185,129,0.15)",
    btnColor: "#10b981",
    btnBorder: "rgba(16,185,129,0.40)",
    badge: null,
    features: [
      "10 AI generations per month",
      "Access to all 7 active tools",
      "Script Writer — 10 scripts",
      "SEO Generator — 10 packages",
      "Content Finder — 10 searches",
      "Channel Analyzer — 10 analyses",
      "Thumbnail AI — 10 concepts",
      "Topic Finder — 10 searches",
      "Niche Analyzer — 10 analyses",
      "Download results as TXT",
      "Basic email support",
    ],
    notIncluded: [
      "Unlimited generations",
      "Priority support",
      "Team access",
      "API access",
    ],
  },
  {
    name: "Pro",
    emoji: "⚡",
    price: "9",
    period: "per month",
    desc: "For serious YouTubers who want to grow fast",
    color: "#7c3aed",
    bg: "rgba(124,58,237,0.10)",
    border: "rgba(124,58,237,0.50)",
    btnBg: "linear-gradient(90deg, #7c3aed, #9b5cff)",
    btnColor: "#ffffff",
    btnBorder: "transparent",
    badge: "Most Popular",
    features: [
      "Unlimited AI generations",
      "Access to all 7 active tools",
      "Script Writer — unlimited",
      "SEO Generator — unlimited",
      "Content Finder — unlimited",
      "Channel Analyzer — unlimited",
      "Thumbnail AI — unlimited",
      "Topic Finder — unlimited",
      "Niche Analyzer — unlimited",
      "Download results as TXT & PDF",
      "Priority email support",
      "Early access to new tools",
      "No watermark on outputs",
    ],
    notIncluded: [
      "Team access",
      "API access",
      "White label",
    ],
  },
  {
    name: "Agency",
    emoji: "👑",
    price: "29",
    period: "per month",
    desc: "For agencies & teams managing multiple channels",
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.08)",
    border: "rgba(245,158,11,0.35)",
    btnBg: "linear-gradient(90deg, #d97706, #f59e0b)",
    btnColor: "#ffffff",
    btnBorder: "transparent",
    badge: "Best Value",
    features: [
      "Everything in Pro",
      "5 team member accounts",
      "Manage 10 YouTube channels",
      "Bulk script generation",
      "Bulk SEO generation",
      "API access",
      "White label reports",
      "Custom branding",
      "Priority 24/7 support",
      "Dedicated account manager",
      "Monthly strategy call",
      "Early beta features",
      "Cancel anytime",
    ],
    notIncluded: [],
  },
];

const faqs = [
  {
    q: "Can I cancel anytime?",
    a: "Yes! Cancel anytime with no questions asked. You keep access until your billing period ends.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major credit cards, debit cards, and PayPal. Secure payments via Stripe.",
  },
  {
    q: "Is there a free trial for Pro?",
    a: "Yes! Start with our Free plan which gives you 10 generations to test all tools before upgrading.",
  },
  {
    q: "How many YouTube channels can I manage?",
    a: "Free & Pro plans support 1 channel. Agency plan supports up to 10 channels with team access.",
  },
  {
    q: "Do you offer refunds?",
    a: "Yes! We offer a 7-day money back guarantee. If you're not satisfied, contact support for full refund.",
  },
];

export default function Pricing() {
  const navigate = useNavigate();

  return (
    <div className="dashboard">
      <Sidebar />
      <main className="main">
        <Topbar />

        <div className="pricingHeader">
          <div className="pricingBadge">
            <Gift size={14} />
            Start Free — No Credit Card Required
          </div>
          <h1 className="pricingTitle">
            Simple, Transparent <span>Pricing</span>
          </h1>
          <p className="pricingSubtitle">
            Choose the plan that fits your YouTube journey.
            Upgrade or downgrade anytime.
          </p>
        </div>

        <div className="pricingGrid">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="pricingCard"
              style={{
                background: plan.bg,
                border: `1px solid ${plan.border}`,
                boxShadow: plan.name === "Pro"
                  ? `0 0 40px rgba(124,58,237,0.15)`
                  : "none",
              }}
            >
              {plan.badge && (
                <div
                  className="pricingCardBadge"
                  style={{ background: plan.color, color: "#fff" }}
                >
                  {plan.name === "Pro" ? <Zap size={11} /> : <Crown size={11} />}
                  {plan.badge}
                </div>
              )}

              <div className="pricingCardTop">
                <div className="pricingEmoji">{plan.emoji}</div>
                <div className="pricingName" style={{ color: plan.color }}>
                  {plan.name}
                </div>
              </div>

              <div className="pricingPrice">
                <span className="pricingCurrency">$</span>
                <span className="pricingAmount">{plan.price}</span>
                <span className="pricingPeriod">/{plan.period}</span>
              </div>

              <p className="pricingDesc">{plan.desc}</p>

              <button
                className="pricingBtn"
                style={{
                  background: plan.btnBg,
                  color: plan.btnColor,
                  border: `1px solid ${plan.btnBorder}`,
                }}
                onClick={() => navigate("/login")}
              >
                {plan.name === "Free" ? "Get Started Free" : `Get ${plan.name} Plan`}
              </button>

              <div className="pricingDivider" />

              <div className="pricingFeatures">
                {plan.features.map((f) => (
                  <div key={f} className="pricingFeature">
                    <Check size={14} color={plan.color} />
                    <span>{f}</span>
                  </div>
                ))}
                {plan.notIncluded.map((f) => (
                  <div key={f} className="pricingFeatureNo">
                    <span style={{ color: "var(--text-dim)" }}>✕</span>
                    <span style={{ color: "var(--text-dim)", textDecoration: "line-through" }}>
                      {f}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="pricingFaq">
          <h2 className="pricingFaqTitle">❓ Frequently Asked Questions</h2>
          <div className="pricingFaqGrid">
            {faqs.map(({ q, a }) => (
              <div key={q} className="pricingFaqCard">
                <div className="pricingFaqQ">{q}</div>
                <div className="pricingFaqA">{a}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="pricingCta">
          <h2>🚀 Ready to grow your YouTube channel?</h2>
          <p>Join thousands of YouTubers using VidFlow AI to automate their content.</p>
          <button
            className="swGenerateBtn"
            style={{ width: "fit-content", padding: "14px 40px", margin: "0 auto" }}
            onClick={() => navigate("/login")}
          >
            <Zap size={16} /> Start Free Today
          </button>
        </div>

      </main>
    </div>
  );
}