import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, Menu, X, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useCart } from '@/context/CartContext';
import { categories } from '@/data/products';
import { HeaderChatButton } from './HeaderChatButton';

export function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { getItemCount } = useCart();
  const itemCount = getItemCount();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/90 border-b shadow-sm">
      {/* Delivery Promise Banner */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span className="font-medium">30-min guarantee</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4" />
              <span>Kadapa only</span>
            </div>
            <div className="hidden md:block">
              <span>Free delivery above ₹399</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center text-white font-bold text-lg">
              Q
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Quick Delivery</h1>
              <p className="text-xs text-muted-foreground">30-min grocery delivery</p>
            </div>
          </Link>

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-6">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Search for groceries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-muted/50 border-0 focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </form>

          {/* Right Actions */}
          <div className="flex items-center space-x-2">
            {/* Order Help Chat */}
            <HeaderChatButton />
            {/* Search - Mobile */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => navigate('/search')}
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Cart */}
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() => navigate('/cart')}
            >
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                >
                  {itemCount > 99 ? '99+' : itemCount}
                </Badge>
              )}
            </Button>

            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <SheetHeader>
                  <SheetTitle className="text-left">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-gradient-to-r from-primary to-secondary rounded flex items-center justify-center text-white text-sm font-bold">
                      Q
                    </div>
                    <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent font-bold">Quick Delivery</span>
                  </div>
                  </SheetTitle>
                </SheetHeader>
                
                {/* Mobile Search */}
                <form onSubmit={handleSearch} className="mt-6 mb-6">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      type="text"
                      placeholder="Search for groceries..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </form>

                {/* Categories */}
                <div className="space-y-1">
                  <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-3">
                    Categories
                  </h3>
                  {categories.map((category) => (
                    <Link
                      key={category.id}
                      to={`/category/${category.slug}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <span className="text-lg">{category.icon}</span>
                      <span className="font-medium">{category.name}</span>
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Desktop Categories Navigation */}
      <div className="hidden md:block border-t bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-8 py-2 overflow-x-auto">
            {categories.slice(0, 8).map((category) => (
              <Link
                key={category.id}
                to={`/category/${category.slug}`}
                className="flex items-center space-x-2 py-2 px-3 rounded-lg text-sm font-medium whitespace-nowrap hover:bg-white transition-colors"
              >
                <span>{category.icon}</span>
                <span>{category.name}</span>
              </Link>
            ))}
            <Link
              to="/categories"
              className="py-2 px-3 text-sm font-medium text-primary hover:text-primary-dark whitespace-nowrap"
            >
              More →
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}