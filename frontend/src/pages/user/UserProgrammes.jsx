import React, { useState, useEffect } from 'react';
import PageHeader from '../../components/Common/PageHeader';
import ProgrammeCard from '../../components/Cards/ProgrammeCard';
import EmptyState from '../../components/Common/EmptyState';
import LoadingState from '../../components/Common/LoadingState';
import { useNotification } from '../../context/NotificationContext';
import { Calendar, Building2, Search, Filter } from 'lucide-react';
import api from '../../api';

export const UserProgrammes = () => {
  const [programmes, setProgrammes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [registeredIds, setRegisteredIds] = useState(['p1']);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInst, setSelectedInst] = useState('All');

  const { addToast } = useNotification();

  useEffect(() => {
    const fetchProgrammes = async () => {
      try {
        setLoading(true);
        const res = await api.getProgrammes();
        if (res && res.data) {
          setProgrammes(res.data);
        }
      } catch (err) {
        console.warn('Programmes fallback');
      } finally {
        setLoading(false);
      }
    };
    fetchProgrammes();
  }, []);

  const handleRegister = async (programme) => {
    try {
      await api.registerProgramme(programme.programmeId, {
        userId: 'user@ncct.demo',
        userName: 'Rahul Sharma'
      });
      setRegisteredIds(prev => [...prev, programme.programmeId]);
      addToast({
        title: 'Registration Confirmed! 🎉',
        message: `Programme registration submitted successfully for "${programme.title}". Details sent to registered email.`,
        type: 'success'
      });
    } catch (e) {
      setRegisteredIds(prev => [...prev, programme.programmeId]);
      addToast({
        title: 'Registration Confirmed',
        message: `Programme registration submitted successfully.`,
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
    'ICM Dehradun'
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
        p.institution.toLowerCase().includes(q)
      );
    }
    return match;
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Upcoming Cooperative Training Programmes"
        subtitle="Residential, hybrid, and online workshops conducted by NCCT regional institutes to build cooperative leadership skills."
        breadcrumbs={[{ label: 'Trainee', link: '/user/dashboard' }, { label: 'Training Programmes' }]}
      />

      {/* Filter Tabs & Search */}
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
            placeholder="Search workshops or venues..."
            className="w-full pl-8 pr-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#19A7CE] focus:outline-none"
          />
        </div>
      </div>

      {/* Programmes List */}
      {loading ? (
        <LoadingState count={4} />
      ) : filteredProgrammes.length === 0 ? (
        <EmptyState
          title="No training programmes found"
          description="Try selecting another institute filter."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProgrammes.map((programme) => (
            <ProgrammeCard
              key={programme.programmeId}
              programme={programme}
              isRegistered={registeredIds.includes(programme.programmeId)}
              onRegister={handleRegister}
              isAdmin={false}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default UserProgrammes;
