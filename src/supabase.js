import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://chmjvbuesynicrmtkrqp.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNobWp2YnVlc3luaWNybXRrcnFwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI1Njg1NDgsImV4cCI6MjA4ODE0NDU0OH0.TGsPQxmZij-xoCGbcf3nMVu5fHNyVGmLkz5m1Bg_ALI';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
