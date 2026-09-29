const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  employeeId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  designation: { type: String, required: true },
  department: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  joiningDate: { type: String },
  attendanceRate: { type: Number, default: 92.5 },
  todayStatus: { type: String, enum: ['Present', 'Absent', 'Late', 'On Leave'], default: 'Present' },
  checkIn: { type: String, default: '09:15 AM' },
  checkOut: { type: String, default: '05:30 PM' },
  avatar: { type: String }
}, { timestamps: true });

module.exports = mongoose.models.Employee || mongoose.model('Employee', EmployeeSchema);
