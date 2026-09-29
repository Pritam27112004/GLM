const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  role: { type: String, enum: ['admin', 'trainee'], default: 'trainee' },
  avatar: { type: String },
  institution: { type: String, default: 'RICM Patna' },
  state: { type: String, default: 'Bihar' },
  joiningDate: { type: String, default: '15 Jan 2026' },
  profileCompletion: { type: Number, default: 85 },
  skills: [{ type: String }],
  enrolledCourses: [{
    courseId: { type: String },
    enrolledDate: { type: String },
    progress: { type: Number, default: 0 },
    completedLessons: [{ type: String }],
    assessmentScore: { type: Number },
    status: { type: String, enum: ['in_progress', 'completed'], default: 'in_progress' }
  }],
  registeredProgrammes: [{
    programmeId: { type: String },
    registrationDate: { type: String },
    status: { type: String, default: 'Registered' }
  }],
  appliedJobs: [{
    jobId: { type: String },
    appliedDate: { type: String },
    status: { type: String, default: 'Under Review' }
  }]
}, { timestamps: true });

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);
