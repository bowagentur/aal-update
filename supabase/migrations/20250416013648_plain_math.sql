/*
  # Fix admin permissions for content management

  1. Changes
    - Add policies to allow admins to manage all content
    - Fix recursive policy issues
    - Ensure proper access control for team, awards, jobs, and contacts tables

  2. Security
    - Maintains RLS protection
    - Only allows admins to manage content
    - Preserves public read access where appropriate
*/

-- Drop any potentially conflicting policies
DROP POLICY IF EXISTS "Authenticated users can manage" ON team_members;
DROP POLICY IF EXISTS "Authenticated users can manage" ON awards;
DROP POLICY IF EXISTS "Authenticated users can manage" ON jobs;
DROP POLICY IF EXISTS "Authenticated users can manage" ON contacts;

-- Create new admin-only management policies
CREATE POLICY "Admins can manage team members"
ON team_members
FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM user_profiles
    WHERE id = auth.uid()
    AND role = 'admin'
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM user_profiles
    WHERE id = auth.uid()
    AND role = 'admin'
  )
);

CREATE POLICY "Admins can manage awards"
ON awards
FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM user_profiles
    WHERE id = auth.uid()
    AND role = 'admin'
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM user_profiles
    WHERE id = auth.uid()
    AND role = 'admin'
  )
);

CREATE POLICY "Admins can manage jobs"
ON jobs
FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM user_profiles
    WHERE id = auth.uid()
    AND role = 'admin'
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM user_profiles
    WHERE id = auth.uid()
    AND role = 'admin'
  )
);

CREATE POLICY "Admins can manage contacts"
ON contacts
FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM user_profiles
    WHERE id = auth.uid()
    AND role = 'admin'
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM user_profiles
    WHERE id = auth.uid()
    AND role = 'admin'
  )
);

-- Ensure public read access policies exist
CREATE POLICY "Public read access for team members"
ON team_members
FOR SELECT
TO public
USING (true);

CREATE POLICY "Public read access for awards"
ON awards
FOR SELECT
TO public
USING (true);

CREATE POLICY "Public read access for active jobs"
ON jobs
FOR SELECT
TO public
USING (active = true);

-- Allow public to create contacts
CREATE POLICY "Public can create contacts"
ON contacts
FOR INSERT
TO public
WITH CHECK (true);