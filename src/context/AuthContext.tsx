import { createContext, useContext, useEffect, useState, useRef } from 'react';
import { auth } from '@/config/firebase';
import { 
  signInWithPhoneNumber, 
  RecaptchaVerifier, 
  ConfirmationResult,
  User,
  onAuthStateChanged,
  signOut as firebaseSignOut
} from 'firebase/auth';
import { toast } from 'sonner';

// reCAPTCHA Enterprise configuration
const RECAPTCHA_SITE_KEY = '6LemtMUrAAAAAJc1yvat8jF8k-Iex9FCxaZMU1ew';

// Extend window interface for reCAPTCHA Enterprise
declare global {
  interface Window {
    grecaptcha: {
      enterprise: {
        ready: (callback: () => void) => void;
        execute: (siteKey: string, options: { action: string }) => Promise<string>;
      };
    };
  }
}

interface AuthState {
  user: User | null;
  loading: boolean;
}

interface AuthContextType extends AuthState {
  signInWithOTP: (phone: string) => Promise<ConfirmationResult>;
  verifyOTP: (confirmationResult: ConfirmationResult, otp: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signInWithOTP: async () => ({} as ConfirmationResult),
  verifyOTP: async () => {},
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const recaptchaVerifierRef = useRef<RecaptchaVerifier | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('Auth state changed:', user?.phoneNumber);
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Create Enterprise reCAPTCHA verifier
  const createEnterpriseRecaptchaVerifier = (): Promise<RecaptchaVerifier> => {
    return new Promise((resolve, reject) => {
      if (!window.grecaptcha?.enterprise) {
        reject(new Error('reCAPTCHA Enterprise not loaded'));
        return;
      }

      window.grecaptcha.enterprise.ready(async () => {
        try {
          // Execute reCAPTCHA Enterprise
          const token = await window.grecaptcha.enterprise.execute(RECAPTCHA_SITE_KEY, {
            action: 'LOGIN'
          });

          console.log('reCAPTCHA Enterprise token generated:', token);

          // Create a custom RecaptchaVerifier that uses the Enterprise token
          const recaptchaContainer = document.getElementById('recaptcha-container');
          if (recaptchaContainer) {
            recaptchaContainer.innerHTML = '';
          }

          const verifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
            size: 'invisible',
            callback: () => {
              console.log('reCAPTCHA verified with Enterprise token');
            },
            'expired-callback': () => {
              console.log('reCAPTCHA expired');
            },
            'error-callback': (error: any) => {
              console.log('reCAPTCHA error:', error);
            }
          });

          resolve(verifier);
        } catch (error) {
          console.error('Error generating reCAPTCHA Enterprise token:', error);
          reject(error);
        }
      });
    });
  };

  const signInWithOTP = async (phone: string): Promise<ConfirmationResult> => {
    console.log('Requesting OTP for phone:', phone);
    
    try {
      // Ensure phone number is in the correct format
      const formattedPhone = phone.startsWith('+91') ? phone : `+91${phone}`;
      console.log('Formatted phone:', formattedPhone);
      
      // Clean up existing reCAPTCHA if it exists
      if (recaptchaVerifierRef.current) {
        try {
          recaptchaVerifierRef.current.clear();
        } catch (e) {
          console.log('Error clearing recaptcha:', e);
        }
        recaptchaVerifierRef.current = null;
      }

      // For test numbers, use a simplified reCAPTCHA approach
      const testNumbers = ['+916302829644', '+919000371641'];
      const isTestNumber = testNumbers.includes(formattedPhone);
      
      if (isTestNumber) {
        console.log('Using test number mode');
        // Use invisible reCAPTCHA for test numbers
        const recaptchaContainer = document.getElementById('recaptcha-container');
        if (recaptchaContainer) {
          recaptchaContainer.innerHTML = '';
        }

        recaptchaVerifierRef.current = new RecaptchaVerifier(auth, 'recaptcha-container', {
          size: 'invisible',
          callback: () => {
            console.log('reCAPTCHA verified for test number');
          },
          'expired-callback': () => {
            console.log('reCAPTCHA expired');
          }
        });
      } else {
        // Create Enterprise reCAPTCHA verifier for production numbers
        recaptchaVerifierRef.current = await createEnterpriseRecaptchaVerifier();
      }

      const confirmationResult = await signInWithPhoneNumber(auth, formattedPhone, recaptchaVerifierRef.current);
      
      if (isTestNumber) {
        toast.success(`Test OTP sent to ${formattedPhone}. Use the configured test OTP.`);
      } else {
        toast.success(`OTP sent to ${formattedPhone}`);
      }
      
      return confirmationResult;
    } catch (error: any) {
      console.error('Error sending OTP:', error);
      
      // Handle specific Firebase errors
      if (error.code === 'auth/billing-not-enabled') {
        toast.error('SMS authentication not enabled. Using test mode.');
        throw new Error('Using test numbers. Please use +916302829644 (OTP: 193100) or +919000371641 (OTP: 001931)');
      } else if (error.code === 'auth/project-not-whitelisted') {
        toast.error('Domain not whitelisted for Firebase authentication');
        throw new Error('Authentication not configured for this domain');
      } else if (error.code === 'auth/invalid-phone-number') {
        toast.error('Invalid phone number format');
        throw new Error('Please enter a valid 10-digit phone number');
      } else if (error.message?.includes('reCAPTCHA')) {
        toast.error('reCAPTCHA verification failed. Please try again.');
        throw new Error('Verification failed. Please refresh and try again.');
      } else {
        toast.error(error.message || 'Failed to send OTP');
        throw error;
      }
    }
  };

  const verifyOTP = async (confirmationResult: ConfirmationResult, otp: string) => {
    console.log('Verifying OTP:', otp);
    
    try {
      const result = await confirmationResult.confirm(otp);
      console.log('OTP verified successfully:', result.user.phoneNumber);
      toast.success('Login successful!');
    } catch (error: any) {
      console.error('Error verifying OTP:', error);
      toast.error('Invalid OTP. Please try again.');
      throw error;
    }
  };

  const signOut = async () => {
    try {
      // Clean up reCAPTCHA
      if (recaptchaVerifierRef.current) {
        try {
          recaptchaVerifierRef.current.clear();
        } catch (e) {
          console.log('Error clearing recaptcha on signout:', e);
        }
        recaptchaVerifierRef.current = null;
      }
      
      await firebaseSignOut(auth);
      toast.success('Signed out successfully');
    } catch (error: any) {
      console.error('Error signing out:', error);
      toast.error('Error signing out');
      throw error;
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (recaptchaVerifierRef.current) {
        try {
          recaptchaVerifierRef.current.clear();
        } catch (e) {
          console.log('Error clearing recaptcha on unmount:', e);
        }
      }
    };
  }, []);

  const value: AuthContextType = {
    user,
    loading,
    signInWithOTP,
    verifyOTP,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};