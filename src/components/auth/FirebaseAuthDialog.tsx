import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/AuthContext';
import { Loader2, Phone, Shield, AlertCircle } from 'lucide-react';
import { ConfirmationResult } from 'firebase/auth';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface FirebaseAuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function FirebaseAuthDialog({ open, onOpenChange }: FirebaseAuthDialogProps) {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [loading, setLoading] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const [countdown, setCountdown] = useState(0);
  const { signInWithOTP, verifyOTP } = useAuth();

  // Countdown timer for resend OTP
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || phone.length !== 10) {
      return;
    }

    setLoading(true);
    try {
      const result = await signInWithOTP(phone);
      setConfirmationResult(result);
      setStep('otp');
      setCountdown(30); // 30 second cooldown
    } catch (error: any) {
      console.error('Send OTP error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpCode = otp.join('');
    if (!otpCode || otpCode.length !== 6 || !confirmationResult) {
      return;
    }

    setLoading(true);
    try {
      await verifyOTP(confirmationResult, otpCode);
      onOpenChange(false);
      reset();
    } catch (error: any) {
      console.error('Verify OTP error:', error);
      // Clear OTP on error
      setOtp(['', '', '', '', '', '']);
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const reset = () => {
    setPhone('');
    setOtp(['', '', '', '', '', '']);
    setStep('phone');
    setLoading(false);
    setConfirmationResult(null);
    setCountdown(0);
  };

  const handleClose = () => {
    onOpenChange(false);
    reset();
  };

  const handleResendOTP = async () => {
    if (countdown > 0) return;
    
    setLoading(true);
    try {
      const result = await signInWithOTP(phone);
      setConfirmationResult(result);
      setCountdown(30);
      setOtp(['', '', '', '', '', '']); // Clear OTP inputs
    } catch (error) {
      console.error('Resend OTP error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            {step === 'phone' ? (
              <>
                <Phone className="h-5 w-5 text-primary" />
                <span>Login with Phone</span>
              </>
            ) : (
              <>
                <Shield className="h-5 w-5 text-primary" />
                <span>Verify OTP</span>
              </>
            )}
          </DialogTitle>
          <DialogDescription>
            {step === 'phone' 
              ? 'Enter your mobile number to receive an OTP'
              : `We've sent a 6-digit code to +91${phone}`
            }
          </DialogDescription>
        </DialogHeader>

        {/* Firebase Billing Notice */}
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="text-sm">
            Using reCAPTCHA Enterprise for secure authentication. Real SMS requires Firebase billing to be enabled.
          </AlertDescription>
        </Alert>

        {step === 'phone' ? (
          <form onSubmit={handleSendOTP} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Mobile Number</Label>
              <div className="flex">
                <div className="flex items-center px-3 border border-r-0 rounded-l-md bg-muted text-sm">
                  +91
                </div>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="9876543210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  className="rounded-l-none"
                  maxLength={10}
                  required
                />
              </div>
            </div>
            
            <Button
              type="submit"
              className="w-full"
              disabled={loading || phone.length !== 10}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending OTP...
                </>
              ) : (
                'Send OTP'
              )}
            </Button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOTP} className="space-y-4">
            <div className="space-y-2">
              <Label>Enter OTP</Label>
              <div className="flex justify-between space-x-2">
                {otp.map((digit, index) => (
                  <Input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    className="w-12 h-12 text-center text-lg font-semibold"
                    autoComplete="one-time-code"
                  />
                ))}
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => setStep('phone')}
              >
                Back
              </Button>
              <Button
                type="submit"
                className="flex-1"
                disabled={loading || otp.join('').length !== 6}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  'Verify'
                )}
              </Button>
            </div>
            
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="w-full text-xs"
              onClick={handleResendOTP}
              disabled={loading || countdown > 0}
            >
              {countdown > 0 
                ? `Resend OTP in ${countdown}s`
                : 'Didn\'t receive code? Resend OTP'
              }
            </Button>
          </form>
        )}

        {/* Hidden recaptcha container */}
        <div id="recaptcha-container" className="hidden"></div>
      </DialogContent>
    </Dialog>
  );
}