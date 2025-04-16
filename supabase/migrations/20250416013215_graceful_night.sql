/*
  # Fix RLS policies for hotels table

  1. Changes
    - Drop existing RLS policies for hotels table
    - Create new comprehensive RLS policies that properly handle all operations
    
  2. Security
    - Enable RLS on hotels table (if not already enabled)
    - Add policies for:
      - SELECT: Public users can read active hotels
      - ALL: Authenticated users can manage hotels
*/

-- First ensure RLS is enabled
ALTER TABLE hotels ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Allow authenticated users to insert hotels" ON hotels;
DROP POLICY IF EXISTS "Allow authenticated users to manage hotels" ON hotels;
DROP POLICY IF EXISTS "Allow public read access" ON hotels;

-- Create new policies
CREATE POLICY "Allow authenticated users to manage hotels"
ON hotels
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Public read access for active hotels"
ON hotels
FOR SELECT
TO public
USING (active = true);