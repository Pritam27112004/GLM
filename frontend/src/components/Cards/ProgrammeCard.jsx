import React from 'react';
import { Calendar, MapPin, Users, Award, Clock } from 'lucide-react';
import StatusBadge from '../Common/StatusBadge';

export const ProgrammeCard = ({ programme, onRegister, isRegistered = false, isAdmin = false }) => {
  const {
    programmeId,
    title,
    description,
    institution,
    trainer,
    startDate,
    endDate,
    duration = '15 Days',
    mode = 'Hybrid',
    language = 'Hindi & English',
    totalSeats = 60,
    registeredParticipants = 45,
    status = 'Upcoming',
    venue
  } = programme;

  const seatsPercent = Math.min(100, Math.round((registeredParticipants / totalSeats) * 100));
  const seatsLeft = Math.max(0, totalSeats - registeredParticipants);

  return (
    <div className="card-institutional p-6 flex flex-col justify-between group">
      <div>
        {/* Institution & Mode Tag */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-[#EAF5FB] text-[#0B2A4A] border border-[#1976D2]/20 flex items-center gap-1 truncate max-w-[70%]">
            <Award className="w-3.5 h-3.5 text-[#1976D2] flex-shrink-0" />
            <span className="truncate">{institution}</span>
          </span>
          <StatusBadge status={mode} size="xs" />
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-[#0B2A4A] leading-snug group-hover:text-[#1976D2] transition-colors mb-2">
          {title}
        </h3>

        {/* Description */}
        <p className="text-xs text-slate-600 leading-relaxed line-clamp-2 mb-4">
          {description}
        </p>

        {/* Meta details */}
        <div className="space-y-2 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100 mb-4">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-slate-500">
              <Calendar className="w-3.5 h-3.5 text-[#1976D2]" /> Schedule:
            </span>
            <span className="font-semibold text-[#0B2A4A]">{startDate} – {endDate}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-slate-500">
              <Clock className="w-3.5 h-3.5 text-[#1976D2]" /> Duration / Language:
            </span>
            <span className="font-medium text-slate-700">{duration} • {language}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-slate-500">
              <MapPin className="w-3.5 h-3.5 text-[#1976D2]" /> Venue:
            </span>
            <span className="font-medium text-slate-700 truncate max-w-[180px]">{venue || 'Campus Auditorium'}</span>
          </div>
        </div>

        {/* Seats progress */}
        <div className="mb-4">
          <div className="flex justify-between items-center text-xs mb-1.5">
            <span className="text-slate-500 flex items-center gap-1">
              <Users className="w-3.5 h-3.5" /> Available Capacity
            </span>
            <span className="font-bold text-[#0B2A4A]">
              {registeredParticipants} / {totalSeats} Seats ({seatsLeft} left)
            </span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
            <div
              className={`h-2 rounded-full transition-all duration-500 ${
                seatsPercent > 80 ? 'bg-[#F28C28]' : 'bg-[#2E9D59]'
              }`}
              style={{ width: `${seatsPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Action button */}
      <div className="pt-3 border-t border-slate-100">
        {isAdmin ? (
          <button
            onClick={() => onRegister && onRegister(programme)}
            className="w-full btn-outline text-xs font-semibold justify-center"
          >
            Manage Programme & Participants
          </button>
        ) : isRegistered ? (
          <button
            disabled
            className="w-full btn-success text-xs font-semibold justify-center cursor-default opacity-90"
          >
            ✓ Registration Confirmed
          </button>
        ) : (
          <button
            onClick={() => onRegister && onRegister(programme)}
            className="w-full btn-accent text-xs font-semibold justify-center"
          >
            Register for Programme
          </button>
        )}
      </div>
    </div>
  );
};

export default ProgrammeCard;
