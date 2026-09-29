import React, { useState } from 'react';
import Modal from '../Common/Modal';

export const PostJobModal = ({ isOpen, onClose, onPost }) => {
  const [formData, setFormData] = useState({
    title: '',
    organization: '',
    location: '',
    salaryRange: '₹28,000 - ₹40,000 / month',
    employmentType: 'Full Time',
    requiredSkills: 'PACS Operations, Digital Literacy, Cooperative Accounting',
    description: '',
    applicationDeadline: '30 Nov 2026'
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.organization || !formData.description) return;
    const processedData = {
      ...formData,
      requiredSkills: formData.requiredSkills.split(',').map(s => s.trim()).filter(Boolean)
    };
    onPost(processedData);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Post Cooperative Job Opportunity"
      subtitle="Publish a vacancy for certified NCCT trainees, PACS managers, and cooperative specialists"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Job Title *</label>
            <input
              type="text"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. PACS Field Executive"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#19A7CE] focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Hiring Organization *</label>
            <input
              type="text"
              name="organization"
              required
              value={formData.organization}
              onChange={handleChange}
              placeholder="e.g. State Apex Cooperative Union"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#19A7CE] focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Location *</label>
            <input
              type="text"
              name="location"
              required
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g. Patna / Regional Hubs, Bihar"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#19A7CE] focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Employment Type</label>
            <select
              name="employmentType"
              value={formData.employmentType}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#19A7CE] focus:outline-none"
            >
              <option value="Full Time">Full Time</option>
              <option value="Contractual">Contractual</option>
              <option value="Apprenticeship">Apprenticeship</option>
              <option value="Part Time">Part Time</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Monthly Emoluments</label>
            <input
              type="text"
              name="salaryRange"
              value={formData.salaryRange}
              onChange={handleChange}
              placeholder="₹25,000 - ₹38,000 / mo"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#19A7CE] focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block font-semibold text-slate-700 mb-1">Required Skills (Comma separated) *</label>
          <input
            type="text"
            name="requiredSkills"
            required
            value={formData.requiredSkills}
            onChange={handleChange}
            placeholder="PACS Operations, Digital Literacy, Auditing"
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#19A7CE] focus:outline-none"
          />
        </div>

        <div>
          <label className="block font-semibold text-slate-700 mb-1">Job Description & Responsibilities *</label>
          <textarea
            name="description"
            rows="3"
            required
            value={formData.description}
            onChange={handleChange}
            placeholder="Specify responsibilities, key performance deliverables, and eligibility..."
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#19A7CE] focus:outline-none"
          />
        </div>

        <div>
          <label className="block font-semibold text-slate-700 mb-1">Application Deadline</label>
          <input
            type="text"
            name="applicationDeadline"
            value={formData.applicationDeadline}
            onChange={handleChange}
            placeholder="30 Nov 2026"
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#19A7CE] focus:outline-none"
          />
        </div>

        <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
          <button type="button" onClick={onClose} className="btn-outline">
            Cancel
          </button>
          <button type="submit" className="btn-primary">
            Publish Job Opening
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default PostJobModal;
