import React, { useState } from 'react';
import Modal from '../Common/Modal';
import { ShieldCheck, Award, Briefcase, CheckCircle, FileText } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';

export const ApplyJobModal = ({ isOpen, onClose, job, onSubmitted }) => {
  const { user } = useAuth();
  const { addToast } = useNotification();
  const [coverNote, setCoverNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!job) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      addToast({
        title: 'Application Submitted! 🎉',
        message: `Your candidate profile and verified NCCT certifications have been sent to ${job.organization}.`,
        type: 'success'
      });
      if (onSubmitted) onSubmitted(job);
      onClose();
    }, 800);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Apply for: ${job.title}`}
      subtitle={`Hiring Entity: ${job.organization} • Location: ${job.location}`}
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        {/* Verified Candidate Profile Card */}
        <div className="bg-[#EAF5FB] border border-[#1976D2]/30 rounded-xl p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-bold text-[#0B2A4A] text-sm">{user?.name || 'Rahul Sharma'}</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#2E9D59] text-white flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" /> NCCT Verified Candidate
            </span>
          </div>
          <div className="text-slate-600">
            <span>Registered Trainee at: </span>
            <strong className="text-[#0B2A4A]">{user?.institution || 'RICM Patna'}</strong>
          </div>
          <div className="text-slate-600">
            <span>Overall Training Attendance: </span>
            <strong className="text-[#2E9D59]">91.0% (Distinction)</strong>
          </div>
        </div>

        {/* Attached Credentials */}
        <div>
          <label className="block font-semibold text-slate-700 mb-1.5">
            Automatically Attached Verified Credentials (2):
          </label>
          <div className="space-y-1.5">
            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-500" />
                <span className="font-semibold text-slate-800">Digital Literacy for Cooperative Personnel</span>
              </div>
              <span className="font-mono text-[11px] text-slate-500">NCCT-CERT-2026-00124</span>
            </div>
            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-500" />
                <span className="font-semibold text-slate-800">PACS Digital Operations & Accounting</span>
              </div>
              <span className="font-mono text-[11px] text-slate-500">NCCT-CERT-2026-00125</span>
            </div>
          </div>
        </div>

        {/* Skills match */}
        <div>
          <label className="block font-semibold text-slate-700 mb-1">Matching Verified Skills:</label>
          <div className="flex flex-wrap gap-1.5">
            {(job.requiredSkills || ['PACS Operations', 'Digital Literacy']).map((sk, i) => (
              <span key={i} className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-medium flex items-center gap-1">
                <CheckCircle className="w-3 h-3 text-emerald-600" /> {sk}
              </span>
            ))}
          </div>
        </div>

        {/* Short Statement */}
        <div>
          <label className="block font-semibold text-slate-700 mb-1">
            Brief Introduction / Availability Note
          </label>
          <textarea
            rows="3"
            value={coverNote}
            onChange={(e) => setCoverNote(e.target.value)}
            placeholder="I have completed comprehensive training at RICM Patna with top attendance and practical PACS accounting skills..."
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#19A7CE] focus:outline-none"
          />
        </div>

        <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
          <button type="button" onClick={onClose} className="btn-outline">
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-accent px-6 py-2 font-bold"
          >
            {isSubmitting ? 'Transmitting Application...' : 'Submit Application Now'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ApplyJobModal;
