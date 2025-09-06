import { ArrowLeft, Shield, Eye, Lock, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function Privacy() {
  return (
    <main className="flex-1 bg-background">
      {/* Back Button */}
      <div className="container mx-auto px-4 py-4">
        <Button variant="ghost" size="sm" asChild className="mb-4">
          <Link to="/" className="flex items-center space-x-2">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>
        </Button>
      </div>

      {/* Header */}
      <section className="bg-gradient-to-r from-primary/10 to-secondary/10 py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-6">
            Privacy Policy
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your privacy is important to us. Learn how we collect, use, and protect your personal information.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-sm text-muted-foreground mb-8 text-center">
              Last updated: December 2024
            </div>

            {/* Key Points */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="text-center p-6 rounded-lg bg-muted/30">
                <Eye className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Transparency</h3>
                <p className="text-sm text-muted-foreground">We're clear about what data we collect and how we use it</p>
              </div>
              <div className="text-center p-6 rounded-lg bg-muted/30">
                <Lock className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Security</h3>
                <p className="text-sm text-muted-foreground">Your data is protected with industry-standard encryption</p>
              </div>
              <div className="text-center p-6 rounded-lg bg-muted/30">
                <Users className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Control</h3>
                <p className="text-sm text-muted-foreground">You have control over your personal information</p>
              </div>
            </div>

            <div className="prose prose-lg max-w-none">
              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Information We Collect</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We collect information you provide directly to us and information we obtain automatically when you use our services.
                </p>
                
                <h3 className="text-xl font-semibold mb-4">Personal Information</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-6">
                  <li>Name, email address, and phone number</li>
                  <li>Delivery addresses</li>
                  <li>Payment information (processed securely by our payment partners)</li>
                  <li>Order history and preferences</li>
                </ul>

                <h3 className="text-xl font-semibold mb-4">Automatic Information</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Device information (IP address, browser type, operating system)</li>
                  <li>Usage data (pages visited, time spent, clicks)</li>
                  <li>Location information (for delivery purposes)</li>
                  <li>Cookies and similar technologies</li>
                </ul>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-6">How We Use Your Information</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We use the information we collect to provide, maintain, and improve our services:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Process and fulfill your orders</li>
                  <li>Communicate with you about orders and deliveries</li>
                  <li>Provide customer support</li>
                  <li>Send promotional offers (with your consent)</li>
                  <li>Improve our services and user experience</li>
                  <li>Ensure security and prevent fraud</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Information Sharing</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We do not sell, trade, or rent your personal information to third parties. We may share your information only in these limited circumstances:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li><strong>Service Providers:</strong> Delivery partners, payment processors, and technology providers</li>
                  <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                  <li><strong>Business Transfers:</strong> In case of merger, acquisition, or asset sale</li>
                  <li><strong>Consent:</strong> When you give us explicit permission</li>
                </ul>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Data Security</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We implement appropriate security measures to protect your personal information:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Encryption of data in transit and at rest</li>
                  <li>Regular security assessments and updates</li>
                  <li>Limited access to personal information</li>
                  <li>Secure payment processing through certified partners</li>
                  <li>Regular monitoring for suspicious activities</li>
                </ul>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Your Rights and Choices</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  You have the following rights regarding your personal information:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li><strong>Access:</strong> Request a copy of your personal information</li>
                  <li><strong>Correction:</strong> Update or correct inaccurate information</li>
                  <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                  <li><strong>Opt-out:</strong> Unsubscribe from promotional communications</li>
                  <li><strong>Data Portability:</strong> Request your data in a portable format</li>
                </ul>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Cookies and Tracking</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We use cookies and similar technologies to enhance your experience:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li><strong>Essential Cookies:</strong> Required for basic functionality</li>
                  <li><strong>Analytics Cookies:</strong> Help us understand usage patterns</li>
                  <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  You can manage cookie preferences through your browser settings.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Contact Us</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  If you have questions about this privacy policy or our data practices, contact us:
                </p>
                <div className="bg-muted/30 p-6 rounded-lg">
                  <p className="mb-2"><strong>Phone:</strong> +916302829644</p>
                  <p className="mb-2"><strong>Email:</strong> privacy@quickdelivery.com</p>
                  <p><strong>Address:</strong> Quick Delivery Hub, Gandhi Road, Kadapa, AP 516001</p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}