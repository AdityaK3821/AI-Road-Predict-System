import React from 'react';
import { motion } from 'motion/react';
import { MapPin, AlertTriangle, Filter, Layers, Navigation } from 'lucide-react';
import { RiskLevel } from '../types';
import { cn } from '../utils';

const MOCK_LOCATIONS = [
  { id: '1', x: 25, y: 30, severity: 'High' as RiskLevel, type: 'Large Pothole' },
  { id: '2', x: 45, y: 65, severity: 'Medium' as RiskLevel, type: 'Surface Crack' },
  { id: '3', x: 70, y: 20, severity: 'Low' as RiskLevel, type: 'Faded Marking' },
  { id: '4', x: 85, y: 55, severity: 'High' as RiskLevel, type: 'Structural Damage' },
  { id: '5', x: 15, y: 80, severity: 'Medium' as RiskLevel, type: 'Edge Subsidence' },
];

import { useRoads } from '../RoadContext';

export default function MapDashboard() {
  const { detections } = useRoads();
  const [selected, setSelected] = React.useState<any | null>(null);

  // Salem coordinates roughly translate to center of our mock map
  // Salem, Tamil Nadu: 11.6643° N, 78.1460° E

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold">Salem Road Network</h1>
          <p className="text-white/50">Monitoring road health across Salem, Tamil Nadu.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm hover:bg-white/10 transition-colors">
            <Filter className="w-4 h-4" />
            Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm hover:bg-white/10 transition-colors">
            <Layers className="w-4 h-4" />
            Layers
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Map Area */}
        <div className="lg:col-span-3 relative aspect-[16/9] bg-medium-grey rounded-3xl overflow-hidden border border-white/10">
          {/* Real Map Iframe (Salem) */}
          <iframe 
            width="100%" 
            height="100%" 
            frameBorder="0" 
            scrolling="no" 
            marginHeight={0} 
            marginWidth={0} 
            src="https://maps.google.com/maps?width=100%25&height=600&hl=en&q=Salem,Tamil%20Nadu&t=&z=13&ie=UTF8&iwloc=B&output=embed"
            className="opacity-60 grayscale invert contrast-125"
          ></iframe>

          {/* Map Pins (Dynamic) */}
          {detections.map((loc) => (
            <motion.button
              key={loc.id}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.2 }}
              onClick={() => setSelected(loc)}
              className="absolute z-10 -translate-x-1/2 -translate-y-1/2 group"
              style={{ 
                left: `${50 + (loc.location.lng - 78.1460) * 5000}%`, 
                top: `${50 - (loc.location.lat - 11.6643) * 5000}%` 
              }}
            >
              <div className={`
                p-2 rounded-full shadow-lg transition-all
                ${loc.severity === 'High' ? 'bg-red-500' : loc.severity === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'}
                ${selected?.id === loc.id ? 'ring-4 ring-white' : ''}
              `}>
                <MapPin className="w-5 h-5 text-dark-grey" />
              </div>
            </motion.button>
          ))}
          
          {/* Map Controls */}
          <div className="absolute bottom-6 right-6 flex flex-col gap-2">
            <button className="p-3 bg-dark-grey border border-white/10 rounded-xl hover:bg-white/5"><Navigation className="w-5 h-5" /></button>
          </div>

          {/* Legend */}
          <div className="absolute top-6 left-6 glass-panel p-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/50">Risk Levels</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-3 text-xs">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span>High Risk</span>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <span>Medium Risk</span>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span>Low Risk</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Info Sidebar */}
        <div className="space-y-6">
          <div className="glass-panel p-6">
            <h3 className="text-lg font-bold mb-6">Location Details</h3>
            {selected ? (
              <motion.div 
                key={selected.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="aspect-video rounded-xl overflow-hidden bg-white/5">
                  <img 
                    src={selected.imageUrl || `https://picsum.photos/seed/${selected.id}/400/225`} 
                    alt="Damage" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <p className="text-xs text-white/40 uppercase tracking-widest mb-1">Damage Type</p>
                  <p className="font-bold text-lg">{selected.type}</p>
                </div>
                <div className="flex justify-between items-center py-4 border-y border-white/5">
                  <div>
                    <p className="text-xs text-white/40 uppercase tracking-widest mb-1">Severity</p>
                    <p className={cn(
                      "font-bold",
                      selected.severity === 'High' ? 'text-red-400' : selected.severity === 'Medium' ? 'text-yellow-400' : 'text-green-400'
                    )}>{selected.severity}</p>
                  </div>
                  <AlertTriangle className={cn(
                    "w-6 h-6",
                    selected.severity === 'High' ? 'text-red-400' : selected.severity === 'Medium' ? 'text-yellow-400' : 'text-green-400'
                  )} />
                </div>
                <button className="btn-primary w-full py-3 text-sm">Generate Work Order</button>
              </motion.div>
            ) : (
              <div className="text-center py-12 text-white/30">
                <MapPin className="w-12 h-12 mx-auto mb-4 opacity-10" />
                <p className="text-sm">Select a pin on the map to view details</p>
              </div>
            )}
          </div>

          <div className="glass-panel p-6">
            <h4 className="text-sm font-bold mb-4">Quick Stats</h4>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-white/50">Total Markers</span>
                <span className="font-bold">{detections.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-white/50">Critical Areas</span>
                <span className="text-red-400 font-bold">{detections.filter(d => d.severity === 'High').length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
