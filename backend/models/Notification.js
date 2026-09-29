const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
  notificationId: { type: String, required: true, unique: true },
  targetRole: { type: String, enum: ['all', 'admin', 'trainee'], default: 'all' },
  userId: { type: String },
  title: { type: String, required: true },
  message: { type: String, required: true },
  type: { type: String, enum: ['programme', 'certificate', 'job', 'attendance', 'system'], default: 'system' },
  link: { type: String },
  read: { type: Boolean, default: false },
  timestamp: { type: String, default: 'Just now' }
}, { timestamps: true });

module.exports = mongoose.models.Notification || mongoose.model('Notification', NotificationSchema);
