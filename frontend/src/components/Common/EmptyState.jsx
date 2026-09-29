import React from 'react';
import { FolderOpen } from 'lucide-react';

export const EmptyState = ({
  icon: Icon = FolderOpen,
  title = 'No records found',
  description = 'There are currently no items matching your filter or search criteria.',
  actionLabel,
  onAction
}) => {
  return (
    <div className="bg-white rounded-xl border border-dashed border-slate-300 p-8 text-center my-4">
      <div className="w-12 h-12 rounded-full bg-[#EAF5FB] text-[#1976D2] flex items-center justify-center mx-auto mb-3">
        <Icon className="w-6 h-6" />
      </div>
      <h4 className="text-base font-bold text-[#0B2A4A]">{title}</h4>
      <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 leading-relaxed">{description}</p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="mt-4 btn-primary text-xs"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
