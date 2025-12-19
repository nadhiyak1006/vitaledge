import React from 'react';
import { Heart, Activity, Github, Mail, ExternalLink } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="relative">
                <Heart className="h-8 w-8 text-health-teal" />
                <Activity className="h-4 w-4 text-health-blue absolute -bottom-1 -right-1" />
              </div>
              <span className="font-bold text-xl text-foreground">NeuroVital</span>
            </div>
            <p className="text-muted-foreground text-sm mb-4">
              An innovative EEG–ECG based assistive healthcare system designed to empower 
              elderly and physically disabled users through contactless bio-signal interaction.
            </p>
            <div className="flex gap-3">
              <a 
                href="#" 
                className="p-2 rounded-lg bg-secondary hover:bg-accent transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5 text-muted-foreground" />
              </a>
              <a 
                href="#" 
                className="p-2 rounded-lg bg-secondary hover:bg-accent transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5 text-muted-foreground" />
              </a>
            </div>
          </div>

          {/* SDG Goals */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">UN Sustainable Development Goals</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50">
                <div className="w-10 h-10 rounded-lg bg-health-green flex items-center justify-center text-primary-foreground font-bold text-sm shrink-0">
                  3
                </div>
                <div>
                  <div className="font-medium text-foreground text-sm">Good Health & Well-Being</div>
                  <div className="text-xs text-muted-foreground">Ensuring healthy lives and promoting well-being for all</div>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50">
                <div className="w-10 h-10 rounded-lg bg-health-purple flex items-center justify-center text-primary-foreground font-bold text-sm shrink-0">
                  10
                </div>
                <div>
                  <div className="font-medium text-foreground text-sm">Reduced Inequalities</div>
                  <div className="text-xs text-muted-foreground">Empowering elderly and disabled individuals</div>
                </div>
              </div>
            </div>
          </div>

          {/* Project Info */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">About This Project</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-health-teal" />
                Healthcare Innovation Hackathon Project
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-health-teal" />
                Frontend-only Implementation
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-health-teal" />
                Accessibility-First Design
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-health-teal" />
                Responsive & Mobile-Friendly
              </li>
            </ul>
            <a 
              href="https://sdgs.un.org/goals" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 text-sm text-health-teal hover:underline"
            >
              Learn more about SDGs
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground text-center sm:text-left">
            © {new Date().getFullYear()} NeuroVital Healthcare System. Built for academic evaluation.
          </p>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-health-red animate-heartbeat" />
            <span>for better healthcare</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
