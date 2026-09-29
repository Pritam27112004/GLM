const express = require('express');
const router = express.Router();
const Attendance = require('../models/Attendance');
const { mockAttendance } = require('../data/mockData');

let memoryAttendance = [...mockAttendance];

// GET /api/attendance/device-status
router.get('/device-status', (req, res) => {
  res.json({
    success: true,
    data: {
      deviceModel: 'Raspberry Pi 5 (8GB) + Sony IMX708 Camera Module',
      firmwareVersion: 'NCCT-Edge-v2.4.1-SIM',
      status: 'SIMULATION ACTIVE',
      integrationType: 'Prototype Mode – Raspberry Pi Attendance Integration',
      edgeNodeLocation: 'RICM Patna - Main Entry Gate / Academic Hall',
      ipAddress: '192.168.1.145',
      fps: '30 FPS (Simulated)',
      inferenceEngine: 'Planned: Jetson Nano / Raspberry Pi NPU Edge TensorRT',
      lastHeartbeat: new Date().toLocaleTimeString(),
      confidenceThreshold: '95.0%',
      futurePipeline: 'Raspberry Pi 5 + Camera → Edge Feature Extractor → REST API → Attendance Database → Admin & Trainee Dashboards'
    }
  });
});

// GET /api/attendance
router.get('/', async (req, res) => {
  try {
    const { personType, department, date, status, search, personId } = req.query;
    let records = [];

    try {
      let query = {};
      if (personType) query.personType = personType;
      if (status && status !== 'All') query.status = status;
      if (department && department !== 'All') query.departmentOrBatch = { $regex: department, $options: 'i' };
      if (personId) query.personId = personId;
      if (search) {
        query.$or = [
          { personName: { $regex: search, $options: 'i' } },
          { personId: { $regex: search, $options: 'i' } },
          { departmentOrBatch: { $regex: search, $options: 'i' } }
        ];
      }
      records = await Attendance.find(query).sort({ createdAt: -1 });
    } catch (e) {
      records = [];
    }

    if (!records || records.length === 0) {
      records = memoryAttendance.filter(a => {
        let match = true;
        if (personType && a.personType !== personType) match = false;
        if (status && status !== 'All' && a.status !== status) match = false;
        if (department && department !== 'All' && !a.departmentOrBatch.toLowerCase().includes(department.toLowerCase())) match = false;
        if (personId && a.personId !== personId && a.personId !== 'TRN-2026-081' && personId !== 'user@ncct.demo') {
          // If query is for user@ncct.demo, also match trainee ID
          if (!(personId === 'user@ncct.demo' && (a.personId === 'TRN-2026-081' || a.personId === 'user@ncct.demo'))) {
            match = false;
          }
        }
        if (search) {
          const s = search.toLowerCase();
          match = match && (
            a.personName.toLowerCase().includes(s) ||
            a.personId.toLowerCase().includes(s) ||
            a.departmentOrBatch.toLowerCase().includes(s)
          );
        }
        return match;
      });
    }

    res.json({ success: true, count: records.length, data: records });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message, data: memoryAttendance });
  }
});

// POST /api/attendance/simulate-checkin (Simulate Raspberry Pi Edge Recognition)
router.post('/simulate-checkin', async (req, res) => {
  try {
    const { personId, personName, departmentOrBatch, personType } = req.body;
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const dateStr = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

    const newRecord = {
      attendanceId: `ATT-${Date.now().toString().slice(-8)}`,
      personId: personId || 'EMP001',
      personName: personName || 'Rahul Sharma',
      personType: personType || 'Employee',
      departmentOrBatch: departmentOrBatch || 'Administration',
      date: dateStr,
      checkIn: timeStr,
      checkOut: '--',
      status: 'Present',
      capturedVia: 'Raspberry Pi 5 + Camera (Simulated Live Trigger)',
      confidenceScore: +(95 + Math.random() * 4.9).toFixed(1),
      deviceLocation: 'Main Admin Gate 1'
    };

    try {
      await Attendance.create(newRecord);
    } catch (e) {}
    memoryAttendance.unshift(newRecord);

    res.json({
      success: true,
      message: `Simulated attendance logged via Raspberry Pi 5 node for ${newRecord.personName}`,
      data: newRecord
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
