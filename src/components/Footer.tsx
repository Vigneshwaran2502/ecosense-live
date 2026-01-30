import { Zap, Github, Linkedin, Twitter } from 'lucide-react';

export function Footer() {
  return (
    <footer className="py-16 px-4 border-t border-border bg-gradient-to-b from-muted/20 to-background">
      <div className="container mx-auto max-w-6xl">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10 border border-primary/30">
                <Zap className="w-5 h-5 text-primary" />
              </div>
              <span className="text-xl font-bold text-gradient">EcoSense</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              AI-powered edge energy monitoring system for smart homes and industrial applications. 
              Built with love for a sustainable future.
            </p>
          </div>

          {/* Project Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">About the Project</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>🚀 Hackathon Innovation Project</li>
              <li>⚡ Real-time ESP8266 Integration</li>
              <li>🧠 Edge AI Processing</li>
              <li>🌱 Sustainable Energy Focus</li>
            </ul>
          </div>

          {/* Innovation Highlights */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Innovation</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              EcoSense combines edge computing with machine learning to provide 
              real-time energy analytics without cloud dependency. Our power firewall 
              technology prevents overloads before they happen.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground">
            © 2024 EcoSense. Built for Hackathon.
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a 
              href="#" 
              className="p-2 rounded-lg glass-card hover:bg-primary/10 transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5 text-muted-foreground hover:text-primary" />
            </a>
            <a 
              href="#" 
              className="p-2 rounded-lg glass-card hover:bg-primary/10 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5 text-muted-foreground hover:text-primary" />
            </a>
            <a 
              href="#" 
              className="p-2 rounded-lg glass-card hover:bg-primary/10 transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5 text-muted-foreground hover:text-primary" />
            </a>
          </div>

          <div className="text-sm text-muted-foreground">
            Made with 💚 for a greener planet
          </div>
        </div>
      </div>
    </footer>
  );
}
