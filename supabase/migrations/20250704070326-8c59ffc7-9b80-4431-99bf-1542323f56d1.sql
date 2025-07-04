
-- Add social media links and occupation to profiles table
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS occupation TEXT DEFAULT 'Student';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS instagram_url TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS snapchat_url TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS music_url TEXT;
