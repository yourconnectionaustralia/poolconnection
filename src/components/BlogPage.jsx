import { useState, useEffect } from "react";
import { ARTICLES } from "./blogData";

// ─── Brand tokens (PoolConnection v1.1) ───────────────────────────────────────
const B = {
  ocean: "#0077B6",
  sky: "#00B4D8",
  foam: "#CAF0F8",
  deepOcean: "#023E8A",
  white: "#FFFFFF",
  slate: "#1E293B",
  muted: "#64748B",
  surface: "#F0F9FF",
  border: "#E2EEF9",
  warning: "#F59E0B",
};

const CAT_COLORS = {
  "Water Care":     { bg: "#DBEAFE", text: "#1D4ED8" },
  "Maintenance":    { bg: "#D1FAE5", text: "#065F46" },
  "Weather Events": { bg: "#FEF3C7", text: "#92400E" },
  "Pool Safety":    { bg: "#FCE7F3", text: "#9D174D" },
  "Equipment":      { bg: "#EDE9FE", text: "#5B21B6" },
  "Seasonal":       { bg: "#F0FDF4", text: "#166534" },
};

const SEASON_COLOR = { Summer: "#FF6B35", Autumn: "#E07A5F", Winter: "#3D405B", Spring: "#81B29A" };
const CATEGORIES = ["All", ...Object.keys(CAT_COLORS)];

// ─── Shared helpers ────────────────────────────────────────────────────────────
function catStyle(cat) { return CAT_COLORS[cat] || { bg: B.foam, text: B.ocean }; }

function Pill({ text, bg, color, style = {} }) {
  return (
    <span style={{
      background: bg, color,
      fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 999,
      letterSpacing: "0.06em", textTransform: "uppercase", ...style,
    }}>
      {text}
    </span>
  );
}

