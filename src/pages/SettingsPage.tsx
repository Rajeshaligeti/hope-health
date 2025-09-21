import { memo } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { User, Bell, Shield, Database, Palette } from 'lucide-react';

const SettingsPage = memo(() => {
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="mb-6">
          <h1 className="font-orbitron font-bold text-3xl mb-2">Settings</h1>
          <p className="text-muted-foreground">
            Customize your HOPE experience and manage your health data
          </p>
        </div>

        {/* Profile Settings */}
        <Card className="card-health">
          <div className="flex items-center gap-2 mb-4">
            <User className="w-5 h-5 text-primary" />
            <h2 className="font-orbitron font-semibold text-xl">Profile</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" placeholder="Enter your first name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" placeholder="Enter your last name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Enter your email" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" placeholder="Enter your phone number" />
            </div>
          </div>
          
          <Button className="btn-primary mt-4">Save Profile</Button>
        </Card>

        {/* Notification Settings */}
        <Card className="card-health">
          <div className="flex items-center gap-2 mb-4">
            <Bell className="w-5 h-5 text-secondary" />
            <h2 className="font-orbitron font-semibold text-xl">Notifications</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="medReminders">Medication Reminders</Label>
                <p className="text-sm text-muted-foreground">Get notified about upcoming medications</p>
              </div>
              <Switch id="medReminders" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="appointments">Appointment Alerts</Label>
                <p className="text-sm text-muted-foreground">Receive alerts for scheduled appointments</p>
              </div>
              <Switch id="appointments" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="healthTips">Daily Health Tips</Label>
                <p className="text-sm text-muted-foreground">Get personalized health recommendations</p>
              </div>
              <Switch id="healthTips" />
            </div>
          </div>
        </Card>

        {/* Privacy & Security */}
        <Card className="card-health">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="w-5 h-5 text-accent" />
            <h2 className="font-orbitron font-semibold text-xl">Privacy & Security</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="dataSharing">Anonymous Data Sharing</Label>
                <p className="text-sm text-muted-foreground">Help improve HOPE by sharing anonymized health data</p>
              </div>
              <Switch id="dataSharing" />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="biometric">Biometric Authentication</Label>
                <p className="text-sm text-muted-foreground">Use fingerprint or face recognition for app access</p>
              </div>
              <Switch id="biometric" />
            </div>
            
            <Button variant="outline" className="w-full">
              Change Password
            </Button>
          </div>
        </Card>

        {/* Data Management */}
        <Card className="card-health">
          <div className="flex items-center gap-2 mb-4">
            <Database className="w-5 h-5 text-health-warning" />
            <h2 className="font-orbitron font-semibold text-xl">Data Management</h2>
          </div>
          
          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              Export Health Data
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Import Health Data
            </Button>
            <Button variant="outline" className="w-full justify-start text-destructive hover:text-destructive">
              Delete All Data
            </Button>
          </div>
        </Card>

        {/* App Preferences */}
        <Card className="card-health">
          <div className="flex items-center gap-2 mb-4">
            <Palette className="w-5 h-5 text-primary" />
            <h2 className="font-orbitron font-semibold text-xl">App Preferences</h2>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <select className="w-full p-2 border border-border rounded-lg bg-background">
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
                <option>German</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="units">Measurement Units</Label>
              <select className="w-full p-2 border border-border rounded-lg bg-background">
                <option>Imperial (ft, lbs, °F)</option>
                <option>Metric (cm, kg, °C)</option>
              </select>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
});

SettingsPage.displayName = 'SettingsPage';

export default SettingsPage;