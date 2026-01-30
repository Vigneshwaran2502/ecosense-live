import { forwardRef } from 'react';
import { Zap, Activity } from 'lucide-react';
import { RadialGauge } from './RadialGauge';
import { StatusIndicator } from './StatusIndicator';
import { DeviceTypeCard } from './DeviceTypeCard';
import { PowerChart } from './PowerChart';
import { GreenScoreMeter } from './GreenScoreMeter';
import type { EnergyData, PowerHistoryPoint, ConnectionStatus } from '@/types/energy';

interface DashboardProps {
  data: EnergyData;
  powerHistory: PowerHistoryPoint[];
  connectionStatus: ConnectionStatus;
}

export const Dashboard = forwardRef<HTMLElement, DashboardProps>(
  ({ data, powerHistory, connectionStatus }, ref) => {
    return (
      <section ref={ref} id="dashboard" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-4">
              <Activity className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">Live Monitoring</span>
              {connectionStatus === 'connected' && (
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              )}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Real-Time Dashboard
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Monitor your energy consumption in real-time with AI-powered analytics and instant alerts.
            </p>
          </div>

          {/* Main Gauges Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="glass-card p-6 rounded-xl flex justify-center">
              <RadialGauge
                value={data.voltage}
                min={0}
                max={250}
                unit="V"
                label="Voltage"
                thresholds={{ warning: 90, danger: 95 }}
              />
            </div>
            
            <div className="glass-card p-6 rounded-xl flex justify-center">
              <RadialGauge
                value={data.current}
                min={0}
                max={10}
                unit="A"
                label="Current"
                thresholds={{ warning: 70, danger: 85 }}
              />
            </div>
            
            <div className="glass-card p-6 rounded-xl flex flex-col items-center justify-center">
              <div className="p-4 rounded-xl bg-primary/10 mb-4">
                <Zap className="w-10 h-10 text-primary" />
              </div>
              <div className="text-4xl font-bold text-foreground">
                {data.power.toFixed(1)}
              </div>
              <div className="text-muted-foreground">W</div>
              <div className="text-sm text-muted-foreground mt-2">Power</div>
            </div>
          </div>

          {/* Status Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <StatusIndicator status={data.status} size="md" />
            <DeviceTypeCard deviceType={data.device_type} />
            <GreenScoreMeter data={data} />
          </div>

          {/* Power Chart */}
          <PowerChart data={powerHistory} />
        </div>
      </section>
    );
  }
);

Dashboard.displayName = 'Dashboard';
