import React from 'react';
import { motion } from 'motion/react';
import { AlertCircle, CheckCircle2, ShieldCheck, Construction, IndianRupee } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-24 pb-20">
      {/* Problem Statement */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <AlertCircle className="w-6 h-6 text-red-500" />
          <h2 className="text-sm font-bold uppercase tracking-widest text-red-500">The Problem</h2>
        </div>
        <h1 className="text-4xl font-bold mb-8 leading-tight">
          Road Infrastructure Challenges in India
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6 text-white/60 leading-relaxed">
            <p>
              India's road network is the second largest in the world, yet it faces significant 
              maintenance challenges. Potholes and road damage contribute to over 3,000 deaths 
              annually and cause massive economic losses.
            </p>
            <p>
              Traditional inspection methods are slow, manual, and reactive—often identifying 
              problems only after they have caused accidents or required expensive full-scale 
              reconstruction.
            </p>
          </div>
          <div className="glass-panel p-8 border-red-500/20 bg-red-500/5">
            <h3 className="text-lg font-bold mb-4 text-white">Key Statistics</h3>
            <ul className="space-y-4">
              <li className="flex justify-between items-center">
                <span className="text-white/50">Annual Fatalities</span>
                <span className="text-red-400 font-bold">3,500+</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-white/50">Economic Loss</span>
                <span className="text-red-400 font-bold">₹2.4 Lakh Cr</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-white/50">Manual Inspection Error</span>
                <span className="text-red-400 font-bold">~35%</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="glass-panel p-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-wood-ash/10 blur-3xl -mr-32 -mt-32 rounded-full"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <ShieldCheck className="w-6 h-6 text-wood-ash" />
            <h2 className="text-sm font-bold uppercase tracking-widest text-wood-ash">Our Solution</h2>
          </div>
          <h2 className="text-3xl font-bold mb-8">AI-Driven Predictive Maintenance</h2>
          <p className="text-xl text-white/70 mb-12 leading-relaxed">
            We move from reactive "fix-it-when-broken" to proactive "predict-and-prevent" maintenance.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Computer Vision",
                desc: "Deep learning models trained on thousands of road damage samples for 95%+ detection accuracy."
              },
              {
                title: "Predictive Analytics",
                desc: "Algorithms that factor in traffic, weather, and age to predict when a road will fail."
              },
              {
                title: "Smart Prioritization",
                desc: "Automated work-order generation based on risk levels and budget constraints."
              }
            ].map((item, i) => (
              <div key={i} className="space-y-4">
                <h4 className="font-bold text-wood-ash">{item.title}</h4>
                <p className="text-sm text-white/50 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section>
        <h2 className="text-3xl font-bold mb-12 text-center">System Benefits</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Construction,
              title: "Preventive Maintenance",
              desc: "Fix small cracks before they become deep potholes, extending road life by 5-10 years."
            },
            {
              icon: IndianRupee,
              title: "Cost Reduction",
              desc: "Early intervention is 6x cheaper than major reconstruction. Optimize municipal budgets."
            },
            {
              icon: CheckCircle2,
              title: "Enhanced Safety",
              desc: "Significantly reduce road-hazard related accidents through timely repairs."
            }
          ].map((benefit, i) => (
            <div key={i} className="text-center space-y-4">
              <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <benefit.icon className="w-8 h-8 text-wood-ash" />
              </div>
              <h3 className="text-xl font-bold">{benefit.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{benefit.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
