import React, { useState, useEffect } from 'react';
import { SKILL_GROWTH } from '../data';
import { SkillProgress } from '../types';
import { 
  TrendingUp, Play, Pause, RotateCcw, Award, CheckCircle, Info, Flame,
  Shield, Network, Lock, BookOpen, Star, HelpCircle
} from 'lucide-react';

export default function SkillsGrowthSection() {
  const [activeMonthIdx, setActiveMonthIdx] = useState<number>(5); // 0 corresponds to Month 1, 5 to Month 6
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [selectedSkill, setSelectedSkill] = useState<SkillProgress>(SKILL_GROWTH[0]);

  // Handle Play Animation loop
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setActiveMonthIdx((prev) => {
        if (prev >= 5) {
          return 0; // Loop back
        }
        return prev + 1;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const togglePlay = () => setIsPlaying(!isPlaying);
  const resetGrowth = () => {
    setIsPlaying(false);
    setActiveMonthIdx(0);
  };

  const getMonthName = (idx: number) => {
    return `Month ${idx + 1}`;
  };

  const getMonthTheme = (idx: number) => {
    const themes = [
      "SecOps & Foundation Training",
      "SOC Operations Shift duty",
      "DLP Policy & SOP Engineering",
      "DSPM Protection & Auditing",
      "CASB Cloud & Web Proxies",
      "BI Analytics & Wrap-up"
    ];
    return themes[idx];
  };

  return (
    <div id="skills-growth-root" className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative">
      
      {/* Simulation Controls Sidebar Header */}
      <div className="lg:col-span-12 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/40 p-5 rounded-2xl border border-slate-800/60 z-10 relative">
        <div>
          <div className="flex items-center gap-1 text-xs font-mono text-emerald-400 uppercase tracking-widest mb-1">
            <Flame className="w-3.5 h-3.5 animate-pulse" />
            <span>Interactive Multi-Month Skill Vectorizer</span>
          </div>
          <h3 className="text-xl md:text-2xl font-semibold font-display text-white">
            Cybersecurity Capability Evolution Dashboard
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Simulate or progress through weeks 1–24 to trace the transformation of skillset across critical functional SecOps domains.
          </p>
        </div>

        {/* Player Controls */}
        <div className="flex items-center gap-3 bg-slate-950 p-2 rounded-xl border border-slate-850 self-start md:self-center">
          <button 
            id="growth-btn-play"
            onClick={togglePlay}
            className="p-2 rounded-lg bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-400 border border-emerald-500/20 transition-all cursor-pointer"
            title={isPlaying ? "Pause Timeline" : "Play Evolution"}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
          
          <button 
            id="growth-btn-reset"
            onClick={resetGrowth}
            className="p-2 rounded-lg bg-slate-900 hover:bg-slate-850 text-slate-400 border border-slate-800 transition-all cursor-pointer"
            title="Reset to Month 1"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <span className="w-px h-6 bg-slate-800 shrink-0" />

          {/* Month Indicator */}
          <div className="px-3">
            <span className="text-[10px] font-mono text-slate-500 block uppercase">SIMULATED TIME</span>
            <span className="text-xs font-bold text-slate-200 font-mono">{getMonthName(activeMonthIdx)}</span>
          </div>
        </div>
      </div>

      {/* Main Bar Chart Panel */}
      <div className="lg:col-span-8 flex flex-col space-y-5 bg-slate-950/40 p-6 rounded-2xl border border-slate-900">
        
        {/* Horizontal Slide Selector block */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="text-slate-400">Drag timeline to manually adjust skill index:</span>
            <span className="text-emerald-400 font-bold bg-emerald-950/35 px-2.5 py-0.5 rounded-full border border-emerald-500/10">
              {getMonthTheme(activeMonthIdx)}
            </span>
          </div>

          <div className="relative pt-2">
            <input 
              id="month-growth-slider"
              type="range" 
              min="0" 
              max="5" 
              value={activeMonthIdx}
              onChange={(e) => {
                setIsPlaying(false);
                setActiveMonthIdx(parseInt(e.target.value));
              }}
              className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
            {/* Legend Ticks */}
            <div className="flex justify-between text-[10px] font-mono text-slate-500 px-1 pt-1.5">
              <span>Month 1 (Start)</span>
              <span>Month 2</span>
              <span>Month 3 (DLP)</span>
              <span>Month 4 (DSPM)</span>
              <span>Month 5</span>
              <span>Month 6 (End)</span>
            </div>
          </div>
        </div>

        {/* Skill Progress Bar Chart */}
        <div className="space-y-4 pt-4">
          {SKILL_GROWTH.map((skill) => {
            const currentValue = skill.history[activeMonthIdx];
            const isTarget = selectedSkill.name === skill.name;
            
            return (
              <div 
                id={`skill-row-${skill.name.toLowerCase().replace(' ', '-')}`}
                key={skill.name}
                onClick={() => setSelectedSkill(skill)}
                className={`group p-2.5 rounded-xl transition-all cursor-pointer flex flex-col ${
                  isTarget 
                    ? 'bg-blue-950/5 border border-blue-500/20' 
                    : 'bg-transparent border border-transparent hover:bg-slate-900/30'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5 text-xs">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full bg-blue-500 ${isTarget ? 'animate-ping' : ''}`} />
                    <span className="font-semibold text-white group-hover:text-blue-400 transition-colors uppercase tracking-wide text-[11px] font-mono">{skill.name}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 font-mono text-[10px]">
                    <span className="text-slate-500">M1: {skill.initial}%</span>
                    <span className="text-slate-400 font-bold">&rarr;</span>
                    <span className="text-emerald-400 font-bold text-xs">{currentValue}% Rating</span>
                  </div>
                </div>

                {/* Growth bar track */}
                <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden border border-slate-850 p-0.5">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 h-full rounded-full transition-all duration-500"
                    style={{ width: `${currentValue}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Skill Information Card Panel */}
      <div className="lg:col-span-4 flex flex-col">
        {selectedSkill ? (
          <div id="selected-skill-card" className="bg-slate-950/50 border border-slate-800 rounded-2xl p-5 flex flex-col h-full relative overflow-hidden">
            <div className={`absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-2xl rounded-full`} />
            
            <span className="text-[10px] font-mono text-slate-500 uppercase block mb-1">Detailed Technical Vector</span>
            <h4 className="text-base font-semibold font-display text-white mb-2 uppercase tracking-wide flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-400" />
              {selectedSkill.name}
            </h4>

            <p className="text-xs text-slate-300 leading-relaxed font-sans mb-4">
              {selectedSkill.description}
            </p>

            {/* Profile Statistics info */}
            <div className="space-y-3.5 text-xs font-mono mb-6 pt-3 border-t border-slate-900">
              <div className="flex justify-between items-center border-b border-slate-900 pb-2">
                <span className="text-slate-500">Starting Competency:</span>
                <span className="text-slate-300 font-bold">{selectedSkill.initial}% Rating</span>
              </div>
              <div className="flex justify-between items-center border-b border-slate-900 pb-2">
                <span className="text-slate-500">Peak Gained Competency:</span>
                <span className="text-emerald-400 font-bold">{selectedSkill.peak}% Expert Rating</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Total Net Expansion:</span>
                <span className="text-blue-400 font-bold">+{selectedSkill.peak - selectedSkill.initial}% Growth</span>
              </div>
            </div>

            <div className="space-y-2 mt-auto">
              <span className="text-[10px] font-mono text-slate-500 block uppercase">Gained Application Context:</span>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400 leading-relaxed italic">
                {selectedSkill.name === "Incident Analysis" && "Applied to analyze, triage, and escalate standard InsightIDR alert pipelines into unified forensic logs."}
                {selectedSkill.name === "Threat Investigation" && "Used to audit malicious triggers inside SentinelOne EDR workspaces, tracing host indicators."}
                {selectedSkill.name === "DLP Operations" && "Critical for auditing active user file transfers, creating compliance regex filters, and tuning Forcepoint monitors."}
                {selectedSkill.name === "Security Monitoring" && "Developed to manage continuous SOC coverage rotation, checking incoming cloud and workstation alerts."}
                {selectedSkill.name === "Documentation" && "Assigned to formulate SafeAeon team onboarding playbooks, audit logs reports, and summary slide decks."}
                {selectedSkill.name === "Policy Creation" && "Employed to draft internal compliance configurations protecting sensitive fields from shadow cloud routing leaks."}
                {selectedSkill.name === "Reporting" && "Maintained to transform monthly CSV telemetry logs into clean databases and predictive executive summaries."}
                {selectedSkill.name === "Cloud Security" && "Applied to configure CASB proxies to trace client apps bandwidth and blocks insecure file upload sites."}
                {selectedSkill.name === "Data Security" && "Relevant when indexing unstructured cloud folders, detecting unencrypted SQL archives, and updating DSPM rule sets."}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-slate-950/20 border border-slate-850 rounded-2xl p-6 text-center text-slate-500 italic h-full flex items-center justify-center">
            Select a skill progress row from the left dashboard list to audit metrics.
          </div>
        )}
      </div>
    </div>
  );
}
