import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertCircle, ExternalLink, CreditCard, Settings, Shield } from 'lucide-react';

export function FirebaseSetupGuide() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Firebase SMS Authentication Setup Guide</h1>
        <p className="text-muted-foreground">Complete setup for real-time SMS OTP delivery</p>
      </div>

      {/* Current Status */}
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription className="font-medium">
          <strong>Current Status:</strong> Firebase is configured but SMS billing needs to be enabled for production use.
        </AlertDescription>
      </Alert>

      {/* Step 1: Firebase Console Setup */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Step 1: Firebase Console Configuration
          </CardTitle>
          <CardDescription>
            Enable Phone Authentication and configure billing in Firebase Console
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-semibold">1. Go to Firebase Console</h4>
            <p className="text-sm text-muted-foreground">
              Visit: <a href="https://console.firebase.google.com/" className="text-primary hover:underline flex items-center gap-1" target="_blank" rel="noopener noreferrer">
                Firebase Console <ExternalLink className="h-3 w-3" />
              </a>
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold">2. Select Your Project</h4>
            <p className="text-sm text-muted-foreground">
              Select project: <Badge variant="secondary">quick-delivery-79d4f</Badge>
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold">3. Enable Phone Authentication</h4>
            <ul className="text-sm text-muted-foreground space-y-1 ml-4">
              <li>• Go to <strong>Authentication</strong> → <strong>Sign-in method</strong></li>
              <li>• Enable <strong>Phone</strong> provider</li>
              <li>• Add your domain to authorized domains if needed</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Step 2: Billing Setup */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Step 2: Enable Billing (Required for SMS)
          </CardTitle>
          <CardDescription>
            SMS authentication requires Firebase Blaze plan
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>Important:</strong> Real SMS delivery requires the Firebase Blaze (Pay-as-you-go) plan.
            </AlertDescription>
          </Alert>

          <div className="space-y-2">
            <h4 className="font-semibold">Enable Billing:</h4>
            <ul className="text-sm text-muted-foreground space-y-1 ml-4">
              <li>• Go to Firebase Console → <strong>Settings</strong> → <strong>Usage and billing</strong></li>
              <li>• Click <strong>Modify plan</strong></li>
              <li>• Select <strong>Blaze (Pay as you go)</strong></li>
              <li>• Add your payment method</li>
            </ul>
          </div>

          <div className="bg-muted p-4 rounded-lg">
            <h4 className="font-semibold text-sm mb-2">SMS Pricing (India):</h4>
            <ul className="text-sm space-y-1">
              <li>• SMS to India: ~₹0.60 per SMS</li>
              <li>• Verification attempts: Multiple SMS per verification</li>
              <li>• Daily quotas apply for abuse prevention</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Step 3: Security Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Step 3: Security & Domain Configuration
          </CardTitle>
          <CardDescription>
            Configure authorized domains and security settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-semibold">Authorized Domains:</h4>
            <ul className="text-sm text-muted-foreground space-y-1 ml-4">
              <li>• Add your production domain</li>
              <li>• Add <code>lovableproject.com</code> for development</li>
              <li>• Add <code>localhost</code> for local testing</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold">App Check (Recommended):</h4>
            <ul className="text-sm text-muted-foreground space-y-1 ml-4">
              <li>• Enable App Check for additional security</li>
              <li>• Configure reCAPTCHA Enterprise for web</li>
              <li>• Set enforcement mode after testing</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Step 4: Testing */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Step 4: Testing & Verification
          </CardTitle>
          <CardDescription>
            Test the SMS authentication flow
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-semibold">Test Phone Numbers (Development):</h4>
            <p className="text-sm text-muted-foreground">
              You can add test phone numbers in Firebase Console for development testing without SMS costs.
            </p>
            <ul className="text-sm text-muted-foreground space-y-1 ml-4">
              <li>• Go to Authentication → Sign-in method → Phone</li>
              <li>• Add test phone numbers with verification codes</li>
              <li>• Example: +91 9999999999 → Code: 123456</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold">Production Testing:</h4>
            <ul className="text-sm text-muted-foreground space-y-1 ml-4">
              <li>• Test with real phone numbers after billing setup</li>
              <li>• Monitor Firebase Console for usage and errors</li>
              <li>• Check SMS delivery in Firebase Logs</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Troubleshooting */}
      <Card>
        <CardHeader>
          <CardTitle>Common Issues & Solutions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">Error: auth/billing-not-enabled</h4>
              <p className="text-sm text-muted-foreground">
                Solution: Enable Firebase Blaze plan and billing
              </p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">Error: reCAPTCHA already rendered</h4>
              <p className="text-sm text-muted-foreground">
                Solution: Fixed in current implementation with proper cleanup
              </p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">SMS not received</h4>
              <p className="text-sm text-muted-foreground">
                Check: Phone number format, billing status, daily quotas
              </p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">Domain not authorized</h4>
              <p className="text-sm text-muted-foreground">
                Add your domain to Firebase authorized domains list
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current Implementation Status */}
      <Card>
        <CardHeader>
          <CardTitle>Current Implementation Features</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2 md:grid-cols-2">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm">Firebase configuration</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm">reCAPTCHA management</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm">Error handling</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm">OTP verification UI</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm">Resend OTP functionality</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm">Auto-focus OTP inputs</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}