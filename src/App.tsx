import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, ShieldCheck, ShieldAlert, Terminal, Lock, Server, Database, 
  Network, Activity, BarChart3, Clock, PlayCircle, Eye, Sliders, Info, 
  Flame, Award, Trophy, ArrowDown, ExternalLink, Mail, Phone, MapPin, 
  Layers, CheckCircle, GraduationCap, ChevronRight, UserCheck, Sparkles, AlertCircle
} from 'lucide-react';

import { STATS } from './data';
import SecurityDashboard from './components/SecurityDashboard';
import TimelineSection from './components/TimelineSection';
import SkillsGrowthSection from './components/SkillsGrowthSection';
import TechnologiesSection from './components/TechnologiesSection';
import AchievementsSection from './components/AchievementsSection';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [scrolled, setScrolled] = useState(false);
  const [activeStage, setActiveStage] = useState<number>(0);

  // Monitor Scroll positions to trigger active section indicators and navbar background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Section highlighters
      const sections = ['hero', 'sim-dashboard', 'timeline', 'tech-stack', 'skills-matrix', 'achievements', 'reflection'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 180 && rect.bottom >= 180) {
            setActiveSection(sectionId);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // 5 Restoration/Transformation Stages for the Retrospective Section
  const transformationStages = [
    {
      title: "Phase 1: Seed Trainee",
      weeks: "Weeks 1–4",
      highlight: "EDR & SIEM Fundamentals",
      descr: "Acquired critical foundational telemetry of SecOps workloads, executing mock threat sandboxing sweeps in SentinelOne and Rapid7 InsightIDR.",
      badge: "PLATFORM SETUP"
    },
    {
      title: "Phase 2: Alert Responder",
      weeks: "Weeks 5–8",
      highlight: "Active SOC Analyst Shift",
      descr: "Assumed active role in global operations, tracking, triaging, and documenting live alarms using Jira Service queues.",
      badge: "Incident Triage"
    },
    {
      title: "Phase 3: DLP Engineer",
      weeks: "Weeks 9–12",
      highlight: "Rule Regex Optimization",
      descr: "Mastered Forcepoint content classification, deploying customized regular expression filters to secure corporate communications.",
      badge: "DATA SAFEGUARD"
    },
    {
      title: "Phase 4: Cloud posture Scout",
      weeks: "Weeks 13–20",
      highlight: "DSPM discovery & CASB",
      descr: "Tracked unstructured S3 storage locations, secured replication channels, and audited shadow-SaaS bandwidth leaks.",
      badge: "CLOUD GATEWAY"
    },
    {
      title: "Phase 5: Compliance Analyst",
      weeks: "Weeks 21–24",
      highlight: "BI Dashboards & Handover",
      descr: "Authored professional BI telemetry charts, formulated executive compliance playbooks, and transferred operations folders.",
      badge: "Graduation Model"
    }
  ];

  return (
    <div id="internship-diary-core" className="min-h-screen bg-[#050608] text-slate-300 selection:bg-cyan-500/20 selection:text-cyan-300 font-sans relative overflow-x-hidden cyber-grid">
      
      {/* Decorative Network Overlay Background Effects with 10% opacity dot blueprint from theme */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(#3b82f6 1px, transparent 1px)", backgroundSize: "32px 32px" }}></div>
      <div className="absolute top-0 inset-x-0 h-[650px] bg-gradient-to-b from-cyan-950/10 via-slate-950/5 to-transparent pointer-events-none" />
      <div className="absolute top-[20%] right-0 w-96 h-96 bg-cyan-500/2 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute top-[60%] left-0 w-[450px] h-[450px] bg-purple-500/1 blur-3xl rounded-full pointer-events-none" />
      
      {/* Laser Scanning Line Accent in subtle cyan */}
      <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent animate-scanline pointer-events-none" />

      {/* ==================== GLOBAL NAVBAR HEADER FROM CLEAN MINIMALISM ==================== */}
      <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#0a0c12]/90 backdrop-blur-md border-b border-cyan-500/30 py-2.5 shadow-[0_4px_30px_rgba(0,0,0,0.4)]' : 'bg-[#0a0c12]/80 backdrop-blur-md border-b border-cyan-500/20 py-4'}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between">
          
          {/* Avatar & Logo Name block matching Clean Minimalism */}
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-full border-2 border-cyan-400 bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center font-bold text-white shadow-[0_0_15px_rgba(34,211,238,0.4)] text-sm">
              MS
            </div>
            <div>
              <h1 className="text-sm md:text-base font-bold tracking-tight text-white leading-none">Mannatpreet Singh</h1>
              <p className="text-[10px] text-cyan-405 font-mono tracking-widest uppercase mt-1">SOC Analyst Intern @ SafeAeon</p>
            </div>
          </div>

          {/* Active Status Display and Shortcuts */}
          <div className="flex items-center gap-6">
            {/* Nav Links Shortcuts */}
            <nav className="hidden xl:flex items-center gap-1 bg-[#0f172a]/50 p-1 rounded-xl border border-slate-800/80">
              {[
                { id: 'hero', label: 'Overview' },
                { id: 'sim-dashboard', label: 'SOC Simulator' },
                { id: 'timeline', label: 'Weekly Diary' },
                { id: 'tech-stack', label: 'Tools Learned' },
                { id: 'skills-matrix', label: 'Skills Growth' },
                { id: 'achievements', label: 'Academic Milestones' },
                { id: 'reflection', label: 'Retrospective' }
              ].map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${activeSection === section.id ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'text-slate-400 hover:text-white'}`}
                >
                  {section.label}
                </button>
              ))}
            </nav>

            <div className="flex gap-4 sm:gap-6 font-mono">
              <div className="text-right">
                <div className="text-[9px] text-slate-500 uppercase tracking-tighter">Status</div>
                <div className="text-[11px] font-semibold text-green-400">// ACTIVE_SESSION</div>
              </div>
              <div className="text-right hidden sm:block">
                <div className="text-[9px] text-slate-500 uppercase tracking-tighter">Duration</div>
                <div className="text-[11px] font-semibold text-cyan-400">6_MONTH_JOURNEY</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ==================== HERO AREA SECTION ==================== */}
      <section id="hero" className="relative min-h-[92vh] flex items-center pt-24 md:pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10 w-full">
          
          {/* Hero Left Content Column */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Active Duty Status Badge in Cyan */}
            <div className="inline-flex items-center gap-2 bg-[#0f172a]/80 border border-cyan-500/20 px-3.5 py-1.5 rounded-full text-xs font-mono text-cyan-400">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>SafeAeon 6-Month Cybersecurity Internship Portfolio</span>
            </div>

            {/* Display Typography Header */}
            <div className="space-y-3">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold font-display tracking-tight text-white leading-none">
                Secops Journeys: <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-400 to-purple-400">Student to SOC Analyst</span>
              </h1>
              
              <div className="flex items-center gap-2 text-slate-400 text-sm font-sans max-w-xl font-medium pt-1">
                <span>Mannatpreet Singh</span>
                <span className="text-slate-600 font-mono">•</span>
                <strong className="text-cyan-300">SOC Analyst Intern</strong>
                <span className="text-slate-600 font-mono">•</span>
                <strong className="text-purple-300">SafeAeon Inc.</strong>
              </div>
            </div>

            <p className="text-xs md:text-sm text-slate-400 leading-relaxed max-w-xl font-sans font-normal">
              An interactive week-by-week documentation summarizing my rotational experience in cybersecurity operations. From auditing real endpoint logs to writing high-accuracy Data Loss Prevention parameters, this portal represents the practical synthesis of real-world enterprise defender tools.
            </p>

            {/* Quick action buttons row with cyan */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button 
                id="hero-btn-explore"
                onClick={() => scrollToSection('sim-dashboard')}
                className="px-6 py-3.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-mono text-xs font-bold transition-all shadow-[0_4px_20px_rgba(6,182,212,0.25)] hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2 border border-cyan-400/50"
              >
                <span>Launch SOC Console</span>
                <Sliders className="w-4 h-4" />
              </button>
              
              <button 
                id="hero-btn-journey"
                onClick={() => scrollToSection('timeline')}
                className="px-6 py-3.5 rounded-xl bg-[#0f172a]/50 hover:bg-[#0f172a]/80 text-slate-350 border border-slate-800 font-mono text-xs transition-all hover:border-cyan-500/20 hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Explore Weekly Logs</span>
                <ArrowDown className="w-4 h-4 animate-bounce" />
              </button>
            </div>
          </div>

          {/* Hero Right Visuals column */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0">
            
            {/* Cybersecurity High-Tech Abstract Widget Box styled with Clean Minimalism */}
            <div className="relative rounded-2xl overflow-hidden bg-[#0f172a]/50 p-6 border border-slate-800 shadow-[0_5px_40px_rgba(0,0,0,0.4)] backdrop-blur-sm">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 blur-3xl rounded-full" />
              
              {/* Decorative terminal panel */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/30" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/30" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/20 border border-emerald-500/30" />
                </div>
                <span className="font-mono text-[9px] text-slate-500 select-none">PORTAL_ADMIN_CONSOLE: v2.4</span>
              </div>

              {/* Simulated system performance monitor */}
              <div className="space-y-4">
                <div className="p-3 bg-[#050608]/90 rounded-xl border border-slate-850 font-mono">
                  <div className="text-[10px] text-slate-500 flex justify-between">
                    <span>HOST SYSTEM TARGET</span>
                    <span className="text-cyan-400">VERIFIED</span>
                  </div>
                  <div className="text-xs text-slate-200 font-bold mt-1 uppercase">SafeAeon Production Environment</div>
                </div>

                <div className="p-3 bg-[#050608]/90 rounded-xl border border-slate-850 font-mono">
                  <div className="text-[10px] text-slate-500 flex justify-between">
                    <span>ANALYST CREDENTIAL</span>
                    <span className="text-purple-400 font-bold text-[9px]">SOC_TIER_1</span>
                  </div>
                  <div className="text-xs text-slate-200 font-bold mt-1 uppercase">Mannatpreet Singh (Intern)</div>
                </div>

                <div className="p-3 bg-[#050608]/90 rounded-xl border border-slate-850 font-mono">
                  <div className="text-[10px] text-slate-500 flex justify-between">
                    <span>SECURITY COGNIZANCE</span>
                    <span className="text-emerald-400 font-bold">OPTIMIZED</span>
                  </div>
                  <div className="text-xs text-emerald-400 font-bold mt-1 flex items-center gap-1.5 align-middle">
                    <ShieldCheck className="w-3.5 h-3.5 animate-pulse text-emerald-400 shrink-0" />
                    <span>DLP, DSPM & CASB EXPOSURES APPLIED</span>
                  </div>
                </div>
              </div>

              {/* Micro diagnostic values line */}
              <div className="mt-5 border-t border-slate-800/80 pt-3 flex justify-between items-center text-[10px] font-mono text-slate-500">
                <span>PERIMETER STATE: SECURE</span>
                <span>LATENCY: 12ms</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== CORE STATISTICS BOX GRID ==================== */}
      <section className="bg-[#050608]/80 border-y border-slate-900 py-10">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {STATS.map((stat, idx) => (
              <div 
                id={`stat-box-${idx}`}
                key={stat.label} 
                className="bg-[#0f172a]/30 p-4 rounded-xl border border-slate-900 hover:border-cyan-500/20 transition-colors"
              >
                <span className="text-[10px] font-mono text-slate-500 block uppercase tracking-wider">{stat.label}</span>
                <span className="text-lg md:text-xl font-bold font-display text-white mt-1 block tracking-tight">{stat.value}</span>
                <span className="text-[10px] font-mono text-slate-450 mt-0.5 block">{stat.detail}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== MAIN SECTION: SOC CONSOLE SIMULATION ==================== */}
      <section id="sim-dashboard" className="py-20 bg-[#050608]/40 max-w-7xl mx-auto px-4 md:px-6">
        <div className="space-y-4 mb-10">
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs tracking-widest uppercase">
            <Sliders className="w-4 h-4 animate-spin-slow" />
            <span>Operational Sandbox Playground</span>
          </div>
          <h2 className="text-2xl md:text-4xl font-extrabold font-display text-white tracking-tight">
            Security Technologies Sandbox Console
          </h2>
          <p className="text-xs md:text-sm text-slate-400 leading-relaxed max-w-3xl font-sans">
            Explore active live mock deployments representing the fundamental cybersecurity components learned during the 6-month SafeAeon rotation. Switch tabs to investigate EDR endpoints, tune Data Loss Prevention regex, run DSPM discovery audits, evaluate CASB SaaS apps blockades, or view Power BI telemetry.
          </p>
        </div>

        {/* Embedded security dashboard simulator */}
        <SecurityDashboard />
      </section>

      {/* ==================== CORE TIMELINE: THE WEEKLY DIARY ==================== */}
      <section id="timeline" className="py-20 bg-[#050608] max-w-7xl mx-auto px-4 md:px-6 border-t border-slate-900/60">
        <div className="space-y-4 mb-10">
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs tracking-widest uppercase">
            <Clock className="w-4 h-4" />
            <span>Rotational Journal Ledger</span>
          </div>
          <h2 className="text-2xl md:text-4xl font-extrabold font-display text-white tracking-tight">
            The week-by-week rotational logs
          </h2>
          <p className="text-xs md:text-sm text-slate-400 leading-relaxed max-w-3xl font-sans">
            A precise, structured layout capturing the operational progress and acquired training throughout the 24 weeks. Use the month selectors to filter the documentation, or narrow down by specialized security category.
          </p>
        </div>

        {/* Interactive nested timeline */}
        <TimelineSection />
      </section>

      {/* ==================== CHIP: CORE SECURITY RACK (TECH) ==================== */}
      <section id="tech-stack" className="py-20 bg-[#0f172a]/20 border-t border-slate-900/60 max-w-7xl mx-auto px-4 md:px-6">
        <div className="space-y-4 mb-10">
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs tracking-widest uppercase">
            <Layers className="w-4 h-4" />
            <span>Verified System Competency</span>
          </div>
          <h2 className="text-2xl md:text-4xl font-extrabold font-display text-white tracking-tight">
            Technologies learned & certifications
          </h2>
          <p className="text-xs md:text-sm text-slate-400 leading-relaxed max-w-3xl font-sans">
            Hands-on exposure index of enterprise suites leveraged daily inside the SecOps department. Filter by category, or hover to examine skills criteria, proficiency indices, and platform purposes.
          </p>
        </div>

        {/* Categories filtered technology cards */}
        <TechnologiesSection />
      </section>

      {/* ==================== MAIN CHIP: SKILLS MATRIX ==================== */}
      <section id="skills-matrix" className="py-20 bg-[#050608] border-t border-slate-900/60 max-w-7xl mx-auto px-4 md:px-6">
        <div className="space-y-4 mb-10">
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs tracking-widest uppercase">
            <Award className="w-4 h-4" />
            <span>Capability Growth Vector</span>
          </div>
          <h2 className="text-2xl md:text-4xl font-extrabold font-display text-white tracking-tight">
            Analytical skill growth timeline
          </h2>
          <p className="text-xs md:text-sm text-slate-400 leading-relaxed max-w-3xl font-sans">
            Observe the real-time capability expansion from Month 1 to Month 6. Play the evolutionary transitions loop to watch competencies rise as the operational rotations advanced.
          </p>
        </div>

        {/* Interactive growth slider panel */}
        <SkillsGrowthSection />
      </section>

      {/* ==================== ACHIEVEMENTS PORTFOLIO SECTIONS ==================== */}
      <section id="achievements" className="py-20 bg-[#0f172a]/20 border-t border-slate-900/60 max-w-7xl mx-auto px-4 md:px-6">
        <div className="space-y-4 mb-10">
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs tracking-widest uppercase">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>Rotational Success Indices</span>
          </div>
          <h2 className="text-2xl md:text-4xl font-extrabold font-display text-white tracking-tight">
            Key professional & academic achievements
          </h2>
          <p className="text-xs md:text-sm text-slate-400 leading-relaxed max-w-3xl font-sans">
            Validated milestones completed during daily active analyst duty. Review metrics representation, case scopes, and technical tool stacks mapped to daily operations.
          </p>
        </div>

        {/* Milestone cards and checkers */}
        <AchievementsSection />
      </section>

      {/* ==================== FINAL RETROSPECTIVE TRANSFORMATIONS ==================== */}
      <section id="reflection" className="py-20 bg-[#050608] border-t border-slate-900/60 max-w-7xl mx-auto px-4 md:px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-950/2 via-transparent to-transparent opacity-20 pointer-events-none" />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
          
          {/* Executive Summary Left Text block */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs tracking-widest uppercase">
              <UserCheck className="w-4 h-4" />
              <span>Career Retrospective Narrative</span>
            </div>
            
            <h2 className="text-2xl md:text-4xl font-extrabold font-display text-white tracking-tight leading-tight">
              Transformative Diary: Trainee to SOC Analyst
            </h2>

            <p className="text-xs md:text-sm text-slate-400 leading-relaxed font-sans">
              "The transition over these six months at SafeAeon has successfully converted academic cybersecurity patterns into robust enterprise defenses. Beginning with fundamental security log schemas, I graduated into designing live DLP content filters, executing DSPM audits, managing active incident pipelines, and modeling executive-level BI risk metrics."
            </p>

            <div className="p-4 bg-[#0f172a]/50 rounded-xl border border-slate-800 space-y-3">
              <span className="text-[10px] font-mono text-slate-500 block uppercase">CONSOLIDATED PORTFOLIO CHECKMARKS:</span>
              <div className="space-y-2 font-mono text-[11px] text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>SentinelOne, Rapid7, and Avanan Certified</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>DLP regex tuned for 20% lower false-alarms</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>DSPM and CASB risk mappings completed</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Power BI security metrics dashboards live</span>
                </div>
              </div>
            </div>

            {/* Quick Contact verification card info */}
            <div className="pt-4 border-t border-slate-900/60 text-xs space-y-2">
              <div className="text-slate-500 font-mono text-[10px] uppercase">CREATOR & VERIFIER DETAILS:</div>
              <div className="text-slate-300 font-semibold font-display">Mannatpreet Singh // SOC Analyst Intern</div>
              <div className="text-slate-405 font-mono text-[10px]">SafeAeon Inc. Cybersecurity Rotation Segment</div>
              <div className="text-slate-400 font-mono text-[10px] flex items-center gap-1.5 flex-wrap">
                <span>E: premsinghsyan@gmail.com</span>
                <span>•</span>
                <span>UTC: 2026-06-09</span>
              </div>
            </div>
          </div>

          {/* Interactive Transformation Stage Line on Right side */}
          <div className="lg:col-span-7 space-y-4">
            <span className="text-[10px] font-mono text-slate-500 uppercase block font-bold mb-1">Click stages to audit transitional checkpoints:</span>
            
            <div className="space-y-3">
              {transformationStages.map((stage, idx) => {
                const isActive = activeStage === idx;
                return (
                  <div 
                    id={`trans-stage-${idx}`}
                    key={idx}
                    onClick={() => setActiveStage(idx)}
                    className={`p-4 rounded-xl cursor-pointer transition-all duration-300 flex items-start gap-4 ${
                      isActive 
                        ? 'bg-[#0f172a]/80 border border-cyan-500/30 shadow-[0_0_20px_rgba(34,211,238,0.06)]' 
                        : 'bg-[#0f172a]/30 border border-slate-900/80 hover:bg-[#0f172a]/55 hover:border-cyan-500/20'
                    }`}
                  >
                    {/* Index Indicator circle */}
                    <div className={`w-7 h-7 rounded-lg font-mono font-bold text-xs flex items-center justify-center shrink-0 border ${
                      isActive ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-400' : 'bg-[#050608] border-slate-800 text-slate-405'
                    }`}>
                      0{idx + 1}
                    </div>

                    {/* Stage Descriptions text copy */}
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-semibold font-display text-white">{stage.title}</span>
                        <span className="text-[9px] font-mono bg-[#050608] px-2 py-0.5 rounded text-slate-450 border border-slate-850">{stage.weeks}</span>
                        <span className="text-[9px] font-mono uppercase bg-purple-950/20 text-purple-400 px-2 py-0.5 rounded-full border border-purple-500/10 font-bold ml-auto">{stage.badge}</span>
                      </div>
                      
                      <div className="text-xs font-mono text-cyan-400">{stage.highlight}</div>
                      
                      {isActive && (
                        <p className="text-xs text-slate-400 leading-relaxed font-sans pt-1.5 transition-all">
                          {stage.descr}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== PORTAL ADMIN SYSTEM FOOTER WITH DETAILED CONNECTED INDICATORS ==================== */}
      <footer className="bg-[#0a0c12] border-t border-slate-900/60 py-10 relative z-10 font-mono text-xs">
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-white font-bold font-display text-sm tracking-tight">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>SafeAeon Internship Retrospective</span>
            </div>
            <p className="max-w-md text-[10px] text-slate-500 leading-relaxed">
              Designed as a premium state-driven portfolio illustrating rotational achievements of Mannatpreet Singh. Verified for university review boards and recruiters.
            </p>
            
            {/* Inline Connected Status Indicators from Clean Minimalism */}
            <div className="flex gap-6 pt-1 flex-wrap">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></div>
                <span className="text-[9px] text-slate-500 font-mono">DLP_ENGINE_ONLINE</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
                <span className="text-[9px] text-slate-500 font-mono">IDR_SIEM_SYNCED</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                <span className="text-[9px] text-slate-500 font-mono">DSPM_SHIELDS_UP</span>
              </div>
            </div>
          </div>

          <div className="space-y-1 text-left md:text-right text-[10px] text-slate-500 mt-2 md:mt-0">
            <div>OPERATIONAL FRAMEWORK: CLOUD RUN v2</div>
            <div>VERIFICATION TELEMETRY ID: SA-M.SINGH2026</div>
            <div>COMPLIANCE STATUS: <span className="text-emerald-400 font-bold">100% COMPLETE</span></div>
            <div className="text-[9px] text-slate-600 mt-1 uppercase tracking-widest">SYSTEMS SECURED // 2026 INTERNSHIP_REPORT</div>
          </div>
        </div>
      </footer>

    </div>
  );
}
