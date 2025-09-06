import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function Terms() {
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
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-6">
            Terms & Conditions
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Please read these terms and conditions carefully before using our grocery delivery service.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <div className="text-sm text-muted-foreground mb-8">
              Last updated: December 2024
            </div>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                By accessing and using Quick Delivery's services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6">2. Service Description</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Quick Delivery provides on-demand grocery delivery services within Kadapa city limits. We aim to deliver groceries within 30 minutes of order confirmation, subject to availability and weather conditions.
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Service available 7 AM to 11 PM daily</li>
                <li>Delivery within pincodes: 516001, 516002, 516003, 516004</li>
                <li>30-minute delivery commitment (weather permitting)</li>
                <li>Free delivery on orders above ₹399</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6">3. Order Placement and Acceptance</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                All orders are subject to availability and confirmation. We reserve the right to refuse or cancel any order for any reason, including but not limited to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Product unavailability</li>
                <li>Pricing errors</li>
                <li>Delivery area restrictions</li>
                <li>Suspicious or fraudulent activity</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6">4. Pricing and Payment</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                All prices are in Indian Rupees (INR) and include applicable taxes. We accept various payment methods:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Cash on Delivery (COD)</li>
                <li>Credit/Debit Cards</li>
                <li>UPI and digital wallets</li>
                <li>Net Banking</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Prices may change without notice. Delivery charges of ₹29 apply for orders below ₹399.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6">5. Delivery Policy</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We strive to deliver within 30 minutes but delivery times may vary due to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Weather conditions</li>
                <li>Traffic conditions</li>
                <li>High demand periods</li>
                <li>Address accessibility</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Customers must be available at the delivery address. If delivery cannot be completed due to customer unavailability, additional charges may apply for re-delivery.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6">6. Returns and Refunds</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We offer returns and refunds for:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Damaged or expired products</li>
                <li>Incorrect items delivered</li>
                <li>Quality issues</li>
                <li>Non-delivery of order</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Return requests must be raised within 24 hours of delivery. Refunds will be processed within 3-5 business days.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6">7. User Responsibilities</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Users agree to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Provide accurate delivery information</li>
                <li>Be available during delivery window</li>
                <li>Check products upon delivery</li>
                <li>Report issues within specified timeframe</li>
                <li>Use the service in good faith</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6">8. Limitation of Liability</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Quick Delivery shall not be liable for any indirect, incidental, or consequential damages arising from the use of our services. Our liability is limited to the order value.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6">9. Contact Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                For questions about these terms, contact us at:
              </p>
              <div className="mt-4 p-4 bg-muted/30 rounded-lg">
                <p><strong>Phone:</strong> +916302829644</p>
                <p><strong>Email:</strong> help@quickdelivery.com</p>
                <p><strong>Address:</strong> Quick Delivery Hub, Gandhi Road, Kadapa, AP 516001</p>
              </div>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}