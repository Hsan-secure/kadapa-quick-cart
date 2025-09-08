import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle, CheckCircle } from 'lucide-react';
import { supabaseConfig } from '@/lib/supabase';

export function SupabaseStatus() {
  if (supabaseConfig.isConfigured) {
    return null; // Don't show anything if properly configured
  }

  return (
    <Alert className="mb-4 border-orange-200 bg-orange-50">
      <AlertTriangle className="h-4 w-4 text-orange-600" />
      <AlertTitle className="text-orange-800">Supabase Configuration Needed</AlertTitle>
      <AlertDescription className="text-orange-700">
        <div className="space-y-2 mt-2">
          <p>Your Supabase backend is not yet connected. To enable login and payment features:</p>
          <ol className="list-decimal list-inside space-y-1 text-sm">
            <li>Click the green <strong>Supabase</strong> button in the top-right corner</li>
            <li>Connect your Supabase account</li>
            <li>Create a new project or connect an existing one</li>
            <li>Enable Phone Authentication in your Supabase dashboard</li>
          </ol>
          <p className="text-xs mt-2">
            Once connected, the environment variables will be automatically configured.
          </p>
        </div>
      </AlertDescription>
    </Alert>
  );
}