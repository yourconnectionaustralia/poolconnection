import { useState, useEffect, useRef } from 'react';

// ─────────────────────────────────────────────────────────────────
// DESIGN SYSTEM ICONS — inline SVG only, no library dependency
// ─────────────────────────────────────────────────────────────────
const Icon = {
  waves: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 17c1.5-1.5 3-1.5 4.5 0S10.5 18.5 12 17s3-1.5 4.5 0 3 1.5 4.5 0"/>
      <path d="M3 13c1.5-1.5 3-1.5 4.5 0S10.5 14.5 12 13s3-1.5 4.5 0 3 1.5 4.5 0"/>
      <path d="M3 9c1.5-1.5 3-1.5 4.5 0S10.5 10.5 12 9s3-1.5 4.5 0 3 1.5 4.5 0"/>
    </svg>
  ),
  flask: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 3h6"/><path d="M10 3v6l-4.5 9a2 2 0 0 0 1.8 3h9.4a2 2 0 0 0 1.8-3L14 9V3"/>
      <path d="M7.5 15h9"/>
    </svg>
  ),
  droplet: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3c-3 4-6 7-6 11a6 6 0 0 0 12 0c0-4-3-7-6-11z"/>
    </svg>
  ),
  settings: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="16" height="16" rx="1"/><path d="M4 9h16M9 4v16"/>
    </svg>
  ),
  equipment: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"/>
      <path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/>
    </svg>
  ),
  calendar: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>
    </svg>
  ),
  user: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="9" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/>
    </svg>
  ),
  camera: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
      <circle cx="12" cy="13" r="4"/>
    </svg>
  ),
  tip: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18h6"/><path d="M10 21h4"/>
      <path d="M8 14a5 5 0 1 1 8 0c-1 1-1.5 2-1.5 3.5h-5C9.5 16 9 15 8 14z"/>
    </svg>
  ),
  info: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9"/><path d="M12 11v5"/><circle cx="12" cy="8" r="0.6" fill="currentColor" stroke="none"/>
    </svg>
  ),
  check: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="4 12 10 18 20 6"/>
    </svg>
  ),
  alert: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 4 21 20H3z"/><path d="M12 10v5"/><circle cx="12" cy="18" r="0.6" fill="currentColor" stroke="none"/>
    </svg>
  ),
  logoBig: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3c-3 4-6 7-6 11a6 6 0 0 0 12 0c0-4-3-7-6-11z"/>
    </svg>
  ),
};

