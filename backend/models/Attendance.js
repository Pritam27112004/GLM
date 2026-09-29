const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
  attendanceId: { type: String, required: true, unique: true },
  personId: { type: String, required: true },
  personName: { type: String, required: true },
  personType: { type: String, enum: ['Employee', 'Trainee'], default: 'Employee' },
  departmentOrBatch: { type: String, required: true },
  date: { type: String, required: true },
  checkIn: { type: String, default: '--' },
  checkOut: { type: String, default: '--' },
  status: { type: String, enum: ['Present', 'Late', 'Absent', 'On Leave'], default: 'Present' },
  capturedVia: { type: String, default: 'Raspberry Pi 5 + Camera Simulation' },
  confidenceScore: { type: Number, default: 98.4 },
  deviceLocation: { type: String, default: 'RICM Patna - Main Entry Gate' }
}, { timestamps: true });

module.exports = mongoose.models.Attendance || mongoose.model('Attendance', AttendanceSchema);
