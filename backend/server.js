const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const { connectDB, STORAGE_DIR } = require('./config/db');
const seedData = require('./data/seed');

const coursesRoutes = require('./routes/courses');
const programmesRoutes = require('./routes/programmes');
const attendanceRoutes = require('./routes/attendance');
const certificatesRoutes = require('./routes/certificates');
const jobsRoutes = require('./routes/jobs');
const employeesRoutes = require('./routes/employees');
const analyticsRoutes = require('./routes/analytics');
const usersRoutes = require('./routes/users');
const chatbotRoutes = require('./routes/chatbot');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(morgan('dev'));

// Static storage folder for exports, certificates & media
app.use('/storage', express.static(STORAGE_DIR));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    platform: 'NCCT Cooperative Training Intelligence Platform',
    version: '1.0.0-PROTOTYPE',
    storageDirectory: STORAGE_DIR,
    timestamp: new Date().toISOString(),
    nodes: {
      attendanceEdge: 'Raspberry Pi 5 + Camera (Simulation Mode)',
      localAI: 'Jetson Nano Local AI (Planned / Simulated)'
    }
  });
});

// API Routes
app.use('/api/courses', coursesRoutes);
app.use('/api/programmes', programmesRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/certificates', certificatesRoutes);
app.use('/api/jobs', jobsRoutes);
app.use('/api/employees', employeesRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/career-assistant', chatbotRoutes);

// 404 Handler for undefined API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({ success: false, message: `API endpoint ${req.originalUrl} not found` });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('[Server Error]', err.stack);
  res.status(500).json({ success: false, message: 'Internal Server Error', error: err.message });
});

// Start Server & Connect Database
const startServer = async () => {
  try {
    const isConnected = await connectDB();
    if (isConnected) {
      await seedData();
    }
    app.listen(PORT, () => {
      console.log(`====================================================`);
      console.log(` NCCT COOPERATIVE TRAINING INTELLIGENCE PLATFORM   `);
      console.log(` Backend server running at: http://localhost:${PORT} `);
      console.log(` Health check: http://localhost:${PORT}/api/health `);
      console.log(` Storage Path: ${STORAGE_DIR}                     `);
      console.log(`====================================================`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
