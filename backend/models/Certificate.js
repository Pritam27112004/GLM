const mongoose = require('mongoose');

const CertificateSchema = new mongoose.Schema({
  certificateId: { type: String, required: true, unique: true },
  traineeId: { type: String, required: true },
  traineeName: { type: String, required: true },
  courseId: { type: String, required: true },
  courseTitle: { type: String, required: true },
  institution: { type: String, default: 'National Council for Cooperative Training (NCCT)' },
  regionalInstitute: { type: String, default: 'RICM Patna' },
  issueDate: { type: String, required: true },
  completionScore: { type: Number, default: 85 },
  status: { type: String, enum: ['Verified', 'Pending', 'Revoked'], default: 'Verified' },
  qrPayload: { type: String },
  signerName: { type: String, default: 'Dr. Alok Verma, Director General, NCCT' },
  skillsAccredited: [{ type: String }]
}, { timestamps: true });

module.exports = mongoose.models.Certificate || mongoose.model('Certificate', CertificateSchema);
