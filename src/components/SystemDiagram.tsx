import { Cpu, Wifi, Cloud, MonitorDot, ArrowRight } from 'lucide-react';
import type { ConnectionStatus } from '@/types/energy';

interface SystemDiagramProps {
  connectionStatus: ConnectionStatus;
}

const steps = [
  {
    icon: Cpu,
    label: 'Sensor',
    description: 'Current/Voltage',
  },
  {
    icon: Wifi,
    label: 'ESP8266',
    description: 'Edge Processing',
  },
  {
    icon: Cloud,
    label: 'MQTT',
    description: 'Data Stream',
  },
  {
    icon: MonitorDot,
    label: 'Dashboard',
    description: 'Visualization',
  },
];

export function SystemDiagram({ connectionStatus }: SystemDiagramProps) {
  const isConnected = connectionStatus === 'connected';

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-5xl">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            System Architecture
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            End-to-end data flow from sensor to your screen in real-time.
          </p>
        </div>

        {/* Diagram */}
        <div className="glass-card p-8 rounded-2xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.label} className="flex items-center">
                  {/* Step */}
                  <div className="flex flex-col items-center">
                    <div className={`
                      p-4 rounded-xl border-2 transition-all duration-300
                      ${isConnected 
                        ? 'bg-primary/10 border-primary/50 shadow-[0_0_20px_hsl(var(--primary)/0.3)]' 
                        : 'bg-muted/50 border-muted'
                      }
                    `}>
                      <Icon className={`w-8 h-8 ${isConnected ? 'text-primary' : 'text-muted-foreground'}`} />
                    </div>
                    <span className={`mt-3 font-semibold ${isConnected ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {step.label}
                    </span>
                    <span className="text-xs text-muted-foreground mt-1">
                      {step.description}
                    </span>
                  </div>

                  {/* Arrow */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:flex items-center mx-4">
                      <div className={`
                        w-12 h-0.5 transition-all duration-300
                        ${isConnected ? 'bg-primary' : 'bg-muted'}
                      `} />
                      <ArrowRight className={`
                        w-5 h-5 -ml-1 transition-all duration-300
                        ${isConnected ? 'text-primary animate-pulse' : 'text-muted'}
                      `} />
                    </div>
                  )}

                  {/* Mobile Arrow */}
                  {index < steps.length - 1 && (
                    <div className="md:hidden my-2 rotate-90">
                      <ArrowRight className={`
                        w-5 h-5 transition-all duration-300
                        ${isConnected ? 'text-primary animate-pulse' : 'text-muted'}
                      `} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Connection Status */}
          <div className="mt-8 pt-6 border-t border-border flex items-center justify-center gap-3">
            <div className={`
              w-3 h-3 rounded-full transition-all duration-300
              ${isConnected ? 'bg-primary animate-pulse' : 'bg-muted-foreground'}
            `} />
            <span className={`text-sm font-medium ${isConnected ? 'text-primary' : 'text-muted-foreground'}`}>
              {isConnected ? 'Data Pipeline Active' : 'Awaiting Connection'}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
