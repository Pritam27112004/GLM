const mongoose = require('mongoose');

const LessonSchema = new mongoose.Schema({
  lessonId: { type: String, required: true },
  title: { type: String, required: true },
  duration: { type: String, default: '15 mins' },
  videoUrl: { type: String },
  thumbnail: { type: String },
  summary: { type: String },
  offlineAvailable: { type: Boolean, default: true }
});

const ModuleSchema = new mongoose.Schema({
  moduleId: { type: String, required: true },
  title: { type: String, required: true },
  lessons: [LessonSchema]
});

const QuestionSchema = new mongoose.Schema({
  id: { type: Number },
  question: { type: String },
  options: [{ type: String }],
  correctAnswer: { type: Number },
  explanation: { type: String }
});

const CourseSchema = new mongoose.Schema({
  courseId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  trainer: { type: String, required: true },
  duration: { type: String, required: true },
  language: { type: String, default: 'Hindi / English' },
  level: { type: String, default: 'Beginner to Intermediate' },
  thumbnail: { type: String },
  status: { type: String, enum: ['Active', 'Draft', 'Archived'], default: 'Active' },
  enrolledStudents: { type: Number, default: 0 },
  completionRate: { type: Number, default: 78 },
  averageRating: { type: Number, default: 4.8 },
  totalLessons: { type: Number, default: 12 },
  offlineSupported: { type: Boolean, default: true },
  modules: [ModuleSchema],
  assessmentQuestions: [QuestionSchema]
}, { timestamps: true });

module.exports = mongoose.models.Course || mongoose.model('Course', CourseSchema);
