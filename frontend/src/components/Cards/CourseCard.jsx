import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, BookOpen, User, Star, WifiOff, ArrowRight } from 'lucide-react';
import StatusBadge from '../Common/StatusBadge';
import ProgressBar from '../Common/ProgressBar';

export const CourseCard = ({ course, userProgress, isAdmin = false, onManage }) => {
  const {
    courseId,
    title,
    category,
    trainer,
    duration,
    language,
    thumbnail,
    status = 'Active',
    enrolledStudents,
    completionRate,
    averageRating = 4.8,
    totalLessons = 12,
    offlineSupported = true
  } = course;

  const progress = userProgress?.progress;
  const isCompleted = progress === 100;

  return (
    <div className="card-institutional overflow-hidden flex flex-col group">
      {/* Thumbnail */}
      <div className="relative h-44 overflow-hidden bg-slate-900">
        <img
          src={thumbnail || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80'}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B2A4A]/90 via-transparent to-black/20" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap">
          <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-[#0B2A4A]/80 text-white backdrop-blur-xs border border-white/20">
            {category}
          </span>
          {offlineSupported && (
            <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-[#2E9D59]/90 text-white flex items-center gap-1">
              <WifiOff className="w-3 h-3" /> Offline Ready
            </span>
          )}
        </div>

        <div className="absolute top-3 right-3">
          <StatusBadge status={status} size="xs" />
        </div>

        {/* Duration / Lessons overlay */}
        <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white text-xs font-medium">
          <span className="flex items-center gap-1 text-slate-200">
            <Clock className="w-3.5 h-3.5 text-[#19A7CE]" /> {duration}
          </span>
          <span className="flex items-center gap-1 text-slate-200">
            <BookOpen className="w-3.5 h-3.5 text-[#19A7CE]" /> {totalLessons} Lessons
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-[#0B2A4A] text-base leading-snug line-clamp-2 group-hover:text-[#1976D2] transition-colors mb-2">
            {title}
          </h3>

          <p className="text-xs text-slate-500 flex items-center gap-1.5 mb-3">
            <User className="w-3.5 h-3.5 text-slate-400" />
            <span className="truncate">{trainer}</span>
          </p>

          {/* Admin Stats vs Trainee Progress */}
          {isAdmin ? (
            <div className="grid grid-cols-2 gap-2 bg-slate-50 p-2.5 rounded-lg text-xs mb-3 border border-slate-100">
              <div>
                <span className="text-slate-400 block text-[10px]">Enrollments</span>
                <span className="font-bold text-[#0B2A4A]">{enrolledStudents || 0} Learners</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Avg Completion</span>
                <span className="font-bold text-[#2E9D59]">{completionRate || 78}%</span>
              </div>
            </div>
          ) : progress !== undefined ? (
            <div className="mb-4">
              <ProgressBar progress={progress} color={isCompleted ? 'green' : 'blue'} />
            </div>
          ) : (
            <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
              <span className="flex items-center gap-1 text-amber-600 font-semibold">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" /> {averageRating} Rating
              </span>
              <span className="text-slate-400">{language}</span>
            </div>
          )}
        </div>

        {/* Action button */}
        <div className="pt-2 border-t border-slate-100">
          {isAdmin ? (
            <Link
              to={`/admin/courses/${courseId}`}
              className="w-full btn-outline text-xs justify-center font-semibold"
            >
              Manage Course & Modules
            </Link>
          ) : (
            <Link
              to={`/user/courses/${courseId}`}
              className={`w-full text-xs justify-center font-semibold ${
                progress !== undefined && progress > 0 ? 'btn-primary' : 'btn-secondary'
              }`}
            >
              <span>{isCompleted ? 'Review Course Material' : progress > 0 ? 'Continue Learning' : 'Start Course'}</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
