import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zrbtqzwmlcltufgkrqta.supabase.co'; // Replace with your Supabase project URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpyYnRxendtbGNsdHVmZ2tycXRhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMjc5OTQxMiwiZXhwIjoyMDQ4Mzc1NDEyfQ.1Z9y6X_5zuyq4xHvqMxsQZpVRa2KDnunNMQnU-XDt0Q'
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
