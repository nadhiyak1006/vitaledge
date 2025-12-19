import React from 'react';
import { Brain, Heart, Hand, Shield, Activity, Zap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const features = [
  {
    icon: Brain,
    title: 'EEG Signal Interpretation',
    description: 'Advanced neural signal processing to detect mental states including relaxation, focus, and emergency conditions.',
    color: 'health-teal',
  },
  {
    icon: Heart,
    title: 'ECG Health Monitoring',
    description: 'Continuous heart rhythm analysis to identify normal patterns and detect potential cardiac abnormalities.',
    color: 'health-red',
  },
  {
    icon: Hand,
    title: 'Contactless Interaction',
    description: 'Non-invasive bio-signal capture enabling seamless communication for physically disabled users.',
    color: 'health-blue',
  },
  {
    icon: Shield,
    title: 'Emergency Detection',
    description: 'Real-time alert system that instantly notifies caregivers when abnormal signals are detected.',
    color: 'health-yellow',
  },
  {
    icon: Activity,
    title: 'Health Scoring',
    description: 'Comprehensive daily health score calculated from EEG and ECG data for easy monitoring.',
    color: 'health-green',
  },
  {
    icon: Zap,
    title: 'Smart Suggestions',
    description: 'AI-powered personalized health recommendations based on current bio-signal readings.',
    color: 'health-purple',
  },
];

const Features: React.FC = () => {
  return (
    <section id="features" className="py-24 bg-background relative">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-4">
            Features
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Comprehensive Healthcare
            <span className="text-gradient"> Technology</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Our system combines cutting-edge bio-signal processing with user-friendly interfaces 
            to provide accessible healthcare monitoring for everyone.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={feature.title} 
              variant="elevated"
              className="group animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-${feature.color}-light mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`h-7 w-7 text-${feature.color}`} />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
