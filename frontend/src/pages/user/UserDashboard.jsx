import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PageHeader from '../../components/Common/PageHeader';
import StatCard from '../../components/Common/StatCard';
import CourseCard from '../../components/Cards/CourseCard';
import ProgressBar from '../../components/Common/ProgressBar';
import { useAuth } from '../../context/AuthContext';
import {
  BookOpen,
  CheckCircle2,
  Award,
  CalendarCheck,
  Sparkles,
  ArrowRight,
  Briefcase,
  Calendar,
  Clock,
  MapPin,
  TrendingUp,
  Cpu
} from 'lucide-react';
import api from '../../api';

export const UserDashboard = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await api.getCourses();
        if (res && res.data) {
          setCourses(res.data);
        }
      } catch (e) {
        console.warn('Courses fallback');
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  // Enrolled courses map for current user Rahul Sharma
  const enrolledProgressMap = {
    c1: { progress: 72, completedLessons: 8, totalLessons: 12 },
    c2: { progress: 45, completedLessons: 4, totalLessons: 10 },
    c3: { progress: 100, completedLessons: 12, totalLessons: 12 },
    c4: { progress: 100, completedLessons: 10, totalLessons: 10 }
  };

  const inProgressCourses = courses.filter(
    c => enrolledProgressMap[c.courseId] && enrolledProgressMap[c.courseId].progress < 100
  );

  return (
    <div className="space-y-6">
      {/* Welcome Institutional Banner */}
      <div className="bg-gradient-to-r from-[#0B2A4A] via-[#143C66] to-[#1976D2] text-white p-6 sm:p-8 rounded-3xl border border-white/10 shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#19A7CE]/20 text-[#19A7CE] border border-[#19A7CE]/30">
              NCCT Trainee Portal
            </span>
            <span className="text-xs text-slate-300">
              • Regional Institute: <strong>{user?.institution || 'RICM Patna'}</strong>
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Welcome back, {user?.name || 'Rahul Sharma'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-200 mt-2 leading-relaxed">
            You are currently on track for the <strong>Cooperative Field Officer & Digital Operations</strong> qualification pathway. Continue your active modules to earn your verified credentials.
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Link
              to="/user/courses/c1"
              className="btn-accent text-xs font-bold px-4 py-2 flex items-center gap-1.5 shadow-md"
            >
              <span>Resume Digital Literacy (72%)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <Link
              to="/user/career-assistant"
              className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 transition-colors flex items-center gap-1.5 backdrop-blur-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Ask AI Career Assistant</span>
            </Link>
          </div>
        </div>

        {/* Decorative circle */}
        <div className="absolute -right-12 -bottom-12 w-64 h-64 rounded-full bg-cyan-400/10 blur-3xl pointer-events-none" />
      </div>

      {/* 4 Top KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Courses Enrolled"
          value="4"
          icon={BookOpen}
          color="blue"
          subtitle="2 Active • 2 Completed"
        />

        <StatCard
          title="Courses Completed"
          value="2"
          icon={CheckCircle2}
          color="green"
          trend="100%"
          trendLabel="pass rate"
        />

        <StatCard
          title="Verified Certificates"
          value="2"
          icon={Award}
          color="orange"
          subtitle="Signed & QR Verified"
        />

        <StatCard
          title="My Attendance"
          value="91%"
          icon={CalendarCheck}
          color="navy"
          badge="Distinction"
        />
      </div>

      {/* Continue Learning Active Courses */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-extrabold text-[#0B2A4A] tracking-tight">
              Continue Learning
            </h2>
            <p className="text-xs text-slate-500">Pick up right where you left off in your active modules</p>
          </div>
          <Link to="/user/courses" className="text-xs font-bold text-[#1976D2] hover:underline flex items-center gap-1">
            Browse All Courses <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {inProgressCourses.map((course) => (
            <CourseCard
              key={course.courseId}
              course={course}
              userProgress={enrolledProgressMap[course.courseId]}
              isAdmin={false}
            />
          ))}

          {/* Quick AI Career Recommendation Card */}
          <div className="card-institutional p-6 bg-gradient-to-br from-[#0B2A4A] to-[#143C66] text-white flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="p-2 rounded-lg bg-amber-400/20 text-amber-300">
                  <Sparkles className="w-4 h-4" />
                </span>
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                  AI Recommended Next Step
                </span>
              </div>

              <h3 className="text-base font-extrabold text-white mb-2 leading-snug">
                Agricultural Entrepreneurship
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Based on your interest in PACS and farmer credit, enrolling in FPO Business Management will boost your candidate ranking for District Cooperative Banks.
              </p>
            </div>

            <Link
              to="/user/career-assistant"
              className="btn-accent text-xs justify-center font-bold"
            >
              Get Career Guidance
            </Link>
          </div>
        </div>
      </div>

      {/* Upcoming Programme Banner & Open Vacancies */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Upcoming Programme Card */}
        <div className="lg:col-span-6 card-institutional p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-[#EAF5FB] text-[#1976D2] border border-[#1976D2]/20">
                Upcoming Hybrid Workshop
              </span>
              <span className="text-xs font-bold text-[#2E9D59]">15 Seats Left</span>
            </div>

            <h3 className="text-base font-bold text-[#0B2A4A] mb-1 leading-snug">
              Digital Cooperative Management Training Programme
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              RICM Patna Campus & Virtual LMS • 01 Oct 2026 – 15 Oct 2026
            </p>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-600 space-y-1.5 mb-4">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#1976D2]" />
                <span>15 Days Intensive Batch • Hybrid Mode</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#1976D2]" />
                <span>Auditorium, RICM Patna Campus</span>
              </div>
            </div>
          </div>

          <Link
            to="/user/programmes"
            className="w-full btn-primary text-xs justify-center font-bold"
          >
            View Schedule & Register
          </Link>
        </div>

        {/* Right: Matched Job Opportunities */}
        <div className="lg:col-span-6 card-institutional p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                Top Matched Opportunity
              </span>
              <span className="text-xs font-bold text-amber-600">Deadline: 20 Oct 2026</span>
            </div>

            <h3 className="text-base font-bold text-[#0B2A4A] mb-1">
              Cooperative Field Officer
            </h3>
            <p className="text-xs font-medium text-slate-600 mb-2">
              West Bengal State Apex Cooperative Society Ltd. • Kolkata
            </p>

            <div className="text-xs font-extrabold text-[#2E9D59] mb-3">
              ₹28,000 - ₹42,000 / month
            </div>

            <p className="text-xs text-slate-500 line-clamp-2 mb-4">
              Your verified certifications in <em>Digital Literacy</em> and <em>PACS Operations</em> fulfill all primary mandatory requirements for this role.
            </p>
          </div>

          <Link
            to="/user/jobs"
            className="w-full btn-accent text-xs justify-center font-bold"
          >
            Apply with Verified Credentials
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
