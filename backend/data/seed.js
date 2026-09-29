const mongoose = require('mongoose');
const User = require('../models/User');
const Employee = require('../models/Employee');
const Course = require('../models/Course');
const Programme = require('../models/Programme');
const Attendance = require('../models/Attendance');
const Certificate = require('../models/Certificate');
const Job = require('../models/Job');
const Notification = require('../models/Notification');
const {
  mockUsers,
  mockEmployees,
  mockCourses,
  mockProgrammes,
  mockJobs,
  mockCertificates,
  mockAttendance,
  mockNotifications
} = require('./mockData');

const seedData = async () => {
  try {
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      console.log('[Seed] Seeding initial NCCT users...');
      await User.insertMany(mockUsers);
    }

    const empCount = await Employee.countDocuments();
    if (empCount === 0) {
      console.log('[Seed] Seeding initial NCCT employees...');
      await Employee.insertMany(mockEmployees);
    }

    const courseCount = await Course.countDocuments();
    if (courseCount === 0) {
      console.log('[Seed] Seeding initial NCCT courses...');
      await Course.insertMany(mockCourses);
    }

    const progCount = await Programme.countDocuments();
    if (progCount === 0) {
      console.log('[Seed] Seeding initial NCCT programmes...');
      await Programme.insertMany(mockProgrammes);
    }

    const attCount = await Attendance.countDocuments();
    if (attCount === 0) {
      console.log('[Seed] Seeding initial NCCT attendance...');
      await Attendance.insertMany(mockAttendance);
    }

    const certCount = await Certificate.countDocuments();
    if (certCount === 0) {
      console.log('[Seed] Seeding initial NCCT certificates...');
      await Certificate.insertMany(mockCertificates);
    }

    const jobCount = await Job.countDocuments();
    if (jobCount === 0) {
      console.log('[Seed] Seeding initial NCCT jobs...');
      await Job.insertMany(mockJobs);
    }

    const notifCount = await Notification.countDocuments();
    if (notifCount === 0) {
      console.log('[Seed] Seeding initial NCCT notifications...');
      await Notification.insertMany(mockNotifications);
    }

    console.log('[Seed] Database initialization and seeding completed successfully.');
  } catch (error) {
    console.warn('[Seed] Note during database seeding:', error.message);
  }
};

module.exports = seedData;
