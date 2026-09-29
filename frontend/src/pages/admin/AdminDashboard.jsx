import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../../components/Common/PageHeader';
import StatCard from '../../components/Common/StatCard';
import StatusBadge from '../../components/Common/StatusBadge';
import {
  Users,
  GraduationCap,
  Calendar,
  Award,
  CalendarCheck,
  CheckCircle2,
  TrendingUp,
  ArrowRight,
  Briefcase,
  PlusCircle,
  Cpu,
  BookOpen
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import api from '../../api';

export const AdminDashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await api.getAnalytics();
        if (res && res.data) {
          setAnalytics(res.data);
        }
      } catch (err) {
        console.warn('Using local analytics fallback');
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  const kpis = analytics?.kpis || {
    totalEmployees: 128,
    activeTrainees: 1248,
    activeProgrammes: 24,
    certificatesIssued: 892,
    averageAttendance: 87.4,
    courseCompletionRate: 78.6
  };

  const weeklyData = analytics?.weeklyAttendance || [
    { day: 'Mon', present: 120, absent: 5, late: 3 },
    { day: 'Tue', present: 118, absent: 6, late: 4 },
    { day: 'Wed', present: 122, absent: 4, late: 2 },
    { day: 'Thu', present: 114, absent: 8, late: 6 },
    { day: 'Fri', present: 119, absent: 5, late: 4 },
    { day: 'Sat', present: 105, absent: 15, late: 8 }
  ];

  const enrollmentTrend = analytics?.trainingEnrollmentTrend || [
    { month: 'Apr', enrollments: 180, completions: 140 },
    { month: 'May', enrollments: 220, completions: 175 },
    { month: 'Jun', enrollments: 310, completions: 240 },
    { month: 'Jul', enrollments: 410, completions: 320 },
    { month: 'Aug', enrollments: 490, completions: 385 },
    { month: 'Sep', enrollments: 560, completions: 440 }
  ];

  const regionalData = analytics?.programmeWiseEnrollment || [
    { name: 'VAMNICOM Pune', count: 380 },
    { name: 'RICM Patna', count: 290 },
    { name: 'RICM Bengaluru', count: 240 },
    { name: 'ICM Lucknow', count: 210 },
    { name: 'ICM Dehradun', count: 180 },
    { name: 'ICM Guwahati', count: 160 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <PageHeader
        title="NCCT Executive Administration Dashboard"
        subtitle="Centralized intelligence overview across cooperative training institutes, digital attendance, LMS certifications, and rural placements."
        badge="Live Prototype"
        actions={
          <div className="flex items-center gap-2">
            <Link to="/admin/attendance" className="btn-outline text-xs">
              <Cpu className="w-3.5 h-3.5 text-[#19A7CE]" /> RPi 5 Node Live
            </Link>
            <Link to="/admin/courses" className="btn-primary text-xs">
              <PlusCircle className="w-3.5 h-3.5" /> Manage LMS Courses
            </Link>
          </div>
        }
      />

      {/* Continuous Value Pipeline Banner */}
      <div className="bg-gradient-to-r from-[#0B2A4A] via-[#143C66] to-[#0B2A4A] text-white p-5 rounded-2xl border border-white/10 shadow-card">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400 block mb-1">
              NCCT Integrated Training Lifecycle
            </span>
            <h3 className="text-base font-extrabold text-white">
              End-to-End Governance & Value Pipeline
            </h3>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 text-xs font-semibold">
            <span className="px-3 py-1 rounded-lg bg-white/10 border border-white/20 text-cyan-300">
              1. Training
            </span>
            <span className="text-slate-400">→</span>
            <span className="px-3 py-1 rounded-lg bg-white/10 border border-white/20 text-emerald-300">
              2. Attendance
            </span>
            <span className="text-slate-400">→</span>
            <span className="px-3 py-1 rounded-lg bg-white/10 border border-white/20 text-amber-300">
              3. Learning
            </span>
            <span className="text-slate-400">→</span>
            <span className="px-3 py-1 rounded-lg bg-white/10 border border-white/20 text-purple-300">
              4. Certification
            </span>
            <span className="text-slate-400">→</span>
            <span className="px-3 py-1 rounded-lg bg-amber-500 text-[#0B2A4A] font-extrabold">
              5. Employment
            </span>
          </div>
        </div>
      </div>

      {/* 6 Top KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard
          title="Total Employees"
          value={kpis.totalEmployees}
          icon={Users}
          color="blue"
          trend="+4.2%"
          trendLabel="vs last quarter"
        />

        <StatCard
          title="Active Trainees"
          value={kpis.activeTrainees.toLocaleString()}
          icon={GraduationCap}
          color="cyan"
          trend="+18.5%"
          trendLabel="across 20 institutes"
        />

        <StatCard
          title="Active Programmes"
          value={kpis.activeProgrammes}
          icon={Calendar}
          color="orange"
          subtitle="Across RICMs & ICMs"
        />

        <StatCard
          title="Certificates Issued"
          value={kpis.certificatesIssued}
          icon={Award}
          color="green"
          trend="+22.8%"
          trendLabel="100% verified"
        />

        <StatCard
          title="Average Attendance"
          value={`${kpis.averageAttendance}%`}
          icon={CalendarCheck}
          color="navy"
          badge="Edge Synced"
        />

        <StatCard
          title="Completion Rate"
          value={`${kpis.courseCompletionRate}%`}
          icon={CheckCircle2}
          color="purple"
          trend="+5.3%"
          trendLabel="LMS average"
        />
      </div>

      {/* Analytical Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Enrollment vs Completion Trend */}
        <div className="lg:col-span-8 card-institutional p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-[#0B2A4A]">
                Training Enrollment vs Course Completion Trend
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Monthly trajectory of registered trainees vs verified qualifying completions
              </p>
            </div>
            <span className="text-xs font-semibold text-[#1976D2] bg-[#EAF5FB] px-2.5 py-1 rounded-full border border-[#1976D2]/20">
              FY 2026-27
            </span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={enrollmentTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorEnroll" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1976D2" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#1976D2" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorComplete" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2E9D59" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#2E9D59" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="month" stroke="#94A3B8" fontSize={12} tickLine={false} />
                <YAxis stroke="#94A3B8" fontSize={12} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0B2A4A', borderColor: '#19A7CE', color: '#fff', borderRadius: '8px', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="enrollments" name="Total Enrollments" stroke="#1976D2" strokeWidth={3} fillOpacity={1} fill="url(#colorEnroll)" />
                <Area type="monotone" dataKey="completions" name="Completed & Certified" stroke="#2E9D59" strokeWidth={3} fillOpacity={1} fill="url(#colorComplete)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right: Weekly Attendance Summary */}
        <div className="lg:col-span-4 card-institutional p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-base font-bold text-[#0B2A4A]">
                Weekly Attendance Log
              </h3>
              <span className="text-xs font-bold text-[#2E9D59]">87.4% Avg</span>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              Daily check-ins captured across all regional institutes
            </p>

            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData} margin={{ top: 10, right: 0, left: -25, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                  <XAxis dataKey="day" stroke="#94A3B8" fontSize={11} tickLine={false} />
                  <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0B2A4A', borderColor: '#19A7CE', color: '#fff', borderRadius: '8px', fontSize: '12px' }}
                  />
                  <Bar dataKey="present" name="Present" fill="#1976D2" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="late" name="Late Arrivals" fill="#F28C28" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="absent" name="Absent" fill="#E53E3E" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              RPi 5 Camera Feed Active
            </span>
            <Link to="/admin/attendance" className="text-[#1976D2] font-semibold hover:underline flex items-center gap-1">
              View Log <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Regional Institutional Distribution & Quick Shortcuts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Regional Bar Distribution */}
        <div className="lg:col-span-7 card-institutional p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-[#0B2A4A]">
                Trainee Distribution by Regional Institute
              </h3>
              <p className="text-xs text-slate-500">Active enrollments across key cooperative management centers</p>
            </div>
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={regionalData} layout="vertical" margin={{ top: 5, right: 20, left: 40, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis type="number" stroke="#94A3B8" fontSize={11} />
                <YAxis dataKey="name" type="category" stroke="#0B2A4A" fontSize={11} tickLine={false} width={110} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0B2A4A', borderColor: '#19A7CE', color: '#fff', borderRadius: '8px', fontSize: '12px' }}
                />
                <Bar dataKey="count" name="Enrolled Trainees" fill="#0B2A4A" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Action Hub */}
        <div className="lg:col-span-5 card-institutional p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-[#0B2A4A] mb-1">
              Administrative Quick Actions
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Rapid operations across core NCCT modules
            </p>

            <div className="grid grid-cols-2 gap-3">
              <Link
                to="/admin/programmes"
                className="p-3.5 rounded-xl bg-slate-50 hover:bg-[#EAF5FB] border border-slate-200 transition-all text-left group"
              >
                <Calendar className="w-5 h-5 text-[#1976D2] mb-1.5 group-hover:scale-110 transition-transform" />
                <h4 className="text-xs font-bold text-[#0B2A4A]">New Programme</h4>
                <p className="text-[10px] text-slate-500 mt-0.5">Publish batch schedule</p>
              </Link>

              <Link
                to="/admin/courses"
                className="p-3.5 rounded-xl bg-slate-50 hover:bg-[#EAF5FB] border border-slate-200 transition-all text-left group"
              >
                <BookOpen className="w-5 h-5 text-[#2E9D59] mb-1.5 group-hover:scale-110 transition-transform" />
                <h4 className="text-xs font-bold text-[#0B2A4A]">Add LMS Course</h4>
                <p className="text-[10px] text-slate-500 mt-0.5">Upload modules & lessons</p>
              </Link>

              <Link
                to="/admin/jobs"
                className="p-3.5 rounded-xl bg-slate-50 hover:bg-[#EAF5FB] border border-slate-200 transition-all text-left group"
              >
                <Briefcase className="w-5 h-5 text-[#F28C28] mb-1.5 group-hover:scale-110 transition-transform" />
                <h4 className="text-xs font-bold text-[#0B2A4A]">Post Job Opening</h4>
                <p className="text-[10px] text-slate-500 mt-0.5">For cooperative federations</p>
              </Link>

              <Link
                to="/admin/certificates"
                className="p-3.5 rounded-xl bg-slate-50 hover:bg-[#EAF5FB] border border-slate-200 transition-all text-left group"
              >
                <Award className="w-5 h-5 text-purple-600 mb-1.5 group-hover:scale-110 transition-transform" />
                <h4 className="text-xs font-bold text-[#0B2A4A]">Verify Credentials</h4>
                <p className="text-[10px] text-slate-500 mt-0.5">Digital registry audit</p>
              </Link>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">Need comprehensive data?</span>
            <Link to="/admin/analytics" className="font-bold text-[#1976D2] hover:underline flex items-center gap-1">
              Go to Analytics <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
