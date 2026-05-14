// PoolConnection — ui.jsx
// Design System v1.0 · April 2026
// Reusable primitive components — import these instead of writing inline styles

import React, { useEffect } from 'react';


/* ═══════════════════════════════════════════════════════════════
   LINE ICONS
   Flat SVG icon set · 24×24 viewBox · 1.5px stroke · currentColor
   Usage: <Icon name="pool" size={14} />
   ═══════════════════════════════════════════════════════════════ */

const ICONS = {
  pool: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12c3-2 3-4 6-4s3 2 6 4 3 4 6 4M3 18c3-2 3-4 6-4s3 2 6 4M5 8V5m14 3V5M5 5h14" />
  ),
  flask: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 3h6M10 3v7l-4.5 7.5A1.5 1.5 0 006.8 20h10.4a1.5 1.5 0 001.3-2.5L14 10V3" />
  ),
  droplet: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3C12 3 5 10.5 5 15a7 7 0 0014 0c0-4.5-7-12-7-12z" />
  ),
  grid: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h8v8H3zM13 3h8v8h-8zM3 13h8v8H3zM13 13h8v8h-8z" />
  ),
  gear: (
    <>
      <circle cx="12" cy="12" r="3" strokeLinecap="round" strokeLinejoin="round" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
    </>
  ),
  calendar: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z" />
  ),
  profile: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z" />
  ),
  bell: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" />
  ),
  check: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M20 6L9 17l-5-5" />
  ),
  'check-circle': (
    <path strokeLinecap="round" strokeLinejoin="round" d="M22 11.08V12a10 10 0 11-5.93-9.14M22 4L12 14.01l-3-3" />
  ),
  alert: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0zM12 9v4M12 17h.01" />
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8h.01M12 12v4" />
    </>
  ),
  lightbulb: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 21h6M9 18h6M12 3a7 7 0 015 11.95V16a1 1 0 01-1 1H8a1 1 0 01-1-1v-1.05A7 7 0 0112 3z" />
  ),
  camera: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2zM12 17a4 4 0 100-8 4 4 0 000 8z" />
  ),
  store: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 9l1-4h16l1 4M3 9h18M3 9v11a1 1 0 001 1h3v-4h4v4h7a1 1 0 001-1V9" />
  ),
  x: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 6L6 18M6 6l12 12" />
  ),
  'arrow-right': (
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
  ),
  plus: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="6" strokeLinecap="round" strokeLinejoin="round" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35" />
    </>
  ),
  'trending-up': (
    <path strokeLinecap="round" strokeLinejoin="round" d="M23 6l-9.5 9.5-5-5L1 18" />
  ),
  'trending-down': (
    <path strokeLinecap="round" strokeLinejoin="round" d="M23 18l-9.5-9.5-5 5L1 6" />
  ),
  home: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  ),
  share: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13" />
  ),
};

export function Icon({ name, size = 16, className = '', style = {} }) {
  const paths = ICONS[name];
  if (!paths) return null;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={className}
      style={style}
      aria-hidden="true"
    >
      {paths}
    </svg>
  );
}


/* ═══════════════════════════════════════════════════════════════
   BUTTON
   variant: 'primary' | 'water' | 'secondary' | 'ghost' | 'nav' | 'icon'
   size:    'sm' | 'md' (default) | 'lg'
   full:    boolean — 100% width
   ═══════════════════════════════════════════════════════════════ */

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
    return <a href={href} className={classes} {...props}>{children}</a>;
  }

  return (
    <button className={classes} disabled={disabled} onClick={onClick} {...props}>
      {children}
    </button>
  );
}


/* ═══════════════════════════════════════════════════════════════
   TAG
   variant: 'good' | 'warn' | 'bad' | 'info' | 'neutral'
   ═══════════════════════════════════════════════════════════════ */

export function Tag({ variant = 'neutral', children }) {
  return <span className={`tag tag-${variant}`}>{children}</span>;
}

/**
 * ParameterTag — derives variant + label from value vs min/max
 */
export function ParameterTag({ value, min, max, unit = '' }) {
  if (value === null || value === undefined) {
    return <Tag variant="neutral">—</Tag>;
  }
  if (value < min) return <Tag variant="warn">↑ Low</Tag>;
  if (value > max) return <Tag variant="warn">↓ High</Tag>;
  return <Tag variant="good">✓ Good</Tag>;
}


