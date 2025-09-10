import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface OTPRequest {
  phone: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const { phone }: OTPRequest = await req.json();
    
    // Format phone number to E.164 format
    const formattedPhone = phone.startsWith('+91') ? phone : `+91${phone}`;
    
    console.log('Sending OTP to:', formattedPhone);

    // Generate 6-digit OTP
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Set expiration time (5 minutes from now)
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000).toISOString();

    // Clean up expired OTPs for this phone
    await supabaseClient
      .from('otp_codes')
      .delete()
      .eq('phone', formattedPhone)
      .lt('expires_at', new Date().toISOString());

    // Store OTP in database
    const { error: insertError } = await supabaseClient
      .from('otp_codes')
      .insert({
        phone: formattedPhone,
        otp_code: otpCode,
        expires_at: expiresAt,
        verified: false
      });

    if (insertError) {
      throw insertError;
    }

    // Send SMS (using a demo SMS service or log for testing)
    const smsApiKey = Deno.env.get('SMS_API_KEY');
    
    if (smsApiKey && smsApiKey !== 'demo') {
      // Real SMS sending logic would go here
      // For now, we'll just log the OTP
      console.log(`SMS sent to ${formattedPhone}: Your OTP is ${otpCode}`);
    } else {
      // Demo mode - just log the OTP
      console.log(`[DEMO MODE] OTP for ${formattedPhone}: ${otpCode}`);
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: `OTP sent to ${formattedPhone}`,
        // In demo mode, return the OTP (remove this in production)
        ...((!smsApiKey || smsApiKey === 'demo') && { debug_otp: otpCode })
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );

  } catch (error) {
    console.error('OTP send error:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || "Failed to send OTP" 
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});