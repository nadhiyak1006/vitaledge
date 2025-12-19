import React from 'react';
import { Eye, Type } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAccessibility } from '@/context/AccessibilityContext';

const AccessibilityToggle: React.FC = () => {
  const { highContrast, toggleHighContrast, largeFonts, toggleLargeFonts } = useAccessibility();

  return (
    <div className="flex items-center gap-2">
      <Button
        variant={highContrast ? "default" : "glass"}
        size="icon"
        onClick={toggleHighContrast}
        aria-label="Toggle high contrast mode"
        title="High Contrast Mode"
      >
        <Eye className="h-4 w-4" />
      </Button>
      <Button
        variant={largeFonts ? "default" : "glass"}
        size="icon"
        onClick={toggleLargeFonts}
        aria-label="Toggle large fonts"
        title="Large Fonts"
      >
        <Type className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default AccessibilityToggle;
