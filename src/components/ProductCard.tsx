import { useState } from 'react';
import { Star, Plus, Minus, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useCart } from '@/context/CartContext';
import { Product } from '@/data/products';
import { toast } from '@/hooks/use-toast';
import { RemovalAnimation } from './RemovalAnimation';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className = '' }: ProductCardProps) {
  const { addItem, updateQuantity, state } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [showRemovalDialog, setShowRemovalDialog] = useState(false);
  
  const cartItem = state.items.find(item => item.id === product.id);
  const quantity = cartItem?.quantity || 0;

  const handleAddToCart = async () => {
    if (!product.inStock) {
      toast({
        title: "Out of stock",
        description: `${product.name} is currently unavailable`,
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      addItem(product, 1);
      toast({
        title: "Added to cart",
        description: `${product.name} added to your cart`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleIncrement = () => {
    if (quantity >= product.stockQty) {
      toast({
        title: "Stock limit reached",
        description: `Only ${product.stockQty} items available`,
        variant: "destructive",
      });
      return;
    }
    
    if (quantity === 0) {
      addItem(product, 1);
    } else {
      updateQuantity(product.id, quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      updateQuantity(product.id, quantity - 1);
    } else if (quantity === 1) {
      setShowRemovalDialog(true);
    }
  };

  const handleRemovalConfirm = () => {
    updateQuantity(product.id, 0);
    setShowRemovalDialog(false);
    toast({
      title: "Item removed",
      description: `${product.name} removed from cart`,
      variant: "default",
    });
  };

  const handleRemovalCancel = () => {
    setShowRemovalDialog(false);
  };

  const discountPercentage = Math.round(((product.mrp - product.price) / product.mrp) * 100);

  return (
    <>
      {showRemovalDialog && (
        <RemovalAnimation
          item={{
            id: product.id,
            name: product.name,
            image: product.image,
            quantity: quantity,
          }}
          onConfirm={handleRemovalConfirm}
          onCancel={handleRemovalCancel}
        />
      )}
      <Card className={`product-card group overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02] ${className}`}>
      <div className="relative aspect-square overflow-hidden bg-muted/10">
        {/* Discount Badge */}
        {discountPercentage > 0 && (
          <Badge className="absolute top-2 left-2 z-10 bg-success text-success-foreground">
            {discountPercentage}% OFF
          </Badge>
        )}
        
        {/* Stock Badge */}
        {!product.inStock && (
          <Badge variant="destructive" className="absolute top-2 right-2 z-10">
            Out of Stock
          </Badge>
        )}
        
        {/* Vegetarian Badge */}
        {product.isVegetarian && (
          <div className="absolute top-2 right-2 z-10 w-4 h-4 border-2 border-success rounded-sm flex items-center justify-center bg-white">
            <div className="w-2 h-2 bg-success rounded-full"></div>
          </div>
        )}

        {/* Product Image */}
        <img
          src={product.image}
          alt={product.name}
          className="product-image w-full h-full object-cover"
          loading="lazy"
        />

        {/* Quick Add Overlay - Desktop */}
        {product.inStock && (
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center md:flex hidden">
            {quantity === 0 ? (
              <Button
                onClick={handleAddToCart}
                disabled={isLoading}
                className="btn-hero"
              >
                <Plus className="h-4 w-4 mr-1" />
                Quick Add
              </Button>
            ) : (
              <div className="flex items-center space-x-2 bg-white rounded-lg p-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleDecrement}
                  className="h-8 w-8"
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="w-8 text-center font-semibold text-sm">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleIncrement}
                  className="h-8 w-8"
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            )}
          </div>
        )}
      </div>

      <CardContent className="p-3">
        {/* Brand */}
        {product.brand && (
          <p className="text-xs text-muted-foreground mb-1">{product.brand}</p>
        )}

        {/* Product Name */}
        <h3 className="font-semibold text-sm leading-tight mb-2 line-clamp-2">
          {product.name}
        </h3>

        {/* Unit */}
        <p className="text-xs text-muted-foreground mb-2">{product.unit}</p>

        {/* Rating */}
        <div className="flex items-center space-x-1 mb-2">
          <div className="flex items-center space-x-1">
            <Star className="h-3 w-3 fill-warning text-warning" />
            <span className="text-xs font-medium">{product.rating}</span>
          </div>
          {product.tags && product.tags.includes('bestseller') && (
            <Badge variant="secondary" className="text-xs px-1 py-0">
              Bestseller
            </Badge>
          )}
        </div>

        {/* Price */}
        <div className="flex items-center space-x-2 mb-3">
          <span className="font-bold text-primary">₹{product.price}</span>
          {product.mrp > product.price && (
            <span className="text-xs text-muted-foreground line-through">₹{product.mrp}</span>
          )}
        </div>

        {/* Add to Cart Button - Mobile */}
        {product.inStock ? (
          quantity === 0 ? (
              <Button
                onClick={handleAddToCart}
                disabled={isLoading}
                className="w-full btn-hero btn-responsive"
                size="sm"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
          ) : (
            <div className="flex items-center justify-center space-x-3 p-2 bg-muted/50 rounded-lg">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleDecrement}
                  className="btn-responsive-icon hover:bg-destructive hover:text-destructive-foreground"
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="font-semibold min-w-[2rem] text-center text-sm sm:text-base">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleIncrement}
                  className="btn-responsive-icon hover:bg-primary hover:text-primary-foreground"
                >
                  <Plus className="h-3 w-3" />
                </Button>
            </div>
          )
        ) : (
          <Button disabled className="w-full" size="sm">
            Out of Stock
          </Button>
        )}

        {/* Stock Info */}
        {product.inStock && product.stockQty <= 10 && (
          <p className="text-xs text-warning mt-1">Only {product.stockQty} left!</p>
        )}
      </CardContent>
    </Card>
    </>
  );
}