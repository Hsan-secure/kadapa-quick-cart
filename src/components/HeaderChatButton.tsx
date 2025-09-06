import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Minimize2, Maximize2, Move } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export function HeaderChatButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hi! I\'m your Order Assistant 🛍️ I specialize in helping with order tracking, delivery updates, returns, payments, and all your grocery order queries. How can I help you today?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef<HTMLDivElement>(null);
  const startPos = useRef({ x: 0, y: 0 });

  const quickReplies = [
    'Track my order',
    'Delivery time', 
    'Current offers',
    'Return policy',
    'Payment failed',
    'Change address',
    'Refund status',
    'Reschedule delivery',
    'Delivery partner',
    'Missing items',
    'Wrong items delivered',
    'Product quality issue'
  ];

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: message,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = getBotResponse(message);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const getBotResponse = (userMessage: string): string => {
    const msg = userMessage.toLowerCase();

    // Order tracking and status
    if (msg.includes('track') || msg.includes('order status') || msg.includes('where is my order') || msg.includes('order id')) {
      return 'To track your order, please provide your order ID (e.g., ORD123456). You can find it in your order confirmation email or SMS. I can help you check the real-time status including preparation, dispatch, and estimated delivery time.';
    }

    if (msg.includes('cancel order') || msg.includes('cancel my order')) {
      return 'You can cancel your order within 5 minutes of placing it if it\'s still being prepared. After that, our team starts packing and cancellation may not be possible. Would you like me to help you with the cancellation process?';
    }

    if (msg.includes('modify order') || msg.includes('change order') || msg.includes('add items')) {
      return 'You can modify your order by adding items within 10 minutes of placing it, but removing items might not be possible once packing starts. What changes would you like to make?';
    }

    // Delivery related queries
    if (msg.includes('delivery time') || msg.includes('how long') || msg.includes('when will i get')) {
      return 'Our standard delivery time is 30 minutes within Kadapa city limits. During peak hours (12-2 PM, 7-9 PM), it might take up to 45 minutes. You\'ll receive real-time updates via SMS.';
    }

    if (msg.includes('delivery charge') || msg.includes('shipping') || msg.includes('free delivery')) {
      return 'FREE delivery on orders above ₹399! For orders below ₹399, delivery charge is just ₹25. No hidden fees - what you see is what you pay.';
    }

    if (msg.includes('delivery address') || msg.includes('wrong address') || msg.includes('change address')) {
      return 'You can change your delivery address within 15 minutes of placing the order if it\'s still being prepared. After our delivery partner is assigned, address changes aren\'t possible for security reasons.';
    }

    if (msg.includes('reschedule') || msg.includes('delay delivery') || msg.includes('later')) {
      return 'You can reschedule your delivery up to 2 hours before the estimated time. We offer slots: 9-11 AM, 12-2 PM, 3-5 PM, 6-8 PM, 8-10 PM. Which slot works better for you?';
    }

    if (msg.includes('delivery partner') || msg.includes('delivery boy') || msg.includes('who is delivering')) {
      return 'Once your order is dispatched, you\'ll receive delivery partner details via SMS including name, photo, and contact number. You can track their location in real-time.';
    }

    if (msg.includes('delivery area') || msg.includes('do you deliver') || msg.includes('service area')) {
      return 'We deliver to all areas in Kadapa with pincodes: 516001, 516002, 516003, 516004. Delivery charges may vary for remote locations. Check your pincode availability during checkout.';
    }

    // Product and availability
    if (msg.includes('out of stock') || msg.includes('not available') || msg.includes('stock')) {
      return 'If an item shows "Out of Stock", we\'ll restock within 2-4 hours typically. You can enable notifications for the product to get alerted when it\'s back in stock. Any alternative suggestions?';
    }

    // Payment and billing
    if (msg.includes('payment') || msg.includes('cod') || msg.includes('upi') || msg.includes('card') || msg.includes('failed')) {
      return 'We accept UPI, Cards, Net Banking, and Cash on Delivery (COD). Payment failures are rare, but if they occur, your amount is auto-refunded within 2-3 business days. Need help with a specific payment issue?';
    }

    if (msg.includes('refund') || msg.includes('money back') || msg.includes('refund status')) {
      return 'Refunds are processed within 3-5 business days to your original payment method. For COD orders, we can process bank transfers. Refund status can be tracked with your order ID. Need help tracking a specific refund?';
    }

    if (msg.includes('partial refund') || msg.includes('some items')) {
      return 'Partial refunds are available for damaged/missing items. We refund only for affected items while you keep the rest of your order. Provide order ID and item details for processing.';
    }

    if (msg.includes('refund policy') || msg.includes('return policy')) {
      return 'Our refund policy: Fresh products (2 hours), Dairy (4 hours), Packaged goods (24 hours if unopened). Damaged/wrong items: instant full refund. Opened perishables: case-by-case review.';
    }

    // Offers and discounts
    if (msg.includes('discount') || msg.includes('offer') || msg.includes('coupon') || msg.includes('promo')) {
      return '🎉 Current offers: KADAPA10 (10% off, max ₹50), FIRST30 (₹30 off on first order), BULK50 (₹50 off on orders above ₹999). Check the app for today\'s flash deals and category-specific offers!';
    }

    // Returns and complaints
    if (msg.includes('return') || msg.includes('complaint') || msg.includes('problem') || msg.includes('issue')) {
      return 'Issues with your order? Fresh products: 2-hour return window. Packaged goods: 24-hour return for unopened items. Damaged/wrong items: Full refund guaranteed. Share your order ID for immediate assistance.';
    }

    if (msg.includes('missing items') || msg.includes('items not delivered') || msg.includes('incomplete order')) {
      return 'Missing items from your order? We\'ll immediately dispatch the missing items at no extra cost or provide instant refund. Please share your order ID and list of missing items.';
    }

    if (msg.includes('wrong items') || msg.includes('different product') || msg.includes('incorrect items')) {
      return 'Received wrong items? We\'ll collect them and deliver the correct ones within 30 minutes, or provide full refund. You can keep wrong items if they\'re perishable. Share order details.';
    }

    if (msg.includes('quality') || msg.includes('damaged') || msg.includes('expired') || msg.includes('rotten')) {
      return 'Quality issues are our top priority! For damaged/expired items: instant full refund + replacement. Share photos via WhatsApp (+916302829644) with order ID for fastest resolution.';
    }

    if (msg.includes('delivery delayed') || msg.includes('late delivery') || msg.includes('not delivered')) {
      return 'Delivery running late? We sincerely apologize! For delays beyond promised time: automatic compensation or discount on next order. Track real-time location or call delivery partner directly.';
    }

    // Greetings
    if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey')) {
      return 'Hello! 👋 I\'m your Quick Delivery assistant. I can help you with order tracking, delivery status, returns, offers, and any other questions about your grocery orders. What can I help you with today?';
    }

    if (msg.includes('thanks') || msg.includes('thank you')) {
      return 'You\'re most welcome! 😊 I\'m always here to help with your orders and queries. Feel free to ask anything about your grocery shopping experience with us!';
    }

    // Default response for order-related assistance
    return 'I\'m here to help with your order queries! I can assist you with:\n• Order tracking & status\n• Delivery times & rescheduling\n• Returns & refunds processing\n• Payment issues & failed transactions\n• Missing/wrong/damaged items\n• Quality complaints & replacements\n• Address changes & delivery partner info\n• Current offers & discount coupons\n\nWhat specific help do you need with your order?';
  };

  const handleQuickReply = (reply: string) => {
    handleSendMessage(reply);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    startPos.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    
    const newX = e.clientX - startPos.current.x;
    const newY = e.clientY - startPos.current.y;
    
    // Keep within viewport bounds
    const maxX = window.innerWidth - 320; // 320px is chat width
    const maxY = window.innerHeight - (isMinimized ? 48 : 384); // heights for minimized/expanded
    
    setPosition({
      x: Math.max(0, Math.min(newX, maxX)),
      y: Math.max(0, Math.min(newY, maxY)),
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Add event listeners for mouse events
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging]);

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        variant="outline"
        size="sm"
        className="relative bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20 hover:from-primary/20 hover:to-secondary/20 transition-all duration-300"
      >
        <MessageCircle className="h-4 w-4 mr-2" />
        <span className="hidden sm:inline">Order Help</span>
        <span className="sm:hidden">Help</span>
        <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center bg-success text-success-foreground text-xs">
          !
        </Badge>
      </Button>
    );
  }

  return (
    <Card 
      ref={dragRef}
      className={`fixed shadow-xl z-50 transition-all duration-300 ${
        isMinimized ? 'w-80 h-12' : 'w-80 h-96'
      } ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
      style={{
        top: `${80 + position.y}px`,
        right: `${16 + position.x}px`,
      }}
    >
      <CardHeader className="pb-2" onMouseDown={handleMouseDown}>
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm flex items-center gap-2">
            <Bot className="h-4 w-4 text-primary" />
            Order Assistant
            <Badge variant="secondary" className="text-xs">Online</Badge>
          </CardTitle>
          <div className="flex items-center gap-1">
            <Move className="h-3 w-3 text-muted-foreground cursor-grab" />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMinimized(!isMinimized)}
              className="h-6 w-6"
            >
              {isMinimized ? <Maximize2 className="h-3 w-3" /> : <Minimize2 className="h-3 w-3" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="h-6 w-6"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardHeader>

      {!isMinimized && (
        <CardContent className="flex-1 flex flex-col p-0">
          <div className="flex-1 px-4 max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-muted-foreground/20 scrollbar-track-transparent">
            <div className="space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start space-x-2 ${
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {message.sender === 'bot' && (
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Bot className="h-3 w-3 text-primary" />
                    </div>
                  )}
                  <div
                    className={`max-w-[200px] p-2 rounded-lg text-xs ${
                      message.sender === 'user'
                        ? 'bg-primary text-primary-foreground ml-6'
                        : 'bg-muted'
                    }`}
                  >
                    {message.text}
                  </div>
                  {message.sender === 'user' && (
                    <div className="h-6 w-6 rounded-full bg-secondary flex items-center justify-center shrink-0">
                      <User className="h-3 w-3 text-secondary-foreground" />
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex items-start space-x-2">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <Bot className="h-3 w-3 text-primary" />
                  </div>
                  <div className="bg-muted p-2 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full animate-bounce"></div>
                      <div className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Quick Replies */}
          {messages.length === 1 && (
            <div className="px-4 py-2">
              <div className="text-xs text-muted-foreground mb-2">Quick actions:</div>
              <div className="flex flex-wrap gap-1">
                {quickReplies.slice(0, 4).map((reply) => (
                  <Button
                    key={reply}
                    variant="outline"
                    size="sm"
                    className="text-xs h-6"
                    onClick={() => handleQuickReply(reply)}
                  >
                    {reply}
                  </Button>
                ))}
              </div>
              <div className="flex flex-wrap gap-1 mt-1">
                {quickReplies.slice(4, 8).map((reply) => (
                  <Button
                    key={reply}
                    variant="outline"
                    size="sm"
                    className="text-xs h-6"
                    onClick={() => handleQuickReply(reply)}
                  >
                    {reply}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <Input
                placeholder="Ask about your order..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSendMessage(newMessage);
                  }
                }}
                className="flex-1 text-xs"
                size={8}
              />
              <Button
                size="icon"
                onClick={() => handleSendMessage(newMessage)}
                disabled={!newMessage.trim() || isTyping}
                className="h-8 w-8"
              >
                <Send className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
}