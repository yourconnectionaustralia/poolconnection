import { createClient } from '@supabase/supabase-js';

/**
 * Supabase client (browser).
 *
 * Reads from Vite-injected env vars. Set these in:
 *   - Local dev:           .env.local (git-ignored)
 *   - Cloudflare Pages:    Settings → Environment variables
 *                          - Production scope:  prod project keys
 *                          - Preview scope:     preview/staging keys
 *
 * The anon key is publishable (RLS is the real defense layer), but
 * keeping it out of source control means: (a) we can rotate without
 * a code change, (b) preview deploys can point at a different
 * Supabase project, (c) we never accidentally bake a service_role
 * key into the bundle.
 */

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  // Fail loudly so a misconfigured deploy is obvious in the console
  // instead of producing silent auth/network errors deep in the app.
  // eslint-disable-next-line no-console
  console.error(
    '[supabase] Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY. ' +
    'Set them in .env.local for local dev, or in Cloudflare Pages → ' +
    'Settings → Environment variables for deploys.'
  );
  throw new Error('Supabase env vars not set');
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
