import { memo } from 'react';
import HealthHub from '@/components/HealthHub';

const Index = memo(() => {
  return (
    <div className="min-h-screen page-enter">
      <div className="max-w-7xl mx-auto">
        <div className="p-6 pb-0">
          <h1 className="font-poppins font-bold text-4xl mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Health Hub
          </h1>
          <p className="text-muted-foreground text-lg">
            Your comprehensive health overview with AI-powered insights
          </p>
        </div>
        
        <HealthHub />
      </div>
    </div>
  );
});

Index.displayName = 'Index';

export default Index;