/* ═══════════════════════════════════════════════════════════════
   CALLOUT
   type:  'action' (amber) | 'info' (blue) | 'success' (green) | 'alert' (red)
   icon:  ReactNode override — defaults to themed line icon per type
   title: optional small uppercase label above body
   ═══════════════════════════════════════════════════════════════ */

const CALLOUT_ICON_DEFAULTS = {
  action:  <Icon name="lightbulb"    size={16} style={{ color: 'var(--amber)' }} />,
  info:    <Icon name="info"         size={16} style={{ color: 'var(--blue)' }} />,
  success: <Icon name="check-circle" size={16} style={{ color: 'var(--green)' }} />,
  alert:   <Icon name="alert"        size={16} style={{ color: 'var(--red)' }} />,
};

export function Callout({ type = 'action', icon, title, children }) {
  const iconEl = icon !== undefined ? icon : CALLOUT_ICON_DEFAULTS[type];
  return (
    <div className={`callout callout-${type}`}>
      {iconEl && <span className="callout-icon">{iconEl}</span>}
      <div className="callout-body">
        {title && <div className="callout-title">{title}</div>}
        {children}
      </div>
    </div>
  );
}


/* ═══════════════════════════════════════════════════════════════
   MODAL
   Accessible modal with backdrop.
   Closes on Escape key or backdrop click.
   Props:
     open    {boolean}
     onClose {function}
     title   {string|ReactNode}  — Newsreader heading
     body    {string|ReactNode}  — descriptive paragraph
     actions {ReactNode}         — button row (right-aligned)
     children                    — arbitrary content inside panel
   ═══════════════════════════════════════════════════════════════ */

export function Modal({ open, onClose, title, body, actions, children }) {
  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e) => { if (e.key === 'Escape') onClose?.(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="modal-backdrop"
      onClick={(e) => { if (e.target === e.currentTarget) onClose?.(); }}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'pc-modal-title' : undefined}
    >
      <div className="modal-panel">
        {title && <div className="modal-title" id="pc-modal-title">{title}</div>}
        {body   && <div className="modal-body">{body}</div>}
        {children}
        {actions && <div className="modal-actions">{actions}</div>}
      </div>
    </div>
  );
}


/* ═══════════════════════════════════════════════════════════════
   CARD
   tinted:   uses card-section (white bg + padding)
   elevated: uses card-elevated (shadow, for pricing/modals)
   default:  card (border only, no padding)
   ═══════════════════════════════════════════════════════════════ */

export function Card({ tinted = false, elevated = false, style = {}, children, className = '' }) {
  const cls = elevated ? 'card-elevated' : tinted ? 'card-section' : 'card';
  return (
    <div className={`${cls} ${className}`} style={style}>
      {children}
    </div>
  );
}


/* ═══════════════════════════════════════════════════════════════
   EMPTY STATE
   ═══════════════════════════════════════════════════════════════ */

export function EmptyState({ icon, title, body, action }) {
  return (
    <div className="empty-state">
      {icon  && <div className="empty-state-icon">{icon}</div>}
      {title && <div className="empty-state-title">{title}</div>}
      {body  && <p className="empty-state-body">{body}</p>}
      {action && (
        <Button variant="primary" href={action.href} onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  );
}


/* ═══════════════════════════════════════════════════════════════
   DOT LOADER
   ═══════════════════════════════════════════════════════════════ */

export function DotLoader() {
  return (
    <span className="dot-loader" aria-label="Loading">
      <span /><span /><span />
    </span>
  );
}


/* ═══════════════════════════════════════════════════════════════
   SKELETON
   ═══════════════════════════════════════════════════════════════ */

export function Skeleton({ width, height = 16, radius = 4, style = {} }) {
  return (
    <div
      className="skeleton"
      aria-hidden="true"
      style={{ width: width || '100%', height, borderRadius: radius, ...style }}
    />
  );
}


/* ═══════════════════════════════════════════════════════════════
   DIVIDER
   ═══════════════════════════════════════════════════════════════ */

export function Divider({ size = 'md' }) {
  return <div className={size === 'sm' ? 'divider-sm' : 'divider'} />;
}


/* ═══════════════════════════════════════════════════════════════
   EYEBROW / SECTION LABEL
   ═══════════════════════════════════════════════════════════════ */

export function Eyebrow({ children }) {
  return <div className="eyebrow">{children}</div>;
}