// ─── Content block renderer ────────────────────────────────────────────────────
function Block({ block }) {
  switch (block.type) {
    case "intro":
      return (
        <p style={{ fontSize: 17, lineHeight: 1.75, color: B.slate, marginBottom: 28,
          paddingBottom: 20, borderBottom: `2px solid ${B.foam}` }}>
          {block.text}
        </p>
      );
    case "h2":
      return (
        <h2 style={{ fontSize: 20, fontWeight: 700, color: B.deepOcean, marginTop: 36,
          marginBottom: 10, letterSpacing: "-0.01em",
          paddingLeft: 14, borderLeft: `4px solid ${B.sky}` }}>
          {block.text}
        </h2>
      );
    case "h3":
      return (
        <h3 style={{ fontSize: 16, fontWeight: 700, color: B.slate, marginTop: 24, marginBottom: 6 }}>
          {block.text}
        </h3>
      );
    case "p":
      return (
        <p style={{ fontSize: 15, lineHeight: 1.75, color: B.slate, marginBottom: 14 }}>
          {block.text}
        </p>
      );
    case "checklist":
      return (
        <ul style={{ margin: "14px 0 20px", padding: 0, listStyle: "none" }}>
          {block.items.map((item, i) => (
            <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10,
              padding: "9px 0",
              borderBottom: i < block.items.length - 1 ? `1px solid ${B.border}` : "none",
              fontSize: 14, color: B.slate, lineHeight: 1.5 }}>
              <span style={{ width: 20, height: 20, borderRadius: 5,
                border: `2px solid ${B.ocean}`, display: "flex", alignItems: "center",
                justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                <span style={{ color: B.ocean, fontSize: 12, fontWeight: 700 }}>✓</span>
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case "steps":
      return (
        <ol style={{ margin: "14px 0 20px", padding: 0, listStyle: "none" }}>
          {block.items.map((item, i) => (
            <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 14 }}>
              <span style={{ width: 28, height: 28, borderRadius: "50%",
                background: `linear-gradient(135deg, ${B.ocean}, ${B.sky})`,
                color: B.white, display: "flex", alignItems: "center", justifyContent: "center",
                fontWeight: 700, fontSize: 13, flexShrink: 0 }}>
                {i + 1}
              </span>
              <div style={{ paddingTop: 3, fontSize: 14, color: B.slate, lineHeight: 1.6 }}>
                {typeof item === "string" ? item : (
                  <><strong>{item.label}</strong>{" — "}{item.detail}</>
                )}
              </div>
            </li>
          ))}
        </ol>
      );
    case "tip":
      return (
        <div style={{ background: B.surface, border: `1px solid ${B.sky}`,
          borderLeft: `4px solid ${B.ocean}`, borderRadius: "0 10px 10px 0",
          padding: "14px 18px", margin: "20px 0", display: "flex", gap: 10 }}>
          <span style={{ fontSize: 18, flexShrink: 0 }}>💡</span>
          <div>
            {block.label && <strong style={{ display: "block", color: B.ocean, fontSize: 12,
              fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em",
              marginBottom: 3 }}>{block.label}</strong>}
            <p style={{ margin: 0, fontSize: 14, color: B.slate, lineHeight: 1.6 }}>{block.text}</p>
          </div>
        </div>
      );
    case "warning":
      return (
        <div style={{ background: "#FFFBEB", border: `1px solid ${B.warning}`,
          borderLeft: `4px solid ${B.warning}`, borderRadius: "0 10px 10px 0",
          padding: "14px 18px", margin: "20px 0", display: "flex", gap: 10 }}>
          <span style={{ fontSize: 18, flexShrink: 0 }}>⚠️</span>
          <div>
            {block.label && <strong style={{ display: "block", color: "#B45309", fontSize: 12,
              fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em",
              marginBottom: 3 }}>{block.label}</strong>}
            <p style={{ margin: 0, fontSize: 14, color: B.slate, lineHeight: 1.6 }}>{block.text}</p>
          </div>
        </div>
      );
    case "cta":
      return (
        <div style={{ background: `linear-gradient(135deg, ${B.ocean}, ${B.sky})`,
          borderRadius: 14, padding: "24px", margin: "28px 0", textAlign: "center" }}>
          <p style={{ margin: "0 0 4px", color: B.white, fontSize: 17, fontWeight: 700 }}>
            {block.headline}
          </p>
          <p style={{ margin: "0 0 14px", color: "rgba(255,255,255,0.85)", fontSize: 13 }}>
            {block.body}
          </p>
        </div>
      );
    case "divider":
      return <div style={{ margin: "28px 0", height: 1, background: B.border }} />;
    default:
      return null;
  }
}

// ─── Article Card (list view) ──────────────────────────────────────────────────
function ArticleCard({ article, onClick }) {
  const [hov, setHov] = useState(false);
  const cs = catStyle(article.category);
  return (
    <div onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ background: B.white, borderRadius: 14,
        border: `1px solid ${hov ? B.sky : B.border}`,
        cursor: "pointer", transition: "all 0.18s",
        transform: hov ? "translateY(-2px)" : "none",
        boxShadow: hov ? `0 6px 20px rgba(0,119,182,0.1)` : "0 1px 4px rgba(0,0,0,0.05)",
        display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* Hero strip */}
      <div style={{ background: `linear-gradient(135deg, ${B.ocean}, ${B.sky})`,
        padding: "22px 20px 16px", display: "flex", alignItems: "flex-start", gap: 10 }}>
        <span style={{ fontSize: 36, lineHeight: 1 }}>{article.heroEmoji}</span>
        <div>
          <span style={{ display: "inline-block", background: "rgba(255,255,255,0.2)",
            color: B.white, fontSize: 10, fontWeight: 700, letterSpacing: "0.08em",
            textTransform: "uppercase", padding: "2px 8px", borderRadius: 999 }}>
            {article.season}
          </span>
          <div style={{ width: 28, height: 3,
            background: SEASON_COLOR[article.season] || B.ocean,
            borderRadius: 2, marginTop: 5 }} />
        </div>
      </div>
      {/* Body */}
      <div style={{ padding: "16px 20px 20px", flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", gap: 6, marginBottom: 10, flexWrap: "wrap" }}>
          <Pill text={article.category} bg={cs.bg} color={cs.text} />
          <span style={{ fontSize: 12, color: B.muted }}>{article.readTime}</span>
        </div>
        <h3 style={{ margin: "0 0 8px", fontSize: 16, fontWeight: 700,
          lineHeight: 1.35, color: B.slate }}>
          {article.title}
        </h3>
        <p style={{ margin: "0 0 14px", fontSize: 13, color: B.muted, lineHeight: 1.6, flex: 1 }}>
          {article.excerpt}
        </p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between",
          paddingTop: 12, borderTop: `1px solid ${B.border}` }}>
          <span style={{ fontSize: 12, color: B.muted }}>
            {new Date(article.publishDate).toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" })}
          </span>
          <span style={{ color: B.ocean, fontSize: 13, fontWeight: 600 }}>Read →</span>
        </div>
      </div>
    </div>
  );
}

// ─── Category filter pill ─────────────────────────────────────────────────────
function CatFilter({ label, active, onClick }) {
  return (
    <button onClick={onClick} style={{
      padding: "6px 14px", borderRadius: 999,
      border: active ? `2px solid ${B.ocean}` : `2px solid ${B.border}`,
      background: active ? B.ocean : B.white,
      color: active ? B.white : B.muted,
      fontSize: 13, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap",
      transition: "all 0.15s",
    }}>{label}</button>
  );
}

// ─── Blog List View ───────────────────────────────────────────────────────────
function BlogList({ onSelect, onSignUp }) {
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");

  const filtered = ARTICLES.filter(a => {
    const mc = cat === "All" || a.category === cat;
    const lq = q.toLowerCase();
    const ms = !lq || a.title.toLowerCase().includes(lq) || a.excerpt.toLowerCase().includes(lq);
    return mc && ms;
  }).sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Hero */}
      <div style={{ background: `linear-gradient(135deg, ${B.deepOcean}, ${B.ocean} 60%, ${B.sky})`,
        padding: "40px 0 32px", margin: "0 -20px", textAlign: "center" }}>
        <span style={{ fontSize: 36 }}>💧</span>
        <h1 style={{ margin: "10px 0 6px", fontSize: 28, fontWeight: 800,
          color: B.white, letterSpacing: "-0.02em" }}>
          Pool Care Guides
        </h1>
        <p style={{ margin: "0 0 24px", fontSize: 14, color: "rgba(255,255,255,0.8)",
          lineHeight: 1.6, padding: "0 24px" }}>
          Practical advice for Australian pool owners — every season, every weather event.
        </p>
        {/* Search */}
        <div style={{ position: "relative", maxWidth: 400, margin: "0 auto", padding: "0 20px" }}>
          <span style={{ position: "absolute", left: 36, top: "50%",
            transform: "translateY(-50%)", fontSize: 16, pointerEvents: "none" }}>🔍</span>
          <input type="text" placeholder="Search articles..." value={q}
            onChange={e => setQ(e.target.value)}
            style={{ width: "100%", padding: "12px 14px 12px 42px",
              borderRadius: 10, border: "none", fontSize: 14,
              background: "rgba(255,255,255,0.15)", color: B.white,
              outline: "none", boxSizing: "border-box" }} />
        </div>
      </div>

      {/* Category filters */}
      <div style={{ margin: "0 -20px", padding: "12px 20px",
        background: B.white, borderBottom: `1px solid ${B.border}`,
        display: "flex", gap: 8, overflowX: "auto" }}>
        {CATEGORIES.map(c => (
          <CatFilter key={c} label={c} active={cat === c} onClick={() => setCat(c)} />
        ))}
      </div>

      {/* Grid */}
      <div style={{ paddingTop: 24 }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "48px 0", color: B.muted }}>
            <span style={{ fontSize: 40 }}>🔍</span>
            <p style={{ marginTop: 12 }}>No articles match your search.</p>
          </div>
        ) : (
          <>
            <p style={{ color: B.muted, fontSize: 13, marginBottom: 16 }}>
              {filtered.length} article{filtered.length !== 1 ? "s" : ""}
              {cat !== "All" ? ` in ${cat}` : ""}
            </p>
            <div style={{ display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 18 }}>
              {filtered.map(a => (
                <ArticleCard key={a.slug} article={a} onClick={() => onSelect(a.slug)} />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Bottom CTA */}
      <div style={{ background: `linear-gradient(135deg, ${B.ocean}, ${B.sky})`,
        margin: "40px -20px 0", padding: "32px 24px", textAlign: "center" }}>
        <h3 style={{ margin: "0 0 6px", color: B.white, fontSize: 18, fontWeight: 700 }}>
          Track your pool chemistry automatically
        </h3>
        <p style={{ margin: "0 0 16px", color: "rgba(255,255,255,0.85)", fontSize: 14 }}>
          Log test results, get chemical dose recommendations, and never miss a treatment.
        </p>
        <button onClick={onSignUp}
          style={{ background: B.white, color: B.ocean, border: "none", borderRadius: 10,
            padding: "12px 28px", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
          Start free — 7 days on us
        </button>
      </div>
    </div>
  );
}

// ─── Blog Post View ───────────────────────────────────────────────────────────
function BlogPost({ slug, onBack, onSignUp }) {
  const article = ARTICLES.find(a => a.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (article) document.title = `${article.title} | PoolConnection`;
    return () => { document.title = "PoolConnection"; };
  }, [article]);

  if (!article) {
    return (
      <div style={{ textAlign: "center", padding: "60px 0", fontFamily: "'Inter', sans-serif" }}>
        <span style={{ fontSize: 48 }}>💧</span>
        <h2 style={{ color: B.slate }}>Article not found</h2>
        <button onClick={onBack}
          style={{ background: B.ocean, color: B.white, border: "none",
            borderRadius: 10, padding: "10px 22px", fontWeight: 600, cursor: "pointer" }}>
          ← Back to guides
        </button>
      </div>
    );
  }

  const cs = catStyle(article.category);
  const related = ARTICLES.filter(a => a.slug !== slug && a.category === article.category).slice(0, 3);

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Hero */}
      <div style={{ background: `linear-gradient(135deg, ${B.deepOcean}, ${B.ocean} 60%, ${B.sky})`,
        padding: "28px 0 36px", margin: "0 -20px" }}>
        <div style={{ padding: "0 20px" }}>
          <button onClick={onBack}
            style={{ background: "rgba(255,255,255,0.15)", color: B.white, border: "none",
              borderRadius: 8, padding: "7px 14px", fontSize: 13, fontWeight: 600,
              cursor: "pointer", marginBottom: 20, display: "flex", alignItems: "center", gap: 5 }}>
            ← All guides
          </button>

          <div style={{ display: "flex", gap: 6, marginBottom: 14, flexWrap: "wrap" }}>
            <Pill text={article.category} bg={cs.bg} color={cs.text} />
            <Pill text={article.season} bg="rgba(255,255,255,0.2)" color={B.white} />
            <Pill text={article.readTime} bg="rgba(255,255,255,0.15)" color={B.white} />
          </div>

          <h1 style={{ margin: "0 0 12px", fontSize: "clamp(20px, 5vw, 28px)",
            fontWeight: 800, color: B.white, lineHeight: 1.25, letterSpacing: "-0.02em" }}>
            {article.heroEmoji} {article.title}
          </h1>

          <p style={{ margin: 0, color: "rgba(255,255,255,0.65)", fontSize: 12 }}>
            {new Date(article.publishDate).toLocaleDateString("en-AU", {
              day: "numeric", month: "long", year: "numeric" })}
          </p>
        </div>
      </div>

      {/* Content */}
      <article style={{ paddingTop: 28, paddingBottom: 16 }}>
        {article.content.map((block, i) => <Block key={i} block={block} />)}
      </article>

      {/* Related */}
      {related.length > 0 && (
        <div style={{ marginTop: 32, paddingTop: 24, borderTop: `1px solid ${B.border}` }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: B.slate, marginBottom: 16 }}>
            More in {article.category}
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {related.map(r => (
              <div key={r.slug}
                onClick={() => { onBack(); setTimeout(() => {}, 0); }}
                style={{ background: B.white, border: `1px solid ${B.border}`,
                  borderRadius: 10, padding: "12px 14px", cursor: "pointer",
                  display: "flex", gap: 12, alignItems: "center" }}>
                <span style={{ fontSize: 22, flexShrink: 0 }}>{r.heroEmoji}</span>
                <div>
                  <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: B.slate, lineHeight: 1.35 }}>
                    {r.title}
                  </p>
                  <span style={{ fontSize: 12, color: B.muted }}>{r.readTime}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bottom CTA */}
      <div style={{ background: `linear-gradient(135deg, ${B.ocean}, ${B.sky})`,
        margin: "32px -20px 0", padding: "28px 24px", textAlign: "center" }}>
        <span style={{ fontSize: 30 }}>💧</span>
        <h3 style={{ margin: "10px 0 6px", color: B.white, fontSize: 18, fontWeight: 700 }}>
          Put this advice into action
        </h3>
        <p style={{ margin: "0 0 16px", color: "rgba(255,255,255,0.85)", fontSize: 13 }}>
          Log your test results, get personalised doses, and track every treatment.
        </p>
        <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
          <button onClick={onSignUp}
            style={{ background: B.white, color: B.ocean, border: "none",
              borderRadius: 10, padding: "11px 22px", fontSize: 14,
              fontWeight: 700, cursor: "pointer" }}>
            Start free — 7 days
          </button>
          <button onClick={onBack}
            style={{ background: "rgba(255,255,255,0.15)", color: B.white,
              border: "1px solid rgba(255,255,255,0.4)", borderRadius: 10,
              padding: "11px 22px", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
            ← More guides
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── BlogPage — main export ────────────────────────────────────────────────────
// Props:
//   go        — app-level navigation fn (go("home") etc.)
//   onSignUp  — optional: triggers auth/signup flow (falls back to go("home"))
export default function BlogPage({ go, onSignUp }) {
  const [slug, setSlug] = useState(null); // null = list view, string = article view

  const handleSignUp = onSignUp || (() => go("home"));

  return (
    <div>
      {slug === null
        ? <BlogList onSelect={setSlug} onSignUp={handleSignUp} />
        : <BlogPost slug={slug} onBack={() => setSlug(null)} onSignUp={handleSignUp} />
      }
    </div>
  );
}
