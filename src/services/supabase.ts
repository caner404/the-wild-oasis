import { createClient } from '@supabase/supabase-js';
export const supabaseUrl = 'https://wdtmtgkbnqegqrnbkbzq.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndkdG10Z2tibnFlZ3FybmJrYnpxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTMzNDI5NjMsImV4cCI6MjAyODkxODk2M30.4E1YUQBtcrtqrEp5wUsiJIKJMdcjFZ6Y4Tnd77YJwd8';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
