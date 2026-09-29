const express = require('express');
const router = express.Router();
const { mockAnalytics } = require('../data/mockData');

// GET /api/analytics
router.get('/', (req, res) => {
  try {
    res.json({
      success: true,
      timestamp: new Date().toISOString(),
      data: mockAnalytics
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
