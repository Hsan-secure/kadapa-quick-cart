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

    // Send SMS using Twilio
    const twilioAccountSid = Deno.env.get('TWILIO_ACCOUNT_SID');
    const twilioAuthToken = Deno.env.get('TWILIO_AUTH_TOKEN');
    const twilioPhoneNumber = Deno.env.get('TWILIO_PHONE_NUMBER');
    
    if (twilioAccountSid && twilioAuthToken && twilioPhoneNumber) {
      // Send real SMS using Twilio
      const smsMessage = `Your QuickDelivery OTP is: ${otpCode}. Valid for 5 minutes.`;
      
      console.log('Sending SMS via Twilio:', { phone: formattedPhone, message: smsMessage });
      
      const twilioUrl = `https://api.twilio.com/2010-04-01/Accounts/${twilioAccountSid}/Messages.json`;
      const credentials = btoa(`${twilioAccountSid}:${twilioAuthToken}`);
      
      const smsResponse = await fetch(twilioUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${credentials}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          From: twilioPhoneNumber,
          To: formattedPhone,
          Body: smsMessage,
        }).toString()
      });
      
      if (!smsResponse.ok) {
        const errorData = await smsResponse.text();
        console.error('Twilio SMS error:', errorData);
        throw new Error('Failed to send SMS via Twilio');
      }
      
      const smsData = await smsResponse.json();
      console.log('SMS sent successfully:', smsData.sid);
      
      return new Response(
        JSON.stringify({
          success: true,
          message: `OTP sent to ${formattedPhone}`,
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        }
      );
    } else {
      // Demo mode fallback
      console.log(`Demo mode - OTP for ${formattedPhone}: ${otpCode}`);
      
      return new Response(
        JSON.stringify({
          success: true,
          message: `OTP sent to ${formattedPhone}`,
          // In demo mode, return the OTP for testing
          otp: otpCode
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        }
      );
    }

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