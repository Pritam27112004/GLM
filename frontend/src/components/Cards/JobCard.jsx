import React from 'react';
import { Building2, MapPin, Briefcase, Calendar, CheckCircle, ArrowRight } from 'lucide-react';
import StatusBadge from '../Common/StatusBadge';

export const JobCard = ({ job, onApply, hasApplied = false, onViewDetails, isAdmin = false }) => {
  const {
    jobId,
    title,
    organization,
    location,
    employmentType = 'Full Time',
    salaryRange = '₹28,000 - ₹42,000 / month',
    requiredSkills = [],
    description,
    postedDate,
    applicationDeadline,
    totalApplications = 0,
    status = 'Active'
  } = job;

  return (
    <div className="card-institutional p-6 flex flex-col justify-between group">
      <div>
        {/* Org & Status Tag */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-lg bg-[#EAF5FB] border border-[#1976D2]/20 flex items-center justify-center text-[#0B2A4A] flex-shrink-0">
              <Building2 className="w-5 h-5 text-[#1976D2]" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-700 leading-tight">{organization}</h4>
              <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3 h-3 text-slate-400" /> {location}
              </p>
            </div>
          </div>
          <StatusBadge status={employmentType} size="xs" />
        </div>

        {/* Job Title */}
        <h3 className="text-lg font-bold text-[#0B2A4A] leading-snug group-hover:text-[#1976D2] transition-colors mb-2">
          {title}
        </h3>

        {/* Salary */}
        <div className="text-xs font-extrabold text-[#2E9D59] mb-3">
          {salaryRange}
        </div>

        {/* Description */}
        <p className="text-xs text-slate-600 leading-relaxed line-clamp-2 mb-4">
          {description}
        </p>

        {/* Required Skills Badges */}
        <div className="mb-4">
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Required Skills</p>
          <div className="flex flex-wrap gap-1.5">
            {requiredSkills.map((skill, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-[#0B2A4A] border border-slate-200"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Info & Actions */}
      <div className="pt-3 border-t border-slate-100">
        <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" /> Deadline: {applicationDeadline}
          </span>
          {isAdmin && (
            <span className="font-semibold text-[#0B2A4A]">
              {totalApplications} Applications
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {isAdmin ? (
            <button
              onClick={() => onViewDetails && onViewDetails(job)}
              className="w-full btn-outline text-xs justify-center font-semibold"
            >
              Review Applications ({totalApplications})
            </button>
          ) : hasApplied ? (
            <button
              disabled
              className="w-full btn-success text-xs font-semibold justify-center cursor-default opacity-90 flex items-center gap-1.5"
            >
              <CheckCircle className="w-4 h-4" /> Application Submitted
            </button>
          ) : (
            <>
              <button
                onClick={() => onViewDetails && onViewDetails(job)}
                className="btn-outline text-xs flex-1 justify-center"
              >
                Details
              </button>
              <button
                onClick={() => onApply && onApply(job)}
                className="btn-accent text-xs flex-1 justify-center font-semibold"
              >
                Apply Now
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobCard;
