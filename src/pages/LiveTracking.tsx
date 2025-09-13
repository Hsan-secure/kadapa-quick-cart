import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  CheckCircle, 
  Clock, 
  Package, 
  Truck, 
  MapPin, 
  MessageCircle,
  Star,
  X
} from 'lucide-react';
import { toast } from 'sonner';
import { CancelOrderModal } from '@/components/CancelOrderModal';
import { RatingModal } from '@/components/RatingModal';
import { useCart } from '@/context/CartContext';

interface OrderStatus {
  id: string;
  status: 'confirmed' | 'preparing' | 'packed' | 'out_for_delivery' | 'delivered';
  estimatedTime: number;
  currentStep: number;
  deliveryPartner?: {
    name: string;
    phone: string;
    rating: number;
    vehicleNo: string;
  };
  location?: {
    lat: number;
    lng: number;
    address: string;
  };
}

const statusSteps = [
  { id: 'confirmed', label: 'Order Confirmed', icon: CheckCircle, color: 'text-green-500' },
  { id: 'preparing', label: 'Preparing Items', icon: Package, color: 'text-blue-500' },
  { id: 'packed', label: 'Items Packed', icon: Package, color: 'text-purple-500' },
  { id: 'out_for_delivery', label: 'Out for Delivery', icon: Truck, color: 'text-orange-500' },
  { id: 'delivered', label: 'Delivered', icon: CheckCircle, color: 'text-green-600' }
];

