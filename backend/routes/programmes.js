const express = require('express');
const router = express.Router();
const Programme = require('../models/Programme');
const { mockProgrammes } = require('../data/mockData');

let memoryProgrammes = [...mockProgrammes];

// GET /api/programmes
router.get('/', async (req, res) => {
  try {
    const { institution, status, search } = req.query;
    let programmes = [];
    try {
      let query = {};
      if (institution && institution !== 'All') query.institution = { $regex: institution, $options: 'i' };
      if (status) query.status = status;
      if (search) {
        query.$or = [
          { title: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
          { institution: { $regex: search, $options: 'i' } }
        ];
      }
      programmes = await Programme.find(query);
    } catch (dbErr) {
      programmes = [];
    }

    if (!programmes || programmes.length === 0) {
      programmes = memoryProgrammes.filter(p => {
        let match = true;
        if (institution && institution !== 'All' && !p.institution.toLowerCase().includes(institution.toLowerCase())) match = false;
        if (status && p.status !== status) match = false;
        if (search) {
          const s = search.toLowerCase();
          match = match && (
            p.title.toLowerCase().includes(s) ||
            p.description.toLowerCase().includes(s) ||
            p.institution.toLowerCase().includes(s)
          );
        }
        return match;
      });
    }

    res.json({ success: true, count: programmes.length, data: programmes });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message, data: memoryProgrammes });
  }
});

// GET /api/programmes/:id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    let programme = null;
    try {
      programme = await Programme.findOne({ programmeId: id });
    } catch (e) { programme = null; }

    if (!programme) {
      programme = memoryProgrammes.find(p => p.programmeId === id);
    }

    if (!programme) {
      return res.status(404).json({ success: false, message: 'Training programme not found' });
    }

    res.json({ success: true, data: programme });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/programmes (Create Programme)
router.post('/', async (req, res) => {
  try {
    const newProg = {
      programmeId: req.body.programmeId || `p${Date.now()}`,
      title: req.body.title || 'Specialized Cooperative Leadership Programme',
      description: req.body.description || 'Intensive capacity building programme for cooperative sector leaders.',
      institution: req.body.institution || 'RICM Patna (Regional Institute of Cooperative Management)',
      trainer: req.body.trainer || 'Senior Faculty, NCCT',
      startDate: req.body.startDate || '01 Nov 2026',
      endDate: req.body.endDate || '15 Nov 2026',
      duration: req.body.duration || '15 Days',
      mode: req.body.mode || 'Hybrid',
      language: req.body.language || 'Hindi & English',
      totalSeats: Number(req.body.totalSeats) || 60,
      registeredParticipants: 0,
      status: req.body.status || 'Upcoming',
      targetAudience: req.body.targetAudience || 'Cooperative Secretaries & Trainees',
      venue: req.body.venue || 'Main Academic Hall & NCCT Virtual Classroom'
    };

    try {
      await Programme.create(newProg);
    } catch (e) {
      console.warn('Saving in memory fallback for programme');
    }
    memoryProgrammes.unshift(newProg);

    res.status(201).json({ success: true, message: 'Training programme created successfully', data: newProg });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/programmes/:id/register
router.post('/:id/register', async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, userName } = req.body;

    const prog = memoryProgrammes.find(p => p.programmeId === id);
    if (prog) {
      prog.registeredParticipants = (prog.registeredParticipants || 0) + 1;
    }

    res.json({
      success: true,
      message: 'Programme registration submitted successfully. Confirmation letter sent to registered email.',
      data: {
        programmeId: id,
        registrationId: `REG-NCCT-${Date.now().toString().slice(-6)}`,
        status: 'Confirmed',
        userId: userId || 'user@ncct.demo',
        userName: userName || 'Rahul Sharma'
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
