import { memo } from 'react';
import { Heart, Activity, Footprints, Moon, Bell, Calendar, Play, Calculator } from 'lucide-react';
import HealthCard from './HealthCard';
import { healthMetrics, upcomingReminders } from '@/data/mockHealthData';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useHealthData, useCalendarAPI, useHealthVideos } from '@/hooks/useHealthAPI';
import { useNavigate } from 'react-router-dom';

const HealthHub = memo(() => {
  const { heartRate, bloodPressure, steps, sleep } = healthMetrics;
  const navigate = useNavigate();
  const { addEvent } = useCalendarAPI();

  const handleAddToCalendar = async (reminder: any) => {
    try {
      await addEvent({
        title: reminder.medication,
        description: `Medication reminder: ${reminder.dosage}`,
        date: new Date().toISOString().split('T')[0],
        time: reminder.time,
        type: 'medication'
      });
      // You could add a toast notification here
      console.log('Added to calendar:', reminder.medication);
    } catch (error) {
      console.error('Failed to add to calendar:', error);
    }
  };

  const sleepData = [
    { name: 'Deep Sleep', value: 2.2, color: 'hsl(var(--primary))' },
    { name: 'REM Sleep', value: 2.0, color: 'hsl(var(--secondary))' },
    { name: 'Light Sleep', value: 3.0, color: 'hsl(var(--accent))' }
  ];

  const healthVideos = [
    { id: 1, title: '10-Minute Morning Yoga', category: 'Exercise', duration: '10:00' },
    { id: 2, title: 'Healthy Heart Tips', category: 'Education', duration: '5:30' },
    { id: 3, title: 'Meditation for Sleep', category: 'Wellness', duration: '15:00' },
    { id: 4, title: 'Nutrition Basics', category: 'Diet', duration: '8:45' }
  ];

  return (
    <div className="p-6 space-y-8">
      {/* Health Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <HealthCard
          title="Heart Rate"
          value={heartRate.current}
          unit={heartRate.unit}
          status={heartRate.status}
          icon={<Heart className="w-5 h-5" />}
          trend="stable"
        >
          <div className="h-24">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={heartRate.data}>
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={3}
                  dot={false}
                  strokeDasharray="none"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </HealthCard>

        <HealthCard
          title="Blood Pressure"
          value={`${bloodPressure.systolic}/${bloodPressure.diastolic}`}
          unit="mmHg"
          status={bloodPressure.status}
          icon={<Activity className="w-5 h-5" />}
          trend="stable"
        >
          <div className="h-24">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={bloodPressure.data}>
                <Line 
                  type="monotone" 
                  dataKey="systolic" 
                  stroke="hsl(var(--secondary))" 
                  strokeWidth={3}
                  dot={false}
                />
                <Line 
                  type="monotone" 
                  dataKey="diastolic" 
                  stroke="hsl(var(--accent))" 
                  strokeWidth={3}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </HealthCard>

        <HealthCard
          title="Steps Today"
          value={steps.current.toLocaleString()}
          unit={`/ ${steps.goal.toLocaleString()}`}
          status={steps.status}
          icon={<Footprints className="w-5 h-5" />}
          trend="up"
        >
          <div className="h-24">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={steps.data}>
                <Bar 
                  dataKey="steps" 
                  fill="url(#stepsGradient)" 
                  radius={[4, 4, 0, 0]}
                />
                <defs>
                  <linearGradient id="stepsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--primary))" />
                    <stop offset="100%" stopColor="hsl(var(--primary-glow))" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </HealthCard>

        <HealthCard
          title="Sleep Quality"
          value={sleep.current}
          unit="hrs"
          status={sleep.status}
          icon={<Moon className="w-5 h-5" />}
          trend="stable"
        >
          <div className="h-24">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sleepData}
                  cx="50%"
                  cy="50%"
                  innerRadius={15}
                  outerRadius={35}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {sleepData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </HealthCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Today's Schedule */}
        <Card className="card-health">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl">Today's Schedule</CardTitle>
                <p className="text-sm text-muted-foreground">Upcoming reminders and appointments</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingReminders.map((reminder) => (
              <div key={reminder.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-muted/30 to-muted/10 rounded-xl border border-border/50 hover:shadow-md transition-all duration-300">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-accent to-accent-glow flex items-center justify-center">
                    <Bell className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium">{reminder.medication}</h4>
                    <p className="text-sm text-muted-foreground">{reminder.dosage}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                    {reminder.time}
                  </span>
                  <Button size="sm" variant="outline" className="hover:bg-primary/10 hover:border-primary hover:text-primary transition-colors" onClick={(e) => { e.stopPropagation(); handleAddToCalendar(reminder); }}>
                    <Calendar className="w-3 h-3 mr-1" />
                    Add
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Health Videos */}
        <Card className="card-health">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-secondary to-accent flex items-center justify-center">
                <Play className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl">Recommended Videos</CardTitle>
                <p className="text-sm text-muted-foreground">Personalized health content</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {healthVideos.map((video) => (
              <div 
                key={video.id} 
                className="flex items-center gap-4 p-3 rounded-xl hover:bg-muted/30 transition-all duration-300 cursor-pointer group"
              >
                <div className="w-16 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Play className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-sm group-hover:text-primary transition-colors">{video.title}</h4>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="px-2 py-0.5 bg-accent/10 text-accent rounded-full">{video.category}</span>
                    <span>{video.duration}</span>
                  </div>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full mt-4 hover:bg-secondary/10 hover:border-secondary hover:text-secondary transition-colors" onClick={() => navigate('/videos')}>
              <Play className="w-4 h-4 mr-2" />
              View All Videos
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="card-health">
        <CardHeader>
          <CardTitle className="text-xl">Quick Actions</CardTitle>
          <p className="text-sm text-muted-foreground">Access frequently used tools</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button 
              variant="outline" 
              className="h-20 flex-col gap-2 hover:bg-primary/10 hover:border-primary hover:text-primary transition-all duration-300 group"
              onClick={() => navigate('/bmi')}
            >
              <Calculator className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
              <span className="text-sm">BMI Calculator</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex-col gap-2 hover:bg-secondary/10 hover:border-secondary hover:text-secondary transition-all duration-300 group"
              onClick={() => navigate('/symptoms')}
            >
              <Activity className="w-6 h-6 text-secondary group-hover:scale-110 transition-transform" />
              <span className="text-sm">Log Symptoms</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex-col gap-2 hover:bg-accent/10 hover:border-accent hover:text-accent transition-all duration-300 group"
              onClick={() => navigate('/calendar')}
            >
              <Calendar className="w-6 h-6 text-accent group-hover:scale-110 transition-transform" />
              <span className="text-sm">Schedule</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex-col gap-2 hover:bg-primary/10 hover:border-primary hover:text-primary transition-all duration-300 group"
              onClick={() => navigate('/assistant')}
            >
              <Heart className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
              <span className="text-sm">Health Check</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
});

HealthHub.displayName = 'HealthHub';

export default HealthHub;