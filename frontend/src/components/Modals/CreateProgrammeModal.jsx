import React, { useState } from 'react';
import Modal from '../Common/Modal';

export const CreateProgrammeModal = ({ isOpen, onClose, onCreate }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    institution: 'RICM Patna (Regional Institute of Cooperative Management)',
    trainer: 'Senior Faculty & Cooperative Experts',
    startDate: '01 Nov 2026',
    endDate: '15 Nov 2026',
    duration: '15 Days',
    mode: 'Hybrid',
    language: 'Hindi & English',
    totalSeats: 60,
    targetAudience: 'PACS Secretaries & Cooperative Society Staff',
    venue: 'Main Academic Hall & NCCT Virtual Classroom'
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.institution) return;
    onCreate(formData);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create Training Programme"
      subtitle="Schedule and announce an upcoming capacity-building workshop or executive batch"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div>
          <label className="block font-semibold text-slate-700 mb-1">Programme Name *</label>
          <input
            type="text"
            name="title"
            required
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g. PACS Digital Transformation & Common Accounting Standard"
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#19A7CE] focus:outline-none"
          />
        </div>

        <div>
          <label className="block font-semibold text-slate-700 mb-1">Description *</label>
          <textarea
            name="description"
            rows="2"
            required
            value={formData.description}
            onChange={handleChange}
            placeholder="Outline curriculum, target participants, and learning outcomes..."
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#19A7CE] focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Hosting Institution *</label>
            <select
              name="institution"
              value={formData.institution}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#19A7CE] focus:outline-none"
            >
              <option value="RICM Patna (Regional Institute of Cooperative Management)">RICM Patna (Bihar)</option>
              <option value="VAMNICOM Pune (Vaikunth Mehta National Institute)">VAMNICOM Pune (Maharashtra)</option>
              <option value="RICM Bengaluru (Regional Institute of Cooperative Management)">RICM Bengaluru (Karnataka)</option>
              <option value="ICM Lucknow (Institute of Cooperative Management)">ICM Lucknow (Uttar Pradesh)</option>
              <option value="ICM Dehradun (Institute of Cooperative Management)">ICM Dehradun (Uttarakhand)</option>
              <option value="ICM Guwahati (Institute of Cooperative Management)">ICM Guwahati (Assam)</option>
              <option value="RICM Kalyani (West Bengal)">RICM Kalyani (West Bengal)</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Programme Mode *</label>
            <select
              name="mode"
              value={formData.mode}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#19A7CE] focus:outline-none"
            >
              <option value="Hybrid">Hybrid (Classroom + Virtual)</option>
              <option value="Residential">Full Residential (Campus)</option>
              <option value="Online">Online Virtual LMS</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Start Date *</label>
            <input
              type="text"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              placeholder="01 Nov 2026"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#19A7CE] focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">End Date *</label>
            <input
              type="text"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              placeholder="15 Nov 2026"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#19A7CE] focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Total Seat Capacity *</label>
            <input
              type="number"
              name="totalSeats"
              value={formData.totalSeats}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#19A7CE] focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Faculty / Coordinators</label>
            <input
              type="text"
              name="trainer"
              value={formData.trainer}
              onChange={handleChange}
              placeholder="Prof. Ramesh Kulkarni & Team"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#19A7CE] focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Instruction Language</label>
            <input
              type="text"
              name="language"
              value={formData.language}
              onChange={handleChange}
              placeholder="Hindi, English & Regional"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#19A7CE] focus:outline-none"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
          <button type="button" onClick={onClose} className="btn-outline">
            Cancel
          </button>
          <button type="submit" className="btn-primary">
            Publish Training Programme
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateProgrammeModal;
