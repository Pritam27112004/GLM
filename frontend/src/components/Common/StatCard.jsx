import React from 'react';
import { ArrowUpRight, ArrowDownRight, TrendingUp } from 'lucide-react';

export const StatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendLabel = 'vs last month',
  color = 'blue',
  badge
}) => {
  const iconBgs = {
    blue: 'bg-[#EAF5FB] text-[#1976D2]',
    navy: 'bg-[#0B2A4A] text-white',
    cyan: 'bg-[#E1F6FB] text-[#19A7CE]',
    green: 'bg-[#EAF7EF] text-[#2E9D59]',
    orange: 'bg-[#FEF3E8] text-[#F28C28]',
    purple: 'bg-purple-50 text-purple-600'
  };

  const isPositive = trend && !trend.startsWith('-');

  return (
    <div className="bg-white rounded-xl p-5 border border-[#E2E8F0] shadow-subtle hover:shadow-card transition-all duration-200">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">{title}</p>
          <h3 className="text-2xl font-extrabold text-[#0B2A4A] tracking-tight">{value}</h3>
        </div>
        {Icon && (
          <div className={`p-3 rounded-xl ${iconBgs[color] || iconBgs.blue}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
        {trend ? (
          <div className="flex items-center gap-1">
            <span className={`inline-flex items-center font-bold ${isPositive ? 'text-[#2E9D59]' : 'text-rose-600'}`}>
              {isPositive ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
              {trend}
            </span>
            <span className="text-slate-500">{trendLabel}</span>
          </div>
        ) : subtitle ? (
          <span className="text-slate-500">{subtitle}</span>
        ) : (
          <span className="text-slate-400">NCCT Central Registry</span>
        )}

        {badge && (
          <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-700">
            {badge}
          </span>
        )}
      </div>
    </div>
  );
};

export default StatCard;
