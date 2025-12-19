import React from 'react';
import { AlertTriangle, Phone, Bell } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useHealth } from '@/context/HealthContext';

const EmergencyAlert: React.FC = () => {
  const { isEmergency, currentRecord } = useHealth();

  if (!isEmergency) return null;

  return (
    <div className="fixed top-20 left-4 right-4 z-40 animate-slide-up">
      <Card variant="emergency" className="border-2 border-health-red shadow-lg">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-health-red animate-pulse">
                <AlertTriangle className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-health-red flex items-center gap-2">
                  <Bell className="h-5 w-5 animate-bounce" />
                  Emergency Alert!
                </h3>
                <p className="text-foreground font-medium">
                  {currentRecord?.eegStatus === 'Emergency' && currentRecord?.ecgStatus === 'Abnormal'
                    ? 'Critical: Both EEG and ECG anomalies detected!'
                    : currentRecord?.eegStatus === 'Emergency'
                    ? 'EEG Emergency pattern detected!'
                    : 'ECG Abnormal rhythm detected!'}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Caregiver assistance may be required. Please remain calm.
                </p>
              </div>
            </div>
            <Button variant="emergency" size="lg" className="shrink-0">
              <Phone className="h-5 w-5 mr-2" />
              Contact Caregiver
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmergencyAlert;
