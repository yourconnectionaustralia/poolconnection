// PoolConnection — AppShell.jsx
// Aligned with DESIGN.md v1.0
// Provides the fixed nav, sidebar, and main content wrapper

import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

// ── Logo mark SVG ─────────────────────────────────────
function LogoMark({ size = 26 }) {
  const r = size <= 22 ? 4 : 6;
  return (
    <div
      className="topnav-logo-mark"
      style={{ width: size, height: size, borderRadius: r }}
    >
      <svg viewBox="0 0 16 16" fill="none" style={{ width: size * 0.6, height: size * 0.6 }}>
        <path
          d="M8 1.5C8 1.5 3.5 7 3.5 10.5C3.5 13 5.5 14.5 8 14.5C10.5 14.5 12.5 13 12.5 10.5C12.5 7 8 1.5 8 1.5Z"
          fill="white"
          opacity="0.9"
        />
        <circle cx="8" cy="10.5" r="2" fill="white" opacity="0.4" />
      </svg>
    </div>
  );
}

// ── Nav items config ──────────────────────────────────
const NAV_SECTIONS = [
  {
    label: 'My Pool',
    items: [
      { href: '/dashboard',   icon: '🏊', label: 'Health Score' },
      { href: '/tests',       icon: '🧪', label: 'Water Tests',   badge: null },
      { href: '/scan',        icon: '📸', label: 'Scan Results' },
      { href: '/history',     icon: '📈', label: 'History' },
    ],
  },
  {
    label: 'Manage',
    items: [
      { href: '/equipment',   icon: '⚙️', label: 'Equipment' },
      { href: '/chemicals',   icon: '💊', label: 'Chemical Log' },
      { href: '/tasks',       icon: '📋', label: 'Seasonal Tasks' },
    ],
  },
];

// ── Sidebar ───────────────────────────────────────────
function Sidebar({ pendingActions = 0 }) {
  return (
    <nav className="sidebar">
      {NAV_SECTIONS.map((section) => (
        <div className="sidebar-section" key={section.label}>
          <div className="sidebar-section-label">{section.label}</div>
          {section.items.map((item) => {
            // Inject pending badge on Water Tests if there are actions
            const badge =
              item.href === '/tests' && pendingActions > 0
                ? `${pendingActions} action${pendingActions > 1 ? 's' : ''}`
                : item.badge;

            return (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) =>
                  `sidebar-item${isActive ? ' active' : ''}`
                }
              >
                <span className="sidebar-icon">{item.icon}</span>
                {item.label}
                {badge && <span className="sidebar-badge">{badge}</span>}
              </NavLink>
            );
          })}
        </div>
      ))}
    </nav>
  );
}

// ── Top nav ───────────────────────────────────────────
function TopNav({ user }) {
  const initials = user?.email
    ? user.email.slice(0, 2).toUpperCase()
    : 'PC';

  return (
    <header className="topnav">
      <div className="topnav-inner">
        <NavLink to="/dashboard" className="topnav-logo" style={{ textDecoration: 'none' }}>
          <LogoMark size={26} />
          PoolConnection
        </NavLink>
        <div className="topnav-right">
          <div className="topnav-avatar" title={user?.email || ''}>
            {initials}
          </div>
        </div>
      </div>
    </header>
  );
}

// ── App Shell ─────────────────────────────────────────
/**
 * AppShell
 *
 * Props:
 *   user           {object|null}  Supabase user object
 *   pendingActions {number}       Number of pending water test actions (for sidebar badge)
 *   children       {ReactNode}    Page content
 */
export default function AppShell({ user, pendingActions = 0, children }) {
  return (
    <div className="app-shell">
      <TopNav user={user} />
      <div className="app-body">
        <Sidebar pendingActions={pendingActions} />
        <main className="main-content">
          {children}
        </main>
      </div>
    </div>
  );
}

export { LogoMark, Sidebar, TopNav };
