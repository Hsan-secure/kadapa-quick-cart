import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Filter, Grid, List, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { ProductCard } from '@/components/ProductCard';
import { products, categories } from '@/data/products';

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const searchQuery = searchParams.get('q') || '';
  const category = searchParams.get('category') || 'all';
  const sortBy = searchParams.get('sort') || 'relevance';
  const priceMin = searchParams.get('price_min') || '';
  const priceMax = searchParams.get('price_max') || '';
  
  console.log('Search params:', { searchQuery, category, sortBy, priceMin, priceMax });

  // Filter products based on search query and filters
  const filteredProducts = products.filter(product => {
    // Search query filter - enhanced to search in category names too
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesName = product.name.toLowerCase().includes(query);
      const matchesBrand = product.brand?.toLowerCase().includes(query);
      const matchesTags = product.tags?.some(tag => tag.toLowerCase().includes(query));
      const matchesCategory = categories.find(cat => cat.id === product.categoryId)?.name.toLowerCase().includes(query);
      
      if (!matchesName && !matchesBrand && !matchesTags && !matchesCategory) {
        return false;
      }
    }

    // Category filter
    if (category !== 'all' && product.categoryId !== category) {
      return false;
    }

    // Price filter
    if (priceMin && product.price < parseFloat(priceMin)) {
      return false;
    }
    if (priceMax && product.price > parseFloat(priceMax)) {
      return false;
    }

    return product.inStock;
  });
  
  console.log('Filtered products count:', filteredProducts.length);

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price_low':
        return a.price - b.price;
      case 'price_high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'discount':
        return b.discount - a.discount;
      default: // relevance
        return b.rating - a.rating;
    }
  });

  const updateSearchParam = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  };

  const clearFilters = () => {
    const newParams = new URLSearchParams();
    if (searchQuery) newParams.set('q', searchQuery);
    setSearchParams(newParams);
  };

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Category Filter */}
      <div>
        <h3 className="font-semibold mb-3">Category</h3>
        <Select value={category} onValueChange={(value) => updateSearchParam('category', value)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={cat.id}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Price Filter */}
      <div>
        <h3 className="font-semibold mb-3">Price Range</h3>
        <div className="flex space-x-2">
          <Input
            placeholder="Min"
            value={priceMin}
            onChange={(e) => updateSearchParam('price_min', e.target.value)}
          />
          <Input
            placeholder="Max"
            value={priceMax}
            onChange={(e) => updateSearchParam('price_max', e.target.value)}
          />
        </div>
      </div>

      {/* Quick Price Filters */}
      <div>
        <h3 className="font-semibold mb-3">Quick Filters</h3>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              updateSearchParam('price_min', '');
              updateSearchParam('price_max', '99');
            }}
          >
            Under ₹99
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              updateSearchParam('price_min', '100');
              updateSearchParam('price_max', '299');
            }}
          >
            ₹100 - ₹299
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              updateSearchParam('price_min', '300');
              updateSearchParam('price_max', '');
            }}
          >
            Above ₹300
          </Button>
        </div>
      </div>

      <Button onClick={clearFilters} variant="outline" className="w-full">
        Clear All Filters
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-muted/30 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate(-1)}
              className="btn-back mb-4"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          </div>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">
                {searchQuery ? `Search Results for "${searchQuery}"` : 'All Products'}
              </h1>
              <p className="text-muted-foreground">
                {sortedProducts.length} products found
              </p>
            </div>
            
            <div className="flex items-center space-x-2">
              {/* View Mode Toggle */}
              <div className="hidden md:flex border rounded-lg">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="rounded-r-none"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>

              {/* Sort */}
              <Select value={sortBy} onValueChange={(value) => updateSearchParam('sort', value)}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="price_low">Price: Low to High</SelectItem>
                  <SelectItem value="price_high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Best Rated</SelectItem>
                  <SelectItem value="discount">Best Offers</SelectItem>
                </SelectContent>
              </Select>

              {/* Mobile Filter Button */}
              <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="md:hidden">
                    <Filter className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <FilterContent />
                  </div>
                </SheetContent>
              </Sheet>

              {/* Desktop Filter Button */}
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  const filtersElement = document.getElementById('desktop-filters');
                  if (filtersElement) {
                    filtersElement.classList.toggle('hidden');
                  }
                }}
                className="hidden md:flex"
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Desktop Filters */}
          <div id="desktop-filters" className="hidden md:block w-64 shrink-0">
            <div className="bg-card rounded-lg p-6 sticky top-8">
              <FilterContent />
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {sortedProducts.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-lg font-semibold mb-2">No products found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search criteria or filters
                </p>
                <Button onClick={clearFilters}>Clear Filters</Button>
              </div>
            ) : (
              <div className={`grid ${
                viewMode === 'grid' 
                  ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4' 
                  : 'grid-cols-1'
              } gap-4`}>
                {sortedProducts.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    product={product}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}