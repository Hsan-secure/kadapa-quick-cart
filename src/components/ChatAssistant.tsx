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
      text: 'Hi! I\'m your grocery shopping assistant. I can help you with order queries, product information, delivery status, and more. How can I assist you today?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const quickReplies = [
    'Track my order',
    'Product availability',
    'Delivery charges',
    'Return policy',
    'Payment options',
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

    if (msg.includes('track') || msg.includes('order status') || msg.includes('delivery')) {
      return 'To track your order, please provide your order ID. You can find it in your order confirmation email or SMS. Our typical delivery time is 30 minutes within Kadapa city limits.';
    }

    if (msg.includes('availability') || msg.includes('stock') || msg.includes('product')) {
      return 'You can check product availability by searching for the item on our website. If an item shows as "In Stock", it\'s available for immediate delivery. Would you like me to help you find a specific product?';
    }

    if (msg.includes('delivery charge') || msg.includes('shipping') || msg.includes('free delivery')) {
      return 'We offer free delivery on orders above ₹399. For orders below ₹399, there\'s a delivery charge of ₹25. We deliver within 30 minutes across Kadapa city.';
    }

    if (msg.includes('return') || msg.includes('refund') || msg.includes('exchange')) {
      return 'We have a flexible return policy! You can return fresh products within 2 hours of delivery if you\'re not satisfied. For packaged goods, returns are accepted within 24 hours in unopened condition. Refunds are processed within 3-5 business days.';
    }

    if (msg.includes('payment') || msg.includes('cod') || msg.includes('upi') || msg.includes('card')) {
      return 'We accept multiple payment options: Cash on Delivery (COD), UPI payments, Credit/Debit cards, and digital wallets. All online payments are secure and encrypted.';
    }

    if (msg.includes('discount') || msg.includes('offer') || msg.includes('coupon')) {
      return 'We have great offers! Use code KADAPA10 for 10% off (up to ₹50) or FIRST30 for ₹30 off on your first order. Check our app for daily deals and seasonal offers.';
    }

    if (msg.includes('minimum order') || msg.includes('min order')) {
      return 'There\'s no minimum order value! You can order even a single item. However, for orders below ₹399, a delivery charge of ₹25 applies.';
    }

    if (msg.includes('area') || msg.includes('location') || msg.includes('pincode')) {
      return 'We currently deliver in Kadapa city. Supported pincodes are: 516001, 516002, 516003, 516004. We\'re expanding to more areas soon!';
    }

    if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey')) {
      return 'Hello! Welcome to Quick Delivery. I\'m here to help you with any questions about your grocery shopping. What would you like to know?';
    }

    if (msg.includes('thanks') || msg.includes('thank you')) {
      return 'You\'re welcome! I\'m always here to help. Is there anything else you\'d like to know about our grocery delivery service?';
    }

    // Default response
    return 'I understand you have a question about our grocery delivery service. Could you please be more specific? You can ask about order tracking, product availability, delivery charges, return policy, or any other concerns you might have.';
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
    <Card className="fixed bottom-6 right-6 w-80 h-96 shadow-xl z-50 flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Bot className="h-5 w-5 text-primary" />
            Grocery Assistant
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

      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea className="flex-1 px-4">
          <div className="space-y-4">
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