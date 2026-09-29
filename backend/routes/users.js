const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { mockUsers, mockNotifications } = require('../data/mockData');

let memoryUsers = [...mockUsers];
let memoryNotifications = [...mockNotifications];

// GET /api/users
router.get('/', async (req, res) => {
  res.json({ success: true, count: memoryUsers.length, data: memoryUsers });
});

// GET /api/users/profile/:userId
router.get('/profile/:userId', async (req, res) => {
  const { userId } = req.params;
  const user = memoryUsers.find(u => u.userId === userId || u.email === userId);
  if (!user) {
    return res.status(404).json({ success: false, message: 'User profile not found' });
  }
  res.json({ success: true, data: user });
});

// PUT /api/users/profile/:userId
router.put('/profile/:userId', async (req, res) => {
  const { userId } = req.params;
  const index = memoryUsers.findIndex(u => u.userId === userId || u.email === userId);
  if (index !== -1) {
    memoryUsers[index] = { ...memoryUsers[index], ...req.body };
    res.json({ success: true, message: 'Profile updated successfully', data: memoryUsers[index] });
  } else {
    res.status(404).json({ success: false, message: 'User profile not found' });
  }
});

// GET /api/notifications
router.get('/notifications', async (req, res) => {
  const { role, userId } = req.query;
  let notifs = memoryNotifications.filter(n => {
    if (n.targetRole === 'all') return true;
    if (role && n.targetRole === role) return true;
    if (userId && n.userId === userId) return true;
    return true;
  });
  res.json({ success: true, count: notifs.length, data: notifs });
});

// PUT /api/notifications/:id/read
router.put('/notifications/:id/read', async (req, res) => {
  const { id } = req.params;
  const notif = memoryNotifications.find(n => n.notificationId === id);
  if (notif) notif.read = true;
  res.json({ success: true, message: 'Notification marked as read', data: notif });
});

module.exports = router;
