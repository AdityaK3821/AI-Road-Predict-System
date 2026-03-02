export type RiskLevel = 'Low' | 'Medium' | 'High';

export interface RoadDamage {
  id: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  type: string;
  severity: RiskLevel;
  timestamp: string;
  imageUrl?: string;
}

export interface PredictionInput {
  trafficLevel: number;
  rainfallLevel: number;
  existingDamageCount: number;
}

export interface PredictionResult {
  riskScore: number;
  riskLevel: RiskLevel;
  recommendation: string;
}

export interface Stats {
  totalRoadsScanned: number;
  highRiskAreas: number;
  pendingRepairs: number;
  efficiencyGain: string;
}
