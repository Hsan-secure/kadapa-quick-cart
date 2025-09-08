import { createClient } from '@supabase/supabase-js';

// In Lovable, Supabase credentials are automatically injected when you connect Supabase
// Check multiple possible environment variable names
const supabaseUrl = 
  import.meta.env.VITE_SUPABASE_URL || 
  import.meta.env.SUPABASE_URL ||
  import.meta.env.PUBLIC_SUPABASE_URL ||
  // Temporary placeholder - will be replaced when Supabase is properly connected
  'https://placeholder.supabase.co';

const supabaseAnonKey = 
  import.meta.env.VITE_SUPABASE_ANON_KEY || 
  import.meta.env.SUPABASE_ANON_KEY ||
  import.meta.env.PUBLIC_SUPABASE_ANON_KEY ||
  // Temporary placeholder
  'placeholder-key';

// Debug logging to help diagnose the issue
console.log('=== SUPABASE CONFIGURATION DEBUG ===');
console.log('Available environment variables:');
Object.keys(import.meta.env).forEach(key => {
  console.log(`${key}:`, key.includes('SUPABASE') ? import.meta.env[key] : '[hidden]');
});
console.log('Selected URL:', supabaseUrl);
console.log('Key available:', supabaseAnonKey !== 'placeholder-key');
console.log('=== END DEBUG ===');

// Always create a client to prevent crashes
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Export configuration status
export const supabaseConfig = {
  url: supabaseUrl,
  isConfigured: !supabaseUrl.includes('placeholder') && supabaseAnonKey !== 'placeholder-key',
  isPlaceholder: supabaseUrl.includes('placeholder')
};

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          phone: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          phone: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          phone?: string;
          updated_at?: string;
        };
      };
      orders: {
        Row: {
          id: string;
          user_id: string;
          items: any;
          subtotal: number;
          discount: number;
          delivery_fee: number;
          gst: number;
          total: number;
          address: any;
          payment_method: string;
          payment_ref: string | null;
          status: string;
          eta_minutes: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          items: any;
          subtotal: number;
          discount: number;
          delivery_fee: number;
          gst: number;
          total: number;
          address: any;
          payment_method: string;
          payment_ref?: string | null;
          status: string;
          eta_minutes: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          status?: string;
          payment_ref?: string;
          updated_at?: string;
        };
      };
      transactions: {
        Row: {
          id: string;
          order_id: string;
          transaction_id: string;
          amount: number;
          status: string;
          payment_method: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          order_id: string;
          transaction_id: string;
          amount: number;
          status: string;
          payment_method: string;
          created_at?: string;
        };
        Update: {
          status?: string;
        };
      };
    };
  };
};