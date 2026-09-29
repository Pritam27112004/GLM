import React from 'react';
import { useNotification } from '../../context/NotificationContext';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer = () => {
  const { toasts, removeToast } = useNotification();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-md w-full pointer-events-none">
      {toasts.map(toast => {
        const icons = {
          success: <CheckCircle2 className="w-5 h-5 text-[#2E9D59] flex-shrink-0 mt-0.5" />,
          warning: <AlertTriangle className="w-5 h-5 text-[#F28C28] flex-shrink-0 mt-0.5" />,
          error: <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />,
          info: <Info className="w-5 h-5 text-[#19A7CE] flex-shrink-0 mt-0.5" />
        };

        const borderStyles = {
          success: 'border-l-4 border-l-[#2E9D59]',
          warning: 'border-l-4 border-l-[#F28C28]',
          error: 'border-l-4 border-l-red-500',
          info: 'border-l-4 border-l-[#19A7CE]'
        };

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 bg-white rounded-xl shadow-lg border border-slate-200 ${borderStyles[toast.type] || borderStyles.info} transition-all duration-300 animate-slide-in`}
          >
            {icons[toast.type] || icons.info}
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-[#0B2A4A]">{toast.title}</h4>
              <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-slate-600 transition-colors p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default ToastContainer;
