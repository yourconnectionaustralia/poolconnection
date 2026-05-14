import { createClient } from '@supabase/supabase-js';

// NOTE: these are the public anon credentials — safe to ship in the browser bundle.
// They are exported so other modules (e.g. SuggestionBox → submit-suggestions
// Edge Function) can build URLs and pass the apikey header without depending on
// undocumented internal properties of the supabase-js client.

export const SUPABASE_URL = 'https://chmjvbuesynicrmtkrqp.supabase.co';
export const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNobWp2YnVlc3luaWNybXRrcnFwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI1Njg1NDgsImV4cCI6MjA4ODE0NDU0OH0.TGsPQxmZij-xoCGbcf3nMVu5fHNyVGmLkz5m1Bg_ALI';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
