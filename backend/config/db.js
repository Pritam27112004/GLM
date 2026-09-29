const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const STORAGE_DIR = process.env.STORAGE_DIR || path.join(__dirname, '../storage');

// Ensure storage directories exist
try {
  if (!fs.existsSync(STORAGE_DIR)) {
    fs.mkdirSync(STORAGE_DIR, { recursive: true });
  }
  const subdirs = ['certificates', 'exports', 'logs', 'media'];
  subdirs.forEach(dir => {
    const p = path.join(STORAGE_DIR, dir);
    if (!fs.existsSync(p)) {
      fs.mkdirSync(p, { recursive: true });
    }
  });
  console.log(`[Storage] Storage directory ready at: ${STORAGE_DIR}`);
} catch (err) {
  console.warn(`[Storage] Warning creating storage folder:`, err.message);
}

const connectDB = async () => {
  const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ncct_platform';
  try {
    const conn = await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 2000
    });
    console.log(`[MongoDB] Connected to database: ${conn.connection.host}/${conn.connection.name}`);
    return true;
  } catch (error) {
    console.warn(`[MongoDB] Local connection note: ${error.message}. Running with high-resilience in-memory/fallback store.`);
    return false;
  }
};

module.exports = { connectDB, STORAGE_DIR };
