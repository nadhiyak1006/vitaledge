import React from 'react';
import { Lightbulb, AlertCircle, CheckCircle, Heart, Coffee, Wind, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useHealth } from '@/context/HealthContext';

const suggestionIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  '🚨': AlertCircle,
  '⚠️': AlertCircle,
  '✨': CheckCircle,
  default: Lightbulb,
};

const Suggestions: React.FC = () => {
  const { getSuggestions, currentRecord } = useHealth();
  const suggestions = getSuggestions();

  const getIcon = (suggestion: string) => {
    if (suggestion.includes('🚨')) return AlertCircle;
    if (suggestion.includes('⚠️')) return AlertCircle;
    if (suggestion.includes('✨')) return CheckCircle;
    if (suggestion.toLowerCase().includes('breathing')) return Wind;
    if (suggestion.toLowerCase().includes('heart')) return Heart;
    if (suggestion.toLowerCase().includes('rest')) return Coffee;
    return Lightbulb;
  };

  const getCardStyle = (suggestion: string) => {
    if (suggestion.includes('🚨') || suggestion.includes('Medical attention')) {
      return 'bg-health-red-light border-health-red/30';
    }
    if (suggestion.includes('⚠️') || suggestion.includes('Abnormal')) {
      return 'bg-health-yellow-light border-health-yellow/30';
    }
    if (suggestion.includes('✨') || suggestion.includes('Excellent')) {
      return 'bg-health-green-light border-health-green/30';
    }
    return 'bg-secondary/50 border-border';
  };

  const getIconColor = (suggestion: string) => {
    if (suggestion.includes('🚨') || suggestion.includes('Medical attention')) {
      return 'text-health-red';
    }
    if (suggestion.includes('⚠️') || suggestion.includes('Abnormal')) {
      return 'text-health-yellow';
    }
    if (suggestion.includes('✨') || suggestion.includes('Excellent')) {
      return 'text-health-green';
    }
    return 'text-health-teal';
  };

  // Clean suggestion text by removing emojis
  const cleanText = (text: string) => {
    return text.replace(/[🚨⚠️✨]/g, '').trim();
  };

  return (
    <section id="suggestions" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-12 animate-fade-in">
          <span className="inline-block px-4 py-1 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-4">
            AI-Powered
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-foreground">
            Smart <span className="text-gradient">Activity Suggestions</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Personalized recommendations based on your current bio-signal readings.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Card variant="elevated" className="animate-slide-up">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-health-teal" />
                Current Recommendations
              </CardTitle>
              <CardDescription>
                {currentRecord 
                  ? `Based on your reading from ${new Intl.DateTimeFormat('en-US', {
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true,
                    }).format(new Date(currentRecord.timestamp))}`
                  : 'Submit your first bio-signal reading to get personalized suggestions'
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {suggestions.map((suggestion, index) => {
                  const Icon = getIcon(suggestion);
                  return (
                    <div
                      key={index}
                      className={`flex items-start gap-4 p-4 rounded-xl border transition-all duration-200 hover:scale-[1.02] ${getCardStyle(suggestion)} animate-fade-in`}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className={`p-2 rounded-lg bg-card ${getIconColor(suggestion)}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <p className="text-foreground font-medium">{cleanText(suggestion)}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Quick tips */}
              <div className="mt-8 p-4 rounded-xl bg-health-teal-light border border-health-teal/20">
                <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                  <Lightbulb className="h-4 w-4 text-health-teal" />
                  Quick Tips for Better Health
                </h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-health-teal" />
                    Maintain regular bio-signal readings for accurate tracking
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-health-teal" />
                    Take readings at consistent times each day
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-health-teal" />
                    Stay relaxed during measurements for best results
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Suggestions;
