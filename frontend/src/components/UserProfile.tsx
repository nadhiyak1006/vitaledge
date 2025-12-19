import React, { useState } from 'react';
import { User, Users, Check } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useHealth, AgeGroup } from '@/context/HealthContext';
import { useToast } from '@/hooks/use-toast';

interface UserProfileProps {
  onComplete: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ onComplete }) => {
  const { userProfile, setUserProfile } = useHealth();
  const [name, setName] = useState(userProfile?.name || '');
  const [ageGroup, setAgeGroup] = useState<AgeGroup>(userProfile?.ageGroup || 'Adult');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast({
        title: 'Name Required',
        description: 'Please enter your name to continue.',
        variant: 'destructive',
      });
      return;
    }

    setUserProfile({ name: name.trim(), ageGroup });
    toast({
      title: 'Profile Saved!',
      description: `Welcome, ${name}! Your profile has been configured.`,
    });
    onComplete();
  };

  return (
    <section id="profile" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-8 animate-fade-in">
            <span className="inline-block px-4 py-1 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-4">
              Step 1
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-foreground">
              Set Up Your <span className="text-gradient">Profile</span>
            </h2>
            <p className="text-muted-foreground">
              Personalize your experience for better accessibility and care.
            </p>
          </div>

          <Card variant="elevated" className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-health-teal" />
                Personal Information
              </CardTitle>
              <CardDescription>
                Your profile helps us customize the interface and provide better suggestions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name input */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-foreground font-medium">
                    Your Name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-12"
                    aria-describedby="name-description"
                  />
                  <p id="name-description" className="text-sm text-muted-foreground">
                    This will be used to personalize your experience.
                  </p>
                </div>

                {/* Age group selection */}
                <div className="space-y-3">
                  <Label className="text-foreground font-medium">
                    Age Group
                  </Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setAgeGroup('Adult')}
                      className={`relative p-6 rounded-xl border-2 transition-all duration-200 text-left ${
                        ageGroup === 'Adult'
                          ? 'border-health-teal bg-health-teal-light'
                          : 'border-border hover:border-health-teal/50 bg-card'
                      }`}
                      aria-pressed={ageGroup === 'Adult'}
                    >
                      {ageGroup === 'Adult' && (
                        <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-health-teal flex items-center justify-center">
                          <Check className="h-4 w-4 text-primary-foreground" />
                        </div>
                      )}
                      <User className={`h-8 w-8 mb-3 ${ageGroup === 'Adult' ? 'text-health-teal' : 'text-muted-foreground'}`} />
                      <div className="font-semibold text-foreground">Adult</div>
                      <div className="text-sm text-muted-foreground">Standard interface</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setAgeGroup('Elderly')}
                      className={`relative p-6 rounded-xl border-2 transition-all duration-200 text-left ${
                        ageGroup === 'Elderly'
                          ? 'border-health-teal bg-health-teal-light'
                          : 'border-border hover:border-health-teal/50 bg-card'
                      }`}
                      aria-pressed={ageGroup === 'Elderly'}
                    >
                      {ageGroup === 'Elderly' && (
                        <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-health-teal flex items-center justify-center">
                          <Check className="h-4 w-4 text-primary-foreground" />
                        </div>
                      )}
                      <Users className={`h-8 w-8 mb-3 ${ageGroup === 'Elderly' ? 'text-health-teal' : 'text-muted-foreground'}`} />
                      <div className="font-semibold text-foreground">Elderly (60+)</div>
                      <div className="text-sm text-muted-foreground">Larger fonts & simplified UI</div>
                    </button>
                  </div>
                </div>

                <Button type="submit" variant="hero" size="lg" className="w-full">
                  Save Profile & Continue
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Current profile display */}
          {userProfile && (
            <Card variant="success" className="mt-6 animate-fade-in">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-health-green flex items-center justify-center">
                  <Check className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <div className="font-medium text-foreground">Profile Active</div>
                  <div className="text-sm text-muted-foreground">
                    {userProfile.name} • {userProfile.ageGroup}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
