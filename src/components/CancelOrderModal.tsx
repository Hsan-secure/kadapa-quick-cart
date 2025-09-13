import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface CancelOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: string;
  onCancel: (reason: string, customReason?: string) => void;
}

export function CancelOrderModal({ isOpen, onClose, orderId, onCancel }: CancelOrderModalProps) {
  const [selectedReason, setSelectedReason] = useState('');
  const [customReason, setCustomReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const cancellationReasons = [
    'Changed my mind about the order',
    'Found a better price elsewhere',
    'Ordered by mistake',
    'Delivery taking too long',
    'Payment method issue',
    'Need to modify items in order',
    'Emergency - cannot receive delivery',
    'Other (please specify)'
  ];

  const handleCancel = async () => {
    if (!selectedReason) {
      toast.error('Please select a cancellation reason');
      return;
    }

    if (selectedReason === 'Other (please specify)' && !customReason.trim()) {
      toast.error('Please provide a reason for cancellation');
      return;
    }

    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
      onCancel(selectedReason, customReason);
      toast.success('Order cancelled successfully. Refund will be processed within 3-5 business days.');
      onClose();
    } catch (error) {
      toast.error('Failed to cancel order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setSelectedReason('');
    setCustomReason('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-orange-500" />
            Cancel Order
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
            <p className="text-sm text-orange-800">
              <strong>Order ID:</strong> {orderId}
            </p>
            <p className="text-xs text-orange-600 mt-1">
              This order can be cancelled as it's Cash on Delivery and still being processed.
            </p>
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-medium">Please select a reason for cancellation:</Label>
            <RadioGroup value={selectedReason} onValueChange={setSelectedReason}>
              {cancellationReasons.map((reason) => (
                <div key={reason} className="flex items-center space-x-2">
                  <RadioGroupItem value={reason} id={reason} />
                  <Label htmlFor={reason} className="text-sm cursor-pointer flex-1">
                    {reason}
                  </Label>
                </div>
              ))}
            </RadioGroup>

            {selectedReason === 'Other (please specify)' && (
              <div className="space-y-2">
                <Label className="text-sm font-medium">Please specify your reason:</Label>
                <Textarea
                  placeholder="Enter your reason for cancellation..."
                  value={customReason}
                  onChange={(e) => setCustomReason(e.target.value)}
                  rows={3}
                  className="resize-none"
                />
              </div>
            )}
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-xs text-blue-800">
              <strong>Note:</strong> For COD orders, no payment was deducted. For online payments, 
              refunds are processed within 3-5 business days to your original payment method.
            </p>
          </div>

          <div className="flex space-x-3 pt-2">
            <Button
              variant="outline"
              onClick={handleClose}
              className="flex-1"
              disabled={isSubmitting}
            >
              Keep Order
            </Button>
            <Button
              variant="destructive"
              onClick={handleCancel}
              className="flex-1"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Cancelling...' : 'Cancel Order'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}