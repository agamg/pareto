import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://zmihpyxsmvcstuyukgly.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InptaWhweXhzbXZjc3R1eXVrZ2x5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg2MjY0NzIsImV4cCI6MjA0NDIwMjQ3Mn0.FVBM2zKO-UjQW_Pz2mtNguRr4AeGj3c7r0NXLe0ZxWU";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);