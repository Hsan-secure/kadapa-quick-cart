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
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Since we're using Firebase auth, we'll create orders without user ID validation
    // The order will be created without user_id for now
    console.log('Creating payment request for order');

    const { amount, orderId, items, address }: PaymentRequest = await req.json();

    // For now, skip database order creation since we're using Firebase auth
    // The order will be created on the frontend after successful payment
    console.log('Order details:', { orderId, amount, items: items.length, address });

    // Order creation skipped for Firebase auth

    // Generate proper UPI deep link for PhonePe
    const merchantTransactionId = `TXN_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
    const upiId = "6302829644@ybl";
    const merchantName = "Quick Delivery";
    
    // Create UPI deep link that works across payment apps
    const amountInRupees = (amount / 100).toFixed(2);
    
    // Generate UPI payment URL that will work with PhonePe and other UPI apps
    const upiUrl = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(merchantName)}&am=${amountInRupees}&cu=INR&tn=${encodeURIComponent(`Order ${orderId}`)}`;
    
    // For web, create a payment simulation page
    const origin = req.headers.get("origin") || "https://b5cb5cf0-d93c-4bc7-ace6-cc6df64f1af9.sandbox.lovable.dev";
    const paymentSimulationUrl = `${origin}/payment-simulation?amount=${amountInRupees}&upi=${upiId}&orderId=${orderId}&transactionId=${merchantTransactionId}`;
    
    // Skip transaction creation for now with Firebase auth
    console.log('Transaction would be created:', {
      order_id: orderId,
      transaction_id: merchantTransactionId,
      amount: amount,
      status: 'PENDING',
      payment_method: 'PhonePe'
    });

    return new Response(
      JSON.stringify({
        success: true,
        paymentUrl: paymentSimulationUrl,
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