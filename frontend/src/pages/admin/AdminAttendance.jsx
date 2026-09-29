import React, { useState, useEffect } from 'react';
import PageHeader from '../../components/Common/PageHeader';
import RaspberryPiStatusCard from '../../components/Hardware/RaspberryPiStatusCard';
import StatusBadge from '../../components/Common/StatusBadge';
import EmptyState from '../../components/Common/EmptyState';
import LoadingState from '../../components/Common/LoadingState';
import {
  CalendarCheck,
  Search,
  Filter,
  Download,
  Calendar,
  Clock,
  ShieldCheck,
  Users,
  RefreshCw
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import api from '../../api';

export const AdminAttendance = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [personTypeFilter, setPersonTypeFilter] = useState('Employee');

  const fetchAttendanceData = async () => {
    try {
      setLoading(true);
      const [attRes, analRes] = await Promise.all([
        api.getAttendance({ personType: personTypeFilter }),
        api.getAnalytics()
      ]);
      if (attRes && attRes.data) setAttendanceRecords(attRes.data);
      if (analRes && analRes.data) setAnalytics(analRes.data);
    } catch (err) {
      console.warn('Using local attendance fallback');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendanceData();
  }, [personTypeFilter]);

  // Handle triggered simulation check-in
  const handleSimulationTrigger = async () => {
    try {
      await api.simulateAttendanceCheckin({
        personId: 'EMP001',
        personName: 'Rahul Sharma',
        departmentOrBatch: 'Administration',
        personType: personTypeFilter
      });
      fetchAttendanceData();
    } catch (e) {
      fetchAttendanceData();
    }
  };

  // Filter records
  const filteredRecords = attendanceRecords.filter((record) => {
    let match = true;
    if (selectedDept !== 'All' && !record.departmentOrBatch.toLowerCase().includes(selectedDept.toLowerCase())) {
      match = false;
    }
    if (selectedStatus !== 'All' && record.status !== selectedStatus) {
      match = false;
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      match = match && (
        record.personName.toLowerCase().includes(q) ||
        record.personId.toLowerCase().includes(q) ||
        record.departmentOrBatch.toLowerCase().includes(q)
      );
    }
    return match;
  });

  const weeklyTrend = analytics?.weeklyAttendance || [
    { day: 'Mon', present: 120, absent: 5, late: 3, attendanceRate: 93.8 },
    { day: 'Tue', present: 118, absent: 6, late: 4, attendanceRate: 92.2 },
    { day: 'Wed', present: 122, absent: 4, late: 2, attendanceRate: 95.3 },
    { day: 'Thu', present: 114, absent: 8, late: 6, attendanceRate: 89.1 },
    { day: 'Fri', present: 119, absent: 5, late: 4, attendanceRate: 93.0 },
    { day: 'Sat', present: 105, absent: 15, late: 8, attendanceRate: 82.0 }
  ];

  const deptAttendance = analytics?.departmentAttendance || [
    { department: 'Administration', presentRate: 94.2 },
    { department: 'Training Faculty', presentRate: 96.5 },
    { department: 'IT & Systems', presentRate: 95.0 },
    { department: 'Finance & Accounts', presentRate: 88.0 },
    { department: 'Field Operations', presentRate: 90.5 }
  ];

  const presentVsAbsent = analytics?.presentVsAbsent || [
    { name: 'Present On Time', value: 108, color: '#2E9D59' },
    { name: 'Late Arrivals', value: 12, color: '#F28C28' },
    { name: 'Approved Leave', value: 5, color: '#19A7CE' },
    { name: 'Unexcused Absent', value: 3, color: '#E53E3E' }
  ];

  const lateArrivals = analytics?.lateArrivalsByHour || [
    { time: '09:00 - 09:15 AM', count: 18 },
    { time: '09:16 - 09:30 AM', count: 9 },
    { time: '09:31 - 09:45 AM', count: 6 },
    { time: '09:46 - 10:00 AM', count: 3 }
  ];

  const monthlyTrend = analytics?.monthlyAttendanceTrend || [
    { month: 'Apr 2026', rate: 84.2 },
    { month: 'May 2026', rate: 85.8 },
    { month: 'Jun 2026', rate: 86.4 },
    { month: 'Jul 2026', rate: 88.1 },
    { month: 'Aug 2026', rate: 87.0 },
    { month: 'Sep 2026', rate: 87.4 }
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="NCCT Attendance Management & Edge Analytics"
        subtitle="Digital attendance captured via simulated Raspberry Pi 5 camera modules and biometric nodes across training institutions."
        breadcrumbs={[{ label: 'Admin', link: '/admin/dashboard' }, { label: 'Attendance' }]}
        actions={
          <div className="flex items-center gap-2">
            <div className="bg-slate-100 p-1 rounded-lg border border-slate-200 flex text-xs">
              <button
                onClick={() => setPersonTypeFilter('Employee')}
                className={`px-3 py-1 rounded-md font-bold transition-all ${
                  personTypeFilter === 'Employee' ? 'bg-[#0B2A4A] text-white shadow-xs' : 'text-slate-600'
                }`}
              >
                Employees
              </button>
              <button
                onClick={() => setPersonTypeFilter('Trainee')}
                className={`px-3 py-1 rounded-md font-bold transition-all ${
                  personTypeFilter === 'Trainee' ? 'bg-[#1976D2] text-white shadow-xs' : 'text-slate-600'
                }`}
              >
                Trainees
              </button>
            </div>
            <button
              onClick={fetchAttendanceData}
              className="btn-outline text-xs px-3"
              title="Refresh attendance records"
            >
              <RefreshCw className="w-3.5 h-3.5 text-slate-600" />
            </button>
          </div>
        }
      />

      {/* Hardware Architecture Card */}
      <RaspberryPiStatusCard onTriggerSimulation={handleSimulationTrigger} />

      {/* Attendance Visual Analytics (5 Charts) */}
      <div className="space-y-6">
        <h3 className="text-base font-extrabold text-[#0B2A4A] tracking-tight">
          Visual Attendance Analytics
        </h3>

        {/* Top 3 Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* 1. Weekly Attendance Trend (Line) */}
          <div className="lg:col-span-4 card-institutional p-5">
            <h4 className="text-xs font-bold text-[#0B2A4A] uppercase tracking-wider mb-1">
              1. Weekly Attendance Rate (%)
            </h4>
            <p className="text-[11px] text-slate-500 mb-3">Overall attendance trend across 6 working days</p>

            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weeklyTrend} margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                  <XAxis dataKey="day" stroke="#94A3B8" fontSize={11} tickLine={false} />
                  <YAxis domain={[75, 100]} stroke="#94A3B8" fontSize={11} tickLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: '#0B2A4A', color: '#fff', borderRadius: '8px', fontSize: '11px' }} />
                  <Line type="monotone" dataKey="attendanceRate" name="Attendance %" stroke="#1976D2" strokeWidth={3} dot={{ r: 4, fill: '#19A7CE' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 2. Department-wise Attendance (Bar) */}
          <div className="lg:col-span-4 card-institutional p-5">
            <h4 className="text-xs font-bold text-[#0B2A4A] uppercase tracking-wider mb-1">
              2. Department-wise Attendance
            </h4>
            <p className="text-[11px] text-slate-500 mb-3">Average presence rate by department division</p>

            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={deptAttendance} margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                  <XAxis dataKey="department" stroke="#94A3B8" fontSize={9} tickLine={false} interval={0} angle={-15} textAnchor="end" height={35} />
                  <YAxis domain={[70, 100]} stroke="#94A3B8" fontSize={11} tickLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: '#0B2A4A', color: '#fff', borderRadius: '8px', fontSize: '11px' }} />
                  <Bar dataKey="presentRate" name="Present %" fill="#2E9D59" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 3. Present vs Absent (Donut) */}
          <div className="lg:col-span-4 card-institutional p-5">
            <h4 className="text-xs font-bold text-[#0B2A4A] uppercase tracking-wider mb-1">
              3. Present vs Absent Ratio
            </h4>
            <p className="text-[11px] text-slate-500 mb-3">Breakdown of today's attendance states</p>

            <div className="h-48 w-full flex items-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={presentVsAbsent}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={65}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {presentVsAbsent.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#0B2A4A', color: '#fff', borderRadius: '8px', fontSize: '11px' }} />
                  <Legend iconSize={8} wrapperStyle={{ fontSize: '10px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Bottom 2 Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* 4. Late Arrivals Breakdown (Bar) */}
          <div className="lg:col-span-6 card-institutional p-5">
            <h4 className="text-xs font-bold text-[#0B2A4A] uppercase tracking-wider mb-1">
              4. Late Arrivals by Time Slot
            </h4>
            <p className="text-[11px] text-slate-500 mb-3">Time distribution of morning clock-ins past 09:00 AM</p>

            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={lateArrivals} margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                  <XAxis dataKey="time" stroke="#94A3B8" fontSize={10} tickLine={false} />
                  <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: '#0B2A4A', color: '#fff', borderRadius: '8px', fontSize: '11px' }} />
                  <Bar dataKey="count" name="Late Staff Count" fill="#F28C28" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 5. Monthly Attendance (Area) */}
          <div className="lg:col-span-6 card-institutional p-5">
            <h4 className="text-xs font-bold text-[#0B2A4A] uppercase tracking-wider mb-1">
              5. 6-Month Cumulative Attendance Trend
            </h4>
            <p className="text-[11px] text-slate-500 mb-3">Overall institutional compliance percentage over time</p>

            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyTrend} margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorMonth" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0B2A4A" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#0B2A4A" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                  <XAxis dataKey="month" stroke="#94A3B8" fontSize={10} tickLine={false} />
                  <YAxis domain={[75, 95]} stroke="#94A3B8" fontSize={11} tickLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: '#0B2A4A', color: '#fff', borderRadius: '8px', fontSize: '11px' }} />
                  <Area type="monotone" dataKey="rate" name="Monthly Avg %" stroke="#0B2A4A" strokeWidth={2.5} fillOpacity={1} fill="url(#colorMonth)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Attendance Records Table */}
      <div className="card-institutional overflow-hidden">
        <div className="p-5 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-[#0B2A4A]">
              Daily Attendance Records ({filteredRecords.length})
            </h3>
            <p className="text-xs text-slate-500">
              Live records logged by edge recognition nodes and automated morning registers
            </p>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-wrap items-center gap-2.5 text-xs">
            {/* Search Input */}
            <div className="relative min-w-[200px]">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search name or ID..."
                className="w-full pl-8 pr-3 py-1.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#19A7CE] focus:outline-none"
              />
            </div>

            {/* Department Filter */}
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="px-3 py-1.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#19A7CE] focus:outline-none bg-white text-slate-700"
            >
              <option value="All">All Departments</option>
              <option value="Administration">Administration</option>
              <option value="Training">Training</option>
              <option value="Finance">Finance</option>
              <option value="IT">IT & Systems</option>
              <option value="Field">Field Operations</option>
            </select>

            {/* Status Filter */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-1.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#19A7CE] focus:outline-none bg-white text-slate-700"
            >
              <option value="All">All Statuses</option>
              <option value="Present">Present</option>
              <option value="Late">Late</option>
              <option value="Absent">Absent</option>
              <option value="On Leave">On Leave</option>
            </select>
          </div>
        </div>

        {/* Table */}
        {loading ? (
          <div className="p-6">
            <LoadingState count={4} type="table" />
          </div>
        ) : filteredRecords.length === 0 ? (
          <EmptyState
            title="No attendance records match your filter"
            description="Try changing the department or status filter criteria."
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[10px]">
                  <th className="py-3 px-4">Employee / Trainee ID</th>
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4">Department / Batch</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Check In</th>
                  <th className="py-3 px-4">Check Out</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Source & Confidence</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredRecords.map((rec) => (
                  <tr key={rec.attendanceId} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-[#0B2A4A]">
                      {rec.personId}
                    </td>
                    <td className="py-3 px-4 font-semibold text-slate-800">
                      {rec.personName}
                    </td>
                    <td className="py-3 px-4 text-slate-600">
                      {rec.departmentOrBatch}
                    </td>
                    <td className="py-3 px-4 text-slate-600 whitespace-nowrap">
                      {rec.date}
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-700">
                      {rec.checkIn}
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-700">
                      {rec.checkOut}
                    </td>
                    <td className="py-3 px-4">
                      <StatusBadge status={rec.status} size="xs" />
                    </td>
                    <td className="py-3 px-4 text-[11px] text-slate-500">
                      <div className="flex items-center gap-1">
                        <span className="truncate max-w-[140px]" title={rec.capturedVia}>
                          {rec.capturedVia}
                        </span>
                        {rec.confidenceScore > 0 && (
                          <span className="font-mono text-emerald-700 font-bold text-[10px] bg-emerald-50 px-1 rounded border border-emerald-200">
                            {rec.confidenceScore}%
                          </span>
                        )}
                      </div>
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

export default AdminAttendance;
