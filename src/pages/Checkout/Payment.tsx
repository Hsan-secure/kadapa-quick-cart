import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export default function CheckoutPayment() {
  const navigate = useNavigate();
  const { state, getCartTotal, createOrder } = useCart();
  const { user } = useAuth();
  const [paymentMethod, setPaymentMethod] = useState<'COD' | 'PhonePe'>('COD');
  const [isProcessing, setIsProcessing] = useState(false);

  const selectedAddressId = sessionStorage.getItem('selectedAddressId');
  const selectedAddress = state.addresses.find(addr => addr.id === selectedAddressId);
  const { subtotal, discount, deliveryFee, gst, total } = getCartTotal();

  if (!selectedAddress || state.items.length === 0) {
    navigate('/checkout/address');
    return null;
  }

  const handlePayment = async () => {
    if (!user) {
      toast({
        title: "Please login first",
        description: "You need to be logged in to place an order",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    try {
      if (paymentMethod === 'PhonePe') {
        // Create PhonePe payment
        const orderId = `QD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
        
        const { data, error } = await supabase.functions.invoke('create-phonepe-payment', {
          body: {
            amount: Math.round(total * 100), // Convert to paise
            orderId: orderId,
            items: state.items,
            address: selectedAddress,
          }
        });

        if (error) throw error;

        // Store transaction info for callback
        sessionStorage.setItem('pendingOrderId', orderId);
        sessionStorage.setItem('pendingTransactionId', data.transactionId);
        
        toast({
          title: "Redirecting to PhonePe...",
          description: "You will be redirected to complete the payment",
        });

        // Redirect to PhonePe payment URL
        setTimeout(() => {
          window.location.href = data.paymentUrl;
        }, 1000);

      } else {
        // COD - direct order creation
        completeOrder('COD');
      }
    } catch (error: any) {
      console.error('Payment error:', error);
      toast({
        title: "Payment Error",
        description: error.message || "Failed to process payment",
        variant: "destructive",
      });
      setIsProcessing(false);
    }
  };


  const completeOrder = (method: 'COD' | 'PhonePe', paymentRef?: string) => {
    const etaMinutes = Math.floor(Math.random() * 15) + 20; // 20-35 minutes
    
    const order = createOrder({
      items: state.items,
      subtotal,
      discount,
      deliveryFee,
      gst,
      total,
      address: selectedAddress,
      payment: {
        method,
        ref: paymentRef,
      },
      status: 'PLACED',
      etaMinutes,
    });

    // Clear the session storage
    sessionStorage.removeItem('selectedAddressId');
    
    toast({
      title: "Order placed successfully!",
      description: `Your order will be delivered in ${etaMinutes} minutes`,
    });

    navigate(`/order/${order.id}`);
  };


  return (
    <div className="min-h-screen bg-muted/30 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="flex items-center space-x-4 mb-8">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/checkout/address')}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Payment</h1>
              <p className="text-muted-foreground">Choose your payment method</p>
            </div>
          </div>

          {/* Delivery Address Summary */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Delivery Address</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 rounded-full bg-success mt-2"></div>
                <div>
                  <p className="font-medium">{selectedAddress.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {selectedAddress.line1}, {selectedAddress.line2 && `${selectedAddress.line2}, `}
                    {selectedAddress.area}, {selectedAddress.city} - {selectedAddress.pincode}
                  </p>
                  <Badge variant="secondary" className="mt-1">
                    {selectedAddress.phone}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Order Summary */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span>Items ({state.items.length})</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              
              {discount > 0 && (
                <div className="flex justify-between text-success">
                  <span>Discount</span>
                  <span>-₹{discount.toFixed(2)}</span>
                </div>
              )}
              
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span>
                  {deliveryFee > 0 ? `₹${deliveryFee}` : (
                    <span className="text-success">FREE</span>
                  )}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span>GST (5%)</span>
                <span>₹{gst.toFixed(2)}</span>
              </div>
              
              <Separator />
              
              <div className="flex justify-between font-bold text-lg">
                <span>Total Amount</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>

          {/* Payment Methods */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup value={paymentMethod} onValueChange={(value) => setPaymentMethod(value as 'COD' | 'PhonePe')}>
                <div className="space-y-4">
                  {/* Cash on Delivery */}
                  <div className="flex items-start space-x-3">
                    <RadioGroupItem value="COD" id="cod" />
                    <label htmlFor="cod" className="flex-1 cursor-pointer">
                      <div className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="flex items-center space-x-3">
                          <CreditCard className="h-5 w-5 text-primary" />
                          <div>
                            <p className="font-medium">Cash on Delivery</p>
                            <p className="text-sm text-muted-foreground">
                              Pay with cash when your order arrives
                            </p>
                          </div>
                        </div>
                      </div>
                    </label>
                  </div>

                  {/* PhonePe */}
                  <div className="flex items-start space-x-3">
                    <RadioGroupItem value="PhonePe" id="phonepe" />
                    <label htmlFor="phonepe" className="flex-1 cursor-pointer">
                      <div className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="flex items-center space-x-3">
                          <Smartphone className="h-5 w-5 text-primary" />
                          <div>
                            <p className="font-medium">PhonePe UPI</p>
                            <p className="text-sm text-muted-foreground">
                              Pay instantly using UPI
                            </p>
                          </div>
                          <Badge className="bg-success text-success-foreground">
                            Instant
                          </Badge>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Place Order Button */}
          <Button
            onClick={handlePayment}
            disabled={isProcessing}
            className="w-full btn-hero h-14 text-lg"
          >
            {isProcessing ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Processing...</span>
              </div>
            ) : (
              `Place Order • ₹${total.toFixed(2)}`
            )}
          </Button>

          <p className="text-xs text-center text-muted-foreground mt-4">
            By placing this order, you agree to our Terms & Conditions and Privacy Policy
          </p>
        </div>
      </div>

    </div>
  );
}