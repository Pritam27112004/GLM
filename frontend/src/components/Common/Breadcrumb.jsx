import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export const Breadcrumb = ({ items = [] }) => {
  return (
    <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-3" aria-label="Breadcrumb">
      <Link to="/" className="hover:text-[#1976D2] flex items-center gap-1 transition-colors">
        <Home className="w-3.5 h-3.5" />
        <span>Portal</span>
      </Link>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
          {item.link ? (
            <Link to={item.link} className="hover:text-[#1976D2] transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="font-semibold text-[#0B2A4A] truncate max-w-[200px]">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;
