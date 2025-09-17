import { useState, useRef, useEffect, memo } from 'react';
import { Send, Bot, User, Loader2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { chatHistory } from '@/data/mockHealthData';

interface Message {
  id: string;
  type: 'user' | 'ai';
  message: string;
  timestamp: Date;
}

const ChatBot = memo(() => {
  const [messages, setMessages] = useState<Message[]>(chatHistory);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      message: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        message: getAIResponse(input),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const getAIResponse = (userInput: string): string => {
    const responses = [
      "Based on your health data, I recommend staying hydrated and maintaining regular exercise. Would you like me to set up a reminder?",
      "I've analyzed your recent symptoms. Consider scheduling a check-up with your doctor if these persist. I can help you find suitable appointment times.",
      "Your vital signs look good overall. For optimal health, focus on consistent sleep schedule and balanced nutrition.",
      "I notice some patterns in your health metrics. Let me suggest some personalized recommendations based on your data.",
      "That's a great question! Based on medical guidelines and your profile, here's what I recommend..."
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full max-h-[600px]">
      {/* Chat Header */}
      <div className="flex items-center gap-3 p-4 border-b border-border/50">
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
          <Bot className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-orbitron font-semibold">HOPE Assistant</h3>
          <p className="text-xs text-muted-foreground">Your AI Healthcare Companion</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {message.type === 'ai' && (
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-white" />
              </div>
            )}
            
            <div
              className={`max-w-[80%] p-3 rounded-2xl ${
                message.type === 'user'
                  ? 'bg-gradient-to-r from-primary to-secondary text-white'
                  : 'bg-muted/50 text-foreground'
              }`}
            >
              <p className="text-sm leading-relaxed">{message.message}</p>
              <span className="text-xs opacity-70 mt-1 block">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>

            {message.type === 'user' && (
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                <User className="w-4 h-4 text-foreground" />
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-3 justify-start">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="bg-muted/50 p-3 rounded-2xl">
              <div className="flex items-center gap-1">
                <span className="animate-typing">●</span>
                <span className="animate-typing" style={{ animationDelay: '0.2s' }}>●</span>
                <span className="animate-typing" style={{ animationDelay: '0.4s' }}>●</span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-border/50">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask HOPE about your health..."
            className="flex-1 rounded-xl border-border/50 focus:border-primary"
            disabled={isTyping}
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="btn-primary px-4"
          >
            {isTyping ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
});

ChatBot.displayName = 'ChatBot';

export default ChatBot;