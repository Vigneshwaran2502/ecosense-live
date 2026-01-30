import { useRef } from 'react';
import { HeroSection } from '@/components/HeroSection';
import { Dashboard } from '@/components/Dashboard';
import { FeaturesSection } from '@/components/FeaturesSection';
import { SystemDiagram } from '@/components/SystemDiagram';
import { Footer } from '@/components/Footer';
import { AlertToast } from '@/components/AlertToast';
import { useMQTT } from '@/hooks/useMQTT';

const Index = () => {
  const dashboardRef = useRef<HTMLElement>(null);
  
  // MQTT hook - currently using simulation
  // To connect to real MQTT broker, pass config:
  // const { data, powerHistory, connectionStatus } = useMQTT({
  //   config: {
  //     brokerUrl: 'wss://your-broker.com:8884/mqtt',
  //     topic: 'ecosense/energy',
  //     username: 'your-username',
  //     password: 'your-password',
  //   },
  // });
  
  const { data, powerHistory, connectionStatus } = useMQTT({
    simulateData: true,
    simulationInterval: 2000,
  });

  const scrollToDashboard = () => {
    dashboardRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Alert System */}
      <AlertToast data={data} />
      
      {/* Hero Section */}
      <HeroSection 
        connectionStatus={connectionStatus} 
        onViewDashboard={scrollToDashboard} 
      />
      
      {/* Live Dashboard */}
      <Dashboard 
        ref={dashboardRef}
        data={data} 
        powerHistory={powerHistory}
        connectionStatus={connectionStatus}
      />
      
      {/* Features */}
      <FeaturesSection />
      
      {/* System Architecture */}
      <SystemDiagram connectionStatus={connectionStatus} />
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
