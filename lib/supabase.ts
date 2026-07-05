import { createClient } from "@supabase/supabase-js";

const URL = "https://padfgbudntpmzfnuiupt.supabase.co";
const KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBhZGZnYnVkbnRwbXpmbnVpdXB0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI0ODUzMTMsImV4cCI6MjA5ODA2MTMxM30.FzZrtP6TQoZcrTzjL8rIenQYxydiQxT4AKcpQf7h3P0";

export const supabase = createClient(URL, KEY);
