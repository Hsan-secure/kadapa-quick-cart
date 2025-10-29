import { useState } from 'react';
import { X, Send, User, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'partner';
  timestamp: Date;
}

interface DeliveryPartnerChatProps {
  isOpen: boolean;
  onClose: () => void;
  partnerName: string;
}

export function DeliveryPartnerChat({ isOpen, onClose, partnerName }: DeliveryPartnerChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: `Hi! This is ${partnerName}, your delivery partner. I'm on my way with your order. Feel free to send me any instructions!`,
      sender: 'partner',
      timestamp: new Date(),
    },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const quickMessages = [
    'Where is my order currently?',
    'How much more time for delivery?',
    'Can you call me when you reach?',
    'I am not at home, please wait 5 minutes',
    'Please ring the doorbell',
    'Deliver to security guard',
    'Call me before delivery'
  ];

  const getPartnerResponse = (userMessage: string): string => {
    const msg = userMessage.toLowerCase();

    if (msg.includes('where') || msg.includes('location') || msg.includes('currently')) {
      return 'I\'m currently near Gandhi Circle. Will reach your location in about 5-7 minutes!';
    }

    if (msg.includes('time') || msg.includes('when') || msg.includes('how long')) {
      return 'I\'ll be there in approximately 5-10 minutes. Traffic is smooth right now!';
    }

    if (msg.includes('call') || msg.includes('phone')) {
      return 'Sure! I\'ll give you a call once I reach your building entrance.';
    }

    if (msg.includes('wait') || msg.includes('not at home') || msg.includes('busy')) {
      return 'No problem! I can wait for a few minutes. Just let me know when you\'re ready.';
    }

    if (msg.includes('doorbell') || msg.includes('ring') || msg.includes('bell')) {
      return 'Noted! I\'ll ring the doorbell when I arrive.';
    }

    if (msg.includes('security') || msg.includes('guard') || msg.includes('gate')) {
      return 'Understood! I\'ll hand over the order to your security guard with proper verification.';
    }

    if (msg.includes('gate') || msg.includes('entrance') || msg.includes('building')) {
      return 'Sure! I\'ll call you once I reach the main gate/entrance.';
    }

    if (msg.includes('directions') || msg.includes('address') || msg.includes('reach')) {
      return 'I have your address in the app. If you need to provide any specific directions, please share!';
    }

    if (msg.includes('thanks') || msg.includes('thank you')) {
      return 'You\'re welcome! Happy to help. See you soon!';
    }

    return 'Got it! I\'ll make sure to follow your instructions. See you soon!';
  };

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

    // Simulate partner response
    setTimeout(() => {
      const partnerResponse = getPartnerResponse(message);
      const partnerMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: partnerResponse,
        sender: 'partner',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, partnerMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1500);
  };

  const handleQuickMessage = (message: string) => {
    handleSendMessage(message);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md h-[600px] shadow-xl flex flex-col bg-background">
        <CardHeader className="pb-3 border-b">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <div className="h-8 w-8 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white">
                <Truck className="h-4 w-4" />
              </div>
              Chat with {partnerName}
            </CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
          <ScrollArea className="flex-1 px-4 py-3">
            <div className="space-y-4 pr-2">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start space-x-2 ${
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {message.sender === 'partner' && (
                    <div className="h-8 w-8 rounded-full bg-gradient-to-r from-orange-400 to-orange-600 flex items-center justify-center text-white shrink-0">
                      <Truck className="h-4 w-4" />
                    </div>
                  )}
                  <div
                    className={`max-w-[240px] p-3 rounded-lg text-sm ${
                      message.sender === 'user'
                        ? 'bg-primary text-primary-foreground ml-8'
                        : 'bg-muted'
                    }`}
                  >
                    {message.text}
                  </div>
                  {message.sender === 'user' && (
                    <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center shrink-0">
                      <User className="h-4 w-4" />
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex items-start space-x-2">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-r from-orange-400 to-orange-600 flex items-center justify-center text-white">
                    <Truck className="h-4 w-4" />
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

          {/* Quick Messages */}
          <div className="px-4 py-3 border-t bg-muted/30">
            <div className="text-xs font-medium text-muted-foreground mb-2">Quick Messages:</div>
            <div className="flex flex-wrap gap-2">
              {quickMessages.slice(0, 4).map((message) => (
                <Button
                  key={message}
                  variant="outline"
                  size="sm"
                  className="text-xs h-auto py-1.5 px-2"
                  onClick={() => handleQuickMessage(message)}
                  disabled={isTyping}
                >
                  {message}
                </Button>
              ))}
            </div>
          </div>

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
                disabled={isTyping}
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
    </div>
  );
}
