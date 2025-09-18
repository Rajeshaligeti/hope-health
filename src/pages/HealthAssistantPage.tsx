import { memo } from 'react';
import HealthAssistant from '@/components/HealthAssistant';

const HealthAssistantPage = memo(() => {
  return (
    <div className="min-h-screen page-enter">
      <div className="max-w-7xl mx-auto">
        <div className="p-6 pb-0">
          <h1 className="font-poppins font-bold text-4xl mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Health Assistant
          </h1>
          <p className="text-muted-foreground text-lg">
            Your intelligent healthcare companion powered by AI
          </p>
        </div>
        
        <HealthAssistant />
      </div>
    </div>
  );
});

HealthAssistantPage.displayName = 'HealthAssistantPage';

export default HealthAssistantPage;