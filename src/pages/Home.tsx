import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ChevronRight, Clock, MapPin, CreditCard, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ProductCard } from '@/components/ProductCard';
import { categories, products } from '@/data/products';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  
  const trendingProducts = products.filter(p => p.tags?.includes('bestseller')).slice(0, 8);
  // Get diverse categories for Essentials Under 99
  const under99Products = (() => {
    const categorizedProducts = products.filter(p => p.price < 99);
    const diverseSelection = [];
    
    // Get products from different categories
    const categories = ['fruits-veg', 'dairy-eggs', 'staples', 'snacks', 'breakfast', 'household'];
    
    categories.forEach(categoryId => {
      const categoryProducts = categorizedProducts.filter(p => p.categoryId === categoryId);
      if (categoryProducts.length > 0) {
        diverseSelection.push(...categoryProducts.slice(0, 1));
      }
    });
    
    return diverseSelection.slice(0, 6);
  })();
  const freshProducts = products.filter(p => p.tags?.includes('fresh')).slice(0, 4);

  const handleSearch = (e?: React.FormEvent | React.MouseEvent) => {
    if (e) e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    } else {
      console.log('Empty search query');
    }
  };

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-hero text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Groceries to your door
              <br />
              <span className="text-secondary-light">in 30 minutes</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              Kadapa's fastest grocery delivery service
            </p>
            
            {/* Search */}
            <form onSubmit={handleSearch} className="max-w-md mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search for groceries, brands..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleSearch();
                    }
                  }}
                  className="pl-12 h-14 text-lg bg-white/10 border-white/20 text-white placeholder:text-white/70 focus:bg-white focus:text-foreground focus:placeholder:text-muted-foreground"
                />
                <Button
                  type="submit"
                  onClick={handleSearch}
                  className="absolute right-2 top-2 bottom-2 px-6 bg-white text-primary hover:bg-white/90"
                >
                  Search
                </Button>
              </div>
            </form>

            {/* Trust Indicators */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              <div className="flex items-center justify-center space-x-2 bg-white/10 rounded-lg p-4">
                <Clock className="h-5 w-5" />
                <span className="font-medium">30-min delivery</span>
              </div>
              <div className="flex items-center justify-center space-x-2 bg-white/10 rounded-lg p-4">
                <MapPin className="h-5 w-5" />
                <span className="font-medium">Kadapa wide</span>
              </div>
              <div className="flex items-center justify-center space-x-2 bg-white/10 rounded-lg p-4">
                <CreditCard className="h-5 w-5" />
                <span className="font-medium">COD & UPI</span>
              </div>
              <div className="flex items-center justify-center space-x-2 bg-white/10 rounded-lg p-4">
                <Truck className="h-5 w-5" />
                <span className="font-medium">Free above ₹399</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Shop by Category</h2>
            <Link to="/categories" className="text-primary hover:text-primary-dark font-medium">
              View All <ChevronRight className="h-4 w-4 inline ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {categories.slice(0, 12).map((category) => (
              <Link
                key={category.id}
                to={`/category/${category.slug}`}
                className="group"
              >
                <Card className="product-card text-center h-full">
                  <CardContent className="p-6">
                    <div className="text-4xl mb-3">{category.icon}</div>
                    <h3 className="font-semibold text-sm leading-tight group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Trending Deals</h2>
              <p className="text-muted-foreground">Most popular items this week</p>
            </div>
            <Badge className="bg-success text-success-foreground animate-pulse">
              Limited Time
            </Badge>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
            {trendingProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Essentials Under ₹99 */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Essentials Under ₹99</h2>
              <p className="text-muted-foreground">Everyday groceries at great prices</p>
            </div>
            <Link to="/category/all?price_max=99" className="text-primary hover:text-primary-dark font-medium">
              View All <ChevronRight className="h-4 w-4 inline ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {under99Products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Fresh Arrivals */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Fresh Arrivals</h2>
              <p className="text-muted-foreground">Just arrived from the farm</p>
            </div>
            <Badge className="bg-accent text-accent-foreground">
              Farm Fresh
            </Badge>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {freshProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Download App CTA */}
      <section className="py-16 gradient-brand-soft">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Get the Quick Delivery App</h2>
            <p className="text-muted-foreground mb-8">
              Order faster, track your delivery, and get exclusive app-only deals
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="btn-hero">
                📱 Download for Android
              </Button>
              <Button variant="outline" className="btn-ghost-brand">
                🍎 Download for iOS
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}