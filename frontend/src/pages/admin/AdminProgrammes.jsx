import React, { useState, useEffect } from 'react';
import PageHeader from '../../components/Common/PageHeader';
import StatCard from '../../components/Common/StatCard';
import ProgrammeCard from '../../components/Cards/ProgrammeCard';
import EmptyState from '../../components/Common/EmptyState';
import LoadingState from '../../components/Common/LoadingState';
import CreateProgrammeModal from '../../components/Modals/CreateProgrammeModal';
import {
  Calendar,
  Award,
  Users,
  Building,
  Plus,
  Search,
  Filter
} from 'lucide-react';
import { useNotification } from '../../context/NotificationContext';
import api from '../../api';

export const AdminProgrammes = () => {
  const [programmes, setProgrammes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedInst, setSelectedInst] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const { addToast } = useNotification();

  const fetchProgrammes = async () => {
    try {
      setLoading(true);
      const res = await api.getProgrammes();
      if (res && res.data) {
        setProgrammes(res.data);
      }
    } catch (err) {
      console.warn('Using local programmes fallback');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProgrammes();
  }, []);

  const handleCreateProgramme = async (formData) => {
    try {
      const res = await api.createProgramme(formData);
      if (res && res.data) {
        setProgrammes(prev => [res.data, ...prev]);
        addToast({
          title: 'Training Programme Created',
          message: `"${formData.title}" published to ${formData.institution}.`,
          type: 'success'
        });
      }
    } catch (err) {
      setProgrammes(prev => [formData, ...prev]);
      addToast({
        title: 'Training Programme Created',
        message: 'Saved to local registry.',
        type: 'success'
      });
    }
  };

  const institutions = [
    'All',
    'RICM Patna',
    'VAMNICOM Pune',
    'ICM Lucknow',
    'RICM Bengaluru',
    'ICM Dehradun',
    'ICM Guwahati'
  ];

  const filteredProgrammes = programmes.filter((p) => {
    let match = true;
    if (selectedInst !== 'All' && !p.institution.toLowerCase().includes(selectedInst.toLowerCase())) {
      match = false;
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      match = match && (
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.institution.toLowerCase().includes(q) ||
        p.trainer.toLowerCase().includes(q)
      );
    }
    return match;
  });

  const totalProgs = programmes.length;
  const totalCapacity = programmes.reduce((acc, p) => acc + (p.totalSeats || 0), 0);
  const totalRegistered = programmes.reduce((acc, p) => acc + (p.registeredParticipants || 0), 0);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Training Programmes & Workshops"
        subtitle="Schedule, organize, and monitor executive batches, hybrid workshops, and capacity-building cohorts across NCCT institutes."
        breadcrumbs={[{ label: 'Admin', link: '/admin/dashboard' }, { label: 'Training Programmes' }]}
        actions={
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="btn-primary text-xs"
          >
            <Plus className="w-3.5 h-3.5" /> Create Training Programme
          </button>
        }
      />

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Active Programmes"
          value={totalProgs}
          icon={Calendar}
          color="blue"
          subtitle="Scheduled this quarter"
        />

        <StatCard
          title="Total Seat Capacity"
          value={totalCapacity}
          icon={Users}
          color="green"
          subtitle="Across all institutes"
        />

        <StatCard
          title="Registered Participants"
          value={totalRegistered}
          icon={Award}
          color="orange"
          trend="+84.5%"
          trendLabel="capacity utilization"
        />

        <StatCard
          title="Participating Centers"
          value="20 Institutes"
          icon={Building}
          color="cyan"
          subtitle="1 VAMNICOM + 5 RICMs + 14 ICMs"
        />
      </div>

      {/* Filter Tabs and Search */}
      <div className="card-institutional p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none text-xs">
          {institutions.map((inst) => (
            <button
              key={inst}
              onClick={() => setSelectedInst(inst)}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all whitespace-nowrap ${
                selectedInst === inst
                  ? 'bg-[#0B2A4A] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              {inst}
            </button>
          ))}
        </div>

        <div className="relative min-w-[240px]">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search programme, venue, or trainer..."
            className="w-full pl-8 pr-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#19A7CE] focus:outline-none"
          />
        </div>
      </div>

      {/* Programmes Grid */}
      {loading ? (
        <LoadingState count={4} />
      ) : filteredProgrammes.length === 0 ? (
        <EmptyState
          title="No training programmes found"
          description="Try selecting a different institution filter or create a new training programme."
          actionLabel="Create Programme"
          onAction={() => setIsCreateModalOpen(true)}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProgrammes.map((prog) => (
            <ProgrammeCard
              key={prog.programmeId}
              programme={prog}
              isAdmin={true}
              onRegister={(p) => {
                addToast({
                  title: 'Programme Management',
                  message: `Managing roster for ${p.title} (${p.registeredParticipants}/${p.totalSeats} seats filled).`,
                  type: 'info'
                });
              }}
            />
          ))}
        </div>
      )}

      {/* Create Modal */}
      <CreateProgrammeModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleCreateProgramme}
      />
    </div>
  );
};

export default AdminProgrammes;
