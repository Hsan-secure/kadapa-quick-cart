import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface PaymentRequest {
  amount: number;
  orderId: string;
  items: any[];
  address: any;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    // Get authenticated user
    const authHeader = req.headers.get("Authorization")!;
    const token = authHeader.replace("Bearer ", "");
    const { data } = await supabaseClient.auth.getUser(token);
    const user = data.user;
    
    if (!user) {
      throw new Error("User not authenticated");
    }

    const { amount, orderId, items, address }: PaymentRequest = await req.json();

    // Create order in database
    const { data: order, error: orderError } = await supabaseClient
      .from('orders')
      .insert({
        id: orderId,
        user_id: user.id,
        items: items,
        subtotal: amount * 0.9, // Approximate calculation
        discount: 0,
        delivery_fee: amount > 39900 ? 0 : 1500, // 399 INR in paise
        gst: Math.round(amount * 0.05),
        total: amount,
        address: address,
        payment_method: 'PhonePe',
        status: 'PENDING',
        eta_minutes: Math.floor(Math.random() * 15) + 20,
      })
      .select()
      .single();

    if (orderError) {
      throw orderError;
    }

    // Generate PhonePe payment URL (simulation)
    const merchantId = "QUICKDELIVERY";
    const merchantTransactionId = `TXN_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
    
    // In a real PhonePe implementation, you would:
    // 1. Create the payment request payload
    // 2. Base64 encode it
    // 3. Generate checksum with salt + payload + salt
    // 4. Make API call to PhonePe payment gateway
    
    // For now, we'll redirect to a simulated PhonePe page
    const redirectUrl = `${req.headers.get("origin")}/payment-callback?transactionId=${merchantTransactionId}&orderId=${orderId}`;
    const phonepeUrl = `https://payments.phonepe.com/v1/debit?amount=${(amount/100).toFixed(2)}&currency=INR&merchantId=${merchantId}&transactionId=${merchantTransactionId}&redirectUrl=${encodeURIComponent(redirectUrl)}`;
    
    
    // Create transaction record
    const { error: transactionError } = await supabaseClient
      .from('transactions')
      .insert({
        order_id: orderId,
        transaction_id: merchantTransactionId,
        amount: amount,
        status: 'PENDING',
        payment_method: 'PhonePe'
      });

    if (transactionError) {
      console.error('Transaction creation error:', transactionError);
    }

    return new Response(
      JSON.stringify({
        success: true,
        paymentUrl: phonepeUrl,
        transactionId: merchantTransactionId,
        orderId: orderId
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );

  } catch (error) {
    console.error('Payment creation error:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || "Failed to create payment" 
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});