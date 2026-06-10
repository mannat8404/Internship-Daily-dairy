import React, { useState, useEffect } from 'react';
import { 
  Shield, ShieldAlert, ShieldCheck, Terminal, Lock, Server, Database, 
  Network, Activity, CheckCircle2, AlertCircle, Eye, FileText, 
  BarChart3, RefreshCw, Zap, Sliders, Play, Check, Search, Filter,
  ArrowRight, Sparkles, Building2, UserX, Cpu, AlertTriangle, Cloud
} from 'lucide-react';

// Simulated Security Logs for the Active SOC SIEM
interface SecurityLog {
  id: string;
  timestamp: string;
  source: string;
  event: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'INFO';
  status: 'PENDING' | 'TRIAGED' | 'CONTAINED' | 'FALSE_POSITIVE';
  platform: 'SentinelOne' | 'Rapid7' | 'Avanan';
}

const INITIAL_LOGS: SecurityLog[] = [
  { id: "S1-8302", timestamp: "08:14:12", source: "10.150.2.82", event: "Malicious process execution (mimikatz.exe detected)", severity: "CRITICAL", status: "PENDING", platform: "SentinelOne" },
  { id: "R7-1904", timestamp: "08:12:45", source: "usr-msingh", event: "Multiple failed authentication attempts (brute force pattern)", severity: "HIGH", status: "PENDING", platform: "Rapid7" },
  { id: "AV-4412", timestamp: "08:10:01", source: "external-sender@untrusted.com", event: "Spear-phishing email blocked (contains brand-spoofing link)", severity: "HIGH", status: "CONTAINED", platform: "Avanan" },
  { id: "S1-9011", timestamp: "07:58:20", source: "10.150.4.19", event: "Unauthorized shadow copy deletion attempt (VSSAdmin query)", severity: "CRITICAL", status: "CONTAINED", platform: "SentinelOne" },
  { id: "R7-3312", timestamp: "07:44:11", source: "192.168.1.104", event: "Port scan activity targeting SQL Server DB port 1433", severity: "MEDIUM", status: "TRIAGED", platform: "Rapid7" },
  { id: "AV-1123", timestamp: "07:12:05", source: "hr-inbox@corporation.com", event: "Incoming resume.exe file quarantined by attachment analyzer", severity: "HIGH", status: "TRIAGED", platform: "Avanan" }
];

