import React from 'react';

export const StatusBadge = ({ status, size = 'sm', className = '' }) => {
  const normalized = (status || '').toLowerCase();

  let styles = 'bg-slate-100 text-slate-700 border-slate-200';
  let dotColor = 'bg-slate-400';

  if (['present', 'verified', 'active', 'completed', 'confirmed', 'standard'].includes(normalized)) {
    styles = 'bg-emerald-50 text-emerald-700 border-emerald-200';
    dotColor = 'bg-emerald-500';
  } else if (['late', 'pending', 'upcoming', 'hybrid', 'data-saver', 'under review'].includes(normalized)) {
    styles = 'bg-amber-50 text-amber-700 border-amber-200';
    dotColor = 'bg-amber-500';
  } else if (['absent', 'revoked', 'closed', 'high'].includes(normalized)) {
    styles = 'bg-rose-50 text-rose-700 border-rose-200';
    dotColor = 'bg-rose-500';
  } else if (['on leave', 'residential', 'online', 'draft', 'offline available'].includes(normalized)) {
    styles = 'bg-cyan-50 text-cyan-800 border-cyan-200';
    dotColor = 'bg-cyan-500';
  } else if (['in_progress', 'ongoing'].includes(normalized)) {
    styles = 'bg-blue-50 text-blue-700 border-blue-200';
    dotColor = 'bg-blue-500';
  }

  const sizeClass = size === 'xs' ? 'px-2 py-0.5 text-[11px]' : size === 'md' ? 'px-3 py-1 text-xs' : 'px-2.5 py-0.5 text-xs';

  return (
    <span className={`inline-flex items-center gap-1.5 font-medium rounded-full border ${styles} ${sizeClass} ${className}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`}></span>
      <span className="capitalize">{status}</span>
    </span>
  );
};

export default StatusBadge;
