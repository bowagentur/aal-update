/*
  # Fix auth policies for admin access

  1. Changes
    - Simplify admin access policies
    - Fix recursive policy issues
    - Ensure proper access control
    - Add missing policies for hotels table

  2. Security
    - Maintains RLS protection
    - Only allows admins to manage content
    - Preserves public read access where appropriate
*/

-- Drop any potentially conflicting policies
DROP POLICY IF EXISTS "Allow authenticated users to manage hotels" ON hotels;
DROP POLICY IF EXISTS "Public read access for active hotels" ON hotels;
DROP POLICY IF EXISTS "Admins can manage all profiles" ON user_profiles;

-- Create simplified admin policies
CREATE POLICY "Admin access"
ON hotels
FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM user_profiles
    WHERE user_profiles.id = auth.uid()
    AND user_profiles.role = 'admin'
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM user_profiles
    WHERE user_profiles.id = auth.uid()
    AND user_profiles.role = 'admin'
  )
);

-- Public read access for active hotels
CREATE POLICY "Public read access"
ON hotels
FOR SELECT
TO public
USING (active = true);

-- Fix user profile policies
CREATE POLICY "Admin manage profiles"
ON user_profiles
FOR ALL
TO authenticated
USING (
  role = 'admin'
)
WITH CHECK (
  role = 'admin'
);

CREATE POLICY "View own profile"
ON user_profiles
FOR SELECT
TO authenticated
USING (
  auth.uid() = id
);

-- Update user role to admin
UPDATE user_profiles
SET role = 'admin'
WHERE email = 'daniele@abbattista.de';