import React, { useState, useEffect } from 'react';
import PageHeader from '../../components/Common/PageHeader';
import StatCard from '../../components/Common/StatCard';
import StatusBadge from '../../components/Common/StatusBadge';
import EmptyState from '../../components/Common/EmptyState';
import LoadingState from '../../components/Common/LoadingState';
import {
  CalendarCheck,
  CheckCircle2,
  Clock,
  AlertCircle,
  Calendar,
  Cpu,
  ShieldCheck,
  Radio
} from 'lucide-react';
import api from '../../api';

export const UserAttendance = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserAttendance = async () => {
      try {
        setLoading(true);
        const res = await api.getAttendance({ personId: 'user@ncct.demo' });
        if (res && res.data) {
          setAttendanceRecords(res.data);
        }
      } catch (err) {
        console.warn('Attendance fallback');
      } finally {
        setLoading(false);
      }
    };
    fetchUserAttendance();
  }, []);

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Attendance & Biometric History"
        subtitle="Daily attendance logs recorded at RICM Patna training halls via simulated edge recognition nodes."
        breadcrumbs={[{ label: 'Trainee', link: '/user/dashboard' }, { label: 'Attendance' }]}
      />

      {/* Hardware Source Status Card */}
      <div className="bg-gradient-to-r from-[#0B2A4A] via-[#143C66] to-[#0B2A4A] text-white p-5 rounded-2xl border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-subtle">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300 flex-shrink-0">
            <Cpu className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-white">
                Attendance Source: Simulation Active
              </h3>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-950 text-cyan-300 border border-cyan-500/40">
                EDGE NODE SIMULATOR
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Future Integration: Raspberry Pi 5 + Camera automated face & QR recognition at academic block gates.
            </p>
          </div>
        </div>

        <div className="text-xs font-mono text-emerald-400 bg-black/30 px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-1.5">
          <Radio className="w-3.5 h-3.5 animate-pulse" />
          <span>Node: RICM Patna Hall A</span>
        </div>
      </div>

      {/* 5 KPI Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard
          title="Overall Attendance"
          value="91%"
          icon={CalendarCheck}
          color="blue"
          badge="Distinction"
        />

        <StatCard
          title="Present Days"
          value="22"
          icon={CheckCircle2}
          color="green"
          subtitle="On-time mornings"
        />

        <StatCard
          title="Late Arrivals"
          value="3"
          icon={Clock}
          color="orange"
          subtitle="Between 09:15-09:40"
        />

        <StatCard
          title="Excused Leave"
          value="1"
          icon={Calendar}
          color="cyan"
          subtitle="Approved leave"
        />

        <StatCard
          title="Absent Days"
          value="2"
          icon={AlertCircle}
          color="purple"
          subtitle="Unexcused"
        />
      </div>

      {/* Detailed Attendance Records Table */}
      <div className="card-institutional overflow-hidden">
        <div className="p-5 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-[#0B2A4A]">
              Daily Check-in / Check-out History
            </h3>
            <p className="text-xs text-slate-500">
              Biometric confidence timestamps and device locations
            </p>
          </div>
          <span className="text-xs font-semibold text-[#1976D2] bg-[#EAF5FB] px-3 py-1 rounded-full border border-[#1976D2]/20">
            Current Cohort: Digital Literacy Batch 4
          </span>
        </div>

        {loading ? (
          <div className="p-6">
            <LoadingState count={4} type="table" />
          </div>
        ) : attendanceRecords.length === 0 ? (
          <EmptyState
            title="No attendance records found"
            description="Your check-in history will appear here once the edge node captures your attendance."
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[10px]">
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Batch / Department</th>
                  <th className="py-3 px-4">Check In</th>
                  <th className="py-3 px-4">Check Out</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Hardware Capture Node</th>
                  <th className="py-3 px-4">Confidence</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {attendanceRecords.map((rec) => (
                  <tr key={rec.attendanceId} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-[#0B2A4A] whitespace-nowrap">
                      {rec.date}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">
                      {rec.departmentOrBatch}
                    </td>
                    <td className="py-3.5 px-4 font-mono font-semibold text-slate-800">
                      {rec.checkIn}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-600">
                      {rec.checkOut}
                    </td>
                    <td className="py-3.5 px-4">
                      <StatusBadge status={rec.status} size="xs" />
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 truncate max-w-[200px]">
                      {rec.capturedVia}
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-emerald-700">
                      {rec.confidenceScore > 0 ? `${rec.confidenceScore}%` : '--'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserAttendance;
