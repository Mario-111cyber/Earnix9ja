-- Add total_referral_earnings column to profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS total_referral_earnings DECIMAL(12, 2) DEFAULT 0.00;

-- Enable RLS if not already enabled
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
