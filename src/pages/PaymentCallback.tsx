import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, X, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export default function PaymentCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'checking' | 'success' | 'failed'>('checking');
  const [orderId, setOrderId] = useState<string>('');

  useEffect(() => {
    const checkPaymentStatus = async () => {
      try {
        const transactionId = searchParams.get('transactionId');
        const orderIdParam = searchParams.get('orderId');
        
        if (!transactionId || !orderIdParam) {
          setStatus('failed');
          return;
        }

        setOrderId(orderIdParam);

        // Verify payment status with backend
        const { data, error } = await supabase.functions.invoke('verify-phonepe-payment', {
          body: {
            transactionId: transactionId,
            orderId: orderIdParam,
          }
        });

        if (error) throw error;

        if (data.status === 'SUCCESS') {
          setStatus('success');
          toast({
            title: "Payment Successful!",
            description: "Your order has been placed successfully.",
          });
        } else {
          setStatus('failed');
          toast({
            title: "Payment Failed",
            description: "There was an issue with your payment.",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error('Payment verification error:', error);
        setStatus('failed');
        toast({
          title: "Payment Verification Failed",
          description: "Could not verify payment status.",
          variant: "destructive",
        });
      }
    };

    checkPaymentStatus();
  }, [searchParams]);

  const handleContinue = () => {
    if (status === 'success' && orderId) {
      navigate(`/order/${orderId}`);
    } else {
      navigate('/cart');
    }
  };

  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
            {status === 'checking' && (
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
            )}
            {status === 'success' && (
              <div className="w-12 h-12 bg-success rounded-full flex items-center justify-center">
                <Check className="h-6 w-6 text-white" />
              </div>
            )}
            {status === 'failed' && (
              <div className="w-12 h-12 bg-destructive rounded-full flex items-center justify-center">
                <X className="h-6 w-6 text-white" />
              </div>
            )}
          </div>
          
          <CardTitle>
            {status === 'checking' && 'Verifying Payment...'}
            {status === 'success' && 'Payment Successful!'}
            {status === 'failed' && 'Payment Failed'}
          </CardTitle>
          
          <CardDescription>
            {status === 'checking' && 'Please wait while we verify your payment with PhonePe'}
            {status === 'success' && 'Your order has been placed successfully and is being prepared'}
            {status === 'failed' && 'There was an issue processing your payment. Please try again.'}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="text-center">
          {status !== 'checking' && (
            <Button onClick={handleContinue} className="w-full">
              {status === 'success' ? 'Track Order' : 'Back to Cart'}
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}