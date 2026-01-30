import { 
  Brain, 
  ShieldCheck, 
  Ghost, 
  HardDrive, 
  Gauge 
} from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'Edge AI Filtering',
    description: 'On-device machine learning for real-time anomaly detection without cloud dependency.',
    color: 'text-primary',
  },
  {
    icon: ShieldCheck,
    title: 'Power Firewall Safety',
    description: 'Automatic circuit protection with intelligent load balancing and overload prevention.',
    color: 'text-secondary',
  },
  {
    icon: Ghost,
    title: 'Vampire Power Detection',
    description: 'Identify and eliminate standby power waste from devices that drain energy silently.',
    color: 'text-warning',
  },
  {
    icon: HardDrive,
    title: 'Offline Logging',
    description: 'Continuous data logging even without internet connectivity, syncs when reconnected.',
    color: 'text-primary',
  },
  {
    icon: Gauge,
    title: 'Bandwidth Optimization',
    description: 'Smart data compression and selective transmission to minimize network usage.',
    color: 'text-secondary',
  },
];

export function FeaturesSection() {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Intelligent Features
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Powered by edge computing and advanced AI algorithms for smarter energy management.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="glass-card-hover p-6 rounded-xl animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`p-3 rounded-xl bg-muted/50 w-fit mb-4`}>
                  <Icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
