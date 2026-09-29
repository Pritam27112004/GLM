import React, { useState } from 'react';
import { Cpu, Camera, Radio, CheckCircle, RefreshCw, Layers, ArrowRight, ShieldCheck } from 'lucide-react';
import { useNotification } from '../../context/NotificationContext';

export const RaspberryPiStatusCard = ({ onTriggerSimulation }) => {
  const [isSyncing, setIsSyncing] = useState(false);
  const { addToast } = useNotification();

  const handleSimulateSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      if (onTriggerSimulation) onTriggerSimulation();
      addToast({
        title: 'Edge Node Sync Complete',
        message: 'Simulated Raspberry Pi 5 node (RICM Patna Gate 1) transmitted 1 new biometric attendance record (98.6% confidence).',
        type: 'success'
      });
    }, 1200);
  };

  return (
    <div className="bg-gradient-to-br from-[#0B2A4A] via-[#143C66] to-[#071A2E] text-white rounded-2xl p-6 border border-cyan-500/30 shadow-xl relative overflow-hidden mb-6">
      {/* Background Circuit Grid Accent */}
      <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-[#19A7CE]/10 rounded-full blur-2xl pointer-events-none" />

      {/* Top Banner Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-[#19A7CE]">
            <Cpu className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-white tracking-wide">
                Raspberry Pi 5 + Camera Attendance Node
              </h3>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#19A7CE]/20 text-[#19A7CE] border border-[#19A7CE]/40">
                PROTOTYPE MODE
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Edge Hardware Attendance & Biometric Gateway Architecture
            </p>
          </div>
        </div>

        {/* Live Status Indicator */}
        <div className="flex items-center gap-2 bg-emerald-950/80 border border-emerald-500/40 px-3 py-1.5 rounded-full text-xs font-semibold text-emerald-300">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>SIMULATION ACTIVE</span>
        </div>
      </div>

      {/* Hardware Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-5 text-xs">
        <div className="bg-white/5 border border-white/10 rounded-xl p-3.5">
          <span className="text-slate-400 block text-[11px] mb-1">Target Hardware</span>
          <span className="font-bold text-white flex items-center gap-1.5">
            <Cpu className="w-4 h-4 text-[#19A7CE]" /> Raspberry Pi 5 (8GB)
          </span>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-3.5">
          <span className="text-slate-400 block text-[11px] mb-1">Optical Sensor</span>
          <span className="font-bold text-white flex items-center gap-1.5">
            <Camera className="w-4 h-4 text-amber-400" /> Sony IMX708 (Wide Angle)
          </span>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-3.5">
          <span className="text-slate-400 block text-[11px] mb-1">Active Edge Node</span>
          <span className="font-bold text-white flex items-center gap-1.5">
            <Radio className="w-4 h-4 text-emerald-400" /> RICM Patna - Main Entry
          </span>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-3.5">
          <span className="text-slate-400 block text-[11px] mb-1">Future Integration</span>
          <span className="font-bold text-[#19A7CE] flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#19A7CE]" /> QR / Face-based Edge AI
          </span>
        </div>
      </div>

      {/* Architecture Pipeline Flow Diagram */}
      <div className="bg-black/30 border border-white/10 rounded-xl p-4 mb-4">
        <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
          End-to-End Edge-to-Cloud Attendance Pipeline
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
          <span className="px-2.5 py-1 bg-white/10 rounded-md text-amber-300 font-semibold">
            📷 Camera Frame Capture
          </span>
          <ArrowRight className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
          <span className="px-2.5 py-1 bg-white/10 rounded-md text-[#19A7CE] font-semibold">
            ⚡ RPi 5 Feature Extractor
          </span>
          <ArrowRight className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
          <span className="px-2.5 py-1 bg-white/10 rounded-md text-emerald-300 font-semibold">
            🔒 Secure REST API
          </span>
          <ArrowRight className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
          <span className="px-2.5 py-1 bg-white/10 rounded-md text-purple-300 font-semibold">
            🗄️ Central Attendance DB
          </span>
          <ArrowRight className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
          <span className="px-2.5 py-1 bg-[#0B2A4A] border border-[#19A7CE]/40 rounded-md text-white font-bold">
            📊 NCCT Admin Portal
          </span>
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 text-xs">
        <p className="text-slate-300 text-[11px] leading-relaxed">
          <strong className="text-white">Note:</strong> Currently using high-fidelity mock stream simulation. Physical GPIO and camera interfaces are architected to plug directly into <code className="text-[#19A7CE] bg-white/10 px-1 py-0.5 rounded">/api/attendance/simulate-checkin</code>.
        </p>

        <button
          onClick={handleSimulateSync}
          disabled={isSyncing}
          className="btn-accent text-xs whitespace-nowrap px-4 py-2 font-semibold shadow-md flex items-center gap-1.5 flex-shrink-0"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
          <span>{isSyncing ? 'Simulating Edge Capture...' : 'Simulate Edge Node Check-In'}</span>
        </button>
      </div>
    </div>
  );
};

export default RaspberryPiStatusCard;
