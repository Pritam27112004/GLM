const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');
const { mockEmployees } = require('../data/mockData');

let memoryEmployees = [...mockEmployees];

// GET /api/employees
router.get('/', async (req, res) => {
  try {
    const { department, status, search } = req.query;
    let employees = [];

    try {
      let query = {};
      if (department && department !== 'All') query.department = department;
      if (status && status !== 'All') query.todayStatus = status;
      if (search) {
        query.$or = [
          { name: { $regex: search, $options: 'i' } },
          { employeeId: { $regex: search, $options: 'i' } },
          { designation: { $regex: search, $options: 'i' } },
          { department: { $regex: search, $options: 'i' } }
        ];
      }
      employees = await Employee.find(query);
    } catch (e) {
      employees = [];
    }

    if (!employees || employees.length === 0) {
      employees = memoryEmployees.filter(emp => {
        let match = true;
        if (department && department !== 'All' && emp.department !== department) match = false;
        if (status && status !== 'All' && emp.todayStatus !== status) match = false;
        if (search) {
          const s = search.toLowerCase();
          match = match && (
            emp.name.toLowerCase().includes(s) ||
            emp.employeeId.toLowerCase().includes(s) ||
            emp.designation.toLowerCase().includes(s) ||
            emp.department.toLowerCase().includes(s)
          );
        }
        return match;
      });
    }

    // Summary stats
    const stats = {
      total: memoryEmployees.length,
      presentToday: memoryEmployees.filter(e => e.todayStatus === 'Present' || e.todayStatus === 'Late').length,
      absentToday: memoryEmployees.filter(e => e.todayStatus === 'Absent').length,
      onLeave: memoryEmployees.filter(e => e.todayStatus === 'On Leave').length
    };

    res.json({ success: true, count: employees.length, stats, data: employees });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message, data: memoryEmployees });
  }
});

// GET /api/employees/:id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    let employee = memoryEmployees.find(e => e.employeeId === id);
    if (!employee) {
      return res.status(404).json({ success: false, message: 'Employee not found' });
    }
    res.json({ success: true, data: employee });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/employees (Add Employee)
router.post('/', async (req, res) => {
  try {
    const newEmp = {
      employeeId: req.body.employeeId || `EMP${(memoryEmployees.length + 1).toString().padStart(3, '0')}`,
      name: req.body.name,
      designation: req.body.designation || 'Training Assistant',
      department: req.body.department || 'Training',
      email: req.body.email,
      phone: req.body.phone || '+91 98000 00000',
      joiningDate: req.body.joiningDate || new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      attendanceRate: 100.0,
      todayStatus: 'Present',
      checkIn: '09:00 AM',
      checkOut: '--',
      avatar: req.body.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'
    };

    try {
      await Employee.create(newEmp);
    } catch (e) {}
    memoryEmployees.unshift(newEmp);

    res.status(201).json({ success: true, message: 'Employee added successfully', data: newEmp });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PUT /api/employees/:id
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const index = memoryEmployees.findIndex(e => e.employeeId === id);
    if (index !== -1) {
      memoryEmployees[index] = { ...memoryEmployees[index], ...req.body };
      res.json({ success: true, message: 'Employee updated successfully', data: memoryEmployees[index] });
    } else {
      res.status(404).json({ success: false, message: 'Employee not found' });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
