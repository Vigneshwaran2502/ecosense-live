import { Shield, AlertTriangle, AlertCircle } from 'lucide-react';
import type { EnergyData } from '@/types/energy';

interface StatusIndicatorProps {
  status: EnergyData['status'];
  size?: 'sm' | 'md' | 'lg';
}

export function StatusIndicator({ status, size = 'md' }: StatusIndicatorProps) {
  const sizeConfig = {
    sm: { icon: 'w-6 h-6', text: 'text-sm', padding: 'p-3' },
    md: { icon: 'w-8 h-8', text: 'text-base', padding: 'p-4' },
    lg: { icon: 'w-12 h-12', text: 'text-xl', padding: 'p-6' },
  };
  
  const config = sizeConfig[size];
  
  const statusConfig = {
    SAFE: {
      icon: Shield,
      label: 'SAFE',
      colorClass: 'text-primary',
      bgClass: 'bg-primary/10 border-primary/30',
      glowClass: 'shadow-[0_0_20px_hsl(var(--primary)/0.3)]',
    },
    WARNING: {
      icon: AlertTriangle,
      label: 'WARNING',
      colorClass: 'text-warning',
      bgClass: 'bg-warning/10 border-warning/30',
      glowClass: 'shadow-[0_0_20px_hsl(var(--warning)/0.3)]',
    },
    OVERLOAD: {
      icon: AlertCircle,
      label: 'OVERLOAD',
      colorClass: 'text-destructive',
      bgClass: 'bg-destructive/10 border-destructive/30 animate-pulse',
      glowClass: 'shadow-[0_0_20px_hsl(var(--destructive)/0.5)]',
    },
  };
  
  const currentStatus = statusConfig[status];
  const Icon = currentStatus.icon;

  return (
    <div className={`
      flex flex-col items-center justify-center 
      ${config.padding} rounded-xl border
      ${currentStatus.bgClass} ${currentStatus.glowClass}
      transition-all duration-300
    `}>
      <Icon className={`${config.icon} ${currentStatus.colorClass}`} />
      <span className={`${config.text} font-bold mt-2 ${currentStatus.colorClass}`}>
        {currentStatus.label}
      </span>
      <span className="text-xs text-muted-foreground mt-1">System Status</span>
    </div>
  );
}
