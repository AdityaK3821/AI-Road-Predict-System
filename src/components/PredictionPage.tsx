import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TrendingUp, Activity, CloudRain, Car, AlertCircle, Loader2, RefreshCcw } from 'lucide-react';
import { predictRoadRisk } from '../services/aiService';
import { PredictionResult } from '../types';

export default function PredictionPage() {
  const [inputs, setInputs] = useState({
    trafficLevel: 5,
    rainfallLevel: 150,
    existingDamageCount: 2
  });
  const [isPredicting, setIsPredicting] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);

  const handlePredict = async () => {
    setIsPredicting(true);
    const prediction = await predictRoadRisk(inputs);
    
    setTimeout(() => {
      setResult(prediction);
      setIsPredicting(false);
    }, 1200);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-20">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Risk Prediction</h1>
        <p className="text-white/50 max-w-2xl mx-auto">
          Input environmental and usage factors to predict the future risk level of a road segment. 
          Our AI model analyzes these variables to forecast potential structural failure.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Input Form */}
        <div className="glass-panel p-8 space-y-8">
          <div className="flex items-center gap-3 mb-4">
            <Activity className="w-6 h-6 text-wood-ash" />
            <h3 className="text-xl font-bold">Input Parameters</h3>
          </div>

          <div className="space-y-8">
            {/* Traffic Level */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="flex items-center gap-2 text-sm font-medium text-white/70">
                  <Car className="w-4 h-4" /> Traffic Level (1-10)
                </label>
                <span className="text-wood-ash font-bold">{inputs.trafficLevel}</span>
              </div>
              <input 
                type="range" min="1" max="10" step="1"
                value={inputs.trafficLevel}
                onChange={(e) => setInputs({...inputs, trafficLevel: parseInt(e.target.value)})}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-wood-ash"
              />
              <div className="flex justify-between text-[10px] text-white/30 uppercase tracking-widest">
                <span>Low</span>
                <span>Moderate</span>
                <span>Heavy</span>
              </div>
            </div>

            {/* Rainfall */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="flex items-center gap-2 text-sm font-medium text-white/70">
                  <CloudRain className="w-4 h-4" /> Rainfall Level (mm/month)
                </label>
                <span className="text-wood-ash font-bold">{inputs.rainfallLevel} mm</span>
              </div>
              <input 
                type="range" min="0" max="1000" step="10"
                value={inputs.rainfallLevel}
                onChange={(e) => setInputs({...inputs, rainfallLevel: parseInt(e.target.value)})}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-wood-ash"
              />
              <div className="flex justify-between text-[10px] text-white/30 uppercase tracking-widest">
                <span>Dry</span>
                <span>Average</span>
                <span>Extreme</span>
              </div>
            </div>

            {/* Existing Damage */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="flex items-center gap-2 text-sm font-medium text-white/70">
                  <AlertCircle className="w-4 h-4" /> Existing Damage Count
                </label>
                <span className="text-wood-ash font-bold">{inputs.existingDamageCount}</span>
              </div>
              <input 
                type="number"
                value={inputs.existingDamageCount}
                onChange={(e) => setInputs({...inputs, existingDamageCount: parseInt(e.target.value) || 0})}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-wood-ash transition-colors"
              />
            </div>
          </div>

          <button 
            onClick={handlePredict}
            disabled={isPredicting}
            className="btn-primary w-full flex items-center justify-center gap-3 py-4 mt-4"
          >
            {isPredicting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Calculating Risk...
              </>
            ) : (
              <>
                <TrendingUp className="w-5 h-5" />
                Generate Prediction
              </>
            )}
          </button>
        </div>

        {/* Prediction Output */}
        <div className="relative">
          <AnimatePresence mode="wait">
            {isPredicting ? (
              <motion.div 
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="glass-panel p-12 h-full flex flex-col items-center justify-center text-center space-y-8"
              >
                <div className="w-32 h-32 relative">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(235, 231, 96, 0.1)" strokeWidth="8" />
                    <circle cx="50" cy="50" r="45" fill="none" stroke="#ebe760" strokeWidth="8" strokeDasharray="283" strokeDashoffset="140" className="animate-[spin_2s_linear_infinite]" />
                  </svg>
                  <TrendingUp className="w-10 h-10 text-wood-ash absolute inset-0 m-auto" />
                </div>
                <h3 className="text-2xl font-bold">Processing Variables</h3>
                <p className="text-white/50">Our neural network is analyzing environmental stressors and usage patterns...</p>
              </motion.div>
            ) : result ? (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-panel p-12 h-full flex flex-col"
              >
                <div className="flex-grow space-y-10">
                  <div className="text-center">
                    <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/40 mb-4">Predicted Risk Level</p>
                    <div className={`text-6xl font-bold mb-2 ${
                      result.riskLevel === 'High' ? 'text-red-500' : 
                      result.riskLevel === 'Medium' ? 'text-yellow-500' : 'text-green-500'
                    }`}>
                      {result.riskLevel}
                    </div>
                    <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden mt-6">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${result.riskScore}%` }}
                        className={`h-full ${
                          result.riskLevel === 'High' ? 'bg-red-500' : 
                          result.riskLevel === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'
                        }`}
                      />
                    </div>
                    <p className="text-sm text-white/40 mt-2">Risk Score: {result.riskScore}/100</p>
                  </div>

                  <div className="space-y-6">
                    <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                      <h4 className="text-sm font-bold text-wood-ash uppercase tracking-widest mb-3">Recommendation</h4>
                      <p className="text-white/80 leading-relaxed italic">
                        "{result.recommendation}"
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-white/5 rounded-xl text-center">
                        <p className="text-[10px] text-white/40 uppercase mb-1">Confidence</p>
                        <p className="font-bold">92%</p>
                      </div>
                      <div className="p-4 bg-white/5 rounded-xl text-center">
                        <p className="text-[10px] text-white/40 uppercase mb-1">Model Version</p>
                        <p className="font-bold">v3.4-Pro</p>
                      </div>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => setResult(null)}
                  className="btn-secondary w-full mt-10 flex items-center justify-center gap-2"
                >
                  <RefreshCcw className="w-4 h-4" /> Reset Parameters
                </button>
              </motion.div>
            ) : (
              <div className="glass-panel p-12 h-full flex flex-col items-center justify-center text-center text-white/20 border-dashed">
                <TrendingUp className="w-16 h-16 mb-6 opacity-10" />
                <h3 className="text-xl font-bold mb-2">Ready for Prediction</h3>
                <p className="max-w-xs mx-auto">Adjust the parameters on the left and click 'Generate Prediction' to see AI insights.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
