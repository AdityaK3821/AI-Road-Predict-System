import React from 'react';
import { motion } from 'motion/react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';
import { 
  Route, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  ArrowUpRight, 
  ArrowDownRight,
  MoreHorizontal,
  Search
} from 'lucide-react';
import { cn } from '../utils';

import { useRoads } from '../RoadContext';
import { Edit2, Trash2, Save, X as CloseIcon } from 'lucide-react';

export default function AdminDashboard() {
  const { detections, updateDetection, deleteDetection } = useRoads();
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [editValue, setEditValue] = React.useState<string>("");

  // Dynamic Bar Data
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const barData = days.map(day => {
    const count = detections.filter(d => {
      const date = new Date(d.timestamp);
      return days[date.getDay()] === day;
    }).length;
    return { name: day, scans: count };
  });

  // Dynamic Pie Data
  const highCount = detections.filter(d => d.severity === 'High').length;
  const mediumCount = detections.filter(d => d.severity === 'Medium').length;
  const lowCount = detections.filter(d => d.severity === 'Low').length;
  const total = detections.length || 1;

  const pieData = [
    { name: 'High Risk', value: Math.round((highCount / total) * 100), color: '#ef4444' },
    { name: 'Medium Risk', value: Math.round((mediumCount / total) * 100), color: '#eab308' },
    { name: 'Low Risk', value: Math.round((lowCount / total) * 100), color: '#22c55e' },
  ];

  const stats = {
    totalRoadsScanned: detections.length,
    highRiskAreas: highCount,
    repairsCompleted: 0,
    avgResponse: detections.length > 0 ? '12h' : '0h'
  };

  const handleEdit = (id: string, currentType: string) => {
    setEditingId(id);
    setEditValue(currentType);
  };

  const handleSave = (id: string) => {
    updateDetection(id, { type: editValue });
    setEditingId(null);
  };

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold">Admin Dashboard</h1>
          <p className="text-white/50">System overview and maintenance management console.</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
            <input 
              type="text" 
              placeholder="Search roads..." 
              className="bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-wood-ash transition-colors"
            />
          </div>
          <button className="btn-primary py-2 px-4 text-sm">Export Report</button>
        </div>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Scanned', value: stats.totalRoadsScanned, icon: Route, trend: detections.length > 0 ? '+100%' : '0%', up: true },
          { label: 'High Risk Areas', value: stats.highRiskAreas, icon: AlertTriangle, trend: '0%', up: false },
          { label: 'Repairs Completed', value: stats.repairsCompleted, icon: CheckCircle2, trend: '0%', up: true },
          { label: 'Avg. Response', value: stats.avgResponse, icon: Clock, trend: '0h', up: true },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-panel p-6"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-white/5 rounded-lg">
                <stat.icon className="w-5 h-5 text-wood-ash" />
              </div>
              <div className={cn(
                "flex items-center gap-1 text-xs font-bold",
                stat.up ? "text-green-400" : "text-red-400"
              )}>
                {stat.trend}
                {stat.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
              </div>
            </div>
            <p className="text-sm text-white/40 mb-1">{stat.label}</p>
            <h3 className="text-2xl font-bold">{stat.value}</h3>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass-panel p-8">
          <h3 className="text-lg font-bold mb-8">Weekly Scan Activity</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke="rgba(255,255,255,0.3)" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <YAxis 
                  stroke="rgba(255,255,255,0.3)" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                  allowDecimals={false}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                  itemStyle={{ color: '#ebe760' }}
                />
                <Bar dataKey="scans" fill="#ebe760" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-panel p-8">
          <h3 className="text-lg font-bold mb-8">Risk Distribution</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-3 mt-4">
            {pieData.map((item, i) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-white/50">{item.name}</span>
                </div>
                <span className="font-bold">{detections.length > 0 ? item.value : 0}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Priority List */}
      <div className="glass-panel overflow-hidden">
        <div className="p-8 border-b border-white/5 flex justify-between items-center">
          <h3 className="text-lg font-bold">Maintenance Priority List</h3>
          <p className="text-xs text-white/30">{detections.length} records found</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white/5 text-[10px] uppercase tracking-[0.2em] text-white/40">
                <th className="px-8 py-4 font-bold">Location</th>
                <th className="px-8 py-4 font-bold">Damage Type</th>
                <th className="px-8 py-4 font-bold">Priority</th>
                <th className="px-8 py-4 font-bold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {detections.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-8 py-12 text-center text-white/30">
                    No data available. Upload photos in the Detection page to see results here.
                  </td>
                </tr>
              ) : (
                detections.map((item) => (
                  <tr key={item.id} className="hover:bg-white/5 transition-colors group">
                    <td className="px-8 py-4 text-sm font-bold">{item.location.address}</td>
                    <td className="px-8 py-4 text-sm text-white/60">
                      {editingId === item.id ? (
                        <input 
                          value={editValue} 
                          onChange={(e) => setEditValue(e.target.value)}
                          className="bg-white/10 border border-wood-ash/50 rounded px-2 py-1 text-white focus:outline-none"
                        />
                      ) : item.type}
                    </td>
                    <td className="px-8 py-4">
                      <span className={cn(
                        "px-2 py-1 rounded text-[10px] font-bold uppercase",
                        item.severity === 'High' ? 'bg-red-500/20 text-red-400' : 
                        item.severity === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-green-500/20 text-green-400'
                      )}>
                        {item.severity}
                      </span>
                    </td>
                    <td className="px-8 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {editingId === item.id ? (
                          <>
                            <button onClick={() => handleSave(item.id)} className="p-2 text-green-400 hover:bg-green-400/10 rounded-lg"><Save className="w-4 h-4" /></button>
                            <button onClick={() => setEditingId(null)} className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg"><CloseIcon className="w-4 h-4" /></button>
                          </>
                        ) : (
                          <>
                            <button onClick={() => handleEdit(item.id, item.type)} className="p-2 text-white/20 hover:text-wood-ash hover:bg-white/5 rounded-lg"><Edit2 className="w-4 h-4" /></button>
                            <button onClick={() => deleteDetection(item.id)} className="p-2 text-white/20 hover:text-red-400 hover:bg-white/5 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
