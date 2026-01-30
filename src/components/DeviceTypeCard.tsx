import { Fan, Cog, Lightbulb, HelpCircle } from 'lucide-react';
import type { EnergyData } from '@/types/energy';

interface DeviceTypeCardProps {
  deviceType: EnergyData['device_type'];
}

export function DeviceTypeCard({ deviceType }: DeviceTypeCardProps) {
  const deviceConfig = {
    Fan: {
      icon: Fan,
      label: 'Fan',
      description: 'Cooling System',
      colorClass: 'text-secondary',
    },
    Motor: {
      icon: Cog,
      label: 'Motor',
      description: 'Industrial Motor',
      colorClass: 'text-primary',
    },
    LED: {
      icon: Lightbulb,
      label: 'LED',
      description: 'Lighting System',
      colorClass: 'text-warning',
    },
    Unknown: {
      icon: HelpCircle,
      label: 'Unknown',
      description: 'Detecting...',
      colorClass: 'text-muted-foreground',
    },
  };

  const device = deviceConfig[deviceType];
  const Icon = device.icon;

  return (
    <div className="glass-card p-6 rounded-xl flex flex-col items-center justify-center">
      <div className={`p-4 rounded-xl bg-muted/50 mb-3 ${deviceType === 'Fan' ? 'animate-spin-slow' : ''}`}>
        <Icon className={`w-10 h-10 ${device.colorClass}`} />
      </div>
      <span className="text-lg font-semibold text-foreground">{device.label}</span>
      <span className="text-sm text-muted-foreground">{device.description}</span>
      <span className="text-xs text-muted-foreground mt-2">Device Type</span>
    </div>
  );
}
