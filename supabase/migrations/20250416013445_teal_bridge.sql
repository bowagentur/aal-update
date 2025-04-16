/*
  # Add admin user
  
  1. Create admin user
    - Email: daniele@abbattista.de
    - Role: admin
    - Active: true
*/

-- Insert admin user into auth.users
INSERT INTO auth.users (
  id,
  instance_id,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  role,
  aud,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  gen_random_uuid(),
  '00000000-0000-0000-0000-000000000000',
  'daniele@abbattista.de',
  crypt('mkvli1971', gen_salt('bf')),
  now(),
  '{"provider":"email","providers":["email"]}',
  '{}',
  now(),
  now(),
  'authenticated',
  'authenticated',
  '',
  '',
  '',
  ''
);

-- Set user role to admin in user_profiles
UPDATE user_profiles
SET role = 'admin'
WHERE email = 'daniele@abbattista.de';