import { createClient } from '@supabase/supabase-js';

const URL = 'https://sbyebrlkbuixjethgrgp.supabase.co';
const API_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNieWVicmxrYnVpeGpldGhncmdwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUxMzQwMjgsImV4cCI6MjA3MDcxMDAyOH0.Eb0y7gFjlK1YUGABaqnAPLFjKHE0CUFLJFXVlvm7HPc';

export const supabase = createClient(URL, API_KEY);
