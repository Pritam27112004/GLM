import React from 'react';
import Breadcrumb from './Breadcrumb';

export const PageHeader = ({
  title,
  subtitle,
  badge,
  breadcrumbs = [],
  actions
}) => {
  return (
    <div className="mb-6">
      {breadcrumbs.length > 0 && <Breadcrumb items={breadcrumbs} />}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B2A4A] tracking-tight">{title}</h1>
            {badge && (
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-[#EAF5FB] text-[#1976D2] border border-[#1976D2]/20">
                {badge}
              </span>
            )}
          </div>
          {subtitle && (
            <p className="text-sm text-slate-500 mt-1 leading-relaxed max-w-3xl">{subtitle}</p>
          )}
        </div>

        {actions && (
          <div className="flex items-center gap-2.5 flex-wrap">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
};

export default PageHeader;
