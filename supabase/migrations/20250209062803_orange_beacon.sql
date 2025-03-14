/*
  # Create Scribble Game Tables

  1. New Tables
    - `scribble_rooms`
      - `id` (uuid, primary key)
      - `room_id` (text, unique)
      - `room_data` (jsonb)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `scribble_rooms` table
    - Add policies for public access (since it's a public game)
*/

CREATE TABLE IF NOT EXISTS scribble_rooms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id text UNIQUE NOT NULL,
  room_data jsonb NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE scribble_rooms ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access"
  ON scribble_rooms
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public insert"
  ON scribble_rooms
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow public update"
  ON scribble_rooms
  FOR UPDATE
  TO public
  USING (true);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_scribble_rooms_updated_at
  BEFORE UPDATE ON scribble_rooms
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();