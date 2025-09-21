import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Calculator, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BMIResult {
  bmi: number;
  category: string;
  healthRisk: string;
  color: string;
}

const BMICalculator = () => {
  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [result, setResult] = useState<BMIResult | null>(null);

  const calculateBMI = () => {
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);

    if (!weightNum || !heightNum || weightNum <= 0 || heightNum <= 0) {
      return;
    }

    let bmi: number;
    
    if (unit === 'metric') {
      // Weight in kg, height in cm
      const heightInMeters = heightNum / 100;
      bmi = weightNum / (heightInMeters * heightInMeters);
    } else {
      // Weight in lbs, height in inches
      bmi = (weightNum / (heightNum * heightNum)) * 703;
    }

    let category: string;
    let healthRisk: string;
    let color: string;

    if (bmi < 18.5) {
      category = 'Underweight';
      healthRisk = 'May indicate nutritional deficiency';
      color = 'text-[hsl(var(--health-warning))]';
    } else if (bmi < 25) {
      category = 'Normal Weight';
      healthRisk = 'Low risk of health complications';
      color = 'text-[hsl(var(--health-excellent))]';
    } else if (bmi < 30) {
      category = 'Overweight';
      healthRisk = 'Increased risk of health issues';
      color = 'text-[hsl(var(--health-warning))]';
    } else {
      category = 'Obese';
      healthRisk = 'High risk of serious health complications';
      color = 'text-[hsl(var(--health-critical))]';
    }

    setResult({
      bmi: Math.round(bmi * 10) / 10,
      category,
      healthRisk,
      color
    });
  };

  const resetCalculator = () => {
    setWeight('');
    setHeight('');
    setResult(null);
  };

  return (
    <div className="p-6 space-y-6">
      <Card className="card-health max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="p-3 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20">
              <Calculator className="w-6 h-6 text-primary" />
            </div>
            <CardTitle className="text-2xl">BMI Calculator</CardTitle>
          </div>
          <p className="text-muted-foreground">
            Calculate your Body Mass Index to assess your health status
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Unit Selection */}
          <div className="flex gap-2 p-1 bg-muted rounded-lg">
            <Button
              variant={unit === 'metric' ? 'default' : 'ghost'}
              onClick={() => setUnit('metric')}
              className="flex-1"
              size="sm"
            >
              Metric (kg/cm)
            </Button>
            <Button
              variant={unit === 'imperial' ? 'default' : 'ghost'}
              onClick={() => setUnit('imperial')}
              className="flex-1"
              size="sm"
            >
              Imperial (lbs/in)
            </Button>
          </div>

          {/* Input Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="weight">
                Weight ({unit === 'metric' ? 'kg' : 'lbs'})
              </Label>
              <Input
                id="weight"
                type="number"
                placeholder={unit === 'metric' ? 'Enter weight in kg' : 'Enter weight in lbs'}
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="text-center"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="height">
                Height ({unit === 'metric' ? 'cm' : 'inches'})
              </Label>
              <Input
                id="height"
                type="number"
                placeholder={unit === 'metric' ? 'Enter height in cm' : 'Enter height in inches'}
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="text-center"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <Button onClick={calculateBMI} className="flex-1 btn-primary">
              <Activity className="w-4 h-4 mr-2" />
              Calculate BMI
            </Button>
            <Button onClick={resetCalculator} variant="outline" size="default">
              Reset
            </Button>
          </div>

          {/* Results */}
          {result && (
            <Card className="bg-gradient-to-r from-card to-muted/50 border-primary/20">
              <CardContent className="p-6 text-center space-y-4">
                <div className="space-y-2">
                  <div className="text-4xl font-bold font-orbitron text-primary">
                    {result.bmi}
                  </div>
                  <div className="text-sm text-muted-foreground">BMI Score</div>
                </div>
                
                <div className="space-y-2">
                  <div className={cn("text-xl font-semibold", result.color)}>
                    {result.category}
                  </div>
                  <div className="text-sm text-muted-foreground max-w-md mx-auto">
                    {result.healthRisk}
                  </div>
                </div>

                {/* BMI Scale */}
                <div className="mt-6 space-y-2">
                  <div className="text-sm font-medium text-muted-foreground mb-3">BMI Categories</div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex justify-between">
                      <span>Underweight</span>
                      <span className="text-[hsl(var(--health-warning))]">&lt; 18.5</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Normal</span>
                      <span className="text-[hsl(var(--health-excellent))]">18.5 - 24.9</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Overweight</span>
                      <span className="text-[hsl(var(--health-warning))]">25.0 - 29.9</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Obese</span>
                      <span className="text-[hsl(var(--health-critical))]">&ge; 30.0</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BMICalculator;