import React, { useState, useEffect } from 'react';
import { HealthProvider, useHealth } from '@/context/HealthContext';
import { AccessibilityProvider, useAccessibility } from '@/context/AccessibilityContext';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import UserProfile from '@/components/UserProfile';
import BioSignalInput from '@/components/BioSignalInput';
import Dashboard from '@/components/Dashboard';
import HealthScore from '@/components/HealthScore';
import Suggestions from '@/components/Suggestions';
import EmergencyAlert from '@/components/EmergencyAlert';
import Footer from '@/components/Footer';
import { Loader2 } from 'lucide-react';

const LoadingScreen: React.FC = () => (
  <div className="fixed inset-0 bg-background flex flex-col items-center justify-center z-50">
    <div className="relative">
      <div className="w-16 h-16 border-4 border-health-teal/20 rounded-full" />
      <div className="absolute inset-0 w-16 h-16 border-4 border-health-teal border-t-transparent rounded-full animate-spin" />
    </div>
    <p className="mt-4 text-muted-foreground animate-pulse">Loading NeuroVital...</p>
  </div>
);

const MainContent: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');
  const { userProfile, loading } = useHealth();
  const { largeFonts } = useAccessibility();

  // Apply elderly mode (large fonts) when user is elderly
  useEffect(() => {
    if (userProfile?.ageGroup === 'Elderly') {
      document.documentElement.classList.add('large-fonts');
    } else if (!largeFonts) {
      document.documentElement.classList.remove('large-fonts');
    }
  }, [userProfile?.ageGroup, largeFonts]);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />
      <EmergencyAlert />
      
      <main>
        <Hero onGetStarted={() => scrollToSection('profile')} />
        <Features />
        <UserProfile onComplete={() => scrollToSection('input')} />
        <BioSignalInput onSubmit={() => scrollToSection('dashboard')} />
        <Dashboard />
        <HealthScore />
        <Suggestions />
      </main>
      
      <Footer />
    </div>
  );
};

const Index: React.FC = () => {
  return (
    <AccessibilityProvider>
      <HealthProvider>
        <MainContent />
      </HealthProvider>
    </AccessibilityProvider>
  );
};

export default Index;
