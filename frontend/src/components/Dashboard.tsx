import React from 'react';
import { Brain, Heart, Clock, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useHealth } from '@/context/HealthContext';

const Dashboard: React.FC = () => {
  const { healthRecords, currentRecord } = useHealth();

  const getStatusBadge = (type: 'eeg' | 'ecg', value: string) => {
    const eegConfigs: Record<string, { bg: string; text: string; label: string }> = {
      Relaxed: { bg: 'bg-health-green-light', text: 'text-health-green', label: 'Relaxed' },
      Focused: { bg: 'bg-health-yellow-light', text: 'text-health-yellow', label: 'Focused' },
      Emergency: { bg: 'bg-health-red-light', text: 'text-health-red', label: 'Emergency' },
    };
    
    const ecgConfigs: Record<string, { bg: string; text: string; label: string }> = {
      Normal: { bg: 'bg-health-green-light', text: 'text-health-green', label: 'Normal' },
      Abnormal: { bg: 'bg-health-red-light', text: 'text-health-red', label: 'Abnormal' },
    };
    
    const config = type === 'eeg' ? eegConfigs[value] : ecgConfigs[value];
    if (!config) return null;
    
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    );
  };

  const getTrendIcon = (current: number, previous: number) => {
    if (current > previous) return <TrendingUp className="h-4 w-4 text-health-green" />;
    if (current < previous) return <TrendingDown className="h-4 w-4 text-health-red" />;
    return <Minus className="h-4 w-4 text-muted-foreground" />;
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }).format(new Date(date));
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
    }).format(new Date(date));
  };

  return (
    <section id="dashboard" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-12 animate-fade-in">
          <span className="inline-block px-4 py-1 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-4">
            Dashboard
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-foreground">
            Health <span className="text-gradient">Monitoring</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            View your bio-signal readings and track your health over time.
          </p>
        </div>

        {/* Current status cards */}
        {currentRecord && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card variant="elevated" className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Brain className="h-5 w-5 text-health-teal" />
                  Current EEG Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  {getStatusBadge('eeg', currentRecord.eegStatus)}
                  <span className="text-sm text-muted-foreground">
                    {formatTime(currentRecord.timestamp)}
                  </span>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">
                  Brain activity pattern: {currentRecord.eegStatus.toLowerCase()} state detected
                </p>
              </CardContent>
            </Card>

            <Card variant="elevated" className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Heart className="h-5 w-5 text-health-red" />
                  Current ECG Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  {getStatusBadge('ecg', currentRecord.ecgStatus)}
                  <span className="text-sm text-muted-foreground">
                    {formatTime(currentRecord.timestamp)}
                  </span>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">
                  Heart rhythm: {currentRecord.ecgStatus.toLowerCase()} pattern detected
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Records table */}
        <Card variant="elevated" className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-health-blue" />
              Recent Readings
            </CardTitle>
            <CardDescription>
              Your last {Math.min(healthRecords.length, 10)} bio-signal recordings
            </CardDescription>
          </CardHeader>
          <CardContent>
            {healthRecords.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <Brain className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium">No readings yet</p>
                <p className="text-sm">Submit your first bio-signal reading to see data here.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full" role="table">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Date</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Time</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">EEG Status</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">ECG Status</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {healthRecords.slice(0, 10).map((record, index) => (
                      <tr 
                        key={record.id} 
                        className={`border-b border-border/50 transition-colors hover:bg-accent/50 ${
                          index === 0 ? 'bg-accent/30' : ''
                        }`}
                      >
                        <td className="py-3 px-4 text-foreground">{formatDate(record.timestamp)}</td>
                        <td className="py-3 px-4 text-foreground">{formatTime(record.timestamp)}</td>
                        <td className="py-3 px-4">{getStatusBadge('eeg', record.eegStatus)}</td>
                        <td className="py-3 px-4">{getStatusBadge('ecg', record.ecgStatus)}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <span className={`font-semibold ${
                              record.healthScore >= 80 ? 'text-health-green' :
                              record.healthScore >= 50 ? 'text-health-yellow' :
                              'text-health-red'
                            }`}>
                              {record.healthScore}
                            </span>
                            {index < healthRecords.length - 1 && 
                              getTrendIcon(record.healthScore, healthRecords[index + 1].healthScore)
                            }
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Dashboard;
