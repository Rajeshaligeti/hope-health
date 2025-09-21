import { memo } from 'react';
import logoImage from '@/assets/hope-logo.png';

interface HOPELogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const HOPELogo = memo(({ size = 'md', className = '' }: HOPELogoProps) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <img 
        src={logoImage} 
        alt="HOPE Healthcare Logo"
        className={`${sizeClasses[size]} logo-glow animate-float`}
      />
      <span className="font-orbitron font-bold text-2xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
        HOPE
      </span>
    </div>
  );
});

HOPELogo.displayName = 'HOPELogo';

export default HOPELogo;