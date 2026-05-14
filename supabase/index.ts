// ─────────────────────────────────────────────────────────────────
// Edge Function: submit-suggestions
// Runtime: Deno (Supabase Edge Functions)
//
// Accepts a batch of feedback pins from the in-app SuggestionBox
// widget. Writes them to public.suggestions and emails the admin a
// formatted summary.
//
// Required Supabase secrets (set in dashboard → Edge Functions):
//   • SUPABASE_URL                  — auto-populated
//   • SUPABASE_SERVICE_ROLE_KEY     — auto-populated
//   • SUPABASE_ANON_KEY             — auto-populated
//   • RESEND_API_KEY                — for transactional email
//   • ADMIN_EMAIL                   — yourconnectionaustralia@gmail.com
//   • FROM_EMAIL                    — e.g. "PoolConnection <noreply@poolconnection.com.au>"
//   • ALLOWED_ORIGINS               — comma-separated, e.g.
//                                     "https://poolconnection.pages.dev,https://app.poolconnection.com.au,http://localhost:5173"
//
// Optional fallback: if RESEND_API_KEY is not set, the function still
// writes to the DB and returns 200 — the admin can read pending rows
// directly from the dashboard. The response body will note this.
//
// Rate limit: 30 batches / IP / hour (in-memory, best-effort).
// ─────────────────────────────────────────────────────────────────

import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

// ── Config ────────────────────────────────────────────────────────
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY")!;
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY") || "";
const ADMIN_EMAIL = Deno.env.get("ADMIN_EMAIL") || "yourconnectionaustralia@gmail.com";
const FROM_EMAIL =
  Deno.env.get("FROM_EMAIL") || "PoolConnection <onboarding@resend.dev>";

const ALLOWED = (Deno.env.get("ALLOWED_ORIGINS") ||
  "https://poolconnection.pages.dev,https://app.poolconnection.com.au,http://localhost:5173"
).split(",").map((s) => s.trim()).filter(Boolean);

// ── CORS ──────────────────────────────────────────────────────────
function corsHeaders(origin: string | null): HeadersInit {
  const allow = origin && ALLOWED.includes(origin) ? origin : ALLOWED[0];
  return {
    "Access-Control-Allow-Origin": allow,
    "Access-Control-Allow-Headers":
      "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Vary": "Origin",
  };
}

// ── Simple in-memory rate limit (best-effort, per warm instance) ──
const RATE_BUCKET = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 30;
const WINDOW_MS = 60 * 60 * 1000; // 1 hour

