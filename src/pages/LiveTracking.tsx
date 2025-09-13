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
  Phone,
  MessageCircle,
  Star
} from 'lucide-react';
import { toast } from 'sonner';

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
  
  const [orderStatus, setOrderStatus] = useState<OrderStatus>({
    id: orderId,
    status: 'confirmed',
    estimatedTime: 25,
    currentStep: 0
  });

  const [progress, setProgress] = useState(0);

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

  const handleCallDeliveryPartner = () => {
    if (orderStatus.deliveryPartner) {
      toast.success(`Calling ${orderStatus.deliveryPartner.name}...`);
      // In real app, would initiate call
    }
  };

  const handleChatDeliveryPartner = () => {
    if (orderStatus.deliveryPartner) {
      toast.success(`Opening chat with ${orderStatus.deliveryPartner.name}...`);
      // In real app, would open chat interface
    }
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

              <div className="flex space-x-3">
                <Button 
                  onClick={handleCallDeliveryPartner}
                  className="flex-1"
                  variant="outline"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call
                </Button>
                <Button 
                  onClick={handleChatDeliveryPartner}
                  className="flex-1"
                  variant="outline"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Chat
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
              <Button className="bg-green-600 hover:bg-green-700">
                Rate Your Experience
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}