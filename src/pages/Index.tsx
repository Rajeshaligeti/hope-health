import { memo } from 'react';
import Dashboard from '@/components/Dashboard';

const Index = memo(() => {
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="p-6 pb-0">
          <h1 className="font-orbitron font-bold text-3xl mb-2">Health Dashboard</h1>
          <p className="text-muted-foreground">
            Your comprehensive health overview powered by AI insights
          </p>
        </div>
        
        <Dashboard />
      </div>
    </div>
  );
});

Index.displayName = 'Index';

export default Index;
