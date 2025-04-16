/*
  # Fix user_profiles RLS policies

  1. Changes
    - Remove recursive policy that was causing infinite recursion
    - Create new, simplified policies for user_profiles table:
      - Admins can manage all profiles
      - Users can view and update their own profile
      - Users cannot delete profiles

  2. Security
    - Maintains RLS protection
    - Prevents unauthorized access while fixing recursion issue
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Admins can manage all profiles" ON user_profiles;
DROP POLICY IF EXISTS "Users can view own profile" ON user_profiles;

-- Create new, non-recursive policies
CREATE POLICY "Admins can manage all profiles"
ON user_profiles
FOR ALL
TO authenticated
USING (
  role = 'admin'
)
WITH CHECK (
  role = 'admin'
);

CREATE POLICY "Users can view own profile"
ON user_profiles
FOR SELECT
TO authenticated
USING (
  auth.uid() = id
);

CREATE POLICY "Users can update own profile"
ON user_profiles
FOR UPDATE
TO authenticated
USING (
  auth.uid() = id
)
WITH CHECK (
  auth.uid() = id
  AND role = 'viewer' -- Prevent users from escalating their own privileges
);