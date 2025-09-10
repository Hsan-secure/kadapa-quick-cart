-- Create OTP storage table
CREATE TABLE public.otp_codes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  phone TEXT NOT NULL,
  otp_code TEXT NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  verified BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.otp_codes ENABLE ROW LEVEL SECURITY;

-- Create policies for OTP codes
CREATE POLICY "OTP codes can be inserted by anyone" 
ON public.otp_codes 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "OTP codes can be selected by anyone" 
ON public.otp_codes 
FOR SELECT 
USING (true);

CREATE POLICY "OTP codes can be updated by anyone" 
ON public.otp_codes 
FOR UPDATE 
USING (true);

-- Create index for efficient queries
CREATE INDEX idx_otp_codes_phone_expires ON public.otp_codes(phone, expires_at);

-- Create function to clean up expired OTPs
CREATE OR REPLACE FUNCTION public.cleanup_expired_otps()
RETURNS void
LANGUAGE sql
SECURITY DEFINER
AS $$
  DELETE FROM public.otp_codes 
  WHERE expires_at < now() - interval '1 hour';
$$;