export default function SecurityDashboard() {
  const [activeTab, setActiveTab] = useState<'siem' | 'dlp' | 'dspm' | 'casb' | 'powerbi'>('siem');
  
  // Tab 1: SIEM States
  const [logs, setLogs] = useState<SecurityLog[]>(INITIAL_LOGS);
  const [selectedLog, setSelectedLog] = useState<SecurityLog | null>(INITIAL_LOGS[0]);
  const [activeLogTriageLog, setActiveLogTriageLog] = useState<string[]>([]);
  const [isSimulatingLogs, setIsSimulatingLogs] = useState(true);

  // Tab 2: DLP States
  const [dlpPolicies, setDlpPolicies] = useState([
    { id: "pol-1", name: "Corporate Financial Protection", rule: "SSN & Credit Card Regex Discovery", action: "Block & Alert Management", status: true, triggers: 142 },
    { id: "pol-2", name: "Intellectual Property Safeguard", rule: "Source Code & Blueprint File Fingerprinting", action: "Encrypt Transfer & Alert", status: true, triggers: 28 },
    { id: "pol-3", name: "Employee Directory DLP Rule", rule: "Mass CSV/Excel Personal Asset Export", action: "Audit & Confirm Identity", status: false, triggers: 95 },
    { id: "pol-4", name: "Cloud Collaboration Gateway", rule: "Sensitive Keyword filtering in Slack/Teams uploads", action: "Review Quarantine & Alert", status: true, triggers: 67 }
  ]);
  const [newRuleName, setNewRuleName] = useState("");
  const [newRulePattern, setNewRulePattern] = useState("\\b(4[0-9]{12}(?:[0-9]{3})?)\\b");
  const [dlpSearch, setDlpSearch] = useState("");

  // Tab 3: DSPM States
  const [scannedAssets, setScannedAssets] = useState([
    { name: "aws-prod-s3-customer-bucket", type: "Object Storage", sensitiveCount: 1845, isEncrypted: false, authStatus: "Public Acc.", risk: "HIGH" },
    { name: "azure-sql-finance-db-backup", type: "Database Backup", sensitiveCount: 450, isEncrypted: true, authStatus: "Dormant", risk: "MEDIUM" },
    { name: "gcp-developer-storage-secrets", type: "Object Storage", sensitiveCount: 92, isEncrypted: false, authStatus: "Public Acc.", risk: "CRITICAL" },
    { name: "local-office-nas-file-share", type: "Network Attached Storage", sensitiveCount: 12500, isEncrypted: true, authStatus: "Private Space", risk: "LOW" },
    { name: "company-internal-wiki-archive", type: "KB Pages", sensitiveCount: 120, isEncrypted: false, authStatus: "Wide Int.", risk: "MEDIUM" }
  ]);
  const [selectedAssetForAudit, setSelectedAssetForAudit] = useState<typeof scannedAssets[0] | null>(scannedAssets[0]);
  const [isAuditing, setIsAuditing] = useState(false);

  // Tab 4: CASB States
  const [shadowApps, setShadowApps] = useState([
    { name: "MegaUpload Premium", category: "Cloud Storage", riskScore: 92, usersCount: 8, bytesTransferred: "14.2 GB", action: "BLOCK" },
    { name: "WeTransfer Lite", category: "File Sharing", riskScore: 78, usersCount: 14, bytesTransferred: "8.5 GB", action: "BLOCK" },
    { name: "Personal Google Drive", category: "Cloud Storage", riskScore: 54, usersCount: 22, bytesTransferred: "42.1 GB", action: "MONITOR" },
    { name: "ConvertDocFree Online", category: "PDF Utilities", riskScore: 88, usersCount: 4, bytesTransferred: "115 MB", action: "BLOCK" },
    { name: "AI CodeCopilot OpenCloud", category: "AI Tools", riskScore: 65, usersCount: 19, bytesTransferred: "1.2 GB", action: "MONITOR" }
  ]);

  // Tab 5: Power BI States
  const [biTimeRange, setBiTimeRange] = useState<'7d' | '30d' | '6mo'>('30d');
  const [refreshedTime, setRefreshedTime] = useState("Just updated");

  // Dynamic interval log simulations
  useEffect(() => {
    if (!isSimulatingLogs) return;

    const interval = setInterval(() => {
      const prefixes = ["S1", "R7", "AV"];
      const randPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
      const randId = `${randPrefix}-${Math.floor(1000 + Math.random() * 9000)}`;

      const platforms: Record<string, 'SentinelOne' | 'Rapid7' | 'Avanan'> = {
        "S1": "SentinelOne",
        "R7": "Rapid7",
        "AV": "Avanan"
      };

      const events = [
        "Unauthenticated lateral access attempt in secondary subnet",
        "DLP: Credit card sequence uploaded to public pastebin site",
        "Avanan: Brand-impersonation inbound message isolated",
        "SentinelOne: High-risk root escalation on administrative host",
        "Rapid7 SIEM: Excessive SSH failures from foreign country",
        "DLP: Mass telemetry export trigger logged outside shift times"
      ];

      const severityLevel: ('CRITICAL' | 'HIGH' | 'MEDIUM' | 'INFO')[] = ["CRITICAL", "HIGH", "MEDIUM", "INFO"];
      const rSeverity = severityLevel[Math.floor(Math.random() * 3)]; // Bias away from INFO

      const newLog: SecurityLog = {
        id: randId,
        timestamp: new Date().toTimeString().split(' ')[0],
        source: `10.150.${Math.floor(Math.random() * 8)}.${Math.floor(Math.random() * 254)}`,
        event: events[Math.floor(Math.random() * events.length)],
        severity: rSeverity,
        status: 'PENDING',
        platform: platforms[randPrefix]
      };

      setLogs(prev => [newLog, ...prev.slice(0, 7)]);
    }, 12000);

    return () => clearInterval(interval);
  }, [isSimulatingLogs]);

  // Triage simulator logger tool
  const runActiveAction = (actionName: string) => {
    if (!selectedLog) return;
    
    // Add actions to console simulation
    const timestamp = new Date().toTimeString().split(' ')[0];
    const logString = `[${timestamp}] EXECUTED: ${actionName} for Ticket ID ${selectedLog.id} (${selectedLog.platform})`;
    
    setActiveLogTriageLog(prev => [logString, ...prev]);

    // Update the log status
    setLogs(prev => prev.map(l => {
      if (l.id === selectedLog.id) {
        return { 
          ...l, 
          status: actionName === "Isolate Endpoint" || actionName === "Contain Threat" ? "CONTAINED" : "TRIAGED" 
        };
      }
      return l;
    }));

    if (selectedLog) {
      setSelectedLog(prev => prev ? {
        ...prev,
        status: actionName === "Isolate Endpoint" || actionName === "Contain Threat" ? "CONTAINED" : "TRIAGED"
      } : null);
    }
  };

  // DLP trigger custom builder
  const handleAddDlpRule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRuleName.trim()) return;

    const newRule = {
      id: `pol-${dlpPolicies.length + 1}`,
      name: newRuleName,
      rule: newRulePattern,
      action: "Alert compliance + Queue Verification",
      status: true,
      triggers: 0
    };

    setDlpPolicies(prev => [...prev, newRule]);
    setNewRuleName("");
    setNewRulePattern("");

    // Simulate creation logs
    const timestamp = new Date().toTimeString().split(' ')[0];
    setActiveLogTriageLog(prev => [`[${timestamp}] DLP GLOBAL: Instantiated Security Rule: "${newRule.name}" across test environments.`, ...prev]);
  };

  // DSPM simulated audit
  const runDspmAudit = (assetName: string) => {
    setIsAuditing(true);
    setTimeout(() => {
      setIsAuditing(false);
      setScannedAssets(prev => prev.map(a => {
        if (a.name === assetName) {
          return {
            ...a,
            isEncrypted: true,
            authStatus: "Private Space",
            risk: "LOW" as const
          };
        }
        return a;
      }));
      // update selected item state to show changes
      setSelectedAssetForAudit(prev => prev && prev.name === assetName ? {
        ...prev,
        isEncrypted: true,
        authStatus: "Private Space",
        risk: "LOW"
      } : prev);

      const timestamp = new Date().toTimeString().split(' ')[0];
      setActiveLogTriageLog(prev => [`[${timestamp}] DSPM AUDIT: Successfully secured ${assetName} (Hardened cipher + restricted access policies applied)`, ...prev]);
    }, 1500);
  };

  // CASB Toggle blockade state
  const toggleSaaSBlock = (appName: string) => {
    setShadowApps(prev => prev.map(a => {
      if (a.name === appName) {
        return {
          ...a,
          action: a.action === "BLOCK" ? "MONITOR" : "BLOCK"
        };
      }
      return a;
    }));
  };

  return (
    <div id="security-dashboard-root" className="w-full rounded-2xl glass-panel p-6 border border-cyan-500/15 overflow-hidden relative">
      <div className="absolute inset-0 bg-radial-gradient from-cyan-500/2 via-transparent to-transparent opacity-40 pointer-events-none" />
      
      {/* Top Controller Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-850 pb-4 mb-6 gap-4 relative z-10">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs tracking-widest uppercase mb-1">
            <Activity className="w-3 h-3 animate-pulse" />
            <span>Interactive SafeAeon Simulation Console</span>
          </div>
          <h3 className="text-xl md:text-2xl font-semibold font-display tracking-tight text-white flex items-center gap-2">
            SOC Operations & Data Posture Suite
          </h3>
        </div>
        
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-1.5 bg-[#0f172a]/70 p-1 rounded-xl border border-slate-800/80">
          <button 
            id="tab-btn-siem"
            onClick={() => setActiveTab('siem')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${activeTab == 'siem' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'text-slate-400 hover:text-white'}`}
          >
            SIEM Terminal
          </button>
          <button 
            id="tab-btn-dlp"
            onClick={() => setActiveTab('dlp')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${activeTab == 'dlp' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'text-slate-400 hover:text-white'}`}
          >
            DLP Studio
          </button>
          <button 
            id="tab-btn-dspm"
            onClick={() => setActiveTab('dspm')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${activeTab == 'dspm' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'text-slate-400 hover:text-white'}`}
          >
            DSPM Discovery
          </button>
          <button 
            id="tab-btn-casb"
            onClick={() => setActiveTab('casb')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${activeTab == 'casb' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'text-slate-400 hover:text-white'}`}
          >
            CASB ShadowGuard
          </button>
          <button 
            id="tab-btn-powerbi"
            onClick={() => setActiveTab('powerbi')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${activeTab == 'powerbi' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'text-slate-400 hover:text-white'}`}
          >
            Power BI Reports
          </button>
        </div>
      </div>

      {/* Main Core View Area */}
      <div className="relative z-10">
        
        {/* ==================== TAB 1: ACTIVE SIEM TERMINAL ==================== */}
        {activeTab === 'siem' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Realtime Threat Streams */}
            <div className="lg:col-span-7 flex flex-col space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Live Event Stream (SafeAeon Logs)
                </span>
                <button 
                  onClick={() => setIsSimulatingLogs(!isSimulatingLogs)}
                  className="text-[10px] font-mono text-slate-400 hover:text-white flex items-center gap-1 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded cursor-pointer"
                >
                  <RefreshCw className={`w-2.5 h-2.5 ${isSimulatingLogs ? 'animate-spin' : ''}`} />
                  {isSimulatingLogs ? 'Pause Feed' : 'Resume Feed'}
                </button>
              </div>

              {/* Logs Table */}
              <div className="bg-slate-950/90 border border-slate-850 rounded-xl overflow-hidden divide-y divide-slate-900 font-mono text-xs">
                {logs.map((log) => (
                  <div 
                    id={`log-item-${log.id}`}
                    key={log.id} 
                    onClick={() => setSelectedLog(log)}
                    className={`p-3 transition-all cursor-pointer flex items-center justify-between hover:bg-slate-900/60 ${selectedLog?.id === log.id ? 'bg-blue-900/10 border-l-2 border-blue-500' : ''}`}
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      <span className={`w-2 h-2 rounded-full ${
                        log.severity === 'CRITICAL' ? 'bg-red-500' :
                        log.severity === 'HIGH' ? 'bg-orange-500' :
                        log.severity === 'MEDIUM' ? 'bg-amber-400' : 'bg-slate-400'
                      }`} />
                      <div className="shrink-0 text-slate-500 text-[10px]">{log.timestamp}</div>
                      <div className="shrink-0 px-1.5 py-0.5 rounded text-[10px] bg-slate-850 text-slate-300 border border-slate-800">{log.platform}</div>
                      <div className="truncate text-slate-200">{log.event}</div>
                    </div>
                    
                    <div className="shrink-0 flex items-center gap-2 ml-2">
                      <span className={`text-[10px] px-1.5 rounded uppercase ${
                        log.status === 'PENDING' ? 'text-orange-400 bg-orange-950/20' :
                        log.status === 'CONTAINED' ? 'text-emerald-400 bg-emerald-950/20' : 'text-blue-400 bg-blue-950/20'
                      }`}>
                        {log.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Terminal Logs Simulation Terminal */}
              <div className="bg-black/80 rounded-xl p-3 border border-slate-900 h-28 overflow-y-auto font-mono text-[10px] text-blue-300">
                <div className="text-slate-500 border-b border-slate-900 pb-1 mb-1.5">Interactive Operation Terminal outputs:</div>
                {activeLogTriageLog.length === 0 ? (
                  <div className="text-slate-600 italic">No command traces executed. Click "Isolate Agent" or "Contain Alarm" on the right sidebar...</div>
                ) : (
                  activeLogTriageLog.map((cmt, idx) => (
                    <div key={idx} className="mb-1 leading-relaxed">
                      <span className="text-emerald-500">&gt;</span> {cmt}
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Incident Investigation Detail Card */}
            <div className="lg:col-span-5 flex flex-col">
              {selectedLog ? (
                <div className="bg-slate-950/40 border border-slate-800 rounded-xl p-4 flex flex-col h-full relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 blur-xl rounded-full" />
                  
                  <div className="flex items-center justify-between border-b border-slate-900 pb-3 mb-3">
                    <span className="font-mono text-xs text-slate-400">Incident Triage ID: {selectedLog.id}</span>
                    <span className={`text-xs px-2 py-0.5 rounded font-mono ${
                      selectedLog.severity === 'CRITICAL' ? 'bg-red-950/40 text-red-400 border border-red-500/20' :
                      selectedLog.severity === 'HIGH' ? 'bg-orange-950/40 text-orange-400 border border-orange-500/20' : 'bg-slate-900 text-slate-300'
                    }`}>
                      {selectedLog.severity} PRIORITY
                    </span>
                  </div>

                  <div className="space-y-3 font-sans text-xs mb-5">
                    <div>
                      <div className="text-slate-400 text-[10px] font-mono">ALERT EVENT TRIGGER</div>
                      <div className="text-white font-medium text-sm mt-0.5">{selectedLog.event}</div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-1">
                      <div>
                        <div className="text-slate-400 text-[10px] font-mono">TRIGGER SOURCE HOST</div>
                        <div className="text-blue-300 font-mono mt-0.5">{selectedLog.source}</div>
                      </div>
                      <div>
                        <div className="text-slate-400 text-[10px] font-mono">SECURITY PLATFORM</div>
                        <div className="text-cyan-400 font-mono mt-0.5">{selectedLog.platform}</div>
                      </div>
                    </div>

                    <div className="border-t border-slate-900 pt-2.5">
                      <div className="text-slate-400 text-[10px] font-mono">SIEM CORRELATION FLOW</div>
                      <div className="text-slate-300 italic mt-1 leading-relaxed">
                        {selectedLog.platform === "SentinelOne" && "Host reports process execution from atypical directory path. Security agent monitored API loops and issued sandbox flags."}
                        {selectedLog.platform === "Rapid7" && "Multiple remote desktop attempts detected from this IP. Logs indicate brute forcing behavior against internal AD resources."}
                        {selectedLog.platform === "Avanan" && "Incoming mail contained SPF failures and an embedded hidden subdomain routing to suspect phishing nodes."}
                      </div>
                    </div>
                  </div>

                  {/* Operational Controls */}
                  <div className="mt-auto space-y-2 pt-4 border-t border-slate-900">
                    <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1.5">SOC Team Action Controls:</div>
                    <div className="grid grid-cols-2 gap-2">
                      <button 
                        onClick={() => runActiveAction("Isolate Endpoint")}
                        className="p-2 py-2.5 rounded-lg bg-red-600/10 hover:bg-red-600/20 text-red-400 text-xs font-mono border border-red-500/20 hover:border-red-500/40 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <UserX className="w-3.5 h-3.5" />
                        <span>Isolate Agent</span>
                      </button>
                      <button 
                        onClick={() => runActiveAction("Contain Threat")}
                        className="p-2 py-2.5 rounded-lg bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-400 text-xs font-mono border border-emerald-500/20 hover:border-emerald-500/40 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Contain Alarm</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button 
                        onClick={() => runActiveAction("Triage Alert")}
                        className="p-2 py-2 rounded-lg bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 text-xs font-mono border border-blue-500/20 hover:border-blue-500/40 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <Activity className="w-3.5 h-3.5" />
                        <span>Log Incident</span>
                      </button>
                      <button 
                        onClick={() => runActiveAction("Mark False Positive")}
                        className="p-2 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-300 text-xs font-mono border border-slate-800 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>False Alarm</span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-slate-950/20 border border-slate-850 rounded-xl p-6 text-center text-slate-500 italic h-full flex items-center justify-center">
                  Select an active event logging trace from the left list to begin SOC investigation.
                </div>
              )}
            </div>
          </div>
        )}

        {/* ==================== TAB 2: DLP POLICY STUDIO ==================== */}
        {activeTab === 'dlp' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Quick Policy Setup Form */}
            <div className="lg:col-span-4 bg-slate-950/40 border border-slate-800 rounded-xl p-5">
              <h4 className="text-sm font-semibold font-display tracking-tight text-white mb-3 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-purple-400" />
                DLP Custom Rule Creator
              </h4>
              <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                Add structured filters using regular expressions. In Month 3 at SafeAeon, Mannatpreet optimized rules minimizing production block leaks.
              </p>

              <form onSubmit={handleAddDlpRule} className="space-y-3">
                <div>
                  <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Corporate Rule Title</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Audit Source-code Leaks" 
                    value={newRuleName}
                    onChange={(e) => setNewRuleName(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Inspection Content Regex</label>
                  <input 
                    type="text" 
                    placeholder="Regex parameters..." 
                    value={newRulePattern}
                    onChange={(e) => setNewRulePattern(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-blue-400 font-mono placeholder-slate-600 focus:outline-none focus:border-purple-500"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full py-2.5 rounded-lg bg-purple-600/20 hover:bg-purple-600/30 text-purple-400 border border-purple-500/30 font-mono text-xs cursor-pointer hover:border-purple-500 transition-all flex items-center justify-center gap-1.5"
                >
                  <Cpu className="w-3.5 h-3.5" />
                  Apply Live DLP Policy
                </button>
              </form>

              <div className="mt-4 pt-4 border-t border-slate-900">
                <span className="text-[10px] font-mono text-slate-400 block mb-2 uppercase">Classification Standards:</span>
                <div className="space-y-1.5 text-[10px] text-slate-400 font-mono">
                  <div className="flex justify-between p-1 bg-slate-900/50 rounded"><span>SSN RegEx:</span> <span className="text-purple-300">\d{3}-\d{2}-\d{4}</span></div>
                  <div className="flex justify-between p-1 bg-slate-900/50 rounded"><span>Card RegEx:</span> <span className="text-purple-300">^4[0-9]{12}</span></div>
                  <div className="flex justify-between p-1 bg-slate-900/50 rounded"><span>Sensitive Words:</span> <span className="text-purple-300">"Confidential","Internal"</span></div>
                </div>
              </div>
            </div>

            {/* Live Policy Cards Table */}
            <div className="lg:col-span-8 flex flex-col space-y-4">
              <div className="flex items-center justify-between">
                <div className="relative w-64">
                  <input 
                    type="text" 
                    placeholder="Search active policies..." 
                    value={dlpSearch}
                    onChange={(e) => setDlpSearch(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-purple-500"
                  />
                  <Search className="w-3.5 h-3.5 text-slate-600 absolute left-2.5 top-2.5" />
                </div>
                <span className="text-xs font-mono text-purple-400">Forcepoint Management Console v8.99</span>
              </div>

              {/* Forcepoint List Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {dlpPolicies
                  .filter(p => !dlpSearch || p.name.toLowerCase().includes(dlpSearch.toLowerCase()))
                  .map((policy) => (
                    <div 
                      id={`dlp-policy-${policy.id}`}
                      key={policy.id}
                      className="bg-slate-950/50 border border-slate-800 rounded-xl p-4 flex flex-col relative overflow-hidden group hover:border-purple-500/30 transition-all duration-300"
                    >
                      <div className="absolute -right-6 -bottom-6 w-16 h-16 bg-purple-500/5 rounded-full group-hover:scale-150 transition-all duration-300" />
                      
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-mono text-[9px] text-purple-400 bg-purple-950/20 px-2 py-0.5 rounded-full border border-purple-500/10">Forcepoint Rule ID</span>
                        <div className="flex items-center gap-1.5">
                          <span className={`w-1.5 h-1.5 rounded-full ${policy.status ? 'bg-emerald-500' : 'bg-slate-600'}`} />
                          <span className="text-[10px] font-mono text-slate-400">{policy.status ? "ACTIVE" : "PAUSED"}</span>
                        </div>
                      </div>

                      <h5 className="text-sm font-semibold font-display text-white mb-1.5 line-clamp-1">{policy.name}</h5>
                      
                      <div className="bg-slate-900 rounded p-2 mb-3 mt-1 text-[11px] font-mono text-slate-400 break-all">
                        <span className="text-[9px] block text-slate-500 uppercase">CLASSIFIER RULE</span>
                        {policy.rule}
                      </div>

                      <div className="flex justify-between items-center mt-auto pt-2 border-t border-slate-900 text-xs">
                        <div>
                          <span className="text-[9px] text-slate-500 block uppercase">ENFORCED ACTION</span>
                          <span className="text-slate-300 font-mono text-[10px]">{policy.action}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-[9px] text-slate-500 block uppercase">TRIGGERS PREVENTED</span>
                          <span className="text-purple-400 font-semibold font-mono">{policy.triggers} Times</span>
                        </div>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        )}

        {/* ==================== TAB 3: DSPM DISCOVERY & RISK MAP ==================== */}
        {activeTab === 'dspm' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* DSPM Asset List */}
            <div className="lg:col-span-8 flex flex-col space-y-3">
              <div className="text-xs font-mono text-slate-400 flex items-center gap-1">
                <Eye className="w-3.5 h-3.5 text-pink-400" />
                <span>Sensitive Data Mapping & Discovery Ledger</span>
              </div>

              <div className="bg-slate-950/40 border border-slate-800 rounded-xl overflow-hidden">
                <table className="w-full text-left font-mono text-xs">
                  <thead className="bg-slate-900/60 text-slate-400 border-b border-slate-800">
                    <tr>
                      <th className="p-3">Asset Target</th>
                      <th className="p-3">Data Category</th>
                      <th className="p-3 text-center">PII Count</th>
                      <th className="p-3 text-center">Status</th>
                      <th className="p-3 text-right">Risk Index</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-900">
                    {scannedAssets.map((asset) => (
                      <tr 
                        id={`dspm-asset-${asset.name}`}
                        key={asset.name}
                        onClick={() => setSelectedAssetForAudit(asset)}
                        className={`hover:bg-slate-900/50 cursor-pointer transition-all ${selectedAssetForAudit?.name === asset.name ? 'bg-pink-950/10' : ''}`}
                      >
                        <td className="p-3 font-semibold text-slate-200">{asset.name}</td>
                        <td className="p-3 text-slate-400">{asset.type}</td>
                        <td className="p-3 text-center text-pink-400 font-semibold">{asset.sensitiveCount.toLocaleString()}</td>
                        <td className="p-3 text-center">
                          <span className={`px-2 py-0.5 rounded text-[10px] ${asset.isEncrypted ? 'bg-emerald-950/20 text-emerald-400' : 'bg-red-950/20 text-red-400'}`}>
                            {asset.isEncrypted ? "Cipher ON" : "Plaintext"}
                          </span>
                        </td>
                        <td className="p-3 text-right">
                          <span className={`px-2 py-0.5 rounded text-[10px] ${
                            asset.risk === 'CRITICAL' ? 'bg-red-500/20 text-red-500' :
                            asset.risk === 'HIGH' ? 'bg-orange-500/20 text-orange-400' :
                            asset.risk === 'MEDIUM' ? 'bg-amber-500/20 text-amber-300' : 'bg-slate-800 text-slate-400'
                          }`}>
                            {asset.risk}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Active Risk Mitigation Sandbox */}
            <div className="lg:col-span-4 flex flex-col">
              {selectedAssetForAudit ? (
                <div id="dspm-audit-detail" className="bg-slate-950/40 border border-slate-800 rounded-xl p-5 h-full flex flex-col relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/5 blur-2xl rounded-full" />
                  
                  <h4 className="text-sm font-semibold font-display text-white mb-3 flex items-center gap-1.5">
                    <Database className="w-4 h-4 text-pink-400" />
                    Secure Isolation Console
                  </h4>
                  
                  <div className="space-y-4 text-xs font-sans mb-6">
                    <div>
                      <div className="text-slate-500 text-[10px] font-mono uppercase">TARGET NAME</div>
                      <div className="text-white font-medium font-mono text-sm break-all">{selectedAssetForAudit.name}</div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-slate-500 text-[10px] font-mono uppercase">EXPOSURE VECTOR</div>
                        <div className="text-slate-300 font-medium font-mono mt-0.5">{selectedAssetForAudit.authStatus}</div>
                      </div>
                      <div>
                        <div className="text-slate-500 text-[10px] font-mono uppercase">CIPHER SHIELD</div>
                        <div className="text-slate-300 font-medium font-mono mt-0.5">{selectedAssetForAudit.isEncrypted ? "AES-256" : "None"}</div>
                      </div>
                    </div>

                    <div className="border-t border-slate-900 pt-3">
                      <div className="text-slate-500 text-[10px] font-mono uppercase">POSTURE COMPLIANCE FAULT</div>
                      <p className="text-slate-400 leading-relaxed mt-1">
                        {selectedAssetForAudit.risk === "CRITICAL" || selectedAssetForAudit.risk === "HIGH" ? (
                          "High sensitive volume indexed with open networks access keys. Requires immediately enforcing network access blocks and applying standard AES-256 cipher vaults."
                        ) : (
                          "Target asset aligns standard corporate postures. Regularly monitor network tunnels to confirm access permissions remain private."
                        )}
                      </p>
                    </div>
                  </div>

                  {/* Interactive Fix Posture button */}
                  <div className="mt-auto pt-4 border-t border-slate-900">
                    <button 
                      onClick={() => runDspmAudit(selectedAssetForAudit.name)}
                      disabled={selectedAssetForAudit.risk === "LOW" || isAuditing}
                      className={`w-full py-3 rounded-lg text-xs font-mono transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                        selectedAssetForAudit.risk === "LOW" 
                          ? 'bg-emerald-950/20 text-emerald-400 border border-emerald-500/15' 
                          : 'bg-pink-600/20 hover:bg-pink-600/30 text-pink-400 border border-pink-500/20 hover:border-pink-500/40'
                      }`}
                    >
                      {isAuditing ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          <span>Re-encoding Asset & Restricting...</span>
                        </>
                      ) : selectedAssetForAudit.risk === "LOW" ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Security Posture Hardened</span>
                        </>
                      ) : (
                        <>
                          <Shield className="w-3.5 h-3.5" />
                          <span>Encrypt & Remediate Bucket</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-slate-950/20 border border-slate-850 rounded-xl p-6 text-center text-slate-500 italic h-full flex items-center justify-center">
                  Select a datastore asset from the map directory to run isolation audits.
                </div>
              )}
            </div>
          </div>
        )}

        {/* ==================== TAB 4: CASB SHADOWsaas GUARD ==================== */}
        {activeTab === 'casb' && (
          <div className="space-y-4 grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-12">
              <div className="text-xs font-mono text-slate-400 flex items-center gap-1">
                <Cloud className="w-4 h-4 text-red-400" />
                <span>CASB Shadow-IT Cloud App Discovery & Control Tunnels</span>
              </div>
            </div>

            {/* List and blocker operations */}
            <div className="lg:col-span-8 bg-slate-950/40 border border-slate-800 rounded-xl p-4 divide-y divide-slate-900">
              {shadowApps.map((app) => (
                <div 
                  id={`casb-app-${app.name}`}
                  key={app.name} 
                  className="py-3 flex flex-col md:flex-row md:items-center justify-between font-mono text-xs gap-3"
                >
                  <div className="flex items-center gap-3">
                    <span className={`px-2 py-1.5 rounded bg-slate-900 text-sm font-bold text-center ${
                      app.riskScore > 80 ? 'text-red-400 border border-red-500/20 bg-red-950/10' :
                      app.riskScore > 60 ? 'text-orange-400 border border-orange-500/20' : 'text-slate-400'
                    }`}>
                      {app.riskScore}
                    </span>
                    <div>
                      <div className="text-white font-semibold font-display text-sm">{app.name}</div>
                      <div className="text-slate-500 text-[10px] mt-0.5">{app.category} • {app.usersCount} Active Users</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between md:justify-end gap-6">
                    <div className="text-right">
                      <span className="text-[10px] text-slate-500 block uppercase">BANDWIDTH LEAK</span>
                      <span className="text-slate-300 font-bold">{app.bytesTransferred}</span>
                    </div>

                    <button 
                      onClick={() => toggleSaaSBlock(app.name)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        app.action === "BLOCK" 
                          ? 'bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30' 
                          : 'bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border border-emerald-500/30'
                      }`}
                    >
                      {app.action === "BLOCK" ? "BLOCKED" : "MONITORED"}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* CASB Security Warning summary */}
            <div className="lg:col-span-4 bg-slate-950/40 border border-slate-800 rounded-xl p-5 flex flex-col justify-between">
              <div>
                <h4 className="text-sm font-semibold font-display text-white mb-2 flex items-center gap-1.5 uppercase tracking-wide">
                  <AlertTriangle className="w-4 h-4 text-orange-400 animate-bounce" />
                  CASB Risk Evaluation
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  SaaS products operating outside network perimeter access models represent blindspots for DLP scanners. In Month 5, Mannatpreet Singh configured CASB models to intercept shadow transfers on corporate client workstations.
                </p>

                <div className="space-y-2.5 text-xs text-slate-300 font-mono">
                  <div className="flex justify-between border-b border-slate-900 pb-1.5">
                    <span>Audit Score:</span>
                    <span className="text-red-400 font-bold">2 Critically Vulnerable</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-900 pb-1.5">
                    <span>Total Apps Found:</span>
                    <span className="text-blue-400">45 Active Tunnels</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Target Compliance:</span>
                    <span className="text-amber-400 font-bold">84% - Warning</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-800/80 text-xs mt-6 text-slate-400 italic">
                Enforcing "BLOCK" forces client requests to pass through our Secure Web Gateway proxy, denying arbitrary SaaS upload commands.
              </div>
            </div>
          </div>
        )}

        {/* ==================== TAB 5: POWER BI ANALYTICS ==================== */}
        {activeTab === 'powerbi' && (
          <div className="space-y-6">
            
            {/* Simulation Header and Time Filters */}
            <div className="flex flex-col md:flex-row md:items-center justify-between bg-slate-900/40 p-4 border border-slate-800 rounded-xl gap-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded bg-yellow-500 animate-pulse" />
                <span className="text-xs font-mono text-slate-400">Embed: Power BI Desktop Cloud Integration</span>
              </div>
              <div className="flex items-center gap-1.5">
                {(['7d', '30d', '6mo'] as const).map((range) => (
                  <button
                    key={range}
                    onClick={() => {
                      setBiTimeRange(range);
                      setRefreshedTime("Refreshing visuals...");
                      setTimeout(() => setRefreshedTime("Updated just now"), 500);
                    }}
                    className={`px-3 py-1 rounded text-xs font-mono cursor-pointer ${biTimeRange === range ? 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/30' : 'text-slate-400 hover:text-white'}`}
                  >
                    {range === '7d' ? 'Last week' : range === '30d' ? 'Last month' : '6 Month Summary'}
                  </button>
                ))}
              </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-slate-950/40 border border-slate-805 p-3.5 rounded-xl text-center">
                <span className="text-[10px] font-mono text-slate-500 block uppercase">MEAN TIME TO DEPLOY (MTTD)</span>
                <span className="text-2xl font-bold font-display text-white mt-1 block">
                  {biTimeRange === '7d' ? '4.8 Min' : biTimeRange === '30d' ? '3.5 Min' : '2.1 Min'}
                </span>
                <span className="text-[10px] font-mono text-emerald-400 mt-1 block">↓ 14% improvement week-over-week</span>
              </div>
              <div className="bg-slate-950/40 border border-slate-805 p-3.5 rounded-xl text-center">
                <span className="text-[10px] font-mono text-slate-500 block uppercase">ALERTS ESCALATED TO TI-2</span>
                <span className="text-2xl font-bold font-display text-white mt-1 block">
                  {biTimeRange === '7d' ? '12 Alarms' : biTimeRange === '30d' ? '48 Alarms' : '248 Alarms'}
                </span>
                <span className="text-[10px] font-mono text-slate-400 mt-1 block">99.1% True-Positive confirmation rate</span>
              </div>
              <div className="bg-slate-950/40 border border-slate-805 p-3.5 rounded-xl text-center">
                <span className="text-[10px] font-mono text-slate-500 block uppercase">DLP COMPLIANCE LEAKS TRIGGERS</span>
                <span className="text-2xl font-bold font-display text-white mt-1 block">
                  {biTimeRange === '7d' ? '19 Blocks' : biTimeRange === '30d' ? '74 Blocks' : '415 Blocks'}
                </span>
                <span className="text-[10px] font-mono text-emerald-400 mt-1 block">↓ 35% fall due to tailored class rules</span>
              </div>
            </div>

            {/* Visual Charts Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* DLP Violations by Department */}
              <div className="lg:col-span-7 bg-slate-950/45 border border-slate-800 rounded-xl p-4">
                <div className="flex items-center justify-between mb-4 border-b border-slate-900 pb-2">
                  <span className="text-xs font-semibold text-white font-display uppercase tracking-wide">DLP Policy Blocks by Department</span>
                  <BarChart3 className="w-4 h-4 text-yellow-500" />
                </div>

                {/* Handmade dynamic visual bar charts representing security logs */}
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs text-slate-300 font-mono mb-1.5">
                      <span>Research & Product R&D</span>
                      <span className="font-semibold">{biTimeRange === '7d' ? '9 Blocks' : biTimeRange === '30d' ? '32 Blocks' : '182 Blocks'} (Source Code regex)</span>
                    </div>
                    <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden">
                      <div className="bg-gradient-to-r from-yellow-500 to-amber-600 h-full rounded-full transition-all duration-500" style={{ width: biTimeRange === '7d' ? '80%' : biTimeRange === '30d' ? '65%' : '75%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-slate-300 font-mono mb-1.5">
                      <span>Finance & Billing Accounts</span>
                      <span className="font-semibold">{biTimeRange === '7d' ? '6 Blocks' : biTimeRange === '30d' ? '24 Blocks' : '135 Blocks'} (Credit Card regex)</span>
                    </div>
                    <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden">
                      <div className="bg-gradient-to-r from-yellow-500 to-amber-600 h-full rounded-full transition-all duration-500" style={{ width: biTimeRange === '7d' ? '60%' : biTimeRange === '30d' ? '50%' : '55%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-slate-300 font-mono mb-1.5">
                      <span>Human Resources & Recruits</span>
                      <span className="font-semibold">{biTimeRange === '7d' ? '3 Blocks' : biTimeRange === '30d' ? '12 Blocks' : '65 Blocks'} (PII leaks)</span>
                    </div>
                    <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden">
                      <div className="bg-gradient-to-r from-yellow-500 to-amber-600 h-full rounded-full transition-all duration-500" style={{ width: biTimeRange === '7d' ? '30%' : biTimeRange === '30d' ? '25%' : '27%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-slate-300 font-mono mb-1.5">
                      <span>Executive Administration Staff</span>
                      <span className="font-semibold">{biTimeRange === '7d' ? '1 Block' : biTimeRange === '30d' ? '6 Blocks' : '33 Blocks'} (Keywords filter)</span>
                    </div>
                    <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden">
                      <div className="bg-gradient-to-r from-yellow-500 to-amber-600 h-full rounded-full transition-all duration-500" style={{ width: biTimeRange === '7d' ? '10%' : biTimeRange === '30d' ? '12%' : '14%' }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Weekly Incident Trend Sparkline Block */}
              <div className="lg:col-span-5 bg-slate-950/45 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
                <div className="border-b border-slate-900 pb-2 mb-3">
                  <span className="text-xs font-semibold text-white font-display uppercase tracking-wide block">Triage Ticket Pipeline Trend</span>
                  <span className="text-[10px] font-mono text-slate-500">SafeAeon active ticket queues Month 1 to Month 6</span>
                </div>

                {/* Interactive SVG Sparkline with Hover Dots */}
                <div className="w-full h-32 flex items-end relative py-2">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 300 100" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="chart-area-grad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#FBBF24" stopOpacity="0.15" />
                        <stop offset="100%" stopColor="#FBBF24" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    
                    {/* Fill */}
                    <path 
                      d="M 0 90 L 50 82 L 100 68 L 150 48 L 200 32 L 250 18 L 300 12 L 300 100 L 0 100 Z"
                      fill="url(#chart-area-grad)"
                    />
                    
                    {/* Grid lines */}
                    <line x1="0" y1="20" x2="300" y2="20" stroke="rgba(255,255,255,0.04)" strokeDasharray="4 2" />
                    <line x1="0" y1="50" x2="300" y2="50" stroke="rgba(255,255,255,0.04)" strokeDasharray="4 2" />
                    <line x1="0" y1="80" x2="300" y2="80" stroke="rgba(255,255,255,0.04)" strokeDasharray="4 2" />

                    {/* Plot Line */}
                    <path 
                      d="M 0 90 C 25 86, 25 82, 50 82 C 75 82, 75 68, 100 68 C 125 68, 125 48, 150 48 C 175 48, 175 32, 200 32 C 225 32, 225 18, 250 18 C 275 18, 275 12, 300 12"
                      fill="none"
                      stroke="#FBBF24"
                      strokeWidth="2"
                    />

                    {/* Highlight Dots */}
                    <circle cx="0" cy="90" r="3" fill="#FBBF24" />
                    <circle cx="50" cy="82" r="3" fill="#FBBF24" />
                    <circle cx="100" cy="68" r="3" fill="#FBBF24" />
                    <circle cx="150" cy="48" r="3" fill="#FBBF24" />
                    <circle cx="200" cy="32" r="3" fill="#FBBF24" />
                    <circle cx="250" cy="18" r="3" fill="#FBBF24" />
                    <circle cx="300" cy="12" r="3" fill="#FBBF24" />
                  </svg>

                  {/* Month Markers */}
                  <div className="absolute inset-x-0 bottom-0 flex justify-between text-[8px] font-mono text-slate-500 px-1 pt-1 bg-slate-950 border-t border-slate-900">
                    <span>Month 1</span>
                    <span>Month 2</span>
                    <span>Month 3</span>
                    <span>Month 4</span>
                    <span>Month 5</span>
                    <span>Month 6</span>
                  </div>
                </div>

                <div className="mt-3 text-[10px] text-slate-400 font-mono bg-slate-900/40 p-2 rounded flex justify-between">
                  <span>Current refresh cycle rate:</span>
                  <span className="text-yellow-500 font-bold">{refreshedTime}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
