import { useState, useEffect, useRef } from "react";

// ─── Brand tokens (PoolConnection v1.1) ───────────────────────────────────────
const BRAND = {
  ocean: "#0077B6",
  sky: "#00B4D8",
  foam: "#CAF0F8",
  deepOcean: "#023E8A",
  white: "#FFFFFF",
  slate: "#1E293B",
  muted: "#64748B",
  surface: "#F0F9FF",
  error: "#EF4444",
  success: "#10B981",
  warning: "#F59E0B",
};

// ─── Step definitions ─────────────────────────────────────────────────────────
const STEPS = [
  {
    id: "welcome",
    icon: "💧",
    title: "Welcome to PoolConnection",
    subtitle: "Your pool. Your data. Your peace of mind.",
    description:
      "You're exploring as a guest. This quick setup takes about 2 minutes and unlocks your personalised Pool Health Score, smart chemical alerts, and seasonal task checklists.",
    cta: "Let's set up your pool",
    skippable: false,
    fields: [],
  },
  {
    id: "pool_basics",
    icon: "🏊",
    title: "Tell us about your pool",
    subtitle: "Step 1 of 4 — Pool basics",
    description:
      "We use these details to calculate the right chemical doses for your exact pool. Every pool is different — a plunge pool needs far less chlorine than a family pool.",
    cta: "Next — Pool type",
    skippable: false,
    fields: [
      {
        key: "pool_name",
        label: "Give your pool a name",
        placeholder: "e.g. Backyard Pool, The Oasis",
        type: "text",
        required: true,
        hint: "Just something to identify it — especially handy if you manage more than one.",
      },
      {
        key: "volume_litres",
        label: "Approximate volume (litres)",
        placeholder: "e.g. 45000",
        type: "number",
        required: true,
        hint: "Not sure? Length × Width × Average Depth × 1000 gives a rough estimate. Rectangular pools only.",
        helper_link: { label: "Use our volume calculator →", action: "calc" },
      },
      {
        key: "pool_shape",
        label: "Pool shape",
        type: "select",
        required: true,
        options: ["Rectangular", "L-shaped", "Freeform / Kidney", "Round / Oval", "Plunge pool", "Lap pool"],
      },
    ],
  },
  {
    id: "pool_type",
    icon: "⚗️",
    title: "Sanitisation system",
    subtitle: "Step 2 of 4 — How you keep it clean",
    description:
      "Different systems need different chemical targets. Salt pools run lower free chlorine. Mineral pools have different calcium requirements. Getting this right means no more guessing at the pool shop.",
    cta: "Next — Equipment",
    skippable: false,
    fields: [
      {
        key: "sanitiser_type",
        label: "Primary sanitisation method",
        type: "card_select",
        required: true,
        options: [
          { value: "salt_chlorinator", label: "Salt chlorinator", icon: "🧂", desc: "Most common in AU" },
          { value: "mineral", label: "Mineral / magnesium", icon: "💎", desc: "Silky feel, growing fast" },
          { value: "chlorine", label: "Liquid / granular chlorine", icon: "🧪", desc: "Manual dosing" },
          { value: "bromine", label: "Bromine", icon: "🔬", desc: "Spas & heated pools" },
          { value: "uv_ozone", label: "UV / Ozone assist", icon: "☀️", desc: "Low-chem system" },
          { value: "not_sure", label: "Not sure", icon: "❓", desc: "We'll help you figure it out" },
        ],
      },
      {
        key: "pool_surface",
        label: "Interior surface",
        type: "card_select",
        required: false,
        options: [
          { value: "pebblecrete", label: "Pebblecrete", icon: "🪨", desc: "High calcium demand" },
          { value: "fibreglass", label: "Fibreglass", icon: "🏄", desc: "pH sensitive" },
          { value: "vinyl", label: "Vinyl liner", icon: "📐", desc: "Alkalinity focus" },
          { value: "concrete_painted", label: "Concrete / painted", icon: "🎨", desc: "Standard targets" },
          { value: "tiled", label: "Tiled", icon: "🔷", desc: "Grout pH matters" },
        ],
      },
    ],
  },
  {
    id: "equipment",
    icon: "⚙️",
    title: "Your equipment",
    subtitle: "Step 3 of 4 — Pump & filter setup",
    description:
      "We'll remind you when filters need backwashing, chlorinators need cell cleaning, and pumps need servicing — before problems become expensive repairs.",
    cta: "Next — First water test",
    skippable: true,
    skipLabel: "Skip for now, I'll add later",
    fields: [
      {
        key: "pump_brand",
        label: "Pump brand (optional)",
        placeholder: "e.g. Astral, Zodiac, Hayward",
        type: "text",
        required: false,
      },
      {
        key: "filter_type",
        label: "Filter type",
        type: "card_select",
        required: false,
        options: [
          { value: "sand", label: "Sand filter", icon: "⏳", desc: "Backwash weekly" },
          { value: "cartridge", label: "Cartridge filter", icon: "🧻", desc: "Remove & rinse" },
          { value: "de", label: "DE / Zeolite", icon: "🌊", desc: "Fine filtration" },
          { value: "not_sure", label: "Not sure", icon: "❓", desc: "Skip this for now" },
        ],
      },
      {
        key: "has_heat",
        label: "Heating",
        type: "toggle_group",
        required: false,
        options: [
          { value: "none", label: "No heating" },
          { value: "solar", label: "Solar" },
          { value: "heat_pump", label: "Heat pump" },
          { value: "gas", label: "Gas" },
        ],
      },
      {
        key: "last_service_date",
        label: "Last professional service (optional)",
        type: "month_year",
        required: false,
        hint: "Used to schedule your next service reminder.",
      },
    ],
  },
  {
    id: "first_reading",
    icon: "🧪",
    title: "Add your first water test",
    subtitle: "Step 4 of 4 — Baseline readings",
    description:
      "Your Pool Health Score starts at zero until we have a reading. Add your latest test strip or shop water test results here. Not sure where to start? Most pool shops test for free.",
    cta: "Calculate my Health Score",
    skippable: true,
    skipLabel: "I'll add readings later",
    fields: [
      {
        key: "free_chlorine",
        label: "Free chlorine (ppm)",
        placeholder: "e.g. 2.5",
        type: "number",
        required: false,
        target: "1.0 – 3.0",
        unit: "ppm",
      },
      {
        key: "ph",
        label: "pH",
        placeholder: "e.g. 7.4",
        type: "number",
        required: false,
        target: "7.2 – 7.6",
        unit: "",
      },
      {
        key: "alkalinity",
        label: "Total alkalinity (ppm)",
        placeholder: "e.g. 120",
        type: "number",
        required: false,
        target: "80 – 120",
        unit: "ppm",
      },
      {
        key: "stabiliser",
        label: "Stabiliser / CYA (ppm)",
        placeholder: "e.g. 50",
        type: "number",
        required: false,
        target: "30 – 60",
        unit: "ppm",
      },
    ],
    ocr_hint: true,
  },
  {
    id: "complete",
    icon: "✅",
    title: "You're all set!",
    subtitle: "Your pool is ready to track",
    description: "",
    cta: "Go to my dashboard",
    skippable: false,
    fields: [],
  },
];

