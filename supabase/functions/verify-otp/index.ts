import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface VerifyOTPRequest {
  phone: string;
  otp: string;
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

    const { phone, otp }: VerifyOTPRequest = await req.json();
    
    // Format phone number
    const formattedPhone = phone.startsWith('+91') ? phone : `+91${phone}`;
    
    console.log('Verifying OTP for:', formattedPhone);

    // Find valid OTP
    const { data: otpRecord, error: otpError } = await supabaseClient
      .from('otp_codes')
      .select('*')
      .eq('phone', formattedPhone)
      .eq('otp_code', otp)
      .eq('verified', false)
      .gt('expires_at', new Date().toISOString())
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (otpError || !otpRecord) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Invalid or expired OTP" 
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        }
      );
    }

    // Mark OTP as verified
    await supabaseClient
      .from('otp_codes')
      .update({ verified: true })
      .eq('id', otpRecord.id);

    // Check if user already exists in profiles
    const { data: existingProfile } = await supabaseClient
      .from('profiles')
      .select('*')
      .eq('phone', formattedPhone)
      .single();

    let userId: string;
    
    if (existingProfile) {
      // User exists, use existing ID
      userId = existingProfile.id;
    } else {
      // Create new user via Supabase Auth
      const { data: authData, error: authError } = await supabaseClient.auth.admin.createUser({
        phone: formattedPhone,
        phone_confirmed_at: new Date().toISOString(),
        user_metadata: { phone: formattedPhone }
      });

      if (authError || !authData.user) {
        throw new Error('Failed to create user account');
      }

      userId = authData.user.id;

      // Create profile
      await supabaseClient
        .from('profiles')
        .insert({
          id: userId,
          phone: formattedPhone
        });
    }

    // Generate session token
    const { data: sessionData, error: sessionError } = await supabaseClient.auth.admin.generateLink({
      type: 'magiclink',
      email: `user_${userId}@temp.com`, // Temp email for phone-only auth
      options: {
        redirectTo: `${req.headers.get("origin")}/`
      }
    });

    if (sessionError) {
      throw sessionError;
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "OTP verified successfully",
        user: {
          id: userId,
          phone: formattedPhone
        },
        session: sessionData
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );

  } catch (error) {
    console.error('OTP verification error:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || "Failed to verify OTP" 
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});