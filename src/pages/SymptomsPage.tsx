import { memo } from 'react';
import SymptomPredictor from '@/components/SymptomPredictor';

const SymptomsPage = memo(() => {
  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="p-6 pb-0">
          <h1 className="font-orbitron font-bold text-3xl mb-2">Symptom Analysis</h1>
          <p className="text-muted-foreground">
            Enter your symptoms to get AI-powered health insights and recommendations
          </p>
        </div>
        
        <SymptomPredictor />
      </div>
    </div>
  );
});

SymptomsPage.displayName = 'SymptomsPage';

export default SymptomsPage;