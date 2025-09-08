import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      {
        auth: { persistSession: false },
        global: {
          headers: {
            Authorization: `Bearer ${Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")}`,
          },
        },
      }
    );

    const { transactionId, orderId } = await req.json();

    // In a real implementation, you would call PhonePe's status check API
    // For demo purposes, we'll simulate a successful payment
    const paymentStatus = Math.random() > 0.1 ? 'SUCCESS' : 'FAILED'; // 90% success rate
    
    // Update transaction status
    const { error: transactionError } = await supabaseClient
      .from('transactions')
      .update({ 
        status: paymentStatus 
      })
      .eq('transaction_id', transactionId);

    if (transactionError) {
      throw transactionError;
    }

    // Update order status
    const newOrderStatus = paymentStatus === 'SUCCESS' ? 'PLACED' : 'CANCELLED';
    const { error: orderError } = await supabaseClient
      .from('orders')
      .update({ 
        status: newOrderStatus,
        payment_ref: transactionId 
      })
      .eq('id', orderId);

    if (orderError) {
      throw orderError;
    }

    return new Response(
      JSON.stringify({
        success: true,
        status: paymentStatus,
        transactionId: transactionId
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );

  } catch (error) {
    console.error('Payment verification error:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || "Failed to verify payment" 
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});