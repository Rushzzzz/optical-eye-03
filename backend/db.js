const path = require('path');
const dotenv = require('dotenv');

// Load .env from the current directory
dotenv.config({ path: path.join(__dirname, '.env') });

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase URL or Key in environment variables');
  // Don't exit process here to allow build to pass if just checking types, but it will fail at runtime
}

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
