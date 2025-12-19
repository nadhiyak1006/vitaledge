import React from 'react';
import { Activity, TrendingUp, Heart, Brain } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useHealth } from '@/context/HealthContext';

const HealthScore: React.FC = () => {
  const { dailyHealthScore, currentRecord, healthRecords } = useHealth();

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-health-green';
    if (score >= 50) return 'text-health-yellow';
    return 'text-health-red';
  };

  const getScoreGradient = (score: number) => {
    if (score >= 80) return 'from-health-green to-health-teal';
    if (score >= 50) return 'from-health-yellow to-health-green';
    return 'from-health-red to-health-yellow';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    if (score >= 20) return 'Poor';
    return 'Critical';
  };

  // Calculate circumference for circular progress
  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const progress = (dailyHealthScore / 100) * circumference;
  const dashOffset = circumference - progress;

  return (
    <section id="health-score" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-12 animate-fade-in">
          <span className="inline-block px-4 py-1 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-4">
            Health Summary
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-foreground">
            Daily <span className="text-gradient">Health Score</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Your comprehensive health indicator based on EEG and ECG readings.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Circular Progress */}
            <div className="flex justify-center animate-scale-in">
              <div className="relative">
                <svg className="w-64 h-64 transform -rotate-90" viewBox="0 0 200 200">
                  {/* Background circle */}
                  <circle
                    cx="100"
                    cy="100"
                    r={radius}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="12"
                    className="text-secondary"
                  />
                  {/* Progress circle */}
                  <circle
                    cx="100"
                    cy="100"
                    r={radius}
                    fill="none"
                    stroke="url(#scoreGradient)"
                    strokeWidth="12"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={healthRecords.length > 0 ? dashOffset : circumference}
                    className="transition-all duration-1000 ease-out"
                  />
                  <defs>
                    <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" className={`${dailyHealthScore >= 80 ? 'text-health-green' : dailyHealthScore >= 50 ? 'text-health-yellow' : 'text-health-red'}`} stopColor="currentColor" />
                      <stop offset="100%" className="text-health-teal" stopColor="currentColor" />
                    </linearGradient>
                  </defs>
                </svg>
                {/* Center content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className={`text-6xl font-bold ${getScoreColor(dailyHealthScore)}`}>
                    {healthRecords.length > 0 ? dailyHealthScore : '--'}
                  </span>
                  <span className="text-lg text-muted-foreground font-medium">
                    {healthRecords.length > 0 ? getScoreLabel(dailyHealthScore) : 'No Data'}
                  </span>
                </div>
              </div>
            </div>

            {/* Score breakdown */}
            <div className="space-y-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <Card variant="elevated">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Activity className="h-5 w-5 text-health-teal" />
                    Score Components
                  </CardTitle>
                  <CardDescription>How your daily score is calculated</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* EEG Component */}
                  <div className="flex items-center justify-between p-3 rounded-xl bg-secondary/50">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-health-teal-light">
                        <Brain className="h-5 w-5 text-health-teal" />
                      </div>
                      <div>
                        <div className="font-medium text-foreground">EEG Status</div>
                        <div className="text-sm text-muted-foreground">Brain activity pattern</div>
                      </div>
                    </div>
                    <div className={`font-semibold ${
                      currentRecord?.eegStatus === 'Relaxed' ? 'text-health-green' :
                      currentRecord?.eegStatus === 'Focused' ? 'text-health-yellow' :
                      currentRecord?.eegStatus === 'Emergency' ? 'text-health-red' :
                      'text-muted-foreground'
                    }`}>
                      {currentRecord?.eegStatus || 'N/A'}
                    </div>
                  </div>

                  {/* ECG Component */}
                  <div className="flex items-center justify-between p-3 rounded-xl bg-secondary/50">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-health-red-light">
                        <Heart className="h-5 w-5 text-health-red" />
                      </div>
                      <div>
                        <div className="font-medium text-foreground">ECG Status</div>
                        <div className="text-sm text-muted-foreground">Heart rhythm pattern</div>
                      </div>
                    </div>
                    <div className={`font-semibold ${
                      currentRecord?.ecgStatus === 'Normal' ? 'text-health-green' :
                      currentRecord?.ecgStatus === 'Abnormal' ? 'text-health-red' :
                      'text-muted-foreground'
                    }`}>
                      {currentRecord?.ecgStatus || 'N/A'}
                    </div>
                  </div>

                  {/* Trend */}
                  <div className="flex items-center justify-between p-3 rounded-xl bg-secondary/50">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-health-blue-light">
                        <TrendingUp className="h-5 w-5 text-health-blue" />
                      </div>
                      <div>
                        <div className="font-medium text-foreground">Total Readings</div>
                        <div className="text-sm text-muted-foreground">Data points collected</div>
                      </div>
                    </div>
                    <div className="font-semibold text-health-blue">
                      {healthRecords.length}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HealthScore;
