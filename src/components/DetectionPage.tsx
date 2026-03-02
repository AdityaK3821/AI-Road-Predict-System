import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'motion/react';
import { Upload, Image as ImageIcon, Search, AlertTriangle, CheckCircle2, Loader2, X } from 'lucide-react';
import { analyzeRoadImage } from '../services/aiService';
import { RiskLevel } from '../types';

import { useRoads } from '../RoadContext';

export default function DetectionPage() {
  const { addDetection } = useRoads();
  const [image, setImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<{
    damages: Array<{ type: string; severity: RiskLevel; confidence: number }>;
    summary: string;
  } | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: { 'image/*': [] },
    maxFiles: 1
  } as any);

  const handleAnalyze = async () => {
    if (!image) return;
    setIsAnalyzing(true);
    
    const base64 = image.split(',')[1];
    const analysis = await analyzeRoadImage(base64);
    
    setTimeout(() => {
      setResults(analysis);
      setIsAnalyzing(false);
      
      // Save to context
      analysis.damages.forEach(damage => {
        addDetection({
          id: Math.random().toString(36).substr(2, 9),
          location: {
            lat: 11.6643 + (Math.random() - 0.5) * 0.01, // Salem coordinates
            lng: 78.1460 + (Math.random() - 0.5) * 0.01,
            address: "Salem, Tamil Nadu"
          },
          type: damage.type,
          severity: damage.severity,
          timestamp: new Date().toISOString(),
          imageUrl: image
        });
      });
    }, 1500);
  };

  const reset = () => {
    setImage(null);
    setResults(null);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-20">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Upload & Detection</h1>
        <p className="text-white/50 max-w-2xl mx-auto">
          Upload a high-resolution image of the road surface. Our AI will automatically 
          detect potholes, cracks, and assess damage severity.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upload Area */}
        <div className="space-y-6">
          {!image ? (
            <div 
              {...getRootProps()} 
              className={`
                aspect-square rounded-3xl border-2 border-dashed transition-all cursor-pointer
                flex flex-col items-center justify-center p-12 text-center
                ${isDragActive ? 'border-wood-ash bg-wood-ash/5' : 'border-white/10 hover:border-white/20 hover:bg-white/5'}
              `}
            >
              <input {...getInputProps()} />
              <div className="w-20 h-20 bg-white/5 rounded-2xl flex items-center justify-center mb-6">
                <Upload className="w-10 h-10 text-white/30" />
              </div>
              <h3 className="text-xl font-bold mb-2">Drop road image here</h3>
              <p className="text-white/40 text-sm">Support JPG, PNG up to 10MB</p>
              <button className="mt-8 btn-secondary py-2 px-6">Select File</button>
            </div>
          ) : (
            <div className="relative aspect-square rounded-3xl overflow-hidden border border-white/10 group">
              <img src={image} alt="Road" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                <button onClick={reset} className="p-3 bg-red-500 rounded-xl hover:scale-110 transition-transform">
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
          )}

          {image && !results && (
            <button 
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="btn-primary w-full flex items-center justify-center gap-3 py-4"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Analyzing Surface...
                </>
              ) : (
                <>
                  <Search className="w-5 h-5" />
                  Run AI Detection
                </>
              )}
            </button>
          )}
        </div>

        {/* Results Area */}
        <div className="space-y-6">
          <AnimatePresence mode="wait">
            {isAnalyzing ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="glass-panel p-8 h-full flex flex-col items-center justify-center text-center space-y-6"
              >
                <div className="relative">
                  <div className="w-24 h-24 border-4 border-wood-ash/20 border-t-wood-ash rounded-full animate-spin"></div>
                  <Search className="w-8 h-8 text-wood-ash absolute inset-0 m-auto" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Processing Pixels</h3>
                  <p className="text-white/50 text-sm">Scanning for surface irregularities and structural defects...</p>
                </div>
              </motion.div>
            ) : results ? (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="glass-panel p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <CheckCircle2 className="w-6 h-6 text-green-500" />
                    <h3 className="text-xl font-bold">Detection Results</h3>
                  </div>
                  
                  <div className="space-y-4">
                    {results.damages.map((damage, i) => (
                      <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                        <div className="flex items-center gap-4">
                          <div className={`w-2 h-10 rounded-full ${
                            damage.severity === 'High' ? 'bg-red-500' : 
                            damage.severity === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'
                          }`}></div>
                          <div>
                            <p className="font-bold">{damage.type}</p>
                            <p className="text-xs text-white/40">Confidence: {(damage.confidence * 100).toFixed(1)}%</p>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          damage.severity === 'High' ? 'bg-red-500/20 text-red-400' : 
                          damage.severity === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-green-500/20 text-green-400'
                        }`}>
                          {damage.severity} Severity
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 pt-8 border-t border-white/10">
                    <h4 className="text-sm font-bold text-white/50 uppercase tracking-widest mb-4">AI Summary</h4>
                    <p className="text-white/80 leading-relaxed italic">
                      "{results.summary}"
                    </p>
                  </div>
                </div>

                <div className="glass-panel p-6 bg-wood-ash/5 border-wood-ash/20">
                  <div className="flex gap-4">
                    <AlertTriangle className="w-6 h-6 text-wood-ash shrink-0" />
                    <div>
                      <h4 className="font-bold text-wood-ash mb-1">Maintenance Action Required</h4>
                      <p className="text-sm text-white/60">
                        Based on the detected severity, this road segment has been flagged for 
                        priority inspection in the next 48 hours.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="glass-panel p-8 h-full flex flex-col items-center justify-center text-center text-white/30 border-dashed">
                <ImageIcon className="w-12 h-12 mb-4 opacity-20" />
                <p>Upload an image to see detection results</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
