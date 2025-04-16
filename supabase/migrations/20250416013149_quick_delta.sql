/*
  # Add Insert Policy for Hotels Table

  1. Changes
    - Add RLS policy to allow authenticated users to insert new hotels
    
  2. Security
    - Only authenticated users can create new hotels
    - Maintains existing policies for other operations
*/

CREATE POLICY "Allow authenticated users to insert hotels"
ON public.hotels
FOR INSERT
TO authenticated
WITH CHECK (true);