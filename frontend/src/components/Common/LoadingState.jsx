import React from 'react';

export const LoadingState = ({ count = 3, type = 'card' }) => {
  if (type === 'table') {
    return (
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden animate-pulse p-4">
        <div className="h-8 bg-slate-200 rounded mb-4 w-1/3"></div>
        <div className="space-y-3">
          {[...Array(count)].map((_, i) => (
            <div key={i} className="h-10 bg-slate-100 rounded w-full"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 animate-pulse">
      {[...Array(count)].map((_, i) => (
        <div key={i} className="bg-white rounded-xl border border-slate-200 p-5 space-y-3">
          <div className="h-32 bg-slate-200 rounded-lg w-full"></div>
          <div className="h-4 bg-slate-200 rounded w-3/4"></div>
          <div className="h-3 bg-slate-100 rounded w-1/2"></div>
          <div className="h-8 bg-slate-100 rounded w-full mt-4"></div>
        </div>
      ))}
    </div>
  );
};

export default LoadingState;
