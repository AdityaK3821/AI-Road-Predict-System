import React from 'react';
import { motion } from 'motion/react';
import {
  Home,
  Info,
  Upload,
  Map as MapIcon,
  TrendingUp,
  LayoutDashboard,
  Menu,
  X,
  Route,
  AlertTriangle,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { cn } from './utils';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import DetectionPage from './components/DetectionPage';
import MapDashboard from './components/MapDashboard';
import PredictionPage from './components/PredictionPage';
import AdminDashboard from './components/AdminDashboard';

type Page = 'home' | 'about' | 'detection' | 'map' | 'prediction' | 'admin';

import { RoadProvider } from './RoadContext';

export default function App() {
  const [currentPage, setCurrentPage] = React.useState<Page>('home');
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'about', label: 'About', icon: Info },
    { id: 'detection', label: 'Detection', icon: Upload },
    { id: 'map', label: 'Map', icon: MapIcon },
    { id: 'prediction', label: 'Prediction', icon: TrendingUp },
    { id: 'admin', label: 'Admin', icon: LayoutDashboard },
  ];

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <HomePage onNavigate={setCurrentPage} />;
      case 'about': return <AboutPage />;
      case 'detection': return <DetectionPage />;
      case 'map': return <MapDashboard />;
      case 'prediction': return <PredictionPage />;
      case 'admin': return <AdminDashboard />;
      default: return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <RoadProvider>
      <div className="min-h-screen flex flex-col bg-dark-grey">
        {/* Navigation */}
        <nav className="sticky top-0 z-50 bg-dark-grey/80 backdrop-blur-lg border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              <div
                className="flex items-center gap-3 cursor-pointer group"
                onClick={() => setCurrentPage('home')}
              >
                <div className="p-2 bg-wood-ash rounded-lg group-hover:rotate-12 transition-transform">
                  <Route className="w-6 h-6 text-dark-grey" />
                </div>
                <div>
                  <h1 className="text-xl font-bold tracking-tight">ROAD<span className="text-wood-ash">AI</span></h1>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-white/50 font-medium">Predictive Maintenance</p>
                </div>
              </div>

              {/* Desktop Nav */}
              <div className="hidden md:flex items-center gap-1">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setCurrentPage(item.id as Page)}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
                      currentPage === item.id
                        ? "bg-wood-ash text-dark-grey"
                        : "text-white/70 hover:text-white hover:bg-white/5"
                    )}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Mobile Menu Toggle */}
              <div className="md:hidden">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="p-2 text-white/70 hover:text-white"
                >
                  {isMenuOpen ? <X /> : <Menu />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Nav */}
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="md:hidden bg-dark-grey border-b border-white/10 px-4 py-4 space-y-2"
            >
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentPage(item.id as Page);
                    setIsMenuOpen(false);
                  }}
                  className={cn(
                    "flex items-center gap-3 w-full px-4 py-3 rounded-xl text-base font-medium transition-all",
                    currentPage === item.id
                      ? "bg-wood-ash text-dark-grey"
                      : "text-white/70 hover:text-white hover:bg-white/5"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </button>
              ))}
            </motion.div>
          )}
        </nav>

        {/* Main Content */}
        <main className="flex-grow">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
          >
            {renderPage()}
          </motion.div>
        </main>


        <footer className="bg-black/40 border-t border-white/5 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center gap-3 mb-6">
                  <Route className="w-6 h-6 text-wood-ash" />
                  <h2 className="text-xl font-bold tracking-tight">ROAD<span className="text-wood-ash">AI</span></h2>
                </div>
                <p className="text-white/50 max-w-md leading-relaxed">
                  Empowering smart cities with AI-driven predictive road maintenance.
                  We use advanced computer vision and predictive analytics to ensure safer,
                  more efficient urban infrastructure.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-wood-ash mb-6">Quick Links</h3>
                <ul className="space-y-4">
                  {navItems.slice(0, 4).map(item => (
                    <li key={item.id}>
                      <button
                        onClick={() => setCurrentPage(item.id as Page)}
                        className="text-white/50 hover:text-wood-ash transition-colors text-sm"
                      >
                        {item.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-wood-ash mb-6">Contact</h3>
                <ul className="space-y-4 text-sm text-white/50">
                  <li>Salem</li>
                  <li>Tamilnadu, India</li>
                  <li>aditiyakesavaraj@gmail.com</li>
                </ul>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-white/30 text-xs">© 2026 ROADAI Predictive Maintenance System. All rights reserved.</p>
              <div className="flex gap-6">
                <a href="#" className="text-white/30 hover:text-white text-xs">Privacy Policy</a>
                <a href="#" className="text-white/30 hover:text-white text-xs">Terms of Service</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </RoadProvider>
  );
}