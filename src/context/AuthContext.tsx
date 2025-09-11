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

  const signInWithOTP = async (phone: string): Promise<ConfirmationResult> => {
    console.log('Requesting OTP for phone:', phone);
    
    try {
      // Ensure phone number is in the correct format
      const formattedPhone = phone.startsWith('+91') ? phone : `+91${phone}`;
      
      // Clean up existing reCAPTCHA if it exists
      if (recaptchaVerifierRef.current) {
        try {
          recaptchaVerifierRef.current.clear();
        } catch (e) {
          console.log('Error clearing recaptcha:', e);
        }
        recaptchaVerifierRef.current = null;
      }

      // Clear the recaptcha container
      const recaptchaContainer = document.getElementById('recaptcha-container');
      if (recaptchaContainer) {
        recaptchaContainer.innerHTML = '';
      }

      // Create new recaptcha verifier
      recaptchaVerifierRef.current = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
        callback: (response: any) => {
          console.log('reCAPTCHA verified:', response);
        },
        'expired-callback': () => {
          console.log('reCAPTCHA expired');
        },
        'error-callback': (error: any) => {
          console.log('reCAPTCHA error:', error);
        }
      });

      const confirmationResult = await signInWithPhoneNumber(auth, formattedPhone, recaptchaVerifierRef.current);
      
      toast.success(`OTP sent to ${formattedPhone}`);
      return confirmationResult;
    } catch (error: any) {
      console.error('Error sending OTP:', error);
      
      // Handle specific Firebase errors
      if (error.code === 'auth/billing-not-enabled') {
        toast.error('SMS authentication not enabled. Please enable billing in Firebase Console.');
        // For development, you could implement a fallback here
        throw new Error('SMS authentication requires Firebase billing to be enabled. Please contact support.');
      } else if (error.code === 'auth/project-not-whitelisted') {
        toast.error('Domain not whitelisted for Firebase authentication');
        throw new Error('Authentication not configured for this domain');
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