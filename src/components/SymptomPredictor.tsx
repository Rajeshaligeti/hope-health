import { useState, memo } from 'react';
import { Search, AlertCircle, CheckCircle, Calendar, Pill } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';

interface Symptom {
  id: string;
  name: string;
  severity: number;
}

interface Prediction {
  condition: string;
  probability: number;
  severity: 'low' | 'medium' | 'high';
  recommendations: string[];
  medications?: {
    name: string;
    dosage: string;
    frequency: string;
  }[];
}

const SymptomPredictor = memo(() => {
  const [symptoms, setSymptoms] = useState<Symptom[]>([]);
  const [currentSymptom, setCurrentSymptom] = useState('');
  const [description, setDescription] = useState('');
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const commonSymptoms = [
    'Headache', 'Fever', 'Cough', 'Fatigue', 'Nausea', 'Dizziness', 
    'Chest Pain', 'Shortness of Breath', 'Muscle Pain', 'Sore Throat'
  ];

  const addSymptom = (symptomName: string) => {
    if (symptomName && !symptoms.find(s => s.name.toLowerCase() === symptomName.toLowerCase())) {
      const newSymptom: Symptom = {
        id: Date.now().toString(),
        name: symptomName,
        severity: 5 // Default medium severity
      };
      setSymptoms([...symptoms, newSymptom]);
      setCurrentSymptom('');
    }
  };

  const removeSymptom = (id: string) => {
    setSymptoms(symptoms.filter(s => s.id !== id));
  };

  const updateSeverity = (id: string, severity: number) => {
    setSymptoms(symptoms.map(s => 
      s.id === id ? { ...s, severity } : s
    ));
  };

  const analyzSymptoms = async () => {
    if (symptoms.length === 0) return;
    
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const mockPredictions: Prediction[] = [
        {
          condition: 'Common Cold',
          probability: 85,
          severity: 'low',
          recommendations: [
            'Rest and stay hydrated',
            'Use over-the-counter pain relievers if needed',
            'Monitor symptoms for 7-10 days'
          ],
          medications: [
            { name: 'Acetaminophen', dosage: '500mg', frequency: 'Every 6 hours as needed' },
            { name: 'Throat lozenges', dosage: '1 lozenge', frequency: 'Every 2 hours as needed' }
          ]
        },
        {
          condition: 'Tension Headache',
          probability: 70,
          severity: 'medium',
          recommendations: [
            'Apply cold or warm compress',
            'Practice stress reduction techniques',
            'Maintain regular sleep schedule'
          ],
          medications: [
            { name: 'Ibuprofen', dosage: '400mg', frequency: 'Every 8 hours as needed' }
          ]
        },
        {
          condition: 'Viral Infection',
          probability: 60,
          severity: 'medium',
          recommendations: [
            'Get plenty of rest',
            'Stay well hydrated',
            'Monitor temperature regularly',
            'Consult doctor if symptoms worsen'
          ]
        }
      ];
      
      setPredictions(mockPredictions);
      setIsAnalyzing(false);
    }, 2000);
  };

  const addToCalendar = (medication: any) => {
    // Mock function - would integrate with calendar API
    console.log('Adding to calendar:', medication);
    // Show success message
  };

  const getSeverityColor = (severity: 'low' | 'medium' | 'high') => {
    switch (severity) {
      case 'low': return 'status-good';
      case 'medium': return 'status-warning';
      case 'high': return 'status-critical';
      default: return 'status-good';
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Symptom Input */}
      <Card className="card-health">
        <div className="flex items-center gap-2 mb-4">
          <Search className="w-5 h-5 text-primary" />
          <h2 className="font-orbitron font-semibold text-xl">Symptom Analysis</h2>
        </div>

        <div className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={currentSymptom}
              onChange={(e) => setCurrentSymptom(e.target.value)}
              placeholder="Enter a symptom..."
              className="flex-1"
              onKeyPress={(e) => e.key === 'Enter' && addSymptom(currentSymptom)}
            />
            <Button 
              onClick={() => addSymptom(currentSymptom)}
              className="btn-primary"
            >
              Add
            </Button>
          </div>

          {/* Quick Symptoms */}
          <div className="flex flex-wrap gap-2">
            {commonSymptoms.map((symptom) => (
              <Badge
                key={symptom}
                variant="outline"
                className="cursor-pointer hover:bg-primary/10"
                onClick={() => addSymptom(symptom)}
              >
                {symptom}
              </Badge>
            ))}
          </div>

          {/* Added Symptoms */}
          {symptoms.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-medium">Selected Symptoms:</h3>
              {symptoms.map((symptom) => (
                <div key={symptom.id} className="flex items-center gap-3 p-2 bg-muted/30 rounded-lg">
                  <span className="flex-1">{symptom.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">Severity:</span>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={symptom.severity}
                      onChange={(e) => updateSeverity(symptom.id, parseInt(e.target.value))}
                      className="w-16"
                    />
                    <span className="text-xs w-6">{symptom.severity}</span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => removeSymptom(symptom.id)}
                      className="text-xs"
                    >
                      ×
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe any additional details about your symptoms..."
            className="min-h-[80px]"
          />

          <Button
            onClick={analyzSymptoms}
            disabled={symptoms.length === 0 || isAnalyzing}
            className="btn-primary w-full"
          >
            {isAnalyzing ? 'Analyzing...' : 'Analyze Symptoms'}
          </Button>
        </div>
      </Card>

      {/* Predictions */}
      {predictions.length > 0 && (
        <div className="space-y-4">
          {predictions.map((prediction, index) => (
            <Card key={index} className="card-health">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <AlertCircle className={`w-5 h-5 ${getSeverityColor(prediction.severity)}`} />
                  <h3 className="font-orbitron font-semibold text-lg">{prediction.condition}</h3>
                </div>
                <div className="text-right">
                  <div className={`text-2xl font-bold ${getSeverityColor(prediction.severity)}`}>
                    {prediction.probability}%
                  </div>
                  <div className="text-xs text-muted-foreground">Match</div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    Recommendations
                  </h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    {prediction.recommendations.map((rec, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>

                {prediction.medications && (
                  <div>
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Pill className="w-4 h-4 text-secondary" />
                      Suggested Medications
                    </h4>
                    <div className="space-y-2">
                      {prediction.medications.map((med, i) => (
                        <div key={i} className="flex items-center justify-between p-2 bg-muted/30 rounded-lg">
                          <div>
                            <div className="font-medium">{med.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {med.dosage} - {med.frequency}
                            </div>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => addToCalendar(med)}
                            className="text-xs"
                          >
                            <Calendar className="w-3 h-3 mr-1" />
                            Schedule
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
});

SymptomPredictor.displayName = 'SymptomPredictor';

export default SymptomPredictor;