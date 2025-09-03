import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/context/CartContext';
import { allowedPincodes } from '@/data/products';
import { toast } from '@/hooks/use-toast';

export default function CheckoutAddress() {
  const navigate = useNavigate();
  const { state, addAddress, getCartTotal } = useCart();
  const [selectedAddressId, setSelectedAddressId] = useState<string>('');
  const [showNewAddressForm, setShowNewAddressForm] = useState(state.addresses.length === 0);
  
  const [newAddress, setNewAddress] = useState({
    name: '',
    phone: '',
    line1: '',
    line2: '',
    area: '',
    pincode: '',
  });

  const { total } = getCartTotal();

  const validatePhone = (phone: string) => {
    return /^[6-9]\d{9}$/.test(phone);
  };

  const validatePincode = (pincode: string) => {
    return allowedPincodes.includes(pincode);
  };

  const handleSaveAddress = () => {
    // Validation
    if (!newAddress.name.trim()) {
      toast({ title: "Name is required", variant: "destructive" });
      return;
    }
    
    if (!validatePhone(newAddress.phone)) {
      toast({ title: "Please enter a valid 10-digit mobile number", variant: "destructive" });
      return;
    }
    
    if (!newAddress.line1.trim()) {
      toast({ title: "House/Flat number is required", variant: "destructive" });
      return;
    }
    
    if (!newAddress.area.trim()) {
      toast({ title: "Area/Locality is required", variant: "destructive" });
      return;
    }
    
    if (!validatePincode(newAddress.pincode)) {
      toast({
        title: "Delivery not available",
        description: `Sorry, we currently deliver only within Kadapa (${allowedPincodes.join(', ')})`,
        variant: "destructive",
      });
      return;
    }

    const address = {
      id: Date.now().toString(),
      ...newAddress,
      city: 'Kadapa',
    };

    addAddress(address);
    setSelectedAddressId(address.id);
    setShowNewAddressForm(false);
    
    toast({
      title: "Address saved",
      description: "Your address has been saved successfully",
    });
  };

  const handleContinue = () => {
    if (!selectedAddressId) {
      toast({
        title: "Select address",
        description: "Please select a delivery address to continue",
        variant: "destructive",
      });
      return;
    }

    // Store selected address in sessionStorage for the checkout process
    sessionStorage.setItem('selectedAddressId', selectedAddressId);
    navigate('/checkout/payment');
  };

  if (state.items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen bg-muted/30 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="flex items-center space-x-4 mb-8">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/cart')}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Delivery Address</h1>
              <p className="text-muted-foreground">Where should we deliver your groceries?</p>
            </div>
          </div>

          {/* Delivery Info */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Express Delivery</p>
                    <p className="text-sm text-muted-foreground">
                      Expected in 20-35 minutes
                    </p>
                  </div>
                </div>
                <Badge className="gradient-brand text-white">
                  30-min guarantee
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Saved Addresses */}
          {state.addresses.length > 0 && !showNewAddressForm && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Select Address</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowNewAddressForm(true)}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add New
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={selectedAddressId} onValueChange={setSelectedAddressId}>
                  <div className="space-y-4">
                    {state.addresses.map((address) => (
                      <div key={address.id} className="flex items-start space-x-3">
                        <RadioGroupItem value={address.id} id={address.id} />
                        <label htmlFor={address.id} className="flex-1 cursor-pointer">
                          <div className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                            <div className="flex items-center space-x-2 mb-2">
                              <MapPin className="h-4 w-4 text-primary" />
                              <span className="font-medium">{address.name}</span>
                              <Badge variant="secondary">{address.phone}</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {address.line1}, {address.line2 && `${address.line2}, `}
                              {address.area}, {address.city} - {address.pincode}
                            </p>
                          </div>
                        </label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
          )}

          {/* New Address Form */}
          {showNewAddressForm && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Add New Address</span>
                  {state.addresses.length > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowNewAddressForm(false)}
                    >
                      Cancel
                    </Button>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      placeholder="Enter your full name"
                      value={newAddress.name}
                      onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Mobile Number *</Label>
                    <Input
                      id="phone"
                      placeholder="10-digit mobile number"
                      type="tel"
                      maxLength={10}
                      value={newAddress.phone}
                      onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="line1">House/Flat Number *</Label>
                  <Input
                    id="line1"
                    placeholder="House no., Flat no., Building"
                    value={newAddress.line1}
                    onChange={(e) => setNewAddress({ ...newAddress, line1: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="line2">Street/Landmark (Optional)</Label>
                  <Input
                    id="line2"
                    placeholder="Street name, Landmark"
                    value={newAddress.line2}
                    onChange={(e) => setNewAddress({ ...newAddress, line2: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="area">Area/Locality *</Label>
                    <Input
                      id="area"
                      placeholder="Area, Locality"
                      value={newAddress.area}
                      onChange={(e) => setNewAddress({ ...newAddress, area: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="pincode">Pincode *</Label>
                    <Input
                      id="pincode"
                      placeholder="Pincode"
                      maxLength={6}
                      value={newAddress.pincode}
                      onChange={(e) => setNewAddress({ ...newAddress, pincode: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value="Kadapa"
                      disabled
                      className="bg-muted"
                    />
                  </div>
                </div>

                <div className="p-4 bg-accent/50 rounded-lg border border-accent">
                  <p className="text-sm text-accent-foreground">
                    <strong>Service Area:</strong> We deliver within Kadapa pincodes: {allowedPincodes.join(', ')}
                  </p>
                </div>

                <Button onClick={handleSaveAddress} className="w-full btn-hero">
                  Save Address & Continue
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Order Summary */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Order Total</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between font-bold text-lg">
                <span>Total Amount</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>

          {/* Continue Button */}
          {!showNewAddressForm && (
            <Button
              onClick={handleContinue}
              disabled={!selectedAddressId}
              className="w-full btn-hero"
            >
              Continue to Payment
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}