import { useState, useRef } from "react";

const B = {
  ocean: "#0077B6", sky: "#00B4D8", foam: "#CAF0F8",
  deepOcean: "#023E8A", white: "#FFFFFF", slate: "#1E293B",
  muted: "#64748B", surface: "#F0F9FF", error: "#EF4444",
  success: "#10B981", warning: "#F59E0B",
};

const STEPS = [
  {
    id: "welcome", icon: "💧",
    title: "Welcome to PoolConnection",
    subtitle: "Your pool. Your data. Your peace of mind.",
    desc: "You're exploring as a guest. This quick 2-minute setup unlocks your personalised Pool Health Score, smart chemical alerts, and seasonal maintenance checklists.",
    cta: "Let's set up your pool →",
    skippable: false, fields: [],
  },
  {
    id: "pool_basics", icon: "🏊",
    title: "Tell us about your pool",
    subtitle: "Step 1 of 4 — Pool basics",
    desc: "We use these details to calculate the right chemical doses for your exact pool. A plunge pool needs far less chlorine than a family-sized pool.",
    cta: "Next →", skippable: false,
    fields: [
      { key: "pool_name", label: "Pool name", placeholder: "e.g. Backyard Pool, The Oasis", type: "text", required: true, hint: "Handy if you manage more than one." },
      { key: "volume_litres", label: "Volume (litres)", placeholder: "e.g. 45000", type: "number", required: true, hint: "L × W × Avg depth × 1000 for rectangles.", calc: true },
      { key: "pool_shape", label: "Pool shape", type: "select", required: true, options: ["Rectangular", "L-shaped", "Freeform / Kidney", "Round / Oval", "Plunge pool", "Lap pool"] },
    ],
  },
  {
    id: "pool_type", icon: "⚗️",
    title: "Sanitisation system",
    subtitle: "Step 2 of 4 — How you keep it clean",
    desc: "Different systems need different chemical targets. Salt pools run lower free chlorine. Mineral pools have different calcium requirements.",
    cta: "Next →", skippable: false,
    fields: [
      { key: "sanitiser_type", label: "Primary sanitisation", type: "cards", required: true, options: [
        { value: "salt_chlorinator", label: "Salt chlorinator", icon: "🧂", desc: "Most common in AU" },
        { value: "mineral", label: "Mineral / magnesium", icon: "💎", desc: "Silky feel" },
        { value: "chlorine", label: "Liquid / granular Cl", icon: "🧪", desc: "Manual dosing" },
        { value: "bromine", label: "Bromine", icon: "🔬", desc: "Spas & heated pools" },
        { value: "uv_ozone", label: "UV / Ozone assist", icon: "☀️", desc: "Low-chem system" },
        { value: "not_sure", label: "Not sure", icon: "❓", desc: "We'll help you out" },
      ]},
      { key: "pool_surface", label: "Interior surface (optional)", type: "cards", required: false, options: [
        { value: "pebblecrete", label: "Pebblecrete", icon: "🪨", desc: "High Ca demand" },
        { value: "fibreglass", label: "Fibreglass", icon: "🏄", desc: "pH sensitive" },
        { value: "vinyl", label: "Vinyl liner", icon: "📐", desc: "Alk focus" },
        { value: "concrete", label: "Concrete / painted", icon: "🎨", desc: "Standard targets" },
        { value: "tiled", label: "Tiled", icon: "🔷", desc: "Grout pH matters" },
      ]},
    ],
  },
  {
    id: "equipment", icon: "⚙️",
    title: "Your equipment",
    subtitle: "Step 3 of 4 — Pump & filter setup",
    desc: "We'll remind you when filters need backwashing, chlorinators need cell cleaning, and pumps need servicing — before problems become expensive.",
    cta: "Next →", skippable: true, skipLabel: "Skip — I'll add later",
    fields: [
      { key: "pump_brand", label: "Pump brand (optional)", placeholder: "e.g. Astral, Zodiac, Hayward", type: "text", required: false },
      { key: "filter_type", label: "Filter type", type: "cards", required: false, options: [
        { value: "sand", label: "Sand filter", icon: "⏳", desc: "Backwash weekly" },
        { value: "cartridge", label: "Cartridge", icon: "🧻", desc: "Remove & rinse" },
        { value: "de", label: "DE / Zeolite", icon: "🌊", desc: "Fine filtration" },
        { value: "not_sure", label: "Not sure", icon: "❓", desc: "Skip for now" },
      ]},
      { key: "heating", label: "Heating", type: "pills", required: false, options: ["No heating","Solar","Heat pump","Gas"] },
    ],
  },
  {
    id: "readings", icon: "🧪",
    title: "Add your first water test",
    subtitle: "Step 4 of 4 — Baseline readings",
    desc: "Your Pool Health Score starts at zero until we have a reading. Enter your latest test results here. Not sure? Most pool shops test for free.",
    cta: "Calculate my Health Score →", skippable: true, skipLabel: "I'll add readings later",
    fields: [
      { key: "free_chlorine", label: "Free chlorine", placeholder: "e.g. 2.5", type: "number", unit: "ppm", target: "1.0–3.0", required: false },
      { key: "ph", label: "pH", placeholder: "e.g. 7.4", type: "number", unit: "", target: "7.2–7.6", required: false },
      { key: "alkalinity", label: "Total alkalinity", placeholder: "e.g. 120", type: "number", unit: "ppm", target: "80–120", required: false },
      { key: "stabiliser", label: "Stabiliser / CYA", placeholder: "e.g. 50", type: "number", unit: "ppm", target: "30–60", required: false },
    ],
    ocrHint: true,
  },
  { id: "done", icon: "✅", title: "", subtitle: "", desc: "", cta: "Go to my dashboard →", skippable: false, fields: [] },
];

