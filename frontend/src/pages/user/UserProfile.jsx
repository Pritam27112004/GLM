import React, { useState } from 'react';
import PageHeader from '../../components/Common/PageHeader';
import ProgressBar from '../../components/Common/ProgressBar';
import Modal from '../../components/Common/Modal';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import {
  User,
  Mail,
  Phone,
  Building2,
  Calendar,
  Award,
  BookOpen,
  MapPin,
  ShieldCheck,
  Edit,
  CheckCircle,
  Plus
} from 'lucide-react';

export const UserProfile = () => {
  const { user, updateUser } = useAuth();
  const { addToast } = useNotification();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || 'Rahul Sharma',
    email: user?.email || 'user@ncct.demo',
    phone: user?.phone || '+91 98765 43210',
    institution: user?.institution || 'RICM Patna (Regional Institute of Cooperative Management)',
    state: user?.state || 'Bihar',
    skills: user?.skills?.join(', ') || 'Digital Literacy, PACS Accounting, Cooperative Management, Agri-Credit Analysis'
  });

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const updatedSkills = formData.skills.split(',').map(s => s.trim()).filter(Boolean);
    updateUser({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      institution: formData.institution,
      state: formData.state,
      skills: updatedSkills,
      profileCompletion: 92
    });

    addToast({
      title: 'Profile Updated',
      message: 'Your candidate details and skill badges have been updated.',
      type: 'success'
    });
    setIsEditModalOpen(false);
  };

  const skillsList = user?.skills || [
    'Digital Literacy',
    'PACS Accounting',
    'Cooperative Management',
    'Agri-Credit Analysis'
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Trainee Candidate Profile"
        subtitle="Official credentials, institutional enrollment, skill matrix, and accreditation history."
        breadcrumbs={[{ label: 'Trainee', link: '/user/dashboard' }, { label: 'Profile' }]}
        actions={
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="btn-primary text-xs"
          >
            <Edit className="w-3.5 h-3.5" /> Edit Profile
          </button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Avatar & Summary Profile Card */}
        <div className="lg:col-span-4 space-y-6">
          <div className="card-institutional p-6 text-center">
            <div className="relative w-28 h-28 mx-auto mb-4">
              <img
                src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80'}
                alt={user?.name}
                className="w-full h-full rounded-full object-cover ring-4 ring-[#1976D2]/20 shadow-md"
              />
              <span className="absolute bottom-1 right-1 p-1.5 rounded-full bg-[#2E9D59] text-white border-2 border-white shadow-xs">
                <ShieldCheck className="w-4 h-4" />
              </span>
            </div>

            <h2 className="text-xl font-black text-[#0B2A4A] tracking-tight">{user?.name || 'Rahul Sharma'}</h2>
            <p className="text-xs text-slate-500 mt-0.5">{user?.designation || 'Cooperative Candidate'}</p>

            <span className="mt-2 inline-block px-3 py-1 rounded-full text-xs font-bold bg-[#EAF5FB] text-[#1976D2] border border-[#1976D2]/20">
              {user?.institution || 'RICM Patna'}
            </span>

            {/* Profile Completion */}
            <div className="mt-6 pt-5 border-t border-slate-100 text-left">
              <div className="flex justify-between items-center text-xs font-bold text-slate-700 mb-1.5">
                <span>Profile Completion</span>
                <span className="text-[#1976D2]">{user?.profileCompletion || 88}%</span>
              </div>
              <ProgressBar progress={user?.profileCompletion || 88} color="blue" showLabel={false} />
              <p className="text-[11px] text-slate-400 mt-2">
                Completing your profile unlocks priority matching with cooperative banks and hiring societies.
              </p>
            </div>
          </div>

          {/* Institutional Identification Card */}
          <div className="card-institutional p-5 text-xs space-y-3">
            <h4 className="font-bold text-[#0B2A4A] uppercase tracking-wider text-[11px]">
              Institutional Identification
            </h4>

            <div className="flex justify-between items-center text-slate-600 pb-2 border-b border-slate-100">
              <span>Trainee ID:</span>
              <strong className="font-mono text-[#0B2A4A]">TRN-2026-081</strong>
            </div>
            <div className="flex justify-between items-center text-slate-600 pb-2 border-b border-slate-100">
              <span>Registered Center:</span>
              <strong className="text-slate-800">RICM Patna</strong>
            </div>
            <div className="flex justify-between items-center text-slate-600 pb-2 border-b border-slate-100">
              <span>Jurisdiction State:</span>
              <strong className="text-slate-800">Bihar</strong>
            </div>
            <div className="flex justify-between items-center text-slate-600">
              <span>Batch Joining Date:</span>
              <strong className="text-slate-800">15 Jan 2026</strong>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Details, Skills, Certificates */}
        <div className="lg:col-span-8 space-y-6">
          {/* Contact Details Card */}
          <div className="card-institutional p-6">
            <h3 className="text-base font-bold text-[#0B2A4A] mb-4">
              Contact & Official Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="p-2 rounded-lg bg-[#EAF5FB] text-[#1976D2]">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Email Address</span>
                  <span className="font-semibold text-slate-800">{user?.email || 'user@ncct.demo'}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="p-2 rounded-lg bg-[#EAF5FB] text-[#1976D2]">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Mobile Phone</span>
                  <span className="font-semibold text-slate-800">{user?.phone || '+91 98765 43210'}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="p-2 rounded-lg bg-[#EAF5FB] text-[#1976D2]">
                  <Building2 className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Training Institute</span>
                  <span className="font-semibold text-slate-800 truncate max-w-[200px]">{user?.institution || 'RICM Patna'}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="p-2 rounded-lg bg-[#EAF5FB] text-[#1976D2]">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">State / Region</span>
                  <span className="font-semibold text-slate-800">{user?.state || 'Bihar'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Endorsed Skills Matrix */}
          <div className="card-institutional p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-[#0B2A4A]">
                  Endorsed Skills & Competencies
                </h3>
                <p className="text-xs text-slate-500">
                  Verified competencies demonstrated across course examinations
                </p>
              </div>
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="text-xs text-[#1976D2] font-semibold hover:underline"
              >
                + Add Skill
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {skillsList.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-xl bg-[#EAF5FB] text-[#0B2A4A] border border-[#1976D2]/30 text-xs font-semibold flex items-center gap-1.5 shadow-xs"
                >
                  <CheckCircle className="w-3.5 h-3.5 text-[#2E9D59]" />
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Earned Qualifications */}
          <div className="card-institutional p-6">
            <h3 className="text-base font-bold text-[#0B2A4A] mb-4">
              Conferred Digital Qualifications (2)
            </h3>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-amber-100 text-amber-600">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0B2A4A]">Digital Literacy for Cooperative Personnel</h4>
                    <p className="text-[11px] text-slate-500">Issued: 29 Aug 2026 • Score: 88% (Distinction)</p>
                  </div>
                </div>
                <span className="font-mono font-bold text-[11px] text-[#1976D2] bg-white px-2.5 py-1 rounded border border-slate-200">
                  NCCT-CERT-2026-00124
                </span>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-amber-100 text-amber-600">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0B2A4A]">PACS Digital Operations & Accounting Masterclass</h4>
                    <p className="text-[11px] text-slate-500">Issued: 14 Sep 2026 • Score: 92% (Honors)</p>
                  </div>
                </div>
                <span className="font-mono font-bold text-[11px] text-[#1976D2] bg-white px-2.5 py-1 rounded border border-slate-200">
                  NCCT-CERT-2026-00125
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Candidate Profile"
        subtitle="Update contact details, regional institute, and skill keywords"
      >
        <form onSubmit={handleEditSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Full Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#19A7CE] focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#19A7CE] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Phone</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#19A7CE] focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">State</label>
              <input
                type="text"
                value={formData.state}
                onChange={(e) => setFormData(prev => ({ ...prev, state: e.target.value }))}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#19A7CE] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Training Institution</label>
            <input
              type="text"
              value={formData.institution}
              onChange={(e) => setFormData(prev => ({ ...prev, institution: e.target.value }))}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#19A7CE] focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Skills (Comma separated)</label>
            <input
              type="text"
              value={formData.skills}
              onChange={(e) => setFormData(prev => ({ ...prev, skills: e.target.value }))}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#19A7CE] focus:outline-none"
            />
          </div>

          <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
            <button type="button" onClick={() => setIsEditModalOpen(false)} className="btn-outline">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Save Profile Changes
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default UserProfile;
