import { ArrowLeft, RefreshCw, Clock, CheckCircle, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function Refund() {
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
            <RefreshCw className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-6">
            Refund Policy
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We're committed to your satisfaction. Learn about our hassle-free return and refund process.
          </p>
        </div>
      </section>

      {/* Quick Overview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="text-center p-6 rounded-lg bg-muted/30">
              <Clock className="h-8 w-8 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">24 Hour Window</h3>
              <p className="text-sm text-muted-foreground">Report issues within 24 hours of delivery for fastest resolution</p>
            </div>
            <div className="text-center p-6 rounded-lg bg-muted/30">
              <CheckCircle className="h-8 w-8 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">100% Satisfaction</h3>
              <p className="text-sm text-muted-foreground">We guarantee your satisfaction or your money back</p>
            </div>
            <div className="text-center p-6 rounded-lg bg-muted/30">
              <RefreshCw className="h-8 w-8 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Quick Processing</h3>
              <p className="text-sm text-muted-foreground">Refunds processed within 3-5 business days</p>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Policy */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <div className="text-sm text-muted-foreground mb-8 text-center">
              Last updated: December 2024
            </div>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Eligible Returns & Refunds</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We offer full refunds or replacements for the following situations:
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">Damaged or Expired Products</h3>
                    <p className="text-muted-foreground text-sm">Products that arrive damaged, expired, or in poor condition</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">Incorrect Items</h3>
                    <p className="text-muted-foreground text-sm">Wrong products delivered or missing items from your order</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">Quality Issues</h3>
                    <p className="text-muted-foreground text-sm">Products that don't meet our quality standards</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">Non-Delivery</h3>
                    <p className="text-muted-foreground text-sm">Orders that were not delivered despite confirmation</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Non-Eligible Items</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                The following items are not eligible for return or refund:
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <XCircle className="h-5 w-5 text-red-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-muted-foreground text-sm">Products consumed or used after delivery</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <XCircle className="h-5 w-5 text-red-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-muted-foreground text-sm">Returns requested after 24 hours of delivery</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <XCircle className="h-5 w-5 text-red-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-muted-foreground text-sm">Products damaged due to customer negligence</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6">How to Request a Refund</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Follow these simple steps to request a refund:
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">1</div>
                  <div>
                    <h3 className="font-semibold mb-2">Report the Issue</h3>
                    <p className="text-muted-foreground text-sm">Contact us within 24 hours via phone (+916302829644), email, or chat</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">2</div>
                  <div>
                    <h3 className="font-semibold mb-2">Provide Details</h3>
                    <p className="text-muted-foreground text-sm">Share your order number, photos of the issue (if applicable), and description</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">3</div>
                  <div>
                    <h3 className="font-semibold mb-2">Investigation</h3>
                    <p className="text-muted-foreground text-sm">Our team will review your case and may arrange for product pickup if needed</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">4</div>
                  <div>
                    <h3 className="font-semibold mb-2">Resolution</h3>
                    <p className="text-muted-foreground text-sm">Receive your refund or replacement within 3-5 business days</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Refund Methods & Timeline</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Refunds are processed using the same payment method used for the original purchase:
              </p>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-border rounded-lg">
                  <thead>
                    <tr className="bg-muted/30">
                      <th className="border border-border p-3 text-left font-semibold">Payment Method</th>
                      <th className="border border-border p-3 text-left font-semibold">Refund Timeline</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-border p-3">Cash on Delivery (COD)</td>
                      <td className="border border-border p-3">Bank transfer within 3-5 days</td>
                    </tr>
                    <tr>
                      <td className="border border-border p-3">Credit/Debit Cards</td>
                      <td className="border border-border p-3">5-7 business days</td>
                    </tr>
                    <tr>
                      <td className="border border-border p-3">UPI/Digital Wallets</td>
                      <td className="border border-border p-3">1-3 business days</td>
                    </tr>
                    <tr>
                      <td className="border border-border p-3">Net Banking</td>
                      <td className="border border-border p-3">3-5 business days</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Replacement vs Refund</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Depending on your preference and product availability, we offer:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li><strong>Instant Replacement:</strong> Same product delivered free of charge (subject to availability)</li>
                <li><strong>Store Credit:</strong> Credit to your Quick Delivery wallet for future purchases</li>
                <li><strong>Full Refund:</strong> Complete refund to your original payment method</li>
              </ul>
            </section>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Need Help with a Return?</h2>
          <p className="text-muted-foreground mb-6">
            Our customer support team is here to help with any return or refund questions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <a href="tel:+916302829644">Call +916302829644</a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="mailto:help@quickdelivery.com">Email Support</a>
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            Available 7 AM - 11 PM, 7 days a week
          </p>
        </div>
      </section>
    </main>
  );
}