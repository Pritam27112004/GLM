const mongoose = require('mongoose');

const ProgrammeSchema = new mongoose.Schema({
  programmeId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  institution: { type: String, required: true },
  trainer: { type: String, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  duration: { type: String, default: '15 Days' },
  mode: { type: String, enum: ['Hybrid', 'Online', 'Residential'], default: 'Hybrid' },
  language: { type: String, default: 'Hindi & English' },
  totalSeats: { type: Number, default: 60 },
  registeredParticipants: { type: Number, default: 0 },
  status: { type: String, enum: ['Upcoming', 'Ongoing', 'Completed'], default: 'Upcoming' },
  targetAudience: { type: String, default: 'Cooperative Societies Staff & Rural Youth' },
  venue: { type: String, default: 'Campus Auditorium & Virtual LMS' }
}, { timestamps: true });

module.exports = mongoose.models.Programme || mongoose.model('Programme', ProgrammeSchema);