// ─────────────────────────────────────────────────────────────────
// HEALTH SCORE RING COMPONENT
// ─────────────────────────────────────────────────────────────────
function HealthScoreRing({ score, size = 88 }) {
  const circumference = 220;
  const dashoffset = circumference - (score / 100) * circumference;
  const ringClass =
    score >= 80 ? 'score-ring-fill score-good'
    : score >= 50 ? 'score-ring-fill score-warn'
    : 'score-ring-fill score-critical';

  return (
    <div className="score-ring-container" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox="0 0 88 88">
        <circle className="score-ring-track" cx="44" cy="44" r="35" />
        <circle
          className={ringClass}
          cx="44" cy="44" r="35"
          style={{ strokeDashoffset: dashoffset }}
        />
      </svg>
      <div className="score-ring-label">
        <span className="score-number score-number-lg">{score}</span>
        <span className="score-of">/ 100</span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// LOGO MARK
// ─────────────────────────────────────────────────────────────────
function LogoMark() {
  return (
    <div className="topnav-logo-mark">
      {Icon.logoBig}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// SIDEBAR
// ─────────────────────────────────────────────────────────────────
function Sidebar({ activeView, onNav, pendingActions }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-section">
        <div className="sidebar-section-label">Today</div>
        <div
          className={`sidebar-item ${activeView === 'health' ? 'active' : ''}`}
          onClick={() => onNav('health')}
        >
          <span className="sidebar-icon">{Icon.waves}</span>
          Health Score
        </div>
        <div
          className={`sidebar-item ${activeView === 'tests' ? 'active' : ''}`}
          onClick={() => onNav('tests')}
        >
          <span className="sidebar-icon">{Icon.flask}</span>
          Water Tests
          {pendingActions > 0 && (
            <span className="sidebar-badge">{pendingActions} action</span>
          )}
        </div>
        <div
          className={`sidebar-item ${activeView === 'history' ? 'active' : ''}`}
          onClick={() => onNav('history')}
        >
          <span className="sidebar-icon">{Icon.droplet}</span>
          Chemistry log
        </div>
      </div>

      <div className="sidebar-section">
        <div className="sidebar-section-label">Pool</div>
        <div
          className={`sidebar-item ${activeView === 'setup' ? 'active' : ''}`}
          onClick={() => onNav('setup')}
        >
          <span className="sidebar-icon">{Icon.settings}</span>
          Setup
        </div>
        <div
          className={`sidebar-item ${activeView === 'equipment' ? 'active' : ''}`}
          onClick={() => onNav('equipment')}
        >
          <span className="sidebar-icon">{Icon.equipment}</span>
          Equipment
        </div>
        <div
          className={`sidebar-item ${activeView === 'schedule' ? 'active' : ''}`}
          onClick={() => onNav('schedule')}
        >
          <span className="sidebar-icon">{Icon.calendar}</span>
          Schedule
        </div>
      </div>

      <div className="sidebar-section">
        <div className="sidebar-section-label">Account</div>
        <div
          className={`sidebar-item ${activeView === 'profile' ? 'active' : ''}`}
          onClick={() => onNav('profile')}
        >
          <span className="sidebar-icon">{Icon.user}</span>
          Profile
        </div>
      </div>
    </aside>
  );
}

// ─────────────────────────────────────────────────────────────────
// HEALTH SCORE PAGE
// ─────────────────────────────────────────────────────────────────
function HealthScorePage({ testData, poolProfile }) {
  const score = testData ? calculateScore(testData) : null;
  const lastTest = testData?.createdAt;
  const poolLabel = poolProfile ? `${poolProfile.name} · ${poolProfile.volumeKl} kL` : null;

  if (!testData) {
    return (
      <div>
        <h1 className="page-title">Health Score</h1>
        <p className="page-subtitle">No test logged yet</p>
        <div className="card">
          <div className="empty-state">
            <div className="empty-state-icon">{Icon.flask}</div>
            <div className="empty-state-title">No tests logged yet</div>
            <div className="empty-state-body">
              Add your first water test and your Health Score will appear here within seconds.
            </div>
            <button className="btn btn-primary btn-sm">Log first water test</button>
          </div>
        </div>
      </div>
    );
  }

  const params = buildParams(testData);
  const scoreClass = score >= 80 ? 'score-good' : score >= 50 ? 'score-warn' : 'score-critical';
  const headline = scoreHeadline(score, params);
  const primaryAction = getPrimaryAction(params, poolProfile);
  const recommendations = getRecommendations(params, poolProfile);

  return (
    <div>
      <h1 className="page-title">Health Score</h1>
      {poolLabel && (
        <p className="page-subtitle">
          Last test logged {formatRelative(lastTest)} · {poolLabel}
        </p>
      )}

      {/* Score card */}
      <div className="card" style={{ marginBottom: 16 }}>
        <div className="score-card-row">
          <HealthScoreRing score={score} />
          <div className="score-summary">
            <div className="score-eyebrow">Health Score · updated {formatRelative(lastTest)}</div>
            <div className="score-headline">{headline}</div>
            <div className="param-tag-row" style={{ marginTop: 8 }}>
              {params.map(p => (
                <span key={p.key} className={`tag ${p.tagClass}`}>
                  {p.label}
                </span>
              ))}
            </div>
          </div>
        </div>

        {primaryAction && (
          <div style={{ padding: '0 24px 20px' }}>
            <div className="callout callout-action">
              <span className="callout-icon" style={{ color: 'var(--amber)', display: 'inline-flex' }}>
                {Icon.tip}
              </span>
              <div className="callout-body">
                <strong>{primaryAction.dose}</strong> {primaryAction.reason}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Readings table */}
      <div className="card-section stack-lg">
        <div className="eyebrow" style={{ marginBottom: 12 }}>Water Readings</div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Parameter</th>
              <th>Reading</th>
              <th>Target</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {params.map(p => (
              <tr key={p.key}>
                <td>{p.name}</td>
                <td style={{ fontWeight: 500, color: 'var(--black)' }}>{p.reading}</td>
                <td className="col-muted">{p.target}</td>
                <td><span className={`tag ${p.tagClass}`}>{p.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Secondary recommendations */}
      {recommendations.length > 0 && (
        <div className="card-section" style={{ marginTop: 16 }}>
          <div className="eyebrow" style={{ marginBottom: 12 }}>Recommendations</div>
          <div className="stack">
            {recommendations.map((r, i) => (
              <div key={i} className={`callout callout-${r.type}`}>
                <span className="callout-icon" style={{ color: r.iconColor, display: 'inline-flex' }}>
                  {r.icon}
                </span>
                <div className="callout-body">
                  {r.text}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// WATER TESTS PAGE
// ─────────────────────────────────────────────────────────────────
function WaterTestsPage({ testData, onLogTest, onScanTest, poolProfile }) {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    freeChlor: '', pH: '', alkalinity: '', cyanuricAcid: '', calciumHardness: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 800)); // simulate save
    onLogTest({
      freeChlor: parseFloat(form.freeChlor) || 0,
      pH: parseFloat(form.pH) || 0,
      alkalinity: parseFloat(form.alkalinity) || 0,
      cyanuricAcid: parseFloat(form.cyanuricAcid) || 0,
      calciumHardness: parseFloat(form.calciumHardness) || 0,
      createdAt: new Date().toISOString(),
    });
    setSubmitting(false);
    setShowForm(false);
    setForm({ freeChlor: '', pH: '', alkalinity: '', cyanuricAcid: '', calciumHardness: '' });
  };

  return (
    <div>
      <h1 className="page-title">Water Tests</h1>
      <p className="page-subtitle">Log a reading or scan your pool shop test results</p>

      {/* Actions row */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        <button className="btn btn-primary" onClick={() => setShowForm(true)}>
          Log water test
        </button>
        <button className="btn btn-ghost" onClick={onScanTest}>
          <span style={{ display: 'inline-flex' }}>{Icon.camera}</span>
          Scan test results
        </button>
      </div>

      {/* Log form */}
      {showForm && (
        <div className="card-section" style={{ marginBottom: 16 }}>
          <div className="eyebrow" style={{ marginBottom: 16 }}>Enter readings</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              { key: 'freeChlor',       label: 'Free chlorine',   unit: 'ppm', placeholder: '1.0–3.0' },
              { key: 'pH',              label: 'pH',              unit: '',    placeholder: '7.2–7.6' },
              { key: 'alkalinity',      label: 'Total alkalinity', unit: 'ppm', placeholder: '80–120' },
              { key: 'cyanuricAcid',    label: 'Cyanuric acid',   unit: 'ppm', placeholder: '30–50' },
              { key: 'calciumHardness', label: 'Calcium hardness', unit: 'ppm', placeholder: '200–400' },
            ].map(f => (
              <div key={f.key} className="input-group">
                <label className="input-label">{f.label}{f.unit ? ` (${f.unit})` : ''}</label>
                <input
                  className="input"
                  type="number"
                  placeholder={f.placeholder}
                  value={form[f.key]}
                  onChange={e => setForm(v => ({ ...v, [f.key]: e.target.value }))}
                />
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 8 }}>
            <button className="btn btn-ghost btn-sm" onClick={() => setShowForm(false)}>Cancel</button>
            <button
              className="btn btn-primary btn-sm"
              onClick={handleSubmit}
              disabled={submitting}
            >
              {submitting ? (
                <span className="dot-loader">
                  <span/><span/><span/>
                </span>
              ) : 'Save reading'}
            </button>
          </div>
        </div>
      )}

      {/* Test history */}
      {testData ? (
        <div className="card-section">
          <div className="eyebrow" style={{ marginBottom: 12 }}>Latest reading</div>
          <table className="data-table">
            <thead>
              <tr>
                <th>Parameter</th>
                <th>Reading</th>
                <th>Target range</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {buildParams(testData).map(p => (
                <tr key={p.key}>
                  <td>{p.name}</td>
                  <td style={{ fontWeight: 500, color: 'var(--black)' }}>{p.reading}</td>
                  <td className="col-muted">{p.target}</td>
                  <td><span className={`tag ${p.tagClass}`}>{p.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ fontSize: 12, color: 'var(--gray-light)', marginTop: 12 }}>
            Logged {formatDate(testData.createdAt)}
          </div>
        </div>
      ) : (
        <div className="card">
          <div className="empty-state">
            <div className="empty-state-icon">{Icon.flask}</div>
            <div className="empty-state-title">No tests logged yet</div>
            <div className="empty-state-body">
              Log your first reading above — your Health Score generates instantly.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// CHEMISTRY LOG PAGE
// ─────────────────────────────────────────────────────────────────
function ChemistryLogPage({ history }) {
  if (!history || history.length === 0) {
    return (
      <div>
        <h1 className="page-title">Chemistry log</h1>
        <p className="page-subtitle">Your test history over time</p>
        <div className="card">
          <div className="empty-state">
            <div className="empty-state-icon">{Icon.droplet}</div>
            <div className="empty-state-title">No history yet</div>
            <div className="empty-state-body">
              Log two or more water tests and your chemistry trends will appear here.
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="page-title">Chemistry log</h1>
      <p className="page-subtitle">{history.length} tests logged</p>
      <div className="card-section">
        <table className="data-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Score</th>
              <th>Chlorine</th>
              <th>pH</th>
              <th>Alkalinity</th>
            </tr>
          </thead>
          <tbody>
            {history.slice().reverse().map((t, i) => {
              const score = calculateScore(t);
              const scoreClass = score >= 80 ? 'tag-good' : score >= 50 ? 'tag-warn' : 'tag-bad';
              return (
                <tr key={i}>
                  <td className="col-muted">{formatDate(t.createdAt)}</td>
                  <td><span className={`tag ${scoreClass}`}>{score}</span></td>
                  <td>{t.freeChlor} ppm</td>
                  <td>{t.pH}</td>
                  <td>{t.alkalinity} ppm</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// SETUP PAGE
// ─────────────────────────────────────────────────────────────────
function SetupPage({ poolProfile, onSave }) {
  const [form, setForm] = useState(poolProfile || {
    name: 'Backyard pool',
    shape: 'rectangular',
    volumeKl: 30,
    sanitiser: 'chlorine',
  });

  return (
    <div>
      <h1 className="page-title">Pool setup</h1>
      <p className="page-subtitle">Your pool details power accurate dosing calculations</p>

      <div className="card-section">
        <div className="eyebrow" style={{ marginBottom: 16 }}>Pool details</div>

        <div className="input-group">
          <label className="input-label">Pool name</label>
          <input
            className="input"
            placeholder="e.g. Backyard pool"
            value={form.name}
            onChange={e => setForm(v => ({ ...v, name: e.target.value }))}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div className="input-group">
            <label className="input-label">Volume (kL)</label>
            <input
              className="input"
              type="number"
              placeholder="e.g. 32"
              value={form.volumeKl}
              onChange={e => setForm(v => ({ ...v, volumeKl: parseFloat(e.target.value) || 0 }))}
            />
          </div>

          <div className="input-group">
            <label className="input-label">Sanitiser type</label>
            <select
              className="input"
              value={form.sanitiser}
              onChange={e => setForm(v => ({ ...v, sanitiser: e.target.value }))}
            >
              <option value="chlorine">Chlorine (granular/liquid)</option>
              <option value="saltwater">Saltwater chlorinator</option>
              <option value="mineral">Mineral system</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 8 }}>
          <button className="btn btn-primary btn-sm" onClick={() => onSave(form)}>
            Save setup
          </button>
        </div>
      </div>

      <div className="callout callout-info" style={{ marginTop: 16 }}>
        <span className="callout-icon" style={{ color: 'var(--blue)', display: 'inline-flex' }}>
          {Icon.info}
        </span>
        <div className="callout-body">
          Accurate pool volume is the most important setup detail. It determines every dose recommendation.
          If unsure, use the volume calculator: <strong>length × width × average depth × 1,000</strong> = litres.
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// OCR SCAN MODAL
// ─────────────────────────────────────────────────────────────────
function ScanModal({ onClose, onComplete }) {
  const [state, setState] = useState('idle'); // idle | scanning | done | error

  const handleScan = async () => {
    setState('scanning');
    await new Promise(r => setTimeout(r, 2000));
    // Simulate OCR result
    setState('done');
    setTimeout(() => {
      onComplete({
        freeChlor: 2.1,
        pH: 7.4,
        alkalinity: 68,
        cyanuricAcid: 42,
        calciumHardness: 280,
        createdAt: new Date().toISOString(),
      });
      onClose();
    }, 800);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-panel" onClick={e => e.stopPropagation()}>
        <div className="modal-title">Scan test results</div>
        <div className="modal-body">
          Take a photo of your pool shop's printed water test. PoolConnection reads the values automatically.
        </div>

        {state === 'idle' && (
          <div style={{
            border: 'var(--border)',
            borderRadius: 'var(--r-md)',
            height: 160,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            marginBottom: 24,
            background: 'var(--gray-bg)',
            cursor: 'pointer',
            color: 'var(--gray-mid)',
          }} onClick={handleScan}>
            <span style={{ fontSize: 32 }}>{Icon.camera}</span>
            <span style={{ fontSize: 13 }}>Tap to take a photo</span>
          </div>
        )}

        {state === 'scanning' && (
          <div style={{
            height: 160,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 12,
            marginBottom: 24,
          }}>
            <div className="dot-loader"><span/><span/><span/></div>
            <span style={{ fontSize: 13, color: 'var(--gray-mid)' }}>Reading your test results…</span>
          </div>
        )}

        {state === 'done' && (
          <div style={{
            height: 160,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            marginBottom: 24,
          }}>
            <span style={{ color: 'var(--green)', display: 'flex' }}>{Icon.check}</span>
            <span style={{ fontSize: 13, color: 'var(--gray-mid)' }}>Done — loading your results</span>
          </div>
        )}

        <div className="modal-actions">
          <button className="btn btn-ghost btn-sm" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// TRIAL EXPIRED BLOCK SCREEN
// ─────────────────────────────────────────────────────────────────
function TrialExpiredScreen() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--gray-bg)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
    }}>
      <div className="card-elevated" style={{ maxWidth: 440, width: '100%', padding: '48px 40px', textAlign: 'center' }}>
        <div style={{ fontSize: 40, marginBottom: 16 }}>🏊</div>
        <h2 style={{ fontFamily: 'var(--font-read)', fontSize: 24, fontWeight: 400, color: 'var(--black)', marginBottom: 12 }}>
          Your free trial has ended
        </h2>
        <p style={{ fontSize: 14, color: 'var(--gray-mid)', lineHeight: 'var(--lh-body)', marginBottom: 28 }}>
          You've had 7 days to see what PoolConnection can do. Keep going — become a founding member at the lowest price we'll ever offer.
        </p>
        <div style={{ background: 'var(--water-pale)', borderRadius: 'var(--r-sm)', padding: '16px 20px', marginBottom: 24 }}>
          <div style={{ fontFamily: 'var(--font-read)', fontSize: 36, fontWeight: 400, color: 'var(--black)' }}>$79</div>
          <div style={{ fontSize: 13, color: 'var(--gray-mid)' }}>AUD · one-time · yours forever</div>
        </div>
        <button className="btn btn-primary" style={{ width: '100%', marginBottom: 10 }}>
          Claim founding access
        </button>
        <div style={{ fontSize: 12, color: 'var(--gray-light)' }}>
          197 of 200 founding spots remaining
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// CHEMISTRY LOGIC HELPERS
// ─────────────────────────────────────────────────────────────────
function calculateScore(test) {
  if (!test) return 0;
  let score = 0;

  // Free chlorine (35%)
  const fc = test.freeChlor;
  score += fc >= 1 && fc <= 3 ? 35
    : fc >= 0.5 && fc < 1    ? 20
    : fc > 3 && fc <= 5      ? 22
    : fc > 5                 ? 10 : 5;

  // pH (25%)
  const pH = test.pH;
  score += pH >= 7.2 && pH <= 7.6 ? 25
    : pH >= 7.0 && pH < 7.2       ? 15
    : pH > 7.6 && pH <= 7.8       ? 15
    : pH > 7.8 && pH <= 8.2       ? 8 : 3;

  // Alkalinity (20%)
  const alk = test.alkalinity;
  score += alk >= 80 && alk <= 120 ? 20
    : alk >= 60 && alk < 80        ? 12
    : alk > 120 && alk <= 150      ? 12
    : alk >= 40                    ? 6 : 2;

  // Cyanuric acid (10%)
  const cya = test.cyanuricAcid;
  score += cya >= 30 && cya <= 50 ? 10
    : cya >= 20 && cya < 30       ? 6
    : cya > 50 && cya <= 80       ? 6
    : cya > 0                     ? 3 : 0;

  // Calcium hardness (10%)
  const ca = test.calciumHardness;
  score += ca >= 200 && ca <= 400 ? 10
    : ca >= 150 && ca < 200       ? 6
    : ca > 400 && ca <= 500       ? 6
    : ca > 0                      ? 3 : 0;

  return Math.min(100, Math.round(score));
}

function buildParams(test) {
  return [
    {
      key: 'freeChlor',
      name: 'Free Chlorine',
      reading: `${test.freeChlor} ppm`,
      target: '1.0–3.0',
      ...statusForParam('freeChlor', test.freeChlor),
    },
    {
      key: 'pH',
      name: 'pH',
      reading: `${test.pH}`,
      target: '7.2–7.6',
      ...statusForParam('pH', test.pH),
    },
    {
      key: 'alkalinity',
      name: 'Total Alkalinity',
      reading: `${test.alkalinity} ppm`,
      target: '80–120',
      ...statusForParam('alkalinity', test.alkalinity),
    },
    {
      key: 'cyanuricAcid',
      name: 'Cyanuric Acid',
      reading: `${test.cyanuricAcid} ppm`,
      target: '30–50',
      ...statusForParam('cyanuricAcid', test.cyanuricAcid),
    },
    {
      key: 'calciumHardness',
      name: 'Calcium Hardness',
      reading: `${test.calciumHardness} ppm`,
      target: '200–400',
      ...statusForParam('calciumHardness', test.calciumHardness),
    },
  ];
}

function statusForParam(key, val) {
  const ranges = {
    freeChlor:       { lo: 1, hi: 3 },
    pH:              { lo: 7.2, hi: 7.6 },
    alkalinity:      { lo: 80, hi: 120 },
    cyanuricAcid:    { lo: 30, hi: 50 },
    calciumHardness: { lo: 200, hi: 400 },
  };
  const r = ranges[key];
  if (!val || !r) return { tagClass: 'tag-neutral', status: '— No data', label: `? ${key}` };
  if (val >= r.lo && val <= r.hi) return { tagClass: 'tag-good', status: '✓ Good',       label: `✓ ${paramShort(key)}` };
  if (val < r.lo)                  return { tagClass: 'tag-warn', status: '↑ Low',        label: `↑ ${paramShort(key)}` };
  return                                  { tagClass: 'tag-warn', status: '↓ High',       label: `↓ ${paramShort(key)}` };
}

function paramShort(key) {
  return { freeChlor: 'Chlorine', pH: 'pH', alkalinity: 'Alkalinity', cyanuricAcid: 'Cyanuric', calciumHardness: 'Calcium' }[key] || key;
}

function scoreHeadline(score, params) {
  if (score >= 80) {
    const issues = params.filter(p => p.tagClass !== 'tag-good');
    return issues.length === 0
      ? 'Your pool is in great shape — all readings on target.'
      : `Your pool is in great shape — ${issues.length === 1 ? 'one minor tweak' : `${issues.length} minor tweaks`}.`;
  }
  if (score >= 50) return 'A few readings need attention before your next swim.';
  return 'Chemistry needs urgent correction — hold off swimming for now.';
}

function getPrimaryAction(params, pool) {
  const alk = params.find(p => p.key === 'alkalinity');
  if (alk?.tagClass === 'tag-warn') {
    const vol = pool?.volumeKl || 30;
    const dose = Math.round(vol * 15);
    return {
      dose: `Add ${dose}g of sodium bicarbonate`,
      reason: `to raise alkalinity from ${alk.reading.replace(' ppm', '')} to 80–120 ppm. Re-test in 24 hours after circulation.`,
    };
  }
  const fc = params.find(p => p.key === 'freeChlor');
  if (fc?.status === '↑ Low') {
    const vol = pool?.volumeKl || 30;
    const dose = Math.round(vol * 7);
    return {
      dose: `Add ${dose}g of granular chlorine`,
      reason: `to raise free chlorine from ${fc.reading.replace(' ppm', '')} to 1.0–3.0 ppm.`,
    };
  }
  const pH = params.find(p => p.key === 'pH');
  if (pH?.status === '↓ High') {
    return {
      dose: 'Add 200 mL of muriatic acid in stages',
      reason: 'to lower pH to 7.2–7.6. Add with pump running and re-test in 4 hours.',
    };
  }
  return null;
}

function getRecommendations(params, pool) {
  const recs = [];
  const allGood = params.every(p => p.tagClass === 'tag-good');
  if (allGood) {
    recs.push({
      type: 'success',
      iconColor: 'var(--green)',
      icon: Icon.check,
      text: <><strong>All readings on target.</strong> No action needed — your next test is due in three days.</>,
    });
  }
  return recs;
}

function formatRelative(iso) {
  if (!iso) return 'unknown';
  const diff = (Date.now() - new Date(iso)) / 60000;
  if (diff < 2) return 'just now';
  if (diff < 60) return `${Math.round(diff)} min ago`;
  if (diff < 1440) return `${Math.round(diff / 60)} hr ago`;
  return `${Math.round(diff / 1440)} day${Math.round(diff / 1440) > 1 ? 's' : ''} ago`;
}

function formatDate(iso) {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' });
}


// ─────────────────────────────────────────────────────────────────
// APP ROOT
// ─────────────────────────────────────────────────────────────────
export default function App() {
  const [activeView, setActiveView] = useState('health');
  const [testData, setTestData] = useState(null);       // latest test
  const [testHistory, setTestHistory] = useState([]);   // all tests
  const [poolProfile, setPoolProfile] = useState({ name: 'Backyard pool', volumeKl: 32, sanitiser: 'chlorine' });
  const [showScan, setShowScan] = useState(false);
  const [trialDaysLeft, setTrialDaysLeft] = useState(7);

  // Count parameters out of range as pending actions
  const pendingActions = testData
    ? buildParams(testData).filter(p => p.tagClass !== 'tag-good').length
    : 0;

  const handleLogTest = (data) => {
    setTestData(data);
    setTestHistory(h => [...h, data]);
    setActiveView('health');
  };

  const handleScanComplete = (data) => {
    setTestData(data);
    setTestHistory(h => [...h, data]);
    setActiveView('health');
  };

  const handleSavePool = (profile) => {
    setPoolProfile(profile);
  };

  // Show trial expiry screen if trial ended
  if (trialDaysLeft <= 0) {
    return <TrialExpiredScreen />;
  }

  return (
    <div className="app-shell">
      {/* Top nav */}
      <nav className="topnav">
        <LogoMark />
        <span className="topnav-wordmark">PoolConnection</span>
        <div className="topnav-spacer" />
        <div className="topnav-actions">
          {trialDaysLeft <= 7 && (
            <span className="topnav-trial-badge">{trialDaysLeft} days left</span>
          )}
          <button className="btn btn-ghost btn-sm">Help</button>
          <button className="btn btn-nav" onClick={() => setActiveView('tests')}>
            Log test
          </button>
        </div>
      </nav>

      {/* Body */}
      <div className="app-body">
        <Sidebar
          activeView={activeView}
          onNav={setActiveView}
          pendingActions={pendingActions}
        />

        <main className="main-content">
          {activeView === 'health' && (
            <HealthScorePage testData={testData} poolProfile={poolProfile} />
          )}
          {activeView === 'tests' && (
            <WaterTestsPage
              testData={testData}
              onLogTest={handleLogTest}
              onScanTest={() => setShowScan(true)}
              poolProfile={poolProfile}
            />
          )}
          {activeView === 'history' && (
            <ChemistryLogPage history={testHistory} />
          )}
          {activeView === 'setup' && (
            <SetupPage poolProfile={poolProfile} onSave={handleSavePool} />
          )}
          {activeView === 'equipment' && (
            <div>
              <h1 className="page-title">Equipment</h1>
              <p className="page-subtitle">Pump, filter, heater, and automation settings</p>
              <div className="card">
                <div className="empty-state">
                  <div className="empty-state-icon">{Icon.equipment}</div>
                  <div className="empty-state-title">No equipment added</div>
                  <div className="empty-state-body">
                    Adding your pump and filter model helps PoolConnection tailor maintenance schedules for your setup.
                  </div>
                  <button className="btn btn-primary btn-sm">Add equipment</button>
                </div>
              </div>
            </div>
          )}
          {activeView === 'schedule' && (
            <div>
              <h1 className="page-title">Schedule</h1>
              <p className="page-subtitle">Upcoming maintenance and test reminders</p>
              <div className="card">
                <div className="empty-state">
                  <div className="empty-state-icon">{Icon.calendar}</div>
                  <div className="empty-state-title">No schedule yet</div>
                  <div className="empty-state-body">
                    Log your first water test to generate a personalised testing schedule.
                  </div>
                </div>
              </div>
            </div>
          )}
          {activeView === 'profile' && (
            <div>
              <h1 className="page-title">Profile</h1>
              <p className="page-subtitle">Account settings and preferences</p>
              <div className="card-section">
                <div className="eyebrow" style={{ marginBottom: 12 }}>Membership</div>
                <div className="callout callout-info">
                  <span className="callout-icon" style={{ color: 'var(--blue)', display: 'inline-flex' }}>
                    {Icon.info}
                  </span>
                  <div className="callout-body">
                    You're on a <strong>7-day free trial</strong> with {trialDaysLeft} days remaining. Become a founding member to keep full access permanently.
                  </div>
                </div>
                <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
                  <button className="btn btn-primary btn-sm">Claim founding access — $79</button>
                  <button className="btn btn-ghost btn-sm">Sign out</button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Scan modal */}
      {showScan && (
        <ScanModal
          onClose={() => setShowScan(false)}
          onComplete={handleScanComplete}
        />
      )}
    </div>
  );
}
