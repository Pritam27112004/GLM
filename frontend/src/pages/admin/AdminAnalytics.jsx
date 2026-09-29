import React, { useState, useEffect } from 'react';
import PageHeader from '../../components/Common/PageHeader';
import StatCard from '../../components/Common/StatCard';
import LoadingState from '../../components/Common/LoadingState';
import {
  BarChart3,
  TrendingUp,
  Award,
  Users,
  Briefcase,
  BookOpen,
  CalendarCheck,
  CheckCircle,
  Download
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
  ScatterChart,
  Scatter,
  ZAxis,
  Legend
} from 'recharts';
import api from '../../api';

export const AdminAnalytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const res = await api.getAnalytics();
        if (res && res.data) {
          setAnalytics(res.data);
        }
      } catch (err) {
        console.warn('Analytics fallback');
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
    placedTrainees: 418,
    averageAttendance: 87.4,
    courseCompletionRate: 78.6
  };

  const enrollmentTrend = analytics?.trainingEnrollmentTrend || [
    { month: 'Apr', enrollments: 180, completions: 140 },
    { month: 'May', enrollments: 220, completions: 175 },
    { month: 'Jun', enrollments: 310, completions: 240 },
    { month: 'Jul', enrollments: 410, completions: 320 },
    { month: 'Aug', enrollments: 490, completions: 385 },
    { month: 'Sep', enrollments: 560, completions: 440 }
  ];

  const outcomes = analytics?.trainingOutcomeOverview || [
    { course: 'Digital Literacy for Cooperative Personnel', category: 'Digital Literacy', enrolled: 320, completed: 278, avgScore: 82, attendance: 89, placementRate: 74 },
    { course: 'Dairy Cooperative Management', category: 'Dairy', enrolled: 250, completed: 201, avgScore: 79, attendance: 85, placementRate: 68 },
    { course: 'PACS Digital Operations', category: 'Cooperative Management', enrolled: 180, completed: 151, avgScore: 84, attendance: 91, placementRate: 82 },
    { course: 'Agricultural Entrepreneurship', category: 'Agriculture', enrolled: 210, completed: 160, avgScore: 76, attendance: 84, placementRate: 65 },
    { course: 'Financial Literacy & Cooperative Accounting', category: 'Finance', enrolled: 195, completed: 160, avgScore: 81, attendance: 88, placementRate: 71 },
    { course: 'Cooperative Society Governance', category: 'Governance', enrolled: 160, completed: 126, avgScore: 80, attendance: 86, placementRate: 69 }
  ];

  const attendanceVsOutcome = outcomes.map(o => ({
    name: o.course,
    attendance: o.attendance,
    score: o.avgScore,
    placement: o.placementRate
  }));

  const placementBySector = [
    { sector: 'Primary Agr. Credit Societies (PACS)', hires: 145 },
    { sector: 'District Central Cooperative Banks (DCCB)', hires: 98 },
    { sector: 'Dairy Cooperative Federations', hires: 82 },
    { sector: 'Farmer Producer Organizations (FPOs)', hires: 55 },
    { sector: 'State Marketing Unions', hires: 38 }
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="NCCT Cross-Cutting Analytics & Outcomes"
        subtitle="Holistic performance metrics connecting Training, Attendance Compliance, LMS Mastery, Verified Certifications, and Employment Outcomes."
        breadcrumbs={[{ label: 'Admin', link: '/admin/dashboard' }, { label: 'Analytics' }]}
        actions={
          <button
            onClick={() => window.print()}
            className="btn-outline text-xs"
          >
            <Download className="w-3.5 h-3.5" /> Export Analytical Report
          </button>
        }
      />

      {/* Top 4 Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Trainees Enrolled"
          value={kpis.activeTrainees.toLocaleString()}
          icon={Users}
          color="blue"
          trend="+18.5%"
          trendLabel="across 20 centers"
        />

        <StatCard
          title="Courses Completed"
          value="1,676"
          icon={BookOpen}
          color="green"
          trend="+14.2%"
          trendLabel="78.6% completion rate"
        />

        <StatCard
          title="Certificates Conferred"
          value={kpis.certificatesIssued}
          icon={Award}
          color="orange"
          subtitle="100% digitally signed"
        />

        <StatCard
          title="Placed in Cooperative Sector"
          value={kpis.placedTrainees || 418}
          icon={Briefcase}
          color="purple"
          trend="+28.4%"
          trendLabel="placement conversion"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Attendance vs Learning Outcome Correlation */}
        <div className="lg:col-span-7 card-institutional p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-[#0B2A4A]">
                Attendance Rate vs Learning Outcome vs Placement Rate
              </h3>
              <p className="text-xs text-slate-500">Correlation demonstrating how physical/virtual attendance drives higher examination scores and job placement</p>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={attendanceVsOutcome} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="name" stroke="#94A3B8" fontSize={9} interval={0} angle={-15} textAnchor="end" height={45} tickLine={false} />
                <YAxis domain={[50, 100]} stroke="#94A3B8" fontSize={11} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#0B2A4A', color: '#fff', borderRadius: '8px', fontSize: '11px' }} />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Bar dataKey="attendance" name="Attendance %" fill="#0B2A4A" radius={[4, 4, 0, 0]} />
                <Bar dataKey="score" name="Avg Exam Score %" fill="#19A7CE" radius={[4, 4, 0, 0]} />
                <Bar dataKey="placement" name="Placement Rate %" fill="#2E9D59" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sector-wise Hires Breakdown */}
        <div className="lg:col-span-5 card-institutional p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-base font-bold text-[#0B2A4A]">
                Hiring by Cooperative Sector
              </h3>
              <span className="text-xs font-bold text-[#2E9D59]">418 Placed</span>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              Breakdown of certified trainee absorption across rural bodies
            </p>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={placementBySector} layout="vertical" margin={{ top: 5, right: 20, left: 30, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                  <XAxis type="number" stroke="#94A3B8" fontSize={11} />
                  <YAxis dataKey="sector" type="category" stroke="#0B2A4A" fontSize={10} tickLine={false} width={100} />
                  <Tooltip contentStyle={{ backgroundColor: '#0B2A4A', color: '#fff', borderRadius: '8px', fontSize: '11px' }} />
                  <Bar dataKey="hires" name="Candidates Hired" fill="#F28C28" radius={[0, 6, 6, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 text-xs text-slate-500 flex justify-between">
            <span>Direct employer onboarding</span>
            <span className="font-bold text-[#0B2A4A]">92% Retention Rate</span>
          </div>
        </div>
      </div>

      {/* Training Outcome Overview Matrix Table */}
      <div className="card-institutional overflow-hidden">
        <div className="p-5 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-[#0B2A4A]">
              Training Outcome Overview Matrix
            </h3>
            <p className="text-xs text-slate-500">
              Comparative matrix evaluating course throughput, exam scores, attendance, and job placements
            </p>
          </div>
          <span className="text-xs font-mono font-bold bg-[#EAF5FB] text-[#1976D2] px-2.5 py-1 rounded-full border border-[#1976D2]/30">
            6 Domain Curriculums
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[10px]">
                <th className="py-3.5 px-4">Course Name</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4 text-center">Enrolled</th>
                <th className="py-3.5 px-4 text-center">Completed</th>
                <th className="py-3.5 px-4 text-center">Avg Exam Score</th>
                <th className="py-3.5 px-4 text-center">Avg Attendance</th>
                <th className="py-3.5 px-4 text-center">Placement Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {outcomes.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-[#0B2A4A]">
                    {row.course}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">
                    <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-[11px]">
                      {row.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center font-semibold text-slate-800">
                    {row.enrolled}
                  </td>
                  <td className="py-3.5 px-4 text-center font-bold text-emerald-700">
                    {row.completed}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="font-mono font-bold text-[#1976D2] bg-blue-50 px-2 py-0.5 rounded">
                      {row.avgScore}%
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="font-mono font-bold text-[#0B2A4A] bg-slate-100 px-2 py-0.5 rounded">
                      {row.attendance}%
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {row.placementRate}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
