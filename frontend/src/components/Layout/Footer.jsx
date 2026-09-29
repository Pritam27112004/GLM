import React from 'react';

export const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-200 mt-auto py-6 px-4 sm:px-8 text-xs text-slate-500">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <p className="font-bold text-[#0B2A4A]">
            National Council for Cooperative Training (NCCT)
          </p>
          <p className="text-[11px] text-slate-400 mt-0.5">
            An Autonomous Society Promoted by Ministry of Cooperation, Government of India
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-[11px]">
          <span>VAMNICOM (Pune)</span>
          <span>RICM (Patna, Bengaluru, Gandhinagar, Chandigarh, Kalyani)</span>
          <span>14 Regional ICMs</span>
        </div>

        <div className="text-[11px] text-slate-400">
          Integrated Digital Platform • Prototype v1.0
        </div>
      </div>
    </footer>
  );
};

export default Footer;
