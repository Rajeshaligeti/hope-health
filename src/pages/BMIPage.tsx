import { memo } from 'react';
import BMICalculator from '@/components/BMICalculator';

const BMIPage = memo(() => {
  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="p-6 pb-0">
          <h1 className="font-orbitron font-bold text-3xl mb-2">BMI Calculator</h1>
          <p className="text-muted-foreground">
            Calculate your Body Mass Index and get personalized health insights
          </p>
        </div>
        
        <BMICalculator />
      </div>
    </div>
  );
});

BMIPage.displayName = 'BMIPage';

export default BMIPage;