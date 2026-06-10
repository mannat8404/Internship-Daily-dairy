import React, { useState } from 'react';
import { MONTHS_DATA } from '../data';
import { WeekDetail, MonthData } from '../types';
import { 
  Calendar, CheckCircle2, ChevronRight, Sliders, Terminal, Shield, Lock, 
  Database, Cloud, BarChart3, Clock, PlayCircle, Eye, HelpCircle, AlertCircle
} from 'lucide-react';

interface TimelineSectionProps {
  onSelectWeek?: (weekNumber: number) => void;
}

export default function TimelineSection({ onSelectWeek }: TimelineSectionProps) {
  const [selectedMonth, setSelectedMonth] = useState<number | 'all'>('all');
  const [expandedWeeks, setExpandedWeeks] = useState<Record<number, boolean>>({
    1: true, 2: true, 5: true, 9: true, 13: true, 17: true, 21: true // Initially expanded first week of each month
  });
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const toggleWeek = (weekNum: number) => {
    setExpandedWeeks(prev => ({
      ...prev,
      [weekNum]: !prev[weekNum]
    }));
    if (onSelectWeek) {
      onSelectWeek(weekNum);
    }
  };

  const getCategoryIcon = (category: WeekDetail['category']) => {
    switch (category) {
      case 'onboarding': return <Sliders className="w-4 h-4 text-blue-400" />;
      case 'training': return <Terminal className="w-4 h-4 text-cyan-400" />;
      case 'operations': return <Shield className="w-4 h-4 text-emerald-400" />;
      case 'dlp': return <Lock className="w-4 h-4 text-purple-400" />;
      case 'dspm': return <Database className="w-4 h-4 text-pink-400" />;
      case 'cloud': return <Cloud className="w-4 h-4 text-rose-400" />;
      case 'analytics': return <BarChart3 className="w-4 h-4 text-amber-400" />;
      case 'wrap-up': return <CheckCircle2 className="w-4 h-4 text-teal-400" />;
      default: return <Clock className="w-4 h-4 text-slate-400" />;
    }
  };

  const getCategoryThemeColor = (category: WeekDetail['category']) => {
    switch (category) {
      case 'onboarding': return 'border-blue-500/30 bg-blue-500/5 text-blue-400';
      case 'training': return 'border-cyan-500/30 bg-cyan-500/5 text-cyan-400';
      case 'operations': return 'border-emerald-500/30 bg-emerald-500/5 text-emerald-400';
      case 'dlp': return 'border-purple-500/30 bg-purple-500/5 text-purple-400';
      case 'dspm': return 'border-pink-500/30 bg-pink-500/5 text-pink-400';
      case 'cloud': return 'border-rose-500/30 bg-rose-500/5 text-rose-400';
      case 'analytics': return 'border-amber-500/30 bg-amber-500/5 text-amber-400';
      case 'wrap-up': return 'border-teal-500/30 bg-teal-500/5 text-teal-400';
      default: return 'border-slate-700 bg-slate-800 text-slate-300';
    }
  };

  // Filtered dataset
  const filteredMonths = MONTHS_DATA.filter(month => {
    if (selectedMonth === 'all') return true;
    return month.monthNumber === selectedMonth;
  });

  const allFilteredWeeks = filteredMonths.flatMap(m => m.weeks).filter(week => {
    if (categoryFilter === 'all') return true;
    return week.category === categoryFilter;
  });

  const categories = [
    { value: 'all', label: 'All Disciplines' },
    { value: 'onboarding', label: 'Onboarding' },
    { value: 'training', label: 'Tech Training' },
    { value: 'operations', label: 'SOC Operations' },
    { value: 'dlp', label: 'DLP Audits' },
    { value: 'dspm', label: 'DSPM Security' },
    { value: 'cloud', label: 'CASB & Cloud' },
    { value: 'analytics', label: 'Business Intell.' },
  ];

  return (
    <div id="timeline-section" className="space-y-8 relative">
      <div className="absolute left-4 top-16 bottom-0 w-0.5 bg-slate-800/80 pointer-events-none hidden lg:block" />
      
      {/* Search and Navigation Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/40 p-4 rounded-2xl border border-slate-800/60 relative z-10">
        
        {/* Month Selector */}
        <div className="flex flex-wrap gap-1">
          <button 
            id="month-btn-all"
            onClick={() => setSelectedMonth('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${selectedMonth === 'all' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white bg-slate-950/40'}`}
          >
            All 6 Months
          </button>
          {MONTHS_DATA.map((m) => (
            <button 
              id={`month-btn-${m.monthNumber}`}
              key={m.monthNumber}
              onClick={() => setSelectedMonth(m.monthNumber)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${selectedMonth === m.monthNumber ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white bg-slate-950/40'}`}
            >
              M{m.monthNumber}
            </button>
          ))}
        </div>

        {/* Categories filters */}
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-mono text-slate-500 uppercase shrink-0">Filter:</span>
          <select
            id="category-filter-select"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-300 px-3 py-1.5 font-mono focus:outline-none focus:border-blue-500 cursor-pointer"
          >
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>{cat.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Structured Month-by-Month Timeline */}
      <div className="space-y-12">
        {filteredMonths.map((month) => {
          // Check if month has weeks matching the category filter
          const matchingWeeks = month.weeks.filter(week => {
            if (categoryFilter === 'all') return true;
            return week.category === categoryFilter;
          });

          if (matchingWeeks.length === 0) return null;

          return (
            <div id={`timeline-month-block-${month.monthNumber}`} key={month.monthNumber} className="relative z-10">
              
              {/* Month Header Banner */}
              <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-800 pb-3 mb-6 gap-3">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center bg-blue-600/10 text-blue-400 border border-blue-500/20 font-mono font-semibold`}>
                    0{month.monthNumber}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold font-display tracking-tight text-white flex items-center gap-2">
                      Month {month.monthNumber} – {month.title}
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5 font-sans leading-relaxed">{month.theme}</p>
                  </div>
                </div>
                
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider bg-slate-950/60 px-2.5 py-1 rounded-full border border-slate-850">
                  Weeks {month.weeks[0].weekNumber} - {month.weeks[month.weeks.length - 1].weekNumber}
                </span>
              </div>

              {/* Weeks List */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pl-0 lg:pl-10">
                {matchingWeeks.map((week) => {
                  const isExpanded = expandedWeeks[week.weekNumber];
                  return (
                    <div 
                      id={`week-card-${week.weekNumber}`}
                      key={week.weekNumber}
                      onClick={() => toggleWeek(week.weekNumber)}
                      className={`lg:col-span-12 group rounded-xl p-4 transition-all duration-300 cursor-pointer ${
                        isExpanded 
                          ? 'bg-slate-900/60 border border-blue-500/25 shadow-[0_0_20px_rgba(59,130,246,0.06)]' 
                          : 'bg-slate-950/40 border border-slate-850 hover:bg-slate-900/30 hover:border-slate-800'
                      }`}
                    >
                      {/* Week Header Row */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center border ${
                            isExpanded ? 'bg-blue-500/15 border-blue-500/40' : 'bg-slate-900 border-slate-800'
                          }`}>
                            <span className="text-xs font-mono font-semibold text-blue-400">W{week.weekNumber}</span>
                          </div>

                          <div>
                            <h5 className="text-sm md:text-base font-semibold font-display text-white group-hover:text-blue-400 transition-colors">
                              {week.title}
                            </h5>
                            
                            <div className="flex flex-wrap gap-2 mt-1">
                              {week.focusPlatform && (
                                <span className="text-[10px] font-mono bg-slate-900 px-2 py-0.5 rounded text-slate-300 border border-slate-800">
                                  {week.focusPlatform}
                                </span>
                              )}
                              <span className={`text-[9px] font-mono uppercase px-2 py-0.5 rounded border ${getCategoryThemeColor(week.category)}`}>
                                {week.category}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 self-end sm:self-center font-mono text-xs text-slate-500">
                          <span>{isExpanded ? 'Collapse' : 'Expand Journey'}</span>
                          <ChevronRight className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-90' : 'group-hover:translate-x-0.5'}`} />
                        </div>
                      </div>

                      {/* Expandable tasks list detail */}
                      {isExpanded && (
                        <div className="mt-4 pt-4 border-t border-slate-800/60 pl-0 sm:pl-11 grid grid-cols-1 md:grid-cols-12 gap-4">
                          <div className="md:col-span-8 space-y-2">
                            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block font-bold mb-1.5">Acquired Tasks & Achievements:</span>
                            {week.items.map((item, idx) => (
                              <div key={idx} className="flex items-start gap-2 text-xs text-slate-300 leading-relaxed">
                                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                                <span>{item}</span>
                              </div>
                            ))}
                          </div>

                          {/* Detail summary badge/quote context */}
                          <div className="md:col-span-4 bg-slate-950/60 p-3 rounded-lg border border-slate-800 flex flex-col justify-between">
                            <div className="text-[11px] font-mono text-slate-400 border-b border-slate-900 pb-1.5 mb-1.5">
                              Platform Learnings
                            </div>
                            <div className="text-xs text-slate-300 leading-relaxed italic">
                              {week.category === 'onboarding' && 'Acquiring security paradigms, meeting team analysts, and syncing operational models.'}
                              {week.category === 'training' && 'Running high-throughput sandbox attacks and verifying EDR/SIEM threat logging rules.'}
                              {week.category === 'operations' && 'Monitoring alarms, correlating multi-source alerts, and isolating suspect endpoints.'}
                              {week.category === 'dlp' && 'Custom regex development, false-positive reductions, and peripheral media controls.'}
                              {week.category === 'dspm' && 'Cataloging unstructured S3 database backups and checking replication permissions.'}
                              {week.category === 'cloud' && 'Shadow-IT audits, block proxies setups, and unapproved application scans.'}
                              {week.category === 'analytics' && 'ETL logic models, DAX code writing, and department dashboard deployment.'}
                              {week.category === 'wrap-up' && 'Final training walkthroughs, artifact consolidation, and career retrospective.'}
                            </div>
                            <div className="flex items-center gap-1.5 mt-3 text-blue-400 text-[10px] font-mono">
                              {getCategoryIcon(week.category)}
                              <span className="capitalize">{week.category} Domain</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
