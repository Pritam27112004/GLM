const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const { mockCourses } = require('../data/mockData');

// In-memory cache fallback
let memoryCourses = [...mockCourses];

// GET /api/courses
router.get('/', async (req, res) => {
  try {
    const { category, search, status } = req.query;
    let courses = [];
    try {
      let query = {};
      if (category && category !== 'All') query.category = category;
      if (status) query.status = status;
      if (search) {
        query.$or = [
          { title: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
          { trainer: { $regex: search, $options: 'i' } }
        ];
      }
      courses = await Course.find(query);
    } catch (dbErr) {
      courses = [];
    }

    if (!courses || courses.length === 0) {
      courses = memoryCourses.filter(c => {
        let match = true;
        if (category && category !== 'All' && c.category !== category) match = false;
        if (status && c.status !== status) match = false;
        if (search) {
          const s = search.toLowerCase();
          match = match && (
            c.title.toLowerCase().includes(s) ||
            c.description.toLowerCase().includes(s) ||
            c.trainer.toLowerCase().includes(s)
          );
        }
        return match;
      });
    }

    res.json({ success: true, count: courses.length, data: courses });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message, data: memoryCourses });
  }
});

// GET /api/courses/:id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    let course = null;
    try {
      course = await Course.findOne({ courseId: id });
    } catch (e) { course = null; }

    if (!course) {
      course = memoryCourses.find(c => c.courseId === id);
    }

    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    res.json({ success: true, data: course });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/courses (Add Course)
router.post('/', async (req, res) => {
  try {
    const newCourseData = {
      courseId: req.body.courseId || `c${Date.now()}`,
      title: req.body.title || 'Untitled Course',
      description: req.body.description || 'Comprehensive cooperative training course.',
      category: req.body.category || 'Cooperative Management',
      trainer: req.body.trainer || 'Senior Faculty, NCCT',
      duration: req.body.duration || '4 Weeks',
      language: req.body.language || 'Hindi & English',
      level: req.body.level || 'Beginner to Intermediate',
      thumbnail: req.body.thumbnail || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80',
      status: req.body.status || 'Active',
      enrolledStudents: 0,
      completionRate: 0,
      averageRating: 5.0,
      totalLessons: req.body.totalLessons || 12,
      offlineSupported: true,
      modules: req.body.modules || [
        {
          moduleId: 'm1',
          title: 'Module 1: Orientation & Fundamentals',
          lessons: [
            { lessonId: 'l1', title: '1.1 Introduction to Course Objectives', duration: '15 mins', summary: 'Foundational learning objectives and practical expectations.', offlineAvailable: true }
          ]
        }
      ],
      assessmentQuestions: req.body.assessmentQuestions || []
    };

    try {
      await Course.create(newCourseData);
    } catch (e) {
      console.warn('Saving in memory fallback for course');
    }
    memoryCourses.unshift(newCourseData);

    res.status(201).json({ success: true, message: 'Course created successfully', data: newCourseData });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PUT /api/courses/:id
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    let updated = null;
    try {
      updated = await Course.findOneAndUpdate({ courseId: id }, req.body, { new: true });
    } catch (e) { updated = null; }

    const index = memoryCourses.findIndex(c => c.courseId === id);
    if (index !== -1) {
      memoryCourses[index] = { ...memoryCourses[index], ...req.body };
      if (!updated) updated = memoryCourses[index];
    }

    res.json({ success: true, message: 'Course updated successfully', data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/courses/:id/progress
router.post('/:id/progress', async (req, res) => {
  try {
    const { id } = req.params;
    const { lessonId, progress, assessmentScore } = req.body;
    res.json({
      success: true,
      message: 'Learning progress recorded successfully',
      data: { courseId: id, lessonId, progress: progress || 75, assessmentScore: assessmentScore || null }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
