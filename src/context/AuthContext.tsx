import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
  profile: UserProfile | null;
}

interface UserProfile {
  id: string;
  phone: string;
  created_at: string;
  updated_at: string;
}

interface AuthContextType extends AuthState {
  signInWithOTP: (phone: string) => Promise<void>;
  verifyOTP: (phone: string, otp: string) => Promise<void>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  loading: true,
  profile: null,
  signInWithOTP: async () => {},
  verifyOTP: async () => {},
  signOut: async () => {},
  refreshProfile: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Error getting session:', error);
      } else {
        setSession(session);
        setUser(session?.user ?? null);
        if (session?.user) {
          await fetchProfile(session.user.id);
        }
      }
      setLoading(false);
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          await fetchProfile(session.user.id);
        } else {
          setProfile(null);
        }
        
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const signInWithOTP = async (phone: string) => {
    try {
      // Format phone number to E.164 format (+91XXXXXXXXXX)
      const formattedPhone = phone.startsWith('+91') ? phone : `+91${phone}`;
      
      console.log('Sending OTP to:', formattedPhone);
      
      // Call custom edge function to send OTP
      const { data, error } = await supabase.functions.invoke('send-otp', {
        body: { phone: formattedPhone }
      });

      console.log('OTP Response:', { data, error });

      if (error) throw error;
      if (!data?.success) throw new Error(data?.error || 'Failed to send OTP');

      toast({
        title: "OTP Sent",
        description: `Verification code sent to ${formattedPhone}. Check your SMS messages.`,
      });
      
      // In demo mode, show the OTP in console/toast for testing
      if (data?.debug_otp) {
        console.log('Demo OTP:', data.debug_otp);
        toast({
          title: "Demo Mode",
          description: `Your OTP is: ${data.debug_otp}`,
          variant: "default",
        });
      }
    } catch (error: any) {
      console.error('OTP send error:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to send OTP. Please check your phone number and try again.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const verifyOTP = async (phone: string, otp: string) => {
    try {
      const formattedPhone = phone.startsWith('+91') ? phone : `+91${phone}`;
      
      // Call custom edge function to verify OTP
      const { data, error } = await supabase.functions.invoke('verify-otp', {
        body: { phone: formattedPhone, otp }
      });

      console.log('OTP Verification Response:', { data, error });

      if (error) throw error;
      if (!data?.success) throw new Error(data?.error || 'Invalid OTP');

      // The edge function handles user creation and profile setup
      // Force refresh the auth state
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setSession(session);
        setUser(session.user);
        await fetchProfile(session.user.id);
      }

      toast({
        title: "Welcome!",
        description: "Successfully logged in",
      });
    } catch (error: any) {
      console.error('OTP verification error:', error);
      toast({
        title: "Error",
        description: error.message || "Invalid OTP",
        variant: "destructive",
      });
      throw error;
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      toast({
        title: "Logged out",
        description: "Come back soon!",
      });
    } catch (error: any) {
      console.error('Sign out error:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to sign out",
        variant: "destructive",
      });
    }
  };

  const refreshProfile = async () => {
    if (user) {
      await fetchProfile(user.id);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        profile,
        signInWithOTP,
        verifyOTP,
        signOut,
        refreshProfile,
      }}
    >
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