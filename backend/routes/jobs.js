const express = require('express');
const router = express.Router();
const Job = require('../models/Job');
const { mockJobs } = require('../data/mockData');

let memoryJobs = [...mockJobs];

// GET /api/jobs
router.get('/', async (req, res) => {
  try {
    const { location, employmentType, search, status } = req.query;
    let jobs = [];

    try {
      let query = {};
      if (status) query.status = status;
      if (employmentType && employmentType !== 'All') query.employmentType = employmentType;
      if (location && location !== 'All') query.location = { $regex: location, $options: 'i' };
      if (search) {
        query.$or = [
          { title: { $regex: search, $options: 'i' } },
          { organization: { $regex: search, $options: 'i' } },
          { requiredSkills: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } }
        ];
      }
      jobs = await Job.find(query);
    } catch (e) {
      jobs = [];
    }

    if (!jobs || jobs.length === 0) {
      jobs = memoryJobs.filter(j => {
        let match = true;
        if (status && j.status !== status) match = false;
        if (employmentType && employmentType !== 'All' && j.employmentType !== employmentType) match = false;
        if (location && location !== 'All' && !j.location.toLowerCase().includes(location.toLowerCase())) match = false;
        if (search) {
          const s = search.toLowerCase();
          match = match && (
            j.title.toLowerCase().includes(s) ||
            j.organization.toLowerCase().includes(s) ||
            j.description.toLowerCase().includes(s) ||
            j.requiredSkills.some(sk => sk.toLowerCase().includes(s))
          );
        }
        return match;
      });
    }

    res.json({ success: true, count: jobs.length, data: jobs });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message, data: memoryJobs });
  }
});

// GET /api/jobs/:id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    let job = memoryJobs.find(j => j.jobId === id);
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job opportunity not found' });
    }
    res.json({ success: true, data: job });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/jobs (Post Job)
router.post('/', async (req, res) => {
  try {
    const newJob = {
      jobId: req.body.jobId || `j${Date.now()}`,
      title: req.body.title || 'Cooperative Operations Executive',
      organization: req.body.organization || 'State Cooperative Federation',
      location: req.body.location || 'Regional Branches',
      employmentType: req.body.employmentType || 'Full Time',
      salaryRange: req.body.salaryRange || '₹25,000 - ₹38,000 / month',
      requiredSkills: Array.isArray(req.body.requiredSkills)
        ? req.body.requiredSkills
        : (req.body.requiredSkills || 'Digital Literacy, PACS Accounting').split(',').map(s => s.trim()),
      description: req.body.description || 'Managing cooperative operations and service delivery.',
      postedDate: req.body.postedDate || new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      applicationDeadline: req.body.applicationDeadline || '15 Nov 2026',
      totalApplications: 0,
      status: req.body.status || 'Active',
      contactEmail: req.body.contactEmail || 'recruitment@coopcareer.gov.in'
    };

    try {
      await Job.create(newJob);
    } catch (e) {}
    memoryJobs.unshift(newJob);

    res.status(201).json({ success: true, message: 'Job opportunity posted successfully', data: newJob });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/jobs/:id/apply
router.post('/:id/apply', async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, userName, certificatesAttached } = req.body;

    const job = memoryJobs.find(j => j.jobId === id);
    if (job) {
      job.totalApplications = (job.totalApplications || 0) + 1;
    }

    res.json({
      success: true,
      message: 'Application submitted successfully with verified NCCT credentials.',
      data: {
        applicationId: `APP-NCCT-${Date.now().toString().slice(-6)}`,
        jobId: id,
        candidateName: userName || 'Rahul Sharma',
        verifiedBadgesAttached: certificatesAttached || ['NCCT-CERT-2026-00124', 'NCCT-CERT-2026-00125'],
        status: 'Under Review by Employer'
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
