import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

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

    const { phone } = await req.json();

    if (!phone) {
      throw new Error("Phone number is required");
    }

    // Format phone number to E.164 format
    const formattedPhone = phone.startsWith('+91') ? phone : `+91${phone}`;
    
    console.log('Processing OTP request for:', formattedPhone);

    // Generate 6-digit OTP
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    // Clean up old OTPs for this phone number
    await supabaseClient
      .from('otp_codes')
      .delete()
      .eq('phone', formattedPhone);

    // Store OTP in database
    const { error: otpError } = await supabaseClient
      .from('otp_codes')
      .insert({
        phone: formattedPhone,
        otp_code: otpCode,
        expires_at: expiresAt.toISOString(),
      });

    if (otpError) {
      console.error('Database error:', otpError);
      throw otpError;
    }

    // Send SMS using your SMS provider
    const smsApiKey = Deno.env.get('SMS_API_KEY');
    
    if (smsApiKey) {
      // Example: Replace with your actual SMS provider API
      // This is a sample implementation - you'll need to adapt for your SMS provider
      const smsMessage = `Your QuickDelivery OTP is: ${otpCode}. Valid for 5 minutes.`;
      
      console.log('Sending SMS:', { phone: formattedPhone, message: smsMessage });
      
      // For demo purposes, we'll log the OTP instead of sending SMS
      // In production, replace this with actual SMS API call
      console.log(`OTP for ${formattedPhone}: ${otpCode}`);
      
      // Example SMS API call (uncomment and modify for your provider):
      /*
      const smsResponse = await fetch('https://your-sms-provider.com/send', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${smsApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: formattedPhone,
          message: smsMessage,
        })
      });
      
      if (!smsResponse.ok) {
        throw new Error('Failed to send SMS');
      }
      */
    } else {
      console.log(`Demo mode - OTP for ${formattedPhone}: ${otpCode}`);
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: `OTP sent to ${formattedPhone}`,
        // In demo mode, return the OTP for testing
        ...(smsApiKey ? {} : { otp: otpCode })
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );

  } catch (error) {
    console.error('Send OTP error:', error);
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