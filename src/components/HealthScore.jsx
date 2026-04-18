// PoolConnection — HealthScore.jsx
// Aligned with DESIGN.md v1.0
// Score ring SVG + summary row + callout + readings table

import React, { useEffect, useRef, useState } from 'react';

// ── Helpers ──────────────────────────────────────────
/**
 * Convert a 0–100 score to a stroke-dashoffset for the SVG ring.
 * Ring circumference = 2π × r = 2π × 35 ≈ 220
 */
function scoreToOffset(score) {
  const circumference = 220;
  const clamped = Math.max(0, Math.min(100, score));
  return circumference - (clamped / 100) * circumference;
}

function scoreClass(score) {
  if (score >= 80) return 'score-good';
  if (score >= 50) return 'score-warn';
  return 'score-critical';
}

function scoreLabel(score) {
  if (score >= 80) return 'Good condition';
  if (score >= 50) return 'Needs attention';
  return 'Act now';
}

function paramStatus(value, min, max) {
  if (value === null || value === undefined) return 'neutral';
  if (value < min) return 'warn';
  if (value > max) return 'bad';
  return 'good';
}

function paramLabel(value, min, max) {
  if (value === null || value === undefined) return '—';
  if (value < min) return '↑ Low';
  if (value > max) return '↓ High';
  return '✓ Good';
}

// ── Sub-components ────────────────────────────────────

function ScoreRing({ score, size = 88 }) {
  const radius = 35;
  const [offset, setOffset] = useState(220);

  useEffect(() => {
    // Small delay so the animation is visible on mount
    const t = setTimeout(() => setOffset(scoreToOffset(score)), 120);
    return () => clearTimeout(t);
  }, [score]);

  return (
    <div className="score-ring-container" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox="0 0 88 88">
        <circle
          className="score-ring-track"
          cx="44" cy="44" r={radius}
        />
        <circle
          className={`score-ring-fill ${scoreClass(score)}`}
          cx="44" cy="44" r={radius}
          style={{ strokeDashoffset: offset }}
        />
      </svg>
      <div className="score-ring-label">
        <span className="score-number score-number-lg">{score}</span>
        <span className="score-of">/ 100</span>
      </div>
    </div>
  );
}

function ParameterTag({ value, min, max }) {
  const status = paramStatus(value, min, max);
  const label = paramLabel(value, min, max);
  const classMap = {
    good: 'tag tag-good',
    warn: 'tag tag-warn',
    bad:  'tag tag-bad',
    neutral: 'tag tag-neutral',
  };
  return <span className={classMap[status]}>{label}</span>;
}

function Callout({ icon = '💡', type = 'action', children }) {
  const typeClass = {
    action:  'callout callout-action',
    info:    'callout callout-info',
    success: 'callout callout-success',
    alert:   'callout callout-alert',
  };
  return (
    <div className={typeClass[type] || typeClass.action}>
      <span className="callout-icon">{icon}</span>
      <div className="callout-body">{children}</div>
    </div>
  );
}

// ── Main component ────────────────────────────────────

/**
 * HealthScore
 *
 * Props:
 *   score        {number}  0–100 health score
 *   summary      {string}  one-sentence description of current state
 *   recommendation {object|null}  { text, chemical?, doseGrams?, icon? }
 *   readings     {array}   array of { name, value, unit, min, max }
 *   poolName     {string}  display name for the pool
 *   lastTested   {string}  human-readable last test date string
 *   loading      {boolean}
 */
export default function HealthScore({
  score = 0,
  summary = '',
  recommendation = null,
  readings = [],
  poolName = 'My Pool',
  lastTested = null,
  loading = false,
}) {
  if (loading) {
    return (
      <div>
        <div className="page-title">🏊 Health Score</div>
        <div className="page-subtitle">Loading…</div>
        <div className="card-section" style={{ padding: '20px 24px', marginBottom: 16, display: 'flex', gap: 24, alignItems: 'center' }}>
          <div className="skeleton" style={{ width: 88, height: 88, borderRadius: '50%' }} />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div className="skeleton" style={{ width: '40%', height: 16 }} />
            <div className="skeleton" style={{ width: '70%', height: 12 }} />
            <div className="skeleton" style={{ width: '55%', height: 12 }} />
          </div>
        </div>
      </div>
    );
  }

  const hasReadings = readings.length > 0;
  const hasRecommendation = recommendation !== null;

  return (
    <div>
      {/* Page header */}
      <div className="page-title">🏊 Health Score</div>
      <div className="page-subtitle">
        {lastTested ? `Last tested ${lastTested} · ` : ''}{poolName}
      </div>

      {/* Score row */}
      <div
        className="card-section"
        style={{
          display: 'grid',
          gridTemplateColumns: 'auto 1fr',
          gap: 24,
          alignItems: 'center',
          padding: '20px 24px',
          marginBottom: 16,
        }}
      >
        <ScoreRing score={score} />
        <div>
          <h4 style={{ fontSize: 15, fontWeight: 500, color: 'var(--black)', marginBottom: 4 }}>
            {scoreLabel(score)}
          </h4>
          {summary && (
            <p style={{ fontSize: 13, color: 'var(--gray-mid)', lineHeight: 1.55, marginBottom: 12 }}>
              {summary}
            </p>
          )}
          {/* Parameter tags */}
          {hasReadings && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {readings.map((r) => (
                <ParameterTag key={r.name} value={r.value} min={r.min} max={r.max} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Primary recommendation callout */}
      {hasRecommendation && (
        <div style={{ marginBottom: 16 }}>
          <Callout icon={recommendation.icon || '💡'} type="action">
            {recommendation.chemical && recommendation.doseGrams ? (
              <>
                <strong>
                  Add {recommendation.doseGrams}g of {recommendation.chemical}
                </strong>{' '}
                {recommendation.text}
              </>
            ) : (
              recommendation.text
            )}
          </Callout>
        </div>
      )}

      {/* Readings table */}
      {hasReadings && (
        <div className="card" style={{ overflow: 'hidden' }}>
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
              {readings.map((r) => (
                <tr key={r.name}>
                  <td>{r.name}</td>
                  <td>
                    {r.value !== null && r.value !== undefined
                      ? `${r.value} ${r.unit || ''}`
                      : '—'}
                  </td>
                  <td style={{ color: 'var(--gray-mid)' }}>
                    {r.min}–{r.max} {r.unit || ''}
                  </td>
                  <td>
                    <ParameterTag value={r.value} min={r.min} max={r.max} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Empty state */}
      {!hasReadings && (
        <div className="empty-state">
          <div className="empty-state-icon">🧪</div>
          <div className="empty-state-title">No readings yet</div>
          <p className="empty-state-body">
            Log your first water test to generate a Health Score and get personalised recommendations for your pool.
          </p>
          <a href="/test/new" className="btn btn-primary">Log water test</a>
        </div>
      )}
    </div>
  );
}

// ── Named exports for reuse ───────────────────────────
export { ScoreRing, ParameterTag, Callout };
