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

    const { phone, otp } = await req.json();

    if (!phone || !otp) {
      throw new Error("Phone number and OTP are required");
    }

    // Format phone number
    const formattedPhone = phone.startsWith('+91') ? phone : `+91${phone}`;
    
    console.log('Verifying OTP for:', formattedPhone);

    // Check OTP validity
    const { data: otpData, error: otpError } = await supabaseClient
      .from('otp_codes')
      .select('*')
      .eq('phone', formattedPhone)
      .eq('otp_code', otp)
      .eq('verified', false)
      .gt('expires_at', new Date().toISOString())
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (otpError || !otpData) {
      console.error('OTP verification failed:', otpError);
      throw new Error("Invalid or expired OTP");
    }

    // Mark OTP as verified
    await supabaseClient
      .from('otp_codes')
      .update({ verified: true })
      .eq('id', otpData.id);

    // Create or get existing user by phone
    let user;
    
    // First check if user exists in auth by phone
    const { data: authUsers } = await supabaseClient.auth.admin.listUsers();
    const existingAuthUser = authUsers.users.find(u => u.phone === formattedPhone);
    
    if (existingAuthUser) {
      console.log('Found existing user in auth:', existingAuthUser.id);
      user = existingAuthUser;
      
      // Ensure profile exists for this user
      const { data: existingProfile } = await supabaseClient
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .maybeSingle();
        
      if (!existingProfile) {
        // Create profile for existing auth user
        const { error: profileError } = await supabaseClient
          .from('profiles')
          .insert({
            id: user.id,
            phone: formattedPhone,
          });

        if (profileError && profileError.code !== '23505') { // Ignore duplicate key error
          console.error('Profile creation error:', profileError);
        }
      }
    } else {
      // Create new user in auth table
      console.log('Creating new user for phone:', formattedPhone);
      const { data: newUser, error: createError } = await supabaseClient.auth.admin.createUser({
        phone: formattedPhone,
        phone_confirm: true,
        user_metadata: { phone: formattedPhone }
      });

      if (createError) {
        console.error('User creation error:', createError);
        throw createError;
      }

      user = newUser.user;

      // Create profile for the new user
      const { error: profileError } = await supabaseClient
        .from('profiles')
        .insert({
          id: user.id,
          phone: formattedPhone,
        });

      if (profileError && profileError.code !== '23505') { // Ignore duplicate key error  
        console.error('Profile creation error:', profileError);
      }
    }

    // Generate session token
    const { data: tokenData, error: tokenError } = await supabaseClient.auth.admin.generateLink({
      type: 'magiclink',
      email: `${user.id}@temp.com`,
    });

    if (tokenError) {
      console.error('Token generation error:', tokenError);
      throw tokenError;
    }

    // Clean up expired OTPs
    await supabaseClient
      .from('otp_codes')
      .delete()
      .lt('expires_at', new Date().toISOString());

    return new Response(
      JSON.stringify({
        success: true,
        user: {
          id: user.id,
          phone: formattedPhone,
        },
        access_token: tokenData.properties?.access_token,
        refresh_token: tokenData.properties?.refresh_token,
        message: "OTP verified successfully"
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );

  } catch (error) {
    console.error('Verify OTP error:', error);
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