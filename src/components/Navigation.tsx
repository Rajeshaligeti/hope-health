import { memo } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, MessageCircle, Stethoscope, Calendar, Calculator, Play, Settings } from 'lucide-react';
import HOPELogo from './HOPELogo';
import { cn } from '@/lib/utils';

const Navigation = memo(() => {
  const navItems = [
    { to: '/', icon: LayoutDashboard, label: 'Health Hub' },
    { to: '/assistant', icon: MessageCircle, label: 'Health Assistant' },
    { to: '/bmi', icon: Calculator, label: 'BMI Calculator' },
    { to: '/symptoms', icon: Stethoscope, label: 'Symptoms' },
    { to: '/calendar', icon: Calendar, label: 'Calendar' },
    { to: '/videos', icon: Play, label: 'Videos' },
    { to: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <nav className="bg-card/80 backdrop-blur-sm border-b border-border/50 px-6 py-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <HOPELogo size="md" />
        
        {/* Navigation Links */}
        <div className="flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-200',
                    'hover:bg-primary/10 hover:text-primary',
                    isActive
                      ? 'bg-gradient-to-r from-primary/20 to-secondary/20 text-primary border border-primary/20'
                      : 'text-muted-foreground'
                  )
                }
              >
                <Icon className="w-4 h-4" />
                <span className="hidden md:inline">{item.label}</span>
              </NavLink>
            );
          })}
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
            <span className="text-white font-medium text-sm">U</span>
          </div>
        </div>
      </div>
    </nav>
  );
});

Navigation.displayName = 'Navigation';

export default Navigation;