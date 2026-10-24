// Supabase Configuration
const supabaseUrl = "https://uuagsbpxjfspfiijjjup.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV1YWdzYnB4amZzcGZpaWpqanVwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzMjg2NzAsImV4cCI6MjA5NjkwNDY3MH0.S1HO488DvYVJBj4yq41fYYCJj20BUBI4m8byZvDhgrM";
let dbClient = null;

if (window.supabase) {
  dbClient = window.supabase.createClient(supabaseUrl, supabaseKey);
} else {
  console.error("Supabase CDN failed to load.");
}
