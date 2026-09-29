import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import PageHeader from '../../components/Common/PageHeader';
import StatCard from '../../components/Common/StatCard';
import StatusBadge from '../../components/Common/StatusBadge';
import ProgressBar from '../../components/Common/ProgressBar';
import LoadingState from '../../components/Common/LoadingState';
import {
  BookOpen,
  Clock,
  User,
  Users,
  Award,
  Video,
  Play,
  CheckCircle,
  Plus,
  ArrowLeft,
  FileText,
  BarChart3,
  Globe
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { useNotification } from '../../context/NotificationContext';
import api from '../../api';

export const AdminCourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedModule, setSelectedModule] = useState(0);
  const { addToast } = useNotification();

  useEffect(() => {
    const fetchCourseDetail = async () => {
      try {
        setLoading(true);
        const res = await api.getCourseById(id);
        if (res && res.data) {
          setCourse(res.data);
        }
      } catch (err) {
        console.warn('Error fetching course detail');
      } finally {
        setLoading(false);
      }
    };
    fetchCourseDetail();
  }, [id]);

  const handleAddSampleLesson = () => {
    addToast({
      title: 'Lesson Added (Simulator)',
      message: 'New video lesson "Practical Field Operations Ledger" attached to Module 2.',
      type: 'success'
    });
  };

  if (loading) {
    return <LoadingState count={3} />;
  }

  if (!course) {
    return (
      <div className="p-8 text-center">
        <h3 className="text-lg font-bold text-[#0B2A4A]">Course not found</h3>
        <Link to="/admin/courses" className="mt-4 inline-block btn-primary text-xs">
          Back to Courses
        </Link>
      </div>
    );
  }

  const progressData = [
    { week: 'Week 1', progress: 28 },
    { week: 'Week 2', progress: 45 },
    { week: 'Week 3', progress: 68 },
    { week: 'Week 4', progress: 82 }
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title={course.title}
        subtitle={`${course.category} • Assigned Faculty: ${course.trainer}`}
        breadcrumbs={[
          { label: 'Admin', link: '/admin/dashboard' },
          { label: 'LMS Courses', link: '/admin/courses' },
          { label: course.title }
        ]}
        actions={
          <div className="flex items-center gap-2">
            <Link to="/admin/courses" className="btn-outline text-xs">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to LMS
            </Link>
            <button onClick={handleAddSampleLesson} className="btn-primary text-xs">
              <Plus className="w-3.5 h-3.5" /> Add Video Lesson
            </button>
          </div>
        }
      />

      {/* Top Banner Overview */}
      <div className="card-institutional p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4 h-48 rounded-xl overflow-hidden relative bg-slate-900">
          <img
            src={course.thumbnail || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80'}
            alt={course.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B2A4A]/80 to-transparent" />
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-bold">
            <StatusBadge status={course.status} size="xs" />
            <span className="flex items-center gap-1">
              <Globe className="w-3.5 h-3.5 text-cyan-300" /> {course.language}
            </span>
          </div>
        </div>

        <div className="lg:col-span-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-[#EAF5FB] text-[#1976D2] border border-[#1976D2]/20">
                {course.category}
              </span>
              <span className="text-xs text-slate-500">• Duration: {course.duration}</span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              {course.description}
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs">
            <div>
              <span className="text-slate-400 block text-[10px]">Enrollments</span>
              <span className="font-bold text-[#0B2A4A] text-sm">{course.enrolledStudents || 320}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">Completion Rate</span>
              <span className="font-bold text-[#2E9D59] text-sm">{course.completionRate || 82}%</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">Avg Score</span>
              <span className="font-bold text-[#1976D2] text-sm">84.5%</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">Total Modules</span>
              <span className="font-bold text-slate-800 text-sm">{course.modules?.length || 4} Modules</span>
            </div>
          </div>
        </div>
      </div>

      {/* Learning Analytics Chart & Modules Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Modules & Lessons List */}
        <div className="lg:col-span-7 card-institutional p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-[#0B2A4A]">Course Modules & Lessons</h3>
              <p className="text-xs text-slate-500">Curriculum structure and digitized video assets</p>
            </div>
            <button onClick={handleAddSampleLesson} className="btn-secondary text-xs">
              <Plus className="w-3 h-3" /> Add Lesson
            </button>
          </div>

          <div className="space-y-3">
            {(course.modules && course.modules.length > 0 ? course.modules : [
              {
                moduleId: 'm1',
                title: 'Module 1: Orientation & Foundations',
                lessons: [
                  { lessonId: 'l1', title: '1.1 Introduction to Digital Operations', duration: '18 mins' },
                  { lessonId: 'l2', title: '1.2 Computer Basics for PACS Staff', duration: '22 mins' }
                ]
              },
              {
                moduleId: 'm2',
                title: 'Module 2: Cloud Tools & Member KYC Management',
                lessons: [
                  { lessonId: 'l3', title: '2.1 Electronic Spreadsheets & Balancing', duration: '25 mins' },
                  { lessonId: 'l4', title: '2.2 KYC Document Verification', duration: '20 mins' }
                ]
              },
              {
                moduleId: 'm3',
                title: 'Module 3: Cybersecurity & Auditing Protocols',
                lessons: [
                  { lessonId: 'l5', title: '3.1 Fraud Prevention & OTP Security', duration: '24 mins' },
                  { lessonId: 'l6', title: '3.2 Biometric Gateway Operations', duration: '16 mins' }
                ]
              },
              {
                moduleId: 'm4',
                title: 'Module 4: Field Simulation & Certification Exam',
                lessons: [
                  { lessonId: 'l7', title: '4.1 Model Society Case Study', duration: '30 mins' },
                  { lessonId: 'l8', title: '4.2 Final Qualifying Assessment', duration: '45 mins' }
                ]
              }
            ]).map((mod, idx) => (
              <div key={idx} className="border border-slate-200 rounded-xl overflow-hidden">
                <div
                  onClick={() => setSelectedModule(selectedModule === idx ? -1 : idx)}
                  className="bg-slate-50 p-3.5 flex items-center justify-between cursor-pointer hover:bg-slate-100 transition-colors"
                >
                  <span className="font-bold text-xs text-[#0B2A4A] flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-[#1976D2]" />
                    {mod.title}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-500">
                    {mod.lessons?.length || 2} Lessons
                  </span>
                </div>

                {selectedModule === idx && (
                  <div className="p-3 divide-y divide-slate-100 bg-white">
                    {mod.lessons?.map((les, lIdx) => (
                      <div key={lIdx} className="py-2.5 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-[#EAF5FB] text-[#1976D2] flex items-center justify-center flex-shrink-0">
                            <Play className="w-3 h-3 fill-[#1976D2]" />
                          </div>
                          <div>
                            <span className="font-semibold text-slate-800 block">{les.title}</span>
                            <span className="text-[10px] text-slate-400">{les.summary || 'Essential core video lecture'}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 text-[11px] text-slate-500">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {les.duration}
                          </span>
                          <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[10px] font-semibold">
                            94% Watch Avg
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right: Learning Progress Analytics Chart */}
        <div className="lg:col-span-5 card-institutional p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-[#0B2A4A] mb-1">
              Learning Progress & Retention
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Weekly learner progression curves throughout the 4-week cohort
            </p>

            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={progressData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorProg" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1976D2" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#1976D2" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                  <XAxis dataKey="week" stroke="#94A3B8" fontSize={11} tickLine={false} />
                  <YAxis domain={[0, 100]} stroke="#94A3B8" fontSize={11} tickLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: '#0B2A4A', color: '#fff', borderRadius: '8px', fontSize: '11px' }} />
                  <Area type="monotone" dataKey="progress" name="Avg Completion %" stroke="#1976D2" strokeWidth={3} fillOpacity={1} fill="url(#colorProg)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-2 mt-4 text-xs">
              <div className="flex justify-between items-center text-slate-600">
                <span>Assessment Passing Rate:</span>
                <strong className="text-[#2E9D59]">91.2% (First Attempt)</strong>
              </div>
              <div className="flex justify-between items-center text-slate-600">
                <span>Average Quiz Score:</span>
                <strong className="text-[#0B2A4A]">84.5 / 100</strong>
              </div>
              <div className="flex justify-between items-center text-slate-600">
                <span>Total Certificates Conferred:</span>
                <strong className="text-purple-600">278 Verified Credentials</strong>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">Live cohort active</span>
            <Link to="/admin/analytics" className="font-bold text-[#1976D2] hover:underline">
              Full Analytics →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCourseDetail;
