import { useState, useEffect } from 'react';
import { X, Minus, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface RemovalAnimationProps {
  item: {
    id: string;
    name: string;
    image: string;
    quantity: number;
  };
  onConfirm: () => void;
  onCancel: () => void;
}

export function RemovalAnimation({ item, onConfirm, onCancel }: RemovalAnimationProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleConfirm = () => {
    setIsVisible(false);
    setTimeout(onConfirm, 300);
  };

  const handleCancel = () => {
    setIsVisible(false);
    setTimeout(onCancel, 300);
  };

  return (
    <div className={`fixed inset-0 bg-black/50 flex items-center justify-center z-50 transition-opacity duration-300 ${
      isVisible ? 'opacity-100' : 'opacity-0'
    }`}>
      <Card className={`max-w-sm mx-4 p-6 transform transition-all duration-300 ${
        isVisible ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
      }`}>
        <div className="text-center">
          <div className="mx-auto w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
            <AlertCircle className="h-6 w-6 text-destructive" />
          </div>
          
          <h3 className="text-lg font-semibold mb-2">Remove Item?</h3>
          
          <div className="flex items-center space-x-3 mb-4 p-3 bg-muted/50 rounded-lg">
            <img
              src={item.image}
              alt={item.name}
              className="w-12 h-12 object-cover rounded"
            />
            <div className="text-left">
              <p className="font-medium text-sm line-clamp-1">{item.name}</p>
              <p className="text-xs text-muted-foreground">Quantity: {item.quantity}</p>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground mb-6">
            Are you sure you want to remove this item from your cart?
          </p>
          
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={handleCancel}
              className="flex-1"
            >
              Keep Item
            </Button>
            <Button
              variant="destructive"
              onClick={handleConfirm}
              className="flex-1"
            >
              <Minus className="h-4 w-4 mr-1" />
              Remove
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}