export function LiveTracking() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId') || 'QD-' + Date.now();
  const { state, updateOrderStatus } = useCart();
  
  const [orderStatus, setOrderStatus] = useState<OrderStatus>({
    id: orderId,
    status: 'confirmed',
    estimatedTime: 25,
    currentStep: 0
  });

  const [progress, setProgress] = useState(0);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [isCODOrder, setIsCODOrder] = useState(false);

  // Check if this is a COD order
  useEffect(() => {
    const order = state.orders.find(o => o.id === orderId);
    if (order) {
      setIsCODOrder(order.payment.method === 'COD');
    }
  }, [orderId, state.orders]);

  // Simulate real-time order updates
  useEffect(() => {
    const intervals: NodeJS.Timeout[] = [];
    
    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const targetProgress = ((orderStatus.currentStep + 1) / statusSteps.length) * 100;
        if (prev < targetProgress) {
          return Math.min(prev + 2, targetProgress);
        }
        return prev;
      });
    }, 100);
    intervals.push(progressInterval);

    // Status updates simulation
    const statusInterval = setInterval(() => {
      setOrderStatus(prev => {
        if (prev.currentStep < statusSteps.length - 1) {
          const newStep = prev.currentStep + 1;
          const newStatus = statusSteps[newStep].id as OrderStatus['status'];
          
          let updates: Partial<OrderStatus> = {
            currentStep: newStep,
            status: newStatus,
            estimatedTime: Math.max(prev.estimatedTime - 5, 0)
          };

          // Add delivery partner when out for delivery
          if (newStatus === 'out_for_delivery') {
            updates.deliveryPartner = {
              name: 'Rajesh Kumar',
              phone: '+916302829644',
              rating: 4.8,
              vehicleNo: 'AP09XY1234'
            };
            updates.location = {
              lat: 14.4426,
              lng: 78.8245,
              address: 'Near Gandhi Circle, Kadapa'
            };
          }

          // Show toast notification
          toast.success(`Order ${statusSteps[newStep].label}`);
          
          return { ...prev, ...updates };
        }
        return prev;
      });
    }, 8000); // Update every 8 seconds
    intervals.push(statusInterval);

    return () => intervals.forEach(clearInterval);
  }, [orderStatus.currentStep]);

  const getStepStatus = (stepIndex: number) => {
    if (stepIndex < orderStatus.currentStep) return 'completed';
    if (stepIndex === orderStatus.currentStep) return 'current';
    return 'pending';
  };

  const predefinedMessages = [
    'Where is my order currently?',
    'How much more time for delivery?',
    'Can you call me when you reach?',
    'I am not at home, please wait 5 minutes',
    'Please ring the doorbell',
    'Deliver to security guard',
    'Call me before delivery'
  ];

  const handleChatDeliveryPartner = () => {
    if (orderStatus.deliveryPartner) {
      // Show predefined message options
      toast.success(`Chat opened with ${orderStatus.deliveryPartner.name}. Select from quick messages or type your own.`);
    }
  };

  const handleCancelOrder = (reason: string, customReason?: string) => {
    updateOrderStatus(orderId, 'CANCELLED');
    toast.success('Order cancelled successfully');
  };

  const handleRateOrder = (rating: number, review: string) => {
    // In real app, would save rating to backend
    toast.success(`Thank you for rating us ${rating} stars!`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-gradient">
              Live Order Tracking
            </CardTitle>
            <p className="text-muted-foreground">Order ID: {orderId}</p>
            <Badge variant="secondary" className="w-fit mx-auto">
              <Clock className="w-4 h-4 mr-1" />
              ETA: {orderStatus.estimatedTime} min
            </Badge>
          </CardHeader>
        </Card>

        {/* Progress Bar */}
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span>Order Progress</span>
                <span>{Math.round(progress)}% Complete</span>
              </div>
              <Progress value={progress} className="h-3" />
            </div>
          </CardContent>
        </Card>

        {/* Status Steps */}
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-6">
              {statusSteps.map((step, index) => {
                const status = getStepStatus(index);
                const StepIcon = step.icon;
                
                return (
                  <div key={step.id} className="flex items-start space-x-4">
                    <div className={`
                      p-2 rounded-full border-2 transition-all duration-500
                      ${status === 'completed' 
                        ? 'bg-green-100 border-green-500' 
                        : status === 'current'
                        ? 'bg-blue-100 border-blue-500 animate-pulse'
                        : 'bg-gray-100 border-gray-300'
                      }
                    `}>
                      <StepIcon className={`
                        w-5 h-5 transition-colors duration-500
                        ${status === 'completed' 
                          ? 'text-green-600' 
                          : status === 'current'
                          ? 'text-blue-600'
                          : 'text-gray-400'
                        }
                      `} />
                    </div>
                    
                    <div className="flex-1">
                      <p className={`
                        font-medium transition-colors duration-500
                        ${status === 'completed' 
                          ? 'text-green-600' 
                          : status === 'current'
                          ? 'text-blue-600'
                          : 'text-gray-500'
                        }
                      `}>
                        {step.label}
                      </p>
                      
                      {status === 'current' && (
                        <p className="text-sm text-muted-foreground animate-pulse">
                          In progress...
                        </p>
                      )}
                      
                      {status === 'completed' && (
                        <p className="text-sm text-green-600">
                          ✓ Completed
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Delivery Partner Info */}
        {orderStatus.deliveryPartner && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Truck className="w-5 h-5 mr-2 text-orange-500" />
                Delivery Partner
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white font-bold">
                    {orderStatus.deliveryPartner.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold">{orderStatus.deliveryPartner.name}</p>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-500 mr-1" />
                      <span className="text-sm">{orderStatus.deliveryPartner.rating}</span>
                    </div>
                  </div>
                </div>
                <Badge variant="outline">
                  {orderStatus.deliveryPartner.vehicleNo}
                </Badge>
              </div>

              {orderStatus.location && (
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <MapPin className="w-4 h-4 text-blue-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Current Location</p>
                      <p className="text-sm text-muted-foreground">
                        {orderStatus.location.address}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-3">
                <Button 
                  onClick={handleChatDeliveryPartner}
                  className="w-full"
                  variant="outline"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Chat with Delivery Partner
                </Button>
                
                {/* Predefined Messages */}
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-xs font-medium text-blue-800 mb-2">Quick Messages:</p>
                  <div className="grid grid-cols-1 gap-1">
                    {predefinedMessages.slice(0, 3).map((message) => (
                      <button
                        key={message}
                        onClick={() => toast.success(`Message sent: "${message}"`)}
                        className="text-xs text-left p-2 bg-white rounded border border-blue-200 hover:bg-blue-50 transition-colors"
                      >
                        {message}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Cancel Order - Only for COD and early status */}
        {isCODOrder && (orderStatus.status === 'confirmed' || orderStatus.status === 'preparing') && (
          <Card className="border-orange-200 bg-orange-50">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-orange-800">Need to cancel?</p>
                  <p className="text-sm text-orange-600">Available for COD orders during processing</p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => setShowCancelModal(true)}
                  className="border-orange-300 text-orange-700 hover:bg-orange-100"
                >
                  <X className="w-4 h-4 mr-1" />
                  Cancel Order
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Order Complete */}
        {orderStatus.status === 'delivered' && (
          <Card className="border-green-200 bg-green-50">
            <CardContent className="pt-6 text-center">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-green-600 mb-2">
                Order Delivered Successfully!
              </h3>
              <p className="text-green-700 mb-4">
                Thank you for choosing Quick Delivery
              </p>
              <Button 
                className="bg-green-600 hover:bg-green-700"
                onClick={() => setShowRatingModal(true)}
              >
                <Star className="w-4 h-4 mr-2" />
                Rate Your Experience
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Modals */}
        <CancelOrderModal
          isOpen={showCancelModal}
          onClose={() => setShowCancelModal(false)}
          orderId={orderId}
          onCancel={handleCancelOrder}
        />

        <RatingModal
          isOpen={showRatingModal}
          onClose={() => setShowRatingModal(false)}
          orderId={orderId}
          onSubmit={handleRateOrder}
        />
      </div>
    </div>
  );
}