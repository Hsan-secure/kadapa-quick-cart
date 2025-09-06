import { ArrowLeft, Clock, MapPin, Users, Award, Heart, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function About() {
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

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 to-secondary/10 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-6">
            About Quick Delivery
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Revolutionizing grocery shopping in Kadapa with 30-minute delivery promise. 
            We're not just delivering groceries – we're delivering convenience, freshness, and reliability to your doorstep.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Our Story</h2>
            <div className="prose prose-lg mx-auto text-muted-foreground">
              <p className="text-lg leading-relaxed mb-6">
                Founded in 2024, Quick Delivery was born from a simple observation: people in Kadapa deserved better access to fresh groceries without the hassle of long shopping trips. Our founders, lifelong residents of Kadapa, understood the unique needs of our community.
              </p>
              <p className="text-lg leading-relaxed mb-6">
                What started as a small local initiative has grown into Kadapa's most trusted grocery delivery service. We've built strong relationships with local suppliers, ensuring that every product we deliver meets our high standards for quality and freshness.
              </p>
              <p className="text-lg leading-relaxed">
                Today, we're proud to serve thousands of families across Kadapa, making their lives a little easier, one delivery at a time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Drives Us</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg bg-background shadow-sm">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Speed & Reliability</h3>
              <p className="text-muted-foreground">
                Our 30-minute delivery promise isn't just a slogan – it's our commitment to respecting your time and schedule.
              </p>
            </div>
            
            <div className="text-center p-6 rounded-lg bg-background shadow-sm">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Quality First</h3>
              <p className="text-muted-foreground">
                Every product is carefully selected and quality-checked. We deliver only what we'd want for our own families.
              </p>
            </div>
            
            <div className="text-center p-6 rounded-lg bg-background shadow-sm">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Community Focus</h3>
              <p className="text-muted-foreground">
                We're not just a delivery service – we're part of the Kadapa community, supporting local suppliers and families.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Impact</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">5000+</div>
              <div className="text-muted-foreground">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">50,000+</div>
              <div className="text-muted-foreground">Orders Delivered</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">30</div>
              <div className="text-muted-foreground">Minutes Average</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">99.5%</div>
              <div className="text-muted-foreground">On-Time Delivery</div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <MapPin className="h-12 w-12 text-primary mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-6">Serving Kadapa</h2>
            <p className="text-lg text-muted-foreground mb-8">
              We currently deliver to all major areas in Kadapa, covering pincodes 516001, 516002, 516003, and 516004. 
              Our delivery network ensures that fresh groceries reach you within our 30-minute promise.
            </p>
            <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full">
              <Truck className="h-4 w-4" />
              <span className="font-medium">Free delivery above ₹399</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}