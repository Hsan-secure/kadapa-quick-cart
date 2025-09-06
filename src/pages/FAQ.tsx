import { ArrowLeft, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQ() {
  const faqs = [
    {
      question: "What is your delivery time?",
      answer: "We deliver groceries within 30 minutes of order confirmation. Our delivery team is trained to meet this commitment 99.5% of the time."
    },
    {
      question: "Which areas do you deliver to?",
      answer: "We currently deliver to all areas within Kadapa covering pincodes 516001, 516002, 516003, and 516004. If your area isn't covered yet, we're expanding soon!"
    },
    {
      question: "What is the minimum order value?",
      answer: "There is no minimum order value. However, we offer free delivery on orders above ₹399. For orders below ₹399, a delivery charge of ₹29 applies."
    },
    {
      question: "How do I track my order?",
      answer: "Once your order is confirmed, you'll receive real-time updates via SMS and app notifications. You can also track your order status in the 'My Orders' section."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major payment methods including Cash on Delivery, UPI, Credit/Debit Cards, and digital wallets like Paytm, PhonePe, and Google Pay."
    },
    {
      question: "What if I'm not satisfied with the products?",
      answer: "We have a 100% satisfaction guarantee. If you're not satisfied with any product, you can return it within 24 hours of delivery for a full refund or replacement."
    },
    {
      question: "Do you deliver on Sundays and holidays?",
      answer: "Yes! We deliver 7 days a week from 7 AM to 11 PM, including Sundays and most holidays. We believe groceries are essential any day of the week."
    },
    {
      question: "How do you ensure product freshness?",
      answer: "We source directly from trusted suppliers and local farms. All products are stored in temperature-controlled warehouses and quality-checked before delivery."
    },
    {
      question: "Can I schedule a delivery for later?",
      answer: "Currently, we focus on immediate delivery within 30 minutes. However, we're working on adding scheduled delivery options in the near future."
    },
    {
      question: "What if I miss the delivery?",
      answer: "Our delivery person will call you before arrival. If you miss the delivery, we'll attempt redelivery within 2 hours at no extra cost. After that, standard delivery charges apply."
    },
    {
      question: "Do you have organic products?",
      answer: "Yes, we have a dedicated section for organic and chemical-free products. Look for the 'Organic' label on product listings."
    },
    {
      question: "How can I contact customer support?",
      answer: "You can reach our customer support team at +916302829644, email us at help@quickdelivery.com, or use the chat feature in our app. We're available 7 AM to 11 PM daily."
    }
  ];

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
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about our grocery delivery service, policies, and more.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="border rounded-lg px-6 bg-background shadow-sm"
                >
                  <AccordionTrigger className="text-left hover:no-underline">
                    <span className="font-semibold">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pt-2 pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
          <p className="text-muted-foreground mb-6">
            Our customer support team is here to help you 7 days a week.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <a href="tel:+916302829644">Call +916302829644</a>
            </Button>
            <Button variant="outline" asChild>
              <a href="mailto:help@quickdelivery.com">Email Support</a>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}