function rateLimited(key: string): boolean {
  const now = Date.now();
  const cur = RATE_BUCKET.get(key);
  if (!cur || cur.resetAt < now) {
    RATE_BUCKET.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  cur.count += 1;
  return cur.count > RATE_LIMIT;
}

// ── Types ─────────────────────────────────────────────────────────
type Pin = {
  id: string;
  view: string;
  path: string;
  x: number;
  y: number;
  text: string;
  createdAt: string;
};

type Payload = {
  batchId: string;
  submittedAt: string;
  userAgent?: string;
  viewport?: { w: number | null; h: number | null };
  pins: Pin[];
};

// ── Validation ───────────────────────────────────────────────────
function validate(payload: any): { ok: true; data: Payload } | { ok: false; error: string } {
  if (!payload || typeof payload !== "object") return { ok: false, error: "Body must be JSON object" };
  if (typeof payload.batchId !== "string" || !payload.batchId) return { ok: false, error: "batchId required" };
  if (!Array.isArray(payload.pins) || payload.pins.length === 0)
    return { ok: false, error: "pins[] required and must be non-empty" };
  if (payload.pins.length > 50)
    return { ok: false, error: "Too many pins in a single batch (max 50)" };
  for (const p of payload.pins) {
    if (typeof p.text !== "string" || p.text.trim().length === 0)
      return { ok: false, error: "Every pin needs a non-empty text" };
    if (p.text.length > 4000)
      return { ok: false, error: "Pin text too long (max 4000 chars)" };
  }
  return { ok: true, data: payload as Payload };
}

// ── HTML email body ──────────────────────────────────────────────
function buildEmail(batch: Payload, who: { email: string | null; id: string | null }) {
  const rows = batch.pins
    .map(
      (p) => `
      <tr>
        <td style="padding:8px 12px;border-bottom:1px solid #E5EEF3;font:600 12px/1.2 'Space Grotesk',system-ui,sans-serif;color:#0077B6;text-transform:uppercase;letter-spacing:0.4px;vertical-align:top;">
          ${escapeHtml(p.view || "unknown")}
        </td>
        <td style="padding:8px 12px;border-bottom:1px solid #E5EEF3;font:400 13px/1.5 'DM Sans',system-ui,sans-serif;color:#0F2A3B;vertical-align:top;">
          ${escapeHtml(p.text).replace(/\n/g, "<br/>")}
          <div style="margin-top:6px;color:#5B7280;font-size:11px;">
            path: ${escapeHtml(p.path || "/")} · pos: ${p.x},${p.y}
          </div>
        </td>
      </tr>`
    )
    .join("");

  return `
  <div style="font:400 14px/1.5 'DM Sans',system-ui,sans-serif;color:#0F2A3B;max-width:640px;margin:0 auto;padding:20px;">
    <h1 style="font:600 22px/1.2 'Space Grotesk',system-ui,sans-serif;color:#0077B6;margin:0 0 4px;">
      New PoolConnection feedback
    </h1>
    <p style="color:#5B7280;margin:0 0 16px;font-size:13px;">
      Batch ${escapeHtml(batch.batchId)} · ${batch.pins.length} pin${batch.pins.length === 1 ? "" : "s"} · submitted ${escapeHtml(batch.submittedAt)}
    </p>
    <p style="margin:0 0 16px;font-size:13px;">
      <strong>From:</strong> ${who.email ? escapeHtml(who.email) : "anonymous / not signed in"}
      ${who.id ? `<span style="color:#5B7280;"> (user id ${escapeHtml(who.id)})</span>` : ""}
    </p>
    <table style="width:100%;border-collapse:collapse;border:1px solid #E5EEF3;border-radius:8px;overflow:hidden;">
      <thead>
        <tr style="background:#F7FBFD;">
          <th style="text-align:left;padding:8px 12px;font:600 11px/1 'Space Grotesk',system-ui,sans-serif;color:#5B7280;text-transform:uppercase;letter-spacing:0.5px;">View</th>
          <th style="text-align:left;padding:8px 12px;font:600 11px/1 'Space Grotesk',system-ui,sans-serif;color:#5B7280;text-transform:uppercase;letter-spacing:0.5px;">Comment</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
    <p style="color:#5B7280;font-size:11px;margin-top:16px;">
      User-agent: ${escapeHtml(batch.userAgent || "—")}<br/>
      Viewport: ${batch.viewport?.w ?? "—"} × ${batch.viewport?.h ?? "—"}
    </p>
  </div>`;
}

function escapeHtml(s: string): string {
  return (s || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// ── Main handler ─────────────────────────────────────────────────
serve(async (req) => {
  const origin = req.headers.get("origin");
  const cors = corsHeaders(origin);

  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: cors });
  }

  if (req.method !== "POST") {
    return jsonResponse({ error: "Method not allowed", code: "method_not_allowed" }, 405, cors);
  }

  // Rate limit by IP (best effort — multiple instances will not share state)
  const ip = req.headers.get("cf-connecting-ip") || req.headers.get("x-forwarded-for") || "unknown";
  if (rateLimited(ip)) {
    return jsonResponse({ error: "Too many submissions. Try again later.", code: "rate_limited" }, 429, cors);
  }

  // Parse body
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return jsonResponse({ error: "Invalid JSON", code: "bad_json" }, 400, cors);
  }

  const v = validate(body);
  if (!v.ok) {
    return jsonResponse({ error: v.error, code: "validation" }, 400, cors);
  }
  const batch = v.data;

  // Resolve the user (optional — anonymous submissions allowed)
  const authHeader = req.headers.get("Authorization") || "";
  const token = authHeader.replace(/^Bearer\s+/i, "");

  let user_id: string | null = null;
  let user_email: string | null = null;

  if (token && token !== ANON_KEY) {
    try {
      const userClient = createClient(SUPABASE_URL, ANON_KEY, {
        global: { headers: { Authorization: `Bearer ${token}` } },
      });
      const { data: { user } } = await userClient.auth.getUser();
      if (user) {
        user_id = user.id;
        user_email = user.email ?? null;
      }
    } catch {
      // anonymous / invalid token — proceed without user info
    }
  }

  // Insert with service role to bypass RLS for unauth/anon submissions
  const admin = createClient(SUPABASE_URL, SERVICE_ROLE, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const rows = batch.pins.map((p) => ({
    batch_id: batch.batchId,
    user_id,
    user_email,
    view_name: p.view,
    path: p.path,
    x: Math.round(p.x),
    y: Math.round(p.y),
    viewport_w: batch.viewport?.w ?? null,
    viewport_h: batch.viewport?.h ?? null,
    comment: p.text.trim(),
    user_agent: batch.userAgent || null,
  }));

  const { error: insertErr } = await admin.from("suggestions").insert(rows);
  if (insertErr) {
    console.error("insert error", insertErr);
    return jsonResponse({ error: "Could not save suggestions", code: "db_error", detail: insertErr.message }, 500, cors);
  }

  // Email admin (best-effort — DB write is the source of truth)
  let emailStatus: "sent" | "skipped" | "failed" = "skipped";
  if (RESEND_API_KEY) {
    try {
      const html = buildEmail(batch, { email: user_email, id: user_id });
      const r = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: FROM_EMAIL,
          to: [ADMIN_EMAIL],
          subject: `[PoolConnection] ${batch.pins.length} new suggestion${batch.pins.length === 1 ? "" : "s"}`,
          html,
          reply_to: user_email || undefined,
        }),
      });
      emailStatus = r.ok ? "sent" : "failed";
      if (!r.ok) console.error("resend error", await r.text());
    } catch (e) {
      console.error("email error", e);
      emailStatus = "failed";
    }
  }

  return jsonResponse(
    { ok: true, saved: rows.length, batchId: batch.batchId, email: emailStatus },
    200,
    cors
  );
});

function jsonResponse(body: unknown, status: number, cors: HeadersInit) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...cors, "Content-Type": "application/json" },
  });
}
