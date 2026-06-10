import React, { useState } from 'react';
import { TECHNOLOGIES } from '../data';
import { Technology } from '../types';
import { 
  ShieldAlert, Terminal, Mail, Layers, Lock, Database, Cloud, Globe, 
  FileSpreadsheet, BarChart3, HelpCircle, CheckCircle, Sliders, Info, Cpu
} from 'lucide-react';

export default function TechnologiesSection() {
  const [selectedTech, setSelectedTech] = useState<Technology | null>(TECHNOLOGIES[0]);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const getToolLogoIcon = (name: string, color: string) => {
    const size = "w-6 h-6";
    switch (name) {
      case "SentinelOne": return <ShieldAlert className={`${size}`} style={{ color }} />;
      case "Rapid7 InsightIDR": return <Terminal className={`${size}`} style={{ color }} />;
      case "Avanan": return <Mail className={`${size}`} style={{ color }} />;
      case "Jira Service Management": return <Layers className={`${size}`} style={{ color }} />;
      case "Forcepoint DLP": return <Lock className={`${size}`} style={{ color }} />;
      case "DSPM": return <Database className={`${size}`} style={{ color }} />;
      case "CASB": return <Cloud className={`${size}`} style={{ color }} />;
      case "Web Security": return <Globe className={`${size}`} style={{ color }} />;
      case "Excel": return <FileSpreadsheet className={`${size}`} style={{ color }} />;
      case "Power BI": return <BarChart3 className={`${size}`} style={{ color }} />;
      default: return <Cpu className={`${size}`} style={{ color }} />;
    }
  };

  const categories = ['all', 'Endpoint Security', 'Data Loss Prevention', 'SIEM & Logging', 'Cloud & Network', 'Reporting'];

  const filteredTechnologies = TECHNOLOGIES.filter(tech => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'Endpoint Security') return tech.category === 'Endpoint Security';
    if (activeCategory === 'Data Loss Prevention') return tech.category === 'Data Loss Prevention' || tech.category === 'Cloud Data Posture';
    if (activeCategory === 'SIEM & Logging') return tech.category === 'SIEM & Logging' || tech.category === 'ITSM Systems';
    if (activeCategory === 'Cloud & Network') return tech.category === 'Cloud Security' || tech.category === 'Network Gateway' || tech.category === 'Email Security';
    if (activeCategory === 'Reporting') return tech.category === 'Data Analytics' || tech.category === 'Data Visualization';
    return true;
  });

  return (
    <div id="technologies-root" className="space-y-6">
      
      {/* Category Tabs */}
      <div className="flex flex-wrap gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-900 self-start">
        {categories.map((cat) => (
          <button
            key={cat}
            id={`tech-cat-${cat.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
              activeCategory === cat 
                ? 'bg-blue-600/20 text-blue-400 border border-blue-500/20' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {cat === 'all' ? 'All Platforms' : cat}
          </button>
        ))}
      </div>

      {/* Grid of Tech Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredTechnologies.map((tech) => {
          const isSelected = selectedTech?.name === tech.name;
          return (
            <div 
              id={`tech-card-${tech.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
              key={tech.name}
              onClick={() => setSelectedTech(tech)}
              className={`p-5 rounded-2xl cursor-pointer transition-all duration-300 relative overflow-hidden flex flex-col justify-between ${
                isSelected 
                  ? 'bg-slate-900/80 border border-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.08)]' 
                  : 'bg-slate-950/60 border border-slate-850 hover:bg-slate-900/30 hover:border-slate-800'
              }`}
            >
              {/* Backglow element using inline-styles to dynamically scale colors */}
              <div 
                className="absolute -right-8 -bottom-8 w-24 h-24 blur-2xl rounded-full opacity-5 pointer-events-none transition-transform duration-500" 
                style={{ backgroundColor: tech.color }}
              />

              {/* Tool Card Top Row */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center font-mono text-sm shadow-inner shrink-0">
                      {getToolLogoIcon(tech.name, tech.color)}
                    </div>
                    <div>
                      <h4 className="text-white font-bold font-display tracking-tight text-sm md:text-base leading-none">{tech.name}</h4>
                      <span className="text-[10px] font-mono text-slate-500 block mt-1 uppercase tracking-wider">{tech.category}</span>
                    </div>
                  </div>
                  
                  {/* Proficiency Number Indicator */}
                  <div className="text-right">
                    <span className="text-[10px] font-mono text-slate-500 block uppercase">USE STATE</span>
                    <span className="font-mono text-xs font-bold" style={{ color: tech.color }}>{tech.experienceLevel}% EXP</span>
                  </div>
                </div>

                {/* Purpose Text block */}
                <p className="text-xs text-slate-300 leading-relaxed font-sans mb-4">
                  {tech.purpose}
                </p>

                {/* Skills Bullet points list */}
                <div className="space-y-1.5 mb-5">
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block font-bold mb-1">Skills Acquired:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {tech.skillsAcquired.map((skill, index) => (
                      <span 
                        key={index}
                        className="text-[10px] font-mono bg-slate-900/60 border border-slate-850 text-slate-300 px-2 py-0.5 rounded"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Slider meter block representing expertise */}
              <div className="pt-2 border-t border-slate-900">
                <div className="flex justify-between items-center text-[10px] font-mono text-slate-500 mb-1">
                  <span>Relative Mastery Index</span>
                  <span className="font-bold" style={{ color: tech.color }}>{tech.experienceLevel === 95 ? "Expert Lead" : "Highly Capable"}</span>
                </div>
                <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden p-px border border-slate-850">
                  <div 
                    className="h-full rounded-full transition-all duration-700" 
                    style={{ backgroundColor: tech.color, width: `${tech.experienceLevel}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Embedded Technology Info Box Detail */}
      {selectedTech && (
        <div id="tech-detail-panel" className="bg-slate-950/40 p-4 rounded-xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 font-sans text-xs">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
            <div>
              <span className="text-white font-semibold font-display block mb-0.5">Academic Evaluation Context: {selectedTech.name}</span>
              <p className="text-slate-400 leading-relaxed">
                During the 6-month rotation, usage of <strong className="text-slate-300">{selectedTech.name}</strong> was focused on real production scenarios to protect internal corporate client vectors. This is fully qualified for academic reviews, portfolio representations, and junior hire recruiters.
              </p>
            </div>
          </div>
          
          <div className="flex gap-2 shrink-0">
            <span className="px-3 py-1.5 rounded bg-slate-900 text-[10px] font-mono text-slate-300 border border-slate-800">
              Platform: {selectedTech.category}
            </span>
            <span className="px-3 py-1.5 rounded bg-slate-900 text-[10px] font-mono text-emerald-400 border border-emerald-500/10">
              Academic Validated: True
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
