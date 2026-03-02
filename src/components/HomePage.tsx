import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Shield, Zap, BarChart3, Globe } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: any) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden rounded-3xl">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&q=80&w=2000" 
            alt="Smart City"
            className="w-full h-full object-cover opacity-40"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-dark-grey/20 via-dark-grey/60 to-dark-grey"></div>
        </div>

        <div className="relative z-10 text-center max-w-4xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 rounded-full bg-wood-ash/10 border border-wood-ash/20 text-wood-ash text-xs font-bold uppercase tracking-[0.2em]">
              Smart City Infrastructure v2.0
            </span>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-[1.1] tracking-tight">
              Predict Today. <br />
              <span className="text-wood-ash">Repair Tomorrow.</span>
            </h1>
            <p className="text-xl text-white/60 mb-10 max-w-2xl mx-auto leading-relaxed">
              AI-Based Predictive Road Maintenance System. Leveraging computer vision and 
              deep learning to monitor, analyze, and predict road infrastructure health in real-time.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={() => onNavigate('detection')}
                className="btn-primary flex items-center gap-2 w-full sm:w-auto justify-center"
              >
                Start Detection <ArrowRight className="w-4 h-4" />
              </button>
              <button 
                onClick={() => onNavigate('about')}
                className="btn-secondary w-full sm:w-auto justify-center"
              >
                Learn More
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            icon: Shield,
            title: "Enhanced Safety",
            desc: "Reduce accidents by identifying and repairing road hazards before they become critical."
          },
          {
            icon: Zap,
            title: "Real-time Monitoring",
            desc: "Instant detection of potholes, cracks, and surface irregularities using AI computer vision."
          },
          {
            icon: BarChart3,
            title: "Cost Efficiency",
            desc: "Save up to 40% on maintenance costs through early intervention and optimized resource allocation."
          }
        ].map((feature, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="glass-panel p-8 hover:border-wood-ash/30 transition-colors group"
          >
            <div className="w-12 h-12 bg-wood-ash/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <feature.icon className="w-6 h-6 text-wood-ash" />
            </div>
            <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
            <p className="text-white/50 leading-relaxed">{feature.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* Intro Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
            Revolutionizing Urban <br />
            <span className="text-wood-ash">Mobility & Infrastructure</span>
          </h2>
          <p className="text-white/60 mb-8 leading-relaxed">
            Our system uses high-resolution imaging and advanced AI models to create a 
            comprehensive digital twin of the road network. By analyzing historical data 
            and current conditions, we provide actionable insights for city planners.
          </p>
          <ul className="space-y-4">
            {[
              "Automated damage classification",
              "Predictive risk scoring",
              "Maintenance priority mapping",
              "Integration with municipal dashboards"
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-white/80">
                <div className="w-1.5 h-1.5 rounded-full bg-wood-ash"></div>
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative aspect-video rounded-3xl overflow-hidden border border-white/10"
        >
          <img 
            src="https://images.unsplash.com/photo-1545143333-11bb24019ea2?auto=format&fit=crop&q=80&w=1200" 
            alt="Road Monitoring"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-wood-ash/10 mix-blend-overlay"></div>
        </motion.div>
      </section>
    </div>
  );
}
