import { Button } from "@/components/ui/button";
import { ParticleBackground } from "./ParticleBackground";
import { Zap, Wifi } from "lucide-react";
import type { ConnectionStatus } from "@/types/energy";

interface HeroSectionProps {
  connectionStatus: ConnectionStatus;
  onViewDashboard: () => void;
}

export function HeroSection({ connectionStatus, onViewDashboard }: HeroSectionProps) {
  const getStatusColor = () => {
    switch (connectionStatus) {
      case 'connected':
        return 'text-primary';
      case 'connecting':
        return 'text-warning';
      case 'error':
        return 'text-destructive';
      default:
        return 'text-muted-foreground';
    }
  };

  const getStatusText = () => {
    switch (connectionStatus) {
      case 'connected':
        return 'Live Data Active';
      case 'connecting':
        return 'Connecting...';
      case 'error':
        return 'Connection Error';
      default:
        return 'Disconnected';
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <ParticleBackground />
      
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="relative z-10 container mx-auto px-4 text-center">
        {/* Logo/Icon */}
        <div className="mb-8 animate-fade-up" style={{ animationDelay: '0.1s' }}>
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10 border border-primary/30 glow-button">
            <Zap className="w-10 h-10 text-primary" />
          </div>
        </div>

        {/* Title */}
        <h1 
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-up"
          style={{ animationDelay: '0.2s' }}
        >
          <span className="text-gradient">EcoSense</span>
          <span className="block text-foreground mt-2">Smart Energy Intelligence</span>
        </h1>

        {/* Subtitle */}
        <p 
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-fade-up"
          style={{ animationDelay: '0.3s' }}
        >
          AI-powered Edge Energy Monitoring System for real-time power analysis, 
          anomaly detection, and intelligent energy optimization.
        </p>

        {/* Connection Status */}
        <div 
          className="flex items-center justify-center gap-2 mb-8 animate-fade-up"
          style={{ animationDelay: '0.4s' }}
        >
          <div className={`flex items-center gap-2 px-4 py-2 rounded-full glass-card ${getStatusColor()}`}>
            <Wifi className={`w-4 h-4 ${connectionStatus === 'connected' ? 'animate-pulse-slow' : ''}`} />
            <span className="text-sm font-medium">{getStatusText()}</span>
            {connectionStatus === 'connected' && (
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            )}
          </div>
        </div>

        {/* CTA Button */}
        <div className="animate-fade-up" style={{ animationDelay: '0.5s' }}>
          <Button 
            size="lg" 
            onClick={onViewDashboard}
            className="glow-button bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-6 text-lg rounded-xl"
          >
            View Live Dashboard
          </Button>
        </div>

        {/* Quick Stats Preview */}
        <div 
          className="mt-16 grid grid-cols-3 gap-4 max-w-md mx-auto animate-fade-up"
          style={{ animationDelay: '0.6s' }}
        >
          <div className="glass-card p-4 rounded-xl">
            <div className="text-2xl font-bold text-primary">24/7</div>
            <div className="text-xs text-muted-foreground">Monitoring</div>
          </div>
          <div className="glass-card p-4 rounded-xl">
            <div className="text-2xl font-bold text-secondary">Edge AI</div>
            <div className="text-xs text-muted-foreground">Processing</div>
          </div>
          <div className="glass-card p-4 rounded-xl">
            <div className="text-2xl font-bold text-primary">&lt;1ms</div>
            <div className="text-xs text-muted-foreground">Latency</div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
          <div className="w-1 h-2 rounded-full bg-primary animate-pulse" />
        </div>
      </div>
    </section>
  );
}
