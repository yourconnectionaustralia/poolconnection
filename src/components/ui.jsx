// PoolConnection — ui.jsx
// Aligned with DESIGN.md v1.0
// Reusable primitive components — import these instead of writing inline styles

import React from 'react';

// ── Button ────────────────────────────────────────────
/**
 * Button
 *
 * variant: 'primary' | 'secondary' | 'ghost' | 'icon'
 * size:    'sm' | 'md' (default) | 'lg'
 * full:    boolean — 100% width
 */
export function Button({
  variant = 'primary',
  size = 'md',
  full = false,
  disabled = false,
  onClick,
  href,
  children,
  className = '',
  ...props
}) {
  const classes = [
    'btn',
    `btn-${variant}`,
    size === 'sm' ? 'btn-sm' : size === 'lg' ? 'btn-lg' : '',
    full ? 'btn-full' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} disabled={disabled} onClick={onClick} {...props}>
      {children}
    </button>
  );
}

// ── Tag ───────────────────────────────────────────────
/**
 * Tag
 *
 * variant: 'good' | 'warn' | 'bad' | 'info' | 'neutral'
 */
export function Tag({ variant = 'neutral', children }) {
  return <span className={`tag tag-${variant}`}>{children}</span>;
}

/**
 * ParameterTag — derives variant from value vs min/max
 */
export function ParameterTag({ value, min, max, unit = '' }) {
  if (value === null || value === undefined) {
    return <Tag variant="neutral">—</Tag>;
  }
  if (value < min) return <Tag variant="warn">↑ Low</Tag>;
  if (value > max) return <Tag variant="warn">↓ High</Tag>;
  return <Tag variant="good">✓ Good</Tag>;
}

// ── Callout ───────────────────────────────────────────
/**
 * Callout
 *
 * type:  'action' (amber) | 'info' (blue) | 'success' (green) | 'alert' (red)
 * icon:  emoji string, defaults by type
 * title: optional small uppercase label above body
 */
const CALLOUT_DEFAULTS = {
  action:  '💡',
  info:    'ℹ️',
  success: '✓',
  alert:   '⚠️',
};

export function Callout({ type = 'action', icon, title, children }) {
  const emoji = icon || CALLOUT_DEFAULTS[type] || '💡';
  return (
    <div className={`callout callout-${type}`}>
      <span className="callout-icon">{emoji}</span>
      <div className="callout-body">
        {title && <div className="callout-title">{title}</div>}
        {children}
      </div>
    </div>
  );
}

// ── Empty State ───────────────────────────────────────
/**
 * EmptyState
 *
 * icon:   emoji
 * title:  short heading (Newsreader 400)
 * body:   explanatory sentence
 * action: { label, href, onClick }
 */
export function EmptyState({ icon, title, body, action }) {
  return (
    <div className="empty-state">
      {icon && <div className="empty-state-icon">{icon}</div>}
      {title && <div className="empty-state-title">{title}</div>}
      {body && <p className="empty-state-body">{body}</p>}
      {action && (
        <Button
          variant="primary"
          href={action.href}
          onClick={action.onClick}
        >
          {action.label}
        </Button>
      )}
    </div>
  );
}

// ── DotLoader ─────────────────────────────────────────
export function DotLoader() {
  return (
    <span className="dot-loader">
      <span /><span /><span />
    </span>
  );
}

// ── Skeleton ──────────────────────────────────────────
export function Skeleton({ width, height, radius = 4, style = {} }) {
  return (
    <div
      className="skeleton"
      style={{
        width: width || '100%',
        height: height || 16,
        borderRadius: radius,
        ...style,
      }}
    />
  );
}

// ── Divider ───────────────────────────────────────────
export function Divider({ size = 'md' }) {
  return <div className={size === 'sm' ? 'divider-sm' : 'divider'} />;
}

// ── Card ──────────────────────────────────────────────
export function Card({ tinted = false, style = {}, children, className = '' }) {
  return (
    <div className={`${tinted ? 'card-section' : 'card'} ${className}`} style={style}>
      {children}
    </div>
  );
}

// ── Section Eyebrow ───────────────────────────────────
export function Eyebrow({ children }) {
  return <div className="section-eyebrow">{children}</div>;
}