// ─── Volume Calculator Modal ──────────────────────────────────────────────────
function VolumeCalc({ onResult, onClose }) {
  const [dims, setDims] = useState({ length: "", width: "", depth: "" });
  const vol = dims.length && dims.width && dims.depth
    ? Math.round(parseFloat(dims.length) * parseFloat(dims.width) * parseFloat(dims.depth) * 1000)
    : null;

  return (
    <div style={styles.modalOverlay} onClick={onClose}>
      <div style={styles.calcModal} onClick={e => e.stopPropagation()}>
        <div style={styles.calcHeader}>
          <span style={{ fontSize: 22 }}>📐</span>
          <h3 style={styles.calcTitle}>Volume calculator</h3>
          <button style={styles.closeBtn} onClick={onClose}>✕</button>
        </div>
        <p style={styles.calcNote}>For rectangular pools. For other shapes, multiply result by ~0.85 (freeform) or ~0.78 (round).</p>
        {["length", "width", "depth"].map(k => (
          <div key={k} style={styles.calcRow}>
            <label style={styles.calcLabel}>{k.charAt(0).toUpperCase() + k.slice(1)} (metres)</label>
            <input
              style={styles.calcInput}
              type="number"
              placeholder="0.0"
              value={dims[k]}
              onChange={e => setDims(p => ({ ...p, [k]: e.target.value }))}
            />
          </div>
        ))}
        {vol && (
          <div style={styles.calcResult}>
            <span style={styles.calcResultNum}>{vol.toLocaleString()}</span>
            <span style={styles.calcResultUnit}> litres</span>
          </div>
        )}
        <button
          style={{ ...styles.primaryBtn, opacity: vol ? 1 : 0.4, marginTop: 12 }}
          disabled={!vol}
          onClick={() => { onResult(String(vol)); onClose(); }}
        >
          Use this volume
        </button>
      </div>
    </div>
  );
}

