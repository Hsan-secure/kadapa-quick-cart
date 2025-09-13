import { useState } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
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

  const quickReplies = [
    'Track my order',
    'Delivery time',
    'Current offers',
    'Return policy',
    'Payment failed',
    'Change address',
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

    // Delivery agent specific queries
    if (msg.includes('delivery agent') || msg.includes('delivery partner') || msg.includes('delivery boy')) {
      return 'I can help you connect with your delivery partner! Available options:\n• Chat with delivery partner (real-time messaging)\n• Quick messages: "Where are you?", "How much time left?", "Call before delivery"\n• Track live location\n• Get delivery partner details (name, rating, vehicle info)\n\nWhat would you like to do?';
    }

    if (msg.includes('chat with') || msg.includes('message delivery')) {
      return 'You can chat with your delivery partner using these quick messages:\n📱 "Where is my order currently?"\n⏰ "How much more time for delivery?"\n📞 "Can you call me when you reach?"\n⏳ "I am not at home, please wait 5 minutes"\n🔔 "Please ring the doorbell"\n🏢 "Deliver to security guard"\n\nOr type a custom message. Your delivery partner will respond quickly!';
    }

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

    if (msg.includes('order confirmation') || msg.includes('order placed') || msg.includes('order receipt')) {
      return 'Order confirmations are sent via SMS and email immediately after placing your order. Please check your spam folder if you don\'t see it. Your order ID format is ORD followed by 6 digits.';
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

    // Product and availability
    if (msg.includes('out of stock') || msg.includes('not available') || msg.includes('stock')) {
      return 'If an item shows "Out of Stock", we\'ll restock within 2-4 hours typically. You can enable notifications for the product to get alerted when it\'s back in stock. Any alternative suggestions?';
    }

    if (msg.includes('fresh products') || msg.includes('quality') || msg.includes('expiry')) {
      return 'We guarantee fresh products with at least 2 days of shelf life for perishables. All items are quality-checked before dispatch. Not satisfied? Return within 2 hours for fresh products!';
    }

    if (msg.includes('replacement') || msg.includes('substitute')) {
      return 'If any item is unavailable, we\'ll call you before replacing it with a similar product. You can also set replacement preferences in your cart - "No replacement" or "Smart replacement".';
    }

    // Payment and billing
    if (msg.includes('payment') || msg.includes('cod') || msg.includes('upi') || msg.includes('card') || msg.includes('failed')) {
      return 'We accept UPI, Cards, Net Banking, and Cash on Delivery (COD). Payment failures are rare, but if they occur, your amount is auto-refunded within 2-3 business days. Need help with a specific payment issue?';
    }

    if (msg.includes('bill') || msg.includes('invoice') || msg.includes('receipt')) {
      return 'Your detailed bill/invoice is sent via email after delivery completion. It includes item-wise pricing, taxes, discounts, and delivery charges. Need a copy of a previous bill?';
    }

    if (msg.includes('refund') || msg.includes('money back')) {
      return 'Refunds are processed within 3-5 business days to your original payment method. For COD orders, we can process bank transfers. Refund status can be tracked with your order ID.';
    }

    // Offers and discounts
    if (msg.includes('discount') || msg.includes('offer') || msg.includes('coupon') || msg.includes('promo')) {
      return '🎉 Current offers: KADAPA10 (10% off, max ₹50), FIRST30 (₹30 off on first order), BULK50 (₹50 off on orders above ₹999). Check the app for today\'s flash deals and category-specific offers!';
    }

    if (msg.includes('wallet') || msg.includes('cashback')) {
      return 'Earn 1% cashback on every order in your Quick Delivery wallet! Wallet money can be used for future purchases and never expires. Check your wallet balance in the app.';
    }

    // Service area and delivery
    if (msg.includes('area') || msg.includes('location') || msg.includes('pincode') || msg.includes('deliver')) {
      return 'We deliver across Kadapa city (pincodes: 516001, 516002, 516003, 516004). Planning to expand to Rayachoti, Jammalamadugu, and Pulivendula soon! Enter your pincode in the app to check serviceability.';
    }

    // Returns and complaints
    if (msg.includes('return') || msg.includes('complaint') || msg.includes('problem') || msg.includes('issue')) {
      return 'Issues with your order? Fresh products: 2-hour return window. Packaged goods: 24-hour return for unopened items. Damaged/wrong items: Full refund guaranteed. Share your order ID for immediate assistance.';
    }

    if (msg.includes('customer care') || msg.includes('support') || msg.includes('helpline')) {
      return 'I\'m here to help! For urgent issues, call our 24/7 helpline: 1800-123-4567. You can also raise a ticket in the app under "Help & Support". Average response time: 15 minutes.';
    }

    // Greetings
    if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey')) {
      return 'Hello! 👋 I\'m your Quick Delivery assistant. I can help you with order tracking, delivery status, returns, offers, and any other questions about your grocery orders. What can I help you with today?';
    }

    if (msg.includes('thanks') || msg.includes('thank you')) {
      return 'You\'re most welcome! 😊 I\'m always here to help with your orders and queries. Feel free to ask anything about your grocery shopping experience with us!';
    }

    // Default response for order-related assistance
    return 'I\'m here to help with your order queries! I can assist you with:\n• Order tracking & status\n• Delivery times & charges\n• Returns & refunds\n• Payment issues\n• Product availability\n• Current offers & coupons\n\nWhat specific help do you need with your order?';
  };

  const handleQuickReply = (reply: string) => {
    handleSendMessage(reply);
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-primary hover:bg-primary-dark shadow-lg z-50"
        size="icon"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-6 right-6 w-80 h-[500px] shadow-xl z-50 flex flex-col bg-background border">
      <CardHeader className="pb-3 border-b">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Bot className="h-5 w-5 text-primary" />
            Order Assistant
          </CardTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
        <ScrollArea className="flex-1 px-4 py-2 max-h-[300px]">
          <div className="space-y-4 pr-2">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start space-x-2 ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {message.sender === 'bot' && (
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Bot className="h-4 w-4 text-primary" />
                  </div>
                )}
                <div
                  className={`max-w-[220px] p-3 rounded-lg text-sm ${
                    message.sender === 'user'
                      ? 'bg-primary text-primary-foreground ml-8'
                      : 'bg-muted'
                  }`}
                >
                  {message.text}
                </div>
                {message.sender === 'user' && (
                  <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center shrink-0">
                    <User className="h-4 w-4 text-secondary-foreground" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-start space-x-2">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
                <div className="bg-muted p-3 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Quick Replies */}
        {messages.length === 1 && (
          <div className="px-4 py-2">
            <div className="text-xs text-muted-foreground mb-2">Quick actions:</div>
            <div className="flex flex-wrap gap-1">
              {quickReplies.slice(0, 3).map((reply) => (
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
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSendMessage(newMessage);
                }
              }}
              className="flex-1"
            />
            <Button
              size="icon"
              onClick={() => handleSendMessage(newMessage)}
              disabled={!newMessage.trim() || isTyping}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}