import { createContext, useContext, useEffect, useState } from 'react';
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
      
      // Create recaptcha verifier
      const recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
        callback: () => {
          console.log('reCAPTCHA verified');
        }
      });

      const confirmationResult = await signInWithPhoneNumber(auth, formattedPhone, recaptchaVerifier);
      
      toast.success(`OTP sent to ${formattedPhone}`);
      return confirmationResult;
    } catch (error: any) {
      console.error('Error sending OTP:', error);
      toast.error(error.message || 'Failed to send OTP');
      throw error;
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
      await firebaseSignOut(auth);
      toast.success('Signed out successfully');
    } catch (error: any) {
      console.error('Error signing out:', error);
      toast.error('Error signing out');
      throw error;
    }
  };

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