import React from 'react';
import { ArrowDown, Brain, Heart, Hand } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeroProps {
  onGetStarted: () => void;
}

const Hero: React.FC<HeroProps> = ({ onGetStarted }) => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-health-teal-light via-background to-health-blue-light" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-health-teal/10 rounded-full blur-3xl animate-pulse-ring" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-health-blue/10 rounded-full blur-3xl animate-pulse-ring" style={{ animationDelay: '1s' }} />
      
      {/* Floating icons */}
      <div className="absolute top-1/4 left-1/4 animate-float" style={{ animationDelay: '0s' }}>
        <Brain className="h-12 w-12 text-health-teal/30" />
      </div>
      <div className="absolute top-1/3 right-1/4 animate-float" style={{ animationDelay: '0.5s' }}>
        <Heart className="h-10 w-10 text-health-red/30" />
      </div>
      <div className="absolute bottom-1/3 left-1/3 animate-float" style={{ animationDelay: '1s' }}>
        <Hand className="h-8 w-8 text-health-blue/30" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/80 backdrop-blur-sm border border-border mb-8 animate-fade-in"
            style={{ animationDelay: '0.1s' }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-health-green opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-health-green"></span>
            </span>
            <span className="text-sm font-medium text-muted-foreground">Healthcare Innovation Project</span>
          </div>

          {/* Main heading */}
          <h1 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-slide-up"
            style={{ animationDelay: '0.2s' }}
          >
            <span className="text-foreground">Empowering Independence</span>
            <br />
            <span className="text-gradient">Through Bio-Signals</span>
          </h1>

          {/* Subheading */}
          <p 
            className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-slide-up"
            style={{ animationDelay: '0.4s' }}
          >
            An innovative EEG–ECG based assistive healthcare system designed to help elderly 
            and physically disabled users through contactless bio-signal interaction.
          </p>

          {/* CTA Buttons */}
          <div 
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-slide-up"
            style={{ animationDelay: '0.6s' }}
          >
            <Button variant="hero" size="xl" onClick={onGetStarted}>
              Get Started
              <ArrowDown className="h-5 w-5 ml-2" />
            </Button>
            <Button variant="glass" size="xl" onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}>
              Learn More
            </Button>
          </div>

          {/* Stats */}
          <div 
            className="grid grid-cols-3 gap-8 max-w-2xl mx-auto animate-fade-in"
            style={{ animationDelay: '0.8s' }}
          >
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-health-teal">99.2%</div>
              <div className="text-sm text-muted-foreground">Signal Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-health-blue">24/7</div>
              <div className="text-sm text-muted-foreground">Monitoring</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-health-green">&lt;1s</div>
              <div className="text-sm text-muted-foreground">Response Time</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ArrowDown className="h-6 w-6 text-muted-foreground" />
      </div>
    </section>
  );
};

export default Hero;
