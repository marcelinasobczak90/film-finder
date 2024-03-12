import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://hfszbdxschiobmvwkcfr.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhmc3piZHhzY2hpb2JtdndrY2ZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg4MDkyNzYsImV4cCI6MjAyNDM4NTI3Nn0.F2H28Raowg8Pf3WzmSte88C81HCpAu1IMjQsjRrf6_k";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
