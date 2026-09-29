import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import PageHeader from '../../components/Common/PageHeader';
import ProgressBar from '../../components/Common/ProgressBar';
import LoadingState from '../../components/Common/LoadingState';
import CourseAssessmentModal from '../../components/Modals/CourseAssessmentModal';
import CertificatePreviewModal from '../../components/Modals/CertificatePreviewModal';
import { useBandwidth } from '../../context/BandwidthContext';
import { useNotification } from '../../context/NotificationContext';
import {
  Play,
  Pause,
  CheckCircle2,
  Clock,
  BookOpen,
  Award,
  ArrowLeft,
  Volume2,
  Maximize,
  HardDriveDownload,
  WifiOff,
  FileText,
  User,
  HelpCircle,
  Sparkles
} from 'lucide-react';
import api from '../../api';

export const UserCourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAssessmentOpen, setIsAssessmentOpen] = useState(false);
  const [earnedCertificate, setEarnedCertificate] = useState(null);
  const [completedLessons, setCompletedLessons] = useState(['l1', 'l2', 'l3', 'l4', 'l5', 'l6', 'l7', 'l8']);
  const [progress, setProgress] = useState(72);

  const { isDataSaver, isOfflineAvailable } = useBandwidth();
  const { addToast } = useNotification();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        const res = await api.getCourseById(id);
        if (res && res.data) {
          setCourse(res.data);
        }
      } catch (e) {
        console.warn('Course detail fallback');
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  const allLessons = course?.modules?.flatMap(m => m.lessons) || [
    { lessonId: 'l1', title: '1.1 Introduction to Cooperative Mandates', duration: '18 mins', summary: 'Understanding the digitalization roadmap for cooperative societies.' },
    { lessonId: 'l2', title: '1.2 Computer Fundamentals for Field Staff', duration: '22 mins', summary: 'Best practices for workstations in rural cooperative offices.' },
    { lessonId: 'l3', title: '1.3 Internet & Official Communication', duration: '15 mins', summary: 'Official communication and digital record archiving.' },
    { lessonId: 'l4', title: '2.1 Electronic Spreadsheets for Daily Ledger', duration: '25 mins', summary: 'Formulas, pivot tables, and balance reconciliation.' },
    { lessonId: 'l5', title: '2.2 Cloud Backup & Member Data Protection', duration: '20 mins', summary: 'Protecting shareholder data against hardware failure.' },
    { lessonId: 'l6', title: '2.3 Digitizing Member Records & KYC Uploads', duration: '18 mins', summary: 'Scanning, optical verification, and document indexing.' },
    { lessonId: 'l7', title: '3.1 Recognizing Phishing & Social Engineering', duration: '24 mins', summary: 'Securing farmer accounts against fraud vectors.' },
    { lessonId: 'l8', title: '3.2 Biometric Gateways & Two-Factor Auth', duration: '16 mins', summary: 'Implementing RPi / Jetson biometric verification.' },
    { lessonId: 'l9', title: '4.1 Model Society End-to-End Simulation', duration: '30 mins', summary: 'Live workflow simulation on the NCCT portal.' },
    { lessonId: 'l10', title: '4.2 Final Qualifying Assessment', duration: '45 mins', summary: 'Qualifying exam for NCCT Digital Competency Certificate.' }
  ];

  const currentLesson = allLessons[currentLessonIndex] || allLessons[0];

  const handleCompleteLesson = (lessonId) => {
    if (!completedLessons.includes(lessonId)) {
      const updated = [...completedLessons, lessonId];
      setCompletedLessons(updated);
      const newProgress = Math.min(100, Math.round((updated.length / allLessons.length) * 100));
      setProgress(newProgress);
      addToast({
        title: 'Lesson Completed! 🎯',
        message: `Marked "${currentLesson.title}" as completed. Course progress: ${newProgress}%.`,
        type: 'success'
      });
    }
  };

  const handleAssessmentCompleted = (result) => {
    setProgress(100);
    const newCert = {
      certificateId: 'NCCT-CERT-2026-00124',
      traineeName: 'Rahul Sharma',
      courseTitle: course?.title || 'Digital Literacy for Cooperative Personnel',
      institution: 'National Council for Cooperative Training (NCCT)',
      regionalInstitute: 'RICM Patna (Regional Institute of Cooperative Management)',
      issueDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      completionScore: result.score,
      status: 'Verified',
      skillsAccredited: ['PACS Cloud ERP', 'Cyber Hygiene', 'Spreadsheet Auditing', 'Digital Member KYC']
    };
    setEarnedCertificate(newCert);
  };

  if (loading) return <LoadingState count={3} />;

  if (!course) {
    return (
      <div className="p-8 text-center">
        <h3 className="text-lg font-bold text-[#0B2A4A]">Course not found</h3>
        <Link to="/user/courses" className="mt-4 inline-block btn-primary text-xs">
          Back to Courses
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={course.title}
        subtitle={`Faculty: ${course.trainer} • ${course.category} • ${course.duration}`}
        breadcrumbs={[
          { label: 'Trainee', link: '/user/dashboard' },
          { label: 'Courses', link: '/user/courses' },
          { label: course.title }
        ]}
        actions={
          <Link to="/user/courses" className="btn-outline text-xs">
            <ArrowLeft className="w-3.5 h-3.5" /> All Courses
          </Link>
        }
      />

      {/* Main Learning Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Video Player and Lesson Overview */}
        <div className="lg:col-span-8 space-y-4">
          {/* Simulated Video Player */}
          <div className="bg-[#0B2A4A] rounded-2xl overflow-hidden shadow-xl border border-slate-800 flex flex-col">
            <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden">
              {/* Video Simulated Poster */}
              <img
                src={course.thumbnail || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80'}
                alt="Lecture Video"
                className={`w-full h-full object-cover transition-opacity duration-300 ${isPlaying ? 'opacity-80' : 'opacity-40'}`}
              />

              {/* Center Play Overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-gradient-to-t from-black/80 via-transparent to-black/30">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-16 h-16 rounded-full bg-[#1976D2] hover:bg-[#143C66] text-white flex items-center justify-center shadow-2xl transition-transform transform hover:scale-110 active:scale-95 border-2 border-white/40"
                  aria-label={isPlaying ? 'Pause Lecture' : 'Play Lecture'}
                >
                  {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 fill-white ml-1" />}
                </button>

                <div className="mt-4 text-white">
                  <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-[#F28C28] text-white uppercase tracking-wider mb-1 inline-block">
                    Lecture Video Simulator
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-white max-w-xl">
                    {currentLesson.title}
                  </h3>
                  <p className="text-xs text-slate-300 mt-1">
                    {course.trainer} • Duration: {currentLesson.duration}
                  </p>
                </div>
              </div>

              {/* Bandwidth Indicator Badge */}
              <div className="absolute top-3 right-3">
                {isDataSaver ? (
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-amber-500/90 text-white backdrop-blur-xs">
                    ⚡ Audio-First Data Saver Mode
                  </span>
                ) : (
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-black/60 text-white border border-white/20 backdrop-blur-xs">
                    720p HD Stream
                  </span>
                )}
              </div>
            </div>

            {/* Video Controls Bar */}
            <div className="p-3.5 bg-[#071A2E] text-white flex items-center justify-between text-xs border-t border-white/10">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                >
                  {isPlaying ? <Pause className="w-4 h-4 text-cyan-400" /> : <Play className="w-4 h-4 text-cyan-400 fill-cyan-400" />}
                </button>
                <div className="flex items-center gap-1.5 text-slate-400 font-mono text-[11px]">
                  <span>04:15</span>
                  <span>/</span>
                  <span>{currentLesson.duration}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCompleteLesson(currentLesson.lessonId)}
                  className="px-3 py-1 rounded-lg bg-[#2E9D59] hover:bg-[#258249] text-white font-semibold text-xs flex items-center gap-1.5 transition-colors"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" /> Mark Lesson Complete
                </button>
              </div>
            </div>
          </div>

          {/* Lesson Synopsis & Notes */}
          <div className="card-institutional p-6">
            <h3 className="text-base font-bold text-[#0B2A4A] mb-2">
              {currentLesson.title}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              {currentLesson.summary || 'In this lecture, participants explore core institutional operating procedures, compliance checklists, and digital transaction flows mandated by the Ministry of Cooperation.'}
            </p>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-2">
              <span className="font-bold text-[#0B2A4A] block">Key Takeaways:</span>
              <ul className="list-disc list-inside text-slate-600 space-y-1">
                <li>Implementation of standardized chart of accounts across primary societies.</li>
                <li>Mitigating cybersecurity and social engineering risks in daily operations.</li>
                <li>Role of automated AMCU and ERP in farmer payouts and balance reconciliation.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right Column: Course Progress & Lesson Playlist */}
        <div className="lg:col-span-4 space-y-6">
          {/* Progress Card */}
          <div className="card-institutional p-6">
            <h3 className="text-sm font-bold text-[#0B2A4A] uppercase tracking-wider mb-3">
              Course Progress Overview
            </h3>

            <div className="mb-4">
              <ProgressBar progress={progress} color={progress === 100 ? 'green' : 'blue'} />
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-2 text-xs mb-4">
              <div className="flex justify-between items-center text-slate-600">
                <span>Completed Lessons:</span>
                <strong className="text-[#0B2A4A]">{completedLessons.length} / {allLessons.length}</strong>
              </div>
              <div className="flex justify-between items-center text-slate-600">
                <span>Certification Status:</span>
                <strong className={progress === 100 ? 'text-[#2E9D59]' : 'text-amber-600'}>
                  {progress === 100 ? 'Eligible / Conferred' : 'In Progress (Passing: 65%)'}
                </strong>
              </div>
            </div>

            {/* Assessment Button */}
            <button
              onClick={() => setIsAssessmentOpen(true)}
              className="w-full btn-accent py-2.5 font-bold text-xs justify-center flex items-center gap-2 shadow-md"
            >
              <Award className="w-4 h-4" />
              <span>{progress === 100 ? 'Review Final Assessment' : 'Take Certification Assessment'}</span>
            </button>
          </div>

          {/* Lesson Playlist */}
          <div className="card-institutional p-5">
            <h3 className="text-sm font-bold text-[#0B2A4A] uppercase tracking-wider mb-3">
              Lesson Syllabus ({allLessons.length})
            </h3>

            <div className="space-y-1.5 max-h-96 overflow-y-auto pr-1">
              {allLessons.map((les, idx) => {
                const isCurrent = idx === currentLessonIndex;
                const isDone = completedLessons.includes(les.lessonId);

                return (
                  <div
                    key={les.lessonId}
                    onClick={() => {
                      setCurrentLessonIndex(idx);
                      setIsPlaying(true);
                    }}
                    className={`p-3 rounded-xl border text-xs cursor-pointer transition-all flex items-center justify-between ${
                      isCurrent
                        ? 'bg-[#EAF5FB] border-[#1976D2] text-[#0B2A4A] font-bold shadow-xs'
                        : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate max-w-[75%]">
                      {isDone ? (
                        <CheckCircle2 className="w-4 h-4 text-[#2E9D59] flex-shrink-0" />
                      ) : (
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${isCurrent ? 'border-[#1976D2]' : 'border-slate-300'}`}>
                          <div className={`w-1.5 h-1.5 rounded-full ${isCurrent ? 'bg-[#1976D2]' : 'transparent'}`} />
                        </div>
                      )}
                      <span className="truncate">{les.title}</span>
                    </div>

                    <span className="text-[11px] text-slate-400 font-mono whitespace-nowrap">
                      {les.duration}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Assessment Modal */}
      <CourseAssessmentModal
        isOpen={isAssessmentOpen}
        onClose={() => setIsAssessmentOpen(false)}
        course={course}
        onComplete={handleAssessmentCompleted}
      />

      {/* Earned Certificate Modal Preview */}
      <CertificatePreviewModal
        isOpen={!!earnedCertificate}
        onClose={() => setEarnedCertificate(null)}
        certificate={earnedCertificate}
      />
    </div>
  );
};

export default UserCourseDetail;
