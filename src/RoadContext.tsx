import React, { createContext, useContext, useState, useEffect } from 'react';
import { RoadDamage } from './types';

interface RoadContextType {
  detections: RoadDamage[];
  addDetection: (detection: RoadDamage) => void;
  updateDetection: (id: string, updates: Partial<RoadDamage>) => void;
  deleteDetection: (id: string) => void;
}

const RoadContext = createContext<RoadContextType | undefined>(undefined);

export function RoadProvider({ children }: { children: React.ReactNode }) {
  const [detections, setDetections] = useState<RoadDamage[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('road_detections');
    if (saved) {
      try {
        setDetections(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved detections", e);
      }
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem('road_detections', JSON.stringify(detections));
  }, [detections]);

  const addDetection = (detection: RoadDamage) => {
    setDetections(prev => [detection, ...prev]);
  };

  const updateDetection = (id: string, updates: Partial<RoadDamage>) => {
    setDetections(prev => prev.map(d => d.id === id ? { ...d, ...updates } : d));
  };

  const deleteDetection = (id: string) => {
    setDetections(prev => prev.filter(d => d.id !== id));
  };

  return (
    <RoadContext.Provider value={{ detections, addDetection, updateDetection, deleteDetection }}>
      {children}
    </RoadContext.Provider>
  );
}

export function useRoads() {
  const context = useContext(RoadContext);
  if (context === undefined) {
    throw new Error('useRoads must be used within a RoadProvider');
  }
  return context;
}
