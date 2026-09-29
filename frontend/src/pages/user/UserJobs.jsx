import React, { useState, useEffect } from 'react';
import PageHeader from '../../components/Common/PageHeader';
import JobCard from '../../components/Cards/JobCard';
import ApplyJobModal from '../../components/Modals/ApplyJobModal';
import Modal from '../../components/Common/Modal';
import EmptyState from '../../components/Common/EmptyState';
import LoadingState from '../../components/Common/LoadingState';
import { Briefcase, Building2, Search, Filter, ShieldCheck, CheckCircle2 } from 'lucide-react';
import api from '../../api';

export const UserJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [appliedJobIds, setAppliedJobIds] = useState(['j1']);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [activeJobForApply, setActiveJobForApply] = useState(null);
  const [activeJobForDetails, setActiveJobForDetails] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const res = await api.getJobs();
        if (res && res.data) {
          setJobs(res.data);
        }
      } catch (e) {
        console.warn('Jobs fallback');
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const handleApplicationSuccess = (job) => {
    setAppliedJobIds(prev => [...prev, job.jobId]);
  };

  const types = ['All', 'Full Time', 'Contractual', 'Apprenticeship'];

  const filteredJobs = jobs.filter((j) => {
    let match = true;
    if (selectedType !== 'All' && j.employmentType !== selectedType) match = false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      match = match && (
        j.title.toLowerCase().includes(q) ||
        j.organization.toLowerCase().includes(q) ||
        j.location.toLowerCase().includes(q) ||
        j.requiredSkills.some(s => s.toLowerCase().includes(q))
      );
    }
    return match;
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Cooperative Sector Job Opportunities"
        subtitle="Vacancies published by State Cooperative Federations, District Central Cooperative Banks, and PACS seeking accredited NCCT trainees."
        breadcrumbs={[{ label: 'Trainee', link: '/user/dashboard' }, { label: 'Jobs' }]}
      />

      {/* Verified Candidate Endorsement Banner */}
      <div className="bg-[#EAF5FB] border border-[#1976D2]/30 p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#0B2A4A]">
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="w-5 h-5 text-[#1976D2] flex-shrink-0" />
          <span>
            Your <strong>2 Verified NCCT Certifications</strong> and <strong>91.0% Attendance Rating</strong> will automatically be attached to every application to elevate your candidate priority.
          </span>
        </div>
        <span className="font-bold text-[#2E9D59] whitespace-nowrap bg-white px-2.5 py-1 rounded-lg border border-[#2E9D59]/30">
          Priority Candidate Active
        </span>
      </div>

      {/* Filter Tabs & Search */}
      <div className="card-institutional p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none text-xs">
          {types.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all whitespace-nowrap ${
                selectedType === type
                  ? 'bg-[#0B2A4A] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        <div className="relative min-w-[240px]">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by role or required skills..."
            className="w-full pl-8 pr-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#19A7CE] focus:outline-none"
          />
        </div>
      </div>

      {/* Jobs Grid */}
      {loading ? (
        <LoadingState count={4} />
      ) : filteredJobs.length === 0 ? (
        <EmptyState
          title="No job openings found"
          description="Try modifying your search or check back soon as new cooperative vacancies are added weekly."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <JobCard
              key={job.jobId}
              job={job}
              hasApplied={appliedJobIds.includes(job.jobId)}
              onApply={(j) => setActiveJobForApply(j)}
              onViewDetails={(j) => setActiveJobForDetails(j)}
              isAdmin={false}
            />
          ))}
        </div>
      )}

      {/* Apply Modal */}
      <ApplyJobModal
        isOpen={!!activeJobForApply}
        onClose={() => setActiveJobForApply(null)}
        job={activeJobForApply}
        onSubmitted={handleApplicationSuccess}
      />

      {/* Details Modal */}
      <Modal
        isOpen={!!activeJobForDetails}
        onClose={() => setActiveJobForDetails(null)}
        title={activeJobForDetails?.title || 'Job Opportunity'}
        subtitle={`Organization: ${activeJobForDetails?.organization} • Location: ${activeJobForDetails?.location}`}
      >
        {activeJobForDetails && (
          <div className="space-y-4 text-xs">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Employment Type:</span>
                <strong className="text-[#0B2A4A]">{activeJobForDetails.employmentType}</strong>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Monthly Compensation:</span>
                <strong className="text-[#2E9D59]">{activeJobForDetails.salaryRange}</strong>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Application Deadline:</span>
                <strong className="text-amber-600">{activeJobForDetails.applicationDeadline}</strong>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-slate-800 mb-1">Job Description & Responsibilities:</h4>
              <p className="text-slate-600 leading-relaxed">{activeJobForDetails.description}</p>
            </div>

            <div>
              <h4 className="font-bold text-slate-800 mb-1.5">Required Skills:</h4>
              <div className="flex flex-wrap gap-1.5">
                {activeJobForDetails.requiredSkills?.map((s, i) => (
                  <span key={i} className="px-2 py-0.5 rounded bg-blue-50 text-[#0B2A4A] border border-blue-200 font-medium">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
              <button onClick={() => setActiveJobForDetails(null)} className="btn-outline">
                Close
              </button>
              <button
                onClick={() => {
                  const target = activeJobForDetails;
                  setActiveJobForDetails(null);
                  setActiveJobForApply(target);
                }}
                className="btn-accent px-6 font-bold"
              >
                Apply Now
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default UserJobs;
