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
      console.error('No phone number provided');
      throw new Error("Phone number is required");
    }

    // Format phone number to E.164 format
    const formattedPhone = phone.startsWith('+91') ? phone : `+91${phone}`;
    
    console.log('Processing OTP request for:', formattedPhone);

    // Generate 6-digit OTP
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    console.log('Generated OTP:', otpCode);

    // Clean up old OTPs for this phone number
    try {
      const { error: deleteError } = await supabaseClient
        .from('otp_codes')
        .delete()
        .eq('phone', formattedPhone);
      
      if (deleteError) {
        console.log('Delete error (non-critical):', deleteError);
      }
    } catch (deleteErr) {
      console.log('Delete operation failed (non-critical):', deleteErr);
    }

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
      throw new Error('Failed to store OTP in database');
    }

    console.log('OTP stored in database successfully');

    // Send SMS using Twilio
    const twilioAccountSid = Deno.env.get('TWILIO_ACCOUNT_SID');
    const twilioAuthToken = Deno.env.get('TWILIO_AUTH_TOKEN');
    const twilioPhoneNumber = Deno.env.get('TWILIO_PHONE_NUMBER');
    
    console.log('Twilio credentials check:', {
      hasSid: !!twilioAccountSid,
      hasToken: !!twilioAuthToken,
      hasPhone: !!twilioPhoneNumber
    });
    
    if (twilioAccountSid && twilioAuthToken && twilioPhoneNumber) {
      try {
        // Send real SMS using Twilio
        const smsMessage = `Your QuickDelivery OTP is: ${otpCode}. Valid for 5 minutes.`;
        
        console.log('Attempting to send SMS via Twilio to:', formattedPhone);
        
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
        
        const responseText = await smsResponse.text();
        console.log('Twilio response status:', smsResponse.status);
        console.log('Twilio response:', responseText);
        
        if (!smsResponse.ok) {
          console.error('Twilio API error:', responseText);
          // Fall back to demo mode if Twilio fails
          console.log('Falling back to demo mode due to Twilio error');
          
          return new Response(
            JSON.stringify({
              success: true,
              message: `OTP sent to ${formattedPhone} (Demo mode - Twilio failed)`,
              otp: otpCode
            }),
            {
              headers: { ...corsHeaders, "Content-Type": "application/json" },
              status: 200,
            }
          );
        }
        
        const smsData = JSON.parse(responseText);
        console.log('SMS sent successfully via Twilio:', smsData.sid);
        
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
        
      } catch (twilioError) {
        console.error('Twilio error:', twilioError);
        // Fall back to demo mode if Twilio fails
        console.log('Falling back to demo mode due to Twilio exception');
        
        return new Response(
          JSON.stringify({
            success: true,
            message: `OTP sent to ${formattedPhone} (Demo mode - Twilio error)`,
            otp: otpCode
          }),
          {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 200,
          }
        );
      }
    } else {
      // Demo mode fallback
      console.log(`Demo mode - OTP for ${formattedPhone}: ${otpCode}`);
      
      return new Response(
        JSON.stringify({
          success: true,
          message: `OTP sent to ${formattedPhone} (Demo mode)`,
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