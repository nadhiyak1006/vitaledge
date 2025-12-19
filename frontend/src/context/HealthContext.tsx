import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

export type EEGStatus = 'Relaxed' | 'Focused' | 'Emergency';
export type ECGStatus = 'Normal' | 'Abnormal';
export type AgeGroup = 'Adult' | 'Elderly';

export interface HealthRecord {
  id: string;
  eegStatus: EEGStatus;
  ecgStatus: ECGStatus;
  timestamp: Date;
  healthScore: number;
}

export interface UserProfile {
  name: string;
  ageGroup: AgeGroup;
}

interface HealthContextType {
  userProfile: UserProfile | null;
  setUserProfile: (profile: UserProfile) => void;
  healthRecords: HealthRecord[];
  addHealthRecord: (eeg: EEGStatus, ecg: ECGStatus) => void;
  currentRecord: HealthRecord | null;
  isEmergency: boolean;
  dailyHealthScore: number;
  getSuggestions: () => string[];
  loading: boolean;
}

const HealthContext = createContext<HealthContextType | undefined>(undefined);

const calculateHealthScore = (eeg: EEGStatus, ecg: ECGStatus): number => {
  let score = 100;
  
  // EEG scoring
  if (eeg === 'Emergency') score -= 50;
  else if (eeg === 'Focused') score -= 10;
  
  // ECG scoring
  if (ecg === 'Abnormal') score -= 40;
  
  return Math.max(0, score);
};

export const HealthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userProfile, setUserProfileState] = useState<UserProfile | null>(null);
  const [healthRecords, setHealthRecords] = useState<HealthRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [profileRes, recordsRes] = await Promise.all([
          axios.get(`${API_URL}/profile`),
          axios.get(`${API_URL}/health-records`),
        ]);
        
        setUserProfileState(profileRes.data);
        setHealthRecords(recordsRes.data.map((r: any) => ({
          ...r,
          timestamp: new Date(r.timestamp)
        })));
      } catch (error) {
        console.error('Error fetching data', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const setUserProfile = async (profile: UserProfile) => {
    try {
      const response = await axios.post(`${API_URL}/profile`, profile);
      setUserProfileState(response.data);
    } catch (error) {
      console.error('Error setting user profile', error);
    }
  };

  const addHealthRecord = async (eegStatus: EEGStatus, ecgStatus: ECGStatus) => {
    try {
      const newRecord = {
        id: Date.now().toString(),
        eegStatus,
        ecgStatus,
        timestamp: new Date(),
        healthScore: calculateHealthScore(eegStatus, ecgStatus),
      };
      
      const response = await axios.post(`${API_URL}/health-records`, newRecord);
      setHealthRecords(prevRecords => [response.data, ...prevRecords].slice(0, 50));
    } catch (error) {
      console.error('Error adding health record', error);
    }
  };

  const currentRecord = healthRecords[0] || null;
  
  const isEmergency = currentRecord 
    ? (currentRecord.eegStatus === 'Emergency' || currentRecord.ecgStatus === 'Abnormal')
    : false;

  const dailyHealthScore = healthRecords.length > 0
    ? Math.round(healthRecords.slice(0, 10).reduce((acc, r) => acc + r.healthScore, 0) / Math.min(healthRecords.length, 10))
    : 0;

  const getSuggestions = (): string[] => {
    if (!currentRecord) return ['Complete your first bio-signal reading to get personalized suggestions.'];
    
    const suggestions: string[] = [];
    
    if (currentRecord.eegStatus === 'Emergency') {
      suggestions.push('🚨 Medical attention advised immediately.');
      suggestions.push('Please remain calm and contact your caregiver.');
    } else if (currentRecord.eegStatus === 'Focused') {
      suggestions.push('Great focus detected! Take short breaks to prevent fatigue.');
      suggestions.push('Stay hydrated and maintain good posture.');
    } else {
      suggestions.push('Relaxed state detected. You are doing well!');
    }
    
    if (currentRecord.ecgStatus === 'Abnormal') {
      suggestions.push('⚠️ Abnormal heart rhythm detected. Please rest and monitor closely.');
      suggestions.push('Deep breathing exercises are recommended.');
    } else {
      suggestions.push('Heart rhythm is normal. Continue your activities safely.');
    }
    
    if (currentRecord.healthScore >= 80) {
      suggestions.push('✨ Excellent health score! Keep up the great work.');
    } else if (currentRecord.healthScore >= 50) {
      suggestions.push('Consider light stretching or a short walk.');
    }
    
    return suggestions;
  };

  return (
    <HealthContext.Provider value={{
      userProfile,
      setUserProfile,
      healthRecords,
      addHealthRecord,
      currentRecord,
      isEmergency,
      dailyHealthScore,
      getSuggestions,
      loading,
    }}>
      {children}
    </HealthContext.Provider>
  );
};

export const useHealth = () => {
  const context = useContext(HealthContext);
  if (!context) {
    throw new Error('useHealth must be used within a HealthProvider');
  }
  return context;
};
