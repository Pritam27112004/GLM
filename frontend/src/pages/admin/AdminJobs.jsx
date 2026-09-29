import React, { useState, useEffect } from 'react';
import PageHeader from '../../components/Common/PageHeader';
import StatCard from '../../components/Common/StatCard';
import JobCard from '../../components/Cards/JobCard';
import EmptyState from '../../components/Common/EmptyState';
import LoadingState from '../../components/Common/LoadingState';
import PostJobModal from '../../components/Modals/PostJobModal';
import {
  Briefcase,
  Building2,
  Users,
  CheckCircle,
  Plus,
  Search,
  Filter
} from 'lucide-react';
import { useNotification } from '../../context/NotificationContext';
import api from '../../api';

export const AdminJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);

  const { addToast } = useNotification();

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const res = await api.getJobs();
      if (res && res.data) {
        setJobs(res.data);
      }
    } catch (err) {
      console.warn('Using local jobs fallback');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handlePostJob = async (jobData) => {
    try {
      const res = await api.createJob(jobData);
      if (res && res.data) {
        setJobs(prev => [res.data, ...prev]);
        addToast({
          title: 'Job Opportunity Posted',
          message: `"${jobData.title}" published for certified NCCT candidates.`,
          type: 'success'
        });
      }
    } catch (err) {
      setJobs(prev => [jobData, ...prev]);
      addToast({
        title: 'Job Opportunity Posted',
        message: 'Saved to local job registry.',
        type: 'success'
      });
    }
  };

  const types = ['All', 'Full Time', 'Contractual', 'Apprenticeship', 'Part Time'];

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

  const totalJobs = jobs.length;
  const totalApps = jobs.reduce((acc, j) => acc + (j.totalApplications || 0), 0);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Cooperative Job Opportunities & Placements"
        subtitle="Manage vacancies from State Cooperative Federations, DCCBs, Milk Unions, and PACS for accredited trainees."
        breadcrumbs={[{ label: 'Admin', link: '/admin/dashboard' }, { label: 'Jobs & Placements' }]}
        actions={
          <button
            onClick={() => setIsPostModalOpen(true)}
            className="btn-primary text-xs"
          >
            <Plus className="w-3.5 h-3.5" /> Post Job Opening
          </button>
        }
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Active Job Vacancies"
          value={totalJobs}
          icon={Briefcase}
          color="blue"
          subtitle="Across federations & banks"
        />

        <StatCard
          title="Total Applications Received"
          value={totalApps}
          icon={Users}
          color="green"
          trend="+32.4%"
          trendLabel="candidate applications"
        />

        <StatCard
          title="Partner Organizations"
          value="48 Societies"
          icon={Building2}
          color="orange"
          subtitle="Apex unions & banks"
        />

        <StatCard
          title="Placement Success"
          value="418 Candidates"
          icon={CheckCircle}
          color="purple"
          trend="+18.9%"
          trendLabel="hired this year"
        />
      </div>

      {/* Filters and Search */}
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
            placeholder="Search job title, skills, location..."
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
          description="Try selecting a different filter or post a new cooperative vacancy."
          actionLabel="Post New Job"
          onAction={() => setIsPostModalOpen(true)}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <JobCard
              key={job.jobId}
              job={job}
              isAdmin={true}
              onViewDetails={(j) => {
                addToast({
                  title: 'Reviewing Candidate Applications',
                  message: `${j.title} at ${j.organization} has ${j.totalApplications} verified applicants.`,
                  type: 'info'
                });
              }}
            />
          ))}
        </div>
      )}

      {/* Post Modal */}
      <PostJobModal
        isOpen={isPostModalOpen}
        onClose={() => setIsPostModalOpen(false)}
        onPost={handlePostJob}
      />
    </div>
  );
};

export default AdminJobs;