function ProgressBar({ step, total }) {
  const pct = Math.round((step / (total - 1)) * 100);
  return (
    <div style={{ height: 4, background: B.foam, borderRadius: 99, overflow: "hidden" }}>
      <div style={{ height: "100%", width: `${pct}%`, background: `linear-gradient(90deg,${B.sky},${B.ocean})`, borderRadius: 99, transition: "width 0.5s cubic-bezier(.16,1,.3,1)" }} />
    </div>
  );
}

function CardGrid({ options, value, onChange }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(120px,1fr))", gap: 7 }}>
      {options.map(o => {
        const sel = value === o.value;
        return (
          <button key={o.value} onClick={() => onChange(sel ? "" : o.value)}
            style={{ border: `1.5px solid ${sel ? B.sky : B.foam}`, borderRadius: 11, padding: "9px 8px", background: sel ? `${B.sky}18` : B.surface, cursor: "pointer", textAlign: "left", position: "relative", fontFamily: "inherit", transition: "all .15s" }}>
            <div style={{ fontSize: 17, marginBottom: 2 }}>{o.icon}</div>
            <div style={{ fontSize: 12, fontWeight: 600, color: B.slate }}>{o.label}</div>
            {o.desc && <div style={{ fontSize: 11, color: B.muted }}>{o.desc}</div>}
            {sel && <span style={{ position: "absolute", top: 5, right: 7, color: B.sky, fontWeight: 700, fontSize: 12 }}>✓</span>}
          </button>
        );
      })}
    </div>
  );
}

function Pills({ options, value, onChange }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
      {options.map(o => {
        const sel = value === o;
        return (
          <button key={o} onClick={() => onChange(sel ? "" : o)}
            style={{ border: `1.5px solid ${sel ? B.sky : B.foam}`, borderRadius: 99, padding: "5px 13px", fontSize: 12, fontWeight: sel ? 600 : 500, color: sel ? B.ocean : B.muted, background: sel ? `${B.sky}18` : B.surface, cursor: "pointer", fontFamily: "inherit", transition: "all .15s" }}>
            {o}
          </button>
        );
      })}
    </div>
  );
}

