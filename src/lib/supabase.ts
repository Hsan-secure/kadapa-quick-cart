import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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