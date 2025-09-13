import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, Smartphone } from 'lucide-react';

export function PaymentSimulation() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes timeout

  const amount = searchParams.get('amount');
  const upi = searchParams.get('upi');
  const orderId = searchParams.get('orderId');
  const transactionId = searchParams.get('transactionId');

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Timeout - redirect to failure
          navigate(`/payment-callback?transactionId=${transactionId}&orderId=${orderId}&status=FAILURE`);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate, transactionId, orderId]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePaymentSuccess = () => {
    setStep(3);
    setTimeout(() => {
      navigate(`/payment-callback?transactionId=${transactionId}&orderId=${orderId}&status=SUCCESS`);
    }, 2000);
  };

  const handlePaymentFailure = () => {
    navigate(`/payment-callback?transactionId=${transactionId}&orderId=${orderId}&status=FAILURE`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Smartphone className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl">UPI Payment</CardTitle>
          <Badge variant="outline" className="w-fit mx-auto">
            {formatTime(timeLeft)} remaining
          </Badge>
        </CardHeader>

        <CardContent className="space-y-6">
          {step === 1 && (
            <>
              <div className="text-center space-y-4">
                <div className="bg-gradient-to-r from-green-100 to-green-50 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">Pay to</p>
                  <p className="font-semibold text-lg">{upi}</p>
                </div>

                <div className="bg-gradient-to-r from-blue-100 to-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">Amount</p>
                  <p className="font-bold text-2xl text-blue-600">₹{amount}</p>
                </div>

                <div className="text-sm text-muted-foreground">
                  <p>Order ID: {orderId}</p>
                  <p>Transaction ID: {transactionId}</p>
                </div>
              </div>

              <div className="space-y-3">
                <Button 
                  onClick={() => setStep(2)} 
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                  size="lg"
                >
                  Open UPI App
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={handlePaymentFailure}
                  className="w-full"
                  size="lg"
                >
                  Cancel Payment
                </Button>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div className="text-center space-y-4">
                <div className="animate-pulse">
                  <Clock className="w-12 h-12 text-orange-500 mx-auto mb-2" />
                  <p className="font-semibold">Waiting for payment confirmation</p>
                  <p className="text-sm text-muted-foreground">
                    Complete the payment in your UPI app
                  </p>
                </div>

                <div className="bg-orange-50 p-4 rounded-lg">
                  <p className="text-sm">
                    Payment of <strong>₹{amount}</strong> to <strong>{upi}</strong>
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <Button 
                  onClick={handlePaymentSuccess}
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                  size="lg"
                >
                  Payment Completed
                </Button>
                
                <Button 
                  variant="destructive" 
                  onClick={handlePaymentFailure}
                  className="w-full"
                  size="lg"
                >
                  Payment Failed
                </Button>
              </div>
            </>
          )}

          {step === 3 && (
            <div className="text-center space-y-4">
              <div className="animate-bounce">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <p className="font-semibold text-lg text-green-600">Payment Successful!</p>
                <p className="text-sm text-muted-foreground">
                  Redirecting to order tracking...
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}