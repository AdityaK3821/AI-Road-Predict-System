import { GoogleGenAI } from "@google/genai";
import { PredictionInput, PredictionResult, RiskLevel } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function analyzeRoadImage(base64Image: string): Promise<{
  damages: Array<{ type: string; severity: RiskLevel; confidence: number }>;
  summary: string;
}> {
  const model = "gemini-3.1-pro-preview";
  const prompt = `Analyze this road image for damages like potholes, cracks, or fading markings. 
  Return a JSON object with:
  1. damages: an array of objects with { type, severity (Low, Medium, High), confidence (0-1) }
  2. summary: a brief description of the road condition.`;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: [
        {
          parts: [
            { text: prompt },
            { inlineData: { mimeType: "image/jpeg", data: base64Image } }
          ]
        }
      ],
      config: {
        responseMimeType: "application/json"
      }
    });

    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("Error analyzing image:", error);
    return {
      damages: [{ type: "Pothole (Simulated)", severity: "Medium", confidence: 0.85 }],
      summary: "Simulation mode: Detected potential road surface irregularities."
    };
  }
}

export async function predictRoadRisk(input: PredictionInput): Promise<PredictionResult> {
  const model = "gemini-3-flash-preview";
  const prompt = `Predict road maintenance risk based on:
  - Traffic Level (1-10): ${input.trafficLevel}
  - Rainfall Level (mm/month): ${input.rainfallLevel}
  - Existing Damage Count: ${input.existingDamageCount}
  
  Return a JSON object with:
  1. riskScore: 0-100
  2. riskLevel: Low, Medium, or High
  3. recommendation: A professional maintenance recommendation.`;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        responseMimeType: "application/json"
      }
    });

    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("Error predicting risk:", error);
    return {
      riskScore: 65,
      riskLevel: "Medium",
      recommendation: "Simulation mode: Regular monitoring recommended due to moderate traffic and environmental factors."
    };
  }
}