// ─── Progress bar ─────────────────────────────────────────────────────────────
function ProgressBar({ current, total }) {
  const pct = Math.round(((current) / (total - 1)) * 100);
  return (
    <div style={styles.progressWrap}>
      <div style={{ ...styles.progressFill, width: `${pct}%` }} />
    </div>
  );
}

// ─── Card select field ────────────────────────────────────────────────────────
function CardSelect({ field, value, onChange }) {
  return (
    <div style={styles.cardGrid}>
      {field.options.map(opt => {
        const selected = value === opt.value;
        return (
          <button
            key={opt.value}
            style={{ ...styles.cardOpt, ...(selected ? styles.cardOptSelected : {}) }}
            onClick={() => onChange(selected ? "" : opt.value)}
          >
            <span style={styles.cardIcon}>{opt.icon}</span>
            <span style={styles.cardLabel}>{opt.label}</span>
            {opt.desc && <span style={styles.cardDesc}>{opt.desc}</span>}
            {selected && <span style={styles.cardCheck}>✓</span>}
          </button>
        );
      })}
    </div>
  );
}

// ─── Toggle group ─────────────────────────────────────────────────────────────
function ToggleGroup({ field, value, onChange }) {
  return (
    <div style={styles.toggleGroup}>
      {field.options.map(opt => (
        <button
          key={opt.value}
          style={{ ...styles.toggleBtn, ...(value === opt.value ? styles.toggleBtnActive : {}) }}
          onClick={() => onChange(opt.value)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

// ─── Health score preview ─────────────────────────────────────────────────────
function HealthScorePreview({ data }) {
  const readings = {
    free_chlorine: parseFloat(data.free_chlorine),
    ph: parseFloat(data.ph),
    alkalinity: parseFloat(data.alkalinity),
    stabiliser: parseFloat(data.stabiliser),
  };

  const targets = {
    free_chlorine: [1.0, 3.0],
    ph: [7.2, 7.6],
    alkalinity: [80, 120],
    stabiliser: [30, 60],
  };

  const labels = {
    free_chlorine: "Free Cl",
    ph: "pH",
    alkalinity: "Alkalinity",
    stabiliser: "Stabiliser",
  };

  const scored = Object.entries(readings)
    .filter(([, v]) => !isNaN(v))
    .map(([k, v]) => {
      const [lo, hi] = targets[k];
      const inRange = v >= lo && v <= hi;
      const score = inRange ? 25 : Math.max(0, 25 - Math.abs(v - (lo + hi) / 2) * 8);
      return { key: k, value: v, inRange, score, label: labels[k] };
    });

  if (scored.length === 0) return null;

  const total = Math.round((scored.reduce((a, b) => a + b.score, 0) / (scored.length * 25)) * 100);
  const color = total >= 80 ? BRAND.success : total >= 50 ? BRAND.warning : BRAND.error;

  return (
    <div style={styles.scorePreview}>
      <div style={styles.scoreCircle}>
        <svg width="90" height="90" viewBox="0 0 90 90">
          <circle cx="45" cy="45" r="38" fill="none" stroke={BRAND.foam} strokeWidth="8" />
          <circle
            cx="45" cy="45" r="38"
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeDasharray={`${(total / 100) * 239} 239`}
            strokeLinecap="round"
            transform="rotate(-90 45 45)"
            style={{ transition: "stroke-dasharray 1s ease" }}
          />
        </svg>
        <div style={styles.scoreNum}>{total}</div>
      </div>
      <div style={styles.scoreBreakdown}>
        {scored.map(s => (
          <div key={s.key} style={styles.scoreRow}>
            <span style={styles.scoreKey}>{s.label}</span>
            <span style={{ ...styles.scoreStatus, color: s.inRange ? BRAND.success : BRAND.warning }}>
              {s.inRange ? "✓ Good" : "⚠ Adjust"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Completion screen ────────────────────────────────────────────────────────
function CompletionScreen({ formData, onDone }) {
  const hasReadings = formData.free_chlorine || formData.ph;
  const poolName = formData.pool_name || "Your Pool";

  return (
    <div style={styles.completionWrap}>
      <div style={styles.completionAnim}>
        {["💧", "✨", "🏊", "☀️", "💪"].map((e, i) => (
          <span key={i} style={{ ...styles.emoji, animationDelay: `${i * 0.12}s` }}>{e}</span>
        ))}
      </div>
      <h2 style={styles.completionTitle}>{poolName} is ready!</h2>
      <p style={styles.completionSub}>
        {hasReadings
          ? "Here's your first Health Score snapshot. We'll track trends over time so you can spot problems before they become expensive."
          : "Your pool profile is set up. Add your first water test anytime from the dashboard to activate your Health Score."}
      </p>

      {hasReadings && <HealthScorePreview data={formData} />}

      <div style={styles.completionCards}>
        {[
          { icon: "📊", label: "Health Score", desc: "Live chemical tracking" },
          { icon: "📋", label: "Task checklist", desc: "Seasonal maintenance" },
          { icon: "📸", label: "OCR scan", desc: "Snap shop test results" },
          { icon: "💰", label: "Cost tracking", desc: "Chemical spend log" },
        ].map(f => (
          <div key={f.label} style={styles.featureCard}>
            <span style={{ fontSize: 20 }}>{f.icon}</span>
            <div>
              <div style={styles.featureLabel}>{f.label}</div>
              <div style={styles.featureDesc}>{f.desc}</div>
            </div>
          </div>
        ))}
      </div>

      <button style={styles.primaryBtn} onClick={onDone}>
        Go to my dashboard →
      </button>
      {!hasReadings && (
        <p style={styles.nudge}>💡 Tip: Most pool shops offer free water tests — grab one this week to unlock your score.</p>
      )}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function GuestOnboarding({ onComplete, isVisible = true }) {
  const [stepIdx, setStepIdx] = useState(0);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [showCalc, setShowCalc] = useState(false);
  const [animDir, setAnimDir] = useState("forward");
  const [animKey, setAnimKey] = useState(0);
  const containerRef = useRef();

  const step = STEPS[stepIdx];
  const isFirst = stepIdx === 0;
  const isLast = stepIdx === STEPS.length - 1;

  const validate = () => {
    const errs = {};
    step.fields.forEach(f => {
      if (f.required && !formData[f.key]) {
        errs[f.key] = `${f.label} is required`;
      }
    });
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const advance = (skip = false) => {
    if (!skip && !validate()) return;
    setAnimDir("forward");
    setAnimKey(k => k + 1);
    if (stepIdx < STEPS.length - 1) setStepIdx(i => i + 1);
  };

  const back = () => {
    if (stepIdx === 0) return;
    setAnimDir("back");
    setAnimKey(k => k + 1);
    setStepIdx(i => i - 1);
  };

  const set = (key, val) => {
    setFormData(p => ({ ...p, [key]: val }));
    setErrors(p => ({ ...p, [key]: undefined }));
  };

  if (!isVisible) return null;

  return (
    <>
      <style>{KEYFRAMES}</style>
      <div style={styles.overlay}>
        <div style={styles.sheet} ref={containerRef}>
          {/* Header */}
          <div style={styles.header}>
            <div style={styles.brandRow}>
              <DropletIcon />
              <span style={styles.brandName}>PoolConnection</span>
              <span style={styles.guestBadge}>Guest</span>
            </div>
            {!isFirst && !isLast && (
              <ProgressBar current={stepIdx} total={STEPS.length} />
            )}
          </div>

          {/* Body */}
          <div
            key={animKey}
            style={{
              ...styles.body,
              animation: animDir === "forward"
                ? "slideInRight 0.32s cubic-bezier(0.16,1,0.3,1)"
                : "slideInLeft 0.32s cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            {isLast ? (
              <CompletionScreen formData={formData} onDone={() => onComplete?.(formData)} />
            ) : (
              <>
                <div style={styles.stepIcon}>{step.icon}</div>
                <h2 style={styles.stepTitle}>{step.title}</h2>
                <p style={styles.stepSub}>{step.subtitle}</p>
                <p style={styles.stepDesc}>{step.description}</p>

                {/* Fields */}
                {step.fields.map(field => (
                  <div key={field.key} style={styles.fieldWrap}>
                    <label style={styles.fieldLabel}>
                      {field.label}
                      {field.required && <span style={styles.required}> *</span>}
                      {field.target && (
                        <span style={styles.targetBadge}>Target: {field.target}</span>
                      )}
                    </label>

                    {field.type === "text" || field.type === "number" ? (
                      <div style={styles.inputRow}>
                        <input
                          style={{
                            ...styles.input,
                            ...(errors[field.key] ? styles.inputError : {}),
                          }}
                          type={field.type}
                          placeholder={field.placeholder}
                          value={formData[field.key] || ""}
                          onChange={e => set(field.key, e.target.value)}
                        />
                        {field.unit && <span style={styles.unit}>{field.unit}</span>}
                      </div>
                    ) : field.type === "select" ? (
                      <select
                        style={styles.select}
                        value={formData[field.key] || ""}
                        onChange={e => set(field.key, e.target.value)}
                      >
                        <option value="">Select…</option>
                        {field.options.map(o => (
                          <option key={o} value={o}>{o}</option>
                        ))}
                      </select>
                    ) : field.type === "card_select" ? (
                      <CardSelect
                        field={field}
                        value={formData[field.key] || ""}
                        onChange={v => set(field.key, v)}
                      />
                    ) : field.type === "toggle_group" ? (
                      <ToggleGroup
                        field={field}
                        value={formData[field.key] || ""}
                        onChange={v => set(field.key, v)}
                      />
                    ) : field.type === "month_year" ? (
                      <input
                        style={styles.input}
                        type="month"
                        value={formData[field.key] || ""}
                        onChange={e => set(field.key, e.target.value)}
                      />
                    ) : null}

                    {field.hint && <p style={styles.hint}>{field.hint}</p>}
                    {field.helper_link && (
                      <button
                        style={styles.helperLink}
                        onClick={() => setShowCalc(true)}
                      >
                        {field.helper_link.label}
                      </button>
                    )}
                    {errors[field.key] && (
                      <p style={styles.errorText}>{errors[field.key]}</p>
                    )}
                  </div>
                ))}

                {/* OCR hint */}
                {step.ocr_hint && (
                  <div style={styles.ocrHint}>
                    <span style={{ fontSize: 18 }}>📸</span>
                    <p style={styles.ocrText}>
                      <strong>Pro tip:</strong> Got a shop water test printout? Use the{" "}
                      <span style={{ color: BRAND.sky, fontWeight: 600 }}>Scan results</span> feature to fill these in automatically.
                    </p>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Footer */}
          {!isLast && (
            <div style={styles.footer}>
              {!isFirst && (
                <button style={styles.backBtn} onClick={back}>
                  ← Back
                </button>
              )}
              <div style={styles.footerRight}>
                {step.skippable && (
                  <button style={styles.skipBtn} onClick={() => advance(true)}>
                    {step.skipLabel || "Skip"}
                  </button>
                )}
                <button style={styles.primaryBtn} onClick={() => advance(false)}>
                  {step.cta}
                </button>
              </div>
            </div>
          )}

          {/* Step counter */}
          {!isFirst && !isLast && (
            <p style={styles.stepCounter}>
              Step {stepIdx} of {STEPS.length - 2}
            </p>
          )}
        </div>

        {showCalc && (
          <VolumeCalc
            onResult={v => set("volume_litres", v)}
            onClose={() => setShowCalc(false)}
          />
        )}
      </div>
    </>
  );
}

// ─── Droplet brand icon ───────────────────────────────────────────────────────
function DropletIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
      <defs>
        <linearGradient id="dg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={BRAND.sky} />
          <stop offset="100%" stopColor={BRAND.ocean} />
        </linearGradient>
      </defs>
      <path d="M16 4 C16 4 6 14 6 20 A10 10 0 0 0 26 20 C26 14 16 4 16 4Z" fill="url(#dg)" />
      <circle cx="12" cy="19" r="2" fill="white" fillOpacity="0.5" />
      <circle cx="20" cy="17" r="1.5" fill="white" fillOpacity="0.4" />
      <circle cx="16" cy="22" r="1" fill="white" fillOpacity="0.35" />
    </svg>
  );
}

// ─── Keyframe animations ──────────────────────────────────────────────────────
const KEYFRAMES = `
  @keyframes slideInRight {
    from { opacity: 0; transform: translateX(32px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes slideInLeft {
    from { opacity: 0; transform: translateX(-32px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes popIn {
    0%   { opacity: 0; transform: scale(0.6); }
    60%  { transform: scale(1.12); }
    100% { opacity: 1; transform: scale(1); }
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`;

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = {
  overlay: {
    position: "fixed", inset: 0,
    background: "rgba(2,62,138,0.55)",
    backdropFilter: "blur(6px)",
    display: "flex", alignItems: "flex-end", justifyContent: "center",
    zIndex: 9999,
    fontFamily: "'DM Sans', system-ui, sans-serif",
  },
  sheet: {
    background: BRAND.white,
    borderRadius: "20px 20px 0 0",
    width: "100%", maxWidth: 540,
    maxHeight: "94vh",
    overflowY: "auto",
    boxShadow: "0 -8px 40px rgba(0,119,182,0.18)",
    display: "flex", flexDirection: "column",
  },
  header: {
    padding: "16px 20px 0",
    position: "sticky", top: 0,
    background: BRAND.white,
    zIndex: 10,
    borderBottom: `1px solid ${BRAND.foam}`,
    paddingBottom: 12,
  },
  brandRow: {
    display: "flex", alignItems: "center", gap: 8, marginBottom: 10,
  },
  brandName: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontWeight: 700, fontSize: 16,
    color: BRAND.ocean,
    letterSpacing: "-0.3px",
  },
  guestBadge: {
    background: BRAND.foam,
    color: BRAND.ocean,
    fontSize: 11, fontWeight: 600,
    padding: "2px 8px", borderRadius: 99,
    marginLeft: "auto",
    textTransform: "uppercase", letterSpacing: "0.5px",
  },
  progressWrap: {
    height: 4, background: BRAND.foam,
    borderRadius: 99, overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    background: `linear-gradient(90deg, ${BRAND.sky}, ${BRAND.ocean})`,
    borderRadius: 99,
    transition: "width 0.5s cubic-bezier(0.16,1,0.3,1)",
  },
  body: {
    padding: "20px 20px 0",
    flex: 1,
  },
  stepIcon: {
    fontSize: 36, marginBottom: 8,
    display: "block",
    animation: "popIn 0.4s cubic-bezier(0.16,1,0.3,1)",
  },
  stepTitle: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: 22, fontWeight: 700,
    color: BRAND.slate, margin: "0 0 2px",
    letterSpacing: "-0.5px",
  },
  stepSub: {
    fontSize: 12, fontWeight: 600,
    color: BRAND.sky, margin: "0 0 10px",
    textTransform: "uppercase", letterSpacing: "0.5px",
  },
  stepDesc: {
    fontSize: 14, color: BRAND.muted,
    lineHeight: 1.6, margin: "0 0 20px",
  },
  fieldWrap: {
    marginBottom: 18,
  },
  fieldLabel: {
    fontSize: 13, fontWeight: 600,
    color: BRAND.slate,
    display: "flex", alignItems: "center", gap: 8,
    marginBottom: 6,
  },
  required: { color: BRAND.error },
  targetBadge: {
    fontSize: 11,
    background: BRAND.foam,
    color: BRAND.ocean,
    padding: "1px 7px", borderRadius: 99,
    fontWeight: 500,
    marginLeft: "auto",
  },
  inputRow: {
    display: "flex", alignItems: "center", gap: 8,
  },
  input: {
    flex: 1,
    border: `1.5px solid ${BRAND.foam}`,
    borderRadius: 10, padding: "10px 12px",
    fontSize: 15, color: BRAND.slate,
    outline: "none",
    background: BRAND.surface,
    transition: "border-color 0.15s",
    fontFamily: "inherit",
  },
  inputError: {
    borderColor: BRAND.error,
  },
  unit: {
    fontSize: 13, color: BRAND.muted,
    fontWeight: 500, whiteSpace: "nowrap",
  },
  select: {
    width: "100%",
    border: `1.5px solid ${BRAND.foam}`,
    borderRadius: 10, padding: "10px 12px",
    fontSize: 15, color: BRAND.slate,
    background: BRAND.surface,
    outline: "none",
    fontFamily: "inherit",
    appearance: "none",
    backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L5 5L9 1' stroke='%230077B6' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 12px center",
  },
  cardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))",
    gap: 8,
  },
  cardOpt: {
    border: `1.5px solid ${BRAND.foam}`,
    borderRadius: 12,
    padding: "10px 8px",
    background: BRAND.surface,
    cursor: "pointer",
    textAlign: "left",
    position: "relative",
    transition: "all 0.15s",
    display: "flex", flexDirection: "column", gap: 3,
    fontFamily: "inherit",
  },
  cardOptSelected: {
    border: `1.5px solid ${BRAND.sky}`,
    background: `${BRAND.sky}15`,
  },
  cardIcon: { fontSize: 18 },
  cardLabel: { fontSize: 13, fontWeight: 600, color: BRAND.slate },
  cardDesc: { fontSize: 11, color: BRAND.muted },
  cardCheck: {
    position: "absolute", top: 6, right: 8,
    color: BRAND.sky, fontWeight: 700, fontSize: 13,
  },
  toggleGroup: {
    display: "flex", flexWrap: "wrap", gap: 8,
  },
  toggleBtn: {
    border: `1.5px solid ${BRAND.foam}`,
    borderRadius: 99, padding: "6px 14px",
    fontSize: 13, fontWeight: 500,
    color: BRAND.muted, background: BRAND.surface,
    cursor: "pointer", transition: "all 0.15s",
    fontFamily: "inherit",
  },
  toggleBtnActive: {
    border: `1.5px solid ${BRAND.sky}`,
    color: BRAND.ocean, background: `${BRAND.sky}15`,
    fontWeight: 600,
  },
  hint: {
    fontSize: 12, color: BRAND.muted,
    marginTop: 5, lineHeight: 1.5,
  },
  helperLink: {
    background: "none", border: "none",
    color: BRAND.sky, fontSize: 12, fontWeight: 600,
    cursor: "pointer", padding: 0, marginTop: 4,
    textDecoration: "underline",
    fontFamily: "inherit",
  },
  errorText: {
    fontSize: 12, color: BRAND.error,
    marginTop: 4,
  },
  ocrHint: {
    display: "flex", gap: 10, alignItems: "flex-start",
    background: `${BRAND.sky}12`,
    border: `1px solid ${BRAND.sky}30`,
    borderRadius: 12, padding: "12px 14px",
    marginBottom: 16,
  },
  ocrText: {
    fontSize: 13, color: BRAND.slate,
    lineHeight: 1.5, margin: 0,
  },
  footer: {
    padding: "16px 20px",
    display: "flex", justifyContent: "space-between", alignItems: "center",
    borderTop: `1px solid ${BRAND.foam}`,
    position: "sticky", bottom: 0,
    background: BRAND.white,
  },
  footerRight: {
    display: "flex", gap: 10, alignItems: "center",
  },
  backBtn: {
    background: "none", border: "none",
    color: BRAND.muted, fontSize: 14, fontWeight: 500,
    cursor: "pointer", padding: "8px 0",
    fontFamily: "inherit",
  },
  skipBtn: {
    background: "none",
    border: `1.5px solid ${BRAND.foam}`,
    borderRadius: 10, padding: "9px 14px",
    fontSize: 13, fontWeight: 500,
    color: BRAND.muted, cursor: "pointer",
    fontFamily: "inherit",
  },
  primaryBtn: {
    background: `linear-gradient(135deg, ${BRAND.sky}, ${BRAND.ocean})`,
    border: "none", borderRadius: 10,
    padding: "10px 20px",
    fontSize: 14, fontWeight: 600,
    color: BRAND.white, cursor: "pointer",
    fontFamily: "inherit",
    boxShadow: `0 4px 14px ${BRAND.ocean}40`,
    transition: "transform 0.1s, box-shadow 0.1s",
  },
  stepCounter: {
    textAlign: "center",
    fontSize: 12, color: BRAND.muted,
    padding: "4px 0 12px", margin: 0,
  },

  // Volume calc modal
  modalOverlay: {
    position: "fixed", inset: 0,
    background: "rgba(0,0,0,0.4)",
    display: "flex", alignItems: "center", justifyContent: "center",
    zIndex: 10000,
  },
  calcModal: {
    background: BRAND.white,
    borderRadius: 16, padding: 24,
    width: "90%", maxWidth: 340,
    boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
  },
  calcHeader: {
    display: "flex", alignItems: "center", gap: 8, marginBottom: 8,
  },
  calcTitle: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: 16, fontWeight: 700,
    color: BRAND.slate, margin: 0, flex: 1,
  },
  closeBtn: {
    background: "none", border: "none",
    fontSize: 14, cursor: "pointer", color: BRAND.muted,
  },
  calcNote: {
    fontSize: 12, color: BRAND.muted,
    marginBottom: 16, lineHeight: 1.5,
  },
  calcRow: { marginBottom: 12 },
  calcLabel: {
    fontSize: 12, fontWeight: 600,
    color: BRAND.slate, display: "block", marginBottom: 4,
  },
  calcInput: {
    width: "100%", boxSizing: "border-box",
    border: `1.5px solid ${BRAND.foam}`,
    borderRadius: 8, padding: "8px 10px",
    fontSize: 14, color: BRAND.slate,
    outline: "none", background: BRAND.surface,
    fontFamily: "inherit",
  },
  calcResult: {
    textAlign: "center",
    background: BRAND.surface,
    borderRadius: 10, padding: "10px",
    border: `1.5px solid ${BRAND.sky}`,
    marginTop: 8,
  },
  calcResultNum: {
    fontSize: 28, fontWeight: 700,
    color: BRAND.ocean,
    fontFamily: "'Space Grotesk', sans-serif",
  },
  calcResultUnit: {
    fontSize: 14, color: BRAND.muted,
  },

  // Completion
  completionWrap: {
    padding: "8px 0 20px",
    animation: "fadeUp 0.4s ease",
  },
  completionAnim: {
    display: "flex", justifyContent: "center",
    gap: 10, marginBottom: 16,
  },
  emoji: {
    fontSize: 28,
    display: "inline-block",
    animation: "popIn 0.4s ease both",
  },
  completionTitle: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: 24, fontWeight: 700,
    color: BRAND.slate, margin: "0 0 8px",
    letterSpacing: "-0.5px",
  },
  completionSub: {
    fontSize: 14, color: BRAND.muted,
    lineHeight: 1.6, margin: "0 0 20px",
  },
  scorePreview: {
    display: "flex", gap: 16, alignItems: "center",
    background: BRAND.surface,
    borderRadius: 14, padding: 16,
    border: `1px solid ${BRAND.foam}`,
    marginBottom: 20,
  },
  scoreCircle: {
    position: "relative", flexShrink: 0,
  },
  scoreNum: {
    position: "absolute", inset: 0,
    display: "flex", alignItems: "center", justifyContent: "center",
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: 22, fontWeight: 700, color: BRAND.slate,
  },
  scoreBreakdown: { flex: 1 },
  scoreRow: {
    display: "flex", justifyContent: "space-between",
    fontSize: 13, marginBottom: 4,
  },
  scoreKey: { color: BRAND.muted, fontWeight: 500 },
  scoreStatus: { fontWeight: 600, fontSize: 12 },
  completionCards: {
    display: "flex", flexDirection: "column", gap: 8,
    marginBottom: 20,
  },
  featureCard: {
    display: "flex", alignItems: "center", gap: 12,
    background: BRAND.surface,
    borderRadius: 10, padding: "10px 14px",
    border: `1px solid ${BRAND.foam}`,
  },
  featureLabel: {
    fontSize: 13, fontWeight: 600, color: BRAND.slate,
  },
  featureDesc: {
    fontSize: 12, color: BRAND.muted,
  },
  nudge: {
    fontSize: 12, color: BRAND.muted,
    textAlign: "center", marginTop: 12,
    lineHeight: 1.5,
    background: `${BRAND.warning}15`,
    border: `1px solid ${BRAND.warning}30`,
    borderRadius: 8, padding: "8px 12px",
  },
};