function HealthScore({ data }) {
  const map = { free_chlorine: [1, 3], ph: [7.2, 7.6], alkalinity: [80, 120], stabiliser: [30, 60] };
  const lbl = { free_chlorine: "Free Cl", ph: "pH", alkalinity: "Alkalinity", stabiliser: "Stabiliser" };
  const scored = Object.entries(map).map(([k, [lo, hi]]) => {
    const v = parseFloat(data[k]);
    if (isNaN(v)) return null;
    const good = v >= lo && v <= hi;
    const s = good ? 25 : Math.max(0, 25 - Math.abs(v - (lo + hi) / 2) * 7);
    return { k, v, good, s };
  }).filter(Boolean);
  if (!scored.length) return null;
  const total = Math.round(scored.reduce((a, b) => a + b.s, 0) / (scored.length * 25) * 100);
  const col = total >= 80 ? B.success : total >= 50 ? B.warning : B.error;
  const circ = 2 * Math.PI * 38;
  return (
    <div style={{ display: "flex", gap: 16, alignItems: "center", background: B.surface, border: `1px solid ${B.foam}`, borderRadius: 14, padding: 16, marginBottom: 18 }}>
      <div style={{ position: "relative", flexShrink: 0 }}>
        <svg width="88" height="88" viewBox="0 0 90 90">
          <circle cx="45" cy="45" r="38" fill="none" stroke={B.foam} strokeWidth="7" />
          <circle cx="45" cy="45" r="38" fill="none" stroke={col} strokeWidth="7"
            strokeDasharray={`${(total / 100) * circ} ${circ}`} strokeLinecap="round" transform="rotate(-90 45 45)"
            style={{ transition: "stroke-dasharray 1s ease" }} />
        </svg>
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Space Grotesk',sans-serif", fontSize: 22, fontWeight: 700, color: B.slate }}>{total}</div>
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: B.muted, marginBottom: 6, textTransform: "uppercase", letterSpacing: ".4px" }}>Health Score</div>
        {scored.map(s => (
          <div key={s.k} style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 3 }}>
            <span style={{ color: B.muted }}>{lbl[s.k]}: {s.v}</span>
            <span style={{ color: s.good ? B.success : B.warning, fontWeight: 600 }}>{s.good ? "✓ Good" : "⚠ Adjust"}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function CompleteDone({ data, onDone }) {
  const name = data.pool_name || "Your Pool";
  const hasReadings = data.free_chlorine || data.ph;
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center", gap: 10, marginBottom: 14 }}>
        {["💧", "✨", "🏊", "☀️", "💪"].map((e, i) => (
          <span key={i} style={{ fontSize: 26, display: "inline-block", animation: `popIn .4s ${i * .1}s both` }}>{e}</span>
        ))}
      </div>
      <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 22, fontWeight: 700, color: B.slate, margin: "0 0 6px", letterSpacing: "-.4px" }}>{name} is ready!</h2>
      <p style={{ fontSize: 13, color: B.muted, lineHeight: 1.6, margin: "0 0 18px" }}>
        {hasReadings ? "Here's your first Health Score snapshot. We'll track trends over time so you can spot problems early." : "Your pool profile is set up. Add a water test from the dashboard to activate your Health Score."}
      </p>
      {hasReadings && <HealthScore data={data} />}
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 18 }}>
        {[["📊","Health Score","Live chemical tracking"],["📋","Task checklist","Seasonal maintenance reminders"],["📸","OCR scan","Snap shop water test results"],["💰","Cost tracking","Chemical spend log"]].map(([ic, lb, dc]) => (
          <div key={lb} style={{ display: "flex", alignItems: "center", gap: 12, background: B.surface, border: `1px solid ${B.foam}`, borderRadius: 10, padding: "9px 13px" }}>
            <span style={{ fontSize: 18 }}>{ic}</span>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: B.slate }}>{lb}</div>
              <div style={{ fontSize: 11, color: B.muted }}>{dc}</div>
            </div>
          </div>
        ))}
      </div>
      <button style={S.primary} onClick={onDone}>Go to my dashboard →</button>
      {!hasReadings && (
        <p style={{ fontSize: 12, color: B.muted, textAlign: "center", marginTop: 10, background: `${B.warning}18`, border: `1px solid ${B.warning}30`, borderRadius: 8, padding: "7px 11px", lineHeight: 1.5 }}>
          💡 Tip: Most pool shops offer free water tests — grab one this week to unlock your score.
        </p>
      )}
    </div>
  );
}

