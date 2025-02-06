import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

const SUPABASE_URL = "https://xoxmnagsolzhmelerlzj.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhveG1uYWdzb2x6aG1lbGVybHpqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYxNTc3MjksImV4cCI6MjA1MTczMzcyOX0.IgcLxkN_qKOnfVN98w_Oe3M_O5oRuhzWktGzEeVCQg4";

export const supabase = createClient<Database>(
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    }
  }
);