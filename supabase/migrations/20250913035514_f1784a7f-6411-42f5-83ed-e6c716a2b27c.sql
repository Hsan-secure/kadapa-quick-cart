-- Fix security vulnerability: Remove public access to OTP codes table
-- Only system functions (using service role) should access OTP codes

-- Drop the existing overly permissive policies
DROP POLICY IF EXISTS "OTP codes can be selected by anyone" ON public.otp_codes;
DROP POLICY IF EXISTS "OTP codes can be updated by anyone" ON public.otp_codes;
DROP POLICY IF EXISTS "OTP codes can be inserted by anyone" ON public.otp_codes;

-- Create secure policies that don't allow public access
-- Edge functions will use service role key which bypasses RLS
-- No public access needed since only system functions should handle OTP codes

-- Allow service role to do everything (this is implicit but documenting the approach)
-- Regular users should not have any direct access to OTP codes