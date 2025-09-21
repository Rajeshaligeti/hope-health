import { memo } from 'react';
import { Heart, Activity, Footprints, Moon, Bell, Calendar } from 'lucide-react';
import HealthCard from './HealthCard';
import { healthMetrics, upcomingReminders } from '@/data/mockHealthData';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Dashboard = memo(() => {
  const { heartRate, bloodPressure, steps, sleep } = healthMetrics;

  const sleepData = [
    { name: 'Deep Sleep', value: 2.2, color: 'hsl(var(--primary))' },
    { name: 'REM Sleep', value: 2.0, color: 'hsl(var(--secondary))' },
    { name: 'Light Sleep', value: 3.0, color: 'hsl(var(--accent))' }
  ];

  return (
    <div className="p-6 space-y-6">
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
                  strokeWidth={2}
                  dot={false}
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
                  strokeWidth={2}
                  dot={false}
                />
                <Line 
                  type="monotone" 
                  dataKey="diastolic" 
                  stroke="hsl(var(--accent))" 
                  strokeWidth={2}
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
                  fill="hsl(var(--primary))" 
                  radius={[2, 2, 0, 0]}
                />
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

      {/* Upcoming Reminders */}
      <Card className="card-health">
        <div className="flex items-center gap-2 mb-4">
          <Bell className="w-5 h-5 text-primary" />
          <h2 className="font-orbitron font-semibold text-xl">Upcoming Reminders</h2>
        </div>
        
        <div className="space-y-3">
          {upcomingReminders.map((reminder) => (
            <div key={reminder.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div>
                <h3 className="font-medium">{reminder.medication}</h3>
                <p className="text-sm text-muted-foreground">{reminder.dosage}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-primary">{reminder.time}</span>
                <Button size="sm" variant="outline" className="text-xs">
                  <Calendar className="w-3 h-3 mr-1" />
                  Add to Calendar
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
});

Dashboard.displayName = 'Dashboard';

export default Dashboard;