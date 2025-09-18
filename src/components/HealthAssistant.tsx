import { useState, useRef, useEffect, memo } from 'react';
import { Send, Bot, User, Loader2, Stethoscope, Calculator, Brain, MessageCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useChatAPI, useSymptomsAPI, useBMIAPI } from '@/hooks/useHealthAPI';

interface Message {
  id: string;
  type: 'user' | 'ai';
  message: string;
  timestamp: Date;
}

const HealthAssistant = memo(() => {
  // Chat State
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      message: 'Hello! I\'m your HOPE Health Assistant. I can help you with health questions, analyze symptoms, calculate BMI, and provide personalized health insights. How can I assist you today?',
      timestamp: new Date()
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Symptom Analysis State
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [symptomInput, setSymptomInput] = useState('');
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  // BMI Calculator State
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [bmiResult, setBmiResult] = useState<any>(null);

  // API Hooks
  const { sendMessage, loading: chatLoading } = useChatAPI();
  const { analyzeSymptoms, loading: symptomsLoading } = useSymptomsAPI();
  const { calculateBMI, loading: bmiLoading } = useBMIAPI();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Chat Functions
  const handleSendMessage = async () => {
    if (!chatInput.trim() || chatLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      message: chatInput,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setChatInput('');

    try {
      const response = await sendMessage(chatInput) as { reply: string };
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        message: response.reply,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Chat error:', error);
    }
  };

  // Symptom Analysis Functions
  const addSymptom = () => {
    if (symptomInput.trim() && !symptoms.includes(symptomInput.trim())) {
      setSymptoms([...symptoms, symptomInput.trim()]);
      setSymptomInput('');
    }
  };

  const removeSymptom = (symptom: string) => {
    setSymptoms(symptoms.filter(s => s !== symptom));
  };

  const handleAnalyzeSymptoms = async () => {
    if (symptoms.length === 0) return;

    try {
      const result = await analyzeSymptoms(symptoms) as { conditions: any[] };
      setAnalysisResult(result);
    } catch (error) {
      console.error('Symptom analysis error:', error);
    }
  };

  // BMI Calculator Functions
  const handleCalculateBMI = async () => {
    if (!weight || !height) return;

    try {
      const result = await calculateBMI(parseFloat(weight), parseFloat(height), unit) as { bmi: number; category: string; risk: string };
      setBmiResult(result);
    } catch (error) {
      console.error('BMI calculation error:', error);
    }
  };

  const resetBMI = () => {
    setWeight('');
    setHeight('');
    setBmiResult(null);
  };

  return (
    <div className="p-6">
      <Tabs defaultValue="chat" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-muted/30">
          <TabsTrigger value="chat" className="flex items-center gap-2">
            <MessageCircle className="w-4 h-4" />
            AI Chat
          </TabsTrigger>
          <TabsTrigger value="symptoms" className="flex items-center gap-2">
            <Stethoscope className="w-4 h-4" />
            Symptom Analysis
          </TabsTrigger>
          <TabsTrigger value="bmi" className="flex items-center gap-2">
            <Calculator className="w-4 h-4" />
            BMI Calculator
          </TabsTrigger>
        </TabsList>

        {/* AI Chat Tab */}
        <TabsContent value="chat">
          <Card className="card-health h-[600px] flex flex-col">
            <CardHeader className="border-b border-border/50">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl">HOPE AI Assistant</CardTitle>
                  <p className="text-sm text-muted-foreground">Your intelligent healthcare companion</p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col p-0">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-4 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {message.type === 'ai' && (
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center flex-shrink-0">
                        <Bot className="w-5 h-5 text-white" />
                      </div>
                    )}
                    
                    <div
                      className={`max-w-[80%] p-4 rounded-2xl ${
                        message.type === 'user'
                          ? 'bg-gradient-to-r from-primary to-secondary text-white'
                          : 'bg-muted/50 text-foreground border border-border/50'
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.message}</p>
                      <span className="text-xs opacity-70 mt-2 block">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>

                    {message.type === 'user' && (
                      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                        <User className="w-5 h-5 text-foreground" />
                      </div>
                    )}
                  </div>
                ))}

                {chatLoading && (
                  <div className="flex gap-4 justify-start">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div className="bg-muted/50 p-4 rounded-2xl border border-border/50">
                      <div className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin text-primary" />
                        <span className="text-sm text-muted-foreground">Thinking...</span>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-6 border-t border-border/50">
                <div className="flex gap-3">
                  <Input
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
                    placeholder="Ask about your health, symptoms, or get medical advice..."
                    className="flex-1 rounded-xl"
                    disabled={chatLoading}
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!chatInput.trim() || chatLoading}
                    className="btn-primary px-6"
                  >
                    {chatLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Symptom Analysis Tab */}
        <TabsContent value="symptoms">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="card-health">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-secondary to-accent flex items-center justify-center">
                    <Stethoscope className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Symptom Input</CardTitle>
                    <p className="text-sm text-muted-foreground">Describe your symptoms for AI analysis</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={symptomInput}
                    onChange={(e) => setSymptomInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addSymptom()}
                    placeholder="Enter a symptom (e.g., headache, fever)"
                    className="flex-1"
                  />
                  <Button onClick={addSymptom} variant="outline">
                    Add
                  </Button>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">Current Symptoms:</h4>
                  <div className="flex flex-wrap gap-2">
                    {symptoms.map((symptom) => (
                      <Badge
                        key={symptom}
                        variant="secondary"
                        className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground transition-colors"
                        onClick={() => removeSymptom(symptom)}
                      >
                        {symptom} ×
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={handleAnalyzeSymptoms}
                  disabled={symptoms.length === 0 || symptomsLoading}
                  className="w-full btn-accent"
                >
                  {symptomsLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Brain className="w-4 h-4 mr-2" />
                      Analyze Symptoms
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            <Card className="card-health">
              <CardHeader>
                <CardTitle className="text-xl">Analysis Results</CardTitle>
                <p className="text-sm text-muted-foreground">AI-powered health insights</p>
              </CardHeader>
              <CardContent>
                {analysisResult ? (
                  <div className="space-y-4">
                    <h4 className="font-medium">Possible Conditions:</h4>
                    {analysisResult.conditions.map((condition: any, index: number) => (
                      <div key={index} className="p-4 bg-muted/30 rounded-xl border border-border/50">
                        <div className="flex justify-between items-start mb-2">
                          <h5 className="font-medium">{condition.name}</h5>
                          <Badge variant={condition.severity === 'mild' ? 'secondary' : condition.severity === 'moderate' ? 'default' : 'destructive'}>
                            {Math.round(condition.probability * 100)}%
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Severity: {condition.severity}
                        </p>
                      </div>
                    ))}
                    <div className="p-4 bg-primary/10 rounded-xl border border-primary/20">
                      <p className="text-sm text-primary font-medium">
                        ⚠️ This is AI analysis for informational purposes only. Please consult a healthcare professional for proper diagnosis.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Stethoscope className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Add symptoms above and click "Analyze" to get AI insights</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* BMI Calculator Tab */}
        <TabsContent value="bmi">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="card-health">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-accent to-primary flex items-center justify-center">
                    <Calculator className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">BMI Calculator</CardTitle>
                    <p className="text-sm text-muted-foreground">Calculate your Body Mass Index</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant={unit === 'metric' ? 'default' : 'outline'}
                    onClick={() => setUnit('metric')}
                    className="transition-all duration-300"
                  >
                    Metric
                  </Button>
                  <Button
                    variant={unit === 'imperial' ? 'default' : 'outline'}
                    onClick={() => setUnit('imperial')}
                    className="transition-all duration-300"
                  >
                    Imperial
                  </Button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Weight ({unit === 'metric' ? 'kg' : 'lbs'})
                    </label>
                    <Input
                      type="number"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      placeholder={unit === 'metric' ? '70' : '154'}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Height ({unit === 'metric' ? 'm' : 'in'})
                    </label>
                    <Input
                      type="number"
                      step="0.01"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      placeholder={unit === 'metric' ? '1.75' : '69'}
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={handleCalculateBMI}
                    disabled={!weight || !height || bmiLoading}
                    className="flex-1 btn-primary"
                  >
                    {bmiLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Calculating...
                      </>
                    ) : (
                      'Calculate BMI'
                    )}
                  </Button>
                  <Button variant="outline" onClick={resetBMI}>
                    Reset
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="card-health">
              <CardHeader>
                <CardTitle className="text-xl">BMI Results</CardTitle>
                <p className="text-sm text-muted-foreground">Your health assessment</p>
              </CardHeader>
              <CardContent>
                {bmiResult ? (
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-primary mb-2">
                        {bmiResult.bmi}
                      </div>
                      <Badge variant="secondary" className="text-sm px-4 py-1">
                        {bmiResult.category}
                      </Badge>
                    </div>

                    <div className="space-y-3">
                      <div className="p-4 bg-muted/30 rounded-xl">
                        <h4 className="font-medium mb-2">Health Risk Assessment</h4>
                        <p className="text-sm text-muted-foreground">{bmiResult.risk}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium">BMI Categories</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between p-2 rounded bg-blue-50 dark:bg-blue-950/20">
                          <span>Underweight</span>
                          <span>&lt; 18.5</span>
                        </div>
                        <div className="flex justify-between p-2 rounded bg-green-50 dark:bg-green-950/20">
                          <span>Normal weight</span>
                          <span>18.5 - 24.9</span>
                        </div>
                        <div className="flex justify-between p-2 rounded bg-yellow-50 dark:bg-yellow-950/20">
                          <span>Overweight</span>
                          <span>25 - 29.9</span>
                        </div>
                        <div className="flex justify-between p-2 rounded bg-red-50 dark:bg-red-950/20">
                          <span>Obesity</span>
                          <span>&gt; 30</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Calculator className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Enter your weight and height to calculate BMI</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
});

HealthAssistant.displayName = 'HealthAssistant';

export default HealthAssistant;