import { memo } from 'react';
import { Card } from '@/components/ui/card';
import ChatBot from '@/components/ChatBot';

const ChatPage = memo(() => {
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="font-orbitron font-bold text-3xl mb-2">AI Health Assistant</h1>
          <p className="text-muted-foreground">
            Chat with HOPE for personalized health recommendations and medical guidance
          </p>
        </div>
        
        <Card className="card-health">
          <ChatBot />
        </Card>
      </div>
    </div>
  );
});

ChatPage.displayName = 'ChatPage';

export default ChatPage;