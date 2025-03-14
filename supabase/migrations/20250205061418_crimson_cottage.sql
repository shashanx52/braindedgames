/*
  # Create words table for Wordle game

  1. New Tables
    - `words`
      - `id` (uuid, primary key)
      - `word` (text, unique)
      - `length` (integer)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `words` table
    - Add policy for public read access
*/

CREATE TABLE IF NOT EXISTS words (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  word text UNIQUE NOT NULL,
  length integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE words ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access"
  ON words
  FOR SELECT
  TO public
  USING (true);