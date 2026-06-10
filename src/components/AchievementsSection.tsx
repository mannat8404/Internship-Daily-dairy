import React, { useState } from 'react';
import { ACHIEVEMENTS } from '../data';
import { Achievement } from '../types';
import { 
  ShieldAlert, Lock, CloudLightning, BarChart3, FileSpreadsheet, Eye, 
  Award, Trophy, Terminal, CheckCircle2, ChevronDown, Sparkles
} from 'lucide-react';

export default function AchievementsSection() {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  const getAchievementIcon = (name: string) => {
    const size = "w-5 h-5 text-amber-400";
    switch (name) {
      case "ShieldAlert": return <ShieldAlert className={size} />;
      case "Lock": return <Lock className={size} />;
      case "CloudLightning": return <CloudLightning className={size} />;
      case "BarChart3": return <BarChart3 className={size} />;
      case "FileSpreadsheet": return <FileSpreadsheet className={size} />;
      case "Eye": return <Eye className={size} />;
      default: return <Award className={size} />;
    }
  };

  return (
    <div id="achievements shadow-root" className="space-y-6">
      
      {/* Visual Showcase Header Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {ACHIEVEMENTS.map((item) => (
          <div 
            id={`achievement-card-${item.id}`}
            key={item.id}
            onClick={() => setSelectedTopic(item.id)}
            className="p-5 rounded-2xl bg-slate-950/50 border border-slate-850 hover:border-amber-500/20 active:border-amber-500/30 transition-all duration-300 relative group overflow-hidden flex flex-col justify-between"
          >
            {/* Top Shine lines indicator */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-amber-500/10 to-transparent" />
            <div className="absolute -right-6 -top-6 w-16 h-16 bg-amber-500/3 rounded-full opacity-40 group-hover:scale-150 transition-all duration-500" />

            <div>
              {/* Icon & Category Tag Row */}
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center">
                  {getAchievementIcon(item.iconName)}
                </div>
                
                <span className="text-[9px] font-mono font-medium text-amber-500/80 bg-amber-500/5 px-2.5 py-1 rounded-full border border-amber-500/15 uppercase tracking-widest">
                  {item.category}
                </span>
              </div>

              {/* Title & Metric Row */}
              {item.metric && (
                <div className="text-xl font-bold font-mono text-white mb-1">
                  {item.metric}
                </div>
              )}
              
              <h4 className="text-sm md:text-base font-semibold font-display text-white mb-2 leading-snug group-hover:text-amber-300 transition-colors">
                {item.title}
              </h4>

              {/* Description Body text */}
              <p className="text-xs text-slate-400 leading-relaxed font-sans mt-2 mb-4">
                {item.description}
              </p>
            </div>

            {/* Bottom Platform stack indicators */}
            <div className="pt-3 border-t border-slate-900 flex flex-wrap gap-1">
              {item.technologies.map((tech, idx) => (
                <span 
                  key={idx} 
                  className="text-[9px] font-mono bg-slate-900 text-slate-400 px-2 py-0.5 rounded border border-slate-850"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Verified Achievement Badge */}
      <div className="bg-slate-950/40 border border-slate-800 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center border border-amber-500/20 shrink-0">
            <Trophy className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <h5 className="text-sm font-semibold font-display text-white flex items-center gap-1.5 leading-none mb-1">
              <span>Executive Verification Log</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            </h5>
            <p className="text-xs text-slate-400 leading-relaxed max-w-2xl font-sans">
              All listed milestones correlate directly with SafeAeon rotational checkpoints, Excel metrics spreadsheets, and final internship performance sheets submitted to supervisors.
            </p>
          </div>
        </div>

        <div className="text-[10px] font-mono text-slate-500 italic shrink-0">
          Graduation ID Code: SA-2026-M SINGH
        </div>
      </div>
    </div>
  );
}
