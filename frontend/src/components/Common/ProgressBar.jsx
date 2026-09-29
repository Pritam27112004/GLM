import React from 'react';

export const ProgressBar = ({ progress = 0, color = 'blue', showLabel = true, height = 'h-2' }) => {
  const clamped = Math.min(100, Math.max(0, progress));

  const colorStyles = {
    blue: 'bg-[#1976D2]',
    navy: 'bg-[#0B2A4A]',
    cyan: 'bg-[#19A7CE]',
    green: 'bg-[#2E9D59]',
    orange: 'bg-[#F28C28]'
  };

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between items-center text-xs font-semibold text-slate-600 mb-1.5">
          <span>Completion Progress</span>
          <span className="text-[#0B2A4A]">{clamped}%</span>
        </div>
      )}
      <div className={`w-full bg-slate-100 rounded-full overflow-hidden ${height}`}>
        <div
          className={`${height} rounded-full transition-all duration-500 ease-out ${colorStyles[color] || colorStyles.blue}`}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
