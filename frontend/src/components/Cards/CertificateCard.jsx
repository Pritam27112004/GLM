import React from 'react';
import { Award, ShieldCheck, Download, Eye, QrCode, Calendar } from 'lucide-react';
import StatusBadge from '../Common/StatusBadge';

export const CertificateCard = ({ certificate, onView, onDownload }) => {
  const {
    certificateId,
    traineeName,
    courseTitle,
    regionalInstitute = 'RICM Patna',
    issueDate,
    completionScore = 88,
    status = 'Verified',
    skillsAccredited = []
  } = certificate;

  const isVerified = status === 'Verified';

  return (
    <div className="bg-white rounded-xl border-2 border-[#1976D2]/20 shadow-subtle hover:shadow-card transition-all duration-200 overflow-hidden flex flex-col justify-between relative group">
      {/* Top Banner with gold trim */}
      <div className="bg-gradient-to-r from-[#0B2A4A] via-[#143C66] to-[#0B2A4A] p-4 text-white flex items-center justify-between border-b-2 border-amber-400/80">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-300">
            <Award className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-amber-300 block">NCCT Certified</span>
            <span className="text-xs font-mono font-bold text-white">{certificateId}</span>
          </div>
        </div>

        <StatusBadge status={status} size="xs" className="bg-emerald-950/80 text-emerald-300 border-emerald-500/50" />
      </div>

      {/* Certificate Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="text-[11px] text-slate-500 mb-1">Conferred to Candidate:</div>
          <h4 className="text-base font-extrabold text-[#0B2A4A] mb-2">{traineeName}</h4>

          <div className="text-[11px] text-slate-500 mb-1">For Successful Completion of:</div>
          <h3 className="text-sm font-bold text-[#1976D2] leading-snug line-clamp-2 mb-3">
            {courseTitle}
          </h3>

          <div className="bg-[#F7FAFC] p-3 rounded-lg border border-slate-200/80 space-y-1.5 text-xs mb-3">
            <div className="flex justify-between items-center">
              <span className="text-slate-500">Accrediting Body:</span>
              <span className="font-semibold text-slate-700 truncate max-w-[170px]">{regionalInstitute}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500">Grading Score:</span>
              <span className="font-bold text-[#2E9D59]">{completionScore}% (Distinction)</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500 flex items-center gap-1">
                <Calendar className="w-3 h-3" /> Issue Date:
              </span>
              <span className="font-medium text-slate-700">{issueDate}</span>
            </div>
          </div>

          {skillsAccredited.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2">
              {skillsAccredited.slice(0, 3).map((skill, i) => (
                <span key={i} className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-600">
                  {skill}
                </span>
              ))}
              {skillsAccredited.length > 3 && (
                <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-600">
                  +{skillsAccredited.length - 3} more
                </span>
              )}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
          <button
            onClick={() => onView && onView(certificate)}
            className="btn-primary text-xs flex-1 justify-center font-semibold"
          >
            <Eye className="w-3.5 h-3.5" /> View Certificate
          </button>
          <button
            onClick={() => onDownload && onDownload(certificate)}
            className="btn-outline text-xs px-3"
            title="Download Verified PDF"
          >
            <Download className="w-3.5 h-3.5 text-slate-600" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CertificateCard;