function VolumeCalc({ onResult, onClose }) {
  const [d, setD] = useState({ l: "", w: "", dp: "" });
  const vol = d.l && d.w && d.dp ? Math.round(+d.l * +d.w * +d.dp * 1000) : null;
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.45)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 99999 }} onClick={onClose}>
      <div style={{ background: B.white, borderRadius: 16, padding: 22, width: "88%", maxWidth: 320, boxShadow: "0 20px 60px rgba(0,0,0,.2)" }} onClick={e => e.stopPropagation()}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
          <span style={{ fontSize: 20 }}>📐</span>
          <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 15, fontWeight: 700, color: B.slate, margin: 0, flex: 1 }}>Volume calculator</h3>
          <button style={{ background: "none", border: "none", fontSize: 14, cursor: "pointer", color: B.muted }} onClick={onClose}>✕</button>
        </div>
        <p style={{ fontSize: 11, color: B.muted, marginBottom: 14, lineHeight: 1.5 }}>Rectangular pools. For other shapes multiply by ~0.85 (freeform) or ~0.78 (round).</p>
        {[["l","Length (m)"],["w","Width (m)"],["dp","Avg depth (m)"]].map(([k, lb]) => (
          <div key={k} style={{ marginBottom: 10 }}>
            <label style={{ fontSize: 11, fontWeight: 600, color: B.slate, display: "block", marginBottom: 3 }}>{lb}</label>
            <input type="number" placeholder="0.0" value={d[k]} onChange={e => setD(p => ({ ...p, [k]: e.target.value }))}
              style={{ width: "100%", boxSizing: "border-box", border: `1.5px solid ${B.foam}`, borderRadius: 8, padding: "7px 10px", fontSize: 14, color: B.slate, outline: "none", background: B.surface, fontFamily: "inherit" }} />
          </div>
        ))}
        {vol && (
          <div style={{ textAlign: "center", background: B.surface, border: `1.5px solid ${B.sky}`, borderRadius: 10, padding: 10, marginTop: 6 }}>
            <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 26, fontWeight: 700, color: B.ocean }}>{vol.toLocaleString()}</span>
            <span style={{ fontSize: 13, color: B.muted }}> litres</span>
          </div>
        )}
        <button style={{ ...S.primary, marginTop: 12, opacity: vol ? 1 : .4, width: "100%" }} disabled={!vol} onClick={() => { onResult(String(vol)); onClose(); }}>
          Use this volume
        </button>
      </div>
    </div>
  );
}

const S = {
  primary: { background: `linear-gradient(135deg,${B.sky},${B.ocean})`, border: "none", borderRadius: 10, padding: "10px 20px", fontSize: 14, fontWeight: 600, color: B.white, cursor: "pointer", fontFamily: "inherit", boxShadow: `0 4px 14px ${B.ocean}40` },
  input: { flex: 1, border: `1.5px solid ${B.foam}`, borderRadius: 10, padding: "9px 11px", fontSize: 14, color: B.slate, outline: "none", background: B.surface, fontFamily: "inherit" },
};

