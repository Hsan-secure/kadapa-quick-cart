import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Clock, MapPin, Package, Truck, CheckCircle, Phone, MessageSquare, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useCart } from '@/context/CartContext';
import { toast } from '@/hooks/use-toast';

export default function OrderTracking() {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const { state, updateOrderStatus } = useCart();
  const [currentTime, setCurrentTime] = useState(new Date());

  const order = state.orders.find(o => o.id === orderId);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Auto-update order status
  useEffect(() => {
    if (!order || order.status === 'DELIVERED' || order.status === 'CANCELLED') return;

    const orderTime = new Date(order.createdAt).getTime();
    const now = currentTime.getTime();
    const minutesPassed = Math.floor((now - orderTime) / (1000 * 60));

    // Status progression timeline
    if (minutesPassed >= 5 && order.status === 'PLACED') {
      updateOrderStatus(order.id, 'PACKED');
    } else if (minutesPassed >= 10 && order.status === 'PACKED') {
      updateOrderStatus(order.id, 'OUT_FOR_DELIVERY');
    } else if (minutesPassed >= 25 && order.status === 'OUT_FOR_DELIVERY') {
      updateOrderStatus(order.id, 'ARRIVING');
    } else if (minutesPassed >= 30 && order.status === 'ARRIVING') {
      updateOrderStatus(order.id, 'DELIVERED');
    }
  }, [currentTime, order]);

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Order not found</h2>
          <Button asChild className="btn-hero">
            <Link to="/">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }

  const getStatusProgress = (status: string) => {
    switch (status) {
      case 'PLACED': return 20;
      case 'PACKED': return 40;
      case 'OUT_FOR_DELIVERY': return 70;
      case 'ARRIVING': return 90;
      case 'DELIVERED': return 100;
      case 'CANCELLED': return 0;
      default: return 0;
    }
  };

  const getETA = () => {
    if (order.status === 'DELIVERED') return null;
    if (order.status === 'CANCELLED') return null;

    const orderTime = new Date(order.createdAt).getTime();
    const expectedDelivery = orderTime + (order.etaMinutes * 60 * 1000);
    const now = currentTime.getTime();
    const minutesLeft = Math.max(0, Math.ceil((expectedDelivery - now) / (1000 * 60)));

    return minutesLeft;
  };

  const handleCancelOrder = () => {
    if (order.status === 'PLACED') {
      updateOrderStatus(order.id, 'CANCELLED');
      toast({
        title: "Order cancelled",
        description: "Your order has been cancelled successfully",
      });
    } else {
      toast({
        title: "Cannot cancel",
        description: "Order cannot be cancelled after it has been packed",
        variant: "destructive",
      });
    }
  };

  const eta = getETA();
  const progress = getStatusProgress(order.status);

  const statusSteps = [
    { key: 'PLACED', label: 'Order Placed', icon: Package, time: '0 min' },
    { key: 'PACKED', label: 'Packed', icon: Package, time: '5 min' },
    { key: 'OUT_FOR_DELIVERY', label: 'Out for Delivery', icon: Truck, time: '10 min' },
    { key: 'ARRIVING', label: 'Arriving Soon', icon: MapPin, time: '25 min' },
    { key: 'DELIVERED', label: 'Delivered', icon: CheckCircle, time: '30 min' }
  ];

  return (
    <div className="min-h-screen bg-muted/30 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="flex items-center space-x-4 mb-8">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/')}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Track Order</h1>
              <p className="text-muted-foreground">Order ID: {order.id}</p>
            </div>
          </div>

          {/* Status Card */}
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Order Status</CardTitle>
                <Badge
                  className={`${
                    order.status === 'DELIVERED' ? 'bg-success text-success-foreground' :
                    order.status === 'CANCELLED' ? 'bg-destructive text-destructive-foreground' :
                    'gradient-brand text-white'
                  }`}
                >
                  {order.status.replace('_', ' ')}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Progress Bar */}
              <div>
                <Progress value={progress} className="h-3" />
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm text-muted-foreground">
                    {order.status === 'DELIVERED' ? 'Delivered' : 
                     order.status === 'CANCELLED' ? 'Cancelled' : 'In Progress'}
                  </span>
                  {eta !== null && (
                    <div className="flex items-center space-x-1 text-sm">
                      <Clock className="h-4 w-4 text-primary" />
                      <span className="font-medium">
                        {eta > 0 ? `${eta} min left` : 'Arriving any moment!'}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* ETA Banner */}
              {order.status !== 'DELIVERED' && order.status !== 'CANCELLED' && (
                <div className="gradient-brand-soft p-4 rounded-lg text-center">
                  <p className="font-medium mb-1">
                    {eta && eta > 0 ? `Arriving in ${eta} minutes` : 'Arriving any moment!'}
                  </p>
                  <p className="text-sm opacity-90">
                    Our delivery partner is on the way
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Order Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {statusSteps.map((step, index) => {
                  const isCompleted = order.statusUpdates.some(update => update.status === step.key);
                  const isCurrent = order.status === step.key;
                  const updateTime = order.statusUpdates.find(update => update.status === step.key)?.timestamp;

                  return (
                    <div key={step.key} className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        isCompleted || isCurrent ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                      }`}>
                        <step.icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <p className={`font-medium ${isCompleted || isCurrent ? 'text-foreground' : 'text-muted-foreground'}`}>
                          {step.label}
                        </p>
                        {updateTime && (
                          <p className="text-xs text-muted-foreground">
                            {new Date(updateTime).toLocaleString()}
                          </p>
                        )}
                      </div>
                      {!isCompleted && !isCurrent && (
                        <Badge variant="outline" className="text-xs">
                          ~{step.time}
                        </Badge>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Delivery Address */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="h-5 w-5" />
                <span>Delivery Address</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <p className="font-medium">{order.address.name}</p>
                <p className="text-sm text-muted-foreground">
                  {order.address.line1}, {order.address.line2 && `${order.address.line2}, `}
                  {order.address.area}, {order.address.city} - {order.address.pincode}
                </p>
                <Badge variant="secondary" className="mt-2">
                  {order.address.phone}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Order Items */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Order Items ({order.items.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {order.items.map((item) => (
                  <div key={`${item.id}-${item.unit}`} className="flex items-center space-x-3">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-12 h-12 rounded object-cover bg-muted"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-sm">{item.product.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.unit} × {item.quantity}
                      </p>
                    </div>
                    <p className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Bill Summary */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Bill Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{order.subtotal.toFixed(2)}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-success">
                  <span>Discount</span>
                  <span>-₹{order.discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span>{order.deliveryFee > 0 ? `₹${order.deliveryFee}` : 'FREE'}</span>
              </div>
              <div className="flex justify-between">
                <span>GST</span>
                <span>₹{order.gst.toFixed(2)}</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between font-bold text-lg">
                <span>Total Paid</span>
                <span>₹{order.total.toFixed(2)}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <span>Payment:</span>
                <Badge variant="outline">
                  {order.payment.method} {order.payment.ref && `- ${order.payment.ref}`}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {order.status === 'PLACED' && (
              <Button
                variant="destructive"
                onClick={handleCancelOrder}
                className="flex items-center space-x-2"
              >
                <X className="h-4 w-4" />
                <span>Cancel Order</span>
              </Button>
            )}
            
            <Button variant="outline" className="flex items-center space-x-2">
              <Phone className="h-4 w-4" />
              <span>Call Support</span>
            </Button>
            
            <Button variant="outline" className="flex items-center space-x-2">
              <MessageSquare className="h-4 w-4" />
              <span>Chat Support</span>
            </Button>
            
            <Button asChild className="btn-hero">
              <Link to="/">Order Again</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}