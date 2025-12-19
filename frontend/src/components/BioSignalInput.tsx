import React, { useState } from 'react';
import { Brain, Heart, Send, CheckCircle2, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useHealth, EEGStatus, ECGStatus } from '@/context/HealthContext';
import { useToast } from '@/hooks/use-toast';

interface BioSignalInputProps {
  onSubmit: () => void;
}

const BioSignalInput: React.FC<BioSignalInputProps> = ({ onSubmit }) => {
  const [eegStatus, setEegStatus] = useState<EEGStatus | ''>('');
  const [ecgStatus, setEcgStatus] = useState<ECGStatus | ''>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { addHealthRecord } = useHealth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!eegStatus || !ecgStatus) {
      toast({
        title: 'Missing Information',
        description: 'Please select both EEG and ECG status.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    addHealthRecord(eegStatus, ecgStatus);
    setIsSubmitting(false);
    setSubmitted(true);
    
    toast({
      title: 'Bio-Signal Recorded!',
      description: 'Your health data has been successfully saved.',
    });

    setTimeout(() => {
      setSubmitted(false);
      setEegStatus('');
      setEcgStatus('');
      onSubmit();
    }, 2000);
  };

  return (
    <section id="input" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-8 animate-fade-in">
            <span className="inline-block px-4 py-1 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-4">
              Step 2
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-foreground">
              Record <span className="text-gradient">Bio-Signals</span>
            </h2>
            <p className="text-muted-foreground">
              Enter your current EEG and ECG readings for health analysis.
            </p>
          </div>

          <Card variant="elevated" className="animate-slide-up overflow-hidden" style={{ animationDelay: '0.2s' }}>
            {/* Success overlay */}
            {submitted && (
              <div className="absolute inset-0 bg-health-green/95 flex flex-col items-center justify-center z-10 animate-fade-in">
                <CheckCircle2 className="h-16 w-16 text-primary-foreground mb-4 animate-scale-in" />
                <div className="text-xl font-semibold text-primary-foreground">Successfully Recorded!</div>
                <div className="text-primary-foreground/80">Redirecting to dashboard...</div>
              </div>
            )}

            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-health-teal" />
                Bio-Signal Input Form
              </CardTitle>
              <CardDescription>
                Select your current bio-signal readings from the dropdowns below.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* EEG Status */}
                <div className="space-y-3">
                  <Label htmlFor="eeg-status" className="text-foreground font-medium flex items-center gap-2">
                    <Brain className="h-4 w-4 text-health-teal" />
                    EEG Status (Brain Activity)
                  </Label>
                  <Select value={eegStatus} onValueChange={(value) => setEegStatus(value as EEGStatus)}>
                    <SelectTrigger id="eeg-status" className="h-12">
                      <SelectValue placeholder="Select EEG status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Relaxed">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-health-green" />
                          Relaxed - Normal calm state
                        </div>
                      </SelectItem>
                      <SelectItem value="Focused">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-health-yellow" />
                          Focused - Active concentration
                        </div>
                      </SelectItem>
                      <SelectItem value="Emergency">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-health-red" />
                          Emergency - Abnormal pattern detected
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground">
                    EEG measures your brain's electrical activity patterns.
                  </p>
                </div>

                {/* ECG Status */}
                <div className="space-y-3">
                  <Label htmlFor="ecg-status" className="text-foreground font-medium flex items-center gap-2">
                    <Heart className="h-4 w-4 text-health-red" />
                    ECG Status (Heart Rhythm)
                  </Label>
                  <Select value={ecgStatus} onValueChange={(value) => setEcgStatus(value as ECGStatus)}>
                    <SelectTrigger id="ecg-status" className="h-12">
                      <SelectValue placeholder="Select ECG status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Normal">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-health-green" />
                          Normal - Regular heart rhythm
                        </div>
                      </SelectItem>
                      <SelectItem value="Abnormal">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-health-red" />
                          Abnormal - Irregular pattern detected
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground">
                    ECG monitors your heart's electrical signals.
                  </p>
                </div>

                {/* Submit button */}
                <Button 
                  type="submit" 
                  variant="hero" 
                  size="lg" 
                  className="w-full"
                  disabled={isSubmitting || !eegStatus || !ecgStatus}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5 mr-2" />
                      Submit Bio-Signal Data
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Info cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <Card variant="health" className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <CardContent className="p-4 flex items-start gap-3">
                <Brain className="h-6 w-6 text-health-teal mt-0.5" />
                <div>
                  <div className="font-medium text-foreground">About EEG</div>
                  <div className="text-sm text-muted-foreground">
                    Electroencephalography detects brain wave patterns for mental state analysis.
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card variant="health" className="animate-fade-in" style={{ animationDelay: '0.5s' }}>
              <CardContent className="p-4 flex items-start gap-3">
                <Heart className="h-6 w-6 text-health-red mt-0.5" />
                <div>
                  <div className="font-medium text-foreground">About ECG</div>
                  <div className="text-sm text-muted-foreground">
                    Electrocardiography records heart rhythm to detect cardiac irregularities.
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BioSignalInput;
