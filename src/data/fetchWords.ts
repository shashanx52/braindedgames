import { createClient } from '@supabase/supabase-js';
import fallbackWords from './words';

// Initialize Supabase client only if environment variables are available
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

const WORDNIK_API_KEY = '10zofxlhfopvyjnouuyjvj6nauwwp0qhr8lsmhttr2aruj4m0';
const WORDNIK_URL = `https://api.wordnik.com/v4/words.json/randomWords?hasDictionaryDef=true&minLength=5&maxLength=5&limit=50&api_key=${WORDNIK_API_KEY}`;

export async function fetchWords(): Promise<string[]> {
  try {
    // Try fetching words from Wordnik API
    const response = await fetch(WORDNIK_URL);
    if (response.ok) {
      const words = await response.json();
      return words.map((wordObj: { word: string }) => wordObj.word.toLowerCase());
    }
    console.warn('Wordnik API failed, falling back to Supabase.');
  } catch (error) {
    console.error('Error fetching words from Wordnik:', error);
  }

  // If Wordnik fails, try fetching from Supabase
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('words')
        .select('word')
        .eq('length', 5);

      if (!error && data.length > 0) {
        return data.map(row => row.word.toLowerCase());
      }
      console.warn('Supabase failed, falling back to fallback words.');
    } catch (error) {
      console.error('Error fetching words from Supabase:', error);
    }
  }

  // If both Wordnik and Supabase fail, use fallback words
  console.log('Using fallback word list');
  return fallbackWords;
}
