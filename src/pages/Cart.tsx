import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/context/CartContext';
import { coupons } from '@/data/products';
import { toast } from '@/hooks/use-toast';

export default function Cart() {
  const { state, updateQuantity, removeItem, applyCoupon, removeCoupon, getCartTotal } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const navigate = useNavigate();
  
  const { subtotal, discount, deliveryFee, gst, total } = getCartTotal();
  
  const handleApplyCoupon = () => {
    if (!couponCode.trim()) return;
    
    const coupon = coupons.find(c => c.code.toLowerCase() === couponCode.toLowerCase());
    if (!coupon) {
      toast({
        title: "Invalid coupon",
        description: "Please check the coupon code and try again",
        variant: "destructive",
      });
      return;
    }
    
    // Check first order only coupons
    if (coupon.firstOrderOnly && state.orders.length > 0) {
      toast({
        title: "Coupon not applicable",
        description: "This coupon is valid only for first orders",
        variant: "destructive",
      });
      return;
    }
    
    let discountAmount = 0;
    if (coupon.type === 'percent') {
      discountAmount = (subtotal * coupon.value) / 100;
      if (coupon.maxDiscount) {
        discountAmount = Math.min(discountAmount, coupon.maxDiscount);
      }
    } else {
      discountAmount = coupon.value;
    }
    
    applyCoupon(coupon.code, discountAmount);
    setCouponCode('');
    
    toast({
      title: "Coupon applied!",
      description: `You saved ₹${discountAmount} with ${coupon.code}`,
    });
  };
  
  if (state.items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <ShoppingBag className="h-24 w-24 text-muted-foreground mx-auto mb-6" />
          <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">
            Your cart is feeling light. Add some Kadapa essentials!
          </p>
          <Button asChild className="btn-hero">
            <Link to="/">Start Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold mb-8">Your Cart</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {state.items.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-4">
                      {/* Product Image */}
                      <div className="w-20 h-20 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm leading-tight mb-1">
                          {item.product.name}
                        </h3>
                        {item.product.brand && (
                          <p className="text-xs text-muted-foreground mb-1">
                            {item.product.brand}
                          </p>
                        )}
                        <p className="text-xs text-muted-foreground mb-2">
                          {item.unit}
                        </p>
                        
                        {/* Price */}
                        <div className="flex items-center space-x-2 mb-3">
                          <span className="font-bold text-primary">₹{item.price}</span>
                          {item.product.mrp > item.price && (
                            <span className="text-xs text-muted-foreground line-through">
                              ₹{item.product.mrp}
                            </span>
                          )}
                        </div>
                        
                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center font-semibold">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      {/* Item Total */}
                      <div className="text-right">
                        <p className="font-bold">₹{(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* Order Summary */}
            <div className="space-y-6">
              {/* Coupon */}
              <Card>
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <Tag className="h-5 w-5" />
                    <span>Apply Coupon</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {state.appliedCoupon ? (
                    <div className="flex items-center justify-between p-3 bg-success/10 rounded-lg border border-success/20">
                      <div>
                        <Badge className="bg-success text-success-foreground mb-1">
                          {state.appliedCoupon}
                        </Badge>
                        <p className="text-sm text-success">
                          Coupon applied! You saved ₹{discount}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={removeCoupon}
                        className="text-success hover:text-success hover:bg-success/10"
                      >
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex space-x-2">
                        <Input
                          placeholder="Enter coupon code"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                        />
                        <Button onClick={handleApplyCoupon}>Apply</Button>
                      </div>
                      
                      <div className="space-y-2">
                        <p className="text-sm font-medium">Available coupons:</p>
                        {coupons.map((coupon) => (
                          <button
                            key={coupon.code}
                            onClick={() => setCouponCode(coupon.code)}
                            className="w-full text-left p-2 rounded border hover:bg-muted/50 transition-colors"
                          >
                            <div className="flex items-center justify-between">
                              <Badge variant="secondary">{coupon.code}</Badge>
                              <span className="text-xs text-success">
                                {coupon.type === 'percent' 
                                  ? `${coupon.value}% off${coupon.maxDiscount ? ` up to ₹${coupon.maxDiscount}` : ''}`
                                  : `₹${coupon.value} off`
                                }
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                              {coupon.description}
                            </p>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              {/* Bill Summary */}
              <Card>
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg">Bill Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span>Subtotal ({state.items.length} items)</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                  
                  {discount > 0 && (
                    <div className="flex justify-between text-success">
                      <span>Discount</span>
                      <span>-₹{discount.toFixed(2)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span>
                      {deliveryFee > 0 ? `₹${deliveryFee}` : (
                        <span className="text-success">FREE</span>
                      )}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>GST (5%)</span>
                    <span>₹{gst.toFixed(2)}</span>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                  
                  {deliveryFee > 0 && (
                    <p className="text-xs text-muted-foreground">
                      Add ₹{(399 - (subtotal - discount)).toFixed(2)} more for free delivery
                    </p>
                  )}
                  
                  <Button 
                    className="w-full btn-hero mt-4"
                    onClick={() => navigate('/checkout/address')}
                  >
                    Proceed to Checkout
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}