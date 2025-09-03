import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Filter, Grid, List, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { ProductCard } from '@/components/ProductCard';
import { categories, products } from '@/data/products';

export default function Category() {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const category = categories.find(c => c.slug === slug);
  
  // Filter state
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    priceMin: searchParams.get('price_min') || '',
    priceMax: searchParams.get('price_max') || '',
    brands: searchParams.getAll('brand') || [],
    inStock: searchParams.get('in_stock') === 'true',
    vegetarian: searchParams.get('vegetarian') === 'true',
    sortBy: searchParams.get('sort') || 'popularity',
  });

  // Get filtered products
  const getFilteredProducts = () => {
    let filtered = category 
      ? products.filter(p => p.categoryId === category.id)
      : products;

    // Search filter
    if (filters.search) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        p.brand?.toLowerCase().includes(filters.search.toLowerCase()) ||
        p.tags?.some(tag => tag.toLowerCase().includes(filters.search.toLowerCase()))
      );
    }

    // Price filters
    if (filters.priceMin) {
      filtered = filtered.filter(p => p.price >= parseFloat(filters.priceMin));
    }
    if (filters.priceMax) {
      filtered = filtered.filter(p => p.price <= parseFloat(filters.priceMax));
    }

    // Brand filter
    if (filters.brands.length > 0) {
      filtered = filtered.filter(p => p.brand && filters.brands.includes(p.brand));
    }

    // Stock filter
    if (filters.inStock) {
      filtered = filtered.filter(p => p.inStock);
    }

    // Vegetarian filter
    if (filters.vegetarian) {
      filtered = filtered.filter(p => p.isVegetarian);
    }

    // Sort
    switch (filters.sortBy) {
      case 'price_low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price_high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'discount':
        filtered.sort((a, b) => b.discount - a.discount);
        break;
      default: // popularity
        filtered.sort((a, b) => (b.tags?.includes('bestseller') ? 1 : 0) - (a.tags?.includes('bestseller') ? 1 : 0));
    }

    return filtered;
  };

  const filteredProducts = getFilteredProducts();
  const availableBrands = [...new Set(products.filter(p => p.brand).map(p => p.brand))];

  const updateFilter = (key: string, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    
    // Update URL params
    const newSearchParams = new URLSearchParams();
    Object.entries(newFilters).forEach(([k, v]) => {
      if (Array.isArray(v)) {
        v.forEach(item => newSearchParams.append(k.replace('brands', 'brand'), item));
      } else if (v && v !== '') {
        newSearchParams.set(k.replace('sortBy', 'sort').replace('priceMin', 'price_min').replace('priceMax', 'price_max'), v.toString());
      }
    });
    setSearchParams(newSearchParams);
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      priceMin: '',
      priceMax: '',
      brands: [],
      inStock: false,
      vegetarian: false,
      sortBy: 'popularity',
    });
    setSearchParams({});
  };

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Search */}
      <div>
        <label className="text-sm font-medium mb-2 block">Search Products</label>
        <Input
          placeholder="Search in this category..."
          value={filters.search}
          onChange={(e) => updateFilter('search', e.target.value)}
        />
      </div>

      {/* Price Range */}
      <div>
        <label className="text-sm font-medium mb-2 block">Price Range</label>
        <div className="flex space-x-2">
          <Input
            placeholder="Min"
            type="number"
            value={filters.priceMin}
            onChange={(e) => updateFilter('priceMin', e.target.value)}
          />
          <Input
            placeholder="Max"
            type="number"
            value={filters.priceMax}
            onChange={(e) => updateFilter('priceMax', e.target.value)}
          />
        </div>
      </div>

      {/* Brands */}
      {availableBrands.length > 0 && (
        <div>
          <label className="text-sm font-medium mb-2 block">Brands</label>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {availableBrands.map((brand) => (
              <div key={brand} className="flex items-center space-x-2">
                <Checkbox
                  id={`brand-${brand}`}
                  checked={filters.brands.includes(brand)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      updateFilter('brands', [...filters.brands, brand]);
                    } else {
                      updateFilter('brands', filters.brands.filter(b => b !== brand));
                    }
                  }}
                />
                <label htmlFor={`brand-${brand}`} className="text-sm">
                  {brand}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Other Filters */}
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="in-stock"
            checked={filters.inStock}
            onCheckedChange={(checked) => updateFilter('inStock', checked)}
          />
          <label htmlFor="in-stock" className="text-sm">In Stock Only</label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="vegetarian"
            checked={filters.vegetarian}
            onCheckedChange={(checked) => updateFilter('vegetarian', checked)}
          />
          <label htmlFor="vegetarian" className="text-sm">Vegetarian Only</label>
        </div>
      </div>

      <Button variant="outline" onClick={clearFilters} className="w-full">
        Clear All Filters
      </Button>
    </div>
  );

  if (!category && slug !== 'all') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Category not found</h2>
          <Button asChild className="btn-hero">
            <a href="/">Go Home</a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            {category?.name || 'All Products'} 
            <Badge variant="secondary" className="ml-2">
              {filteredProducts.length} items
            </Badge>
          </h1>
          {category?.description && (
            <p className="text-muted-foreground">{category.description}</p>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Filters */}
          <div className="hidden lg:block">
            <div className="sticky top-24">
              <div className="flex items-center space-x-2 mb-4">
                <Filter className="h-5 w-5" />
                <h3 className="font-semibold">Filters</h3>
              </div>
              <FilterContent />
            </div>
          </div>

          {/* Products */}
          <div className="lg:col-span-3">
            {/* Sort and View Controls */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                {/* Mobile Filter Trigger */}
                <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="lg:hidden">
                      <SlidersHorizontal className="h-4 w-4 mr-2" />
                      Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80">
                    <SheetHeader>
                      <SheetTitle>Filters</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6">
                      <FilterContent />
                    </div>
                  </SheetContent>
                </Sheet>

                {/* Sort */}
                <Select value={filters.sortBy} onValueChange={(value) => updateFilter('sortBy', value)}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popularity">Popularity</SelectItem>
                    <SelectItem value="price_low">Price: Low to High</SelectItem>
                    <SelectItem value="price_high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Customer Rating</SelectItem>
                    <SelectItem value="discount">Discount</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* View Mode */}
              <div className="hidden md:flex items-center space-x-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="icon"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="icon"
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className={
                viewMode === 'grid' 
                  ? "grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4"
                  : "space-y-4"
              }>
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold mb-2">No products found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your filters or search terms
                </p>
                <Button onClick={clearFilters}>Clear Filters</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
