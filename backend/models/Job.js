const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  jobId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  organization: { type: String, required: true },
  location: { type: String, required: true },
  employmentType: { type: String, enum: ['Full Time', 'Contractual', 'Apprenticeship', 'Part Time'], default: 'Full Time' },
  salaryRange: { type: String, default: '₹25,000 - ₹40,000 / month' },
  requiredSkills: [{ type: String }],
  description: { type: String, required: true },
  postedDate: { type: String, required: true },
  applicationDeadline: { type: String, required: true },
  totalApplications: { type: Number, default: 0 },
  status: { type: String, enum: ['Active', 'Closed', 'Draft'], default: 'Active' },
  contactEmail: { type: String, default: 'careers@cooprecruitment.gov.in' }
}, { timestamps: true });

module.exports = mongoose.models.Job || mongoose.model('Job', JobSchema);
