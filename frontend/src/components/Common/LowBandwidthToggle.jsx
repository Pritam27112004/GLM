import React from 'react';
import { useBandwidth } from '../../context/BandwidthContext';
import { Wifi, Zap, HardDriveDownload } from 'lucide-react';

export const LowBandwidthToggle = () => {
  const { bandwidthMode, setBandwidthMode } = useBandwidth();

  return (
    <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs">
      <button
        onClick={() => setBandwidthMode('standard')}
        className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-all ${
          bandwidthMode === 'standard'
            ? 'bg-white text-[#0B2A4A] font-semibold shadow-xs'
            : 'text-slate-600 hover:text-slate-900'
        }`}
        title="Full resolution video and real-time interactive charts"
      >
        <Wifi className="w-3.5 h-3.5 text-[#1976D2]" />
        <span className="hidden sm:inline">Standard</span>
      </button>

      <button
        onClick={() => setBandwidthMode('data-saver')}
        className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-all ${
          bandwidthMode === 'data-saver'
            ? 'bg-white text-[#F28C28] font-semibold shadow-xs'
            : 'text-slate-600 hover:text-slate-900'
        }`}
        title="Compressed audio-first stream with offline caching for rural connections"
      >
        <Zap className="w-3.5 h-3.5 text-[#F28C28]" />
        <span className="hidden sm:inline">Data Saver</span>
      </button>

      <button
        onClick={() => setBandwidthMode('offline')}
        className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-all ${
          bandwidthMode === 'offline'
            ? 'bg-white text-[#2E9D59] font-semibold shadow-xs'
            : 'text-slate-600 hover:text-slate-900'
        }`}
        title="Simulated local edge cache for low-connectivity regions"
      >
        <HardDriveDownload className="w-3.5 h-3.5 text-[#2E9D59]" />
        <span className="hidden sm:inline">Offline Available</span>
      </button>
    </div>
  );
};

export default LowBandwidthToggle;
