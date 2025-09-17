import { ReactNode } from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface HealthCardProps {
  title: string;
  value: string | number;
  unit?: string;
  status?: 'excellent' | 'good' | 'warning' | 'critical';
  icon?: ReactNode;
  trend?: 'up' | 'down' | 'stable';
  children?: ReactNode;
  className?: string;
}

const HealthCard = ({
  title,
  value,
  unit,
  status = 'good',
  icon,
  trend,
  children,
  className
}: HealthCardProps) => {
  const statusClasses = {
    excellent: 'status-excellent',
    good: 'status-good', 
    warning: 'status-warning',
    critical: 'status-critical'
  };

  const trendIcons = {
    up: '↗',
    down: '↘',
    stable: '→'
  };

  return (
    <Card className={cn('card-health', className)}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {icon && <div className="text-primary">{icon}</div>}
          <h3 className="font-inter font-medium text-muted-foreground">{title}</h3>
        </div>
        {trend && (
          <span className={`text-sm ${statusClasses[status]}`}>
            {trendIcons[trend]}
          </span>
        )}
      </div>
      
      <div className="flex items-baseline gap-2 mb-4">
        <span className={`text-3xl font-orbitron font-bold ${statusClasses[status]}`}>
          {value}
        </span>
        {unit && (
          <span className="text-sm text-muted-foreground font-medium">{unit}</span>
        )}
      </div>

      {children}
    </Card>
  );
};

export default HealthCard;