// ── Standalone preview shell (not used in production app) ──
export default function App() {
  const [idx, setIdx] = useState(0);
  const [data, setData] = useState({});
  const [errs, setErrs] = useState({});
  const [animKey, setAnimKey] = useState(0);
  const [dir, setDir] = useState("fwd");
  const [showCalc, setShowCalc] = useState(false);
  const [done, setDone] = useState(false);

  const step = STEPS[idx];
  const set = (k, v) => { setData(p => ({ ...p, [k]: v })); setErrs(p => ({ ...p, [k]: null })); };

  const validate = () => {
    const e = {};
    step.fields.forEach(f => { if (f.required && !data[f.key]) e[f.key] = "Required"; });
    setErrs(e);
    return !Object.keys(e).length;
  };

  const next = (skip = false) => {
    if (!skip && !validate()) return;
    if (idx < STEPS.length - 1) { setDir("fwd"); setAnimKey(k => k + 1); setIdx(i => i + 1); }
  };

  const back = () => {
    if (idx > 0) { setDir("bk"); setAnimKey(k => k + 1); setIdx(i => i - 1); }
  };

  const isFirst = idx === 0;
  const isLast = idx === STEPS.length - 1;

  if (done) {
    return (
      <div style={{ minHeight: "100vh", background: `linear-gradient(135deg,${B.deepOcean},${B.ocean})`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Sans',system-ui,sans-serif", padding: 20 }}>
        <div style={{ background: B.white, borderRadius: 16, padding: 28, maxWidth: 400, width: "100%", textAlign: "center" }}>
          <div style={{ fontSize: 40, marginBottom: 10 }}>🎉</div>
          <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 20, color: B.slate, margin: "0 0 8px" }}>Onboarding complete!</h2>
          <p style={{ fontSize: 13, color: B.muted, marginBottom: 18, lineHeight: 1.6 }}>Preview only — in the real app this redirects to the dashboard.</p>
          <div style={{ background: B.surface, borderRadius: 10, padding: 14, textAlign: "left", marginBottom: 16 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: B.muted, textTransform: "uppercase", letterSpacing: ".5px", marginBottom: 8 }}>Collected data</div>
            {Object.entries(data).filter(([, v]) => v).map(([k, v]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4 }}>
                <span style={{ color: B.muted }}>{k.replace(/_/g, " ")}</span>
                <span style={{ color: B.slate, fontWeight: 600 }}>{v}</span>
              </div>
            ))}
            {!Object.values(data).some(Boolean) && <div style={{ fontSize: 12, color: B.muted }}>No data entered (all steps skipped)</div>}
          </div>
          <button style={S.primary} onClick={() => { setIdx(0); setData({}); setDone(false); }}>↺ Restart demo</button>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Space+Grotesk:wght@600;700&display=swap');
        @keyframes slideInRight { from{opacity:0;transform:translateX(28px)} to{opacity:1;transform:translateX(0)} }
        @keyframes slideInLeft  { from{opacity:0;transform:translateX(-28px)} to{opacity:1;transform:translateX(0)} }
        @keyframes popIn { 0%{opacity:0;transform:scale(.6)} 60%{transform:scale(1.1)} 100%{opacity:1;transform:scale(1)} }
        * { box-sizing: border-box; }
        input[type=number]::-webkit-inner-spin-button { -webkit-appearance:none; }
        input::placeholder { color: #94A3B8; }
        select { appearance: none; background-image: url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L5 5L9 1' stroke='%230077B6' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E"); background-repeat:no-repeat; background-position:right 12px center; }
        button:hover { opacity: .88; }
      `}</style>
      <div style={{ minHeight: "100vh", background: `linear-gradient(160deg,${B.deepOcean} 0%,${B.ocean} 50%,${B.sky} 100%)`, display: "flex", alignItems: "flex-end", justifyContent: "center", fontFamily: "'DM Sans',system-ui,sans-serif", position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", opacity: .15, pointerEvents: "none" }}>
          <div style={{ textAlign: "center", color: B.white }}>
            <div style={{ fontSize: 48, marginBottom: 8 }}>🏊</div>
            <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 22, fontWeight: 700 }}>PoolConnection</div>
            <div style={{ fontSize: 14, marginTop: 4 }}>Guest mode — setup required</div>
          </div>
        </div>
        <div style={{ background: B.white, borderRadius: "20px 20px 0 0", width: "100%", maxWidth: 520, maxHeight: "92vh", overflowY: "auto", boxShadow: "0 -8px 40px rgba(0,119,182,.22)", display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "15px 20px 12px", position: "sticky", top: 0, background: B.white, zIndex: 10, borderBottom: `1px solid ${B.foam}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: isFirst || isLast ? 0 : 10 }}>
              <DropletSVG />
              <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 15, color: B.ocean, letterSpacing: "-.2px" }}>PoolConnection</span>
              <span style={{ background: B.foam, color: B.ocean, fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 99, marginLeft: "auto", textTransform: "uppercase", letterSpacing: ".5px" }}>Guest</span>
            </div>
            {!isFirst && !isLast && <ProgressBar step={idx} total={STEPS.length} />}
          </div>
          <div key={animKey} style={{ padding: "18px 20px 0", flex: 1, animation: `${dir === "fwd" ? "slideInRight" : "slideInLeft"} .3s cubic-bezier(.16,1,.3,1)` }}>
            {isLast ? (
              <CompleteDone data={data} onDone={() => setDone(true)} />
            ) : (
              <>
                <div style={{ fontSize: 34, marginBottom: 6, display: "inline-block", animation: "popIn .35s cubic-bezier(.16,1,.3,1)" }}>{step.icon}</div>
                <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 21, fontWeight: 700, color: B.slate, margin: "0 0 2px", letterSpacing: "-.4px" }}>{step.title}</h2>
                <p style={{ fontSize: 11, fontWeight: 700, color: B.sky, margin: "0 0 8px", textTransform: "uppercase", letterSpacing: ".5px" }}>{step.subtitle}</p>
                <p style={{ fontSize: 13, color: B.muted, lineHeight: 1.65, margin: "0 0 18px" }}>{step.desc}</p>
                {step.fields.map(f => (
                  <div key={f.key} style={{ marginBottom: 16 }}>
                    <label style={{ fontSize: 12, fontWeight: 600, color: B.slate, display: "flex", alignItems: "center", gap: 6, marginBottom: 5 }}>
                      {f.label}
                      {f.required && <span style={{ color: B.error }}>*</span>}
                      {f.target && <span style={{ fontSize: 10, background: B.foam, color: B.ocean, padding: "1px 7px", borderRadius: 99, marginLeft: "auto" }}>Target: {f.target}</span>}
                    </label>
                    {(f.type === "text" || f.type === "number") && (
                      <div style={{ display: "flex", gap: 7, alignItems: "center" }}>
                        <input type={f.type} placeholder={f.placeholder} value={data[f.key] || ""} onChange={e => set(f.key, e.target.value)} style={{ ...S.input, borderColor: errs[f.key] ? B.error : B.foam }} />
                        {f.unit && <span style={{ fontSize: 12, color: B.muted, whiteSpace: "nowrap" }}>{f.unit}</span>}
                      </div>
                    )}
                    {f.type === "select" && (
                      <select value={data[f.key] || ""} onChange={e => set(f.key, e.target.value)} style={{ ...S.input, width: "100%", paddingRight: 32 }}>
                        <option value="">Select…</option>
                        {f.options.map(o => <option key={o} value={o}>{o}</option>)}
                      </select>
                    )}
                    {f.type === "cards" && <CardGrid options={f.options} value={data[f.key] || ""} onChange={v => set(f.key, v)} />}
                    {f.type === "pills" && <Pills options={f.options} value={data[f.key] || ""} onChange={v => set(f.key, v)} />}
                    {f.hint && !f.calc && <p style={{ fontSize: 11, color: B.muted, marginTop: 4, lineHeight: 1.5 }}>{f.hint}</p>}
                    {f.calc && (
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4 }}>
                        {f.hint && <p style={{ fontSize: 11, color: B.muted, margin: 0, flex: 1, lineHeight: 1.5 }}>{f.hint}</p>}
                        <button style={{ background: "none", border: "none", color: B.sky, fontSize: 11, fontWeight: 700, cursor: "pointer", textDecoration: "underline", whiteSpace: "nowrap", fontFamily: "inherit", padding: 0 }} onClick={() => setShowCalc(true)}>
                          Open calculator →
                        </button>
                      </div>
                    )}
                    {errs[f.key] && <p style={{ fontSize: 11, color: B.error, marginTop: 3 }}>{errs[f.key]}</p>}
                  </div>
                ))}
                {step.ocrHint && (
                  <div style={{ display: "flex", gap: 10, alignItems: "flex-start", background: `${B.sky}12`, border: `1px solid ${B.sky}30`, borderRadius: 11, padding: "11px 13px", marginBottom: 14 }}>
                    <span style={{ fontSize: 18, flexShrink: 0 }}>📸</span>
                    <p style={{ fontSize: 12, color: B.slate, lineHeight: 1.55, margin: 0 }}>
                      <strong>Pro tip:</strong> Got a shop water test printout? Use the <span style={{ color: B.sky, fontWeight: 700 }}>Scan results</span> feature on the dashboard to fill these in automatically.
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
          {!isLast && (
            <div style={{ padding: "13px 20px", borderTop: `1px solid ${B.foam}`, display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", bottom: 0, background: B.white }}>
              {!isFirst ? <button style={{ background: "none", border: "none", color: B.muted, fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: "inherit" }} onClick={back}>← Back</button> : <div />}
              <div style={{ display: "flex", gap: 9, alignItems: "center" }}>
                {step.skippable && (
                  <button style={{ background: "none", border: `1.5px solid ${B.foam}`, borderRadius: 10, padding: "8px 13px", fontSize: 12, fontWeight: 500, color: B.muted, cursor: "pointer", fontFamily: "inherit" }} onClick={() => next(true)}>
                    {step.skipLabel || "Skip"}
                  </button>
                )}
                <button style={S.primary} onClick={() => next(false)}>{step.cta}</button>
              </div>
            </div>
          )}
          {!isFirst && !isLast && <p style={{ textAlign: "center", fontSize: 11, color: B.muted, padding: "4px 0 10px", margin: 0 }}>Step {idx} of {STEPS.length - 2}</p>}
        </div>
      </div>
      {showCalc && <VolumeCalc onResult={v => set("volume_litres", v)} onClose={() => setShowCalc(false)} />}
    </>
  );
}

function DropletSVG() {
  return (
    <svg width="22" height="22" viewBox="0 0 32 32" fill="none">
      <defs><linearGradient id="dg2" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor={B.sky}/><stop offset="100%" stopColor={B.ocean}/></linearGradient></defs>
      <path d="M16 4C16 4 6 14 6 20A10 10 0 0026 20C26 14 16 4 16 4Z" fill="url(#dg2)"/>
      <circle cx="12" cy="19" r="2" fill="white" fillOpacity=".45"/>
      <circle cx="20" cy="17" r="1.5" fill="white" fillOpacity=".35"/>
    </svg>
  );
}
