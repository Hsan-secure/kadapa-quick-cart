-- Fix function search path security issue
CREATE OR REPLACE FUNCTION public.cleanup_expired_otps()
RETURNS void
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  DELETE FROM public.otp_codes 
  WHERE expires_at < now() - interval '1 hour';
$$;