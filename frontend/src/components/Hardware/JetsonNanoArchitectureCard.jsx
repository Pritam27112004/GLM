import React from 'react';
import { Cpu, Bot, Database, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

export const JetsonNanoArchitectureCard = () => {
  return (
    <div className="bg-[#0B2A4A] text-white rounded-2xl p-5 border border-[#19A7CE]/30 shadow-lg relative overflow-hidden my-4">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-[#19A7CE]/20 border border-[#19A7CE]/40 flex items-center justify-center text-[#19A7CE]">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              AI CAREER ASSISTANT
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#F28C28]/20 text-[#F28C28] border border-[#F28C28]/40">
                PROTOTYPE • LOCAL LLM PLANNED
              </span>
            </h4>
            <p className="text-xs text-slate-300">
              Future Architecture: NVIDIA Jetson Nano Local Edge AI
            </p>
          </div>
        </div>

        <div className="text-xs text-slate-300 flex items-center gap-1.5 font-medium">
          <Zap className="w-3.5 h-3.5 text-amber-400" />
          <span>Zero-Cloud Privacy Mode (Rural / Offline)</span>
        </div>
      </div>

      {/* Visual Pipeline Flow */}
      <div className="my-4 bg-white/5 border border-white/10 rounded-xl p-3.5">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
          <div className="flex items-center gap-1.5 bg-black/40 px-3 py-1.5 rounded-lg border border-white/10">
            <Cpu className="w-3.5 h-3.5 text-[#19A7CE]" />
            <span>Jetson Nano 4GB/8GB</span>
          </div>
          <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
          <div className="flex items-center gap-1.5 bg-black/40 px-3 py-1.5 rounded-lg border border-white/10">
            <Bot className="w-3.5 h-3.5 text-purple-300" />
            <span>Quantized Local LLM</span>
          </div>
          <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
          <div className="flex items-center gap-1.5 bg-black/40 px-3 py-1.5 rounded-lg border border-white/10">
            <Database className="w-3.5 h-3.5 text-amber-300" />
            <span>NCCT Knowledge Base</span>
          </div>
          <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
          <div className="flex items-center gap-1.5 bg-black/40 px-3 py-1.5 rounded-lg border border-emerald-400/40 text-emerald-300 font-bold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Cooperative Career Guidance</span>
          </div>
        </div>
      </div>

      <div className="text-[11px] text-slate-300 leading-relaxed flex items-center justify-between">
        <span>
          <strong>Current Demonstration:</strong> Domain knowledge engine providing deterministic advisory matching candidate profile, certifications, and open vacancies.
        </span>
        <span className="text-emerald-400 font-mono hidden md:inline">Latency: &lt;40ms</span>
      </div>
    </div>
  );
};

export default JetsonNanoArchitectureCard;
